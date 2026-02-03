'use client';

import { useState, useMemo } from 'react';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Filter, X } from 'lucide-react';

interface ProjectGalleryProps {
  projects?: Project[];
}

export default function ProjectGallery({ projects = [] }: ProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories and technologies
  const categories = useMemo(() => {
    if (!projects || projects.length === 0) return ['All'];
    const cats = new Set(projects.map(p => p.category));
    return ['All', ...Array.from(cats).sort()];
  }, [projects]);

  const technologies = useMemo(() => {
    if (!projects || projects.length === 0) return ['All'];
    const techs = new Set(projects.flatMap(p => p.technologies));
    return ['All', ...Array.from(techs).sort()];
  }, [projects]);

  // Filter projects based on selected filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
      const technologyMatch = selectedTechnology === 'All' || 
        project.technologies.includes(selectedTechnology);
      
      return categoryMatch && technologyMatch;
    });
  }, [projects, selectedCategory, selectedTechnology]);

  // Sort projects: featured first, then by completion date
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      // Featured projects first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then by completion date (newest first)
      return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
    });
  }, [filteredProjects]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedTechnology('All');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedTechnology !== 'All';

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-black" id="projects">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 sm:mb-6">
              Featured Projects
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-black dark:bg-white mx-auto mb-4 sm:mb-6"></div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              A showcase of my recent work and technical projects, demonstrating various skills and technologies.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors min-h-[44px] text-sm sm:text-base"
              >
                <Filter size={16} />
                <span>Filters</span>
              </button>
              
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 min-h-[40px]"
                >
                  <X size={14} />
                  <span>Clear filters</span>
                </button>
              )}
            </div>

            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 order-first sm:order-last">
              Showing {sortedProjects.length} of {projects.length} projects
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 p-4 sm:p-6 bg-gray-300 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] text-sm sm:text-base"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Technology Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Technology
                  </label>
                  <select
                    value={selectedTechnology}
                    onChange={(e) => setSelectedTechnology(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] text-sm sm:text-base"
                  >
                    {technologies.map(technology => (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {sortedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg lg:text-xl mb-4 sm:mb-6">
              No projects found matching the selected filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-black hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-500 text-white dark:text-black rounded-lg transition-colors min-h-[44px] text-sm sm:text-base"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseModal}
          />
        )}
        </div>
      </div>
    </section>
  );
}