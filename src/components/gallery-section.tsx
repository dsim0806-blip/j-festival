'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatedReveal } from './animated-reveal';

interface Props { config: { galleryImages: string[]; galleryColumns: number; } }

export function GallerySection({ config }: Props) {
  if (!config.galleryImages?.length) return null;

  const useCarousel = config.galleryImages.length <= 3;

  return (
    <AnimatedReveal>
      <section className="inv-section-decorated">
        <p className="inv-eyebrow">GALLERY</p>
        <h2 className="inv-section-title mb-6">{'\uAC24\uB7EC\uB9AC'}</h2>
        {useCarousel ? <Carousel images={config.galleryImages} /> : <EditorialGrid images={config.galleryImages} />}
      </section>
    </AnimatedReveal>
  );
}

function Carousel({ images }: { images: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = children.indexOf(entry.target as HTMLElement);
            if (idx >= 0) setActiveIdx(idx);
          }
        }
      },
      { root: el, threshold: 0.6 },
    );
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [images.length]);

  return (
    <div className="max-w-lg mx-auto">
      <div ref={scrollRef} className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-3 pb-2" style={{ scrollPaddingInline: '1.5rem' }}>
        {images.map((url, i) => (
          <div key={i} className="snap-center flex-shrink-0 overflow-hidden rounded-xl bg-black/5" style={{ width: 'min(75vw, 320px)', aspectRatio: '3/4' }}>
            <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-contain" loading="lazy" />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="inv-dots">
          {images.map((_, i) => (<div key={i} className={`inv-dot ${i === activeIdx ? 'inv-dot-active' : ''}`} />))}
        </div>
      )}
    </div>
  );
}

// 첫 장 대형 + 나머지 소형 그리드의 편집적 비대칭 레이아웃
function EditorialGrid({ images }: { images: string[] }) {
  return (
    <div className="inv-gallery-bento">
      {images.map((url, i) => (
        <div key={i} className={`inv-gallery-item ${i === 0 ? 'inv-gallery-item--lg' : ''}`}>
          <img src={url} alt={`Photo ${i + 1}`} loading="lazy" />
        </div>
      ))}
    </div>
  );
}
