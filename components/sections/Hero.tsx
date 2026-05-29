import {
  SiPython,
  SiFastapi,
  SiAmazonwebservices,
  SiGithub,
  SiLinkedin
} from 'react-icons/si';
import { Bot, Briefcase } from 'lucide-react';
import { personalData } from '@/content/data/personal';
import HeroImageButton from '@/components/ui/HeroImageButton';

export default function Hero() {
  return (
    <section
      id="about"
      className="min-h-[85vh] flex items-center justify-center"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-9 sm:py-12 lg:py-14">
        <div className="max-w-4xl mx-auto text-center">
          {/* Professional headshot */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <HeroImageButton name={personalData.name} src="/my-profile-pic.webp" />
          </div>

          {/* Name */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black dark:text-white mb-3 sm:mb-4 lg:mb-6 leading-tight">
              {personalData.name}
            </h1>
            <p className="text-[clamp(1.05rem,2.1vw,2rem)] text-gray-600 dark:text-gray-300 font-semibold">
              {personalData.title}
            </p>
            <p className="mt-2 text-[0.7rem] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
              {personalData.heroLead}
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-9 sm:mb-11 lg:mb-14">
            <div className="flex flex-wrap justify-center gap-2 mb-16 sm:mb-20">
              {[
                { name: 'Python', Icon: SiPython, color: '#3776AB' },
                { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
                { name: 'TypeScript', Icon: Bot, color: '#3178C6' },
                { name: 'AWS', Icon: SiAmazonwebservices, color: '#FF9900' },
                { name: 'RAG', Icon: Bot, color: '#2563EB' },
                { name: 'Multi-Agent Systems', Icon: Bot, color: '#2563EB' }
              ].map(({ name, Icon, color }) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-2 px-3 py-1 text-xs sm:text-sm rounded-full border border-gray-300/80 dark:border-gray-600/80 text-gray-800 dark:text-gray-200 bg-gray-100/70 dark:bg-gray-800/55 transition-all duration-150 hover:scale-[1.03] hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                >
                  <Icon className="h-4 w-4" style={{ color }} aria-hidden="true" />
                  <span>{name}</span>
                </span>
              ))}
            </div>
            <div className="text-[clamp(0.95rem,1.55vw,1.5rem)] text-gray-700 dark:text-gray-300 max-w-[620px] mx-auto leading-snug px-4 sm:px-6 space-y-3 sm:space-y-4">
              {personalData.heroDescription
                ?.filter((paragraph) => paragraph !== personalData.heroLead)
                .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center mb-8 sm:mb-10 lg:mb-12">
            <a
              href="#projects"
              className="w-full sm:w-auto bg-black hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-600 text-white dark:text-black px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-150 shadow-lg hover:shadow-xl hover:shadow-[0_8px_24px_rgba(59,130,246,0.25)] transform hover:scale-[1.03] hover:-translate-y-0.5 text-center min-h-[48px] flex items-center justify-center"
            >
              Explore Projects
            </a>
            {personalData.resumeUrl && (
              <a
                href={personalData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-150 transform hover:scale-[1.03] hover:-translate-y-0.5 text-center min-h-[48px] flex items-center justify-center"
              >
                Download Resume
              </a>
            )}
            <a
              href="#contact"
              className="w-full sm:w-auto text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 px-4 sm:px-6 py-3 sm:py-4 font-semibold transition-all duration-150 underline transform hover:scale-[1.03] hover:-translate-y-0.5 text-center min-h-[48px] flex items-center justify-center"
            >
              Let&apos;s Connect
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base">
            {personalData.socialLinks.map((link, index) => (
              <div key={link.platform} className="flex items-center gap-2">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                  aria-label={`Visit ${link.platform} profile`}
                >
                  {link.platform === 'GitHub' ? (
                    <SiGithub className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <SiLinkedin className="h-4 w-4" aria-hidden="true" />
                  )}
                  {link.platform}
                </a>
                {index < personalData.socialLinks.length - 1 && (
                  <span className="text-gray-400 dark:text-gray-500" aria-hidden="true">·</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium inline-flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
            {personalData.availabilityNote}
          </p>
        </div>
      </div>
    </section>
  );
}
