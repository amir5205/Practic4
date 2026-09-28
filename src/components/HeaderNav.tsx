import React, { useState } from 'react';
import { 
  Presentation, 
  Table, 
  Image as ImageIcon, 
  Download, 
  Maximize, 
  Minimize, 
  Printer, 
  BookOpen, 
  Shield, 
  Check, 
  Loader2,
  Sparkles
} from 'lucide-react';
import { exportToPptx } from '../utils/exportPptx';

interface Props {
  currentSlideIndex: number;
  totalSlides: number;
  activeView: 'slides' | 'dataset' | 'gallery';
  onViewChange: (view: 'slides' | 'dataset' | 'gallery') => void;
  onToggleSpeakerNotes: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const HeaderNav: React.FC<Props> = ({
  currentSlideIndex,
  totalSlides,
  activeView,
  onViewChange,
  onToggleSpeakerNotes,
  isFullscreen,
  onToggleFullscreen
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExportPptx = async () => {
    try {
      setIsExporting(true);
      await exportToPptx();
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    } catch (err) {
      console.error('Failed to export PPTX:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const progressPercent = Math.round(((currentSlideIndex + 1) / totalSlides) * 100);

  return (
    <header className="w-full bg-slate-950 border-b border-slate-800 text-slate-100 px-4 sm:px-6 py-2.5 flex flex-col gap-2 shrink-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Logo & App Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-indigo-500 flex items-center justify-center shadow-md shadow-sky-600/20 shrink-0">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white truncate">
                Практическая работа №2: Анализ уязвимостей и датасет CVE/CWE
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-950 text-sky-300 border border-sky-800">
                SAST • DAST • 2026
              </span>
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              Python Flask • C++17 • Node.js Express • Bandit • 18 скриншотов стенда
            </div>
          </div>
        </div>

        {/* Middle: View Mode Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-center">
          <button
            onClick={() => onViewChange('slides')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'slides'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            Слайды ({currentSlideIndex + 1}/{totalSlides})
          </button>

          <button
            onClick={() => onViewChange('dataset')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'dataset'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            Датасет (9)
          </button>

          <button
            onClick={() => onViewChange('gallery')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'gallery'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Скриншоты (18)
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <button
            onClick={onToggleSpeakerNotes}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-sky-400 border border-slate-800 hover:border-slate-700 transition-colors"
            title="Открыть заметки для защиты"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Речь</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 border border-slate-800 transition-colors"
            title="Печать / Сохранить в PDF (Ctrl+P)"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleFullscreen}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 border border-slate-800 transition-colors"
            title={isFullscreen ? 'Выйти из полноэкранного режима' : 'Полноэкранный режим (F)'}
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
          </button>

          {/* Export to PowerPoint Button */}
          <button
            onClick={handleExportPptx}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-900/30 transition-all active:scale-95 disabled:opacity-50"
            title="Скачать готовую презентацию Microsoft PowerPoint (.pptx)"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Генерация...</span>
              </>
            ) : exported ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Скачано!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Скачать .PPTX</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Slide Progress Bar */}
      {activeView === 'slides' && (
        <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-500 to-indigo-500 h-1 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </header>
  );
};
