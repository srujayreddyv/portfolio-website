'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

/**
 * ProjectCard — Direction 2 terminal vocabulary.
 *
 * Hairline-bordered card with no soft rounded corners, mono category label,
 * accent top border when featured, accent proof badges, and terminal-style
 * link rows with an arrow glyph in the card footer.
 */
export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const {
    title,
    description,
    technologies,
    category,
    imageUrl,
    liveUrl,
    apiDocsUrl,
    githubUrl,
    featured,
    proofBadges,
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
        group relative flex flex-col bg-surface border border-hairline
        hover:border-accent transition-colors duration-150 overflow-hidden
        cursor-pointer
        ${featured ? 'border-t-2 border-t-accent' : ''}
      `.trim()}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={onClick ? `Open ${title} details` : undefined}
    >
      {/* Featured Badge — top-right, mono terminal style */}
      {featured && (
        <div className="absolute top-3 right-3 z-10 font-mono text-[10px] text-accent bg-canvas border border-accent px-2 py-0.5 tracking-[0.08em] uppercase">
          Featured
        </div>
      )}

      {/* Project Image — framed in hairline */}
      <div className="relative h-40 sm:h-44 lg:h-48 w-full overflow-hidden border-b border-hairline bg-canvas">
        <Image
          src={imageUrl}
          alt={`${title} preview`}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-200"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Category — mono small caps */}
        <div className="font-mono text-[10px] text-muted uppercase tracking-[0.08em] mb-2">
          {category}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-ink mb-2 group-hover:text-accent transition-colors duration-150 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-ink/80 mb-4 line-clamp-3 leading-relaxed flex-1">
          {description}
        </p>

        {/* Proof badges — if present */}
        {proofBadges && proofBadges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {proofBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center font-mono text-[10px] text-accent border border-accent/60 px-2 py-0.5 tracking-wide"
              >
                <span aria-hidden="true" className="mr-1">●</span>
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Technologies — mono hairline chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {technologies.slice(0, 6).map((tech, index) => (
            <span
              key={index}
              className="font-mono text-[10px] sm:text-[11px] text-ink/80 border border-hairline px-2 py-0.5 whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 6 && (
            <span className="font-mono text-[10px] text-muted px-1">
              +{technologies.length - 6}
            </span>
          )}
        </div>

        {/* Link row — terminal-style with arrow glyphs */}
        {(liveUrl || apiDocsUrl || githubUrl) && (
          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-3 border-t border-hairline font-mono text-[11px] sm:text-xs">
            {liveUrl && (
              <Link
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-ink/85 hover:text-accent transition-colors duration-150"
                aria-label={`View ${title} live demo`}
              >
                <span aria-hidden="true" className="text-accent">→</span>
                live
              </Link>
            )}
            {apiDocsUrl && (
              <Link
                href={apiDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-ink/85 hover:text-accent transition-colors duration-150"
                aria-label={`View ${title} API docs`}
              >
                <span aria-hidden="true" className="text-accent">→</span>
                api-docs
              </Link>
            )}
            {githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-ink/85 hover:text-accent transition-colors duration-150"
                aria-label={`View ${title} source code`}
              >
                <span aria-hidden="true" className="text-accent">→</span>
                github
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
