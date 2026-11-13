'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Heart, Search, ShoppingBag } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { art, categories, categoryName, money, products } from '../lib/catalog';
import { useStore } from './shell';

type Product = (typeof products)[number];
const slides = [
  { title: 'Website', accent: 'templates.', description: 'Give your next idea a place on the web. Explore editable layouts for portfolios, brands, and independent studios.', category: 'web', action: 'Explore web templates', image: 'hero-web', alt: 'Acid-yellow architectural sculpture intertwined with a polished chrome ring', color: 'yellow' },
  { title: 'Canva', accent: 'templates.', description: 'Make the next invitation, seasonal card, or announcement feel like yours with editable Canva designs.', category: 'canva', action: 'Explore Canva kits', image: 'hero-canva', alt: 'Folded hot-pink origami star threaded with a glossy red ribbon', color: 'pink' },
  { title: 'Digital', accent: 'planners.', description: 'Find a better way to plan your budget, build a content calendar, and keep track of the everyday.', category: 'planners', action: 'Explore planners', image: 'hero-planners', alt: 'Cobalt acrylic accordion sculpture with a pale blue sphere', color: 'blue' },
];

export function Hero() {
  const [active, setActive] = useState(0);
  function select(index: number) {
    const target = (index + slides.length) % slides.length;
    setActive(target);
  }
  return <section className={'hero hero-' + slides[active].color} aria-roledescription="carousel" aria-label="Featured collections" data-reveal onKeyDown={(event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      select(active + (event.key === 'ArrowRight' ? 1 : -1));
    }
  }}>
    <div className="hero-slides">
      {slides.map((slide, index) => <div key={slide.category} className={'hero-slide' + (index === active ? ' hero-active' : '')} inert={index !== active} aria-hidden={index !== active} aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}`}>
        <div className="hero-copy">
          <span className="eyebrow hero-kicker"><span />THE CRAFTPIXEL COLLECTION</span>
          {index === 0 ? <h1><span>{slide.title}</span><span>{slide.accent}</span></h1> : <h2><span>{slide.title}</span><span>{slide.accent}</span></h2>}
          <p>{slide.description}</p>
          <Link className="button button-dark" href={'/shop/?category=' + slide.category}>{slide.action}<ArrowUpRight size={17} /></Link>
        </div>
        <div className="hero-image">
          <Image src={art(slide.image)} alt={slide.alt} fill preload={index === 0} loading={index === 0 ? undefined : 'eager'} fetchPriority={index === 0 ? undefined : 'low'} sizes="(max-width: 760px) 100vw, 58vw" />
        </div>
      </div>)}
    </div>
    <div className="hero-controls">
      <div className="slide-tabs" aria-label="Select a collection">
        {slides.map((slide, index) => <button key={slide.category} type="button" className={index === active ? 'selected' : ''} aria-pressed={index === active} onClick={() => select(index)} aria-label={slide.title + ' ' + slide.accent.slice(0, -1)} />)}
      </div>
      <span className="slide-count" aria-live="polite">0{active + 1} / 0{slides.length}</span>
      <button type="button" className="icon-button" onClick={() => select(active - 1)} aria-label="Previous slide"><ChevronLeft size={20} /></button>
      <button type="button" className="icon-button" onClick={() => select(active + 1)} aria-label="Next slide"><ChevronRight size={20} /></button>
    </div>
  </section>;
}

export function ProductCard({ product }: { product: Product }) {
  const { saved, toggleSaved, bag, toggleBag } = useStore();
  const liked = saved.includes(product.id);
  const added = bag.includes(product.id);
  return <article className="product-card" data-reveal>
    <div className="product-visual">
      <Link href={'/product/' + product.id + '/'} tabIndex={-1} aria-hidden="true">
        <Image src={art(product.image)} alt="" fill sizes="(max-width: 760px) 50vw, (max-width: 1080px) 33vw, 25vw" />
      </Link>
      <span className="format">{product.format}</span>
      <button type="button" className={'icon-button save-button' + (liked ? ' liked' : '')} aria-label={`Save ${product.name}`} aria-pressed={liked} onClick={() => toggleSaved(product.id)}><Heart size={18} fill={liked ? 'currentColor' : 'none'} /></button>
    </div>
    <div className="product-info">
      <span className="product-category">{categoryName(product.category)}</span>
      <h3><Link href={'/product/' + product.id + '/'}>{product.name}</Link></h3>
      <div className="split"><span className="price">{money(product.price)}</span><button className={'icon-button add-button' + (added ? ' added' : '')} type="button" aria-label={`Add ${product.name} to bag`} aria-pressed={added} onClick={() => toggleBag(product.id)}><ShoppingBag size={17} /></button></div>
    </div>
  </article>;
}

export function ProductActions({ product }: { product: Product }) {
  const { saved, bag, toggleSaved, toggleBag } = useStore();
  const liked = saved.includes(product.id);
  const added = bag.includes(product.id);
  return <div className="product-actions">
    <button className="button button-dark" type="button" onClick={() => toggleBag(product.id)}>{added ? 'Remove from bag' : 'Add to bag'} <ShoppingBag size={18} /></button>
    <button className="icon-button detail-save" type="button" aria-label="Save to wishlist" aria-pressed={liked} onClick={() => toggleSaved(product.id)}><Heart size={21} fill={liked ? 'currentColor' : 'none'} /></button>
  </div>;
}

export function Catalog() {
  const params = useSearchParams();
  const router = useRouter();
  const category = params.get('category') || '';
  const query = params.get('q') || '';
  const sort = params.get('sort') || '';
  const [search, setSearch] = useState(query);
  useEffect(() => setSearch(query), [query]);
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const filtered = products.filter((product) => (!category || product.category === category) && terms.every((term) =>
    [product.name, categoryName(product.category), product.format, product.detail].join(' ').toLowerCase().includes(term)));
  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    const suffix = next.toString();
    router.push('/shop/' + (suffix ? '?' + suffix : ''), { scroll: false });
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    update('q', search.trim());
  }

  return <>
    <div className="catalog-controls" data-reveal>
      <div className="filters" aria-label="Product categories">
        <button className="chip" type="button" aria-pressed={!category} onClick={() => update('category', '')}>All products</button>
        {categories.map((item) => <button key={item.id} className="chip" type="button" aria-pressed={category === item.id} onClick={() => update('category', item.id)}>{item.name}</button>)}
      </div>
      <div className="catalog-tools">
        <form className="inline-search" onSubmit={submit}><input value={search} onChange={(event) => setSearch(event.target.value)} type="search" aria-label="Filter by product name or format" placeholder="Search the catalog" /><button type="submit" className="icon-button" aria-label="Apply search"><Search size={18} /></button></form>
        <select aria-label="Sort products" value={sort} onChange={(event) => update('sort', event.target.value)}><option value="">Featured order</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name: A to Z</option></select>
      </div>
    </div>
    <p className="results-label" role="status">{filtered.length} {filtered.length === 1 ? 'product' : 'products'}{query ? ' for “' + query + '”' : ''}</p>
    {filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state" data-reveal><h2>No matching products</h2><p>Try a different search or clear your filters.</p><Link className="button button-dark" href="/shop/">Clear filters<ArrowRight size={17} /></Link></div>}
  </>;
}
