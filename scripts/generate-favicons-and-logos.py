from PIL import Image
import numpy as np
import os

# 1. Process A06 for Logo and Favicon
a06_path = "public/images/profile/A06-flat-vector-transparent.png"
if not os.path.exists(a06_path):
    raise FileNotFoundError("A06-flat-vector-transparent.png not found")

img_a06 = Image.open(a06_path).convert("RGBA")

# Let's crop A06 closely to the circular badge with a tiny margin
# The circle center was ~(512, 505) with radius ~446
# Let's create a perfectly centered square crop:
bbox = (512 - 450, 505 - 450, 512 + 450, 505 + 450)
a06_cropped = img_a06.crop(bbox)

# Save high-res logo
a06_cropped.save("public/logo.png", format="PNG")
a06_cropped.save("public/images/profile/A06-logo.png", format="PNG")

# Generate icons for Next.js and standard browsers
sizes = [
    (16, 16),
    (32, 32),
    (48, 48),
    (64, 64),
    (128, 128),
    (180, 180),
    (192, 192),
    (256, 256),
    (512, 512)
]

# Next.js app icons
icon_32 = a06_cropped.resize((32, 32), Image.Resampling.LANCZOS)
icon_180 = a06_cropped.resize((180, 180), Image.Resampling.LANCZOS)
icon_192 = a06_cropped.resize((192, 192), Image.Resampling.LANCZOS)
icon_512 = a06_cropped.resize((512, 512), Image.Resampling.LANCZOS)

icon_32.save("public/icon.png", format="PNG")
icon_180.save("public/apple-icon.png", format="PNG")
icon_192.save("public/icon-192.png", format="PNG")
icon_512.save("public/icon-512.png", format="PNG")

# Also save directly in src/app for Next.js App Router metadata conventions
os.makedirs("src/app", exist_ok=True)
icon_32.save("src/app/icon.png", format="PNG")
icon_180.save("src/app/apple-icon.png", format="PNG")

# Multi-resolution ICO file
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
img_a06.save("public/favicon.ico", format="ICO", sizes=ico_sizes)
img_a06.save("src/app/favicon.ico", format="ICO", sizes=ico_sizes)

print("All favicon and logo assets generated successfully!")
