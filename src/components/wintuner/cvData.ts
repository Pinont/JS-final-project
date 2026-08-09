export type CVLanguage = "en" | "th"

export type CVCategory = "production" | "competition" | "academic" | "personal" | "openSource"

export type LanguageMap<T> = Record<CVLanguage, T>

export type CategoryMap<T> = Record<CVCategory, T>

export interface EducationItem {
  school: string
  period: string
  detail: string
  gpa: string
  image?: string
}

export interface ExperienceItem {
  title: string
  period: string
  points: string[]
}

export interface ProjectItem {
  name: string
  role: string
  description: string
  target: string
  problem: string
  learned: string
  url?: string
}

export interface SelfDevelopmentItem {
  certifications: Array<{
    name: string
    institution: string
    image?: string
  }>
  workshops: Array<{
    name: string
    institution: string
    image?: string
  }>
}

export interface AwardItem {
  competitions: Array<{
    name: string
    rank: string
    theme: string
    image?: string
  }>
  honors: Array<{
    name: string
    institution: string
    detail: string
    image?: string
  }>
}

export interface LeadershipItem {
  title: string
  role: string
  description: string
  softSkills: string[]
  period: string
  image?: string
}

export interface CVCopy {
  pageLabel: string
  name: string
  intro: string
  sectionProf: string
  sectionSelf: string
  sectionAwards: string
  sectionLead: string
  sectionEd: string
  roleLabel: string
  targetLabel: string
  problemLabel: string
  learnedLabel: string
  certLabel: string
  workshopLabel: string
  compLabel: string
  honorLabel: string
  skillLabel: string
  gpaLabel: string
  categories: Record<CVCategory, string>
}

export type EducationMap = LanguageMap<EducationItem[]>
export type ProfessionalExperienceMap = LanguageMap<CategoryMap<ProjectItem[]>>
export type SelfDevelopmentMap = LanguageMap<SelfDevelopmentItem>
export type AwardMap = LanguageMap<AwardItem>
export type LeadershipMap = LanguageMap<LeadershipItem[]>
export type ExperienceMap = LanguageMap<ExperienceItem[]>
export type CVCopyMap = LanguageMap<CVCopy>

export const education = {
  en: [
    {
      school: "Chiang Rai Provincial Administrative Organization School",
      period: "2019 - 2025",
      detail: "Software Engineer Program",
      gpa: "3.97",
      image: "/crapao-school.png",
    },
    {
      school: "Chiang Mai University",
      period: "2025 - Present",
      detail: "CAMT, Bachelor of Science in Digital Industry Integration",
      gpa: "3.40",
      image: "/cmu-education.png",
    },
  ],
  th: [
    {
      school: "โรงเรียนองค์การบริหารส่วนจังหวัดเชียงราย",
      period: "2019 - 2025",
      detail: "แผนการเรียนวิศวกรรมซอฟต์แวร์",
      gpa: "3.97",
      image: "/crapao-school.png",
    },
    {
      school: "มหาวิทยาลัยเชียงใหม่",
      period: "2025 - ปัจจุบัน",
      detail: "CAMT, วท.บ. สาขาการบูรณาการอุตสาหกรรมดิจิทัล",
      gpa: "3.40",
      image: "/cmu-education.png",
    },
  ],
} satisfies EducationMap

