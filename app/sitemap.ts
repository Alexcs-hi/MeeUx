import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://meeux.vercel.app/posts/all",
      lastModified: new Date(),
    },
  ];
}
