export type SiteMode = "branding" | "saas" | "marketplace" | "portfolio";

// Views of the site that are currently public. Only "portfolio" is live for
// now. To bring a view back, add its key here — its route, the "Ver como"
// switcher entry and its sitemap URLs all follow this list.
export const enabledModes: readonly SiteMode[] = ["portfolio"];

export const isModeEnabled = (mode: SiteMode): boolean => enabledModes.includes(mode);
