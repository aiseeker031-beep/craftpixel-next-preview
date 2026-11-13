'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { categories, products } from '../lib/catalog';

type Store = { saved: string[]; bag: string[]; toggleSaved: (id: string) => void; toggleBag: (id: string) => void; clearBag: () => void };
const StoreContext = createContext<Store | null>(null);
const validIds = new Set(products.map((product) => product.id));

function read(key: string): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id === 'string' && validIds.has(id)))] : [];
  } catch { return []; }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);
  const [bag, setBag] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    setSaved(read('craftpixel-saved'));
    setBag(read('craftpixel-bag'));
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem('craftpixel-saved', JSON.stringify(saved));
      localStorage.setItem('craftpixel-bag', JSON.stringify(bag));
    } catch {}
  }, [ready, saved, bag]);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 2200);
    return () => window.clearTimeout(timer);
  }, [notice]);
  function toggleSaved(id: string) {
    setNotice(saved.includes(id) ? 'Removed from wishlist' : 'Saved to wishlist');
    setSaved((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  }
  function toggleBag(id: string) {
    setNotice(bag.includes(id) ? 'Removed from bag' : 'Added to bag');
    setBag((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  }
  return <StoreContext.Provider value={{ saved, bag, toggleSaved, toggleBag, clearBag: () => setBag([]) }}>
    {children}
    <div className={'toast' + (notice ? ' toast-active' : '')} role="status">{notice}</div>
  </StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error('StoreProvider is missing');
  return store;
}

const links = [['Shop', '/shop/'], ['Collections', '/collections/'], ['Journal', '/journal/'], ['About', '/about/']];

function Brand() {
  return <Link className="brand" href="/" aria-label="CraftPixel home"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M0 0h10v10H0zm14 0h10v10H14zM0 14h10v10H0zm14 0h10v10H14z"/><path fill="#f5de19" d="M14 0h10v10H14z"/></svg>CraftPixel<span>.</span></Link>;
}

export function Header() {
  const { saved, bag } = useStore();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => { setMenu(false); setSearch(false); }, [pathname]);
  useEffect(() => {
    const node = dialog.current;
    if (search && node && !node.open) node.showModal();
    if (!search && node?.open) {
      const timer = window.setTimeout(() => node.close(), window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200);
      return () => window.clearTimeout(timer);
    }
  }, [search]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get('q') ?? '').trim();
    setSearch(false);
    router.push('/shop/' + (query ? '?q=' + encodeURIComponent(query) : ''));
  }

  return <>
    <div className="announcement" data-reveal><span>STOREFRONT DEMO</span><span className="announcement-dot" />Explore the CraftPixel collection <Link href="/shop/" aria-label="Explore the collection"><ArrowRight size={14} /></Link></div>
    <header className="site-header" data-reveal>
      <div className="header-inner">
        <button className="icon-button menu-button" type="button" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
        <nav className="primary-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? 'page' : undefined}>{label}</Link>)}
        </nav>
        <Brand />
        <div className="header-actions">
          <button className="icon-button" type="button" aria-label="Search products" onClick={() => setSearch(true)}><Search size={20} /></button>
          <Link className="icon-button header-wishlist" href="/wishlist/" aria-label={`Wishlist, ${saved.length} ${saved.length === 1 ? 'item' : 'items'}`}><Heart size={20} /></Link>
          <Link className="icon-button bag-link" href="/cart/" aria-label={`Bag, ${bag.length} ${bag.length === 1 ? 'item' : 'items'}`}><ShoppingBag size={20} /><span>{bag.length}</span></Link>
        </div>
      </div>
      <nav className={'mobile-nav' + (menu ? ' mobile-nav-open' : '')} id="mobile-menu" aria-label="Mobile navigation" inert={!menu}>
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setMenu(false)}>{label}<ArrowUpRight size={18} /></Link>)}
        <Link href="/wishlist/" onClick={() => setMenu(false)}>Wishlist<Heart size={18} /></Link>
      </nav>
    </header>
    <dialog ref={dialog} className={search ? 'search-dialog' : 'search-dialog search-closing'} onCancel={(event) => { event.preventDefault(); setSearch(false); }} onClick={(event) => { if (event.target === event.currentTarget) setSearch(false); }} aria-labelledby="search-title">
      <div className="search-inner">
        <div className="split"><h2 id="search-title">Find a product</h2><button type="button" className="icon-button" aria-label="Close search" onClick={() => setSearch(false)}><X /></button></div>
        <form onSubmit={submit} className="search-form"><input name="q" type="search" aria-label="Product keywords" placeholder="Try ‘planner’ or ‘Canva’" autoFocus /><button className="button button-dark" type="submit">Search</button></form>
      </div>
    </dialog>
  </>;
}

export function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const nodes = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const leavingAbove = entry.boundingClientRect.bottom <= (entry.rootBounds?.top ?? 0);
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-motion', 'visible');
        } else {
          entry.target.setAttribute('data-motion', leavingAbove ? 'above' : 'below');
        }
      }
    }, { rootMargin: '-30px 0px -30px 0px' });
    function scan() {
      for (const node of nodes) {
        if (!node.isConnected) { observer.unobserve(node); nodes.delete(node); }
      }
      document.querySelectorAll('[data-reveal]').forEach((node) => {
        if (nodes.has(node)) return;
        const rect = node.getBoundingClientRect();
        const position = rect.bottom <= 30 ? 'above' : rect.top >= window.innerHeight - 30 ? 'below' : 'visible';
        node.setAttribute('data-motion', position);
        observer.observe(node);
        nodes.add(node);
      });
    }
    scan();
    const changes = new MutationObserver(scan);
    changes.observe(document.body, { childList: true, subtree: true });
    return () => {
      changes.disconnect();
      observer.disconnect();
      nodes.forEach((node) => node.removeAttribute('data-motion'));
    };
  }, [pathname]);
  return null;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="wrap footer-grid">
      <div data-reveal><Brand /><p>Editable digital goods for websites,<br /> celebrations, and everyday plans.</p></div>
      <div data-reveal><h2>Explore</h2>{categories.map((category) => <Link key={category.id} href={'/shop/?category=' + category.id}>{category.name}</Link>)}</div>
      <div data-reveal><h2>CraftPixel</h2><Link href="/about/">About</Link><Link href="/journal/">Journal</Link><Link href="/faq/">FAQs</Link><Link href="/contact/">Contact</Link></div>
      <div data-reveal><h2>Your collection</h2><Link href="/wishlist/">Wishlist</Link><Link href="/cart/">Shopping bag</Link><Link href="/account/">Local profile</Link></div>
    </div>
    <div className="wrap footer-bottom"><span>© CraftPixel</span><span>Storefront demo</span></div>
  </footer>;
}
