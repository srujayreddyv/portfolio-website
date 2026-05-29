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
      'about': 'site-header-surface-primary',
      'experience': 'site-header-surface-secondary',
      'projects': 'site-header-surface-primary',
      'skills': 'site-header-surface-secondary',
      'education': 'site-header-surface-primary',
      'contact': 'site-header-surface-secondary'
    };
    return sectionBackgrounds[section] || 'site-header-surface-primary';
  };

  // Get header background based on previous section
  const getHeaderBackground = () => {
    if (previousSection) {
      return getSectionBackground(previousSection);
    }
    return 'site-header-surface-primary'; // Default
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

  // Track active section based on actual section visibility
  useEffect(() => {
    const sections = ['about', ...navigationItems.map(item => item.section)];
    const visibleSections = new Map<string, number>();

    const updateActiveSection = () => {
      if (window.scrollY < 100) {
        setPreviousSection('');
        setActiveSection('about');
        return;
      }

      const visibleSection = [...visibleSections.entries()]
        .sort((a, b) => b[1] - a[1])[0]?.[0];

      if (!visibleSection) return;

      const visibleIndex = sections.indexOf(visibleSection);
      setActiveSection(visibleSection);
      setPreviousSection(visibleIndex > 0 ? sections[visibleIndex - 1] : '');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        });
        updateActiveSection();
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    updateActiveSection();

    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-header fixed top-0 left-0 right-0 z-50 ${getHeaderBackground()} backdrop-blur-sm`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
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
                    item.section === 'contact'
                      ? 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
                      : activeSection === item.section
                        ? 'site-header-link-active'
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
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
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
        <div
          id="mobile-navigation"
          className={`md:hidden transition-all duration-200 ease-in-out ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <div className="site-header-panel px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-colors min-h-[48px] flex items-center ${
                  item.section === 'contact'
                    ? 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
                    : activeSection === item.section
                      ? 'site-header-link-active'
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
