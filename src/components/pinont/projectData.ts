import projectsMd from "./content/projects.md?raw"
import { parseProjects } from "./parseContent"

export interface Project {
  id: string
  name: string
  nameTH: string
  desc: string
  descTH: string
  stack: string[]
  status: "Live" | "Done" | "Maintenance"
  type: string
  image: string
  link?: string
}

export const projects: Project[] = parseProjects(projectsMd)
