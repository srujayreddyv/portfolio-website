import { personalData } from '@/content/data/personal';
import { Publication } from '@/types';

export default function Publications() {
  // Check if publications exist in personalData
  const publications: Publication[] = (personalData as any).publications || [];

  if (!publications || publications.length === 0) {
    return null; // Don't render if no publications
  }

  return (
    <section id="publications" className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 sm:mb-6">
              Publications
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-black dark:bg-white mx-auto"></div>
          </div>

          {/* Publications list */}
          <div className="space-y-8 sm:space-y-12">
            {publications.map((publication: Publication, index: number) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8"
              >
                <div className="space-y-4">
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black dark:text-white leading-tight">
                    {publication.title}
                  </h3>

                  {/* Authors */}
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-medium">
                    {publication.authors}
                  </p>

                  {/* Publication details */}
                  <div className="flex flex-wrap gap-2 sm:gap-4 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">{publication.venue}</span>
                    {publication.year && (
                      <>
                        <span>•</span>
                        <span>{publication.year}</span>
                      </>
                    )}
                    {publication.type && (
                      <>
                        <span>•</span>
                        <span className="capitalize">{publication.type}</span>
                      </>
                    )}
                  </div>

                  {/* Abstract/Description */}
                  {publication.abstract && (
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {publication.abstract}
                    </p>
                  )}

                  {/* Links */}
                  {(publication.doi || publication.url || publication.pdf) && (
                    <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                      {publication.doi && (
                        <a
                          href={`https://doi.org/${publication.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                        >
                          DOI
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {publication.url && (
                        <a
                          href={publication.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                        >
                          View Paper
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {publication.pdf && (
                        <a
                          href={publication.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors duration-200"
                        >
                          PDF
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}