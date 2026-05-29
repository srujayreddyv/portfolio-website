'use client';

import { useState, useEffect } from 'react';
import StatusBar from '@/components/layout/StatusBar';
import { personalData } from '@/content/data/personal';

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

/**
 * Brand mark — terminal-vocabulary brand label.
 * Renders as `srujay-reddy-v.` in JetBrains Mono. Accessible name stays the
 * full personalData.name so existing Header tests (which getByRole({ name: ... }))
 * keep matching.
 */
function brandDisplay(): string {
  const parts = personalData.name.toLowerCase().split(' ');
  if (parts.length >= 2) {
    const initial = parts[parts.length - 1].charAt(0);
    return `${parts.slice(0, -1).join('-')}-${initial}.`;
  }
  return personalData.name.toLowerCase();
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle smooth scroll navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href === '#' || href === '') {
      const aboutElement = document.getElementById('about');
      if (aboutElement) {
        aboutElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    setIsMenuOpen(false);
  };

  // Track active section via IntersectionObserver (accurate + performant —
  // ported from the main-branch scroll-spy improvement).
  useEffect(() => {
    const sections = ['about', ...navigationItems.map((item) => item.section)];
    const visibleSections = new Map<string, number>();

    const updateActiveSection = () => {
      if (window.scrollY < 100) {
        setActiveSection('about');
        return;
      }
      const visibleSection = [...visibleSections.entries()].sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0];
      if (!visibleSection) return;
      setActiveSection(visibleSection);
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

  const brand = brandDisplay();

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50 site-header-surface-primary backdrop-blur-sm">
      {/* Direction 2 — thin status bar above the main nav */}
      <StatusBar />

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
          {/* Brand */}
          <div className="flex-shrink-0">
            <a
              href="#"
              onClick={(e) => handleNavClick(e, '#')}
              aria-label={personalData.name}
              className={`font-mono text-sm sm:text-base lg:text-lg tracking-[0.02em] transition-colors ${
                activeSection === 'about' ? 'text-accent' : 'text-ink hover:text-accent'
              }`}
            >
              {brand}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.section;
              const isContact = item.section === 'contact';
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-label={item.name}
                  aria-current={isActive ? 'page' : undefined}
                  className={`
                    inline-flex items-center gap-0.5
                    font-mono text-xs lg:text-sm tracking-[0.02em]
                    px-2 lg:px-3 py-2 min-h-[40px]
                    transition-colors duration-150
                    border-b-2 border-transparent
                    ${
                      isActive
                        ? 'text-accent border-accent'
                        : isContact
                          ? 'text-accent hover:border-accent'
                          : 'text-ink/80 hover:text-accent hover:border-accent/40'
                    }
                  `.trim()}
                >
                  <span aria-hidden="true" className="text-muted">~/</span>
                  <span>{item.name.toLowerCase()}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-sm text-ink hover:text-accent hover:bg-surface focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent min-h-[44px] min-w-[44px]"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="sr-only">
                {isMenuOpen ? 'Close main menu' : 'Open main menu'}
              </span>
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
            {navigationItems.map((item) => {
              const isActive = activeSection === item.section;
              const isContact = item.section === 'contact';
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-label={item.name}
                  aria-current={isActive ? 'page' : undefined}
                  className={`
                    block px-3 py-3 rounded-sm min-h-[48px] flex items-center
                    font-mono text-sm tracking-[0.02em]
                    transition-colors duration-150
                    ${
                      isActive
                        ? 'text-accent bg-surface'
                        : isContact
                          ? 'text-accent hover:bg-surface'
                          : 'text-ink/80 hover:text-accent hover:bg-surface'
                    }
                  `.trim()}
                >
                  <span aria-hidden="true" className="text-muted mr-0.5">~/</span>
                  <span>{item.name.toLowerCase()}</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
