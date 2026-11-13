import type { Metadata } from 'next';
import { Bag } from '../../components/bag';
import { PageIntro } from '../../components/sections';
export const metadata: Metadata = { title: 'Checkout preview' };
export default function Checkout() { return <section className="wrap page-content"><PageIntro label="STOREFRONT DEMO" title="Checkout preview">Walk through a sample checkout. No payment or personal information is collected.</PageIntro><Bag checkout /></section>; }
