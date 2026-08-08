export interface TeamMember {
  id: string
  nameTh: string
  nameEn: string
  role: string
  bio: string
  email: string
  github: string
  linkedin: string
  accentColor: string
  initials: string
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "pm",
    nameTh: "นนท์นิพัทธ์ ตั้งโรจนขจร",
    nameEn: "Nonniphat Tangrojanakhajorn",
    role: "Project Manager (PM)",
    bio: "Steering product vision, orchestrating agile workflows, and ensuring seamless collaboration across engineering teams.",
    email: "pm.nonniphat@brick-team.io",
    github: "nonniphat-pm",
    linkedin: "nonniphat-tang",
    accentColor: "#b94fff", // Purple
    initials: "NT",
  },
  {
    id: "frontend",
    nameTh: "ธณัฐพงค์ ทะรินทร์",
    nameEn: "Thanatphong Tharin",
    role: "Frontend Developer (Frontend)",
    bio: "Building blazing-fast, secure, and highly responsive user interfaces using React 19, Vite, and Tailwind CSS v4.",
    email: "thanatphong2719@gmail.com",
    github: "WinTuner",
    linkedin: "thanatphong-tharin",
    accentColor: "#a8ff3e", // Lime Green
    initials: "TT",
  },
  {
    id: "uxui",
    nameTh: "ภูริวัชร สุภัคกนก",
    nameEn: "Phuriwat Supakkanok",
    role: "UX/UI Designer (UX/UI)",
    bio: "Crafting intuitive, accessible, and high-fidelity design systems and user experiences for complex security workflows.",
    email: "design.phuriwat@brick-team.io",
    github: "phuriwat-ux",
    linkedin: "phuriwat-supakkanok",
    accentColor: "#00d4ff", // Cyan
    initials: "PS",
  },
]
