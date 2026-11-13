import type { Metadata } from 'next';
import { PageIntro } from '../../components/sections';
export const metadata: Metadata = { title: 'FAQs' };
const questions = [
  ['Can I buy or download products here?', 'This site is a storefront demo. You can browse the catalog, save items, and preview checkout. It does not accept payments, create orders, or deliver files.'],
  ['Which app opens a template?', 'The format appears on each product card and detail page. Canva and Figma designs use their respective editors. PDFs open in any PDF reader, and HTML templates can be opened in a browser or code editor.'],
  ['Where are my bag and wishlist saved?', 'Both lists stay in this browser. They persist across refreshes until you clear site data or remove the items.'],
  ['Does the demo require an account?', 'No. The local profile page summarizes what you have saved in this browser.'],
];
export default function FAQ() {
  return <section className="wrap reading page-content"><PageIntro label="HELP" title="Frequently asked questions" /><div className="faq-list">{questions.map(([question, answer]) => <details key={question} data-reveal><summary>{question}</summary><p>{answer}</p></details>)}</div></section>;
}
