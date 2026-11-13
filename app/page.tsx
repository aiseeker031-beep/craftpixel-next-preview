import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Boxes, FileDown, LayoutTemplate, PenTool } from 'lucide-react';
import { Hero } from '../components/catalog';
import { CategoryCards, FeaturedProducts, JournalCards, ShopLink } from '../components/sections';
import { art } from '../lib/catalog';

const benefits = [
  { icon: FileDown, title: 'Digital formats', caption: 'Browse by file type' },
  { icon: PenTool, title: 'Editable designs', caption: 'Make each layout your own' },
  { icon: Boxes, title: 'Organized kits', caption: 'Find related assets together' },
  { icon: LayoutTemplate, title: 'Built for creators', caption: 'From websites to celebrations' },
];

export default function Home() {
  return <>
    <Hero />
    <div className="benefit-strip"><div className="wrap benefits">{benefits.map(({ icon: Icon, title, caption }) => <div key={title} className="benefit" data-reveal><Icon size={23} strokeWidth={1.6} /><div><strong>{title}</strong><span>{caption}</span></div></div>)}</div></div>
    <section className="wrap section">
      <div className="section-heading"><div><h2 data-reveal>Browse by collection</h2></div><ShopLink>Browse the catalog</ShopLink></div>
      <CategoryCards />
    </section>
    <section className="wrap section featured-section">
      <div className="section-heading"><div><h2 data-reveal>Featured <em>products</em></h2></div><ShopLink>See all products</ShopLink></div>
      <FeaturedProducts />
    </section>
    <section className="wrap section collection-feature">
      <div className="feature-banner" data-reveal>
        <div><h2>Make the next celebration yours.</h2><p>Explore editable invitations, festive designs, and printable gifts.</p><Link className="button button-dark" href="/shop/?category=canva">Explore Canva templates<ArrowUpRight size={17} /></Link></div>
        <div className="feature-image"><Image src={art('hero-canva')} alt="Hot pink folded paper sculpture" fill sizes="(max-width: 760px) 100vw, 52vw" /></div>
      </div>
    </section>
    <section className="wrap section journal-section">
      <div className="section-heading"><div><h2 data-reveal>Digital Design Journal</h2></div><Link className="text-link" href="/journal/">Read the journal<ArrowUpRight size={17} /></Link></div>
      <JournalCards />
    </section>
  </>;
}
