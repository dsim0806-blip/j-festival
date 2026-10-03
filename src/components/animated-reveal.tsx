'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealVariant = 'fade' | 'slide-left' | 'slide-right' | 'scale';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}

/**
 * 스크롤 진입 시 살짝 떠오르며 나타나는 리빌 컴포넌트.
 * 기본 상태는 항상 visible(opacity:1) — JS가 정상 마운트되고 reduced-motion이 아닐 때만
 * "reveal-pending"(숨김) 상태로 전환한다. 카카오톡 인앱 웹뷰 등에서 JS 하이드레이션이
 * 실패하거나 지연되더라도 초대장 내용이 영구히 가려지는 사고를 방지하기 위한 안전장치.
 */
export function AnimatedReveal({ children, className = '', delay = 0, variant = 'fade' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setVisible(true); return; }

    setReady(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) { setTimeout(() => setVisible(true), delay); }
          else { setVisible(true); }
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const variantClass = variant === 'fade' ? 'reveal-fade'
    : variant === 'slide-left' ? 'reveal-slide-left'
    : variant === 'slide-right' ? 'reveal-slide-right'
    : 'reveal-scale';

  const stateClass = ready ? (visible ? 'revealed' : 'reveal-pending') : '';

  return (
    <div ref={ref} className={`${variantClass} ${stateClass} ${className}`}>
      {children}
    </div>
  );
}
