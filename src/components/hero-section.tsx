interface Props {
  config: {
    title: string; titleEn?: string; subtitle: string; subtitleEn?: string;
    heroImageUrl: string; eventType: string;
    eventDateLabel?: string;
    hosts?: { name: string }[];
  };
}

// 장식용 이모지 대신 타이포 마크(EVENT_EYEBROW 텍스트만) 사용 — 프리미엄 신호
const EVENT_EYEBROW: Record<string, string> = {
  gathering: 'GATHERING',
  birthday: 'BIRTHDAY',
  wedding: 'WEDDING',
  baby: 'FIRST BIRTHDAY',
  celebration: 'CELEBRATION',
  corporate: 'COMPANY EVENT',
  custom: 'INVITATION',
};

// 신규 필드 없이 기존 필드(호스트 이름 → 타이틀)에서 모노그램 이니셜을 파생
function getInitials(hosts: { name?: string }[] | undefined, title: string): string {
  const names = (hosts || []).map((h) => (h.name || '').trim()).filter(Boolean).slice(0, 2);
  if (names.length > 0) return names.map((n) => n.charAt(0)).join(' & ');
  return (title || '').trim().charAt(0) || '\u2726';
}

export function HeroSection({ config }: Props) {
  const eyebrow = EVENT_EYEBROW[config.eventType] || EVENT_EYEBROW.custom;
  const initials = getInitials(config.hosts, config.title);
  const framed = Boolean(config.heroImageUrl);

  return (
    <section className={`inv-hero ${framed ? 'inv-hero--framed' : ''}`}>
      {!framed && (
        <>
          <div className="inv-hero-noise" aria-hidden="true" />
          <div className="inv-hero-orb inv-hero-orb-a" aria-hidden="true" />
          <div className="inv-hero-orb inv-hero-orb-b" aria-hidden="true" />
        </>
      )}

      <div className="inv-hero-content animate-fade-up">
        <p className="inv-eyebrow">{eyebrow}</p>

        {framed ? (
          <div className="inv-hero-arch animate-fade-up-d1">
            <img src={config.heroImageUrl} alt="" loading="eager" />
          </div>
        ) : (
          <div className="inv-monogram inv-hero-emoji-ring animate-fade-up-d1" aria-hidden="true">{initials}</div>
        )}

        <h1 className="inv-hero-title animate-fade-up-d1">{config.title}</h1>

        {config.subtitle && (
          <p className="inv-hero-subtitle animate-fade-up-d1">{config.subtitle}</p>
        )}

        {config.eventDateLabel && (
          <p className="inv-hero-date animate-fade-up-d1">{config.eventDateLabel}</p>
        )}

        <div className="inv-headline-divider animate-fade-up-d1">
          <span className="inv-headline-divider-mark" aria-hidden="true">&#10022;</span>
        </div>
      </div>

      {!framed && (
        <div className="inv-hero-scroll-cue" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: 'var(--inv-text-secondary)' }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      )}
    </section>
  );
}
