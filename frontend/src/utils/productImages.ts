// Central mapping for local product imagery in `src/images`.
// This lets us reuse the same files in list views (thumbnails) and
// on the product detail page (full view).

import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img4 from '../images/4.jpg';
import img7 from '../images/7.jpg';
import img8 from '../images/8.jpg';
import img9 from '../images/9.jpg';
import img12 from '../images/12.jpg';
import img13 from '../images/13.jpg';
import img14 from '../images/14.jpg';
import img15 from '../images/15.jpg';
import img19 from '../images/19.jpg';
import img20 from '../images/20.jpg';
import imgD1 from '../images/D1.jpg';
import imgYYD1 from '../images/YY-D1.jpg';

const productImageMap: Record<string, string> = {
  // Core catalog products (seeded in db/seeds/seed.sql)
  'classic-silk-lash-extensions': img1,
  'volume-fan-lash-trays': img2,
  'hybrid-lash-extensions-mix': img4,
  'mega-volume-lash-collection': img7,
  'professional-lash-adhesive-prohold': img8,
  'precision-volume-tweezers': img9,
  'lash-cleanse-foaming-bath': img12,
  'prime-and-prep-lash-elixir': img13,

  // Extra images you can map to future products
  '__spare__14': img14,
  '__spare__15': img15,
  '__spare__19': img19,
  '__spare__20': img20,
  '__spare__D1': imgD1,
  '__spare__YYD1': imgYYD1,
};

export const getLocalProductImage = (slug: string): string | undefined =>
  productImageMap[slug];


