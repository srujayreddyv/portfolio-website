'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  SiPython,
  SiFastapi,
  SiReact,
  SiAmazonwebservices,
  SiPostgresql,
  SiDocker,
  SiTerraform,
  SiLangchain
} from 'react-icons/si';
import { Briefcase } from 'lucide-react';
import { personalData } from '@/content/data/personal';
import ImageModal from '@/components/ui/ImageModal';

export default function Hero() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`min-h-[85vh] flex items-center justify-center bg-white dark:bg-black transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-9 sm:py-12 lg:py-14">
        <div className="max-w-4xl mx-auto text-center">
          {/* Professional headshot */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto mb-6 sm:mb-8 cursor-pointer group"
              aria-label="Click to view larger image"
            >
              <Image
                src="/my-profile-pic.png"
                alt={`${personalData.name} - Professional headshot`}
                fill
                className="rounded-full object-cover shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                priority
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-full flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800 dark:text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                    />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          {/* Name */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black dark:text-white mb-3 sm:mb-4 lg:mb-6 leading-tight">
              {personalData.name}
            </h1>
            <p className="text-[clamp(1.05rem,2.1vw,2rem)] text-gray-600 dark:text-gray-300 font-semibold md:whitespace-nowrap">
              Full Stack Software Engineer building Cloud and GenAI Systems
            </p>
            <p className="mt-2 text-[0.7rem] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
              6+ Years Experience • Backend, Cloud, and GenAI Systems
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-9 sm:mb-11 lg:mb-14">
            <div className="flex flex-wrap justify-center gap-2 mb-12 sm:mb-14">
              {[
                { name: 'Python', Icon: SiPython, color: '#3776AB' },
                { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
                { name: 'React', Icon: SiReact, color: '#61DAFB' },
                { name: 'AWS', Icon: SiAmazonwebservices, color: '#FF9900' },
                { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
                { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
                { name: 'Terraform', Icon: SiTerraform, color: '#7B42BC' },
                { name: 'LangChain', Icon: SiLangchain, color: '#2B7A78' }
              ].map(({ name, Icon, color }) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-2 px-3 py-1 text-xs sm:text-sm rounded-full border border-gray-300/65 dark:border-gray-700/55 text-gray-700/90 dark:text-gray-300/90 bg-gray-100/50 dark:bg-gray-900/30 transition-all duration-150 hover:scale-[1.05] hover:shadow-[0_0_10px_rgba(255,255,255,0.12)] dark:hover:shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                >
                  <Icon className="h-4 w-4" style={{ color }} aria-hidden="true" />
                  <span>{name}</span>
                </span>
              ))}
            </div>
            <ul className="text-[clamp(0.95rem,1.55vw,1.5rem)] text-gray-700 dark:text-gray-300 max-w-[700px] mx-auto leading-snug px-4 sm:px-6 space-y-1.5 sm:space-y-2.5 list-disc list-inside">
              <li className="md:whitespace-nowrap">I build full stack applications and scalable backend APIs.</li>
              <li className="md:whitespace-nowrap">I design cloud native systems and high throughput distributed services on AWS.</li>
              <li className="md:whitespace-nowrap">I integrate GenAI into real workflows using RAG, LLMOps, and multi agent systems.</li>
            </ul>
          </div>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center mb-8 sm:mb-10 lg:mb-12">
            {personalData.resumeUrl && (
              <a
                href={personalData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-black hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-600 text-white dark:text-black px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-150 shadow-lg hover:shadow-xl hover:shadow-[0_8px_24px_rgba(59,130,246,0.25)] transform hover:scale-[1.03] text-center min-h-[48px] flex items-center justify-center"
              >
                Download Resume
              </a>
            )}
            <a
              href="#projects"
              className="w-full sm:w-auto border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-150 transform hover:scale-[1.03] text-center min-h-[48px] flex items-center justify-center"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 px-4 sm:px-6 py-3 sm:py-4 font-semibold transition-all duration-150 underline transform hover:scale-[1.03] text-center min-h-[48px] flex items-center justify-center"
            >
              Get In Touch
            </a>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
            {personalData.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={`Visit ${link.platform} profile`}
              >
                <span className="sr-only">{link.platform}</span>
                {/* Simple text representation for now - can be replaced with icons later */}
                <span className="text-sm sm:text-base font-medium">{link.platform}</span>
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium inline-flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
            Open to Full Stack &amp; GenAI Engineering Roles
          </p>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        src="/my-profile-pic.png"
        alt={personalData.name}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />
    </section>
  );
}
