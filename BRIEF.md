# Eynna Hair — Full Rebuild Brief

## Overview
Rebuild eynna-hair.ba as a premium Next.js site. The current site is a basic WordPress/WooCommerce store.
This rebuild should look like a luxury hair brand — dark, cinematic, with scroll animations.
The client should say "WOW" when she opens it.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (custom design tokens, NOT default)
- GSAP + ScrollTrigger for scroll animations
- Framer Motion for component animations
- next-intl for i18n (10 languages)
- Static site (GitHub Pages compatible via next export)

## Design Direction
- **Dark luxury aesthetic** — deep black/charcoal base with gold/champagne accents
- **Hero:** Full-screen cinematic hero with large typography and flowing hair imagery
- **Typography:** Elegant serif for headings (Playfair Display), clean sans for body (Inter)
- **Animations:** Smooth scroll-triggered reveals, parallax, text reveals, image zoom on hover
- **Product cards:** Dark glass-morphism cards with hover scale + glow effect
- **Color palette:**
  - Primary: #0A0A0A (near black)
  - Secondary: #1A1A1A (dark charcoal)
  - Accent: #C9A96E (champagne gold)
  - Text: #F5F5F5 (off-white)
  - Muted: #888888 (gray for descriptions)
- **Navigation:** Minimal, sticky, transparent → solid on scroll
- **Footer:** Rich footer with newsletter, social links, contact info
- **Marquee ticker:** Categories scrolling horizontally
- Currency: KM (Bosnian Convertible Mark)

## Languages (10)
1. bs — Bosnian (default/primary)
2. en — English
3. de — German
4. fr — French
5. es — Spanish
6. it — Italian
7. nl — Dutch
8. pl — Polish
9. sv — Swedish
10. hr — Croatian

## Pages
1. **Home** (/) — Hero + Featured categories + Best sellers + About teaser + Testimonials
2. **Shop** (/shop) — All products with category filters
3. **Category pages** (/category/[slug]) — Filtered product grid
4. **Product pages** (/product/[slug]) — Full product detail with gallery, description, price
5. **About** (/about) — Brand story, quality info
6. **Custom Wigs** (/custom-wigs) — "Perika po želji" service page
7. **Care Guide** (/care) — Installation & maintenance
8. **Contact** (/contact) — Contact form + WhatsApp + location

## Categories
1. **perike-prirodna-kosa** — Wigs - Natural Human Hair
2. **perike-proteinsko-vlakno** — Wigs - Protein Fiber
3. **repovi** — Ponytails / Hair Tails
4. **ekstenzije** — Extensions (natural human hair)
5. **ekstenzije-klipse** — Clip-in Extensions
6. **toperi** — Hair Toppers
7. **siskice** — Bangs/Fringe Extensions

## Products (COMPLETE LIST — DO NOT SKIP ANY)

### Category: Hair Toppers (Toperi za kosu)
| # | Name | Price | Sale | Image URL |
|---|------|-------|------|-----------|
| 1 | Mono Topper 3x5 – 41cm – Ombre Blonde | TBD | TBD | https://eynna-hair.ba/wp-content/uploads/2026/02/3x5.5-Mono-Topper-Zenski-topper-Prirodna-ljudska-kosa-1-6-scaled.jpg |
| 2 | Mono Topper 3x5 – 41cm – #10 Smeđi | TBD | TBD | https://eynna-hair.ba/wp-content/uploads/2026/02/3x5.5-Mono-Topper-Zenski-topper-Prirodna-ljudska-kosa-1-5-scaled.jpg |
| 3 | Mono Topper 3x5 – 41cm – 613 Plavi | TBD | TBD | https://eynna-hair.ba/wp-content/uploads/2026/02/3x5.5-Mono-Topper-Zenski-topper-Prirodna-ljudska-kosa-1-4-scaled.jpg |
| 4 | Mono Topper 3x5 – #4/6 Smeđi | TBD | TBD | https://eynna-hair.ba/wp-content/uploads/2026/02/3x5.5-Mono-Topper-Zenski-topper-Prirodna-ljudska-kosa-1-3-scaled.jpg |
| 5 | Mono Topper 3x5 – Platinum Blonde | TBD | TBD | https://eynna-hair.ba/wp-content/uploads/2026/02/3x5.5-Mono-Topper-Zenski-topper-Prirodna-ljudska-kosa-5-2-scaled.jpg |
| 6 | Mono Topper 3x5 – #4 Smeđi (Natural) | TBD | TBD | https://eynna-hair.ba/wp-content/uploads/2026/02/3x5.5-Mono-Topper-Zenski-topper-Prirodna-ljudska-kosa-4-scaled.jpg |
| 7 | Mono Topper – #4 Smeđi | TBD | TBD | https://eynna-hair.ba/wp-content/uploads/2026/02/3x5.5-Mono-Topper-Zenski-topper-Prirodna-ljudska-kosa-4-scaled.jpg |

