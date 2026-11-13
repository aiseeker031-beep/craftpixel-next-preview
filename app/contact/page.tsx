import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '../../components/sections';
import { ArrowUpRight, HelpCircle } from 'lucide-react';
export const metadata: Metadata = { title: 'Contact' };
export default function Contact() {
  return <section className="wrap reading page-content"><PageIntro label="SUPPORT" title="Contact CraftPixel">Find answers about product formats and the demo storefront.</PageIntro><div className="empty-state" data-reveal><HelpCircle size={30} /><h2>Product and storefront help</h2><Link className="button button-dark" href="/faq/">Read the FAQs<ArrowUpRight size={17} /></Link></div></section>;
}
