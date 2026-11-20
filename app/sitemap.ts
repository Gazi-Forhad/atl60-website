import type { MetadataRoute } from "next";
import { features } from "@/content/features";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/discover", "/videos", "/services", "/about", "/collaborate", "/contact", "/privacy"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...features
      .filter((f) => f.kind === "feature")
      .map((f) => ({ url: `${site.url}/discover/${f.slug}`, lastModified: f.dateISO, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
