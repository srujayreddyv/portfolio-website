import React from 'react';
import SkillCategory from './SkillCategory';
import { skillCategories } from '@/content/data/skills';

const Skills: React.FC = () => {
  // Define primary skill areas (can be configured based on requirements)
  const primaryCategories = ['Backend & APIs', 'AI Systems & GenAI Engineering'];
  
  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 sm:mb-6">
              Skills
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-black dark:bg-white mx-auto mb-4 sm:mb-6"></div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Technologies I use to build and scale production software, data systems, and GenAI systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {skillCategories.map((category) => (
            <SkillCategory
              key={category.category}
              category={category}
              isPrimary={primaryCategories.includes(category.category)}
            />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
