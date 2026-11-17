import { jsPDF } from 'jspdf';
import { Certificate, EBook, Language, Presentation } from '../types';

function transliterateForPdf(text: string): string {
  // jsPDF built-in Helvetica supports basic Latin; transliterate Cyrillic cleanly if needed so PDF never renders garbled glyphs
  const cyrillicMap: Record<string, string> = {
    А: 'A', Б: 'B', В: 'V', Г: 'G', Д: 'D', Е: 'E', Ё: 'Yo', Ж: 'Zh', З: 'Z', И: 'I', Й: 'Y',
    К: 'K', Л: 'L', М: 'M', Н: 'N', О: 'O', П: 'P', Р: 'R', С: 'S', Т: 'T', У: 'U', Ф: 'F',
    Х: 'Kh', Ц: 'Ts', Ч: 'Ch', Ш: 'Sh', Щ: 'Shch', Ъ: '', Ы: 'Y', Ь: '', Э: 'E', Ю: 'Yu', Я: 'Ya',
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z', и: 'i', й: 'y',
    к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f',
    х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
    Ў: 'O', ў: 'o', Қ: 'Q', қ: 'q', Ғ: 'G', ғ: 'g', Ҳ: 'H', ҳ: 'h', '‘': "'", '’': "'", '—': '-', '–': '-',
  };
  return text.replace(/[^\u0000-\u007F]/g, (ch) => cyrillicMap[ch] ?? ' ');
}

export function generateEbookPdfBlobUrl(ebook: EBook, lang: Language): string {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;

  // Cover Header
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 160, 'F');
  doc.setFillColor(234, 88, 12);
  doc.rect(margin, 146, 80, 4, 'F');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(11);
  doc.text('AVTO EDU · TECHNICAL E-BOOK LIBRARY', margin, 48);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  const titleLines = doc.splitTextToSize(transliterateForPdf(ebook.title[lang]), pageWidth - margin * 2);
  doc.text(titleLines, margin, 82);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(11);
  doc.text(`Author: ${transliterateForPdf(ebook.author)}   |   Pages: ${ebook.pages}   |   ${ebook.sizeLabel}`, margin, 134);

  let y = 200;
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(12);
  const summaryLines = doc.splitTextToSize(transliterateForPdf(ebook.summary[lang]), pageWidth - margin * 2);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 16 + 24;

  const chapters = ebook.chapters[lang] || ebook.chapters.en;
  chapters.forEach((chapter, idx) => {
    if (y > pageHeight - 130) {
      doc.addPage();
      y = 60;
    }
    doc.setFontSize(14);
    doc.setTextColor(234, 88, 12);
    doc.text(`${idx + 1}. ${transliterateForPdf(chapter.heading)}`, margin, y);
    y += 20;

    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    const bodyLines = doc.splitTextToSize(transliterateForPdf(chapter.body), pageWidth - margin * 2);
    for (const line of bodyLines) {
      if (y > pageHeight - 60) {
        doc.addPage();
        y = 60;
      }
      doc.text(line, margin, y);
      y += 16;
    }
    y += 16;
  });

  // Footer page numbers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text(`AVTO EDU · ${transliterateForPdf(ebook.title[lang])}`, margin, pageHeight - 28);
    doc.text(`Page ${i} / ${totalPages}`, pageWidth - margin - 50, pageHeight - 28);
  }

  const blob = doc.output('blob');
  return URL.createObjectURL(blob);
}

export function downloadEbookPdf(ebook: EBook, lang: Language): void {
  const url = generateEbookPdfBlobUrl(ebook, lang);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${ebook.id}-${lang}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadCertificatePdf(cert: Certificate, lang: Language): void {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  // Deep slate frame
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, w, h, 'F');

  // Inner light parchment panel
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(28, 28, w - 56, h - 56, 8, 8, 'F');

  // Border accent
  doc.setDrawColor(234, 88, 12);
  doc.setLineWidth(3);
  doc.roundedRect(40, 40, w - 80, h - 80, 6, 6, 'S');

  // Top Header
  doc.setTextColor(234, 88, 12);
  doc.setFontSize(14);
  doc.text('AVTO EDU · AUTOMOTIVE ENGINEERING ACADEMY', w / 2, 92, { align: 'center' });

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(34);
  doc.text('CERTIFICATE OF ACHIEVEMENT', w / 2, 145, { align: 'center' });

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(1);
  doc.line(w / 2 - 140, 165, w / 2 + 140, 165);

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(14);
  doc.text('This certifies that', w / 2, 205, { align: 'center' });

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(30);
  doc.text(transliterateForPdf(cert.studentName), w / 2, 252, { align: 'center' });

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(13);
  doc.text('has successfully completed the technical examination and practical curriculum for', w / 2, 294, { align: 'center' });

  doc.setTextColor(234, 88, 12);
  doc.setFontSize(20);
  const courseName = transliterateForPdf(cert.courseTitle[lang] || cert.courseTitle.en);
  doc.text(courseName, w / 2, 334, { align: 'center' });

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(15);
  doc.text(`Final Assessment Score: ${cert.scorePercent}%   ·   Status: PASSED`, w / 2, 380, { align: 'center' });

  // Signatures & Verification block
  doc.setDrawColor(148, 163, 184);
  doc.line(90, 465, 270, 465);
  doc.line(w - 270, 465, w - 90, 465);

  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(transliterateForPdf(cert.instructorName), 180, 455, { align: 'center' });
  doc.text(new Date(cert.issuedAt).toLocaleDateString('en-GB'), w - 180, 455, { align: 'center' });

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Lead Diagnostics Instructor', 180, 482, { align: 'center' });
  doc.text('Issue Date', w - 180, 482, { align: 'center' });

  // Verification ID seal
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(w / 2 - 120, 435, 240, 48, 6, 6, 'F');
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(9);
  doc.text('VERIFICATION ID', w / 2, 453, { align: 'center' });
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.text(cert.id, w / 2, 472, { align: 'center' });

  doc.save(`AVTO-EDU-Certificate-${cert.id}.pdf`);
}

export function downloadPresentationPdf(presentation: Presentation, lang: Language): void {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  const margin = 48;

  presentation.slides.forEach((slide, index) => {
    if (index > 0) doc.addPage();
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, w, 92, 'F');
    doc.setFillColor(234, 88, 12);
    doc.rect(0, 92, w, 4, 'F');

    doc.setTextColor(245, 158, 11);
    doc.setFontSize(10);
    doc.text(`AVTO EDU · ${transliterateForPdf(presentation.title[lang])} · Slide ${index + 1}/${presentation.slides.length}`, margin, 32);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text(transliterateForPdf(slide.title[lang]), margin, 68);

    let y = 140;
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(14);
    const bullets = slide.bullets[lang] || slide.bullets.en;
    bullets.forEach((b) => {
      const lines = doc.splitTextToSize(`• ${transliterateForPdf(b)}`, w - margin * 2);
      doc.text(lines, margin, y);
      y += lines.length * 20 + 10;
    });

    if (slide.notes[lang]) {
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin, h - 105, w - margin * 2, 65, 6, 6, 'F');
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      const noteLines = doc.splitTextToSize(`Notes: ${transliterateForPdf(slide.notes[lang])}`, w - margin * 2 - 24);
      doc.text(noteLines, margin + 12, h - 85);
    }
  });

  doc.save(`${presentation.id}-${lang}.pdf`);
}
