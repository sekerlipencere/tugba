import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import siteConfig from '../data/site-config';

type OgCardInput = {
  title: string;
  subtitle?: string;
  category?: string;
};

let cachedFonts:
  | {
      name: string;
      data: Buffer;
      weight: 400 | 500;
      style: 'normal' | 'italic';
    }[]
  | null = null;

function loadFonts() {
  if (cachedFonts) return cachedFonts;

  const root = process.cwd();
  const readFont = (pkg: string, file: string) =>
    fs.readFileSync(path.join(root, 'node_modules', pkg, 'files', file));

  // Satori glyph fallback: Latin + Latin-Ext (ğ, ş, ı, İ) ayrı aile adlarıyla zincirlenir
  cachedFonts = [
    {
      name: 'LiterataLatin',
      data: readFont('@fontsource/literata', 'literata-latin-500-normal.woff'),
      weight: 500,
      style: 'normal'
    },
    {
      name: 'LiterataExt',
      data: readFont('@fontsource/literata', 'literata-latin-ext-500-normal.woff'),
      weight: 500,
      style: 'normal'
    },
    {
      name: 'LiterataLatin',
      data: readFont('@fontsource/literata', 'literata-latin-400-normal.woff'),
      weight: 400,
      style: 'normal'
    },
    {
      name: 'LiterataExt',
      data: readFont('@fontsource/literata', 'literata-latin-ext-400-normal.woff'),
      weight: 400,
      style: 'normal'
    },
    {
      name: 'JakartaLatin',
      data: readFont('@fontsource/plus-jakarta-sans', 'plus-jakarta-sans-latin-500-normal.woff'),
      weight: 500,
      style: 'normal'
    },
    {
      name: 'JakartaExt',
      data: readFont('@fontsource/plus-jakarta-sans', 'plus-jakarta-sans-latin-ext-500-normal.woff'),
      weight: 500,
      style: 'normal'
    },
    {
      name: 'JakartaLatin',
      data: readFont('@fontsource/plus-jakarta-sans', 'plus-jakarta-sans-latin-400-normal.woff'),
      weight: 400,
      style: 'normal'
    },
    {
      name: 'JakartaExt',
      data: readFont('@fontsource/plus-jakarta-sans', 'plus-jakarta-sans-latin-ext-400-normal.woff'),
      weight: 400,
      style: 'normal'
    }
  ];

  return cachedFonts;
}

const SERIF_STACK = 'LiterataLatin, LiterataExt';
const SANS_STACK = 'JakartaLatin, JakartaExt';

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const sliced = text.slice(0, maxLength - 1);
  const lastSpace = sliced.lastIndexOf(' ');
  return `${(lastSpace > 40 ? sliced.slice(0, lastSpace) : sliced).trimEnd()}…`;
}

export async function renderOgPng({ title, subtitle, category }: OgCardInput): Promise<Uint8Array> {
  const accentColor = category === 'Rehberlik' ? '#3B5946' : '#234659';
  const cleanTitle = truncateText(title, 96);
  const cleanSubtitle = subtitle ? truncateText(subtitle, 185) : '';
  const titleFontSize = cleanTitle.length > 56 ? 46 : cleanTitle.length > 34 ? 54 : 62;

  const element = {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F7F7F4',
        color: '#1F2421',
        position: 'relative',
        fontFamily: SERIF_STACK
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              width: '1200px',
              height: '6px',
              backgroundColor: accentColor
            }
          }
        },
        {
          type: 'div',
          props: {
            style: {
              width: '1056px',
              height: '520px',
              marginLeft: '72px',
              marginTop: '48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            },
            children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: SANS_STACK,
              fontSize: '22px',
              fontWeight: 500,
              color: accentColor
            },
            children: [
              {
                type: 'span',
                props: { children: category ?? 'Yazılar ve notlar' }
              }
            ]
          }
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
              maxWidth: '980px'
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: SERIF_STACK,
                    fontSize: `${titleFontSize}px`,
                    fontWeight: 500,
                    lineHeight: 1.18,
                    letterSpacing: '-0.02em',
                    color: '#1F2421'
                  },
                  children: cleanTitle
                }
              },
              ...(cleanSubtitle
                ? [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: SERIF_STACK,
                          fontSize: '26px',
                          fontWeight: 400,
                          lineHeight: 1.5,
                          color: '#5B635E'
                        },
                        children: cleanSubtitle
                      }
                    }
                  ]
                : [])
            ]
          }
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(31, 36, 33, 0.12)',
              paddingTop: '22px'
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: SERIF_STACK,
                          fontSize: '28px',
                          fontWeight: 500,
                          color: '#1F2421'
                        },
                        children: siteConfig.author.name
                      }
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: SANS_STACK,
                          fontSize: '18px',
                          fontWeight: 400,
                          color: '#5B635E'
                        },
                        children: siteConfig.author.role
                      }
                    }
                  ]
                }
              },
              {
                type: 'svg',
                props: {
                  width: 52,
                  height: 52,
                  viewBox: '0 0 48 48',
                  fill: 'none',
                  children: [
                    {
                      type: 'path',
                      props: {
                        d: 'M24 41C24 31 24.4 20.5 28 10',
                        stroke: '#3B5946',
                        strokeWidth: 1.5,
                        strokeLinecap: 'round'
                      }
                    },
                    {
                      type: 'path',
                      props: {
                        d: 'M24.2 31C19.2 29.8 16.2 26.2 16 21.8C20.2 22.3 23.4 25.4 24.2 31Z',
                        stroke: '#3B5946',
                        strokeWidth: 1.4,
                        strokeLinejoin: 'round'
                      }
                    },
                    {
                      type: 'path',
                      props: {
                        d: 'M24.8 25.5C29.4 24 32.8 20.6 33.4 16.4C29.1 17 25.8 20.2 24.8 25.5Z',
                        stroke: '#3B5946',
                        strokeWidth: 1.4,
                        strokeLinejoin: 'round'
                      }
                    },
                    {
                      type: 'path',
                      props: {
                        d: 'M26.2 17.8C22.4 16.6 20.2 13.7 20.3 10.2C23.8 11 25.8 13.8 26.2 17.8Z',
                        stroke: '#3B5946',
                        strokeWidth: 1.4,
                        strokeLinejoin: 'round'
                      }
                    },
                    {
                      type: 'circle',
                      props: {
                        cx: 28.3,
                        cy: 8.7,
                        r: 1.6,
                        fill: '#234659'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
            ]
          }
        }
      ]
    }
  };

  const svg = await satori(element as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: loadFonts()
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200
    }
  });

  return resvg.render().asPng();
}
