import type { Project } from "@/data/projects";
import { titleCase } from "@/lib/i18n";

// The one title a project goes by in Portfolio: the outcome-led title when it
// has one, otherwise its name. Used by the Work/Selected-work rows and by the
// project page heading so the two always read the same.
export function displayTitle(project: Pick<Project, "title" | "outcomeTitle">): string {
  return project.outcomeTitle ?? titleCase(project.title);
}
