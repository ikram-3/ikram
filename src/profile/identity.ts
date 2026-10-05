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
   * Portrait: user-supplied avatar (avatars.zip → A02-gold-ring).
   * Identity Lock: never generated, never edited — used as provided.
   */
  avatar: {
    src: "/images/profile/A02-gold-ring.png",
    alt: "Portrait of Muhammad Ikram, software engineer",
  },
  /** Secondary provided avatar used on the About page. */
  avatarAbout: {
    src: "/images/profile/A01-circle-minimal.png",
    alt: "Portrait of Muhammad Ikram in an office setting with soft bokeh background",
  },
} as const;

export const stats = {
  projectsTotal: 35,
  projectsFeatured: 8,
  liveDeployments: 6,
  certifications: 3,
} as const;

export const domains = ["AI/ML", "Full-Stack", "Automation", "Mobile", "Data"] as const;
