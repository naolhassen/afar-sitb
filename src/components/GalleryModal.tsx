import React, { useEffect } from 'react';
import { GalleryItem, Locale } from '../types';
import { tf } from '../i18n/messages';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Video } from 'lucide-react';

interface GalleryModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  locale: Locale;
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  item,
  items,
  locale,
  onClose,
  onSelect
}) => {
  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIdx]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (currentIndex + 1) % items.length;
    onSelect(items[nextIdx]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        const prevIdx = (currentIndex - 1 + items.length) % items.length;
        onSelect(items[prevIdx]);
      }
      if (e.key === 'ArrowRight') {
        const nextIdx = (currentIndex + 1) % items.length;
        onSelect(items[nextIdx]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items, onClose, onSelect]);

  const title = tf(item, 'title', locale) || 'Afar Innovation Bureau Media';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-2">
            {item.type === 'VIDEO' ? (
              <Video size={16} className="text-amber-400" />
            ) : (
              <ImageIcon size={16} className="text-blue-400" />
            )}
            <span className="text-sm font-semibold text-white truncate max-w-md">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              {currentIndex + 1} / {items.length}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Media Canvas */}
        <div className="relative flex-1 min-h-[360px] max-h-[68vh] bg-black flex items-center justify-center overflow-hidden">
          {item.type === 'VIDEO' ? (
            <video
              src={item.imageUrl}
              controls
              autoPlay
              className="max-h-[65vh] w-auto max-w-full object-contain"
            />
          ) : (
            <img
              src={item.imageUrl}
              alt={title}
              className="max-h-[65vh] w-auto max-w-full object-contain select-none"
            />
          )}

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white border border-slate-700/60 shadow-lg transition-all"
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white border border-slate-700/60 shadow-lg transition-all"
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Caption footer */}
        <div className="px-6 py-3 bg-slate-900 text-xs text-slate-300 flex items-center justify-between">
          <p className="line-clamp-1">{title}</p>
          <span className="text-slate-500 text-[11px]">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};
