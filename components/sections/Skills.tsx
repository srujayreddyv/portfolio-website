import React from 'react';
import SkillCategory from './SkillCategory';
import { skillCategories } from '@/content/data/skills';

/**
 * Skills — Direction 2 restyle.
 *
 * Section header in terminal vocabulary, Core Stack and Supporting Stack
 * labels as mono small-caps with accent rules, skill categories rendered as
 * hairline-bordered cards through the restyled SkillCategory component.
 *
 * Preserves: heading "Skills", description text, "Core Stack" / "Supporting
 * Stack" labels, all category names, section#skills — for existing tests.
 */
const Skills: React.FC = () => {
  const primaryCategoryNames = ['Backend & APIs', 'AI & LLM Systems', 'Cloud & DevOps'];
  const primaryCategories = skillCategories.filter((category) =>
    primaryCategoryNames.includes(category.category)
  );
  const secondaryCategories = skillCategories.filter(
    (category) => !primaryCategoryNames.includes(category.category)
  );

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 lg:py-24 bg-canvas border-t border-hairline"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="mb-10 sm:mb-14 lg:mb-16">
            <div className="font-mono text-[11px] sm:text-xs text-muted tracking-wide mb-3">
              <span className="text-accent">$ </span>ls skills/
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink tracking-[-0.02em]">
              Skills
            </h2>
            <div className="mt-3 h-px w-12 bg-accent" />
            <p className="mt-5 sm:mt-6 max-w-2xl text-sm sm:text-base text-ink/80 leading-relaxed font-mono">
              Technologies I use to build and scale production software, data systems, and GenAI systems.
            </p>
          </div>

          {/* Core Stack */}
          <div className="mb-10 sm:mb-12 lg:mb-14">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-accent">
                ─── Core Stack
              </span>
              <span className="flex-1 h-px bg-hairline" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {primaryCategories.map((category) => (
                <SkillCategory key={category.category} category={category} isPrimary />
              ))}
            </div>
          </div>

          {/* Supporting Stack */}
          {secondaryCategories.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-muted">
                  ─── Supporting Stack
                </span>
                <span className="flex-1 h-px bg-hairline" aria-hidden="true" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                {secondaryCategories.map((category) => (
                  <SkillCategory key={category.category} category={category} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
