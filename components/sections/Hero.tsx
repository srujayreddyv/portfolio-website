import {
  SiPython,
  SiFastapi,
  SiAmazonwebservices,
  SiGithub,
  SiLinkedin,
} from 'react-icons/si';
import { Bot } from 'lucide-react';
import { personalData } from '@/content/data/personal';
import HeroImageButton from '@/components/ui/HeroImageButton';

/**
 * Inline SVG of the CA DMV RAG pipeline.
 * Theme-aware via currentColor (inherits from text-ink) and inline
 * style fills/strokes pointing at var(--accent) for the highlighted nodes.
 */
function RagDiagram() {
  return (
    <figure className="w-full">
      <div className="border border-hairline bg-surface/40 rounded-sm p-4 sm:p-6">
        {/* Tiny header strip */}
        <div className="flex items-center justify-between mb-4 font-mono text-[10px] sm:text-[11px] text-muted tracking-wide">
          <span>
            <span className="text-accent">●</span> ca-dmv-rag · live
          </span>
          <span aria-hidden="true">srujayreddyv/dmv-rag</span>
        </div>

        <svg
          viewBox="0 0 320 460"
          className="w-full h-auto text-ink"
          role="img"
          aria-label="CA DMV RAG system architecture: a user query is embedded, retrieved from a FAISS vector index plus knowledge graph, reranked, sent to an LLM, and returned as a cited response"
        >
          <defs>
            <marker
              id="rag-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
            <marker
              id="rag-arrow-accent"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" style={{ fill: 'var(--accent)' }} />
            </marker>
          </defs>

          {/* Node 1: User Query (top) */}
          <g>
            <rect
              x="80"
              y="20"
              width="160"
              height="38"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              x="160"
              y="44"
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, monospace"
              fontSize="12"
              fill="currentColor"
            >
              user query
            </text>
          </g>
          <line
            x1="160"
            y1="58"
            x2="160"
            y2="80"
            stroke="currentColor"
            strokeWidth="1"
            markerEnd="url(#rag-arrow)"
          />

          {/* Node 2: Embedder */}
          <g>
            <rect
              x="80"
              y="80"
              width="160"
              height="38"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              x="160"
              y="104"
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, monospace"
              fontSize="12"
              fill="currentColor"
            >
              embedder
            </text>
          </g>
          <line
            x1="160"
            y1="118"
            x2="160"
            y2="140"
            stroke="currentColor"
            strokeWidth="1"
            markerEnd="url(#rag-arrow)"
          />

          {/* Node 3: FAISS Index — ACCENT */}
          <g>
            <rect
              x="64"
              y="140"
              width="192"
              height="52"
              rx="2"
              fill="none"
              style={{ stroke: 'var(--accent)' }}
              strokeWidth="2"
            />
            <text
              x="160"
              y="161"
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, monospace"
              fontSize="13"
              fontWeight="600"
              style={{ fill: 'var(--accent)' }}
            >
              faiss index
            </text>
            <text
              x="160"
              y="178"
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, monospace"
              fontSize="9.5"
              style={{ fill: 'var(--accent)' }}
            >
              + knowledge-graph subgraph expansion
            </text>
          </g>
          <line
            x1="160"
            y1="192"
            x2="160"
            y2="214"
            strokeWidth="1"
            style={{ stroke: 'var(--accent)' }}
            markerEnd="url(#rag-arrow-accent)"
          />

          {/* Node 4: Reranker — ACCENT */}
          <g>
            <rect
              x="64"
              y="214"
              width="192"
              height="52"
              rx="2"
              fill="none"
              style={{ stroke: 'var(--accent)' }}
              strokeWidth="2"
            />
            <text
              x="160"
              y="235"
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, monospace"
              fontSize="13"
              fontWeight="600"
              style={{ fill: 'var(--accent)' }}
            >
              reranker
            </text>
            <text
              x="160"
              y="252"
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, monospace"
              fontSize="9.5"
              style={{ fill: 'var(--accent)' }}
            >
              hit@1 0.35 → 0.63
            </text>
          </g>
          <line
            x1="160"
            y1="266"
            x2="160"
            y2="288"
            stroke="currentColor"
            strokeWidth="1"
            markerEnd="url(#rag-arrow)"
          />

          {/* Node 5: LLM */}
          <g>
            <rect
              x="80"
              y="288"
              width="160"
              height="38"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              x="160"
              y="312"
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, monospace"
              fontSize="12"
              fill="currentColor"
            >
              claude / bedrock
            </text>
          </g>
          <line
            x1="160"
            y1="326"
            x2="160"
            y2="348"
            stroke="currentColor"
            strokeWidth="1"
            markerEnd="url(#rag-arrow)"
          />

          {/* Node 6: Cited Response */}
          <g>
            <rect
              x="80"
              y="348"
              width="160"
              height="38"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
            <text
              x="160"
              y="372"
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, monospace"
              fontSize="12"
              fill="currentColor"
            >
              cited response
            </text>
          </g>

          {/* Stats annotation */}
          <text
            x="160"
            y="412"
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
            fontSize="10"
            style={{ fill: 'var(--muted)' }}
          >
            200K+ daily reqs · sub-second p99
          </text>
          <text
            x="160"
            y="430"
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
            fontSize="10"
            style={{ fill: 'var(--muted)' }}
          >
            multi-step failures 23% → 7%
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 font-mono text-[10px] sm:text-[11px] text-muted">
        fig 1 · ca dmv rag system — live in production
      </figcaption>
    </figure>
  );
}

