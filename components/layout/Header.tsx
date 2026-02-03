'use client';

import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface NavigationItem {
  name: string;
  href: string;
  section: string;
}

const navigationItems: NavigationItem[] = [
  { name: 'About', href: '#about', section: 'about' },
  { name: 'Experience', href: '#experience', section: 'experience' },
  { name: 'Projects', href: '#projects', section: 'projects' },
  { name: 'Skills', href: '#skills', section: 'skills' },
  { name: 'Education', href: '#education', section: 'education' },
  { name: 'Contact', href: '#contact', section: 'contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [previousSection, setPreviousSection] = useState('');

  // Get background class based on section
  const getSectionBackground = (section: string) => {
    const sectionBackgrounds: { [key: string]: string } = {
      'about': 'bg-white/90 dark:bg-black/90',
      'experience': 'bg-gray-50/90 dark:bg-gray-950/90',
      'projects': 'bg-white/90 dark:bg-black/90',
      'skills': 'bg-gray-50/90 dark:bg-gray-950/90',
      'education': 'bg-white/90 dark:bg-black/90',
      'contact': 'bg-gray-50/90 dark:bg-gray-950/90'
    };
    return sectionBackgrounds[section] || 'bg-white/90 dark:bg-black/90';
  };

  // Get header background based on previous section
  const getHeaderBackground = () => {
    if (previousSection) {
      return getSectionBackground(previousSection);
    }
    return 'bg-white/90 dark:bg-black/90'; // Default
  };

  // Handle smooth scroll navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Handle portfolio link (scroll to about section)
    if (href === '#' || href === '') {
      const aboutElement = document.getElementById('about');
      if (aboutElement) {
        aboutElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        // Fallback: scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // Handle other navigation links
      const targetId = href.substring(1); // Remove the '#'
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
    
    // Close mobile menu after navigation
    setIsMenuOpen(false);
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', ...navigationItems.map(item => item.section)];
      const scrollPosition = window.scrollY + 100; // Offset for header height

      // Check if we're at the very top (about section)
      if (window.scrollY < 100) {
        setPreviousSection('');
        setActiveSection('about');
        return;
      }

      let currentSection = '';
      let prevSection = '';

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = section;
            // Set previous section (the one above current)
            if (i > 0) {
              prevSection = sections[i - 1];
            }
            break;
          }
        }
      }

      if (currentSection) {
        setActiveSection(currentSection);
        setPreviousSection(prevSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${getHeaderBackground()} backdrop-blur-sm border-b border-gray-200 dark:border-gray-700`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <a 
              href="#" 
              className={`text-lg sm:text-xl lg:text-2xl font-bold transition-colors ${
                activeSection === 'about'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={(e) => handleNavClick(e, '#')}
            >
              Srujay Reddy Vangoor
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-2 lg:space-x-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 lg:px-4 py-2 rounded-md text-sm lg:text-base font-medium transition-colors min-h-[40px] flex items-center ${
                    activeSection === item.section
                      ? 'text-white dark:text-black bg-gray-800 dark:bg-gray-200'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 min-h-[44px] min-w-[44px]"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-200 ease-in-out ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-colors min-h-[48px] flex items-center ${
                  activeSection === item.section
                    ? 'text-white dark:text-black bg-gray-800 dark:bg-gray-200'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}