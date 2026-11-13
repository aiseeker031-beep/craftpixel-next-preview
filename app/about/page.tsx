import type { Metadata } from 'next';
import Image from 'next/image';
import { PageIntro, ShopLink } from '../../components/sections';
import { art } from '../../lib/catalog';
export const metadata: Metadata = { title: 'About' };
export default function About() {
  return <section className="wrap page-content"><PageIntro label="THE STUDIO" title="About CraftPixel">Digital design goods for people who like to make things their own.</PageIntro>
    <div className="detail-grid info-grid"><div className="detail-image" data-reveal><Image src={art('hero-web')} alt="Yellow geometric sculpture wrapped around a chrome ring" fill sizes="(max-width: 760px) 100vw, 52vw" /></div>
    <div className="detail-copy" data-reveal><h2>Start with a design. Make it yours.</h2><p>CraftPixel brings together templates for independent websites, editable Canva layouts, and planners for everyday projects. Browse the collection by format or use case to find a starting point that fits.</p><ShopLink>Explore the catalog</ShopLink></div></div>
  </section>;
}
