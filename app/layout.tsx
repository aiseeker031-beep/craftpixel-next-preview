import type { Metadata } from 'next';
import '@fontsource-variable/outfit';
import '@fontsource-variable/figtree';
import './styles.css';
import { Footer, Header, Motion, StoreProvider } from '../components/shell';

export const metadata: Metadata = {
  title: { default: 'CraftPixel — Digital design goods', template: '%s | CraftPixel' },
  description: 'Explore website templates, Canva kits, planners, and design assets in the CraftPixel storefront demo.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <a className="skip-link" href="#main">Skip to content</a>
          <Header />
          <Motion />
          <main id="main">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