export const professionalExperience: ProfessionalExperienceMap = {
  en: {
    production: [
      {
        name: "Muanjai (ม่วนใจ๋)",
        role: "Co-Founder & Chief Technology Officer (CTO)",
        description:
          "An AI-powered compliance helper bot that helps hotels, homestays, and individuals manage their licenses, certificates, and document expiry via LINE Official Account and a web client.",
        target:
          "Hotels, homestays, and individuals who need to track licenses, certificates, and compliance deadlines.",
        problem:
          "License and certificate expiry dates are scattered across paper documents and spreadsheets — easy to miss, with fines and compliance risks when forgotten.",
        learned:
          "Building RAG-based document Q&A on local LLMs (Pathumma LLM on ThaiSC supercomputing infra), designing expiry reminder flows, building secure real-time PromptPay verification, hardening webhook reliability (retry dedup, reply-window deadlines, operator alerting), and enforcing security best practices (session secret fail-fast, CORS anchoring) — all guarded by a CI pipeline running 240+ tests.",
        url: "https://line.me/R/ti/p/%40636owbhl",
      },
      {
        name: "Municipality Web Application - Phlu Ta Luang",
        role: "Back-end Developer (Member)",
        description:
          "A web application built to streamline municipal operations and service management.",
        target: "Government staff and local citizens.",
        problem: "Manual paperwork and decentralized data management.",
        learned:
          "Real-world web application workflow and collaboration with municipal staff.",
        url: "https://github.com/farpinta/ProjectPruta",
      },
    ],
    competition: [
      {
        name: "HYLIFE Hackathon 2025",
        role: "Developer & Presenter",
        description: "Solution for Smart Agriculture and Food Supply Chain.",
        target: "Farmers and food supply chain managers.",
        problem:
          "Inefficiency in tracking produce quality and supply chain transparency.",
        learned:
          "Rapid prototyping, pitch deck preparation, and working under pressure.",
      },
    ],
    academic: [
      {
        name: "OOP Lab Project 2026",
        role: "Lead Developer",
        description:
          "A Java-based application implementing Object-Oriented Programming principles.",
        target: "CS Students / Faculty.",
        problem: "Need for a practical implementation of OOP patterns.",
        learned:
          "Advanced Java concepts, design patterns, and clean code principles.",
      },
      {
        name: "DII Design - CAMT Open House 2025",
        role: "Presentation & UX Designer",
        description:
          "Interactive presentation for exploring development roles.",
        target: "Prospective students.",
        problem:
          "Complexity in understanding different tech roles for beginners.",
        learned: "User-centric design and effective technical communication.",
      },
    ],
    personal: [
      {
        name: "AIM4 Mod",
        role: "Creator",
        description:
          "A modification project for AIM4 focused on static content delivery.",
        target: "Modding community.",
        problem: "Lack of lightweight and updated content for the platform.",
        learned: "Web layout fundamentals and community feedback integration.",
      },
    ],
    openSource: [
      {
        name: "ProjectPruta Contributions",
        role: "Contributor",
        description:
          "Maintenance and bug fixes for the open-source municipal template.",
        target: "Open-source developers.",
        problem: "Unresolved issues in the core template.",
        learned:
          "Git workflow, code review processes, and contributing to community projects.",
      },
    ],
  },
  th: {
    production: [
      {
        name: "Muanjai (ม่วนใจ๋)",
        role: "ผู้ร่วมก่อตั้งและประธานเจ้าหน้าที่ฝ่ายเทคโนโลยี (Co-Founder & CTO)",
        description:
          "บอทช่วยดูแลด้านการปฏิบัติตามข้อกำหนด (Compliance Helper Bot) ด้วย AI ช่วยให้โรงแรม โฮมสเตย์ และบุคคลทั่วไป จัดการใบอนุญาต ใบรับรอง และติดตามวันหมดอายุเอกสารผ่าน LINE OA และเว็บแอปพลิเคชัน",
        target:
          "โรงแรม โฮมสเตย์ และบุคคลทั่วไป ที่ต้องติดตามใบอนุญาต ใบรับรอง และวันครบกำหนดด้าน compliance",
        problem:
          "วันหมดอายุของใบอนุญาตและใบรับรองกระจายอยู่ในเอกสารกระดาษและสเปรดชีต — หลงลืมง่าย เสี่ยงค่าปรับและปัญหาทางกฎหมายเมื่อปล่อยเลยกำหนด",
        learned:
          "สร้างระบบถาม-ตอบเอกสารด้วย RAG บน LLM ภาษาไทย (Pathumma LLM บนโครงสร้างพื้นฐาน ThaiSC Supercomputer), ออกแบบระบบแจ้งเตือนวันหมดอายุ, สร้างระบบตรวจสอบสลิปและสแกนชำระเงิน PromptPay อัตโนมัติ, เสริมความน่าเชื่อถือของ webhook (กันข้อความซ้ำ, ควบคุมเวลาตอบกลับ, แจ้งเตือนผู้ดูแล), และยึดหลักปฏิบัติด้านความปลอดภัย (บังคับ SESSION_SECRET_KEY, ตรึงขอบเขต CORS) — โดยมี CI ที่รันเทสต์ 240+ รายการคอยดูแล",
        url: "https://line.me/R/ti/p/%40636owbhl",
      },
      {
        name: "เว็บแอปพลิเคชันเทศบาล - เทศบาลตำบลพลูตาหลวง",
        role: "นักพัฒนาส่วนหลัง (สมาชิกทีม)",
        description: "แอปพลิเคชันเพื่อช่วยจัดการฐานข้อมูลและบริการประชาชนของเทศบาล",
        target: "พนักงานเทศบาลและประชาชนในพื้นที่",
        problem: "การจัดการระบบเอกสารที่ซ้ำซ้อนและข้อมูลไม่รวมศูนย์",
        learned: "ได้เรียนรู้การทำงานร่วมกับพนักงานในสายงานปกครอง และ Workflow แอปจริง",
        url: "https://github.com/farpinta/ProjectPruta",
      },
    ],
    competition: [
      {
        name: "HYLIFE Hackathon 2025",
        role: "นักพัฒนาและผู้นำเสนอ",
        description: "โซลูชันสำหรับเกษตรกรรมอัจฉริยะและห่วงโซ่อุปทานอาหาร",
        target: "เกษตรกรและผู้จัดการห่วงโซ่อุปทาน",
        problem: "ความไม่มีประสิทธิภาพในการติดตามคุณภาพผลผลิตและความโปร่งใส",
        learned:
          "การสร้างต้นแบบอย่างรวดเร็ว (Prototyping) และการทำงานภายใต้ความกดดัน",
      },
    ],
    academic: [
      {
        name: "โปรเจกต์ OOP Lab 2026",
        role: "นักพัฒนาหลัก",
        description:
          "แอปพลิเคชัน Java ที่เน้นการนำหลักการ Object-Oriented มาใช้งานจริง",
        target: "นักศึกษาและผู้สนใจวิทยาการคอมพิวเตอร์",
        problem: "ต้องการตัวอย่างการประยุกต์ใช้ Design Patterns ที่ชัดเจน",
        learned: "เข้าใจหลักการ OOP เชิงลึกและการเขียนโค้ดที่บำรุงรักษาง่าย",
      },
      {
        name: "DII Design - CAMT Open House 2025",
        role: "ผู้ออกแบบการนำเสนอและ UX",
        description: "สื่อนำเสนอที่อธิบายเส้นทางสายอาชีพในยุคดิจิทัล",
        target: "นักเรียนมัธยมและผู้เข้าชมงาน",
        problem: "ความเข้าใจยากของบทบาทในสายงานไอทีสำหรับคนนอก",
        learned: "การออกแบบที่ยึดผู้ใช้เป็นหลักและการสื่อสารข้อมูลสายวิชาการให้เข้าใจง่าย",
      },
    ],
    personal: [
      {
        name: "AIM4 Mod",
        role: "ผู้สร้าง",
        description: "โปรเจกต์ปรับแต่ง AIM4 เน้นการจัดการเนื้อหาแบบ Static",
        target: "กลุ่มผู้ใช้งาน Mod",
        problem: "ขาดแพลตฟอร์มที่เบาและทันสมัยสำหรับข้อมูล Mod",
        learned: "พื้นฐานการจัดเลย์เอาต์เว็บและการรับฟีดแบ็กจากผู้ใช้",
      },
    ],
    openSource: [
      {
        name: "การช่วยพัฒนา ProjectPruta",
        role: "ผู้ร่วมพัฒนา",
        description: "การแก้ไข Bug และปรับปรุงฟังก์ชันในคลังโปรเจกต์สาธารณะ",
        target: "นักพัฒนาโอเพนซอร์ส",
        problem: "ต้องการการซ่อมแซม Bug ในตัวเทมเพลตหลัก",
        learned: "กระบวนการ Git Workflow และการตรวจสอบโค้ดร่วมกับผู้อื่น",
      },
    ],
  },
}

