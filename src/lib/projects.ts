import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/** All projects: featured first, then by `order`, then by name. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort(
    (a, b) =>
      Number(b.data.featured) - Number(a.data.featured) ||
      a.data.order - b.data.order ||
      a.data.name.localeCompare(b.data.name),
  );
}

/**
 * Projects in home-page order: live ones first, then featured,
 * then by `order` (lower = more recent / more important).
 */
export async function getHomeOrder(): Promise<Project[]> {
  const all = await getProjects();
  return [...all].sort(
    (a, b) =>
      Number(b.data.status === 'live') - Number(a.data.status === 'live') ||
      Number(b.data.featured) - Number(a.data.featured) ||
      a.data.order - b.data.order,
  );
}

export function repoUrl(repo: string): string {
  return `https://github.com/${repo}`;
}

/** Display form of a URL without protocol, e.g. "meium.space". */
export function prettyUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}
