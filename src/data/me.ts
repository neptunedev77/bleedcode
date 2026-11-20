/** Content for /me. Edit here; the page only lays it out. */

export const hello = 'Developer based in Braga, Portugal.';

export const about = [
  "Currently an MSc student in Computer Science and Engineering at UMinho, where I enjoy building web apps, automation and everyday tools, while also exploring the cloud and networking layers that keep large-scale systems alive.",
  "Away from the terminal, you'll usually find me listening to metal, playing guitar, shooting photos, or stopping to pet random cats.",
];

/** Interests: at the keyboard, and away from it. */
export const focus = [
  'web apps',
  'cloud infrastructure',
  'containers & kubernetes',
  'ci/cd',
  'networking',
  'linux',
  'automation',
  'sre',
  'homelab',
];
export const offline = ['metal', 'guitar', 'photography', 'cats', 'gaming', 'coffee', 'space', 'cars', 'traveling'];

export interface EducationEntry {
  degree: string;
  /** Small tag after the degree, e.g. "High School". */
  level?: string;
  /** Marks the degree with * for the note under the timeline. */
  localTitle?: boolean;
  school: string;
  place: string;
  start: number;
  /** Omit while it is still in progress. */
  end?: number;
}

/** Most recent first. */
export const education: EducationEntry[] = [
  {
    degree: 'MSc in Computer Science and Engineering',
    localTitle: true,
    school: 'University of Minho',
    place: 'Braga',
    start: 2026,
  },
  {
    degree: 'BSc in Computer Science and Engineering',
    localTitle: true,
    school: 'UTAD',
    place: 'Vila Real',
    start: 2022,
    end: 2025,
  },
  {
    degree: 'Applied Web Informatics (EQF Level 4)',
    level: 'High School',
    school: 'Colégio de S. Gonçalo',
    place: 'Amarante',
    start: 2020,
    end: 2022,
  },
];
