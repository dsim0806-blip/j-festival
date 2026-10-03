'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatedReveal } from './animated-reveal';

interface AccountItem { label: string; bankName: string; accountNumber: string; holder: string; }
interface Props { config: { accountTitle: string; accounts: AccountItem[]; kakaoPayUrl: string; } }

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

function AccountRow({ acc }: { acc: AccountItem }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(acc.accountNumber);
      } else {
        window.prompt('\uBCF5\uC0AC\uD574\uC8FC\uC138\uC694:', acc.accountNumber);
        return;
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt('\uBCF5\uC0AC\uD574\uC8FC\uC138\uC694:', acc.accountNumber);
    }
  }, [acc.accountNumber]);

  return (
    <details className="inv-details inv-account-item" open>
      <summary>
        <span className="inv-account-badge">{acc.label}</span>
        <span className="inv-account-holder">{acc.holder}</span>
      </summary>
      <div className="inv-account-row">
        <p className="inv-account-num">
          <span className="inv-account-bank">{acc.bankName}</span>{' '}
          <span className="tabular-nums">{acc.accountNumber}</span>
        </p>
        {copied ? (
          <span className="inv-copy-check">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {'\uBCF5\uC0AC\uB428'}
          </span>
        ) : (
          <button onClick={handleCopy} className="inv-btn inv-btn-secondary inv-btn-sm" type="button">
            {'\uBCF5\uC0AC'}
          </button>
        )}
      </div>
    </details>
  );
}

export function AccountSection({ config }: Props) {
  const [toast, setToast] = useState<string | null>(null);

  if (!config.accounts?.length && !config.kakaoPayUrl) return null;

  return (
    <AnimatedReveal>
      <section className="inv-section-decorated" style={{ background: 'var(--inv-bg-alt)' }}>
        <p className="inv-eyebrow">GIFT</p>
        <h2 className="inv-section-title mb-6">{config.accountTitle}</h2>
        <div className="max-w-md mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {config.accounts.map((acc, i) => (<AccountRow key={i} acc={acc} />))}
          {config.kakaoPayUrl && (
            <a href={config.kakaoPayUrl} target="_blank" rel="noopener noreferrer" className="inv-btn inv-btn-kakao" style={{ width: '100%', marginTop: '0.25rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#191919">
                <path d="M12 3C6.48 3 2 6.58 2 10.9c0 2.78 1.8 5.22 4.5 6.6-.2.73-.72 2.65-.82 3.06-.13.5.18.49.38.36.16-.11 2.5-1.7 3.51-2.39.47.07.95.1 1.43.1 5.52 0 10-3.58 10-7.73C22 6.58 17.52 3 12 3z"/>
              </svg>
              {'\uCE74\uCE74\uC624\uD398\uC774\uB85C \uC1A1\uAE08\uD558\uAE30'}
            </a>
          )}
        </div>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </section>
    </AnimatedReveal>
  );
}
