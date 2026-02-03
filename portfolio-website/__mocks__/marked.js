// Mock implementation of the marked library for Jest tests
const marked = jest.fn((content) => {
  // For testing purposes, return the content as-is without HTML wrapping
  // This allows tests to verify content integrity without dealing with HTML parsing
  if (!content || content.trim() === '') {
    return '';
  }
  
  // Return content as-is for testing - no HTML transformation
  return content.trim();
});

// Mock the parse method as well
marked.parse = marked;

// Mock other methods that might be used
marked.setOptions = jest.fn();
marked.use = jest.fn();

module.exports = { marked };