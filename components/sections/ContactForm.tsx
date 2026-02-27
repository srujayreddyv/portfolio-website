'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ContactFormData } from '@/types';

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>();

  const handleFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Use custom API route
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
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred while sending your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(handleFormSubmit)} 
      className="space-y-4 sm:space-y-6"
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
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters long'
            },
            validate: {
              notOnlyWhitespace: (value) => 
                value.trim().length >= 2 || 'Name must contain at least 2 non-whitespace characters'
            }
          })}
          className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-colors min-h-[44px] text-sm sm:text-base dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
            errors.name ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }
          })}
          className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-colors min-h-[44px] text-sm sm:text-base dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
            errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          {...register('subject', {
            required: 'Subject is required',
            minLength: {
              value: 5,
              message: 'Subject must be at least 5 characters long'
            },
            validate: {
              notOnlyWhitespace: (value) => 
                value.trim().length >= 5 || 'Subject must contain at least 5 non-whitespace characters'
            }
          })}
          className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-colors min-h-[44px] text-sm sm:text-base dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
            errors.subject ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Project, role, or collaboration topic"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message must be at least 10 characters long'
            },
            validate: {
              notOnlyWhitespace: (value) => 
                value.trim().length >= 10 || 'Message must contain at least 10 non-whitespace characters'
            }
          })}
          className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white resize-vertical transition-colors text-sm sm:text-base dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
            errors.message ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Briefly describe your project, opportunity, or technical discussion."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-4 py-3 sm:py-4 text-white dark:text-black font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 transition-all duration-200 min-h-[48px] text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-700 hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-500'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <p className="text-sm sm:text-base text-green-800 dark:text-green-300">
            Thank you for your message! I&apos;ll get back to you as soon as possible.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-sm sm:text-base text-red-800 dark:text-red-300">
            {errorMessage || 'There was an error sending your message. Please try again.'}
          </p>
        </div>
      )}
    </form>
  );
}