export const selfDevelopment = {
  en: {
    certifications: [
      {
        name: "UX/UI Foundation Program 2025",
        institution: "T.C.C. Technology Co., Ltd.",
        image: "/tcc-uxui.png",
      },
      { name: "Google Data Analytics", institution: "Coursera (In Progress)" },
    ],
    workshops: [
      {
        name: "Modern Web Infrastructure Workshop",
        institution: "Tech Community",
      },
      { name: "Agile Development Seminar", institution: "CAMT" },
    ],
  },
  th: {
    certifications: [
      {
        name: "โครงการพื้นฐาน UX/UI 2025",
        institution: "บริษัท ที.ซี.ซี. เทคโนโลยี จำกัด",
        image: "/tcc-uxui.png",
      },
      { name: "Google Data Analytics", institution: "Coursera (กำลังเรียน)" },
    ],
    workshops: [
      { name: "สัมมนาโครงสร้างเว็บพื้นฐานยุคใหม่", institution: "Tech Community" },
      {
        name: "สัมมนาการพัฒนาแบบ Agile",
        institution: "วิทยาลัยศิลปะ สื่อ และเทคโนโลยี",
      },
    ],
  },
} satisfies SelfDevelopmentMap

export const awards = {
  en: {
    competitions: [
      {
        name: "HYLIFE Hackathon 2025",
        rank: "3rd Place Winner",
        theme: "Smart Agriculture",
        image: "/hylife-hackathon.png",
      },
    ],
    honors: [
      {
        name: "Academic Excellence Award",
        institution: "Grade 12",
        detail: "Highest GPA in Software Program",
      },
    ],
  },
  th: {
    competitions: [
      {
        name: "HYLIFE Hackathon 2025",
        rank: "รางวัลชนะเลิศอันดับ 3",
        theme: "Smart Agriculture",
        image: "/hylife-hackathon.png",
      },
    ],
    honors: [
      {
        name: "รางวัลผลการเรียนดีเด่น",
        institution: "ม.ปลาย",
        detail: "เกรดเฉลี่ยสูงสุดในแผนกซอฟต์แวร์",
      },
    ],
  },
} satisfies AwardMap

