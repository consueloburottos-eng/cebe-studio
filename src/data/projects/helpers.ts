export type MediaAsset = {
  type: "image" | "video";
  src: string;
};

export type GalleryItem = {
  label: string;
  media?: MediaAsset;
};

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
  // optional screenshot/photo shown below the body copy for this tab.
  media?: MediaAsset;
  // English override — same fallback convention as Project.en below.
  en?: {
    label?: string;
    title?: string;
    body?: string[];
  };
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
  gallery: GalleryItem[];
  pending?: boolean;
  features?: FeatureDeepDive[];
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
