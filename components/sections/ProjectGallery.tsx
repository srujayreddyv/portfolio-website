'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';

const ProjectModal = dynamic(() => import('./ProjectModal'));

interface ProjectGalleryProps {
  projects?: Project[];
}

/**
 * ProjectGallery — Direction 2 restyle.
 *
 * Preserves the filtering / sorting / modal behavior from the original.
 * Restyled with terminal vocabulary: small mono section label, hairline
 * borders on filter controls, accent counter, mono select inputs.
 *
 * Preserves the responsive grid classes (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3)
 * and section padding (py-16 sm:py-20 lg:py-24) so ResponsiveLayout + visual
 * consistency tests keep passing.
 */
export default function ProjectGallery({ projects = [] }: ProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    if (!projects || projects.length === 0) return ['All'];
    const cats = new Set(projects.map((p) => p.category));
    return ['All', ...Array.from(cats).sort()];
  }, [projects]);

  const technologies = useMemo(() => {
    if (!projects || projects.length === 0) return ['All'];
    const techs = new Set(projects.flatMap((p) => p.technologies));
    return ['All', ...Array.from(techs).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
      const technologyMatch =
        selectedTechnology === 'All' || project.technologies.includes(selectedTechnology);
      return categoryMatch && technologyMatch;
    });
  }, [projects, selectedCategory, selectedTechnology]);

  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
    });
  }, [filteredProjects]);

  const handleProjectClick = (project: Project) => setSelectedProject(project);
  const handleCloseModal = () => setSelectedProject(null);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedTechnology('All');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedTechnology !== 'All';

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 lg:py-24 bg-canvas border-t border-hairline"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-10 sm:mb-14 lg:mb-16">
            <div className="font-mono text-[11px] sm:text-xs text-muted tracking-wide mb-3">
              <span className="text-accent">$ </span>ls projects/
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink tracking-[-0.02em]">
              Featured Projects
            </h2>
            <div className="mt-3 h-px w-12 bg-accent" />
            <p className="mt-5 sm:mt-6 max-w-2xl text-sm sm:text-base text-ink/80 leading-relaxed font-mono">
              Production-focused AI, RAG, and backend platform projects with
              real deployment, observability, and API design considerations.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  aria-expanded={showFilters}
                  aria-controls="project-filters"
                  className="inline-flex items-center gap-2 px-3 py-2 border border-hairline text-ink hover:border-accent hover:text-accent font-mono text-xs sm:text-sm transition-colors duration-150 min-h-[40px]"
                >
                  <span aria-hidden="true" className="text-accent">⌕</span>
                  <span>Filters</span>
                  {hasActiveFilters && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent ml-1" aria-hidden="true" />
                  )}
                </button>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1 px-2 py-1 font-mono text-xs text-muted hover:text-accent transition-colors duration-150 min-h-[32px]"
                  >
                    <span aria-hidden="true">×</span>
                    <span>clear filters</span>
                  </button>
                )}
              </div>

              <div className="font-mono text-xs text-muted">
                Showing <span className="text-accent">{sortedProjects.length}</span> of {projects.length} projects
              </div>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div
                id="project-filters"
                className="mt-4 p-4 sm:p-5 border border-hairline bg-surface"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="project-category-filter"
                      className="block font-mono text-[10px] uppercase tracking-[0.08em] text-muted mb-1.5"
                    >
                      ─── category
                    </label>
                    <select
                      id="project-category-filter"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-hairline bg-canvas text-ink font-mono text-sm focus:outline-none focus:border-accent transition-colors duration-150 min-h-[40px]"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="project-technology-filter"
                      className="block font-mono text-[10px] uppercase tracking-[0.08em] text-muted mb-1.5"
                    >
                      ─── technology
                    </label>
                    <select
                      id="project-technology-filter"
                      value={selectedTechnology}
                      onChange={(e) => setSelectedTechnology(e.target.value)}
                      className="w-full px-3 py-2 border border-hairline bg-canvas text-ink font-mono text-sm focus:outline-none focus:border-accent transition-colors duration-150 min-h-[40px]"
                    >
                      {technologies.map((technology) => (
                        <option key={technology} value={technology}>
                          {technology}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Projects Grid */}
          {sortedProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
              {sortedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 border border-hairline border-dashed">
              <p className="text-muted text-sm sm:text-base mb-4 font-mono">
                no projects match the selected filters
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 font-mono text-sm text-accent hover:underline underline-offset-4 min-h-[40px]"
              >
                <span aria-hidden="true">$ </span>clear-filters
              </button>
            </div>
          )}

          {/* Project Detail Modal */}
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={handleCloseModal} />
          )}
        </div>
      </div>
    </section>
  );
}
