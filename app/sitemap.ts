import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://meeux.vercel.app";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/posts`, lastModified: now },
    { url: `${base}/favorites`, lastModified: now },
    { url: `${base}/about`, lastModified: now },
    { url: `${base}/settings`, lastModified: now },
  ];
}
