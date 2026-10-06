import cv2
import numpy as np
from PIL import Image, ImageEnhance

# Load original A01
img_bgr = cv2.imread('public/images/profile/A01-circle-minimal.png')
h, w = img_bgr.shape[:2]
rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB).astype(np.float32)

# Estimate background color from top border and upper side samples
bg_samples = np.vstack([
    rgb[0:20, :].reshape(-1, 3),
    rgb[:350, 0:20].reshape(-1, 3),
    rgb[:350, w-20:w].reshape(-1, 3)
])
bg_color = np.mean(bg_samples, axis=0)
print("Detected A01 background color:", bg_color)

# Color distance in RGB
dist = np.linalg.norm(rgb - bg_color, axis=2)

# Initial background mask
bg_mask = (dist < 26).astype(np.uint8)

# Flood fill from corners to ensure we only target the outer background
flood_mask = np.zeros((h + 2, w + 2), np.uint8)
inv_bg = (bg_mask * 255).astype(np.uint8)
cv2.floodFill(inv_bg, flood_mask, (0, 0), 128)
cv2.floodFill(inv_bg, flood_mask, (w - 1, 0), 128)
cv2.floodFill(inv_bg, flood_mask, (w // 2, 0), 128)

outer_bg = (inv_bg == 128)

# Calculate smooth alpha
alpha = np.clip((dist - 14.0) / (38.0 - 14.0), 0.0, 1.0)
alpha[~outer_bg] = 1.0
alpha_blurred = cv2.GaussianBlur(alpha, (3, 3), 0)
alpha_uint8 = (alpha_blurred * 255).astype(np.uint8)

# Save transparent cutout
b, g, r = cv2.split(img_bgr)
rgba = cv2.merge([b, g, r, alpha_uint8])
cv2.imwrite('public/images/profile/A01-portrait-transparent.png', rgba)
print("Saved A01-portrait-transparent.png")

# Now create an ENHANCED studio portrait with rich dark background and subtle emerald ambient rim
# 1. Enhance the foreground portrait
fg_pil = Image.fromarray(cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB))
# Enhance contrast slightly (1.08)
fg_pil = ImageEnhance.Contrast(fg_pil).enhance(1.08)
# Enhance color saturation slightly (1.06)
fg_pil = ImageEnhance.Color(fg_pil).enhance(1.06)
# Enhance sharpness (1.15)
fg_pil = ImageEnhance.Sharpness(fg_pil).enhance(1.15)

fg_enhanced = np.array(fg_pil)

# 2. Create high-end cinematic studio dark background matching the logo's emerald theme:
# Radial gradient: deep dark center with very subtle emerald tint, transitioning to deep charcoal edges
y, x = np.ogrid[:h, :w]
center_x, center_y = w // 2, int(h * 0.42)
radius = np.sqrt((x - center_x)**2 + (y - center_y)**2)
max_radius = np.sqrt(center_x**2 + center_y**2)
normalized_radius = np.clip(radius / max_radius, 0.0, 1.0)

# Studio dark colors:
# Center: subtle dark emerald-slate [22, 34, 28] (in RGB)
# Outer: deep obsidian charcoal [14, 17, 19]
center_color = np.array([24.0, 38.0, 30.0]) # subtle rich emerald charcoal
edge_color = np.array([13.0, 15.0, 16.0])   # deep obsidian

bg_canvas = np.zeros((h, w, 3), dtype=np.float32)
for c in range(3):
    bg_canvas[:, :, c] = center_color[c] * (1.0 - normalized_radius) + edge_color[c] * normalized_radius

# Composite enhanced foreground onto studio canvas using smooth alpha
final_comp = np.zeros((h, w, 3), dtype=np.uint8)
alpha_norm = (alpha_blurred[:, :, np.newaxis])

final_float = fg_enhanced.astype(np.float32) * alpha_norm + bg_canvas * (1.0 - alpha_norm)
final_comp = np.clip(final_float, 0, 255).astype(np.uint8)

# Save the enhanced studio portrait
Image.fromarray(final_comp).save('public/images/profile/A01-portrait-enhanced.png', quality=95)
print("Saved A01-portrait-enhanced.png successfully!")
