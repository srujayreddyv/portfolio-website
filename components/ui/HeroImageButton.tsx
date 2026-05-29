'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageModal from '@/components/ui/ImageModal';

interface HeroImageButtonProps {
  name: string;
  src: string;
  /**
   * `compact` (Direction 2 vocabulary): smaller squared frame with a hairline
   * border, intended to sit inline next to the headline. Default (false)
   * preserves the prior large circular avatar.
   */
  compact?: boolean;
  className?: string;
}

export default function HeroImageButton({
  name,
  src,
  compact = false,
  className = '',
}: HeroImageButtonProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const sizeClasses = compact
    ? 'w-20 h-20 sm:w-24 sm:h-24'
    : 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto mb-6 sm:mb-8';

  const frameClasses = compact
    ? 'border border-hairline'
    : 'rounded-full shadow-xl hover:shadow-2xl';

  return (
    <>
      <button
        onClick={() => setIsImageModalOpen(true)}
        className={`relative ${sizeClasses} cursor-pointer group ${className}`.trim()}
        aria-label="Click to view larger image"
      >
        <Image
          src={src}
          alt={`${name} - Professional headshot`}
          fill
          className={`${frameClasses} object-cover transition-all duration-150 group-hover:scale-105`.trim()}
          priority
          sizes={
            compact
              ? '(max-width: 640px) 80px, 96px'
              : '(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px'
          }
        />
        {!compact && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-150 rounded-full flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </div>
        )}
      </button>

      <ImageModal
        src={src}
        alt={name}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />
    </>
  );
}
