import React, { useState } from 'react';
import { SlideContent, ScreenshotRef } from '../types';
import { SCREENSHOTS } from '../data/screenshotsData';
import { ScreenshotMockup } from './ScreenshotMockup';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  Code2, 
  Layers, 
  TrendingUp, 
  ExternalLink,
  ZoomIn,
  Sparkles
} from 'lucide-react';

interface Props {
  slide: SlideContent;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  onOpenScreenshotModal: (screenshot: ScreenshotRef) => void;
  onOpenDatasetModal: () => void;
}

export const SlideViewer: React.FC<Props> = ({
  slide,
  onPrev,
  onNext,
  canPrev,
  canNext,
  onOpenScreenshotModal,
  onOpenDatasetModal
}) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'vulnerable' | 'safe'>('vulnerable');

  const slideScreenshots = slide.screenshotIds
    .map((id) => SCREENSHOTS[id])
    .filter(Boolean);

  return (
    <div className="relative flex flex-col flex-1 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden min-h-[600px]">
      {/* Slide Header */}
      <div className="px-6 py-4 bg-slate-950/70 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
              {slide.badge || slide.sectionName}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Слайд #{slide.id}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight leading-snug">
            {slide.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-4xl">
            {slide.subtitle}
          </p>
        </div>

        {/* Quick Nav Controls */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
          <button
            onClick={onPrev}
            disabled={!canPrev}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition-colors"
            title="Предыдущий слайд (Стрелка влево)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            disabled={!canNext}
            className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors shadow-lg shadow-sky-600/20"
            title="Следующий слайд (Стрелка вправо или Пробел)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slide Body: 2 Column Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 overflow-y-auto">
        {/* Left Column: Key Points & Analysis (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-5">
          {/* Key Bullet Points */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              Ключевые положения и результаты
            </h3>
            <div className="space-y-2.5">
              {slide.keyPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 hover:border-slate-700 transition-all text-xs sm:text-sm text-slate-300 leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-semibold">
                    {index + 1}
                  </span>
                  <p className="flex-1">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Code Comparison Block if available */}
          {slide.codeComparison && (
            <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
              <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-amber-400" />
                  Сравнение кода: Опасный vs Безопасный паттерн
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveCodeTab('vulnerable')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                      activeCodeTab === 'vulnerable'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ❌ {slide.codeComparison.vulnerableFile}
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('safe')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                      activeCodeTab === 'safe'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ✅ {slide.codeComparison.safeFile}
                  </button>
                </div>
              </div>
              <div className="p-3 bg-[#11141b] overflow-x-auto text-[11px] font-mono leading-relaxed">
                {activeCodeTab === 'vulnerable' ? (
                  <pre className="text-rose-200/90 whitespace-pre-wrap">
                    {slide.codeComparison.vulnerable}
                  </pre>
                ) : (
                  <pre className="text-emerald-300/90 whitespace-pre-wrap">
                    {slide.codeComparison.safe}
                  </pre>
                )}
              </div>
            </div>
          )}

          {/* Metrics block if present */}
          {slide.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {slide.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between"
                >
                  <span className="text-[10px] text-slate-400 font-medium">
                    {m.label}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-sky-400 font-mono mt-1">
                    {m.value}
                  </span>
                  {m.hint && (
                    <span className="text-[9px] text-slate-400 mt-1 truncate">
                      {m.hint}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Takeaway note */}
          {slide.takeaway && (
            <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-800/40 text-xs text-sky-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>{slide.takeaway}</span>
            </div>
          )}
        </div>

        {/* Right Column: Screenshot Evidence & Visual Mockups (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              Фактические результаты и скриншоты ({slideScreenshots.length})
            </h3>
            {slide.id >= 13 && slide.id <= 14 && (
              <button
                onClick={onOpenDatasetModal}
                className="text-xs text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1 font-medium"
              >
                Открыть датасет в таблице <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>

          {slideScreenshots.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-slate-800 text-center text-slate-400 text-xs">
              <Layers className="w-8 h-8 text-slate-600 mb-2" />
              <span>Теоретический слайд без графических артефактов</span>
            </div>
          ) : (
            <div className="flex-1 flex flex-col space-y-4 overflow-y-auto pr-1">
              {slideScreenshots.map((scr) => (
                <div key={scr.id} className="space-y-1.5">
                  <ScreenshotMockup
                    screenshot={scr}
                    compact={slideScreenshots.length > 1}
                    onOpenModal={onOpenScreenshotModal}
                  />
                  <p className="text-[11px] text-slate-400 px-1 leading-snug">
                    <span className="font-semibold text-slate-300">
                      {scr.title}:
                    </span>{' '}
                    {scr.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Slide Bottom Bar: Speaker Note Hint & Quick Actions */}
      <div className="px-6 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="truncate">
            <strong className="text-slate-300">Подсказка докладчика:</strong>{' '}
            {slide.speakerNotes.slice(0, 110)}...
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-3">
          <span className="hidden md:inline-block text-[11px] text-slate-400">
            Используйте <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">←</kbd>{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">→</kbd> для навигации
          </span>
        </div>
      </div>
    </div>
  );
};
