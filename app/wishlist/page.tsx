import type { Metadata } from 'next';
import { Wishlist } from '../../components/bag';
import { PageIntro } from '../../components/sections';
export const metadata: Metadata = { title: 'Wishlist' };
export default function Saved() { return <section className="wrap page-content"><PageIntro label="YOUR COLLECTION" title="Wishlist">Keep your favorite designs together on this browser.</PageIntro><Wishlist /></section>; }
