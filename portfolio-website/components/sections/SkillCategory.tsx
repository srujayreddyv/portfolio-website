'use client';

import React, { useState } from 'react';
import { SkillCategory as SkillCategoryType } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SkillCategoryProps {
  category: SkillCategoryType;
  isPrimary?: boolean;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ category, isPrimary = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxInitialSkills = 7;
  const hasMoreSkills = category.skills.length > maxInitialSkills;
  const displayedSkills = isExpanded ? category.skills : category.skills.slice(0, maxInitialSkills);

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-gradient-to-r from-green-500 to-emerald-600';
      case 'Advanced':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'Intermediate':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'Beginner':
        return 'bg-gradient-to-r from-red-400 to-red-500';
      default:
        return 'bg-gray-300 dark:bg-gray-600';
    }
  };

  const getLevelBadgeColor = (level?: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Advanced':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Beginner':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getLevelWidth = (level?: string) => {
    switch (level) {
      case 'Expert':
        return 'w-full';
      case 'Advanced':
        return 'w-4/5';
      case 'Intermediate':
        return 'w-3/5';
      case 'Beginner':
        return 'w-2/5';
      default:
        return 'w-1/5';
    }
  };

  return (
    <div className={`p-4 sm:p-6 lg:p-8 rounded-lg border transition-all duration-200 hover:shadow-md ${
      isPrimary 
        ? 'border-black dark:border-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white' 
        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white'
    } shadow-sm`}>
      <h3 className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 lg:mb-6 ${
        isPrimary 
          ? 'text-gray-800 dark:text-white' 
          : 'text-gray-800 dark:text-white'
      }`}>
        {category.category}
        {isPrimary && (
          <span className="ml-2 text-xs sm:text-sm font-normal text-gray-800 dark:text-white">
            (Primary)
          </span>
        )}
      </h3>
      
      <div className="space-y-3 sm:space-y-4">
        {displayedSkills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="font-medium text-sm sm:text-base text-gray-700 dark:text-gray-200">
                {skill.name}
              </span>
              {skill.level && (
                <span className={`self-start sm:self-auto px-2 py-1 text-xs rounded-full font-medium ${getLevelBadgeColor(skill.level)} whitespace-nowrap`}>
                  {skill.level}
                </span>
              )}
            </div>
            
            {skill.level && (
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getLevelColor(skill.level)} ${getLevelWidth(skill.level)}`}
                ></div>
              </div>
            )}
            
            {skill.yearsOfExperience && (
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} of experience
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Expand/Collapse Button */}
      {hasMoreSkills && (
        <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Show {category.skills.length - maxInitialSkills} More</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillCategory;