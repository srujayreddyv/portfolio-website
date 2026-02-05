'use client';

import Image from 'next/image';
import { useState } from 'react';
import { personalData } from '@/content/data/personal';
import ImageModal from '@/components/ui/ImageModal';

export default function Hero() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Professional headshot */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto mb-6 sm:mb-8 cursor-pointer group"
              aria-label="Click to view larger image"
            >
              <Image
                src="/my-profile-pic.png"
                alt={`${personalData.name} - Professional headshot`}
                fill
                className="rounded-full object-cover shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                priority
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-full flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
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
            </button>
          </div>

          {/* Name */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black dark:text-white mb-3 sm:mb-4 lg:mb-6 leading-tight">
              {personalData.name}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-semibold">
              {personalData.title}
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-10 sm:mb-12 lg:mb-16">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              {personalData.bio}
            </p>
          </div>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center mb-8 sm:mb-10 lg:mb-12">
            <a
              href="#projects"
              className="w-full sm:w-auto bg-black hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-600 text-white dark:text-black px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center min-h-[48px] flex items-center justify-center"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 text-center min-h-[48px] flex items-center justify-center"
            >
              Get In Touch
            </a>
            {personalData.resumeUrl && (
              <a
                href={personalData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 px-4 sm:px-6 py-3 sm:py-4 font-semibold transition-colors duration-200 underline text-center min-h-[48px] flex items-center justify-center"
              >
                Download Resume
              </a>
            )}
          </div>

          {/* Social links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
            {personalData.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={`Visit ${link.platform} profile`}
              >
                <span className="sr-only">{link.platform}</span>
                {/* Simple text representation for now - can be replaced with icons later */}
                <span className="text-sm sm:text-base font-medium">{link.platform}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        src="/my-profile-pic.png"
        alt={personalData.name}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />
    </section>
  );
}
