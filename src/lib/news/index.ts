// Live metro-news feed for the /blog page. Sources are two publishers'
// own RSS feeds (themetrorailguy.com, metrorailtoday.com) rather than a
// news aggregator: this is their own content, offered via their own public
// RSS specifically for syndication (a standard WordPress excerpt feed),
// which is the legitimate way to show "headline + excerpt + link back" —
// unlike Google News' RSS, whose feed copyright notice restricts use to
// "personal, non-commercial" feed readers, which a public marketing site
// isn't. We never fetch or render full article text — only the excerpt
// each feed already provides, truncated further, plus the outbound link.
//
// ponytail: regex-based RSS parsing, not a full XML parser — both feeds are
// stable, regular RSS 2.0/WordPress output. Swap to a real parser (e.g.
// fast-xml-parser) if either feed's markup ever breaks this.

export type NewsItem = {
  title: string;
  sourceName: string;
  link: string;
  pubDate: string; // ISO string
  excerpt: string;
};

const FEEDS: { url: string; sourceName: string }[] = [
  { url: 'https://themetrorailguy.com/feed/', sourceName: 'The Metro Rail Guy' },
  { url: 'https://www.metrorailtoday.com/feed/', sourceName: 'Metro Rail Today' },
];

function extractTag(block: string, tag: string): string | null {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  if (!match) return null;
  return match[1]
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, '$1')
    .trim();
}

function decodeEntitiesOnce(text: string): string {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&hellip;/g, '…')
    .replace(/&[lr]squo;/g, "'")
    .replace(/&[lr]dquo;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

// metrorailtoday.com's feed double-encodes entities (e.g. "&amp;ndash;" for
// what should be "&ndash;") — decoding twice resolves that and is a no-op
// for feeds that are only single-encoded (themetrorailguy.com).
function decodeEntities(text: string): string {
  return decodeEntitiesOnce(decodeEntitiesOnce(text));
}

function toExcerpt(description: string): string {
  const stripped = decodeEntities(description)
    .replace(/<[^>]+>/g, ' ')
    .replace(/The post .*? first appeared on .*?\.?$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (stripped.length <= 160) return stripped;
  return `${stripped.slice(0, 157).trimEnd()}…`;
}

function parseFeed(xml: string, sourceName: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemBlocks = xml.match(/<item[^>]*>[\s\S]*?<\/item>/gi) ?? [];

  for (const block of itemBlocks) {
    const title = extractTag(block, 'title');
    const link = extractTag(block, 'link');
    const pubDateRaw = extractTag(block, 'pubDate');
    const description = extractTag(block, 'description') ?? '';
    if (!title || !link || !pubDateRaw) continue;

    const parsed = new Date(decodeEntities(pubDateRaw));
    if (Number.isNaN(parsed.getTime())) continue;

    items.push({
      title: decodeEntities(title),
      sourceName,
      link: decodeEntities(link.trim()),
      pubDate: parsed.toISOString(),
      excerpt: toExcerpt(description),
    });
  }

  return items;
}

export async function getMetroNews(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(
    FEEDS.map(async feed => {
      const res = await fetch(feed.url, { next: { revalidate: 3600 } });
      if (!res.ok) return [];
      return parseFeed(await res.text(), feed.sourceName);
    })
  );

  const all = results.flatMap(r => (r.status === 'fulfilled' ? r.value : []));
  const seen = new Set<string>();
  const deduped = all.filter(item => {
    if (seen.has(item.link)) return false;
    seen.add(item.link);
    return true;
  });

  deduped.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  return deduped.slice(0, 10);
}
