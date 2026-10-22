export type MediaAsset = {
  type: "image" | "video";
  src: string;
};

export type GalleryItem = {
  label: string;
  media?: MediaAsset;
};

// Short "decision → why → result" summary shown above a case study's
// brief, so a reader gets the one choice that mattered and its outcome
// before the long-form text. Only use facts already stated in the case.
export type ProjectDecisionSummary = {
  decision: string;
  why: string;
  result: string;
};

// Alternative summary for projects better told as problem → solution →
// what the designer did → result. Same slot as the decision block; the
// renderer picks the layout by checking for `problem`.
export type ProjectOverviewSummary = {
  problem: string;
  solution: string;
  did: string;
  result: string;
};

export type ProjectDecision = ProjectDecisionSummary | ProjectOverviewSummary;

// Structured long-form case study (portfolio detail page): titled sections
// with big headings, optional sub-sections listed under the sidebar entry,
// and block-level subtitles / pull-quotes. Optional — projects without it
// keep the brief / strategy / result layout.
export type SectionBlock =
  | { type: "p"; text: string }
  | { type: "subtitle"; text: string }
  | { type: "label"; text: string }
  | { type: "callout"; text: string }
  | { type: "list"; items: string[] }
  | { type: "result" };

// One tool used on the project and what it was used for (portfolio page).
export type ProjectTool = { name: string; use?: string };

export type CaseSubsection = {
  id: string;
  label: string;
  title: string;
  blocks: SectionBlock[];
};

export type CaseSection = {
  id: string;
  label: string;
  title: string;
  blocks: SectionBlock[];
  children?: CaseSubsection[];
};

// Flattens sections into the plain `strategy` string list that the other
// site modes (corporate, SaaS, store) still render, so the copy has a single
// source of truth.
export function sectionsToStrategy(sections: CaseSection[]): string[] {
  const out: string[] = [];
  const unit = (title: string, blocks: SectionBlock[]) => {
    const parts: string[] = [];
    let prefix = "";
    for (const b of blocks) {
      if (b.type === "result") continue;
      if (b.type === "list") {
        parts.push(prefix + b.items.join("; "));
        prefix = "";
        continue;
      }
      if (b.type === "label") prefix = `${b.text}: `;
      else if (b.type === "subtitle") prefix = `${b.text}. `;
      else {
        parts.push(prefix + b.text);
        prefix = "";
      }
    }
    if (parts.length === 0) return;
    out.push(`${title} — ${parts.join(" ")}`);
  };
  for (const sec of sections) {
    unit(sec.title, sec.blocks);
    for (const child of sec.children ?? []) unit(child.title, child.blocks);
  }
  return out;
}

export type ProjectTranslation = {
  category?: string;
  tag?: string;
  subtitle?: string;
  role?: string;
  result?: string;
  services?: string;
  skills?: string[];
  brief?: string;
  strategy?: string[];
  headline?: string;
  decision?: ProjectDecision;
  sections?: CaseSection[];
  badges?: string[];
  tools?: ProjectTool[];
  outcomeTitle?: string;
};

// A single captioned screenshot inside a feature's photo grid (see
// FeatureDeepDive.gallery below). `caption` is the Spanish base copy;
// `captionEn` is the English override, following the same fallback
// convention as everything else in this file.
export type FeatureImage = {
  media: MediaAsset;
  caption: string;
  captionEn?: string;
};

// A deep-dive tab for a single complex feature/flow within a larger SaaS
// project (e.g. "AI document eligibility"). Optional — only projects with
// enough process complexity to warrant their own tab set this. Rendered as
// an extra tab (Branding/Marketplace) or an extra stacked section (SaaS)
// alongside brief/strategy/services/skills, driven by ProjectDetail.tsx,
// MarketplaceProductDetail.tsx and ProjectsWindow.tsx.
export type FeatureDeepDive = {
  id: string;
  label: string;
  title: string;
  body: string[];
  // optional single screenshot/photo shown below the body copy for this tab.
  media?: MediaAsset;
  // optional grid of captioned screenshots, shown below `media`/body —
  // for tabs that need to walk through several specific screens/flows
  // rather than (or in addition to) one hero shot.
  gallery?: FeatureImage[];
  // Optional strip of 2-3 big-number stats scoped to this specific feature
  // (e.g. "30+ WIOA eligibility categories"), distinct from the project-wide
  // `Project.metrics` shown in the header. Same estimate-disclosure rule
  // applies: use `metricsNote`/`metricsNoteEn` whenever a value isn't a
  // measured/tracked figure.
  metrics?: MetricStat[];
  metricsNote?: string;
  metricsNoteEn?: string;
  // English override — same fallback convention as Project.en below.
  en?: {
    label?: string;
    title?: string;
    body?: string[];
  };
};

