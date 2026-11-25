export function formatTurkishDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export function estimateReadingMinutes(markdownBody?: string): number {
  if (!markdownBody) return 2;
  const words = markdownBody
    .replace(/[#>*_`[\]()-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 190));
}

export function sortByPublishDateDesc<T extends { data: { publishDate: Date } }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}
