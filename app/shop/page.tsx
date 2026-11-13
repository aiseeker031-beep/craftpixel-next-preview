import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Catalog } from '../../components/catalog';
import { PageIntro } from '../../components/sections';
export const metadata: Metadata = { title: 'Shop' };
export default function Shop() {
  return <section className="wrap page-content"><PageIntro label="THE CATALOG" title="Shop digital goods">Find editable templates, planners, and design assets for your next project.</PageIntro><Suspense fallback={<p role="status">Loading catalog…</p>}><Catalog /></Suspense></section>;
}