export const leadership = {
  en: [
    {
      title: "School Representative - Japan Cultural Exchange",
      role: "Student Representative",
      description:
        "Selected as a school representative for the Language and Cultural Exchange Program at Shizuoka Seiko Academy in Shizuoka, Japan.",
      softSkills: [
        "Cross-Cultural Communication",
        "Adaptability",
        "Interpersonal Skills",
      ],
      period: "April 12 - 26, 2023",
      image: "/IMG_0809.jpg",
    },
  ],
  th: [
    {
      title:
        "ตัวแทนโรงเรียน - โครงการแลกเปลี่ยนภาษาและวัฒนธรรมต่างประเทศ (ประเทศญี่ปุ่น)",
      role: "ตัวแทนนักเรียน",
      description:
        "ได้รับการคัดเลือกเป็นตัวแทนของโรงเรียน ในโครงการส่งเสริมประสบการณ์การเรียนรู้ภาษาและวัฒนธรรมต่างประเทศ (ประเทศญี่ปุ่น) ณ Shizuoka Seiko Academy, จังหวัดชิซึโอกะ ประเทศญี่ปุ่น ระหว่างวันที่ 12 - 26 เมษายน ๒๕๖๖",
      softSkills: ["การสื่อสารต่างวัฒนธรรม", "การปรับตัว", "มนุษยสัมพันธ์"],
      period: "12 - 26 เมษายน 2566",
      image: "/IMG_0809.jpg",
    },
  ],
} satisfies LeadershipMap

