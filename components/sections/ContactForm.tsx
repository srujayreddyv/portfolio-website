'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ContactFormData } from '@/types';

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

/**
 * ContactForm — Direction 2 terminal vocabulary.
 *
 * Monospace inputs with hairline borders, accent focus ring (via globals.css
 * focus-visible style on *), labels rendered in mono small-caps. Honeypot
 * field and form validation behavior preserved unchanged.
 *
 * Submit button: `$ send-message` command-style CTA.
 */
export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const handleFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to send message');
        }
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'An error occurred while sending your message.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Shared input className — terminal-feel monospace fields with hairline borders.
  const inputBase =
    'w-full px-3 py-2.5 sm:py-3 bg-canvas font-mono text-sm text-ink placeholder:text-muted/60 border border-hairline focus:outline-none focus:border-accent transition-colors duration-150 min-h-[44px]';

  const inputError = ' border-destructive';

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4 sm:space-y-5"
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
    >
      {/* Hidden field for Netlify */}
      <input type="hidden" name="form-name" value="contact" />

      {/* Honeypot field for spam protection */}
      <div style={{ display: 'none' }}>
        <label>
          Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
        </label>
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-muted mb-1.5"
        >
          name <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters long' },
            validate: {
              notOnlyWhitespace: (value) =>
                value.trim().length >= 2 ||
                'Name must contain at least 2 non-whitespace characters',
            },
          })}
          className={`${inputBase}${errors.name ? inputError : ''}`}
          placeholder="your full name"
        />
        {errors.name && (
          <p className="mt-1 font-mono text-xs text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-muted mb-1.5"
        >
          email <span className="text-accent">*</span>
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address',
            },
          })}
          className={`${inputBase}${errors.email ? inputError : ''}`}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="mt-1 font-mono text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-muted mb-1.5"
        >
          subject <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          id="subject"
          {...register('subject', {
            required: 'Subject is required',
            minLength: { value: 5, message: 'Subject must be at least 5 characters long' },
            validate: {
              notOnlyWhitespace: (value) =>
                value.trim().length >= 5 ||
                'Subject must contain at least 5 non-whitespace characters',
            },
          })}
          className={`${inputBase}${errors.subject ? inputError : ''}`}
          placeholder="project, role, or collaboration topic"
        />
        {errors.subject && (
          <p className="mt-1 font-mono text-xs text-destructive">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-muted mb-1.5"
        >
          message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 10, message: 'Message must be at least 10 characters long' },
            validate: {
              notOnlyWhitespace: (value) =>
                value.trim().length >= 10 ||
                'Message must contain at least 10 non-whitespace characters',
            },
          })}
          className={`${inputBase} resize-vertical${errors.message ? inputError : ''}`}
          placeholder="briefly describe your project, opportunity, or technical discussion"
        />
        {errors.message && (
          <p className="mt-1 font-mono text-xs text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button — command-style CTA */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`group inline-flex items-center justify-center w-full sm:w-auto font-mono text-sm font-medium border border-ink bg-ink text-canvas hover:bg-accent hover:border-accent hover:text-canvas transition-colors duration-150 px-5 py-3 min-h-[48px] ${
            isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          <span aria-hidden="true" className="text-accent group-hover:text-canvas mr-1.5 transition-colors">
            $
          </span>
          <span>{isSubmitting ? 'sending...' : 'Send Message'}</span>
        </button>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-3 border border-accent bg-accent/10 font-mono text-sm text-ink">
          <span className="text-accent">●</span> Thank you for your message — I&apos;ll get back to you as soon as possible.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-3 border border-destructive bg-destructive/10 font-mono text-sm text-ink">
          <span style={{ color: 'var(--destructive)' }}>●</span>{' '}
          {errorMessage || 'There was an error sending your message. Please try again.'}
        </div>
      )}
    </form>
  );
}
