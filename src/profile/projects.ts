// PROFILE MODULE — Project registry (35 entries) + categories + helpers.
// Facts Gate: AUTO-DERIVED from portfolio/portfolio.json (schema v1) + portfolio/pages/projects-showcase.md.
// Do not edit values without updating the kit files first.
//
// Reconciliation note (Task 2): in the raw kit export, the `whatIDid`/`whyItMatters` copy for
// id 8 (ERP Backend) and id 11 (PhoenixAgent) was swapped. Below, each block is paired with the
// project its content describes (ERP accounting/ZATCA copy → ERP Backend; ReAct/PyQt6 HUD copy →
// PhoenixAgent). No new facts were introduced.

export interface ProjectLink {
  live: string | null;
  repo: string | null;
}

export interface Project {
  id: number;
  name: string;
  slug: string;
  category: string;
  type: string;
  tagline: string;
  description: string;
  tech: string[];
  featured: boolean;
  links: ProjectLink;
  whatIDid?: string;
  whyItMatters?: string;
}

export interface Category {
  id: string;
  label: string;
  description: string;
}

export const categories: Category[] = [
  { id: "ai-ml", label: "AI & Machine Learning", description: "RAG assistants, agentic systems, computer vision, and applied ML." },
  { id: "business", label: "Business & Enterprise Systems", description: "POS, CMS, ERP, healthcare, e-commerce, and community platforms." },
  { id: "automation", label: "Automation & Bots", description: "Browser automation, scraping engines, and productivity bots." },
  { id: "mobile", label: "Mobile Apps", description: "Flutter cross-platform applications." },
  { id: "data", label: "Data & Analytics", description: "Data analysis, visualization, and reporting tools." },
  { id: "utilities", label: "Utilities & Learning", description: "Practical tools, experiments, and learning repositories." },
];

