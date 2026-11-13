'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, ShoppingBag, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { art, money, products } from '../lib/catalog';
import { ProductCard } from './catalog';
import { useStore } from './shell';

export function Wishlist() {
  const { saved } = useStore();
  const items = products.filter((product) => saved.includes(product.id));
  return items.length ? <div className="product-grid">{items.map((item) => <ProductCard key={item.id} product={item} />)}</div> : <Empty type="wishlist" />;
}

function Empty({ type }: { type: 'bag' | 'wishlist' }) {
  return <div className="empty-state" data-reveal><h2>Your {type} is empty</h2><p>Explore the catalog and find something for your next project.</p><Link className="button button-dark" href="/shop/">Browse products<ArrowRight size={17} /></Link></div>;
}

export function Bag({ checkout = false }: { checkout?: boolean }) {
  const { bag, toggleBag, clearBag } = useStore();
  const [complete, setComplete] = useState(false);
  const items = products.filter((product) => bag.includes(product.id));
  const total = items.reduce((sum, product) => sum + product.price, 0);
  if (complete) return <div className="empty-state" role="status" data-reveal><Check size={28} /><h2>Demo checkout complete</h2><p>Your bag was cleared. No payment or order was submitted.</p><Link className="button button-dark" href="/shop/">Back to the catalog<ArrowRight size={17} /></Link></div>;
  if (!items.length) return <Empty type="bag" />;
  return <div className="bag-grid">
    <ul className="bag-list" aria-label="Products in your bag">{items.map((item) => <li key={item.id} data-reveal>
      <Link href={'/product/' + item.id + '/'} className="bag-image" tabIndex={-1} aria-hidden="true"><Image src={art(item.image)} alt="" fill sizes="96px" /></Link>
      <div><Link href={'/product/' + item.id + '/'}>{item.name}</Link><span>{item.format} · Digital product</span></div>
      <strong>{money(item.price)}</strong>
      {!checkout && <button className="icon-button" aria-label={`Remove ${item.name}`} type="button" onClick={() => toggleBag(item.id)}><Trash2 size={18} /></button>}
    </li>)}</ul>
    <aside className="bag-summary" data-reveal><h2>Order summary</h2><div className="split"><span>Subtotal</span><strong>{money(total)}</strong></div><p>This is a preview of the purchase flow. Prices are illustrative.</p>
      {checkout ? <button className="button button-dark" type="button" onClick={() => { setComplete(true); clearBag(); }}>Complete demo checkout<Check size={17} /></button> : <Link className="button button-dark" href="/checkout/">Preview checkout<ShoppingBag size={17} /></Link>}
      {checkout && <Link className="text-link" href="/cart/">Back to bag</Link>}
    </aside>
  </div>;
}
