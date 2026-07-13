import type { MetadataRoute } from 'next';
import { SITE_NAME } from '@/lib/seo/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Delhi Metro Navigation`,
    short_name: SITE_NAME,
    description: 'Plan Delhi Metro routes, check fares, and track live journeys.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F6F3EC',
    theme_color: '#2B53E8',
    icons: [
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
