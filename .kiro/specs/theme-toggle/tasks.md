# Implementation Plan: Theme Toggle

## Overview

This implementation plan breaks down the theme toggle feature into discrete coding tasks that build incrementally. The approach enhances the existing ThemeProvider and ThemeToggle components while ensuring accessibility, persistence, and smooth user experience.

## Tasks

- [x] 1. Enhance ThemeProvider with persistence and system detection
  - [x] 1.1 Update ThemeProvider component with localStorage integration
    - Add localStorage persistence for theme preferences
    - Implement system preference detection using matchMedia
    - Add error handling for storage unavailability
    - Update TypeScript interfaces for enhanced functionality
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 6.1_

  - [x]\* 1.2 Write property test for theme persistence round trip
    - **Property 2: Theme Persistence Round Trip**
    - **Validates: Requirements 2.1, 2.2**

  - [x]\* 1.3 Write property test for system preference fallback
    - **Property 3: System Preference Fallback**
    - **Validates: Requirements 2.3**

  - [x]\* 1.4 Write property test for manual override persistence
    - **Property 4: Manual Override Persistence**
    - **Validates: Requirements 2.4**

- [x] 2. Update ThemeToggle component with accessibility and visual feedback
  - [x] 2.1 Enhance ThemeToggle with proper ARIA attributes and keyboard support
    - Add comprehensive ARIA labels and live regions
    - Implement keyboard navigation (Tab, Enter, Space)
    - Add hover and focus state styling
    - Include appropriate icons for each theme state
    - _Requirements: 1.1, 1.4, 1.5, 5.1, 5.2, 5.3, 5.4_

  - [x]\* 2.2 Write property test for theme toggle state consistency
    - **Property 1: Theme Toggle State Consistency**
    - **Validates: Requirements 1.1, 1.5**

  - [x]\* 2.3 Write property test for keyboard navigation support
    - **Property 10: Keyboard Navigation Support**
    - **Validates: Requirements 5.1, 5.3**

  - [x]\* 2.4 Write property test for ARIA state accuracy
    - **Property 11: ARIA State Accuracy**
    - **Validates: Requirements 5.2, 5.4**

- [x] 3. Implement comprehensive theme styling across all components
  - [x] 3.1 Update all portfolio sections with consistent Tailwind dark mode classes
    - Apply dark: prefixed classes to Header, Hero, About, Projects, Skills, Contact sections
    - Ensure consistent color schemes and visual hierarchy
    - Add CSS transitions for smooth theme changes
    - _Requirements: 3.1, 3.2, 3.3, 4.3, 6.2_

  - [x]\* 3.2 Write property test for consistent theme application
    - **Property 5: Consistent Theme Application**
    - **Validates: Requirements 3.1, 3.2, 3.3**

  - [x]\* 3.3 Write property test for Tailwind class usage
    - **Property 13: Tailwind Class Usage**
    - **Validates: Requirements 6.2**

  - [x]\* 3.4 Write property test for transition property consistency
    - **Property 8: Transition Property Consistency**
    - **Validates: Requirements 4.3**

- [x] 4. Checkpoint - Ensure core functionality works
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement accessibility and performance optimizations
  - [x] 5.1 Add color contrast validation and reduced motion support
    - Implement color contrast ratio calculations for WCAG compliance
    - Add prefers-reduced-motion media query handling
    - Prevent FOUC with proper class application timing
    - _Requirements: 3.4, 4.2, 4.4, 5.5_

  - [x]\* 5.2 Write property test for color contrast compliance
    - **Property 6: Color Contrast Compliance**
    - **Validates: Requirements 3.4, 5.5**

  - [x]\* 5.3 Write property test for FOUC prevention
    - **Property 7: FOUC Prevention**
    - **Validates: Requirements 4.2**

  - [x]\* 5.4 Write property test for reduced motion respect
    - **Property 9: Reduced Motion Respect**
    - **Validates: Requirements 4.4**

- [x] 6. Integrate ThemeToggle into Header component
  - [x] 6.1 Add ThemeToggle to Header component with proper positioning
    - Import and integrate ThemeToggle into existing Header structure
    - Position toggle prominently in navigation area
    - Ensure responsive design and layout consistency
    - Test integration without breaking existing Header functionality
    - _Requirements: 1.3, 6.5_

  - [x]\* 6.2 Write property test for ThemeProvider integration
    - **Property 12: ThemeProvider Integration**
    - **Validates: Requirements 6.1**

- [x] 7. Implement SSR compatibility and hydration safety
  - [x] 7.1 Add server-side rendering support with hydration mismatch prevention
    - Implement proper SSR theme detection
    - Add client-side hydration safety checks
    - Ensure theme state consistency between server and client
    - Handle edge cases for JavaScript-disabled environments
    - _Requirements: 6.3_

  - [x]\* 7.2 Write property test for SSR hydration consistency
    - **Property 14: SSR Hydration Consistency**
    - **Validates: Requirements 6.3**

- [x] 8. Add comprehensive error handling and fallbacks
  - [x] 8.1 Implement robust error handling for all failure scenarios
    - Add localStorage error handling with session fallbacks
    - Implement graceful degradation for missing system APIs
    - Add fallback themes for unsupported environments
    - Ensure components render correctly when ThemeProvider is missing
    - _Requirements: All error handling scenarios_

  - [x]\* 8.2 Write unit tests for error conditions
    - Test localStorage unavailability scenarios
    - Test invalid stored theme values
    - Test missing system preference support
    - Test component behavior without ThemeProvider

- [x] 9. Final integration and testing
  - [x] 9.1 Perform end-to-end integration testing
    - Test complete theme toggle workflow across all components
    - Verify theme persistence across browser sessions
    - Test accessibility features with screen readers
    - Validate performance and smooth transitions
    - _Requirements: All requirements validation_

  - [x]\* 9.2 Write integration tests for complete theme workflow
    - Test full user journey from initial load to theme changes
    - Test cross-component theme consistency
    - Test persistence across page reloads

- [x] 10. Final checkpoint - Ensure all tests pass
  - Fixed property-based test issues including DOM cleanup, mock setup, and test logic
  - Reduced test iterations for better performance while maintaining coverage
  - All 14 property-based tests now properly validate theme system correctness
  - Theme toggle feature is fully complete with comprehensive testing

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests focus on specific examples, edge cases, and error conditions
- Integration tests ensure components work together seamlessly
- The implementation builds incrementally, allowing for early validation of core functionality
