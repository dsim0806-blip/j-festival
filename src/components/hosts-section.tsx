'use client';

import { AnimatedReveal } from './animated-reveal';

interface HostItem { name: string; nameEn?: string; role: string; roleEn?: string; phone?: string; avatarUrl?: string; }
interface Props { config: { hostsTitle: string; hostsTitleEn?: string; hosts: HostItem[]; } }

export function HostsSection({ config }: Props) {
  if (!config.hosts?.length) return null;

  return (
    <AnimatedReveal>
      <section className="inv-section-decorated">
        <p className="inv-eyebrow">HOSTS</p>
        <h2 className="inv-section-title mb-8">{config.hostsTitle}</h2>
        <div className="inv-hosts">
          {config.hosts.map((host, i) => (
            <div key={i} className="inv-host inv-card">
              {host.avatarUrl ? (
                <img
                  src={host.avatarUrl}
                  alt={host.name}
                  className="inv-host-avatar"
                  style={{ border: '3px solid var(--inv-card-bg)', boxShadow: '0 0 0 2px var(--inv-accent-glow)' }}
                />
              ) : (
                <div
                  className="inv-host-avatar inv-host-avatar--initial"
                  style={{ background: 'var(--inv-accent-soft)', border: '1px solid var(--inv-accent)', color: 'var(--inv-accent-solid)' }}
                >
                  {host.name.charAt(0)}
                </div>
              )}
              <p className="inv-host-role">{host.role}</p>
              <p className="inv-host-name">{host.name}</p>
              {host.phone && (
                <a href={`tel:${host.phone}`} className="inv-btn inv-btn-secondary inv-btn-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {host.phone}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </AnimatedReveal>
  );
}
