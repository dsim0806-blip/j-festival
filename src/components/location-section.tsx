'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatedReveal } from './animated-reveal';

interface Props { config: { venueName: string; venueAddress: string; kakaoMapUrl: string; naverMapUrl: string; parkingInfo: string; transitInfo: string; } }

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => { setClosing(true); setTimeout(onClose, 250); }, 1800);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="inv-toast" data-closing={closing ? 'true' : undefined}>
      {'\u2713'} {message}
    </div>
  );
}

export function LocationSection({ config }: Props) {
  const [toast, setToast] = useState<string | null>(null);

  const handleCopyAddress = useCallback(async () => {
    const text = config.venueAddress || config.venueName;
    if (!text) return;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setToast('\uC8FC\uC18C \uBCF5\uC0AC\uB428');
      } else {
        window.prompt('\uBCF5\uC0AC\uD574\uC8FC\uC138\uC694:', text);
      }
    } catch {
      window.prompt('\uBCF5\uC0AC\uD574\uC8FC\uC138\uC694:', text);
    }
  }, [config.venueAddress, config.venueName]);

  if (!config.venueName && !config.venueAddress) return null;

  return (
    <AnimatedReveal>
      <section className="inv-section-decorated">
        <p className="inv-eyebrow">LOCATION</p>
        <h2 className="inv-section-title mb-6">{'\uC7A5\uC18C \uC548\uB0B4'}</h2>
        <div className="max-w-md mx-auto inv-card" style={{ padding: '1.5rem', textAlign: 'left' }}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: '44px', height: '44px', background: 'var(--inv-accent-glow)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--inv-accent-solid)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              {config.venueName && <p className="inv-venue-name">{config.venueName}</p>}
              {config.venueAddress && (
                <div className="inv-venue-addr-row">
                  <p className="inv-venue-addr">{config.venueAddress}</p>
                  <button onClick={handleCopyAddress} className="inv-btn-icon-sm" type="button" aria-label="\uC8FC\uC18C \uBCF5\uC0AC">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="inv-map-buttons">
            {config.kakaoMapUrl && (
              <a href={config.kakaoMapUrl} target="_blank" rel="noopener noreferrer" className="inv-btn inv-btn-kakao">
                {'\uCE74\uCE74\uC624\uB9F5'}
              </a>
            )}
            {config.naverMapUrl && (
              <a href={config.naverMapUrl} target="_blank" rel="noopener noreferrer" className="inv-btn inv-btn-naver">
                {'\uB124\uC774\uBC84\uB9F5'}
              </a>
            )}
          </div>

          {(config.parkingInfo || config.transitInfo) && (
            <details className="inv-details">
              <summary>{'\uC774\uC6A9 \uC548\uB0B4'}</summary>
              <div className="inv-details-body">
                {config.parkingInfo && (
                  <p className="inv-info-line"><strong>{'\uC8FC\uCC28'}</strong> {config.parkingInfo}</p>
                )}
                {config.transitInfo && (
                  <p className="inv-info-line"><strong>{'\uAD50\uD1B5'}</strong> {config.transitInfo}</p>
                )}
              </div>
            </details>
          )}
        </div>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </section>
    </AnimatedReveal>
  );
}
