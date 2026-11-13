import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { PageIntro } from '../../../components/sections';
import { art, articles } from '../../../lib/catalog';
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return articles.map((article) => ({ slug: article.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: articles.find((article) => article.id === slug)?.title ?? 'Journal' };
}
export default async function JournalArticle({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.id === slug);
  if (!article) notFound();
  return <article className="wrap reading page-content">
    <Link className="text-link back-link" href="/journal/"><ArrowLeft size={17} />Journal</Link>
    <PageIntro label={article.topic} title={article.title} />
    <div className="article-image" data-reveal><Image src={art(article.image)} alt="" fill sizes="(max-width: 900px) 100vw, 800px" /></div>
    {article.paragraphs.map((paragraph) => <p className="article-paragraph" key={paragraph} data-reveal>{paragraph}</p>)}
  </article>;
}