### Category: Ponytails - Straight 75cm (Repovi - Ravni)
| # | Name | Price | Sale | Image URL |
|---|------|-------|------|-----------|
| 1 | Rep – #6 Smeđi Ravni 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-ravni-75cm-umjetno-vlakno-eynna-hair-sarajevo-3-scaled.jpeg |
| 2 | Rep – #4 Smeđi Ravni 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-–-4-Smedji-–-Ravni-75-cm-–-Umjetni-rep.jpg |
| 3 | Rep – Ombre Smeđi Ravni 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-ravni-75cm-umjetno-vlakno-eynna-hair-sarajevo-12.png |
| 4 | Rep – 613 Ravni 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-613-umjetno-vlakno-Eynna-hair-sarajevo-5.png |
| 5 | Rep – Crni Ravni 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/01/rep-za-kosu-crni-ravni-75cm-umjetno-vlakno-prirodan-izgled-eynna-human-hair-3-scaled-scaled-1-scaled.jpg |
| 6 | Rep – Ombre Ash Blonde Ravni 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-Ombre-ash-blonde-Eynna-hair-Sarajevo-Umjetno-vlakno-8.jpg |
| 7 | Rep – Piano Pramenovi Ravni 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-Piano-pramenovi-ravni-Eynna-hair-sarajevo-Umjetni-rep-1.png |
| 8 | Rep – Ash Blonde Ravni 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-Ash-Blonde-ravni-75cm-Umjetni-rep-6.png |
| 9 | Rep – Ombre Pepeljasti Ravni 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/01/rep-za-kosu-ombre-pepeljasti-ravni-eynna-human-hair-9.png |
| 10 | Rep – Zlatno Plavi Ravni 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/01/rep-za-kosu-zlatno-plavi-ravni-75cm-prirodan-izgled-eynna-human-hair-18-scaled-1-scaled.jpg |
| 11 | Rep – #10 Smeđi Ravni 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/01/rep-za-kosu-10-smedji-ravni-75cm-prirodan-izgled-eynna-human-hair-1.png |
| 12 | Rep – Ombre Rose Pink Ravni 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/01/rep-za-kosu-ombre-rose-pink-ravni-75cm-premium-kvalitet-eynna-human-hair-1-scaled.png-scaled.webp |

### Category: Ponytails - Curly 75cm (Repovi - Kovrčavi)
| # | Name | Price | Sale | Image URL |
|---|------|-------|------|-----------|
| 1 | Rep – 613 Kovrčavi 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-613-umjetno-vlakno-Eynna-hair-sarajevo-5.jpg |
| 2 | Rep – Crni Kovrčavi 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/01/rep-za-kosu-crni-kovrdjavi-eynna-human-hair-9-scaled-scaled-1-scaled.jpg |
| 3 | Rep – #4 Kovrčavi 75cm | KM65 | - | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-kovrdjavi-75cm-Umjetno-vlakno-Eynna-hair-Sarajevo-2-scaled.jpeg |
| 4 | Rep – Kovrčavi 75cm (default) | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-kovrdjavi-75cm-Umjetno-vlakno-Eynna-hair-Sarajevo-7-scaled.jpeg |
| 5 | Rep – Ombre Pepeljasti Kovrčavi 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/01/rep-za-kosu-ombre-pepeljasti-kovrdjavi-75cm-eynna-human-hair-3-scaled-1-scaled.jpg |
| 6 | Rep – Ombre Smeđi Kovrčavi 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-kovrdjavi-75cm-Umjetno-vlakno-Eynna-hair-Sarajevo-2.png |
| 7 | Rep – Piano Pramenovi Kovrčavi 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-Piano-pramenovi-kovrdjavi-Eynna-hair-sarajevo-Umjetni-rep-1-1.png |
| 8 | Rep – Zlatno Plavi Kovrčavi 75cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/01/rep-za-kosu-zlatno-plavi-kovrdjavi-75cm-umjetno-vlakno-eynna-human-hair-1.png |