export const experiences = {
  en: [
    {
      title: "Muanjai (ม่วนใจ๋) - Co-Founder & Chief Technology Officer (CTO)",
      period: "June 2026 - Present",
      points: [
        "Co-founded and engineered Muanjai, an AI-powered compliance helper bot that helps hotels, homestays, and individuals track licenses and document expiry via [LINE OA](https://line.me/R/ti/p/%40636owbhl) and a [Web Client](https://muanjai-ai.up.railway.app/chat/).",
        "Designed the core AI architecture, integrating NECTEC's Pathumma LLM leveraging ThaiSC's supercomputing infrastructure for RAG-based document Q&A in Thai.",
        "Built expiry reminder flows, document upload and status summaries, plus secure real-time PromptPay payment verification.",
        "Hardened the LINE webhook pipeline: retry idempotency ledger, reply-window deadline guards, and concurrency caps so every message gets a reply inside LINE's 30s token window.",
        "Added operator alerting that pushes critical errors (e.g. webhook error-rate spikes) to an admin LINE account, rate-limited to avoid alert floods.",
        "Established DevOps practices including cloud deployment, CI/CD automation, and rigorous security standards for proprietary code and data protection — CI enforces lint, type checks, and 240+ tests.",
      ],
    },
    {
      title: "P'CAT HOUSE - Part-time Administrative Assistant",
      period: "March 2022 - Present",
      points: [
        "Managed tenant records including personal information and utility tracking.",
        "Recorded payment data in Excel and Google Sheets.",
        "Organized administrative documents.",
        "Designed notices using Canva.",
      ],
    },
  ],
  th: [
    {
      title:
        "Muanjai (ม่วนใจ๋) - ผู้ร่วมก่อตั้งและประธานเจ้าหน้าที่ฝ่ายเทคโนโลยี (Co-Founder & CTO)",
      period: "มิถุนายน 2569 - ปัจจุบัน",
      points: [
        "ร่วมก่อตั้งและพัฒนา Muanjai บอทช่วยดูแลด้านการปฏิบัติตามข้อกำหนด (Compliance Helper Bot) ด้วย AI สำหรับโรงแรม โฮมสเตย์ และบุคคลทั่วไป ในการติดตามใบอนุญาตและวันหมดอายุเอกสาร ผ่าน [LINE OA](https://line.me/R/ti/p/%40636owbhl) และ [Web Client](https://muanjai-ai.up.railway.app/chat/)",
        "ออกแบบโครงสร้างระบบ AI ผสานการใช้ Pathumma LLM ของ NECTEC บนโครงสร้างพื้นฐานซูเปอร์คอมพิวเตอร์ ThaiSC สำหรับระบบถาม-ตอบเอกสาร (RAG) เป็นภาษาไทย",
        "พัฒนาระบบแจ้งเตือนวันหมดอายุเอกสาร, ระบบอัปโหลดเอกสารและสรุปสถานะ รวมถึงระบบตรวจสอบความถูกต้องของสลิปและสแกนชำระเงินผ่าน PromptPay แบบเรียลไทม์",
        "เสริมความน่าเชื่อถือให้ LINE Webhook: ระบบกันข้อความซ้ำ (idempotency), การควบคุมเวลาตอบกลับภายในหน้าต่าง reply token 30 วินาที และการจำกัดจำนวนงานพร้อมกัน",
        "เพิ่มระบบแจ้งเตือนอัตโนมัติถึงผู้ดูแลเมื่อมีข้อผิดพลาดรุนแรง (เช่น อัตราข้อผิดพลาด webhook สูง) ผ่าน LINE โดยจำกัดความถี่ไม่ให้รบกวนเกินไป",
        "จัดทำโครงสร้างพื้นฐานระบบ Cloud, ระบบตรวจสอบความผิดพลาด (Observability), วางระบบ CI/CD และรักษาความลับของซอร์สโค้ดและข้อมูลส่วนตัว — CI ตรวจ lint, type check และเทสต์ 240+ รายการ",
      ],
    },
    {
      title: "P'CAT HOUSE - ผู้ช่วยงานธุรการ (พาร์ตไทม์)",
      period: "มีนาคม 2022 - ปัจจุบัน",
      points: [
        "ดูแลข้อมูลผู้เช่าและข้อมูลการชำระเงิน",
        "บันทึกและดูแลข้อมูลด้วย Excel และ Google Sheets",
        "ช่วยจัดระเบียบและอัปเดตเอกสารงานธุรการ",
        "ออกแบบประกาศและเอกสารด้วย Canva",
      ],
    },
  ],
} satisfies ExperienceMap

