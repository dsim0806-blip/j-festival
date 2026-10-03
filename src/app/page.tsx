import { siteConfig } from '@/lib/config';
import { HeroSection } from '@/components/hero-section';
import { MessageSection } from '@/components/message-section';
import { CountdownSection } from '@/components/countdown-section';
import { HostsSection } from '@/components/hosts-section';
import { LocationSection } from '@/components/location-section';
import { GallerySection } from '@/components/gallery-section';
import { RsvpSection } from '@/components/rsvp-section';
import { AccountSection } from '@/components/account-section';
import { ShareSection } from '@/components/share-section';
import { ContactSection } from '@/components/contact-section';
import { FooterSection } from '@/components/footer-section';

export default function Home() {
  return (
    <>
      <main className="min-h-screen" style={{ background: 'var(--inv-bg-grad, var(--inv-bg))' }}>
        <HeroSection config={siteConfig} />
        <MessageSection config={siteConfig} />
        <CountdownSection config={siteConfig} />
        <HostsSection config={siteConfig} />
        <LocationSection config={siteConfig} />
        <GallerySection config={siteConfig} />
        <RsvpSection config={siteConfig} />
        <AccountSection config={siteConfig} />
        <ShareSection config={siteConfig} />
        <ContactSection config={siteConfig} />
        <FooterSection config={siteConfig} />
      </main>
    </>
  );
}
