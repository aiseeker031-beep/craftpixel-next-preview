import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ProductActions, ProductCard } from '../../../components/catalog';
import { art, categoryName, money, products } from '../../../lib/catalog';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.id === slug);
  return { title: product?.name ?? 'Product' };
}
export default async function Product({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.id === slug);
  if (!product) notFound();
  const related = products.filter((item) => item.category === product.category && item.id !== product.id);
  return <div className="wrap page-content">
    <Link className="text-link back-link" href={'/shop/?category=' + product.category}><ArrowLeft size={17} />{categoryName(product.category)}</Link>
    <div className="detail-grid">
      <div className="detail-image" data-reveal><Image src={art(product.image)} alt={product.name + ' artwork'} fill sizes="(max-width: 760px) 100vw, 52vw" preload /></div>
      <div className="detail-copy">
        <span className="eyebrow" data-reveal>{product.format} TEMPLATE</span><h1 data-reveal>{product.name}</h1><p data-reveal>{product.detail}</p>
        <div className="detail-price" data-reveal>{money(product.price)}</div>
        <div data-reveal><ProductActions product={product} /></div>
        <div className="detail-features" data-reveal><h2>What’s included</h2><ul>{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
      </div>
    </div>
    {related.length > 0 && <section className="section"><div className="section-heading"><h2 data-reveal>More in {categoryName(product.category)}</h2></div><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
  </div>;
}
