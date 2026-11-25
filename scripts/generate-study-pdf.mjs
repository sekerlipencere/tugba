import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const outDir = path.join(root, 'public', 'dosyalar');
fs.mkdirSync(outDir, { recursive: true });

const readFont = (pkg, file) =>
  fs.readFileSync(path.join(root, 'node_modules', pkg, 'files', file));

const fonts = [
  { name: 'LiterataLatin', data: readFont('@fontsource/literata', 'literata-latin-500-normal.woff'), weight: 500, style: 'normal' },
  { name: 'LiterataExt', data: readFont('@fontsource/literata', 'literata-latin-ext-500-normal.woff'), weight: 500, style: 'normal' },
  { name: 'LiterataLatin', data: readFont('@fontsource/literata', 'literata-latin-400-normal.woff'), weight: 400, style: 'normal' },
  { name: 'LiterataExt', data: readFont('@fontsource/literata', 'literata-latin-ext-400-normal.woff'), weight: 400, style: 'normal' },
  { name: 'JakartaLatin', data: readFont('@fontsource/plus-jakarta-sans', 'plus-jakarta-sans-latin-500-normal.woff'), weight: 500, style: 'normal' },
  { name: 'JakartaExt', data: readFont('@fontsource/plus-jakarta-sans', 'plus-jakarta-sans-latin-ext-500-normal.woff'), weight: 500, style: 'normal' },
  { name: 'JakartaLatin', data: readFont('@fontsource/plus-jakarta-sans', 'plus-jakarta-sans-latin-400-normal.woff'), weight: 400, style: 'normal' },
  { name: 'JakartaExt', data: readFont('@fontsource/plus-jakarta-sans', 'plus-jakarta-sans-latin-ext-400-normal.woff'), weight: 400, style: 'normal' }
];

const SERIF_STACK = 'LiterataLatin, LiterataExt';
const SANS_STACK = 'JakartaLatin, JakartaExt';

const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const rows = [
  '1. Oturum',
  '2. Oturum',
  '3. Oturum',
  '4. Oturum',
  '5. Oturum',
  '6. Oturum',
  'Tekrar ve okuma',
  'Dinlenme ve mola'
];

