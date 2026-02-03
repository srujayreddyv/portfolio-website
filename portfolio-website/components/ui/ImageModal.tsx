'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({ src, alt, isOpen, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
    >
      <div className="relative max-w-4xl max-h-[90vh] mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          aria-label="Close image preview"
        >
          <X size={32} />
        </button>
        
        {/* Image container */}
        <div 
          className="relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={src}
            alt={alt}
            width={800}
            height={800}
            className="max-w-full max-h-[80vh] object-contain"
            priority
          />
        </div>
        
        {/* Image title */}
        <p 
          id="image-modal-title"
          className="text-white text-center mt-4 text-lg font-medium"
        >
          {alt}
        </p>
      </div>
    </div>
  );
}