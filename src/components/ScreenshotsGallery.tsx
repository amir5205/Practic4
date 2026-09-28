import React, { useState } from 'react';
import { SCREENSHOTS } from '../data/screenshotsData';
import { ScreenshotRef } from '../types';
import { ScreenshotMockup } from './ScreenshotMockup';
import { Search, Filter, ShieldCheck, Terminal, FileCode, Globe, Folder, Table, FileText } from 'lucide-react';

interface Props {
  onOpenModal: (screenshot: ScreenshotRef) => void;
  onGoToSlide: (slideId: number) => void;
}

export const ScreenshotsGallery: React.FC<Props> = ({ onOpenModal, onGoToSlide }) => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const screenshotList = Object.values(SCREENSHOTS);

  const filteredList = screenshotList.filter((s) => {
    const matchesFilter = filter === 'all' || s.category === filter;
    const matchesSearch = 
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.originalFileName.toLowerCase().includes(search.toLowerCase()) ||
      (s.filePath && s.filePath.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl p-4 sm:p-6 space-y-5">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Галерея доказательств: Все 18 скриншотов выполнения работы
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Аутентичные снимки экрана виртуальной машины Debian LinuxVM (терминал, gedit, Firefox, LibreOffice, Nautilus)
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по файлу, команде..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
          >
            <option value="all">Все категории ({screenshotList.length})</option>
            <option value="code">Исходный код (gedit)</option>
            <option value="terminal">Терминал (Bash)</option>
            <option value="browser">DAST Эксплойты (Firefox)</option>
            <option value="calc">Датасет (LibreOffice)</option>
            <option value="report">Отчеты SAST (Bandit)</option>
            <option value="file_manager">Файловая система (Nautilus)</option>
          </select>
        </div>
      </div>

      {/* Grid of All Screenshots */}
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredList.map((scr) => (
            <div key={scr.id} className="flex flex-col space-y-2">
              <ScreenshotMockup
                screenshot={scr}
                compact={true}
                onOpenModal={onOpenModal}
              />
              <div className="px-1">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-200">
                  <span className="truncate">{scr.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-1">
                    {scr.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                  {scr.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