// A4 landscape ratio: 1684 x 1190 (rendered at 2480px width via Resvg = crisp 300 DPI)
const element = {
  type: 'div',
  props: {
    style: {
      width: '1684px',
      height: '1190px',
      display: 'flex',
      backgroundColor: '#FFFFFF',
      color: '#1F2421',
      fontFamily: SANS_STACK
    },
    children: [
      {
        type: 'div',
        props: {
          style: {
            width: '1572px',
            height: '1102px',
            marginLeft: '56px',
            marginTop: '44px',
            display: 'flex',
            flexDirection: 'column'
          },
          children: [
      // Üst başlık
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            borderBottom: '1.5px solid #D9DDD8',
            paddingBottom: '20px',
            marginBottom: '22px'
          },
          children: [
            {
              type: 'div',
              props: {
                style: { display: 'flex', alignItems: 'center', gap: '16px' },
                children: [
                  {
                    type: 'svg',
                    props: {
                      width: 44,
                      height: 44,
                      viewBox: '0 0 48 48',
                      fill: 'none',
                      children: [
                        { type: 'path', props: { d: 'M24 41C24 31 24.4 20.5 28 10', stroke: '#3B5946', strokeWidth: 1.6, strokeLinecap: 'round' } },
                        { type: 'path', props: { d: 'M24.2 31C19.2 29.8 16.2 26.2 16 21.8C20.2 22.3 23.4 25.4 24.2 31Z', stroke: '#3B5946', strokeWidth: 1.5, strokeLinejoin: 'round' } },
                        { type: 'path', props: { d: 'M24.8 25.5C29.4 24 32.8 20.6 33.4 16.4C29.1 17 25.8 20.2 24.8 25.5Z', stroke: '#3B5946', strokeWidth: 1.5, strokeLinejoin: 'round' } },
                        { type: 'path', props: { d: 'M26.2 17.8C22.4 16.6 20.2 13.7 20.3 10.2C23.8 11 25.8 13.8 26.2 17.8Z', stroke: '#3B5946', strokeWidth: 1.5, strokeLinejoin: 'round' } },
                        { type: 'circle', props: { cx: 28.3, cy: 8.7, r: 1.7, fill: '#234659' } }
                      ]
                    }
                  },
                  {
                    type: 'div',
                    props: {
                      style: { display: 'flex', flexDirection: 'column', gap: '3px' },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: { fontFamily: SERIF_STACK, fontSize: '30px', fontWeight: 500, color: '#1F2421' },
                            children: 'Haftalık ders çalışma planı'
                          }
                        },
                        {
                          type: 'div',
                          props: {
                            style: { fontSize: '15px', color: '#5B635E' },
                            children: 'Tuğba — Psikolojik Danışmanlık ve Rehberlik'
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              type: 'div',
              props: {
                style: { display: 'flex', gap: '24px', fontSize: '15px', color: '#5B635E' },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: { display: 'flex', alignItems: 'flex-end', gap: '8px' },
                      children: [
                        { type: 'span', props: { children: 'Hafta:' } },
                        { type: 'div', props: { style: { width: '140px', borderBottom: '1px solid #B8BEB9', height: '18px' } } }
                      ]
                    }
                  },
                  {
                    type: 'div',
                    props: {
                      style: { display: 'flex', alignItems: 'flex-end', gap: '8px' },
                      children: [
                        { type: 'span', props: { children: 'Haftalık odak:' } },
                        { type: 'div', props: { style: { width: '190px', borderBottom: '1px solid #B8BEB9', height: '18px' } } }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      // Tablo
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            borderTop: '1px solid #C8CDC9',
            borderLeft: '1px solid #C8CDC9'
          },
          children: [
            // Başlık satırı
            {
              type: 'div',
              props: {
                style: { display: 'flex', backgroundColor: '#F3F4F0', height: '48px' },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: {
                        width: '180px',
                        borderRight: '1px solid #C8CDC9',
                        borderBottom: '1px solid #C8CDC9',
                        padding: '12px 14px',
                        fontSize: '15px',
                        fontWeight: 500,
                        color: '#234659'
                      },
                      children: 'Saat / Oturum'
                    }
                  },
                  ...days.map((day) => ({
                    type: 'div',
                    props: {
                      style: {
                        flex: 1,
                        borderRight: '1px solid #C8CDC9',
                        borderBottom: '1px solid #C8CDC9',
                        padding: '12px 14px',
                        fontSize: '15px',
                        fontWeight: 500,
                        color: '#1F2421'
                      },
                      children: day
                    }
                  }))
                ]
              }
            },
            // 8 boş satır
            ...rows.map((label, idx) => ({
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  flex: 1,
                  backgroundColor: idx === 7 ? '#F8F9F6' : '#FFFFFF'
                },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: {
                        width: '180px',
                        borderRight: '1px solid #C8CDC9',
                        borderBottom: '1px solid #C8CDC9',
                        padding: '12px 14px',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: idx >= 6 ? '#3B5946' : '#5B635E',
                        backgroundColor: '#F7F8F5'
                      },
                      children: label
                    }
                  },
                  ...days.map(() => ({
                    type: 'div',
                    props: {
                      style: {
                        flex: 1,
                        borderRight: '1px solid #C8CDC9',
                        borderBottom: '1px solid #C8CDC9'
                      }
                    }
                  }))
                ]
              }
            }))
          ]
        }
      },
      // Alt hedef & değerlendirme kutuları
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            gap: '24px',
            marginTop: '22px',
            height: '122px'
          },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #C8CDC9',
                  backgroundColor: '#F9FAF7',
                  padding: '14px 18px'
                },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: { fontSize: '14px', fontWeight: 500, color: '#234659' },
                      children: 'Bu haftanın üç küçük hedefi'
                    }
                  }
                ]
              }
            },
            {
              type: 'div',
              props: {
                style: {
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #C8CDC9',
                  backgroundColor: '#F9FAF7',
                  padding: '14px 18px'
                },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: { fontSize: '14px', fontWeight: 500, color: '#3B5946' },
                      children: 'Hafta sonu değerlendirmesi (Ne iyi gitti?)'
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      // Alt not
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '14px',
            fontSize: '12px',
            color: '#737B76'
          },
          children: [
            { type: 'span', props: { children: 'Dolu saatler kadar nefes ve mola alanını da korumayı unutma.' } },
            { type: 'span', props: { children: 'Hâlâ vaktin var.' } }
          ]
        }
      }
          ]
        }
      }
    ]
  }
};