export const projects: Project[] = [
  {
    id: 1,
    name: "Agentic ChatBot — University of Swat",
    slug: "agentic-chatbot",
    category: "ai-ml",
    type: "AI assistant + university chatbot + educational support",
    tagline: "RAG-powered campus assistant answering admissions, fees, and eligibility queries with cited sources.",
    description:
      "AI-powered chatbot for the University of Swat using RAG and live web retrieval to help students with admission guidance, campus information, and academic support. Every answer cites its source document; below-threshold retrieval returns an honest refusal instead of a guess. Flagship KPITB Fellowship project (Generative AI Track).",
    tech: ["Python", "FastAPI", "React", "Groq", "Pinecone", "RAG", "Web Scraping", "Markdown Knowledge Base"],
    featured: true,
    links: { live: "https://agentic-chatbot-alpha.vercel.app", repo: null },
    whatIDid:
      "Developed an AI chatbot that combines Retrieval-Augmented Generation with live web information retrieval, so student questions get accurate, contextual answers — every answer carrying a source citation. The knowledge layer is a maintainable Markdown knowledge base served by a FastAPI backend, with a React frontend on low-latency Groq inference.",
    whyItMatters:
      "Students get instant, trustworthy answers without waiting for office hours — and it's the flagship project of the KPITB Generative AI Fellowship.",
  },
  {
    id: 2,
    name: "BiteBox POS",
    slug: "bitebox-pos",
    category: "business",
    type: "Point of Sale + restaurant management",
    tagline: "Production-ready fast-food POS with kitchen display, inventory, and analytics — no database server required.",
    description:
      "Complete restaurant POS: ordering with real food photos, cash/card/mobile payments with change calculation, A4 + 80mm thermal invoices, live kitchen kanban, recipe-based inventory auto-deduction, loyalty tracking, and 14-day sales analytics. All data stored as JSON files for one-click deployment to Vercel or Docker.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui", "Zustand", "JSON-file storage", "NextAuth", "Recharts", "Bun"],
    featured: true,
    links: { live: "https://bite-box-pos.vercel.app", repo: null },
    whatIDid:
      "Built a production POS covering the full restaurant loop: ordering, payments across cash, card, and mobile money with quick-cash buttons and automatic change calculation, A4 + 80mm thermal invoice printing, a kitchen kanban display, recipe-based inventory auto-deduction, loyalty customers, discounts, 14-day analytics, and 4-role staff access. Every byte of data lives in JSON files — no database server to install, back up, or pay for. The whole system deploys to Vercel or Docker in one click.",
    whyItMatters: "Small restaurants get a full POS without hiring anyone to run infrastructure.",
  },
  {
    id: 3,
    name: "Trade Automation Platform",
    slug: "trade-automation",
    category: "business",
    type: "Business + automation + SaaS + e-commerce",
    tagline: "SaaS platform selling trading indicators, courses, and subscriptions with automated signal execution.",
    description:
      "Full-stack trading platform for selling indicators, managing tiered subscriptions, offering educational courses, and automating sales/engagement workflows. Integrates TradingView webhook alerts and Telegram community access, with API-key licensing, payment verification, and a real-time admin dashboard.",
    tech: ["Laravel", "PHP", "React", "Inertia.js", "Vite", "Tailwind CSS", "Stripe API", "Telegram Bot API", "Puppeteer", "MySQL/PostgreSQL"],
    featured: true,
    links: { live: "https://alnafialgo.com", repo: null },
    whatIDid:
      "Built a full-stack platform pairing a public marketing website with indicator sales, tiered subscriptions, and educational courses. TradingView webhooks execute signals automatically, the Telegram Bot API gates community access, and a licensing system with API keys plus payment verification runs the business rules. A real-time admin dashboard keeps sales and engagement workflows observable end-to-end.",
    whyItMatters: "Complete SaaS + e-commerce + automation in one platform — the kind of build usually split across a whole team.",
  },
  {
    id: 4,
    name: "Arafat CMS",
    slug: "arafat-cms",
    category: "business",
    type: "Content management system",
    tagline: "Multi-user content platform with publishing workflow, MDX editor, and analytics.",
    description:
      "Modern CMS enabling non-technical teams to create, organize, and publish content: markdown/MDX editor, categories and tags, Draft→Review→Publish workflow with scheduling, email notifications, PDF/ZIP export, and SEO tooling.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Prisma ORM", "PostgreSQL", "NextAuth", "JWT", "Nodemailer", "MDX Editor", "Framer Motion", "Zustand"],
    featured: true,
    links: { live: "https://arafat-cms-ikraminfo.vercel.app", repo: null },
    whatIDid:
      "Built a CMS that lets non-technical users manage web content independently: a markdown/MDX editor, categories and tags, a Draft→Review→Publish workflow with scheduling, analytics, and reusable templates. Email notifications keep collaborators in sync, and PDF/ZIP export plus built-in SEO tools round out the publishing pipeline.",
    whyItMatters: "Organizations manage their own web content — no developer required in the loop.",
  },
  {
    id: 5,
    name: "Hospital Management System",
    slug: "hospital-management-system",
    category: "business",
    type: "Healthcare management + admin system",
    tagline: "Hospital platform covering patients, appointments, records, pharmacy, wards, billing, and RBAC dashboards.",
    description:
      "Centralized hospital management: patient registration with medical history, appointment scheduling with doctor availability, medical records (labs, prescriptions, diagnoses), pharmacy inventory, ward/bed management, billing with insurance claims, and role-based dashboards for Doctor/Nurse/Admin/Receptionist/Patient.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Prisma", "PostgreSQL/MySQL", "NextAuth", "TanStack Table", "Nodemailer"],
    featured: true,
    links: { live: "https://hospital-management-system-hazel-one.vercel.app", repo: null },
    whatIDid:
      "Built a platform centralizing patient care, staff coordination, and administration: patient registration, appointments bound to doctor availability, and medical records spanning labs, prescriptions, and diagnoses. Pharmacy, wards/beds, and billing with insurance claims sit alongside role-based dashboards for Doctor, Nurse, Admin, Receptionist, and Patient — with analytics on top and secure record handling throughout.",
    whyItMatters: "Reduces appointment no-shows and centralizes medical records securely.",
  },
  {
    id: 6,
    name: "LUMIÈRE — Premium E-Commerce",
    slug: "lumiere-ecommerce",
    category: "business",
    type: "Luxury e-commerce storefront",
    tagline: "Luxury storefront for cosmetics and Islampuri shawls with a 3D hero and multi-gateway payments.",
    description:
      "Conversion-focused luxury e-commerce: interactive 3D hero (glass spheres, golden torus, mouse parallax), faceted search with 6-mode sorting, 360° product views, 4-step checkout with Stripe/EasyPaisa/JazzCash/COD, coupons, wishlist, order tracking, and a full analytics admin.",
    tech: ["Next.js 16", "React 19", "TypeScript", "React Three Fiber", "Framer Motion", "Prisma", "SQLite/PostgreSQL", "Stripe", "NextAuth", "Recharts"],
    featured: true,
    links: { live: "https://e-commerce-ikraminfo.vercel.app", repo: null },
    whatIDid:
      "Built a conversion-focused luxury storefront: a 3D hero with React Three Fiber glass spheres, a golden torus, and mouse parallax; faceted search with 6-mode sorting; a 360° product view; and a 4-step checkout accepting Stripe, EasyPaisa, JazzCash, and COD. Coupons, wishlist, order tracking, and full admin analytics complete the retail loop.",
    whyItMatters: "A high-end brand experience that actually converts.",
  },
  {
    id: 7,
    name: "Nexus Traffic Management System",
    slug: "nexus-traffic-management",
    category: "ai-ml",
    type: "AI + smart city + traffic monitoring",
    tagline: "Real-time AI traffic surveillance detecting violations with live camera feeds and emergency override.",
    description:
      "AI-powered traffic intelligence: YOLOv8/ONNX detection of speeding, phone usage, and seatbelt violations; live multi-camera WebSocket streaming; emergency signal override; network map; and analytics with violation trends and hotspots.",
    tech: ["Django", "Python", "React 19", "Vite", "Tailwind CSS", "YOLOv8", "ONNX Runtime", "WebSockets", "SQLite/PostgreSQL"],
    featured: true,
    links: { live: null, repo: null },
    whatIDid:
      "Designed an AI surveillance system that detects violations — speeding, phone use, seatbelt — in real time with YOLOv8/ONNX, while streaming live multi-camera feeds over WebSockets. Operators get emergency signal override, a network map of the grid, and analytics with violation hotspots.",
    whyItMatters: "Automated city traffic enforcement instead of manual patrols.",
  },
  {
    id: 8,
    name: "ERP Backend",
    slug: "erp-backend",
    category: "business",
    type: "Multi-tenant enterprise backend",
    tagline: "Production-grade multi-tenant ERP: accounting, inventory, POS, ZATCA tax, and 81-role RBAC.",
    description:
      "Enterprise backend with complete tenant isolation, general ledger and AP/AR accounting, inventory and warehouse management, sales/POS with real-time sync, KSA VAT + ZATCA e-invoicing, 81 tenant roles + 66 admin permissions, audit logs, and documentation-as-code with ADRs.",
    tech: ["TypeScript", "Node.js", "NestJS-style architecture", "PostgreSQL", "JWT", "OAuth 2.0"],
    featured: true,
    links: { live: null, repo: null },
    // Copy matched to ERP Backend by subject (was swapped with PhoenixAgent in the raw export).
    whatIDid:
      "Built the backend for enterprise operations: accounting (general ledger, AP/AR), inventory, sales, POS, and payments/subscriptions — with KSA VAT and ZATCA e-invoicing built in. Tenancy is enforced across 81 tenant roles and 66 admin permissions, every action lands in audit logs, and the architecture is documented as code with ADRs.",
    whyItMatters: "Enterprise-grade multi-tenancy with rigorous security — backend work that usually takes a team.",
  },
  {
    id: 9,
    name: "Pay-Roll System",
    slug: "payroll-system",
    category: "business",
    type: "HR/payroll management",
    tagline: "Employee salary management with auto-calculated deductions and printable official pay bills.",
    description:
      "Web-based payroll system for government/military/corporate use: employee data entry, search and edit, auto-calculated credits/debits/deductions/net pay, and printable dot-matrix pay bills in standard formats.",
    tech: ["PHP", "MySQL", "HTML5/CSS3", "JavaScript", "XAMPP"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 10,
    name: "Food Ordering System",
    slug: "food-ordering-system",
    category: "business",
    type: "E-commerce + food delivery platform",
    tagline: "Monorepo food ordering with cart, checkout, and real-time order tracking.",
    description:
      "Full-stack platform where customers browse, order, and track deliveries in real time while restaurant staff manage orders and menus — with reviews and notifications, built as a Laravel backend + React frontend monorepo.",
    tech: ["Laravel", "PHP", "React", "MySQL", "REST API"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 11,
    name: "PhoenixAgent",
    slug: "phoenixagent",
    category: "ai-ml",
    type: "Autonomous desktop AI + voice assistant",
    tagline: "Autonomous desktop assistant: ReAct loops, 50+ tools, real-time voice, and a PyQt6 HUD with safety guardrails.",
    description:
      "Desktop AI assistant using ReAct reasoning loops to dynamically select and execute 50+ tools across OS commands, browser control, and file management. Real-time voice pipeline (Faster-Whisper STT + Edge-TTS), OCR screen awareness, ChromaDB local vector memory, multi-provider LLM failover (Gemini/Groq/Ollama), and an animated PyQt6 HUD protected by OS-level safety guardrails.",
    tech: ["Python", "PyQt6", "Gemini API", "Groq API", "Faster-Whisper", "Edge-TTS", "Computer Vision", "ChromaDB", "Ollama"],
    featured: true,
    links: { live: null, repo: null },
    // Copy matched to PhoenixAgent by subject (was swapped with ERP Backend in the raw export).
    whatIDid:
      "Built a desktop agent that runs ReAct reasoning loops executing 50+ tools — OS commands, browser control, file management — behind a real-time voice pipeline (Faster-Whisper STT + Edge-TTS). OCR gives it screen awareness, ChromaDB provides local vector memory, and multi-provider failover (Gemini/Groq/Ollama) keeps it running when a provider drops. Every action surfaces in an animated PyQt6 HUD, guarded by OS-level safety guardrails.",
    whyItMatters: "Production-grade agentic AI with safety guardrails — not a demo.",
  },
  {
    id: 12,
    name: "Khanaqa — Seminary Management System (PHP)",
    slug: "khanaqa-seminary-cms",
    category: "business",
    type: "Enterprise CMS for Islamic educational institutions",
    tagline: "Production-grade seminary management: academic hierarchy, fee invoicing, grading engine, RTL Urdu support.",
    description:
      "Enterprise system for Islamic educational institutions with academic hierarchy management, fee invoicing, and an automated grading engine. Secure authentication (bcrypt, CSRF), 100% PDO prepared statements, and multi-language RTL/LTR Urdu support.",
    tech: ["PHP 8", "MySQL 8", "Bootstrap 5", "Chart.js", "DataTables"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 13,
    name: "TailorTrack",
    slug: "tailortrack",
    category: "mobile",
    type: "Cross-platform business mobile app",
    tagline: "Flutter app digitizing tailor measurements, orders, and delivery schedules — offline-first.",
    description:
      "Cross-platform (Android/Windows/Web) app digitizing customer measurements, orders, and delivery schedules with offline-first local SQLite persistence.",
    tech: ["Flutter", "Dart", "SQLite"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 14,
    name: "StudioPro / PassportPro AI",
    slug: "studiopro-passportpro",
    category: "utilities",
    type: "Client-side image processing tool",
    tagline: "Browser-only passport photo sheet generator — images never leave the device.",
    description:
      "Client-side image layout generator that automatically crops, centers, and arranges passport photos into standard multi-print sheet formats using the Canvas API — with a privacy-first, zero-server-upload design.",
    tech: ["JavaScript (Canvas API)", "HTML5/CSS3"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 15,
    name: "Headless Browser & Scraping Automation Engine",
    slug: "headless-scraping-engine",
    category: "automation",
    type: "Web scraping + automation service",
    tagline: "Resilient scraping engine handling anti-bot measures and large-scale structured extraction.",
    description:
      "Automation scripts and a FastAPI service layer handling anti-bot measures, dynamic form submissions, and large-scale structured data extraction with Playwright headless browsers.",
    tech: ["Python", "Playwright", "FastAPI"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 16,
    name: "LinkedIn Auto-Apply Bot",
    slug: "linkedin-auto-apply-bot",
    category: "automation",
    type: "Automation + job search bot",
    tagline: "Chrome extension + backend that matches resumes to jobs via LLM scoring and vector search.",
    description:
      "Chrome Extension and FastAPI backend service that filters and auto-applies to LinkedIn jobs using LLM-based resume-to-job matching and vector search, with a user-review step before submission.",
    tech: ["JavaScript", "Python", "FastAPI", "Groq", "Pinecone", "Gemini"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 17,
    name: "OEC Agentic Chatbot & Automation Bot",
    slug: "oec-chatbot",
    category: "ai-ml",
    type: "AI automation + chatbot + browser automation",
    tagline: "Automates the OEC SoftSkills portal end-to-end: login, courses, quizzes, certificates.",
    description:
      "Agentic chatbot automating interaction with the OEC SoftSkills portal — login, course interaction, quiz solving via Groq LLM, progress tracking, and certificate handling — plus an institutional RAG chatbot for overseas employment queries and regulatory guidance.",
    tech: ["Python", "FastAPI", "Playwright", "Groq", "LangChain", "RAG"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 18,
    name: "School Management & Content System (CMS)",
    slug: "school-management-cms",
    category: "business",
    type: "Academic management + CMS",
    tagline: "Server-rendered academic CMS with role-based access for admins, teachers, and students.",
    description:
      "High-performance academic CMS streamlining grade tracking, attendance, content distribution, and academic scheduling with role-based access control. (Source: master CV.)",
    tech: ["Next.js", "React", "Tailwind CSS", "Node.js"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 19,
    name: "Chat-bot (Gemini)",
    slug: "chatbot-gemini",
    category: "ai-ml",
    type: "AI chatbot + interactive app",
    tagline: "Streamlit generative AI chatbot with streaming responses and polished UX.",
    description:
      "Streamlit-based generative AI chatbot powered by Google Gemini, focused on interactive conversational responses with a polished, responsive interface.",
    tech: ["Python", "Streamlit", "Google Gemini API"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 20,
    name: "Deep Learning Lab",
    slug: "deep-learning-lab",
    category: "ai-ml",
    type: "Learning repository + AI research experiments",
    tagline: "Documented deep learning journey: CNNs, RNNs, and model training experiments.",
    description:
      "Learning-focused repository documenting neural network progress, model understanding, and implementation techniques across CNNs, RNNs, and advanced AI topics.",
    tech: ["Python", "Jupyter", "TensorFlow/PyTorch"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 21,
    name: "Dominant Color Detector",
    slug: "dominant-color-detector",
    category: "ai-ml",
    type: "Computer vision + image processing",
    tagline: "Extracts dominant image colors via KMeans clustering for palette generation.",
    description:
      "Python application extracting the main colors from images using KMeans clustering — useful for color analysis, palette generation, and image understanding.",
    tech: ["Python", "OpenCV", "KMeans", "scikit-learn", "NumPy"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 22,
    name: "Quotes Web Scraper",
    slug: "quotes-web-scraper",
    category: "automation",
    type: "Web scraping + automation",
    tagline: "Extracts quotes, authors, and tags into clean CSV datasets.",
    description:
      "Python scraper that extracts quotes, authors, and tags from the web and stores them in CSV for easy analysis and reuse.",
    tech: ["Python", "BeautifulSoup", "Requests", "CSV"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 23,
    name: "SSC Exam Analysis",
    slug: "ssc-exam-analysis",
    category: "data",
    type: "Data analysis + education analytics",
    tagline: "Statistical analysis of SSC exam results: failure patterns and subject performance.",
    description:
      "Analyzed SSC exam result data to study failure patterns, subject performance, and relationships between marks — uncovering trends with visual explanations.",
    tech: ["Python", "Pandas", "NumPy", "Jupyter", "Matplotlib", "Seaborn"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 24,
    name: "Streamlit Login & Visualization",
    slug: "streamlit-login-visualization",
    category: "data",
    type: "Data visualization + authentication app",
    tagline: "Secure-login Streamlit dashboard with chart-based data exploration.",
    description:
      "Streamlit app combining secure login with CSV-based dashboard reporting and interactive chart exploration.",
    tech: ["Python", "Streamlit", "MySQL", "Pandas", "Matplotlib", "Seaborn", "mysql-connector"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 25,
    name: "Time-Table (Madrasa App)",
    slug: "time-table-madrasa",
    category: "mobile",
    type: "Mobile app + community information",
    tagline: "Flutter community app sharing madrasa programs, timetables, and announcements.",
    description:
      "Flutter mobile application for a madrasa sharing educational programs, timetable information, announcements, and contact details — designed mobile-first for the local community.",
    tech: ["Flutter", "Dart"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 26,
    name: "YouTube Video Downloader",
    slug: "youtube-video-downloader",
    category: "utilities",
    type: "Utility tool + media automation",
    tagline: "HD YouTube downloads with automatic audio/video stream merging.",
    description:
      "Python tool downloading YouTube videos in high quality with automatic merging of audio and video streams for offline use.",
    tech: ["Python", "pytube", "tqdm", "ffmpeg"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 27,
    name: "Bank Management System",
    slug: "bank-management-system",
    category: "utilities",
    type: "Core programming + management system",
    tagline: "Console banking in C++ with OOP and file-based persistence.",
    description:
      "Console-based bank management system handling account creation, balance updates, transactions, and file-based data storage — demonstrating strong OOP fundamentals.",
    tech: ["C++", "OOP", "File Handling"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 28,
    name: "Security System",
    slug: "security-system",
    category: "business",
    type: "Security system + dashboard app",
    tagline: "Security monitoring dashboard with backend logic and Docker-ready deployment.",
    description:
      "Security and monitoring system with a dashboard, backend logic, and deployment-ready (Docker) architecture focused on management and access control.",
    tech: ["TypeScript", "Python", "Docker"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 29,
    name: "Khanaqa CMS (TypeScript)",
    slug: "khanaqa-cms-ts",
    category: "business",
    type: "Content management system",
    tagline: "TypeScript CMS for structured content operations and publishing workflows.",
    description:
      "CMS focused on structured content operations, admin editing, and publishing structure — a distinct project from the PHP Seminary Management System; never merge the two.",
    tech: ["TypeScript", "CSS"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 30,
    name: "Deploy CMS",
    slug: "deploy-cms",
    category: "business",
    type: "CMS + deployment workflow system",
    tagline: "CMS connecting content publishing and deployment tasks in one system.",
    description:
      "Deployment-oriented CMS where content publishing and deployment tasks are managed in one streamlined system.",
    tech: ["TypeScript", "CSS"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 31,
    name: "Zeb Food Bank",
    slug: "zeb-food-bank",
    category: "business",
    type: "Management system + nonprofit support app",
    tagline: "Food bank management for donations, distributions, and operations.",
    description:
      "Food bank management application focused on managing food donations, distributions, and operational workflows to streamline food support.",
    tech: ["JavaScript"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 32,
    name: "User Database Python",
    slug: "user-database-python",
    category: "utilities",
    type: "Database management app",
    tagline: "Simple CRUD application for storing and retrieving user records.",
    description:
      "Python application for managing user data — storing and retrieving records with basic database and CRUD operations.",
    tech: ["Python"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 33,
    name: "HED Automation",
    slug: "hed-automation",
    category: "automation",
    type: "Automation workflow",
    tagline: "Streamlines repetitive digital tasks and internal operational workflows.",
    description:
      "Automation project focused on streamlining repetitive digital tasks and internal operational workflows — practical process-automation problem solving.",
    tech: ["Automation Frameworks", "Scripting"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 34,
    name: "Chatbot (JavaScript)",
    slug: "chatbot-javascript",
    category: "utilities",
    type: "JavaScript app + chatbot",
    tagline: "Client-side conversational chatbot with clean interaction design.",
    description:
      "JavaScript-based chatbot with conversational functionality, reflecting client-side interaction design and chatbot logic.",
    tech: ["JavaScript"],
    featured: false,
    links: { live: null, repo: null },
  },
  {
    id: 35,
    name: "GitHub Profile",
    slug: "github-profile",
    category: "utilities",
    type: "Portfolio setup / profile repository",
    tagline: "Personal GitHub profile repository presenting project identity.",
    description:
      "Configured personal GitHub profile repository presenting identity and project portfolio online.",
    tech: ["GitHub Markdown"],
    featured: false,
    links: { live: "https://github.com/ikram-3", repo: "https://github.com/ikram-3" },
  },
];

/** Featured set of 8 per PORTFOLIO_CONTEXT.md §5 (Agentic ChatBot, BiteBox, Trade, Arafat CMS, Hospital, LUMIÈRE, Nexus, PhoenixAgent). */
export const FEATURED_ORDER = [1, 2, 3, 4, 5, 6, 7, 11] as const;

/** Generated project art (project assets only — profile avatars are user-supplied, never generated). */
export const PROJECT_IMAGES: Record<number, { src: string; alt: string }> = {
  1: {
    src: "/images/project/project-agentic-chatbot.png",
    alt: "Agentic ChatBot interface — RAG answers with citation chips, academic green theme",
  },
  2: {
    src: "/images/project/project-bitebox-pos.png",
    alt: "BiteBox POS touchscreen with order cart and menu tiles, tomato red and mustard theme",
  },
  3: {
    src: "/images/project/project-trade-automation.png",
    alt: "Trade Automation dashboard with candlestick charts and automation workflow lines",
  },
  4: {
    src: "/images/project/project-arafat-cms.png",
    alt: "Arafat CMS editorial dashboard with draft to review to published workflow columns",
  },
  5: {
    src: "/images/project/project-hospital.png",
    alt: "Hospital Management dashboard with appointments, vitals and bed occupancy panels",
  },
  6: {
    src: "/images/project/project-lumiere.png",
    alt: "LUMIÈRE luxury storefront hero with glass spheres and golden torus, burgundy and gold",
  },
  7: {
    src: "/images/project/project-nexus-traffic.png",
    alt: "Nexus Traffic control room with multi-camera feeds and violation detection boxes",
  },
  8: {
    src: "/images/project/project-erp-backend.png",
    alt: "ERP Backend accounting suite dashboard with ledger, inventory, POS and tax module tiles, amber and gold theme",
  },
  9: {
    src: "/images/project/project-payroll-system.png",
    alt: "Pay-Roll System dashboard with salary run panel, payslip cards and deductions chart, warm amber and gold theme",
  },
  10: {
    src: "/images/project/project-food-ordering-system.png",
    alt: "Food Ordering System on tablet and phone with menu tiles, order cart and live tracking map, warm amber and gold theme",
  },
  11: {
    src: "/images/project/project-phoenixagent.png",
    alt: "PhoenixAgent desktop HUD with glowing assistant core, orbiting tools and voice waveform",
  },
  12: {
    src: "/images/project/project-khanaqa-seminary-cms.png",
    alt: "Khanaqa seminary administration dashboard with academic hierarchy, fee invoices and grading charts, amber and gold theme",
  },
  13: {
    src: "/images/project/project-tailortrack.png",
    alt: "TailorTrack phone mockup with measurement cards, order status timeline and delivery schedule, violet glow theme",
  },
  14: {
    src: "/images/project/project-studiopro-passportpro.png",
    alt: "StudioPro / PassportPro photo sheet tool with placeholder frame grid, crop guides and privacy shield, graphite and gold theme",
  },
  15: {
    src: "/images/project/project-headless-scraping-engine.png",
    alt: "Headless scraping engine console with browser cards funneled into data tables, queue and retry gauges, copper and orange theme",
  },
  16: {
    src: "/images/project/project-linkedin-auto-apply-bot.png",
    alt: "LinkedIn Auto-Apply Bot console with resume and job cards joined by match-score rings, copper and orange theme",
  },
  17: {
    src: "/images/project/project-oec-chatbot.png",
    alt: "OEC chatbot automation console with login-to-certificate task checklist and agent progress timeline, emerald and teal theme",
  },
  18: {
    src: "/images/project/project-school-management-cms.png",
    alt: "School management dashboard with role switcher, timetable grid and attendance gauges, amber and gold theme",
  },
  19: {
    src: "/images/project/project-chatbot-gemini.png",
    alt: "Gemini chatbot interface with streaming chat bubbles, typing indicator and suggestion chips, emerald and teal theme",
  },
  20: {
    src: "/images/project/project-deep-learning-lab.png",
    alt: "Deep Learning Lab dashboard with neural network diagram, loss curve chart and GPU gauges, emerald and teal theme",
  },
  21: {
    src: "/images/project/project-dominant-color-detector.png",
    alt: "Dominant Color Detector scene with segmented artwork and extracted color swatch palette, emerald and teal theme",
  },
  22: {
    src: "/images/project/project-quotes-web-scraper.png",
    alt: "Quotes Web Scraper console with webpage card filtered into structured table rows and dataset export, copper and orange theme",
  },
  23: {
    src: "/images/project/project-ssc-exam-analysis.png",
    alt: "SSC Exam Analysis board with subject performance bars, failure pattern heat grid and distribution curve, magenta and rose theme",
  },
  24: {
    src: "/images/project/project-streamlit-login-visualization.png",
    alt: "Streamlit login and visualization dashboard with shield login card and chart exploration panels, magenta and rose theme",
  },
  25: {
    src: "/images/project/project-time-table-madrasa.png",
    alt: "Time-Table madrasa app phone mockups with weekly schedule grid, announcements and crescent motif, violet glow theme",
  },
  26: {
    src: "/images/project/project-youtube-video-downloader.png",
    alt: "YouTube Video Downloader panel with thumbnail tiles, progress bars and audio-video merge diagram, graphite and gold theme",
  },
  27: {
    src: "/images/project/project-bank-management-system.png",
    alt: "Bank Management System terminal scene with account ledger rows and menu prompt, graphite and gold theme",
  },
  28: {
    src: "/images/project/project-security-system.png",
    alt: "Security System dashboard with camera feed tiles, alert list and health gauges, amber and gold theme",
  },
  29: {
    src: "/images/project/project-khanaqa-cms-ts.png",
    alt: "Khanaqa CMS content operations dashboard with schema panels, workflow columns and version timeline, amber and gold theme",
  },
  30: {
    src: "/images/project/project-deploy-cms.png",
    alt: "Deploy CMS pipeline board with content cards flowing into build and deploy stages, amber and gold theme",
  },
  31: {
    src: "/images/project/project-zeb-food-bank.png",
    alt: "Zeb Food Bank dashboard with donation cards, distribution route map and inventory chart, amber and gold theme",
  },
  32: {
    src: "/images/project/project-user-database-python.png",
    alt: "User Database records app with table rows, add-edit-delete actions and search field, graphite and gold theme",
  },
  33: {
    src: "/images/project/project-hed-automation.png",
    alt: "HED Automation board with connected task nodes, trigger switches and run status gauges, copper and orange theme",
  },
  34: {
    src: "/images/project/project-chatbot-javascript.png",
    alt: "JavaScript chatbot widget with friendly bubbles, quick reply chips and input bar, graphite and gold theme",
  },
  35: {
    src: "/images/project/project-github-profile.png",
    alt: "GitHub profile page mockup with repository card grid, gold contribution heatmap and pinned projects, graphite and gold theme",
  },
};

/** Exact deploy notes from portfolio/pages/projects-showcase.md — never invent. */
export const DEPLOY_NOTES: Record<number, string> = {
  3: "Docker-ready · private repo",
  6: "Docker/Vercel ready · private repo",
  7: "Docker-ready · private repo",
  11: "Private repo",
};

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return FEATURED_ORDER.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is Project => Boolean(p)
  );
}

export function getProjectImage(id: number): { src: string; alt: string } | null {
  const item = PROJECT_IMAGES[id];
  if (!item) return null;
  return {
    ...item,
    src: item.src.replace("/images/project/", "/images/project/v2/"),
  };
}

export function getDeployNote(id: number): string {
  return DEPLOY_NOTES[id] ?? "Private repo";
}

/** Prev/next within the full registry (sorted by id) — powers detail-page navigation. */
export function getAdjacentProjects(id: number): { prev: Project | null; next: Project | null } {
  const sorted = [...projects].sort((a, b) => a.id - b.id);
  const idx = sorted.findIndex((p) => p.id === id);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}

export function getCategoryLabel(id: string): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}
