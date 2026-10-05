import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";

const OUT = "/home/z/my-project/public/images/project";

// [name, size, prompt] — prompt formula: shot+subject+environment+lighting+palette+quality+ratio + negatives
const JOBS: Array<[string, string, string]> = [
  [
    "og-image.png",
    "1440x704",
    "Wide social share card design, dark charcoal studio background with a subtle golden network mesh of connected nodes flowing across the frame, elegant thin gold light streaks, small floating amber particles, minimalist premium tech aesthetic, deep charcoal base with gold accents and warm ivory highlights, soft rim lighting from top left, cinematic depth, ultra clean composition with empty center space for text overlay, professional branding artwork, high quality, detailed, 2:1 aspect ratio. Negative prompt: no text, no letters, no words, no faces, no people, no logos, no watermark, no blue colors, no purple, no clutter",
  ],
  [
    "hero-glow.png",
    "1440x704",
    "Abstract dark hero backdrop artwork, deep charcoal near-black gradient canvas, elegant golden constellation mesh of thin connected lines and glowing nodes concentrated on the right side, soft warm gold ambient glow, a few floating bokeh sparks, premium software engineer aesthetic, minimalist, cinematic soft lighting, subtle depth of field, charcoal and gold palette with ivory warm highlights, ultra clean, high quality, detailed, wide 2:1 aspect ratio. Negative prompt: no text, no letters, no faces, no people, no machines, no watermark, no blue, no purple, no busy noise",
  ],
  [
    "project-agentic-chatbot.png",
    "1344x768",
    "Modern chat assistant dashboard interface on a laptop screen viewed at a slight angle, scholarly campus office desk environment with soft daylight, AI chat bubbles on screen with small green citation chips attached under each answer, academic deep green interface with fresh leaf green accents on warm parchment panels, clean flat design with soft shadows, helpful and grounded mood, professional product mockup rendering, crisp studio-quality lighting, high quality, detailed, 16:9 widescreen. Negative prompt: no readable text, no gibberish text, no faces, no watermark, no blue, no purple",
  ],
  [
    "project-bitebox-pos.png",
    "1344x768",
    "Point of sale touchscreen terminal on a restaurant counter, bright appetizing fast-food setting with warm bokeh kitchen lights in background, order cart panel and colorful menu tiles on screen, tomato red primary buttons with mustard orange category chips on cream background, charcoal text panels, mint green success accents, friendly bold fast-food energy, shallow depth of field, warm high-contrast lighting, professional product mockup rendering, high quality, detailed, 16:9 widescreen. Negative prompt: no readable text, no gibberish text, no faces, no watermark, no blue, no purple",
  ],
  [
    "project-trade-automation.png",
    "1344x768",
    "Sleek algorithmic trading dashboard on a curved monitor in a dark trading room at night, glowing candlestick charts and automation workflow lines, deep graphite dark interface with gold highlights and signal green upward candles, amber warning accents, subtle red accents, premium fintech control room mood, cinematic glow lighting with screen reflections, ultra sharp, high quality, detailed, 16:9 widescreen. Negative prompt: no readable text, no gibberish text, no faces, no watermark, no blue, no purple",
  ],
  [
    "project-arafat-cms.png",
    "1344x768",
    "Content management system editorial dashboard on a desktop monitor in a calm tidy studio workspace, article cards with workflow status pills moving from draft to review to published, organized kanban columns and a clean markdown editor panel, editorial teal primary actions on paper white background with dark slate ink sidebar, amber draft flags and emerald published states, calm trustworthy organized mood, soft even lighting, professional product mockup rendering, high quality, detailed, 16:9 widescreen. Negative prompt: no readable text, no gibberish text, no faces, no watermark, no blue, no purple",
  ],
  [
    "project-hospital.png",
    "1344x768",
    "Hospital administration dashboard on a wall-mounted display in a bright modern clinic corridor softly blurred in background, patient appointment schedule vitals panels and bed occupancy grid, clinical teal interface on pale sky background with care green status dots and alert red critical badges, clean calm precise humane mood, data-first minimal decoration, soft clinical lighting, professional product mockup rendering, high quality, detailed, 16:9 widescreen. Negative prompt: no readable text, no gibberish text, no faces, no watermark, no blue, no purple",
  ],
  [
    "project-lumiere.png",
    "1344x768",
    "Luxury e-commerce hero scene, floating glass spheres and an elegant rotating golden torus above a dark opulent jewelry-display pedestal, premium cosmetics bottle and folded ornate shawl props at the sides, deep burgundy environment with radiant gold metallic accents and ivory glow, glassmorphism panels, golden sparkles and soft bokeh, opulent heritage refined warm mood, cinematic studio lighting with golden key light, octane render quality, high quality, detailed, 16:9 widescreen. Negative prompt: no readable text, no gibberish text, no faces, no watermark, no blue, no purple",
  ],
  [
    "project-nexus-traffic.png",
    "1344x768",
    "AI traffic surveillance control room wall of monitors at night, multi-camera intersection feeds with green bounding boxes tracking vehicles and one red violation box pulsing, city road network map panel, deep asphalt black control room with signal green, amber and red status lights and camera cyan data accents, vigilant precision real-time mood, monospace-style metric readouts as abstract shapes, scanline glow effects, cinematic dark lighting, high quality, detailed, 16:9 widescreen. Negative prompt: no readable text, no gibberish text, no faces, no watermark, no purple",
  ],
  [
    "project-phoenixagent.png",
    "1344x768",
    "Futuristic desktop AI assistant HUD on a widescreen monitor in a dark developer den at night, glowing orb assistant core surrounded by orbiting tool icons and waveform voice visualizer, dark charcoal interface with ember orange and gold gradients, floating translucent panels, subtle phoenix feather light motif, warm cinematic glow, production-grade agentic AI mood not playful, high quality, detailed, 16:9 widescreen. Negative prompt: no readable text, no gibberish text, no faces, no watermark, no blue, no purple",
  ],
];

