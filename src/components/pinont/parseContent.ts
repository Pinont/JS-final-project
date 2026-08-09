import type { Lang } from "./translations"
import type { Project } from "./projectData"

// Type aliases to avoid inline type semicolon issues
type SkillGroup = {
  category: string
  items: string[]
}

type StatItem = {
  value: string
  labelEN: string
  labelTH: string
}

type SocialItem = {
  label: string
  url: string
  handle: string
  icon: string
}

type ContactLink = {
  label: string
  url: string
  prefix: string
  handle: string
}

// Type alias for work experience item
type WorkItem = {
  company: string
  logo: string
  roleEN: string
  roleTH: string
  periodEN: string
  periodTH: string
}

// ---------------------------------------------------------------------------
// Generic key/value + list parser
// Format:
//   # key_name
//   en: English value
//   th: Thai value
//
//   # list_key
//   - item one
//   - item two
// ---------------------------------------------------------------------------
export function parseTranslations(
  md: string,
): Record<string, Record<Lang, string>> {
  const result: Record<string, Record<Lang, string>> = {}
  // Split on lines that start with exactly "# " (single hash)
  const blocks = md.split(/\n(?=# [^\s#])/)

  for (const block of blocks) {
    const lines = block
      .trim()
      .split("\n")
      .filter((l) => l.trim())
    if (!lines.length) continue
    const firstLine = lines[0].trim()
    if (!firstLine.startsWith("# ")) continue
    const key = firstLine.slice(2).trim()

    const enMatch = lines.find((l) => /^en:\s/.test(l))
    const thMatch = lines.find((l) => /^th:\s/.test(l))
    if (!enMatch && !thMatch) continue

    const en = enMatch ? enMatch.replace(/^en:\s*/, "").trim() : key
    const th = thMatch ? thMatch.replace(/^th:\s*/, "").trim() : en
    result[key] = { EN: en, TH: th }
  }

  return result
}

// Parse bullet lists from a block:  "# key\n- a\n- b" → string[]
export function parseLists(md: string): Record<string, string[]> {
  const result: Record<string, string[]> = {}
  const blocks = md.split(/\n(?=# [^\s#])/)

  for (const block of blocks) {
    const lines = block
      .trim()
      .split("\n")
      .filter((l) => l.trim())
    if (!lines.length) continue
    const firstLine = lines[0].trim()
    if (!firstLine.startsWith("# ")) continue
    const key = firstLine.slice(2).trim()
    const bullets = lines.filter((l) => l.trim().startsWith("- "))
    if (bullets.length) {
      result[key] = bullets.map((l) => l.replace(/^-\s*/, "").trim())
    }
  }

  return result
}

// ---------------------------------------------------------------------------
// Skills parser
// Format (after --- separator):
//   ## Category Name
//   skill1, skill2, skill3
// ---------------------------------------------------------------------------
export function parseSkills(md: string): SkillGroup[] {
  const groups: SkillGroup[] = []
  // Only parse the section after ---
  const body = md.split("---").slice(1).join("---")
  const blocks = body.split(/\n(?=## )/).filter(Boolean)

  for (const block of blocks) {
    const lines = block
      .trim()
      .split("\n")
      .filter((l) => l.trim())
    if (!lines.length) continue
    const categoryLine = lines.find((l) => l.startsWith("## "))
    if (!categoryLine) continue
    const category = categoryLine.slice(3).trim()

    // Remaining lines are items (comma-separated or bullet)
    const itemLines = lines.filter(
      (l) => !l.startsWith("## ") && !l.startsWith("#"),
    )
    let items: string[] = []
    for (const line of itemLines) {
      if (line.trim().startsWith("- ")) {
        items.push(line.replace(/^-\s*/, "").trim())
      } else {
        items.push(
          ...line
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        )
      }
    }
    if (category && items.length) groups.push({ category, items })
  }

  return groups
}

// ---------------------------------------------------------------------------
// Projects parser
// Format (after --- separator):
//   ## Project Name
//   id: project-id
//   status: Live|Done|Maintenance
//   type: Personal|Event|Academic|Company|Freelance
//   stack: skill1, skill2
//   image: https://...
//   link: https://...
//   nameth: Thai name
//   desc: English description
//   descth: Thai description
// ---------------------------------------------------------------------------
export function parseProjects(md: string): Project[] {
  const projects: Project[] = []
  const body = md.split("---").slice(1).join("---")
  const blocks = body.split(/\n(?=## )/).filter(Boolean)

  for (const block of blocks) {
    const lines = block
      .trim()
      .split("\n")
      .filter((l) => l.trim())
    if (!lines.length) continue
    const nameLine = lines.find((l) => l.startsWith("## "))
    if (!nameLine) continue
    const name = nameLine.slice(3).trim()

    const meta: Record<string, string> = {}
    for (const line of lines) {
      if (line.startsWith("## ") || line.startsWith("#")) continue
      const m = line.match(/^([a-zA-Z]+):\s*(.+)$/)
      if (m) meta[m[1].toLowerCase()] = m[2].trim()
    }

    projects.push({
      id:
        meta.id ||
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      name,
      nameTH: meta.nameth || name,
      desc: meta.desc || "",
      descTH: meta.descth || meta.desc || "",
      stack: meta.stack
        ? meta.stack
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      status: meta.status as "Live" | "Done" | "Maintenance" || "Done",
      type: meta.type || "Personal",
      image: meta.image || "",
      link: meta.link,
    })
  }

  return projects
}

// ---------------------------------------------------------------------------
// Work experience parser
// Format (after ---work separator):
//   ### Company Name
//   logo: AB
//   role_en: DevOps Engineer
//   role_th: DevOps Engineer
//   period_en: Mar 2025 – Apr 2026 · Remote
//   period_th: มี.ค. 2568 – เม.ย. 2569 · ทางไกล
// ---------------------------------------------------------------------------
export function parseWork(md: string): WorkItem[] {
  const work: WorkItem[] = []
  const section = md.split("---work")[1]?.split("---")[0] ?? ""
  const blocks = section.split(/\n(?=### )/).filter(Boolean)
  for (const block of blocks) {
    const lines = block
      .trim()
      .split("\n")
      .filter((l) => l.trim())
    const labelLine = lines.find((l) => l.startsWith("### "))
    if (!labelLine) continue
    const company = labelLine.slice(4).trim()
    const meta: Record<string, string> = {}
    for (const line of lines) {
      const m = line.match(/^([a-zA-Z_]+):\s*(.+)$/)
      if (m) meta[m[1].toLowerCase()] = m[2].trim()
    }
    work.push({
      company,
      logo: meta.logo ?? company.slice(0, 2).toUpperCase(),
      roleEN: meta.role_en ?? "",
      roleTH: meta.role_th ?? meta.role_en ?? "",
      periodEN: meta.period_en ?? "",
      periodTH: meta.period_th ?? meta.period_en ?? "",
    })
  }
  return work
}

// ---------------------------------------------------------------------------
// About stats parser
// Format (after ---stats separator):
//   ### Label
//   value: 9
//   label_en: Projects
//   label_th: โปรเจกต์
// ---------------------------------------------------------------------------
export function parseStats(md: string): StatItem[] {
  const stats: StatItem[] = []
  const section = md.split("---stats")[1]?.split("---")[0] ?? ""
  const blocks = section.split(/\n(?=### )/).filter(Boolean)
  for (const block of blocks) {
    const lines = block
      .trim()
      .split("\n")
      .filter((l) => l.trim())
    if (!lines.find((l) => l.startsWith("### "))) continue
    const meta: Record<string, string> = {}
    for (const line of lines) {
      const m = line.match(/^([a-zA-Z_]+):\s*(.+)$/)
      if (m) meta[m[1].toLowerCase()] = m[2].trim()
    }
    if (meta.value)
      stats.push({
        value: meta.value,
        labelEN: meta.label_en ?? "",
        labelTH: meta.label_th ?? meta.label_en ?? "",
      })
  }
  return stats
}

// ---------------------------------------------------------------------------
// About socials parser
// Format (after ---socials separator):
//   ### GitHub
//   url: https://...
//   handle: Pinont
//   icon: ⌥
// ---------------------------------------------------------------------------
export function parseSocials(md: string): SocialItem[] {
  const socials: SocialItem[] = []
  const section = md.split("---socials")[1]?.split("---")[0] ?? ""
  const blocks = section.split(/\n(?=### )/).filter(Boolean)
  for (const block of blocks) {
    const lines = block
      .trim()
      .split("\n")
      .filter((l) => l.trim())
    const labelLine = lines.find((l) => l.startsWith("### "))
    if (!labelLine) continue
    const label = labelLine.slice(4).trim()
    const meta: Record<string, string> = {}
    for (const line of lines) {
      const m = line.match(/^([a-zA-Z]+):\s*(.+)$/)
      if (m) meta[m[1].toLowerCase()] = m[2].trim()
    }
    if (meta.url)
      socials.push({
        label,
        url: meta.url,
        handle: meta.handle ?? "",
        icon: meta.icon ?? "◻",
      })
  }
  return socials
}

// ---------------------------------------------------------------------------
// Contact links parser
// Format (after --- separator):
//   ### Label
//   url: https://...
//   prefix: github.com/
//   handle: Username
// ---------------------------------------------------------------------------
export function parseContactLinks(md: string): ContactLink[] {
  const links: ContactLink[] = []
  const body = md.split("---").slice(1).join("---")
  const blocks = body.split(/\n(?=### )/).filter(Boolean)

  for (const block of blocks) {
    const lines = block
      .trim()
      .split("\n")
      .filter((l) => l.trim())
    const labelLine = lines.find((l) => l.startsWith("### "))
    if (!labelLine) continue
    const label = labelLine.slice(4).trim()
    const meta: Record<string, string> = {}
    for (const line of lines) {
      const m = line.match(/^([a-zA-Z]+):\s*(.+)$/)
      if (m) meta[m[1].toLowerCase()] = m[2].trim()
    }
    if (meta.url)
      links.push({
        label,
        url: meta.url,
        prefix: meta.prefix || "",
        handle: meta.handle || "",
      })
  }

  return links
}
