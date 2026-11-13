import type { Metadata } from 'next';
import { Profile } from '../../components/profile';
import { PageIntro } from '../../components/sections';
export const metadata: Metadata = { title: 'Local profile' };
export default function Account() { return <section className="wrap page-content"><PageIntro label="YOUR COLLECTION" title="Local profile">View the items saved in this browser. The demo requires no sign-in.</PageIntro><Profile /></section>; }
