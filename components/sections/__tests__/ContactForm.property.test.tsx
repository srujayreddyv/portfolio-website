/**
 * Deterministic contact form validation and submit coverage
 */

import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

describe('Contact Form Property Tests', () => {
  beforeEach(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
    jest.restoreAllMocks();
  });

  test('renders required fields and submit action', () => {
    render(<ContactForm onSubmit={jest.fn()} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  test('valid contact form submission calls onSubmit and shows success state', async () => {
    const onSubmit = jest.fn(async () => {});
    const user = userEvent.setup();

    render(<ContactForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Role discussion');
    await user.type(screen.getByLabelText(/message/i), 'This is a valid message body for testing.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
    });
  });

  test('invalid submission is rejected and does not call submit handler', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn(async () => {});
    render(<ContactForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.type(screen.getByLabelText(/subject/i), 'Role discussion');
    await user.type(screen.getByLabelText(/message/i), 'This is a valid message body for testing.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  test('submission error from API path is shown to user', async () => {
    const user = userEvent.setup();
    const originalFetch = (globalThis as any).fetch;
    (globalThis as any).fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Failed to send message' })
    });

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Need to connect');
    await user.type(screen.getByLabelText(/message/i), 'This is a detailed valid message.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
    });

    (globalThis as any).fetch = originalFetch;
  });
});
