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

export async function getFeaturedProjects(limit = 4): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.featured).slice(0, limit);
}

export function repoUrl(repo: string): string {
  return `https://github.com/${repo}`;
}

/** Display form of a URL without protocol, e.g. "meium.space". */
export function prettyUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}
