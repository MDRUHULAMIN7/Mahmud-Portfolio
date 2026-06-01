import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
     {
       url: `${siteConfig.url}/all-projects`,
       lastModified: now,
       changeFrequency: "weekly",
       priority: 0.8,
     },
     {
       url: `${siteConfig.url}/categories`,
       lastModified: now,
       changeFrequency: "weekly",
       priority: 0.7,
     },
  ];
}