const svg = await satori(element, { width: 1684, height: 1190, fonts });
const pngBuffer = new Resvg(svg, { fitTo: { mode: 'width', value: 2480 } }).render().asPng();

const tmpPng = path.join(outDir, '_tmp-schedule.png');
const tmpJpg = path.join(outDir, '_tmp-schedule.jpg');
fs.writeFileSync(tmpPng, pngBuffer);

// Convert PNG to high-quality JPEG using built-in Windows .NET System.Drawing
execFileSync('powershell', [
  '-NoProfile',
  '-Command',
  `Add-Type -AssemblyName System.Drawing; $img = [System.Drawing.Image]::FromFile('${tmpPng.replace(/'/g, "''")}'); $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }; $ep = New-Object System.Drawing.Imaging.EncoderParameters(1); $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 93L); $img.Save('${tmpJpg.replace(/'/g, "''")}', $codec, $ep); $img.Dispose();`
]);

const jpgBuffer = fs.readFileSync(tmpJpg);
const imgW = 2480;
const imgH = Math.round((1190 / 1684) * 2480);

// Wrap JPEG into a clean, standards-compliant single-page A4 landscape PDF 1.4
function buildJpegPdf(jpegBytes, widthPx, heightPx) {
  const pageW = 841.89; // A4 landscape width in pt
  const pageH = 595.28; // A4 landscape height in pt
  const chunks = [];
  const offsets = [0];
  let byteLen = 0;

  const pushStr = (s) => {
    const b = Buffer.from(s, 'latin1');
    chunks.push(b);
    byteLen += b.length;
  };
  const pushBuf = (b) => {
    chunks.push(b);
    byteLen += b.length;
  };

  pushStr('%PDF-1.4\n%\xFF\xFF\xFF\xFF\n');

  // 1: Catalog
  offsets.push(byteLen);
  pushStr('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  // 2: Pages
  offsets.push(byteLen);
  pushStr('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');

  // 3: Page
  offsets.push(byteLen);
  pushStr(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`
  );

  // 4: Image XObject
  offsets.push(byteLen);
  pushStr(
    `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${widthPx} /Height ${heightPx} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`
  );
  pushBuf(jpegBytes);
  pushStr('\nendstream\nendobj\n');

  // 5: Content stream
  const contentStream = `q\n${pageW} 0 0 ${pageH} 0 0 cm\n/Im0 Do\nQ\n`;
  offsets.push(byteLen);
  pushStr(`5 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}endstream\nendobj\n`);

  const xrefOffset = byteLen;
  pushStr(`xref\n0 ${offsets.length}\n0000000000 65535 f \n`);
  for (let i = 1; i < offsets.length; i++) {
    pushStr(`${String(offsets[i]).padStart(10, '0')} 00000 n \n`);
  }
  pushStr(`trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);

  return Buffer.concat(chunks);
}

const pdfBuffer = buildJpegPdf(jpgBuffer, imgW, imgH);
const outPdf = path.join(outDir, 'haftalik-ders-calisma-tablosu.pdf');
fs.writeFileSync(outPdf, pdfBuffer);
fs.unlinkSync(tmpPng);
fs.unlinkSync(tmpJpg);

console.log(`Generated ${outPdf} (${Math.round(pdfBuffer.length / 1024)} KB)`);
