'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';
import { X, ExternalLink, Github } from 'lucide-react';
import ImageModal from '@/components/ui/ImageModal';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

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
    results
  } = project;
  const allImages = useMemo(() => [imageUrl, ...(images || [])], [imageUrl, images]);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Handle escape key press + focus trap
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

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-75"
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <h2 id="project-modal-title" className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white break-words">
              {title}
            </h2>
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-full self-start">
              {category}
            </span>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Project Image */}
          <button
            type="button"
            onClick={() => setSelectedImageIndex(0)}
            className="relative h-48 sm:h-64 md:h-80 w-full mb-4 sm:mb-6 rounded-lg overflow-hidden cursor-zoom-in block"
            aria-label={`Expand ${title} preview image`}
          >
            <Image
              src={imageUrl}
              alt={`${title} preview`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </button>

          {/* Proof badges */}
          {proofBadges && proofBadges.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                Production Readiness
              </h3>
              <div className="flex flex-wrap gap-2">
                {proofBadges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Long Description */}
              {longDescription && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    Project Details
                  </h3>
                  <div className="prose prose-sm sm:prose dark:prose-invert max-w-none">
                    <div 
                      className="[&>ul]:list-disc [&>ul]:list-outside [&>ul]:ml-6 [&>ul]:space-y-3 [&>ul>li]:leading-relaxed [&>ul>li]:text-gray-600 [&>ul>li]:dark:text-gray-300"
                      dangerouslySetInnerHTML={{ __html: longDescription }} 
                    />
                  </div>
                </div>
              )}

              {/* Challenges */}
              {challenges && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    Challenges
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {challenges}
                  </p>
                </div>
              )}

              {/* Solutions */}
              {solutions && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    Solutions
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {solutions}
                  </p>
                </div>
              )}

              {/* Results */}
              {results && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    Results
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {results}
                  </p>
                </div>
              )}

              {/* Architecture */}
              {architecture && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    Architecture
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {architecture}
                  </p>
                </div>
              )}

              {/* Production Readiness */}
              {productionReadiness && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    Production Readiness
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {productionReadiness}
                  </p>
                </div>
              )}

              {/* Validation */}
              {validationChecks && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    Validation
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {validationChecks}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Technologies */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  Project Links
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {liveUrl && (
                    <Link
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border-2 border-black dark:border-white text-black dark:text-white rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 text-sm sm:text-base min-h-[44px]"
                    >
                      <ExternalLink size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                      <span>View Live Demo</span>
                    </Link>
                  )}
                  {githubUrl && (
                    <Link
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border-2 border-black dark:border-white text-black dark:text-white rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 text-sm sm:text-base min-h-[44px]"
                    >
                      <Github size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                      <span>View Source Code</span>
                    </Link>
                  )}
                  {apiDocsUrl && (
                    <Link
                      href={apiDocsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border-2 border-black dark:border-white text-black dark:text-white rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 text-sm sm:text-base min-h-[44px]"
                    >
                      <ExternalLink size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                      <span>View Backend API Docs</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Images */}
          {images && images.length > 0 && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Additional Screenshots
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImageIndex(index + 1)}
                    className="relative h-32 sm:h-48 rounded-lg overflow-hidden cursor-zoom-in block w-full"
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
