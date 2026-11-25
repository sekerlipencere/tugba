import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import siteConfig from '../data/site-config';
import { sortByPublishDateDesc } from '../utils/format';

export async function GET(context: APIContext) {
  const posts = sortByPublishDateDesc(await getCollection('yazilar'));

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site ?? 'https://tugba.yusufd-polar.workers.dev',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.publishDate,
      link: `/yazilar/${post.id}/`
    }))
  });
}
