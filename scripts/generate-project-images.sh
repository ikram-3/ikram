#!/bin/bash
# Project image generation — Ikram Portfolio (project images ONLY, no profile generation)
# Prompt formula per kit: [shot + subject + environment + lighting + brand palette + quality + aspect] + negative prompt
set -u
OUT="/home/z/my-project/public/images/project"
LOG="/home/z/my-project/scripts/imagegen.log"
mkdir -p "$OUT"
: > "$LOG"

gen() {
  local name="$1"; local size="$2"; local prompt="$3"
  if [ -s "$OUT/$name" ]; then echo "[skip] $name already exists" >> "$LOG"; return 0; fi
  echo "[start] $name $(date +%T)" >> "$LOG"
  z-ai image -p "$prompt" -o "$OUT/$name" -s "$size" >> "$LOG" 2>&1
  if [ -s "$OUT/$name" ]; then echo "[done] $name $(date +%T)" >> "$LOG"; else echo "[FAIL] $name $(date +%T)" >> "$LOG"; fi
}

# 1. OG card — Personal Brand (charcoal + gold), no face
gen "og-image.png" "1440x704" "Wide social share card design, dark charcoal studio background with a subtle golden network mesh of connected nodes flowing across the frame, elegant thin gold light streaks, small floating amber particles, minimalist premium tech aesthetic, deep charcoal #1C1C1C base with gold #C9A227 accents and warm ivory highlights, soft rim lighting from top left, cinematic depth, ultra clean composition with empty center space for text overlay, professional branding artwork, high quality, detailed, 2:1 aspect ratio. Negative prompt: no text, no letters, no words, no faces, no people, no logos, no watermark, no blue colors, no purple, no clutter"

# 2. Hero glow backdrop — Personal Brand
gen "hero-glow.png" "1440x704" "Abstract dark hero backdrop artwork, deep charcoal near-black gradient canvas, elegant golden constellation mesh of thin connected lines and glowing nodes concentrated on the right side, soft warm gold ambient glow, a few floating bokeh sparks, premium software engineer aesthetic, minimalist, cinematic soft lighting, subtle depth of field, charcoal #1C1C1C and gold #C9A227 palette with ivory warm highlights, ultra clean, high quality, detailed, wide 2:1 aspect ratio. Negative prompt: no text, no letters, no faces, no people, no machines, no watermark, no blue, no purple, no busy noise"

# 3. Agentic ChatBot — UOS academic green
gen "project-agentic-chatbot.png" "1344x768" "Modern chat assistant dashboard interface on a laptop screen viewed at a slight angle, scholarly campus office desk environment with soft daylight, AI chat bubbles on screen with small green citation chips attached under each answer, academic deep green #14532D interface with fresh leaf green #16A34A accents on warm parchment #F7F6F1 panels, clean flat design with soft shadows, helpful and grounded mood, professional product mockup rendering, crisp studio-quality lighting, high quality, detailed, 16:9 widescreen. Negative prompt: no readable text, no gibberish text, no faces, no watermark, no blue, no purple"

# 4. BiteBox POS — fast-food tomato/mustard/cream
gen "project-bitebox-pos.png" "1344x768" "Point of sale touchscreen terminal on a restaurant counter, bright appetizing fast-food setting with warm bokeh kitchen lights in background, order cart panel and colorful menu tiles on screen, tomato red #E63946 primary buttons with mustard orange #F4A261 category chips on cream #FFF8F0 background, charcoal #2B2D42 text panels, mint green success accents, friendly bold fast-food energy, shallow depth of field, warm high-contrast lighting, professional product mockup rendering, high quality, detailed, 16:9 widescreen. Negative prompt: no readable text, no gibberish text, no faces, no watermark, no blue, no purple"

# 5. Trade Automation — dark trading control room
gen "project-trade-automation.png" "1344x768" "Sleek algorithmic trading dashboard on a curved monitor in a dark trading room at night, glowing candlestick charts and automation workflow lines, deep graphite dark interface with gold #C9A227 highlights and signal green #22C55E upward candles, amber warning accents, subtle red accents, premium fintech control room mood, cinematic glow lighting with screen reflections, ultra sharp, high quality, detailed, 16:9 widescreen. Negative prompt: no readable text, no gibberish text, no faces, no watermark, no blue, no purple"

# 6. Arafat CMS — editorial teal
gen "project-arafat-cms.png" "1344x768" "Content management system editorial dashboard on a desktop monitor in a calm tidy studio workspace, article cards with workflow status pills moving from draft to review to published, organized kanban columns and a clean markdown editor panel, editorial teal #0D9488 primary actions on paper white #F8FAFC background with slate ink #0F172A sidebar, amber draft flags and emerald published states, calm trustworthy organized mood, soft even lighting, professional product mockup rendering, high quality, detailed, 16:9 widescreen. Negative prompt: no readable text, no gibberish text, no faces, no watermark, no blue, no purple"

# 7. Hospital Management — clinical trust
gen "project-hospital.png" "1344x768" "Hospital administration dashboard on a wall-mounted display in a bright modern clinic corridor softly blurred in background, patient appointment schedule vitals panels and bed occupancy grid, clinical teal #0F766E interface on pale sky #F0F9FF background with care green #22C55E status dots and alert red #DC2626 critical badges, clean calm precise humane mood, data-first minimal decoration, soft clinical lighting, professional product mockup rendering, high quality, detailed, 16:9 widescreen. Negative prompt: no readable text, no gibberish text, no faces, no watermark, no blue, no purple"

# 8. LUMIÈRE — luxury burgundy/gold 3D
gen "project-lumiere.png" "1344x768" "Luxury e-commerce hero scene, floating glass spheres and an elegant rotating golden torus above a dark opulent jewelry-display pedestal, premium cosmetics bottle and folded ornate shawl props at the sides, deep burgundy #6D1A36 environment with radiant gold #C9A227 metallic accents and ivory #FAF6EF glow, glassmorphism panels, golden sparkles and soft bokeh, opulent heritage refined warm mood, cinematic studio lighting with golden key light, octane render quality, high quality, detailed, 16:9 widescreen. Negative prompt: no readable text, no gibberish text, no faces, no watermark, no blue, no purple"

# 9. Nexus Traffic — control room dark
gen "project-nexus-traffic.png" "1344x768" "AI traffic surveillance control room wall of monitors at night, multi-camera intersection feeds with green bounding boxes tracking vehicles and one red violation box pulsing, city road network map panel, deep asphalt black #0B0F14 control room with signal green #22C55E, amber #F59E0B and red #EF4444 status lights and camera cyan #06B6D4 data accents, vigilant precision real-time mood, monospace-style metric readouts as abstract shapes, scanline glow effects, cinematic dark lighting, high quality, detailed, 16:9 widescreen. Negative prompt: no readable text, no gibberish text, no faces, no watermark, no purple"

# 10. PhoenixAgent — desktop AI HUD, ember/gold
gen "project-phoenixagent.png" "1344x768" "Futuristic desktop AI assistant HUD on a widescreen monitor in a dark developer den at night, glowing orb assistant core surrounded by orbiting tool icons and waveform voice visualizer, dark charcoal interface with ember orange and gold #C9A227 gradients, floating translucent panels, subtle phoenix feather light motif, warm cinematic glow, production-grade agentic AI mood not playful, high quality, detailed, 16:9 widescreen. Negative prompt: no readable text, no gibberish text, no faces, no watermark, no blue, no purple"

echo "[all-done] $(date +%T)" >> "$LOG"
