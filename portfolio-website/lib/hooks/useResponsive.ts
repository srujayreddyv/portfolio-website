'use client';

import { useState, useEffect } from 'react';

interface BreakpointState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  currentBreakpoint: 'mobile' | 'tablet' | 'desktop' | 'large-desktop';
}

const breakpoints = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1280
};

export const useResponsive = (): BreakpointState => {
  const [breakpointState, setBreakpointState] = useState<BreakpointState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    currentBreakpoint: 'mobile'
  });

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      const isMobile = width < breakpoints.mobile;
      const isTablet = width >= breakpoints.mobile && width < breakpoints.desktop;
      const isDesktop = width >= breakpoints.desktop && width < breakpoints.largeDesktop;
      const isLargeDesktop = width >= breakpoints.largeDesktop;

      let currentBreakpoint: BreakpointState['currentBreakpoint'] = 'mobile';
      if (isLargeDesktop) currentBreakpoint = 'large-desktop';
      else if (isDesktop) currentBreakpoint = 'desktop';
      else if (isTablet) currentBreakpoint = 'tablet';

      setBreakpointState({
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop,
        currentBreakpoint
      });
    };

    // Set initial state
    updateBreakpoint();

    // Add event listener
    window.addEventListener('resize', updateBreakpoint);

    // Cleanup
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpointState;
};

export default useResponsive;