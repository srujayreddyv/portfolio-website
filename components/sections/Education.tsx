'use client';

import React, { useState } from 'react';
import { education } from '@/content/data/education';
import { Calendar, GraduationCap, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

const Education: React.FC = () => {
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
    <section id="education" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 sm:mb-6">
              Education
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-black dark:bg-white mx-auto mb-4 sm:mb-6"></div>
          </div>

          {/* Education cards */}
          <div className="space-y-6 sm:space-y-8">
            {education.map((edu) => {
              const isExpanded = expandedCards.has(edu.id);
              
              return (
                <div key={edu.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Compact Header - Always Visible */}
                  <button
                    type="button"
                    className="w-full text-left p-4 sm:p-6 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => toggleCard(edu.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`education-panel-${edu.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        {/* Institution Logo */}
                        <div className="flex-shrink-0">
                          {edu.logo ? (
                            <div className={`w-12 h-12 sm:w-16 sm:h-16 relative rounded-lg overflow-hidden ${
                              edu.id === 'iiith-btech' 
                                ? 'bg-white dark:bg-white' 
                                : 'bg-white dark:bg-gray-600'
                            }`}>
                              <Image
                                src={edu.logo}
                                alt={`${edu.institution} logo`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 48px, 64px"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                          )}
                        </div>

                        {/* Basic Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                            {edu.degree} in {edu.field}
                          </h3>
                          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-medium">
                            {edu.institution}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{edu.startDate} - {edu.endDate}</span>
                            {edu.gpa && (
                              <>
                                <span className="mx-2">•</span>
                                <span>GPA: {edu.gpa}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expand/Collapse Button */}
                      <div className="flex-shrink-0 ml-4">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div
                      id={`education-panel-${edu.id}`}
                      className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="pt-4 sm:pt-6 space-y-4 sm:space-y-6">
                        {/* Honors & Recognition */}
                        {edu.honors && edu.honors.length > 0 && (
                          <div>
                            <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
                              Honors & Recognition
                            </h4>
                            <ul className="space-y-2">
                              {edu.honors.map((honor, honorIndex) => (
                                <li key={honorIndex} className="flex items-start">
                                  <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3"></div>
                                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {honor}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Relevant Coursework */}
                        {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                          <div>
                            <div className="flex items-center mb-3">
                              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 mr-2" />
                              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                                Relevant Coursework
                              </h4>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                              {edu.relevantCoursework.map((course, courseIndex) => (
                                <div
                                  key={courseIndex}
                                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded-md font-medium"
                                >
                                  {course}
                                </div>
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
