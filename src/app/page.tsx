import { siteConfig } from '@/lib/config';
import { MessageSection } from '@/components/message-section';
import { HeroSection } from '@/components/hero-section';
import { CountdownSection } from '@/components/countdown-section';
import { LocationSection } from '@/components/location-section';
import { GallerySection } from '@/components/gallery-section';
import { AccountSection } from '@/components/account-section';
import { ShareSection } from '@/components/share-section';
import { FooterSection } from '@/components/footer-section';

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `/* invitation preset: elegant-gold — auto-generated */
:root {
  --inv-bg: #FBF7F0;
  --inv-bg-alt: #F8F3E8;
  --inv-text-primary: #211A12;
  --inv-text-secondary: #6B5A3E;
  --inv-accent: #B8860B;
  --inv-accent-solid: #8B6B1F;
  --inv-accent-glow: rgba(184, 134, 11, 0.15);
  --inv-accent-soft: rgba(184, 134, 11, 0.07);
  --inv-card-bg: #FFFFFF;
  --inv-card-border: #E8DCC8;
  --inv-gradient-from: #F3E8CF;
  --inv-gradient-to: #FBF7F0;
  --inv-font-display: 'Nanum Myeongjo', 'Pretendard Variable', serif;
  --inv-font-body: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, 'Malgun Gothic', sans-serif;
}` }} />
      <main className="min-h-screen" style={{ background: 'var(--inv-bg-grad, var(--inv-bg))' }}>
        <MessageSection config={siteConfig} />
        <HeroSection config={siteConfig} />
        <CountdownSection config={siteConfig} />
        <LocationSection config={siteConfig} />
        <GallerySection config={siteConfig} />
        <AccountSection config={siteConfig} />
        <ShareSection config={siteConfig} />
        <FooterSection config={siteConfig} />
      </main>
    </>
  );
}
