import type { Metadata } from 'next';
import { Bag } from '../../components/bag';
import { PageIntro } from '../../components/sections';
export const metadata: Metadata = { title: 'Shopping bag' };
export default function Cart() { return <section className="wrap page-content"><PageIntro label="YOUR COLLECTION" title="Shopping bag">Review the digital goods you’ve picked out.</PageIntro><Bag /></section>; }