### Category: Ponytails - Wavy 80cm (Repovi - Uvijeni)
| # | Name | Price | Sale | Image URL |
|---|------|-------|------|-----------|
| 1 | Rep – 613 Uvijeni 80cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-613-umjetno-vlakno-Eynna-hair-sarajevo-24.png |
| 2 | Rep – #10 Smeđi Uvijeni 80cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-10-smedji-uvijeni-80cm-Umjetno-vlakno-1-scaled.jpeg |
| 3 | Rep – Ombre Smeđi Uvijeni 80cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-ombre-smedji-uvijeni-80cm-umjetno-vlakno-1-scaled.jpeg |
| 4 | Rep – #6 Smeđi Uvijeni 80cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-–-6-Smedji-–-Uvijeni-80-cm-–-Umjetni-rep-Eynna-Hair-Sarajevo-2.png |
| 5 | Rep – #4 Smeđi Uvijeni 80cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/02/Rep-za-kosu-–-4-Smedji-–-uvijeni-80-cm-–-Umjetni-rep-Eynna-Hair-Sarajevo-1-scaled.jpeg |
| 6 | Rep – Crni Uvijeni 80cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/01/rep-za-kosu-crni-uvijeni-eynna-human-hair-1-24867371122828.jpg |
| 7 | Rep – Ombre Pepeljasti Uvijeni 80cm Premium | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/01/rep-za-kosu-ombre-pepeljasti-uvijeni-80cm-premium-kvalitet-eynna-human-hair-10-scaled-1-scaled.jpg |
| 8 | Rep – Zlatno Plavi Uvijeni 80cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/01/rep-za-kosu-zlatno-plavi-uvijeni-eynna-human-hair-1-24721671913612-scaled-scaled-1-scaled.jpg |

### Category: Premium Ponytails 85-90cm
| # | Name | Price | Sale | Image URL |
|---|------|-------|------|-----------|
| 1 | Rep – Ombre Ash Blonde 90cm | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/01/rep-za-kosu-ombre-blonde-ravni-85cm-200g-umjetno-vlakno-eynna-human-hair-2-scaled-1-scaled.png |
| 2 | Rep – Platinum 85cm 200g Premium | KM70 | KM65 | https://eynna-hair.ba/wp-content/uploads/2026/01/rep-za-kosu-platinum-ravni-85cm-200g-premium-kvalitet-eynna-human-hair-5-scaled-1-scaled.png |

### Category: Wigs - Natural Human Hair (Perike od prirodne kose)
| # | Name | Original | Sale | Image URL |
|---|------|----------|------|-----------|
| 1 | Perika – Bob Pramenovi Piano | KM850 | KM800 | https://eynna-hair.ba/wp-content/uploads/2026/01/perika-od-prirodne-ljudske-kose-bob-pramenovi-piano-eynna-human-hair-6.jpg |
| 2 | Perika – Balayage Ombre Ash Blonde | KM1700 | KM1600 | https://eynna-hair.ba/wp-content/uploads/2026/01/perika-od-prirodne-ljudske-kose-balayage-ombre-ash-blonde-eynna-human-hair-1.jpg |
| 3 | Perika – Platinum Valovita | KM1700 | KM1600 | https://eynna-hair.ba/wp-content/uploads/2026/01/perika-od-prirodne-ljudske-kose-platinum-valovita-eynna-human-hair-2.jpg |
| 4 | Perika – Ombre Platinum Valovita Premium | KM1600 | KM1550 | https://eynna-hair.ba/wp-content/uploads/2026/01/premium_ljudska_kosa_eynna_human_hair.jpg |
| 5 | Perika – Valovita Balayage | KM1700 | KM1600 | https://eynna-hair.ba/wp-content/uploads/2026/01/perika-od-prirodne-ljudske-kose-valovita-balayage-eynna-human-hair-1.jpg |
| 6 | Perika – Ombre Blonde Highlights | KM1600 | KM1550 | https://eynna-hair.ba/wp-content/uploads/2026/01/perika-od-prirodne-ljudske-kose-piano-pramenovi-ombre-blonde-eynna-human-hair-1.jpg |
| 7 | Perika – Smeđa Ravna Kratka | KM1200 | KM1100 | https://eynna-hair.ba/wp-content/uploads/2026/02/Perika-od-prirodne-ljudske-kose-Eynna-hair-Sarajevo-Premium-kvalitet-6.jpg |

