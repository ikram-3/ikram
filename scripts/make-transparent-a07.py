import cv2
import numpy as np
from PIL import Image

# Load image
img = cv2.imread('public/images/profile/A07-3d-character.png')
h, w = img.shape[:2]

# Convert to RGB float
rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB).astype(np.float32)

# Estimate background color from the top border
bg_samples = np.vstack([
    rgb[0:15, :].reshape(-1, 3),
    rgb[:300, 0:15].reshape(-1, 3),
    rgb[:300, w-15:w].reshape(-1, 3)
])
bg_color = np.mean(bg_samples, axis=0)

# Euclidean distance in RGB color space
dist = np.linalg.norm(rgb - bg_color, axis=2)

# Create an initial binary background mask (where distance is very small)
# Using threshold of 28
bg_mask = (dist < 28).astype(np.uint8)

# Flood fill from the top-left, top-right, and top-center border to ensure we only get the outer background
flood_mask = np.zeros((h + 2, w + 2), np.uint8)
# We fill an inverted mask
inv_bg = (bg_mask * 255).astype(np.uint8)
cv2.floodFill(inv_bg, flood_mask, (0, 0), 128)
cv2.floodFill(inv_bg, flood_mask, (w - 1, 0), 128)
cv2.floodFill(inv_bg, flood_mask, (w // 2, 0), 128)

# Pixels marked 128 are definitely outer background
outer_bg = (inv_bg == 128)

# Alpha calculation with smooth feathering around edges:
# If dist <= 12 and outer_bg -> alpha = 0
# If dist >= 40 -> alpha = 255
# In between -> smooth cosine or linear transition
alpha = np.clip((dist - 12.0) / (40.0 - 12.0), 0.0, 1.0)
# Force any pixel not connected to outer background to be solid foreground
alpha[~outer_bg] = 1.0

# Slight gaussian blur on alpha edge to make it ultra smooth and natural
alpha_blurred = cv2.GaussianBlur(alpha, (3, 3), 0)
# De-fringe: near edges, slightly compensate for background color bleed
alpha_uint8 = (alpha_blurred * 255).astype(np.uint8)

# Assemble RGBA
b, g, r = cv2.split(img)
rgba = cv2.merge([b, g, r, alpha_uint8])

cv2.imwrite('public/images/profile/A07-3d-character-transparent.png', rgba)
print("Saved public/images/profile/A07-3d-character-transparent.png successfully!")
