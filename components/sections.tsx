import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { art, articles, categories, products } from '../lib/catalog';
import { ProductCard } from './catalog';

export function PageIntro({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return <div className="page-intro"><span className="eyebrow" data-reveal>{label}</span><h1 data-reveal>{title}</h1>{children && <p data-reveal>{children}</p>}</div>;
}

export function CategoryCards() {
  return <div className="category-grid">
    {categories.map((category) => <Link className="category-card" key={category.id} href={'/shop/?category=' + category.id} data-reveal>
      <div className="category-image"><Image src={art(category.image)} alt="" fill sizes="(max-width: 760px) 50vw, 25vw" /></div>
      <div className="category-caption"><div><h3>{category.name}</h3><span>{category.caption}</span></div><ArrowUpRight size={20} /></div>
    </Link>)}
  </div>;
}

export function JournalCards() {
  return <div className="journal-grid">{articles.map((article) => <article className="journal-card" key={article.id} data-reveal>
    <Link href={'/journal/' + article.id + '/'}><div className="journal-image"><Image src={art(article.image)} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div><span className="eyebrow">{article.topic}</span><h3>{article.title}<ArrowUpRight size={19} /></h3></Link>
  </article>)}</div>;
}

export function FeaturedProducts() {
  return <div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}

export function ShopLink({ children }: { children: React.ReactNode }) {
  return <Link className="text-link" href="/shop/">{children}<ArrowRight size={17} /></Link>;
}
