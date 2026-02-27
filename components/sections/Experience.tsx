'use client';

import React, { useState } from 'react';
import { experiences } from '@/content/data/experience';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const Experience: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 sm:mb-6">
              Work Experience
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-black dark:bg-white mx-auto"></div>
          </div>

          {/* Experience timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600 hidden md:block"></div>

            <div className="space-y-6 sm:space-y-8">
              {experiences.map((exp) => {
                const isExpanded = expandedCards.has(exp.id);
                
                return (
                  <div key={exp.id} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-2 sm:left-6 w-4 h-4 bg-black dark:bg-white rounded-full border-4 border-white dark:border-black shadow-lg hidden md:block"></div>

                    {/* Experience card */}
                    <div
                      className={`md:ml-16 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 overflow-hidden ${
                        exp.id === 'dds-2025'
                          ? 'border-2 border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl'
                          : 'border border-gray-200 dark:border-gray-700 hover:shadow-lg'
                      }`}
                    >
                      {/* Compact Header - Always Visible */}
                      <button
                        type="button"
                        className="w-full text-left p-4 sm:p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-colors duration-200"
                        onClick={() => toggleCard(exp.id)}
                        aria-expanded={isExpanded}
                        aria-controls={`experience-panel-${exp.id}`}
                      >
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                            {/* Company Logo */}
                            <div className="flex-shrink-0">
                              {exp.logo ? (
                                <div className={`w-12 h-12 sm:w-16 sm:h-16 relative rounded-lg overflow-hidden ${
                                  exp.id === 'hsrg-2021' || exp.id === 'spiti-2018'
                                    ? 'bg-white dark:bg-white'
                                    : 'bg-gray-100 dark:bg-gray-600'
                                }`}>
                                  <Image
                                    src={exp.logo}
                                    alt={`${exp.company} logo`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 48px, 64px"
                                  />
                                </div>
                              ) : (
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                  <span className="text-gray-600 dark:text-gray-400 font-bold text-lg sm:text-xl">
                                    {exp.company.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Basic Info */}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight break-words">
                                {exp.title}
                              </h3>
                              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-medium break-words">
                                {exp.company}
                              </p>
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500/75 dark:text-gray-400/75 mt-1">
                                <Calendar className="w-4 h-4" />
                                <span className="break-words">
                                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                </span>
                                {exp.current && (
                                  <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                                    Current
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Expand/Collapse Button */}
                          <div className="flex-shrink-0 ml-4">
                            <ChevronDown
                              className={`w-6 h-6 p-1 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition-all duration-200 ${
                                isExpanded ? 'rotate-180' : 'rotate-0'
                              }`}
                            />
                          </div>
                        </div>
                      </button>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div
                          id={`experience-panel-${exp.id}`}
                          className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-200 dark:border-gray-700"
                        >
                          <div className="pt-4 sm:pt-6 space-y-4 sm:space-y-6">
                            {/* Location */}
                            <div className="flex items-center text-sm sm:text-base text-gray-600 dark:text-gray-300">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{exp.location}</span>
                            </div>

                            {/* Key Achievements */}
                            <div>
                              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Key Achievements
                              </h4>
                              <ul className="space-y-2">
                                {exp.achievements.map((achievement, achievementIndex) => (
                                  <li key={achievementIndex} className="flex items-start">
                                    <div className="flex-shrink-0 w-1.5 h-1.5 bg-gray-600 dark:bg-gray-400 rounded-full mt-2 mr-3"></div>
                                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                      {achievement}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Technologies */}
                            {exp.technologies && exp.technologies.length > 0 && (
                              <div>
                                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                  Technologies Used
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {exp.technologies.map((tech, techIndex) => (
                                    <span
                                      key={techIndex}
                                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded-full font-medium"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
