import type { Metadata } from 'next';
import { JournalCards, PageIntro } from '../../components/sections';
export const metadata: Metadata = { title: 'Journal' };
export default function Journal() {
  return <section className="wrap page-content"><PageIntro label="DESIGN NOTES" title="Digital Design Journal">Ideas for working with templates and building a design practice.</PageIntro><JournalCards /></section>;
}