// A single big-number stat shown in a project's metrics strip (e.g. "16+" /
// "Document types supported"). Purely presentational — value is a short
// string (supports "~70%", "16+", "1 workflow", etc.), not a typed number.
export type MetricStat = {
  value: string;
  label: string;
  valueEn?: string;
  labelEn?: string;
};

// A card in the Portfolio project page's "Digital presence" section: small
// title, big value, one-line detail. Used for external context figures
// (e.g. SE Ranking estimates), never for results claimed from the design.
export type PresenceStat = {
  title: string;
  value: string;
  detail: string;
  titleEn?: string;
  valueEn?: string;
  detailEn?: string;
};

export type DigitalPresence = {
  // section heading; defaults to "Digital presence" when omitted
  heading?: string;
  headingEn?: string;
  stats: PresenceStat[];
  note: string;
  noteEn?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  tag: string;
  subtitle: string;
  client: string;
  role: string;
  year: string;
  result: string;
  services?: string;
  skills: string[];
  cover: string;
  coverMedia?: MediaAsset;
  brief: string;
  strategy: string[];
  headline: string;
  // Optional outcome-led title used on the home's selected-work rows
  // instead of the plain project name.
  outcomeTitle?: string;
  decision?: ProjectDecision;
  sections?: CaseSection[];
  badges?: string[];
  tools?: ProjectTool[];
  gallery: GalleryItem[];
  pending?: boolean;
  // Excluded from `projects` (and therefore every listing/grid/sitemap) but
  // kept in source — for modules parked without being deleted outright.
  hidden?: boolean;
  features?: FeatureDeepDive[];
  // Context cards shown only on the Portfolio project page (see
  // PortfolioProjectDetail.tsx), with a disclosure note.
  digitalPresence?: DigitalPresence;
  // Portfolio page only: ids of `features` shown as a secondary "more
  // features" section at the end of a structured (sections) case study.
  secondaryFeatureIds?: string[];
  // Optional strip of 2-3 big-number stats shown near the top of the project
  // (before the brief). `metricsNote` is a small disclosure line rendered
  // below the numbers — required whenever a value is an estimate rather than
  // a measured/tracked figure, so the portfolio never presents an estimate
  // as if it were analytics data.
  metrics?: MetricStat[];
  metricsNote?: string;
  metricsNoteEn?: string;
  // English overrides for the EN/ES site-wide language toggle — see
  // src/lib/i18n.ts:localizeProject(). Undefined fields fall back to the
  // Spanish original above.
  en?: ProjectTranslation;
};

export function img(slug: string, file: string): MediaAsset {
  return { type: "image", src: `/projects/${slug}/${file}` };
}

export function video(slug: string, file: string): MediaAsset {
  return { type: "video", src: `/projects/${slug}/${file}` };
}

export function mediaFor(folder: string, file: string): MediaAsset {
  return file.endsWith(".mp4") || file.endsWith(".mov") ? video(folder, file) : img(folder, file);
}

// generates generic-labeled gallery items for intro-<start>..<end> uploads;
// `defaultExt` covers projects uploaded mostly as one format (e.g. mostly
// .mp4), `extOverrides` covers individual slots re-uploaded in a different
// format (e.g. { 4: "png" } when intro-04 exists as .png instead of the rest)
export function introGallery(
  folder: string,
  title: string,
  start: number,
  end: number,
  defaultExt: string = "webp",
  extOverrides: Record<number, string> = {}
): GalleryItem[] {
  const items: GalleryItem[] = [];
  for (let n = start; n <= end; n++) {
    const ext = extOverrides[n] ?? defaultExt;
    items.push({
      label: `${title} — imagen ${n}`,
      media: mediaFor(folder, `intro-${String(n).padStart(2, "0")}.${ext}`),
    });
  }
  return items;
}

// A project's public/projects/<folder> name doesn't always match its URL
// slug (e.g. "bodas-de-sangre" ships assets under "violencia-normalizada").
// Derive the real folder from any media the project already has, falling
// back to the slug only for projects with no assets yet.
export function assetFolder(project: Project): string {
  const sample = project.coverMedia?.src ?? project.gallery.find((g) => g.media)?.media?.src;
  const match = sample?.match(/^\/projects\/([^/]+)\//);
  return match ? match[1] : project.slug;
}
