// PROFILE MODULE — Journey: experience, education, certifications.
// Facts Gate: traced verbatim to portfolio/portfolio.json + PERSONAL_PROFILE.md.

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  credential: string;
  institution: string;
  period: string;
  detail: string | null;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  note: string | null;
}

export const experience: ExperienceItem[] = [
  {
    role: "Full-Stack WordPress Developer (Freelance)",
    org: "Self-employed",
    period: "June 2024 – Aug 2024",
    bullets: [
      "Engineered custom, responsive WordPress solutions with a focus on UX/UI best practices.",
      "Optimized backend performance and SEO metadata; deployed WooCommerce e-commerce architectures.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    credential: "Bachelor of Science in Software Engineering (BS-SE)",
    institution: "University of Swat, Pakistan",
    period: "Nov 2024 – Present",
    detail: "4th semester",
  },
  {
    credential: "Secondary & Higher Secondary Education (Computer Science)",
    institution: "Government Degree College, Mingora, Swat",
    period: "2022–2024",
    detail: null,
  },
];

export const certifications: CertificationItem[] = [
  {
    name: "AI Engineering Certification (KPITB)",
    issuer: "KPITB",
    note: "Deep Learning, NLP, Transformers, RAG, Agentic AI",
  },
  {
    name: "Artificial Intelligence Course (NVTAC)",
    issuer: "NVTAC",
    note: "Completed with Distinction (89/100)",
  },
  {
    name: "Python for Data Science",
    issuer: "Great Learning Academy",
    note: null,
  },
];
