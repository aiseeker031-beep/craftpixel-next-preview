# CraftPixel storefront demo

A Next.js App Router rebuild of the CraftPixel storefront. The static demo contains collection and product routes, a searchable catalog, journal articles, a browser-local bag and wishlist, and a simulated checkout. It does not collect personal details or handle orders, payments, accounts, or digital file delivery.

## Run locally

Use Node.js 24. Run `npm ci` then `npm run dev` and open http://localhost:3000.

Run `npm run build` to export the site to `out/`. To preview the export at the root, serve that directory with a static HTTP server such as `python3 -m http.server --directory out 3000`.

## GitHub Pages

Set the publishing source to GitHub Actions in the repository’s Pages settings. The included workflow builds the site with the project’s base path and publishes the exported pages on pushes to `main`.

## Catalog and artwork

Edit `lib/catalog.ts` to update collections, products, prices, and journal content. Original abstract hero images and product artwork are bundled as WebP in `public/art/`. The three hero slides are configured in `components/catalog.tsx`.
