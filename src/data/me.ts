/** Content for /me. Edit here; the page only lays it out. */

export const about = [
  "I like building apps and, more and more, understanding what's underneath them: cloud, networking, and how large-scale infrastructure really works.",
  'Away from the keyboard: metal, guitars, photography and cats.',
];

export const focus = ['cloud', 'networking', 'infrastructure'];
export const offline = ['metal', 'guitars', 'photography', 'cats'];

export interface EducationEntry {
  degree: string;
  level: string;
  school: string;
  place: string;
  start: number;
  /** Omit while it is still in progress. */
  end?: number;
}

/** Most recent first. */
export const education: EducationEntry[] = [
  {
    degree: 'Informatics Engineering',
    level: 'MSc',
    school: 'University of Minho',
    place: 'Braga',
    start: 2026,
  },
  {
    degree: 'Informatics Engineering',
    level: 'BSc',
    school: 'UTAD',
    place: 'Vila Real',
    start: 2022,
    end: 2025,
  },
  {
    degree: 'Applied Web Engineering',
    level: 'Secondary education',
    school: 'Colégio de S. Gonçalo',
    place: 'Amarante',
    start: 2020,
    end: 2022,
  },
];
