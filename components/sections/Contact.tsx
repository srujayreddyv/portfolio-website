import ContactForm from './ContactForm';
import { personalData } from '@/content/data/personal';
import CopyEmailButton from '@/components/ui/CopyEmailButton';
import { SiGithub, SiLinkedin } from 'react-icons/si';

/**
 * Contact — Direction 2 terminal vocabulary.
 *
 * Preserves heading "Get In Touch" (case-insensitive regex match in tests).
 * Restyles contact info as a hairline-bordered card with mono labels and the
 * form alongside it. ContactForm itself is restyled separately.
 */
export default function Contact() {
  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 bg-canvas border-t border-hairline"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-10 sm:mb-14 lg:mb-16">
            <div className="font-mono text-[11px] sm:text-xs text-muted tracking-wide mb-3">
              <span className="text-accent">$ </span>cat contact.log
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink tracking-[-0.02em]">
              Get In Touch
            </h2>
            <div className="mt-3 h-px w-12 bg-accent" />
            <p className="mt-5 sm:mt-6 max-w-2xl text-sm sm:text-base text-ink/80 leading-relaxed font-mono">
              Reach out for AI software engineering, backend platform roles, consulting conversations, or technical discussions around production LLM and RAG systems.
            </p>
          </div>

          <div className="grid lg:grid-cols-[0.8fr_1fr] gap-8 lg:gap-12">
            {/* Contact Information Column */}
            <div className="space-y-8">
              {/* Identity block */}
              <div className="border border-hairline bg-surface/60 p-5 sm:p-6">
                <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-muted mb-3">
                  ─── contact
                </div>
                <div className="space-y-3 sm:space-y-4 font-mono text-sm">
                  <div>
                    <div className="text-muted text-[11px] mb-0.5">email:</div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <a
                        href={`mailto:${personalData.email}`}
                        className="text-ink hover:text-accent transition-colors break-all"
                      >
                        {personalData.email}
                      </a>
                      <CopyEmailButton email={personalData.email} />
                    </div>
                  </div>
                  {personalData.location && (
                    <div>
                      <div className="text-muted text-[11px] mb-0.5">location:</div>
                      <div className="text-ink">{personalData.location.toLowerCase()}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-muted text-[11px] mb-0.5">response_time:</div>
                    <div className="text-ink">~24-48h</div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-muted mb-3">
                  ─── connect
                </div>
                <div className="flex flex-col gap-2">
                  {personalData.socialLinks.map((link) => {
                    const Icon = link.platform === 'GitHub' ? SiGithub : SiLinkedin;
                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit my ${link.platform} profile`}
                        className="inline-flex items-center gap-2 font-mono text-sm text-ink hover:text-accent transition-colors group min-h-[40px]"
                      >
                        <span aria-hidden="true" className="text-accent transition-colors">→</span>
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{link.platform.toLowerCase()}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="border border-hairline bg-surface/60 p-5 sm:p-6 lg:p-8">
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-muted mb-4">
                ─── send-message
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
