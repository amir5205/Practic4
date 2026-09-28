import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES } from './data/slidesData';
import { SlideContent, ScreenshotRef } from './types';
import { SlideViewer } from './components/SlideViewer';
import { ThumbnailsBar } from './components/ThumbnailsBar';
import { HeaderNav } from './components/HeaderNav';
import { DatasetView } from './components/DatasetView';
import { ScreenshotsGallery } from './components/ScreenshotsGallery';
import { ScreenshotModal } from './components/ScreenshotMockup';
import { SpeakerNotes } from './components/SpeakerNotes';

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [activeView, setActiveView] = useState<'slides' | 'dataset' | 'gallery'>('slides');
  const [activeScreenshotModal, setActiveScreenshotModal] = useState<ScreenshotRef | null>(null);
  const [isSpeakerNotesOpen, setIsSpeakerNotesOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentSlide = SLIDES[currentSlideIndex];

  const handleNext = useCallback(() => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  }, [currentSlideIndex]);

  const handlePrev = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  }, [currentSlideIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger shortcuts if typing inside an input/textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlideIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlideIndex(SLIDES.length - 1);
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'n') {
        setIsSpeakerNotesOpen((prev) => !prev);
      }
    },
    [handleNext, handlePrev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn('Fullscreen error:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.warn('Exit fullscreen error:', err);
      });
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Filter slides by section for quick jumps
  const sections = [
    { id: 'all', label: 'Все (16)' },
    { id: 'intro', label: '🎯 Введение' },
    { id: 'code', label: '💻 Стенды (Py, C++, JS)' },
    { id: 'sast_dast', label: '🔍 SAST / DAST' },
    { id: 'dataset', label: '📊 Датасет' },
    { id: 'remediation', label: '🛡️ Защита и Итоги' },
  ];

  const handleSectionJump = (sectionId: string) => {
    if (sectionId === 'all') {
      setCurrentSlideIndex(0);
      return;
    }
    const targetIndex = SLIDES.findIndex((s) => s.section === sectionId);
    if (targetIndex !== -1) {
      setCurrentSlideIndex(targetIndex);
      setActiveView('slides');
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#070b14] text-slate-100 overflow-hidden font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Top Header Navigation */}
      <HeaderNav
        currentSlideIndex={currentSlideIndex}
        totalSlides={SLIDES.length}
        activeView={activeView}
        onViewChange={setActiveView}
        onToggleSpeakerNotes={() => setIsSpeakerNotesOpen(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Category Pills Bar (Sub-header) */}
      {activeView === 'slides' && (
        <div className="px-4 sm:px-6 py-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto text-xs shrink-0">
          <div className="flex items-center gap-1.5 min-w-max">
            <span className="text-[11px] text-slate-400 mr-1 font-medium">Разделы:</span>
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleSectionJump(sec.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  currentSlide.section === sec.id || (sec.id === 'all' && currentSlideIndex === 0)
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400 shrink-0">
            <span>
              Полноэкранный режим: <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">F</kbd>
            </span>
            <span>
              Заметки: <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">N</kbd>
            </span>
          </div>
        </div>
      )}

      {/* Main Presentation Viewport */}
      <main className="flex-1 p-3 sm:p-5 overflow-hidden flex flex-col min-h-0">
        {activeView === 'slides' && (
          <SlideViewer
            slide={currentSlide}
            onPrev={handlePrev}
            onNext={handleNext}
            canPrev={currentSlideIndex > 0}
            canNext={currentSlideIndex < SLIDES.length - 1}
            onOpenScreenshotModal={setActiveScreenshotModal}
            onOpenDatasetModal={() => setActiveView('dataset')}
          />
        )}

        {activeView === 'dataset' && <DatasetView />}

        {activeView === 'gallery' && (
          <ScreenshotsGallery
            onOpenModal={setActiveScreenshotModal}
            onGoToSlide={(slideId) => {
              const idx = SLIDES.findIndex((s) => s.id === slideId);
              if (idx !== -1) {
                setCurrentSlideIndex(idx);
                setActiveView('slides');
              }
            }}
          />
        )}
      </main>

      {/* Bottom Thumbnails Navigation Bar (shown in Slides view) */}
      {activeView === 'slides' && (
        <ThumbnailsBar
          currentSlideIndex={currentSlideIndex}
          onSelectSlide={setCurrentSlideIndex}
        />
      )}

      {/* Modals */}
      <ScreenshotModal
        screenshot={activeScreenshotModal}
        onClose={() => setActiveScreenshotModal(null)}
      />

      <SpeakerNotes
        slide={currentSlide}
        isOpen={isSpeakerNotesOpen}
        onClose={() => setIsSpeakerNotesOpen(false)}
      />
    </div>
  );
}
