import React from 'react';
import { SlideContent } from '../types';
import { SLIDES } from '../data/slidesData';
import { Layers } from 'lucide-react';

interface Props {
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
}

export const ThumbnailsBar: React.FC<Props> = ({ currentSlideIndex, onSelectSlide }) => {
  return (
    <div className="w-full bg-slate-950/80 border-t border-slate-800 p-2 sm:p-3 overflow-x-auto">
      <div className="flex items-center gap-2.5 min-w-max px-1">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <button
              key={slide.id}
              onClick={() => onSelectSlide(index)}
              className={`flex flex-col items-start text-left p-2 rounded-xl transition-all w-44 sm:w-48 border shrink-0 ${
                isActive
                  ? 'bg-slate-800 border-sky-500 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500'
                  : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/70 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                  isActive ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  #{slide.id}
                </span>
                <span className="text-[9px] text-slate-400 truncate max-w-[90px]">
                  {slide.sectionName}
                </span>
              </div>
              <div className="text-[11px] font-semibold text-slate-200 line-clamp-2 leading-tight">
                {slide.title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
