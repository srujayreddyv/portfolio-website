import { Mail, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';
import ContactForm from './ContactForm';
import { personalData } from '@/content/data/personal';

export default function Contact() {
  const getIconForPlatform = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 sm:mb-6">
              Get In Touch
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-black dark:bg-white mx-auto mb-4 sm:mb-6"></div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Open to engineering roles, system design discussions, and AI driven platform work. If you&apos;re building serious systems or hiring for impactful teams, let&apos;s talk.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black dark:text-white mb-4 sm:mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  {/* Email */}
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
                      <a 
                        href={`mailto:${personalData.email}`}
                        className="text-sm sm:text-base lg:text-lg text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all"
                      >
                        {personalData.email}
                      </a>
                    </div>
                  </div>

                  {/* Location (if available) */}
                  {personalData.location && (
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Location</p>
                        <p className="text-sm sm:text-base lg:text-lg text-black dark:text-white">{personalData.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black dark:text-white mb-3 sm:mb-4">
                  Connect With Me
                </h3>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {personalData.socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 hover:border-blue-600 transition-colors group min-h-[44px]"
                      aria-label={`Visit my ${link.platform} profile`}
                    >
                      <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {getIconForPlatform(link.platform)}
                      </span>
                      <span className="text-sm sm:text-base text-gray-700 dark:text-gray-200 group-hover:text-gray-800 dark:group-hover:text-white transition-colors">
                        {link.platform}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Additional Contact Methods */}
              <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 sm:p-6 rounded-lg border border-gray-300 dark:border-gray-600">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-2 sm:mb-3">
                  Response Time
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  I typically respond within 24–48 hours. For urgent matters, include URGENT in the subject line.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-sm border border-gray-300 dark:border-gray-600">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">
                Send Me a Message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
