/**
 * Unit Tests for Contact Form Error Handling
 * **Validates: Requirements 5.5**
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';
import { ContactFormData } from '@/types';

describe('ContactForm Error Handling', () => {
  beforeEach(() => {
    // Clear any previous DOM state
    document.body.innerHTML = '';
  });

  test('displays error message when form submission fails', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Network connection failed';
    
    const mockOnSubmit = jest.fn(async () => {
      throw new Error(errorMessage);
    });

    render(<ContactForm onSubmit={mockOnSubmit} />);

    // Fill out the form with valid data
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Wait for error message to appear
    await waitFor(() => {
      const errorDisplay = screen.getByText(errorMessage);
      expect(errorDisplay).toBeInTheDocument();
    });

    // Verify error styling is applied
    const errorContainer = screen.getByText(errorMessage).closest('div');
    expect(errorContainer).toHaveClass('bg-red-50', 'border-red-200');
  });

  test('displays generic error message when no specific error is provided', async () => {
    const user = userEvent.setup();
    
    const mockOnSubmit = jest.fn(async () => {
      throw new Error();
    });

    render(<ContactForm onSubmit={mockOnSubmit} />);

    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'Jane Smith');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Another Test');
    await user.type(screen.getByLabelText(/message/i), 'Another test message');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Wait for generic error message
    await waitFor(() => {
      const errorDisplay = screen.getByText(/there was an error sending your message/i);
      expect(errorDisplay).toBeInTheDocument();
    });
  });

  test('preserves form data when submission fails', async () => {
    const user = userEvent.setup();
    const formData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test message content'
    };
    
    const mockOnSubmit = jest.fn(async () => {
      throw new Error('Submission failed');
    });

    render(<ContactForm onSubmit={mockOnSubmit} />);

    // Fill out the form
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    await user.type(nameInput, formData.name);
    await user.type(emailInput, formData.email);
    await user.type(subjectInput, formData.subject);
    await user.type(messageInput, formData.message);

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
    });

    // Verify form data is preserved
    expect(nameInput).toHaveValue(formData.name);
    expect(emailInput).toHaveValue(formData.email);
    expect(subjectInput).toHaveValue(formData.subject);
    expect(messageInput).toHaveValue(formData.message);
  });

  test('re-enables submit button after error', async () => {
    const user = userEvent.setup();
    
    const mockOnSubmit = jest.fn(async () => {
      // Add a small delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 100));
      throw new Error('Server error');
    });

    render(<ContactForm onSubmit={mockOnSubmit} />);

    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'Error Test');
    await user.type(screen.getByLabelText(/email/i), 'error@test.com');
    await user.type(screen.getByLabelText(/subject/i), 'Error Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'Testing error handling');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    // Submit the form
    await user.click(submitButton);

    // Wait for loading state
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent(/sending/i);
    }, { timeout: 200 });

    // Wait for error and button to be re-enabled
    await waitFor(() => {
      expect(screen.getByText(/server error/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent(/send message/i);
    });
  });

  test('clears previous error messages on new submission', async () => {
    const user = userEvent.setup();
    let shouldFail = true;
    
    const mockOnSubmit = jest.fn(async () => {
      if (shouldFail) {
        throw new Error('First error');
      }
      // Success on second attempt
    });

    render(<ContactForm onSubmit={mockOnSubmit} />);

    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'Clear Error Test');
    await user.type(screen.getByLabelText(/email/i), 'clear@test.com');
    await user.type(screen.getByLabelText(/subject/i), 'Clear Error Subject');
    await user.type(screen.getByLabelText(/message/i), 'Testing error clearing');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    // First submission - should fail
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/first error/i)).toBeInTheDocument();
    });

    // Second submission - should succeed
    shouldFail = false;
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
    });

    // Error message should be cleared
    expect(screen.queryByText(/first error/i)).not.toBeInTheDocument();
  });

  test('handles different types of error objects', async () => {
    const user = userEvent.setup();
    
    // Test with string error
    const mockOnSubmitString = jest.fn(async () => {
      throw 'String error message';
    });

    const { rerender } = render(<ContactForm onSubmit={mockOnSubmitString} />);

    await user.type(screen.getByLabelText(/name/i), 'String Error');
    await user.type(screen.getByLabelText(/email/i), 'string@error.com');
    await user.type(screen.getByLabelText(/subject/i), 'String Error Test');
    await user.type(screen.getByLabelText(/message/i), 'Testing string error');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      // Should show generic error message for non-Error objects
      expect(screen.getByText(/an error occurred while sending your message/i)).toBeInTheDocument();
    });

    // Test with Error object
    const mockOnSubmitError = jest.fn(async () => {
      throw new Error('Specific error message');
    });

    rerender(<ContactForm onSubmit={mockOnSubmitError} />);

    await user.clear(screen.getByLabelText(/name/i));
    await user.clear(screen.getByLabelText(/email/i));
    await user.clear(screen.getByLabelText(/subject/i));
    await user.clear(screen.getByLabelText(/message/i));

    await user.type(screen.getByLabelText(/name/i), 'Error Object');
    await user.type(screen.getByLabelText(/email/i), 'error@object.com');
    await user.type(screen.getByLabelText(/subject/i), 'Error Object Test');
    await user.type(screen.getByLabelText(/message/i), 'Testing error object');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/specific error message/i)).toBeInTheDocument();
    });
  });

  test('does not show success message when submission fails', async () => {
    const user = userEvent.setup();
    
    const mockOnSubmit = jest.fn(async () => {
      throw new Error('Submission failed');
    });

    render(<ContactForm onSubmit={mockOnSubmit} />);

    // Fill out and submit form
    await user.type(screen.getByLabelText(/name/i), 'No Success');
    await user.type(screen.getByLabelText(/email/i), 'no@success.com');
    await user.type(screen.getByLabelText(/subject/i), 'No Success Test');
    await user.type(screen.getByLabelText(/message/i), 'Testing no success message');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Wait for error
    await waitFor(() => {
      expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
    });

    // Verify no success message
    expect(screen.queryByText(/thank you for your message/i)).not.toBeInTheDocument();
  });
});