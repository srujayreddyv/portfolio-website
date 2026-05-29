'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';
import ImageModal from '@/components/ui/ImageModal';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

/**
 * ProjectModal — Direction 2 terminal vocabulary.
 *
 * Hairline-bordered modal with no rounded corners, mono section labels
 * (`─── overview`, `─── stack`, etc.), accent proof badges, and terminal-style
 * link buttons. Close action rendered as `[ × close ]` mono indicator.
 *
 * Behavior preserved verbatim: escape-to-close, focus trap, backdrop click,
 * body scroll lock, image lightbox via ImageModal.
 */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const {
    title,
    longDescription,
    technologies,
    category,
    imageUrl,
    images,
    liveUrl,
    apiDocsUrl,
    githubUrl,
    proofBadges,
    architecture,
    productionReadiness,
    validationChecks,
    challenges,
    solutions,
    results,
  } = project;
  const allImages = useMemo(
    () => Array.from(new Set([imageUrl, ...(images || [])])),
    [imageUrl, images]
  );
  const additionalImages = useMemo(() => allImages.slice(1), [allImages]);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const focusFirstElement = () => {
      const container = dialogRef.current;
      if (!container) return;
      const focusable = container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      } else if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
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

    document.addEventListener('keydown', handleKeyDown);
    focusFirstElement();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Reusable section header — mono small caps with accent rule.
  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-muted mb-2 sm:mb-3">
      ─── {children}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-canvas/70 backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(12, 12, 14, 0.78)' }}
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="bg-canvas border border-hairline max-w-4xl w-full max-h-[92vh] sm:max-h-[88vh] overflow-y-auto"
      >
        {/* Header — sticky with mono brand label + close */}
        <div className="sticky top-0 z-10 bg-canvas border-b border-hairline px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 min-w-0 flex-1">
              <span className="font-mono text-[10px] sm:text-[11px] text-muted tracking-wide flex-shrink-0">
                <span className="text-accent">$ </span>open project.md
              </span>
              <h2
                id="project-modal-title"
                className="text-base sm:text-lg lg:text-xl font-semibold text-ink break-words leading-tight"
              >
                {title}
              </h2>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="flex-shrink-0 inline-flex items-center font-mono text-[11px] sm:text-xs text-muted hover:text-accent transition-colors px-2 py-2 min-h-[40px] min-w-[40px] border border-hairline hover:border-accent"
              aria-label="Close modal"
            >
              <span aria-hidden="true" className="text-accent mr-1">[</span>
              <span aria-hidden="true">× close</span>
              <span aria-hidden="true" className="text-accent ml-1">]</span>
            </button>
          </div>
          {/* Category meta row */}
          <div className="mt-2 flex items-center gap-3 font-mono text-[10px] sm:text-[11px] text-muted">
            <span>
              <span className="text-accent">●</span> {category.toLowerCase()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Hero image — hairline framed */}
          <button
            type="button"
            onClick={() => setSelectedImageIndex(0)}
            className="relative h-48 sm:h-64 md:h-80 w-full mb-5 sm:mb-7 overflow-hidden border border-hairline bg-surface cursor-zoom-in block group"
            aria-label={`Expand ${title} preview image`}
          >
            <Image
              src={imageUrl}
              alt={`${title} preview`}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-200"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
            <span className="absolute bottom-2 right-2 font-mono text-[10px] text-canvas bg-ink/80 px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              ⌕ zoom
            </span>
          </button>

          {/* Proof badges — accent chip row */}
          {proofBadges && proofBadges.length > 0 && (
            <div className="mb-5 sm:mb-7">
              <SectionLabel>production readiness</SectionLabel>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {proofBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center font-mono text-[11px] sm:text-xs text-accent border border-accent/60 px-2 py-0.5 tracking-wide"
                  >
                    <span aria-hidden="true" className="mr-1">●</span>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Two-column layout: details (left) + sidebar (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 lg:gap-8 mb-5 sm:mb-7">
            {/* Left column — long-form sections */}
            <div className="space-y-5 sm:space-y-7 min-w-0">
              {longDescription && (
                <div>
                  <SectionLabel>overview</SectionLabel>
                  <div
                    className="prose prose-sm sm:prose dark:prose-invert max-w-none text-ink/85 leading-relaxed [&>ul]:list-disc [&>ul]:list-outside [&>ul]:ml-5 [&>ul]:space-y-2 [&>ul>li]:leading-relaxed [&>p]:leading-relaxed [&>p]:text-sm sm:[&>p]:text-base"
                    dangerouslySetInnerHTML={{ __html: longDescription }}
                  />
                </div>
              )}

              {challenges && (
                <div>
                  <SectionLabel>challenges</SectionLabel>
                  <p className="text-sm sm:text-[15px] text-ink/85 leading-relaxed">
                    {challenges}
                  </p>
                </div>
              )}

              {solutions && (
                <div>
                  <SectionLabel>solutions</SectionLabel>
                  <p className="text-sm sm:text-[15px] text-ink/85 leading-relaxed">
                    {solutions}
                  </p>
                </div>
              )}

              {results && (
                <div>
                  <SectionLabel>results</SectionLabel>
                  <p className="text-sm sm:text-[15px] text-ink/85 leading-relaxed">
                    {results}
                  </p>
                </div>
              )}

              {architecture && (
                <div>
                  <SectionLabel>architecture</SectionLabel>
                  <p className="text-sm sm:text-[15px] text-ink/85 leading-relaxed">
                    {architecture}
                  </p>
                </div>
              )}

              {productionReadiness && (
                <div>
                  <SectionLabel>production notes</SectionLabel>
                  <p className="text-sm sm:text-[15px] text-ink/85 leading-relaxed">
                    {productionReadiness}
                  </p>
                </div>
              )}

              {validationChecks && (
                <div>
                  <SectionLabel>validation</SectionLabel>
                  <p className="text-sm sm:text-[15px] text-ink/85 leading-relaxed">
                    {validationChecks}
                  </p>
                </div>
              )}
            </div>

            {/* Right sidebar — stack + links */}
            <div className="space-y-5 sm:space-y-7 lg:border-l lg:border-hairline lg:pl-6">
              <div>
                <SectionLabel>stack</SectionLabel>
                <div className="flex flex-wrap gap-1.5">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] sm:text-[11px] text-ink/85 border border-hairline px-2 py-0.5 hover:border-accent/60 hover:text-accent transition-colors duration-150"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(liveUrl || githubUrl || apiDocsUrl) && (
                <div>
                  <SectionLabel>links</SectionLabel>
                  <div className="flex flex-col gap-2">
                    {liveUrl && (
                      <Link
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 font-mono text-sm text-ink border border-hairline hover:border-accent hover:text-accent transition-colors duration-150 px-3 py-2.5 min-h-[44px]"
                      >
                        <span aria-hidden="true" className="text-accent">→</span>
                        <span>live demo</span>
                      </Link>
                    )}
                    {githubUrl && (
                      <Link
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 font-mono text-sm text-ink border border-hairline hover:border-accent hover:text-accent transition-colors duration-150 px-3 py-2.5 min-h-[44px]"
                      >
                        <span aria-hidden="true" className="text-accent">→</span>
                        <span>github</span>
                      </Link>
                    )}
                    {apiDocsUrl && (
                      <Link
                        href={apiDocsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 font-mono text-sm text-ink border border-hairline hover:border-accent hover:text-accent transition-colors duration-150 px-3 py-2.5 min-h-[44px]"
                      >
                        <span aria-hidden="true" className="text-accent">→</span>
                        <span>api docs</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional screenshots */}
          {additionalImages.length > 0 && (
            <div>
              <SectionLabel>screenshots</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {additionalImages.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImageIndex(index + 1)}
                    className="relative h-32 sm:h-48 overflow-hidden border border-hairline hover:border-accent cursor-zoom-in block w-full transition-colors duration-150"
                    aria-label={`Expand ${title} screenshot ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`${title} screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ImageModal
        src={selectedImageIndex !== null ? allImages[selectedImageIndex] : imageUrl}
        alt={
          selectedImageIndex === null || selectedImageIndex === 0
            ? `${title} preview`
            : `${title} screenshot ${selectedImageIndex}`
        }
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        hasPrevious={selectedImageIndex !== null && selectedImageIndex > 0}
        hasNext={selectedImageIndex !== null && selectedImageIndex < allImages.length - 1}
        onPrevious={() =>
          setSelectedImageIndex((prev) => (prev !== null ? Math.max(0, prev - 1) : prev))
        }
        onNext={() =>
          setSelectedImageIndex((prev) =>
            prev !== null ? Math.min(allImages.length - 1, prev + 1) : prev
          )
        }
      />
    </div>
  );
}
