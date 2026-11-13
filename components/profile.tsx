'use client';
import Link from 'next/link';
import { ArrowUpRight, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from './shell';
export function Profile() {
  const { saved, bag } = useStore();
  return <div className="profile-grid">
    <Link className="profile-card" href="/wishlist/" data-reveal><Heart /><h2>Wishlist</h2><p>{saved.length} saved {saved.length === 1 ? 'product' : 'products'}</p><ArrowUpRight /></Link>
    <Link className="profile-card" href="/cart/" data-reveal><ShoppingBag /><h2>Shopping bag</h2><p>{bag.length} {bag.length === 1 ? 'product' : 'products'} in your bag</p><ArrowUpRight /></Link>
  </div>;
}
