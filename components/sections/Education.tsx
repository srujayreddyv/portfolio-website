'use client';

import React, { useState } from 'react';
import { education } from '@/content/data/education';
import Image from 'next/image';

/**
 * Education — Direction 2 log-block vocabulary.
 *
 * Each degree renders as a hairline-bordered block with mono timestamp,
 * matching Experience.tsx's vocabulary. Logos as small squared frames.
 * Coursework as mono hairline chips.
 *
 * Disclosure: controlled useState (not native <details>) — ported from the
 * main-branch refactor for explicit aria-expanded / aria-controls semantics.
 */
const Education: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    const next = new Set(expandedCards);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpandedCards(next);
  };

  return (
    <section
      id="education"
      className="py-16 sm:py-20 lg:py-24 bg-canvas border-t border-hairline"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="mb-10 sm:mb-14 lg:mb-16">
            <div className="font-mono text-[11px] sm:text-xs text-muted tracking-wide mb-3">
              <span className="text-accent">$ </span>cat education.log
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink tracking-[-0.02em]">
              Education
            </h2>
            <div className="mt-3 h-px w-12 bg-accent" />
          </div>

          {/* Education log */}
          <div className="space-y-5 sm:space-y-6">
            {education.map((edu) => {
              const isExpanded = expandedCards.has(edu.id);
              const dateRange = `${edu.startDate.toLowerCase()} — ${edu.endDate.toLowerCase()}`;
              const isWhiteLogoBg = edu.id === 'iiith-btech';

              return (
                <div
                  key={edu.id}
                  className="border border-hairline bg-surface/60 hover:border-accent/50 transition-colors duration-150"
                >
                  <button
                    type="button"
                    onClick={() => toggleCard(edu.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`education-panel-${edu.id}`}
                    className="w-full text-left cursor-pointer p-4 sm:p-5 lg:p-6 hover:bg-surface transition-colors duration-150"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Date stamp */}
                      <div className="hidden sm:block flex-shrink-0 pt-1 w-40 font-mono text-[11px] text-muted tracking-wide">
                        {dateRange}
                        {edu.gpa && <div className="mt-1 text-ink/70">gpa: {edu.gpa}</div>}
                      </div>

                      {/* Logo + details */}
                      <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                        {edu.logo ? (
                          <div
                            className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 relative border border-hairline overflow-hidden ${
                              isWhiteLogoBg ? 'bg-white' : 'bg-surface'
                            }`}
                          >
                            <Image
                              src={edu.logo}
                              alt={`${edu.institution} logo`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 40px, 48px"
                            />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 border border-hairline bg-surface flex items-center justify-center">
                            <span className="font-mono text-muted font-bold text-base">
                              {edu.institution.charAt(0)}
                            </span>
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          {/* Mobile date row */}
                          <div className="sm:hidden font-mono text-[10px] text-muted mb-1">
                            {dateRange}
                            {edu.gpa && <span className="ml-2">· gpa {edu.gpa}</span>}
                          </div>
                          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-ink leading-tight break-words">
                            {edu.degree} in {edu.field}
                          </h3>
                          <p className="font-mono text-[12px] sm:text-sm text-muted mt-0.5 break-words">
                            {edu.institution.toLowerCase()}
                          </p>
                          <p className="font-mono text-[10px] sm:text-[11px] text-muted/80 mt-0.5">
                            {edu.location.toLowerCase()}
                          </p>
                        </div>
                      </div>

                      {/* Expand indicator */}
                      <div className="flex-shrink-0 font-mono text-[10px] sm:text-xs text-muted self-center pl-2">
                        <span
                          aria-hidden="true"
                          className={`inline-block transition-transform duration-150 ${
                            isExpanded ? 'rotate-90' : 'rotate-0'
                          }`}
                        >
                          ›
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Expanded body */}
                  {isExpanded && (
                    <div
                      id={`education-panel-${edu.id}`}
                      className="px-4 sm:px-5 lg:px-6 pb-5 sm:pb-6 border-t border-hairline"
                    >
                      <div className="pt-4 sm:pt-5 space-y-5 sm:pl-44">
                        {/* Honors */}
                        {edu.honors && edu.honors.length > 0 && (
                          <div>
                            <div className="font-mono text-[10px] sm:text-[11px] text-muted uppercase tracking-[0.08em] mb-2">
                              ─── honors
                            </div>
                            <ul className="space-y-2">
                              {edu.honors.map((honor, i) => (
                                <li key={i} className="flex items-start gap-2 max-w-[72ch]">
                                  <span
                                    aria-hidden="true"
                                    className="text-accent flex-shrink-0 mt-0.5 select-none font-mono"
                                  >
                                    ›
                                  </span>
                                  <span className="text-sm sm:text-[15px] text-ink/85 leading-relaxed">
                                    {honor}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Coursework */}
                        {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                          <div>
                            <div className="font-mono text-[10px] sm:text-[11px] text-muted uppercase tracking-[0.08em] mb-2">
                              ─── relevant coursework
                            </div>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {edu.relevantCoursework.map((course, i) => (
                                <span
                                  key={i}
                                  className="font-mono text-[10px] sm:text-[11px] text-ink/80 border border-hairline px-2 py-0.5"
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