export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-[85vh] flex items-center"
    >
      {/* Grid hairline overlay — edges only, very subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, transparent 0, transparent calc(50% - 0.5px), var(--hairline) calc(50% - 0.5px), var(--hairline) calc(50% + 0.5px), transparent calc(50% + 0.5px))',
          backgroundSize: '100% 100%',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start">
          {/* ===== LEFT COLUMN — IDENTITY ===== */}
          <div className="space-y-6 sm:space-y-8">
            {/* Section label */}
            <div className="font-mono text-[11px] sm:text-xs text-muted tracking-wide">
              <span className="text-accent">$ </span>whoami
            </div>

            {/* Identity row: small photo + name + title */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="flex-shrink-0 pt-1">
                <HeroImageButton
                  name={personalData.name}
                  src="/my-profile-pic.webp"
                  compact
                />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-ink leading-[1.05] tracking-[-0.02em] mb-3 sm:mb-4">
                  {personalData.name}
                </h1>
                <p className="text-[clamp(1.05rem,2.1vw,2rem)] text-ink/85 font-semibold leading-snug">
                  {/* Split the title so the role is in ink and the specialty
                      is highlighted in accent — preserves full title string
                      via the existing Hero.test.tsx getByText assertion. */}
                  {personalData.title}
                </p>
                <p className="mt-2 font-mono text-[10px] sm:text-xs text-muted">
                  {personalData.heroLead}
                </p>
              </div>
            </div>

            {/* Body description — mono prompt vibe with a blinking caret on the last line */}
            <div className="space-y-3 sm:space-y-4 font-mono text-[13px] sm:text-sm text-ink/80 leading-relaxed max-w-[58ch]">
              {(personalData.heroDescription ?? [])
                .filter((paragraph) => paragraph !== personalData.heroLead)
                .map((paragraph, idx, arr) => (
                  <p key={paragraph} className="flex">
                    <span aria-hidden="true" className="text-accent flex-shrink-0 select-none mr-2">
                      &gt;
                    </span>
                    <span>
                      {paragraph}
                      {idx === arr.length - 1 && (
                        <span aria-hidden="true" className="blink-caret ml-1 align-middle" />
                      )}
                    </span>
                  </p>
                ))}
            </div>

            {/* Tech chips — middle-dot separated mono terms */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs sm:text-sm">
              {[
                { name: 'Python', Icon: SiPython, color: '#3776AB' },
                { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
                { name: 'TypeScript', Icon: Bot, color: '#3178C6' },
                { name: 'AWS', Icon: SiAmazonwebservices, color: '#FF9900' },
                { name: 'RAG', Icon: Bot, color: '#2563EB' },
                { name: 'Multi-Agent Systems', Icon: Bot, color: '#2563EB' },
              ].map(({ name }, i, arr) => (
                <span key={name} className="inline-flex items-center text-ink/85">
                  <span>{name}</span>
                  {i < arr.length - 1 && (
                    <span aria-hidden="true" className="text-hairline ml-3 select-none">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* Command-style CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-x-5 sm:gap-y-3 pt-2">
              <a
                href="#projects"
                aria-label="Explore Projects"
                className="group inline-flex items-center font-mono text-sm font-medium border border-ink bg-ink text-canvas hover:bg-accent hover:border-accent hover:text-canvas transition-colors duration-150 px-4 sm:px-5 py-2.5 sm:py-3 rounded-sm min-h-[44px]"
              >
                <span aria-hidden="true" className="text-accent group-hover:text-canvas mr-1 transition-colors">$</span>
                <span aria-hidden="true">explore-projects</span>
              </a>
              {personalData.resumeUrl && (
                <a
                  href={personalData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Resume"
                  className="group inline-flex items-center font-mono text-sm font-medium text-ink border border-hairline hover:border-accent hover:text-accent transition-colors duration-150 px-4 sm:px-5 py-2.5 sm:py-3 rounded-sm min-h-[44px]"
                >
                  <span aria-hidden="true" className="text-accent mr-1">$</span>
                  <span aria-hidden="true">download-resume</span>
                </a>
              )}
              <a
                href="#contact"
                className="group inline-flex items-center font-mono text-sm font-medium text-muted hover:text-accent transition-colors duration-150 px-3 py-2.5 sm:py-3 min-h-[44px] underline-offset-4 hover:underline"
              >
                <span className="text-accent mr-1">$</span>
                <span>Let&apos;s Connect</span>
              </a>
            </div>

            {/* Social links + availability — terminal footer for the hero */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 pt-2 text-xs sm:text-sm font-mono">
              <div className="flex items-center gap-3 text-ink/80">
                {personalData.socialLinks.map((link, index) => (
                  <div key={link.platform} className="flex items-center gap-3">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-accent transition-colors duration-150"
                      aria-label={`Visit ${link.platform} profile`}
                    >
                      {link.platform === 'GitHub' ? (
                        <SiGithub className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <SiLinkedin className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      <span className="lowercase">{link.platform}</span>
                    </a>
                    {index < personalData.socialLinks.length - 1 && (
                      <span className="text-hairline select-none" aria-hidden="true">
                        ·
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <span className="hidden sm:inline text-hairline select-none" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-2 text-muted">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <span>{(personalData.availabilityNote ?? '').replace(/\.$/, '').toLowerCase()}</span>
              </span>
            </div>
          </div>

          {/* ===== RIGHT COLUMN — RAG PIPELINE DIAGRAM ===== */}
          <div className="lg:pt-12">
            <RagDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