export const copy = {
  en: {
    pageLabel: "Resume / CV",
    name: "Thanatphong Tarin",
    intro:
      "Software engineering student and Co-Founder & CTO of Muanjai. Passionate about building Agentic AI systems, full-stack web applications, and digital industry integrations.",
    sectionProf: "Professional Experience",
    sectionSelf: "Self-Development",
    sectionAwards: "Awards & Achievements",
    sectionLead: "Leadership & Volunteer",
    sectionEd: "Education",
    roleLabel: "Role",
    targetLabel: "Target / Audience",
    problemLabel: "Problem Solved",
    learnedLabel: "Lessons Learned",
    certLabel: "Certifications",
    workshopLabel: "Workshops & Seminars",
    compLabel: "Competitions",
    honorLabel: "Honors & Awards",
    skillLabel: "Soft Skills",
    gpaLabel: "GPA",
    categories: {
      production: "Production",
      competition: "Competition",
      academic: "Academic",
      personal: "Personal",
      openSource: "Open Source",
    },
  },
  th: {
    pageLabel: "เรซูเม่ / ประวัติย่อ",
    name: "ธณัฐพงค์ ทะรินทร์",
    intro:
      "นักศึกษาสายวิศวกรรมซอฟต์แวร์ ผู้ร่วมก่อตั้งและ CTO ของ Muanjai มุ่งเน้นการพัฒนาระบบ Agentic AI, เว็บแอปพลิเคชันแบบ Full-Stack และการบูรณาการเทคโนโลยีดิจิทัลในภาคอุตสาหกรรม",
    sectionProf: "ประสบการณ์ระดับมืออาชีพ",
    sectionSelf: "การพัฒนาตนเอง",
    sectionAwards: "รางวัลและความสำเร็จ",
    sectionLead: "ความเป็นผู้นำและงานอาสา",
    sectionEd: "การศึกษา",
    roleLabel: "บทบาทของคุณ",
    targetLabel: "กลุ่มเป้าหมาย",
    problemLabel: "ปัญหาที่แก้ไข",
    learnedLabel: "สิ่งที่คุณได้เรียนรู้",
    certLabel: "ใบประกาศนียบัตร",
    workshopLabel: "การอบรมและสัมมนา",
    compLabel: "การแข่งขัน",
    honorLabel: "รางวัลเกียรติยศ",
    skillLabel: "ทักษะด้านอารมณ์และสังคม (Soft Skills)",
    gpaLabel: "เกรดเฉลี่ย",
    categories: {
      production: "Production Project",
      competition: "Competition Project",
      academic: "Academic Project",
      personal: "Personal Project",
      openSource: "Open Source / Contributions",
    },
  },
} satisfies CVCopyMap

export interface WipItem {
  id: number
  name: string
  description: string
  progress: number
  lastUpdated: string
  url: string
  branch: string
  commits: number
}

export const wipItems: WipItem[] = [
  {
    id: 1305752375,
    name: "AutoOS",
    description:
      "AutoOS is a Native AOT WinUI 3 application that automates migrating to a new Windows installation on a separate partition. With minimal user effort, it seamlessly configures a cleaner and faster system optimized for gaming performance and productivity while preserving all system compatibility.",
    progress: 65,
    lastUpdated: "2026-07-21T07:40:26Z",
    url: "https://github.com/tinodin/AutoOS",
    branch: "master",
    commits: 42,
  },
  {
    id: 100,
    name: "DotDoctor",
    description:
      "🩺 The ultimate config doctor & dependency checker for Hyprland and modular dotfiles.",
    progress: 57,
    lastUpdated: "2026-06-26T18:00:00Z",
    url: "https://github.com/WinTuner/DotDoctor",
    branch: "main",
    commits: 34,
  },
  {
    id: 101,
    name: "aim4-mod",
    description:
      "A modified version of the Autonomous Intersection Management (AIM4) micro-simulator for autonomous vehicle traffic control.",
    progress: 80,
    lastUpdated: "2026-06-23T12:00:00Z",
    url: "https://github.com/WinTuner/aim4-mod",
    branch: "main",
    commits: 100,
  },
]

