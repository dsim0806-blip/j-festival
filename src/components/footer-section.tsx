import { AnimatedReveal } from './animated-reveal';

interface Props { config: { title: string; closingMessage: string; closingMessageEn?: string; showPoweredBy: boolean; hosts?: { name: string }[]; } }

function getInitials(hosts: { name?: string }[] | undefined, title: string): string {
  const names = (hosts || []).map((h) => (h.name || '').trim()).filter(Boolean).slice(0, 2);
  if (names.length > 0) return names.map((n) => n.charAt(0)).join(' & ');
  return (title || '').trim().charAt(0) || '\u2726';
}

export function FooterSection({ config }: Props) {
  const initials = getInitials(config.hosts, config.title);

  return (
    <AnimatedReveal>
      <footer className="inv-footer">
        <div className="inv-monogram inv-monogram-sm" aria-hidden="true">{initials}</div>
        {config.closingMessage && (
          <p className="inv-closing">{config.closingMessage}</p>
        )}
        {config.showPoweredBy && (
          <a
            href="https://linkmap.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-50 hover:opacity-100 transition-opacity"
          >
            Powered by Linkmap
          </a>
        )}
      </footer>
    </AnimatedReveal>
  );
}
