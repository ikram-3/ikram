import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";

// Task 3-b — resumable generator for the 27 missing project images.
// Reuses the Task 1 SDK pattern (z-ai-web-dev-sdk, base64 -> PNG).
// Rules honored here:
//  - skips files that already exist with size > 0 (resumable)
//  - size 1344x768 (32px multiple — server rejects non-multiples)
//  - saves to public/images/project/project-<slug>.png
//  - sequential, 1 retry per image, per-image progress logs
//  - PROJECT MATERIAL ONLY — no profile/avatar/person imagery (Identity Lock)

const OUT = "/home/z/my-project/public/images/project";
const SIZE = "1344x768"; // 32px multiple, 16:9
const NEG =
  "text, letters, words, watermark, logo, signature, human, face, hands, blurry, low quality, distorted, cluttered, photorealistic human skin";

// Brand: charcoal #1C1C1C + gold #C9A227 (DESIGN_SYSTEM.md).
// Category accents: ai-ml emerald/teal+gold · business amber/gold warm charcoal ·
// automation copper/orange · mobile violet glow · data magenta/rose+gold · utilities stone/graphite+gold.
const JOBS: Array<[number, string, string]> = [
  // ---------- business (warm charcoal dashboards, amber/gold, polished SaaS) ----------
  [
    8,
    "erp-backend",
    "Modern multi-tenant ERP accounting suite on a widescreen monitor in a warm charcoal corporate office at dusk, dashboard with module tiles for ledger, inventory, point of sale and tax compliance, balancing summary chart cards and a role permission matrix grid, warm charcoal interface with amber and gold accents, polished enterprise SaaS look, soft rim lighting from top left, cinematic depth, professional flat-perspective product mockup, crisp studio-quality lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    9,
    "payroll-system",
    "Payroll management dashboard on a desktop monitor in a tidy office nook with a warm desk lamp glow, salary run progress panel, neatly stacked printable payslip cards with gold seal motifs and a deductions breakdown donut chart, warm charcoal interface with amber and gold accents, trustworthy organized mood, professional flat-perspective product mockup, soft cinematic lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    10,
    "food-ordering-system",
    "Food ordering platform on a tablet and smartphone side by side on a cafe table, appetizing menu tiles with dish imagery, order cart panel with checkout button and a live courier tracking map strip, warm charcoal interface with amber and gold accents and a subtle warm red order badge, cozy bistro bokeh lights softly blurred behind, professional flat-perspective product mockup, warm inviting lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    12,
    "khanaqa-seminary-cms",
    "Seminary administration dashboard on a widescreen monitor in a calm scholarly library softly blurred behind, academic hierarchy tree panel, fee invoice cards with gold seal stamps, grading engine bar chart and a right-to-left document preview panel, warm charcoal interface with amber and gold accents, dignified institutional mood, professional flat-perspective product mockup, soft even lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    18,
    "school-management-cms",
    "School administration dashboard with role switcher chips for admin, teacher and student portals, class timetable grid, attendance ring gauges and a notice board card column, warm charcoal interface with amber and gold accents, tidy academic office backdrop softly blurred, professional flat-perspective product mockup, clean soft lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    28,
    "security-system",
    "Security monitoring dashboard on a wall-mounted display in a dark operations nook, grid of camera feed tiles with status borders, alert list panel with one amber warning chip and system health gauges, warm charcoal interface with amber and gold accents and a small red alert accent, vigilant precise mood, professional flat-perspective product mockup, cinematic dark lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    29,
    "khanaqa-cms-ts",
    "Structured content operations dashboard on a desktop monitor in a minimal studio workspace, content type schema panels, publishing workflow stage columns and a version history timeline, warm charcoal interface with amber and gold accents, polished modern SaaS look, professional flat-perspective product mockup, soft even lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    30,
    "deploy-cms",
    "Publishing and deployment pipeline board on a widescreen monitor, content cards flowing into build and deploy stage columns with status chips and a success check, subtle server rack glow in the dark backdrop, warm charcoal interface with amber and gold accents, engineering precision mood, professional flat-perspective product mockup, cinematic soft lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    31,
    "zeb-food-bank",
    "Food bank management dashboard on a monitor in a warm community hall softly blurred behind, donation intake cards, distribution route map panel and inventory crate count chart, warm charcoal interface with amber and gold accents, hopeful giving mood, wooden crate and canned goods props softly out of focus at the edges, professional flat-perspective product mockup, warm soft lighting, high quality, detailed, 16:9 widescreen",
  ],
  // ---------- automation (dark control-panel scenes, copper/orange accent lighting) ----------
  [
    15,
    "headless-scraping-engine",
    "Headless web scraping engine control console on a dark panel, several browser window cards connected by glowing pipeline lines funneling into structured data table rows, queue depth and retry gauges, deep charcoal control room scene with copper and orange accent lighting, gold trim, industrial reliability mood, professional flat-perspective product mockup, cinematic glow lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    16,
    "linkedin-auto-apply-bot",
    "Job application automation bot console with a browser extension panel overlay, resume document cards aligned beside opportunity cards connected by matching percentage rings, one apply button glowing, deep charcoal control panel with copper and orange accent lighting and gold trim, efficient professional mood, professional flat-perspective product mockup, cinematic dark lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    22,
    "quotes-web-scraper",
    "Web scraper pipeline console showing a webpage card flowing through a filter funnel into clean structured table rows and a dataset export tile, pagination gauge and harvest counter, deep charcoal control panel with copper and orange accent lighting and gold trim, neat data craftsmanship mood, professional flat-perspective product mockup, cinematic glow lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    33,
    "hed-automation",
    "Workflow automation board on a dark control panel, connected task nodes with trigger switches, scheduled run gauges and a status flow of queued running and done chips, deep charcoal scene with copper and orange accent lighting and gold trim, streamlined efficiency mood, professional flat-perspective product mockup, cinematic dark lighting, high quality, detailed, 16:9 widescreen",
  ],
  // ---------- ai-ml (deep charcoal UI, emerald/teal glow accents, gold trim) ----------
  [
    17,
    "oec-chatbot",
    "Agentic automation console running a browser task pipeline on a widescreen monitor, step checklist panel flowing from login to course modules to quiz completion to a certificate card with a gold ribbon, agent progress timeline with a glowing chip, deep charcoal interface with emerald and teal glow accents and gold trim, capable autonomous mood, professional flat-perspective product mockup, cinematic dark lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    19,
    "chatbot-gemini",
    "Generative AI chat application on a laptop screen on a cozy dark desk at night, streaming chat bubbles with a typing indicator and a spark glyph, suggestion chip row, deep charcoal interface with emerald and teal glow accents and gold trim, friendly intelligent mood, professional flat-perspective product mockup, soft cinematic glow lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    20,
    "deep-learning-lab",
    "Deep learning experiment dashboard on a widescreen monitor in a dark research den, layered neural network diagram with glowing nodes, descending loss curve across epoch axis chart and GPU utilization gauges, notebook code panel rendered as abstract colored lines, deep charcoal interface with emerald and teal glow accents and gold trim, studious experimental mood, professional flat-perspective product mockup, cinematic glow lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    21,
    "dominant-color-detector",
    "Computer vision color extraction scene on a monitor, an abstract artwork photo on screen with segmented region outlines and a row of extracted color swatch chips below, cluster dot scatter panel, deep charcoal interface with emerald and teal glow accents and gold trim, precise analytical mood, professional flat-perspective product mockup, soft cinematic lighting, high quality, detailed, 16:9 widescreen",
  ],
  // ---------- mobile (clean device mockups on charcoal backdrop, violet accent glow) ----------
  [
    13,
    "tailortrack",
    "Clean smartphone mockup standing upright on a deep charcoal studio backdrop with a soft violet accent glow, screen showing a tailoring job tracking app with customer measurement cards, order status timeline and delivery schedule list, folded fabric rolls and measuring tape props softly blurred at the sides with gold rim light, elegant craft business mood, professional flat-perspective product mockup, soft studio lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    25,
    "time-table-madrasa",
    "Two smartphone mockups leaning on a deep charcoal studio backdrop with a soft violet accent glow, screens showing a community timetable app with a weekly schedule grid, announcement cards and a delicate crescent motif with gold highlights, warm community mood, professional flat-perspective product mockup, soft studio lighting, high quality, detailed, 16:9 widescreen",
  ],
  // ---------- data (dark analytics boards, magenta/rose data-viz accents, gold highlights) ----------
  [
    23,
    "ssc-exam-analysis",
    "Education analytics board on a widescreen monitor in a dark study room, subject performance bar charts, failure pattern heat grid and a score distribution curve, notebook panel with abstract chart thumbnails, dark analytics dashboard with magenta and rose data-viz accents and gold highlights, insightful statistical mood, professional flat-perspective product mockup, cinematic glow lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    24,
    "streamlit-login-visualization",
    "Analytics application scene on a widescreen monitor, secure login card with a shield glyph on the left and a chart exploration dashboard on the right with scatter, line and area charts and metric tiles, dark analytics board with magenta and rose data-viz accents and gold highlights, guarded exploratory mood, professional flat-perspective product mockup, cinematic dark lighting, high quality, detailed, 16:9 widescreen",
  ],
  // ---------- utilities (minimal stone/graphite scenes with gold accents) ----------
  [
    14,
    "studiopro-passportpro",
    "Minimal graphite workspace scene with a laptop showing a passport photo sheet layout tool, grid of identical placeholder frames with neutral silhouette icons, crop guide overlays and a print sheet preview, privacy shield glyph badge, stone and graphite palette with gold accents, private on-device processing mood, professional flat-perspective product mockup, soft even lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    26,
    "youtube-video-downloader",
    "Media download manager interface on a dark graphite panel, video thumbnail tiles with progress bars and a stream merge diagram of audio and video lanes joining into one file card, play button glyph and quality selector chips, stone and graphite palette with gold accents, tidy utility mood, professional flat-perspective product mockup, soft cinematic lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    27,
    "bank-management-system",
    "Retro-modern terminal banking scene, a console window on a graphite desk showing an account ledger of abstract rows and a menu prompt bar, small passbook card and coin stack props with gold rim light, stone and graphite palette with gold accents, disciplined core-programming mood, professional flat-perspective product mockup, soft moody lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    32,
    "user-database-python",
    "Minimal records management app on a monitor in a clean workspace, simple table rows with add, edit and delete glyph buttons, a search field and a record count chip, stone and graphite palette with gold accents, tidy utilitarian mood, professional flat-perspective product mockup, soft even lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    34,
    "chatbot-javascript",
    "Clean chatbot widget inside a minimal browser window on a light desk, friendly chat bubbles with quick reply chips and a message input bar with a send glyph, stone and graphite palette with gold accents, approachable lightweight mood, professional flat-perspective product mockup, bright soft lighting, high quality, detailed, 16:9 widescreen",
  ],
  [
    35,
    "github-profile",
    "Developer profile page mockup on a monitor in a minimal dark workspace, repository card grid with star glyphs as abstract shapes, a contribution heatmap grid of small gold-toned squares, follower chips and a pinned project row, stone and graphite palette with gold accents, proud open-source identity mood, professional flat-perspective product mockup, soft cinematic lighting, high quality, detailed, 16:9 widescreen",
  ],
];

