import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://instametro.vercel.app';
  return [
    { url: base,                       lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/privacy-policy`,   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${base}/terms-of-use`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${base}/contact`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];
}
