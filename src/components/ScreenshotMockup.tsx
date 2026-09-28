import React, { useState } from 'react';
import { ScreenshotRef } from '../types';
import { 
  Maximize2, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal, 
  FileCode, 
  Globe, 
  Folder, 
  Table, 
  X,
  FileText,
  AlertTriangle,
  ZoomIn
} from 'lucide-react';

interface Props {
  screenshot: ScreenshotRef;
  compact?: boolean;
  onOpenModal?: (screenshot: ScreenshotRef) => void;
}

export const ScreenshotMockup: React.FC<Props> = ({ screenshot, compact = false, onOpenModal }) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = 
      screenshot.details.codeSnippet || 
      screenshot.details.terminalOutput || 
      screenshot.details.browserContent || 
      '';
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCategoryIcon = () => {
    switch (screenshot.category) {
      case 'terminal': return <Terminal className="w-3.5 h-3.5 text-emerald-400" />;
      case 'code': return <FileCode className="w-3.5 h-3.5 text-blue-400" />;
      case 'browser': return <Globe className="w-3.5 h-3.5 text-amber-400" />;
      case 'file_manager': return <Folder className="w-3.5 h-3.5 text-sky-400" />;
      case 'calc': return <Table className="w-3.5 h-3.5 text-emerald-500" />;
      case 'report': return <FileText className="w-3.5 h-3.5 text-purple-400" />;
      default: return <FileText className="w-3.5 h-3.5 text-gray-400" />;
    }
  };

  return (
    <div 
      className={`group relative flex flex-col rounded-xl overflow-hidden border border-slate-700/70 bg-slate-900 shadow-xl transition-all duration-200 cursor-pointer ${
        compact ? 'h-full max-h-[360px]' : 'w-full'
      } hover:border-sky-500/60 hover:shadow-sky-500/10`}
      onClick={() => onOpenModal && onOpenModal(screenshot)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`mockup-${screenshot.id}`}
    >
      {/* Top OS Window Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950/90 border-b border-slate-800 select-none text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px] truncate ml-1">
            {getCategoryIcon()}
            <span className="truncate">{screenshot.windowTitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline-block">
            {screenshot.timestamp}
          </span>
          <button
            onClick={handleCopy}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Скопировать содержимое"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal && onOpenModal(screenshot);
            }}
            className="p-1 rounded text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors"
            title="Развернуть скриншот"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Browser Bar if applicable */}
      {screenshot.appType === 'firefox' && screenshot.url && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono">
          <div className="flex items-center gap-1 text-slate-400">
            <span className="px-1 py-0.5 rounded bg-slate-800 text-[10px]">GET</span>
          </div>
          <div className="flex-1 px-2.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 truncate select-all">
            {screenshot.url}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-[#181a1f] p-3 text-xs font-mono text-slate-200">
        {/* Terminal Output */}
        {screenshot.appType === 'terminal' && screenshot.details.terminalOutput && (
          <pre className="whitespace-pre-wrap leading-relaxed text-[11px] text-emerald-300/90 font-mono select-text">
            {screenshot.details.terminalOutput}
          </pre>
        )}

        {/* Code Snippet */}
        {(screenshot.appType === 'gedit' || screenshot.category === 'code' || screenshot.category === 'report') && screenshot.details.codeSnippet && (
          <pre className="whitespace-pre-wrap leading-relaxed text-[11px] text-slate-200 font-mono select-text">
            {screenshot.details.codeSnippet}
          </pre>
        )}

        {/* Browser Content */}
        {screenshot.appType === 'firefox' && (
          <div className="space-y-3">
            {screenshot.details.browserAlert && (
              <div className="mx-auto max-w-sm p-3.5 rounded-lg bg-slate-800/95 border border-slate-700 shadow-2xl text-center animate-in fade-in zoom-in duration-200">
                <div className="text-[11px] text-slate-400 mb-1.5 font-sans">localhost:3000 сообщает:</div>
                <div className="text-sm font-semibold text-rose-300 mb-3 font-sans">
                  {screenshot.details.browserAlert}
                </div>
                <div className="inline-block px-4 py-1 rounded bg-sky-600 text-white text-xs font-sans font-medium">
                  OK
                </div>
              </div>
            )}

            {screenshot.details.browserContent && (
              <div className="p-3 bg-white text-slate-900 rounded font-serif select-text">
                {screenshot.details.browserContent.includes('PING') ? (
                  <pre className="font-mono text-slate-900 text-[11px] whitespace-pre-wrap">
                    {screenshot.details.browserContent}
                  </pre>
                ) : (
                  <div className="text-lg font-bold text-slate-900">
                    {screenshot.details.browserContent}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Nautilus File Grid */}
        {screenshot.appType === 'nautilus' && screenshot.details.tableRows && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-1">
            {screenshot.details.tableRows.map((row, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:bg-slate-800 transition-colors text-center"
              >
                {String(row[1]) === 'Папка' ? (
                  <Folder className="w-7 h-7 text-sky-400 mb-1.5 fill-sky-400/20" />
                ) : (
                  <FileText className="w-7 h-7 text-slate-300 mb-1.5" />
                )}
                <span className="text-[11px] font-medium text-slate-200 truncate w-full">
                  {row[0]}
                </span>
                <span className="text-[9px] text-slate-400 mt-0.5">
                  {row[1]}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* LibreOffice Calc Table */}
        {screenshot.appType === 'libreoffice' && screenshot.details.tableHeaders && screenshot.details.tableRows && (
          <div className="overflow-x-auto text-[10px]">
            <table className="w-full border-collapse border border-slate-700">
              <thead>
                <tr className="bg-slate-800 text-slate-300">
                  <th className="p-1 border border-slate-700 text-center w-6">#</th>
                  {screenshot.details.tableHeaders.map((h, i) => (
                    <th key={i} className="p-1 border border-slate-700 text-left font-semibold truncate max-w-[100px]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {screenshot.details.tableRows.slice(0, 7).map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/70 border-b border-slate-800">
                    <td className="p-1 border border-slate-700 text-center text-slate-500 bg-slate-900/60">
                      {rIdx + 1}
                    </td>
                    {row.map((cell, cIdx) => (
                      <td 
                        key={cIdx} 
                        className={`p-1 border border-slate-700 truncate max-w-[120px] ${
                          cell === 'Critical' ? 'text-rose-400 font-bold' :
                          cell === 'High' ? 'text-amber-400 font-semibold' :
                          cell === 'Medium' ? 'text-blue-400' : 'text-slate-300'
                        }`}
                      >
                        {String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {screenshot.details.tableRows.length > 7 && (
              <div className="text-[9px] text-slate-400 text-center py-1">
                + еще {screenshot.details.tableRows.length - 7} записей... (нажмите для полного просмотра)
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Info Pill */}
      <div className="px-3 py-1.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
        <span className="truncate max-w-[280px]">
          📎 {screenshot.originalFileName}
        </span>
        <span className="text-sky-400 font-medium group-hover:underline flex items-center gap-1 shrink-0">
          Подробнее <ExternalLink className="w-2.5 h-2.5" />
        </span>
      </div>
    </div>
  );
};

export const ScreenshotModal: React.FC<{
  screenshot: ScreenshotRef | null;
  onClose: () => void;
}> = ({ screenshot, onClose }) => {
  if (!screenshot) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-sky-950 border border-sky-800/80 text-sky-300 text-xs font-mono font-semibold">
              {screenshot.originalFileName}
            </span>
            <h3 className="text-sm font-semibold text-slate-100 truncate">
              {screenshot.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-4">
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
            <p className="font-semibold text-slate-100 mb-1">Описание артефакта:</p>
            <p>{screenshot.description}</p>
            {screenshot.highlightText && (
              <div className="mt-2 text-sky-300 font-mono text-[11px] bg-slate-900/80 p-2 rounded border border-slate-800">
                🔍 Ключевой фокус: {screenshot.highlightText}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-950 overflow-hidden shadow-inner">
            <ScreenshotMockup screenshot={screenshot} compact={false} />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Среда: Debian GNU/Linux 12 (Bookworm) • Пользователь: rimot</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
