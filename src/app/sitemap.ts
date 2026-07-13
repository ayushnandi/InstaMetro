import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/config';
import { STATIONS, stationSlug, getCuratedRoutes } from '@/lib/metro';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                       lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/stations`,         lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/routes`,           lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/guides`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/guides/fare-guide`,               lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/guides/smart-card-vs-qr-ticket`,  lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/guides/metro-timings`,            lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/faq`,              lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/careers`,          lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/contact`,          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/privacy-policy`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${base}/terms-of-use`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
  ];

  const stationPages: MetadataRoute.Sitemap = STATIONS.map(s => ({
    url: `${base}/stations/${stationSlug(s)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const routePages: MetadataRoute.Sitemap = getCuratedRoutes().map(r => ({
    url: `${base}/routes/${r.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticPages, ...stationPages, ...routePages];
}
