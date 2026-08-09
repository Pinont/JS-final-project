import mainMd from "./content/main.md?raw"
import aboutMd from "./content/about.md?raw"
import skillsMd from "./content/skills.md?raw"
import projectsMd from "./content/projects.md?raw"
import contactMd from "./content/contact.md?raw"
import { parseTranslations, parseLists } from "./parseContent"

export type Lang = "EN" | "TH"

// Parse all content files
const fromMain = parseTranslations(mainMd)
const fromAbout = parseTranslations(aboutMd)
const fromSkills = parseTranslations(skillsMd)
const fromProjects = parseTranslations(projectsMd)
const fromContact = parseTranslations(contactMd)

// Static nav/UI strings that don't belong in content files
const navStrings: Record<string, Record<Lang, string>> = {
  nav_about: { EN: "About", TH: "เกี่ยวกับ" },
  nav_skills: { EN: "Skills", TH: "ทักษะ" },
  nav_projects: { EN: "Projects", TH: "โปรเจกต์" },
  nav_github: { EN: "GitHub", TH: "กิตฮับ" },
  nav_contact: { EN: "Contact", TH: "ติดต่อ" },
  github_label: { EN: "// ACTIVITY", TH: "// กิจกรรม" },
  github_title: { EN: "GitHub Contributions", TH: "การมีส่วนร่วมบน GitHub" },
  chat_placeholder: { EN: "Ask about Nont...", TH: "ถามเกี่ยวกับน้อนต์..." },
  chat_title: { EN: "Ask AI about Nont", TH: "ถาม AI เกี่ยวกับน้อนต์" },
  chat_cta: { EN: "Ask about Nont", TH: "ถาม AI" },
}

export const t: Record<string, Record<Lang, string>> = {
  ...navStrings,
  ...fromMain,
  ...fromAbout,
  ...fromSkills,
  ...fromProjects,
  ...fromContact,
}

export function tr(key: string, lang: Lang): string {
  return t[key]?.[lang] ?? t[key]?.["EN"] ?? key
}

// Export parsed list data (taglines etc.)
const lists = parseLists(mainMd)
export const TAGLINES_EN: string[] = lists["taglines_en"] ?? []
export const TAGLINES_TH: string[] = lists["taglines_th"] ?? []

// "available" → true, anything else → false
// Edit availability_status in src/content/about.md to change
export const IS_AVAILABLE: boolean =
  (fromAbout["availability_status"]?.EN ?? "").toLowerCase() === "available"
