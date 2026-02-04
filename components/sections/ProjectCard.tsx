'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const {
    title,
    description,
    technologies,
    category,
    imageUrl,
    liveUrl,
    githubUrl,
    featured
  } = project;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!onClick) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div 
      className={`
        group relative bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-md hover:shadow-lg 
        transition-all duration-300 overflow-hidden cursor-pointer
        ${featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
      `}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={onClick ? `Open ${title} details` : undefined}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 bg-blue-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-medium">
          Featured
        </div>
      )}

      {/* Project Image */}
      <div className="relative h-40 sm:h-48 lg:h-52 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${title} preview`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Overlay with links */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center space-x-3 sm:space-x-4">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2 sm:space-x-3">
            {liveUrl && (
              <Link
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 p-2 sm:p-3 rounded-full hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View ${title} live demo`}
              >
                <ExternalLink size={16} className="sm:w-5 sm:h-5" />
              </Link>
            )}
            {githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 p-2 sm:p-3 rounded-full hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View ${title} source code`}
              >
                <Github size={16} className="sm:w-5 sm:h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-4 sm:p-6">
        {/* Category */}
        <div className="mb-2 sm:mb-3">
          <span className="inline-block bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {technologies.slice(0, 6).map((tech, index) => (
            <span
              key={index}
              className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-md whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 6 && (
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-2 py-1">
              +{technologies.length - 6} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
