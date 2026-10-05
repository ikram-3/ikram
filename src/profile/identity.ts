// PROFILE MODULE — Identity & contact facts.
// Facts Gate: every value traces to ikram-context-kit PERSONAL_PROFILE.md + portfolio/portfolio.json.
// Do not edit values without updating the kit files first.

export interface Socials {
  linkedin: string;
  github: string;
  website: string;
}

export const identity = {
  name: "Muhammad Ikram",
  role: "Software Engineer",
  title: "Software Engineer — Full-Stack × Applied AI × Automation",
  location: "Islampur, Swat, Pakistan",
  email: "ikram.dataengineer.info@gmail.com",
  phone: "0349-9934605",
  socials: {
    linkedin: "https://linkedin.com/in/ikramds",
    github: "https://github.com/ikram-3",
    website: "https://ikram.is-great.net",
  } satisfies Socials,
  /** Affiliation line shown under portrait — both facts from PERSONAL_PROFILE.md. */
  affiliations: "KPITB Generative AI Fellow · University of Swat",
  /**
   * Primary 3D avatar (A07) with transparent PNG support.
   * Rendered on Home & About pages with enhanced 3D lighting.
   */
  avatar: {
    src: "/images/profile/A07-3d-character-transparent.png",
    alt: "3D Character Portrait of Muhammad Ikram, software engineer",
  },
  /** Secondary 3D portrait used on the About page. */
  avatarAbout: {
    src: "/images/profile/A07-3d-character-transparent.png",
    alt: "3D Character Portrait of Muhammad Ikram in office setting",
  },
  /** Official brand logo badge (A06) flat vector in vibrant emerald ring. */
  logo: {
    src: "/logo.png",
    alt: "Muhammad Ikram Logo Badge",
  },
} as const;

export const stats = {
  projectsTotal: 35,
  projectsFeatured: 8,
  liveDeployments: 6,
  certifications: 3,
} as const;

export const domains = ["AI/ML", "Full-Stack", "Automation", "Mobile", "Data"] as const;
