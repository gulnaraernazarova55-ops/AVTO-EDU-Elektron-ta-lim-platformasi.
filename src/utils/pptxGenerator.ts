import PptxGenJS from 'pptxgenjs';
import { Language, Presentation } from '../types';

export async function downloadPresentationPptx(presentation: Presentation, lang: Language): Promise<void> {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = presentation.author;
  pptx.title = presentation.title[lang];

  // Title slide
  const cover = pptx.addSlide();
  cover.background = { color: '0F172A' };
  cover.addText('AVTO EDU · AUTOMOTIVE ENGINE DIAGNOSTICS', {
    x: 0.7,
    y: 1.3,
    w: 8.6,
    h: 0.4,
    fontSize: 12,
    bold: true,
    color: 'F59E0B',
  });
  cover.addText(presentation.title[lang], {
    x: 0.7,
    y: 2.0,
    w: 8.6,
    h: 1.2,
    fontSize: 32,
    bold: true,
    color: 'FFFFFF',
  });
  cover.addText(presentation.description[lang], {
    x: 0.7,
    y: 3.4,
    w: 8.6,
    h: 0.8,
    fontSize: 15,
    color: 'CBD5E1',
  });
  cover.addText(`${presentation.author} · ${presentation.moduleRef}`, {
    x: 0.7,
    y: 4.7,
    w: 8.6,
    h: 0.4,
    fontSize: 12,
    color: '94A3B8',
  });

  // Content slides
  presentation.slides.forEach((slide, idx) => {
    const s = pptx.addSlide();
    s.background = { color: 'F8FAFC' };

    // Top dark header strip
    s.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 10,
      h: 1.05,
      fill: { color: '0F172A' },
    });
    s.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 1.05,
      w: 10,
      h: 0.06,
      fill: { color: 'EA580C' },
    });

    s.addText(`${idx + 1} / ${presentation.slides.length}`, {
      x: 8.5,
      y: 0.35,
      w: 1.0,
      h: 0.35,
      fontSize: 11,
      color: 'F59E0B',
      align: 'right',
    });

    s.addText(slide.title[lang], {
      x: 0.6,
      y: 0.25,
      w: 7.8,
      h: 0.55,
      fontSize: 22,
      bold: true,
      color: 'FFFFFF',
    });

    const bullets = (slide.bullets[lang] || slide.bullets.en).map((b) => ({
      text: b,
      options: { bullet: true, breakLine: true, fontSize: 15, color: '1E293B', paraSpaceAfter: 10 },
    }));

    s.addText(bullets, {
      x: 0.7,
      y: 1.45,
      w: 8.6,
      h: 3.4,
      valign: 'top',
    });

    if (slide.notes[lang]) {
      s.addNotes(slide.notes[lang]);
      s.addText(`Instructor Note: ${slide.notes[lang]}`, {
        x: 0.7,
        y: 4.9,
        w: 8.6,
        h: 0.5,
        fontSize: 10,
        italic: true,
        color: '64748B',
      });
    }
  });

  await pptx.writeFile({ fileName: `${presentation.id}-${lang}.pptx` });
}
