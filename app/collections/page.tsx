import type { Metadata } from 'next';
import { CategoryCards, PageIntro } from '../../components/sections';
export const metadata: Metadata = { title: 'Collections' };
export default function Collections() {
  return <section className="wrap page-content"><PageIntro label="CATALOG" title="Collections">Browse by the kind of project you’re working on.</PageIntro><CategoryCards /></section>;
}
