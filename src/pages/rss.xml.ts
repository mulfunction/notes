import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const notes = await getCollection('notes');
  const reports = await getCollection('reports');

  const allNotes = notes.filter(n => !n.data.draft).map(n => ({
    title: n.data.title,
    pubDate: n.data.date,
    description: n.data.description,
    link: `${context.site?.origin || ''}${import.meta.env.BASE_URL}/notes/${n.id}/`,
  }));

  const allReports = reports.filter(r => !r.data.draft).map(r => ({
    title: r.data.title,
    pubDate: r.data.date,
    description: r.data.description,
    link: `${context.site?.origin || ''}${import.meta.env.BASE_URL}/reports/${r.id}/`,
  }));

  const items = [...allNotes, ...allReports].sort(
    (a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf()
  );

  return rss({
    title: 'Personal Notes & Weekly Reports Feed',
    description: 'Latest developer logs, weekly progress updates, and technical guides.',
    site: context.site || 'https://mulfunction.github.io/notes',
    items,
  });
}
