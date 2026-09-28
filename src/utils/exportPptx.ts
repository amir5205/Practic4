import pptxgen from 'pptxgenjs';
import { SLIDES } from '../data/slidesData';
import { VULNERABILITIES_DATASET } from '../data/dataset';

export async function exportToPptx(): Promise<void> {
  const pres = new pptxgen();

  pres.layout = 'LAYOUT_16x9';
  pres.author = 'Студент (rimot)';
  pres.company = 'Практическая работа №2 по ИБ';
  pres.title = 'Анализ уязвимостей исходного кода и построение датасета CVE/CWE';

  // 1. Generate All Content Slides
  for (const s of SLIDES) {
    const slide = pres.addSlide();
    slide.background = { color: '0A0F1D' }; // Deep dark navy/slate background

    // Category / Badge Pill
    slide.addText(s.badge || s.sectionName.toUpperCase(), {
      x: 0.8,
      y: 0.5,
      w: 8.0,
      h: 0.35,
      fontSize: 11,
      color: '38BDF8',
      bold: true,
      fontFace: 'Arial'
    });

    // Main Title
    slide.addText(s.title, {
      x: 0.8,
      y: 0.9,
      w: 11.5,
      h: 0.9,
      fontSize: 22,
      color: 'FFFFFF',
      bold: true,
      fontFace: 'Arial'
    });

    // Subtitle
    slide.addText(s.subtitle, {
      x: 0.8,
      y: 1.8,
      w: 11.5,
      h: 0.45,
      fontSize: 13,
      color: '94A3B8',
      italic: true,
      fontFace: 'Arial'
    });

    // Divider Line
    slide.addShape(pres.ShapeType.line, {
      x: 0.8,
      y: 2.35,
      w: 11.7,
      h: 0,
      line: { color: '1E293B', width: 1.5 }
    });

    // Key Bullet Points
    const bulletItems = s.keyPoints.map((pt) => ({
      text: pt,
      options: {
        fontSize: 12,
        color: 'E2E8F0',
        breakLine: true,
        bullet: { type: 'bullet' as const, code: '2022' }
      }
    }));

    slide.addText(bulletItems, {
      x: 0.8,
      y: 2.6,
      w: s.metrics ? 8.2 : 11.5,
      h: 3.8,
      fontFace: 'Arial',
      lineSpacing: 22
    });

    // Metrics Sidebar if present
    if (s.metrics && s.metrics.length > 0) {
      let metricY = 2.6;
      for (const m of s.metrics) {
        // Metric Box
        slide.addShape(pres.ShapeType.roundRect, {
          x: 9.3,
          y: metricY,
          w: 3.2,
          h: 0.85,
          fill: { color: '131D33' },
          line: { color: '1E293B', width: 1 }
        });

        slide.addText(m.value, {
          x: 9.5,
          y: metricY + 0.08,
          w: 2.8,
          h: 0.4,
          fontSize: 18,
          color: '38BDF8',
          bold: true,
          fontFace: 'Arial'
        });

        slide.addText(`${m.label} ${m.hint ? `(${m.hint})` : ''}`, {
          x: 9.5,
          y: metricY + 0.48,
          w: 2.8,
          h: 0.3,
          fontSize: 9,
          color: '94A3B8',
          fontFace: 'Arial'
        });

        metricY += 0.95;
      }
    }

    // Code comparison snippet if present
    if (s.codeComparison) {
      slide.addShape(pres.ShapeType.roundRect, {
        x: 0.8,
        y: 4.8,
        w: 5.7,
        h: 1.8,
        fill: { color: '111827' },
        line: { color: '374151', width: 1 }
      });
      slide.addText(`❌ ${s.codeComparison.vulnerableFile}:\n${s.codeComparison.vulnerable}`, {
        x: 0.9,
        y: 4.9,
        w: 5.5,
        h: 1.6,
        fontSize: 9,
        color: 'FCA5A5',
        fontFace: 'Courier New'
      });

      slide.addShape(pres.ShapeType.roundRect, {
        x: 6.8,
        y: 4.8,
        w: 5.7,
        h: 1.8,
        fill: { color: '111827' },
        line: { color: '374151', width: 1 }
      });
      slide.addText(`✅ ${s.codeComparison.safeFile}:\n${s.codeComparison.safe}`, {
        x: 6.9,
        y: 4.9,
        w: 5.5,
        h: 1.6,
        fontSize: 9,
        color: '86EFAC',
        fontFace: 'Courier New'
      });
    }

    // Footer
    slide.addText(`Слайд ${s.id} из ${SLIDES.length} | Практическая работа №2 | Студент: rimot`, {
      x: 0.8,
      y: 6.8,
      w: 11.5,
      h: 0.3,
      fontSize: 9,
      color: '64748B',
      fontFace: 'Arial'
    });

    // Speaker notes
    if (s.speakerNotes) {
      slide.addNotes(s.speakerNotes);
    }
  }

  // 2. Extra Slide: Complete Vulnerabilities Table
  const tableSlide = pres.addSlide();
  tableSlide.background = { color: '0A0F1D' };
  tableSlide.addText('Приложение: Полный датасет уязвимостей (vulnerabilities.csv)', {
    x: 0.8,
    y: 0.5,
    w: 11.5,
    h: 0.6,
    fontSize: 18,
    color: 'FFFFFF',
    bold: true,
    fontFace: 'Arial'
  });

  const tableRows: any[][] = [
    [
      { text: 'ID', options: { bold: true, color: 'FFFFFF', fill: '1E293B' } },
      { text: 'Язык', options: { bold: true, color: 'FFFFFF', fill: '1E293B' } },
      { text: 'Файл', options: { bold: true, color: 'FFFFFF', fill: '1E293B' } },
      { text: 'Строка', options: { bold: true, color: 'FFFFFF', fill: '1E293B' } },
      { text: 'Важность', options: { bold: true, color: 'FFFFFF', fill: '1E293B' } },
      { text: 'CWE ID', options: { bold: true, color: 'FFFFFF', fill: '1E293B' } },
      { text: 'OWASP', options: { bold: true, color: 'FFFFFF', fill: '1E293B' } },
      { text: 'CVE Пример', options: { bold: true, color: 'FFFFFF', fill: '1E293B' } },
      { text: 'CVSS', options: { bold: true, color: 'FFFFFF', fill: '1E293B' } }
    ]
  ];

  VULNERABILITIES_DATASET.forEach((v) => {
    tableRows.push([
      { text: `#${v.vuln_id}` },
      { text: v.language },
      { text: v.file },
      { text: String(v.line) },
      { text: v.severity },
      { text: v.cwe_id },
      { text: v.owasp.split(':')[0] },
      { text: v.cve_example },
      { text: String(v.cvss) }
    ]);
  });

  tableSlide.addTable(tableRows, {
    x: 0.8,
    y: 1.3,
    w: 11.7,
    colW: [0.6, 1.2, 1.5, 0.8, 1.2, 1.3, 1.3, 2.0, 0.8],
    fontSize: 9,
    color: 'E2E8F0',
    fontFace: 'Arial',
    border: { pt: 0.5, color: '334155' }
  });

  tableSlide.addNotes('Сводная таблица уязвимостей, сформированная в результате выполнения практической работы.');

  // Save the presentation
  await pres.writeFile({ fileName: 'Презентация_Практическая_работа_2_Уязвимости.pptx' });
}