### Category: Wigs - Protein Fiber (Perike proteinsko vlakno)
| # | Name | Price | Image URL |
|---|------|-------|-----------|
| 1 | Perika PV – Balayage Valovita | KM170 | https://eynna-hair.ba/wp-content/uploads/2026/01/perika-proteinsko-vlakno-balayage-valovita-ombre-ash-blonde-eynna-human-hair-8.jpg |
| 2 | Perika PV – Piano Kovrčava | KM180 | https://eynna-hair.ba/wp-content/uploads/2026/01/perika-proteinsko-vlakno-piano-kovrdjava-prirodan-izgled-eynna-human-hair-1.jpg |
| 3 | Perika PV – Crna Valovita | KM160 | https://eynna-hair.ba/wp-content/uploads/2026/01/perika-proteinsko-vlakno-crna-valovita-prirodan-izgled-eynna-human-hair-2.jpg |
| 4 | Perika PV – Ombre Smeđa Uvijena | KM160 | https://eynna-hair.ba/wp-content/uploads/2026/01/perika-proteinsko-vlakno-ombre-smedja-uvijena-eynna-human-hair-2.jpg |

### Category: Extensions - Natural Human Hair (Ekstenzije)
| # | Name | Price | Image URL |
|---|------|-------|-----------|
| 1 | Prirodna kosa 65cm – Tape In – 1kg | KM1200 | https://eynna-hair.ba/wp-content/uploads/2026/01/Ekstenzije-od-prirodne-ljudske-kose-Tape-in-2.jpg |
| 2 | Prirodna kosa 65cm – Keratin – 1kg | KM1200 | https://eynna-hair.ba/wp-content/uploads/2026/01/Prirodna-ljudska-kosa-65cm-Keratin.jpg |
| 3 | Prirodna kosa 65cm – Premium – 1kg | KM1200 | https://eynna-hair.ba/wp-content/uploads/2026/01/Prirodna-ljudska-kosa-65cm-–-kopija.jpg |
| 4 | Prirodna kosa – Klipse – 65cm – 1kg | KM1200 | https://eynna-hair.ba/wp-content/uploads/2026/01/Ekstenzije-od-prirodne-ljudske-kose-Klipse-1.jpg |

### Category: Clip-in Extensions - Synthetic (Ekstenzije na klipse)
| # | Name | Original | Sale | Image URL |
|---|------|----------|------|-----------|
| 1 | Ekstenzije Klipse – Svjetlije Nijanse | KM70 | KM60 | https://eynna-hair.ba/wp-content/uploads/2026/01/ekstenzije-za-kosu-umjetno-vlakno-svijetlije-nijanse-eynna-human-hair-1-scaled-1-scaled.png |
| 2 | Ekstenzije Klipse – Crna Ravna i Uvijena | KM70 | KM60 | https://eynna-hair.ba/wp-content/uploads/2026/01/ekstenzije-na-klipse-umjetno-vlakno-crna-ravna-i-uvijena-eynna-human-hair-6-scaled-1-scaled.jpg |
| 3 | Ekstenzije Klipse – Tamne Nijanse | KM70 | KM60 | https://eynna-hair.ba/wp-content/uploads/2026/01/ekstenzije-na-klipse-umjetno-vlakno-tamne-nijanse-eynna-human-hair-14-scaled.png |

### Category: Bangs / Fringe (Šiškice)
| # | Name | Original | Sale | Image URL |
|---|------|----------|------|-----------|
| 1 | Šiškice – Prirodna Ljudska Kosa | KM55 | KM45 | https://eynna-hair.ba/wp-content/uploads/2026/01/siskice-ekstenzije-za-kosu-prirodna-ljudska-kosa-eynna-human-hair-3.webp |

## Total Products: ~50

## Contact Info
- Brand: Eynna hair Sarajevo
- Location: Sarajevo, Bosnia & Herzegovina
- Website: eynna-hair.ba

## Important Notes
- Download ALL product images to public/images/ and reference locally
- Every single product MUST be included — no skipping
- Prices in KM (Bosnian Convertible Mark)
- All product descriptions should be translated into all 10 languages
- WhatsApp integration for custom wig orders
- The site should be deployable to Vercel or GitHub Pages
