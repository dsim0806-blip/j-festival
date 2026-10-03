import { AnimatedReveal } from './animated-reveal';

interface Props { config: { messageTitle: string; messageBody: string; messageAlign: 'center' | 'left'; } }

export function MessageSection({ config }: Props) {
  if (!config.messageBody) return null;

  return (
    <AnimatedReveal>
      <section className="inv-section-decorated">
        <p className="inv-eyebrow">GREETING</p>
        <h2 className="inv-section-title mb-2">{config.messageTitle}</h2>
        <div className="inv-headline-divider" aria-hidden="true">
          <span className="inv-headline-divider-mark">&#10022;</span>
        </div>
        <p className="inv-message-body" style={{ textAlign: config.messageAlign || 'center' }}>
          {config.messageBody}
        </p>
        <div className="inv-headline-divider" aria-hidden="true">
          <span className="inv-headline-divider-mark">&#10022;</span>
        </div>
      </section>
    </AnimatedReveal>
  );
}
