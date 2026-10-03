import { AnimatedReveal } from './animated-reveal';

interface Props { config: { rsvpTitle: string; rsvpDescription: string; rsvpUrl: string; rsvpButtonLabel: string; } }

export function RsvpSection({ config }: Props) {
  if (!config.rsvpUrl) return null;

  return (
    <AnimatedReveal>
      <section className="inv-section-decorated">
        <p className="inv-eyebrow">RSVP</p>
        <h2 className="inv-section-title mb-6">{config.rsvpTitle}</h2>
        <div className="max-w-md mx-auto inv-card" style={{ padding: '1.75rem 2rem' }}>
          {config.rsvpDescription && (
            <p className="inv-rsvp-desc">{config.rsvpDescription}</p>
          )}
          <a
            href={config.rsvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inv-btn inv-btn-primary"
            style={{ width: '100%' }}
          >
            {config.rsvpButtonLabel}
          </a>
        </div>
      </section>
    </AnimatedReveal>
  );
}
