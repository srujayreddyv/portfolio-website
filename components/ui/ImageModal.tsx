'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export default function ImageModal({
  src,
  alt,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false
}: ImageModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft' && onPrevious && hasPrevious) {
        onPrevious();
        return;
      }
      if (e.key === 'ArrowRight' && onNext && hasNext) {
        onNext();
        return;
      }
      if (e.key !== 'Tab') return;

      const container = dialogRef.current;
      if (!container) return;
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      const container = dialogRef.current;
      if (container) {
        const focusable = container.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        } else if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      previousFocusRef.current?.focus();
    };
  }, [hasNext, hasPrevious, isOpen, onClose, onNext, onPrevious]);

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(12, 12, 14, 0.85)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
    >
      <div className="relative max-w-4xl max-h-[90vh] mx-4">
        {/* Close button — mono terminal indicator */}
        <button
          ref={closeButtonRef}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute -top-10 right-0 inline-flex items-center font-mono text-xs text-[#f4f4f0] hover:text-[#00ffe0] transition-colors duration-150 z-10"
          aria-label="Close image preview"
        >
          <span aria-hidden="true">[ × close ]</span>
        </button>

        {/* Image container — hairline frame, no rounded corners */}
        <div
          className="relative border border-[#1f1f23] bg-[#131316] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {onPrevious && hasPrevious && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-[#0c0c0e]/70 text-[#f4f4f0] hover:text-[#00ffe0] border border-[#1f1f23] hover:border-[#00ffe0] p-2 transition-colors duration-150 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {onNext && hasNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-[#0c0c0e]/70 text-[#f4f4f0] hover:text-[#00ffe0] border border-[#1f1f23] hover:border-[#00ffe0] p-2 transition-colors duration-150 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          )}
          <Image
            src={src}
            alt={alt}
            width={800}
            height={800}
            className="max-w-full max-h-[80vh] object-contain"
            priority
          />
        </div>

        {/* Image title — mono caption */}
        <p
          id="image-modal-title"
          className="text-center mt-4 font-mono text-xs sm:text-sm text-[#8a8a86]"
        >
          {alt}
        </p>
      </div>
    </div>
  );
}
