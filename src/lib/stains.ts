/**
 * Pixel-art blood shapes. Each shape is drawn on a small grid; every run is
 * [x, y, width] at height 1. Three layers: `blood` (base), `dark` (old blood)
 * and `light` (fresh highlight). Shapes taken from the approved mockup.
 */
export type Run = readonly [x: number, y: number, w: number];

export interface Shape {
  w: number;
  h: number;
  blood: readonly Run[];
  dark?: readonly Run[];
  light?: readonly Run[];
}

export const shapes = {
  /** Big splash that hugs a corner (top-left by default). */
  corner: {
    w: 12,
    h: 12,
    blood: [
      [0, 0, 7], [0, 1, 9], [0, 2, 10], [0, 3, 8], [0, 4, 6], [0, 5, 5],
      [0, 6, 4], [0, 7, 4], [0, 8, 3], [0, 9, 2], [0, 10, 2], [0, 11, 1],
      [10, 4, 1], [11, 2, 1], [6, 7, 1], [4, 10, 1],
    ],
    dark: [[5, 0, 2], [7, 1, 2], [8, 2, 2], [6, 3, 2], [4, 4, 2], [3, 5, 2], [2, 7, 2]],
    light: [[1, 1, 2], [1, 2, 1]],
  },
  /** Wide pool sitting across a border. */
  pool: {
    w: 18,
    h: 7,
    blood: [[6, 0, 5], [3, 1, 11], [1, 2, 15], [0, 3, 18], [1, 4, 16], [3, 5, 11], [6, 6, 4]],
    dark: [[0, 3, 2], [16, 3, 2], [1, 4, 2], [14, 4, 3], [3, 5, 3], [11, 5, 3], [6, 6, 4]],
    light: [[5, 1, 2], [4, 2, 2]],
  },
  /** Small puddle (e.g. beside the cat). */
  puddle: {
    w: 10,
    h: 5,
    blood: [[3, 0, 4], [1, 1, 8], [0, 2, 10], [1, 3, 8], [3, 4, 3]],
    dark: [[0, 2, 1], [9, 2, 1], [1, 3, 2], [7, 3, 2], [3, 4, 3]],
    light: [[2, 1, 2]],
  },
  /** Flat smear along an edge. */
  smear: {
    w: 16,
    h: 4,
    blood: [[2, 0, 8], [0, 1, 14], [1, 2, 15], [5, 3, 6]],
    dark: [[2, 0, 2], [12, 1, 2], [13, 2, 3], [5, 3, 6]],
    light: [[3, 1, 4]],
  },
  /** A few loose drops. */
  specks: {
    w: 8,
    h: 6,
    blood: [[0, 1, 1], [3, 0, 1], [5, 3, 1], [2, 4, 1], [7, 5, 1]],
  },
} as const satisfies Record<string, Shape>;

export type StainKind = keyof typeof shapes;
export type Flip = 'x' | 'y' | 'xy';

export interface StainPlacement {
  kind: StainKind;
  /** Size of one grid cell in CSS px (integer for crisp pixels). */
  scale: number;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  flip?: Flip;
  /** Hide on narrow screens where it could sit on text. */
  hideOnSmall?: boolean;
}

/** Turns a list of runs into one compact SVG path. */
export function runsToPath(runs: readonly Run[] = []): string {
  return runs.map(([x, y, w]) => `M${x} ${y}h${w}v1h-${w}z`).join('');
}

/** Stains for the main card frame. */
export const frameStains: readonly StainPlacement[] = [
  { kind: 'corner', scale: 5, top: '-6px', left: '-6px' },
  { kind: 'pool', scale: 4, top: '-14px', left: '58%' },
  { kind: 'specks', scale: 3, top: '16px', left: '62%', hideOnSmall: true },
  { kind: 'smear', scale: 4, bottom: '-8px', left: '18%' },
  { kind: 'corner', scale: 4, bottom: '-6px', right: '-6px', flip: 'xy' },
];

/**
 * One stain set per project card, used in order (index modulo length),
 * so every card on a page gets a different one. The first four match the mockup.
 */
export const cardStains: readonly (readonly StainPlacement[])[] = [
  [{ kind: 'corner', scale: 3, top: '-4px', left: '-4px' }],
  [{ kind: 'puddle', scale: 3, bottom: '-9px', right: '34px' }],
  [{ kind: 'smear', scale: 3, top: '-7px', left: '150px' }],
  [
    { kind: 'corner', scale: 3, bottom: '-4px', right: '-4px', flip: 'xy' },
    { kind: 'specks', scale: 2, bottom: '22px', right: '46px' },
  ],
  [
    { kind: 'smear', scale: 3, bottom: '-6px', left: '24px', flip: 'x' },
    { kind: 'specks', scale: 2, top: '12px', left: '10px' },
  ],
  [{ kind: 'pool', scale: 2, top: '-7px', right: '28px' }],
];
