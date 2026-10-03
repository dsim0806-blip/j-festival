'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatedReveal } from './animated-reveal';

interface Props {
  config: {
    shareTitle: string;
    enableKakao: boolean;
    enableCopy: boolean;
    enableQr: boolean;
    kakaoJsKey: string;
  };
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setClosing(true);
      setTimeout(onClose, 250);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="inv-toast" data-closing={closing ? 'true' : undefined}>
      {'\u2713'} {message}
    </div>
  );
}

export function ShareSection({ config }: Props) {
  const [toast, setToast] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    // window.location 기반이므로 클라이언트에서만 계산 (정적 baking 회피)
    if (config.enableQr) {
      const url = encodeURIComponent(window.location.href);
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${url}`);
    }
  }, [config.enableQr]);

  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        window.prompt('\uBCF5\uC0AC\uD574\uC8FC\uC138\uC694:', window.location.href);
        return;
      }
      setToast('\uB9C1\uD06C \uBCF5\uC0AC\uB428');
    } catch {
      window.prompt('\uBCF5\uC0AC\uD574\uC8FC\uC138\uC694:', window.location.href);
    }
  }, []);

  const handleKakao = useCallback(() => {
    if (config.kakaoJsKey && typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).Kakao) {
      const Kakao = (window as unknown as Record<string, { initialized?: boolean; init?: (key: string) => void; Share?: { sendDefault: (opts: unknown) => void } }>).Kakao;
      if (!Kakao.initialized) Kakao.init?.(config.kakaoJsKey);
      Kakao.Share?.sendDefault({ objectType: 'feed', content: { title: document.title, description: '', imageUrl: '', link: { mobileWebUrl: window.location.href, webUrl: window.location.href } } });
      return;
    }
    if (typeof navigator.share === 'function') {
      navigator.share({ title: document.title, url: window.location.href }).catch(() => {});
      return;
    }
    handleCopy();
  }, [config.kakaoJsKey, handleCopy]);

  if (!config.enableKakao && !config.enableCopy && !config.enableQr) return null;

  return (
    <AnimatedReveal>
      <section className="inv-section-decorated" style={{ background: 'var(--inv-bg-alt)' }}>
        <p className="inv-eyebrow">SHARE</p>
        <h2 className="inv-section-title mb-6">{config.shareTitle}</h2>
        <div className="flex gap-3 justify-center mb-2">
          {config.enableKakao && (
            <button onClick={handleKakao} className="inv-btn-icon inv-btn-icon-kakao" aria-label="\uCE74\uCE74\uC624\uD1A1 \uACF5\uC720">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#191919"><path d="M12 3C6.48 3 2 6.58 2 10.9c0 2.78 1.8 5.22 4.5 6.6-.2.73-.72 2.65-.82 3.06-.13.5.18.49.38.36.16-.11 2.5-1.7 3.51-2.39.47.07.95.1 1.43.1 5.52 0 10-3.58 10-7.73C22 6.58 17.52 3 12 3z"/></svg>
            </button>
          )}
          {config.enableCopy && (
            <button onClick={handleCopy} className="inv-btn-icon inv-btn-icon-secondary" aria-label="\uB9C1\uD06C \uBCF5\uC0AC">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </button>
          )}
        </div>
        {config.enableQr && (
          <details className="inv-details" style={{ display: 'inline-block', textAlign: 'center' }}>
            <summary style={{ justifyContent: 'center' }}>{'QR \uCF54\uB4DC \uBCF4\uAE30'}</summary>
            <div className="flex justify-center mt-3">
              {qrUrl && <img src={qrUrl} alt="QR Code" width={160} height={160} style={{ borderRadius: '0.75rem', border: '1px solid var(--inv-card-border)' }} loading="lazy" />}
            </div>
          </details>
        )}
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </section>
    </AnimatedReveal>
  );
}
