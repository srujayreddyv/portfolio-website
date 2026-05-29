'use client';

import React from 'react';
import { experiences } from '@/content/data/experience';
import Image from 'next/image';

/**
 * Experience — Direction 2 log-entry vocabulary.
 *
 * Each role renders as a hairline-bordered log block with a mono timestamp
 * header. Logos are squared with a hairline border (not rounded). Achievement
 * bullets use an accent "›" glyph. Tech tags are mono hairline-bordered chips.
 *
 * The first role (current) opens by default; the rest use native <details> so
 * the page stays scannable.
 */
const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-16 sm:py-20 lg:py-24 bg-canvas border-t border-hairline"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section header — terminal label, not centered */}
          <div className="mb-10 sm:mb-14 lg:mb-16">
            <div className="font-mono text-[11px] sm:text-xs text-muted tracking-wide mb-3">
              <span className="text-accent">$ </span>cat experience.log
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink tracking-[-0.02em]">
              Work Experience
            </h2>
            <div className="mt-3 h-px w-12 bg-accent" />
          </div>

          {/* Experience log */}
          <div className="space-y-5 sm:space-y-6">
            {experiences.map((exp) => {
              const dateRange = `${exp.startDate.toLowerCase()} — ${
                exp.current ? 'present' : exp.endDate.toLowerCase()
              }`;
              const isWhiteLogoBg = exp.id === 'hsrg-2021' || exp.id === 'spiti-2018';

              return (
                <details
                  key={exp.id}
                  open={exp.id === 'dds-2025'}
                  className="group border border-hairline bg-surface/60 hover:border-accent/50 transition-colors duration-150"
                >
                  {/* Summary row — always visible */}
                  <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer p-4 sm:p-5 lg:p-6 hover:bg-surface transition-colors duration-150">
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Date stamp */}
                      <div className="hidden sm:block flex-shrink-0 pt-1 w-40 font-mono text-[11px] text-muted tracking-wide">
                        {dateRange}
                        {exp.current && (
                          <span className="inline-flex items-center gap-1 mt-1">
                            <span
                              className="inline-block w-1.5 h-1.5 rounded-full bg-accent"
                              aria-hidden="true"
                            />
                            <span className="text-accent">current</span>
                          </span>
                        )}
                      </div>

                      {/* Logo + title */}
                      <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                        {exp.logo ? (
                          <div
                            className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 relative border border-hairline overflow-hidden ${
                              isWhiteLogoBg ? 'bg-white' : 'bg-surface'
                            }`}
                          >
                            <Image
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 40px, 48px"
                            />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 border border-hairline bg-surface flex items-center justify-center">
                            <span className="font-mono text-muted font-bold text-base">
                              {exp.company.charAt(0)}
                            </span>
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          {/* Mobile-only date row */}
                          <div className="sm:hidden font-mono text-[10px] text-muted mb-1">
                            {dateRange}
                            {exp.current && (
                              <span className="ml-2 text-accent">● current</span>
                            )}
                          </div>
                          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-ink leading-tight break-words">
                            {exp.title}
                          </h3>
                          <p className="font-mono text-[12px] sm:text-sm text-muted mt-0.5 break-words">
                            {exp.company.toLowerCase()}
                          </p>
                          <p className="font-mono text-[10px] sm:text-[11px] text-muted/80 mt-0.5">
                            {exp.location.toLowerCase()}
                          </p>
                        </div>
                      </div>

                      {/* Expand indicator — terminal-style toggle */}
                      <div className="flex-shrink-0 font-mono text-[10px] sm:text-xs text-muted self-center pl-2">
                        <span aria-hidden="true" className="inline-block transition-transform duration-150 group-open:rotate-90">
                          ›
                        </span>
                      </div>
                    </div>
                  </summary>

                  {/* Expanded body */}
                  <div className="px-4 sm:px-5 lg:px-6 pb-5 sm:pb-6 border-t border-hairline">
                    <div className="pt-4 sm:pt-5 space-y-5 sm:space-y-6 sm:pl-44">
                      {/* Description */}
                      {exp.description && (
                        <p className="font-mono text-[13px] sm:text-sm text-ink/80 leading-relaxed max-w-[68ch]">
                          <span aria-hidden="true" className="text-accent select-none mr-2">
                            #
                          </span>
                          {exp.description}
                        </p>
                      )}

                      {/* Achievements */}
                      <div>
                        <div className="font-mono text-[10px] sm:text-[11px] text-muted uppercase tracking-[0.08em] mb-2">
                          ─── achievements
                        </div>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 max-w-[72ch]">
                              <span
                                aria-hidden="true"
                                className="text-accent flex-shrink-0 mt-0.5 select-none font-mono"
                              >
                                ›
                              </span>
                              <span className="text-sm sm:text-[15px] text-ink/85 leading-relaxed">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div>
                          <div className="font-mono text-[10px] sm:text-[11px] text-muted uppercase tracking-[0.08em] mb-2">
                            ─── stack
                          </div>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="font-mono text-[10px] sm:text-[11px] text-ink/80 border border-hairline px-2 py-0.5 hover:border-accent/60 hover:text-accent transition-colors duration-150"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