async function main() {
  const zai = await ZAI.create();
  fs.mkdirSync(OUT, { recursive: true });
  const only = process.argv[2];

  for (const [name, size, prompt] of JOBS) {
    const out = `${OUT}/${name}`;
    if (fs.existsSync(out) && fs.statSync(out).size > 10000) {
      console.log(`[skip] ${name}`);
      continue;
    }
    if (only && name !== only) continue;
    let ok = false;
    for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
      try {
        console.log(`[gen] ${name} (${size}) attempt ${attempt}`);
        const res = await zai.images.generations.create({ prompt, size });
        const b64 = res.data?.[0]?.base64;
        if (!b64) throw new Error("empty base64");
        fs.writeFileSync(out, Buffer.from(b64, "base64"));
        console.log(`[done] ${name} ${Math.round(fs.statSync(out).size / 1024)}KB`);
        ok = true;
      } catch (e) {
        console.error(`[fail] ${name}: ${e instanceof Error ? e.message : e}`);
        if (attempt === 3 && size !== "1344x768") {
          // Retry once at the safe 16:9 size before giving up
          try {
            console.log(`[gen] ${name} fallback 1344x768`);
            const res = await zai.images.generations.create({ prompt, size: "1344x768" });
            const b64 = res.data?.[0]?.base64;
            if (!b64) throw new Error("empty base64");
            fs.writeFileSync(out, Buffer.from(b64, "base64"));
            console.log(`[done-fallback] ${name}`);
            ok = true;
          } catch (e2) {
            console.error(`[fail-final] ${name}: ${e2 instanceof Error ? e2.message : e2}`);
          }
        }
        if (!ok) await new Promise((r) => setTimeout(r, 1500 * attempt));
      }
    }
  }
  console.log("[all-done]");
}

main();