export const skillsMatrix = {
  en: [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      category: "Backend & Database",
      items: ["Node.js", "Express", "Java", "PostgreSQL", "Supabase"],
    },
    {
      category: "Infrastructure",
      items: [
        "Docker",
        "CI/CD",
        "Vercel",
        "Nginx",
        "Arch Linux / CachyOS",
        "WireGuard VPN",
      ],
    },
    {
      category: "Tools & Media",
      items: [
        "Git",
        "GitHub Actions",
        "Postman",
        "DaVinci Resolve",
        "CapCut",
        "OBS Studio",
      ],
    },
  ],
  th: [
    {
      category: "ฟรอนต์เอนด์",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      category: "แบ็กเอนด์ & ฐานข้อมูล",
      items: ["Node.js", "Express", "Java", "PostgreSQL", "Supabase"],
    },
    {
      category: "อินฟราสตรัคเจอร์",
      items: [
        "Docker",
        "CI/CD",
        "Vercel",
        "Nginx",
        "Arch Linux / CachyOS",
        "WireGuard VPN",
      ],
    },
    {
      category: "เครื่องมือ & มีเดีย",
      items: [
        "Git",
        "GitHub Actions",
        "Postman",
        "DaVinci Resolve",
        "CapCut",
        "OBS Studio",
      ],
    },
  ],
}

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContributionWeek {
  days: ContributionDay[]
}

export interface Contributions {
  weeks: ContributionWeek[]
  total: number
}

function countToLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0
  if (count <= 2) return 1
  if (count <= 4) return 2
  if (count <= 7) return 3
  return 4
}

