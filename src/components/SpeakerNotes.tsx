import React from 'react';
import { SlideContent } from '../types';
import { Mic, X, Volume2, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  slide: SlideContent;
  isOpen: boolean;
  onClose: () => void;
}

export const SpeakerNotes: React.FC<Props> = ({ slide, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-slate-100">
              Речь докладчика для Слайда #{slide.id}: {slide.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-800/40 text-sky-200 text-sm leading-relaxed font-sans shadow-inner">
            <p className="font-semibold text-sky-400 mb-2 flex items-center gap-1.5">
              <Mic className="w-4 h-4" />
              Текст выступления на защите:
            </p>
            <p className="whitespace-pre-wrap">{slide.speakerNotes}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Ключевые акценты для ответа на вопросы комиссии:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {slide.keyPoints.map((kp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  <span>{kp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Слайд {slide.id} из 16 • Практическая работа №2</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium transition-colors"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};