async function main() {
  const zai = await ZAI.create();
  fs.mkdirSync(OUT, { recursive: true });

  // Optional CLI arg: max images to generate this run (0 = unlimited). Lets the caller batch runs.
  const limit = Number(process.argv[2] ?? "0") || 0;

  let generated = 0;
  let skipped = 0;
  const failed: string[] = [];

  for (const [id, slug, base] of JOBS) {
    const out = `${OUT}/project-${slug}.png`;
    if (fs.existsSync(out) && fs.statSync(out).size > 0) {
      console.log(`[skip] id=${id} project-${slug}.png (exists)`);
      skipped++;
      continue;
    }
    if (limit > 0 && generated >= limit) {
      console.log(`[limit] reached per-run limit of ${limit} — re-run to continue`);
      break;
    }

    const fullPrompt = `${base}. Negative prompt: ${NEG}`;
    let ok = false;
    for (let attempt = 1; attempt <= 2 && !ok; attempt++) {
      try {
        console.log(`[gen] id=${id} project-${slug}.png (${SIZE}) attempt ${attempt}`);
        const res = await zai.images.generations.create({ prompt: fullPrompt, size: SIZE });
        const b64 = res.data?.[0]?.base64;
        if (!b64) throw new Error("empty base64");
        fs.writeFileSync(out, Buffer.from(b64, "base64"));
        console.log(
          `[done] id=${id} project-${slug}.png ${Math.round(fs.statSync(out).size / 1024)}KB`
        );
        ok = true;
        generated++;
      } catch (e) {
        console.error(`[fail] id=${id} project-${slug}.png: ${e instanceof Error ? e.message : e}`);
        if (attempt < 2) await new Promise((r) => setTimeout(r, 2000));
      }
    }
    if (!ok) failed.push(`id=${id}:${slug}`);
  }

  console.log(
    `[summary] generated=${generated} skipped=${skipped} failed=${failed.length}${failed.length ? " -> " + failed.join(", ") : ""}`
  );
  console.log("[all-done]");
}

main();