function mulberry32(seed: number): () => number {
  return () => {
    let next = (seed |= 0)
    next = (next + 0x6d2b79f5) | 0
    let t = Math.imul(next ^ (next >>> 15), 1 | next)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashString(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0
  }
  return hash
}

export function generateContributions(): Contributions {
  const weeks: ContributionWeek[] = []
  const today = new Date()
  today.setHours(12, 0, 0, 0)

  const toIso = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`

  const end = today.getDay() // 0 = Sunday
  const startOffset = 52 * 7 - 1 - end
  const start = new Date(today)
  start.setDate(today.getDate() - startOffset)

  let total = 0
  for (let weekIndex = 0; weekIndex < 52; weekIndex++) {
    const days: ContributionDay[] = []
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const date = new Date(start)
      date.setDate(start.getDate() + weekIndex * 7 + dayIndex)
      const iso = toIso(date)
      const random = mulberry32(hashString(`WinTuner:${iso}`))()

      const weekday = date.getDay()
      const isWeekend = weekday === 0 || weekday === 6
      const recency = (52 * 7 - (weekIndex * 7 + dayIndex)) / (52 * 7)
      const base = isWeekend ? 0.25 : 0.75
      const count =
        date > today
          ? 0
          : Math.floor(random * random * 6 * base * (0.6 + recency * 0.8))
      total += count
      days.push({ date: iso, count, level: countToLevel(count) })
    }
    weeks.push({ days })
  }

  return { weeks, total }
}

export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  status: "shipped" | "in-progress" | "archived"
  category: string
  year: string
  stars: number
  forks: number
  url: string
  homepage?: string
  featured?: boolean
  highlight?: boolean
}

export const fallbackProjects: Project[] = [
  {
    id: 1305752375,
    title: "AutoOS",
    description:
      "AutoOS is a Native AOT WinUI 3 application that automates migrating to a new Windows installation on a separate partition. With minimal user effort, it seamlessly configures a cleaner and faster system optimized for gaming performance and productivity while preserving all system compatibility.",
    tags: ["C#", "WinUI 3", "Windows"],
    status: "in-progress",
    category: "openSource",
    year: "2026",
    stars: 0,
    forks: 0,
    url: "https://github.com/tinodin/AutoOS",
    featured: true,
    highlight: true,
  },
  {
    id: 100,
    title: "DotDoctor",
    description:
      "🩺 The ultimate config doctor & dependency checker for Hyprland and modular dotfiles.",
    tags: ["Shell", "Bash", "Linux"],
    status: "in-progress",
    category: "personal",
    year: "2026",
    stars: 0,
    forks: 0,
    url: "https://github.com/WinTuner/DotDoctor",
    featured: true,
    highlight: false,
  },
  {
    id: 101,
    title: "aim4-mod",
    description:
      "A modified version of the Autonomous Intersection Management (AIM4) micro-simulator for autonomous vehicle traffic control.",
    tags: ["Java", "HTML", "Simulation"],
    status: "in-progress",
    category: "personal",
    year: "2026",
    stars: 0,
    forks: 0,
    url: "https://github.com/WinTuner/aim4-mod",
    featured: true,
  },
  {
    id: 102,
    title: "AEGIS-1-Terminal-Twine-game",
    description:
      "An atmospheric, text-based psychological cosmic horror game built with Twine and SugarCube. Manage your O2 supply and Sanity while unravelling the terrifying mystery of Case File 24 aboard the shifting AEGIS-1 station. 🚀🧠🌌",
    tags: ["Twine", "HTML", "CSS", "Game"],
    status: "shipped",
    category: "personal",
    year: "2026",
    stars: 0,
    forks: 0,
    url: "https://github.com/WinTuner/AEGIS-1-Terminal-Twine-game",
    featured: false,
  },
  {
    id: 103,
    title: "linux-vs-windows-latency",
    description:
      "A hands-on C benchmark comparing input latency and scheduling behavior between Linux and Windows on identical hardware.",
    tags: ["C", "Linux", "Benchmark"],
    status: "in-progress",
    category: "personal",
    year: "2026",
    stars: 0,
    forks: 0,
    url: "https://github.com/WinTuner/linux-vs-windows-latency",
    featured: false,
  },
  {
    id: 104,
    title: "sample-boot-3tier",
    description:
      "Day 4 starting skeleton for Backend Programming (MFU): the library app split into three tiers, ready for the DTO + MapStruct session.",
    tags: ["Java", "Spring Boot", "Academic"],
    status: "in-progress",
    category: "academic",
    year: "2026",
    stars: 0,
    forks: 0,
    url: "https://github.com/WinTuner/sample-boot-3tier",
    featured: false,
  },
  {
    id: 105,
    title: "sample-boot-microservice",
    description:
      "Backend Programming (MFU) microservice session: the library app split into two programs that talk over HTTP.",
    tags: ["Java", "Spring Boot", "Microservices"],
    status: "in-progress",
    category: "academic",
    year: "2026",
    stars: 0,
    forks: 0,
    url: "https://github.com/WinTuner/sample-boot-microservice",
    featured: false,
  },
  {
    id: 106,
    title: "sample-boot-pubsub",
    description:
      "Backend Programming (MFU) event-driven session: the borrow service announces changes and other services react via pub/sub.",
    tags: ["Java", "Spring Boot", "Event-Driven"],
    status: "in-progress",
    category: "academic",
    year: "2026",
    stars: 0,
    forks: 0,
    url: "https://github.com/WinTuner/sample-boot-pubsub",
    featured: false,
  },
  {
    id: 107,
    title: "asg-backend-682110174",
    description:
      "Assignment: Spring Data JPA domain model with relationships, H2 database, RESTful API controller, and unit tests.",
    tags: ["Java", "Spring Boot", "JPA"],
    status: "in-progress",
    category: "academic",
    year: "2026",
    stars: 0,
    forks: 0,
    url: "https://github.com/WinTuner/asg-backend-682110174",
    featured: false,
  },
]
