export const DUMMY_CATEGORIES = [
  { id: 1, name: 'Grand Complications', slug: 'grand-complications' },
  { id: 2, name: 'Haute Couture', slug: 'haute-couture' },
  { id: 3, name: 'Artisan Leather', slug: 'artisan-leather' },
  { id: 4, name: 'Elite Fragrance', slug: 'elite-fragrance' },
  { id: 5, name: 'Precious Jewelry', slug: 'precious-jewelry' },
];

export const DUMMY_PRODUCTS = [
  {
    id: 1,
    category: DUMMY_CATEGORIES[0],
    name: 'The Royal Oak Chronograph',
    slug: 'royal-oak-chronograph',
    description: 'A symbol of uncompromising luxury. Brushed steel casing with a "Grande Tapisserie" pattern dial and integrated bracelet.',
    price: 45000.00,
    image_url: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    category: DUMMY_CATEGORIES[0],
    name: 'Patek Philippe Nautilus',
    slug: 'patek-nautilus',
    description: 'The pinnacle of sports elegance. Featuring a horizontally embossed dial and an exceptionally thin mechanical movement.',
    price: 115000.00,
    image_url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    category: DUMMY_CATEGORIES[2],
    name: 'The Birkin Noir 35',
    slug: 'birkin-noir-35',
    description: 'Handcrafted from Togo leather with palladium hardware. A timeless investment piece that defines the heritage of leather-making.',
    price: 22500.00,
    image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 4,
    category: DUMMY_CATEGORIES[2],
    name: 'Monogram Valise',
    slug: 'monogram-valise',
    description: 'Classic travel luggage featuring reinforced corners and the iconic hand-painted monogram canvas.',
    price: 5800.00,
    image_url: 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 5,
    category: DUMMY_CATEGORIES[1],
    name: 'Silk Evening Gown',
    slug: 'silk-evening-gown',
    description: 'Flowing midnight silk with hand-sewn crystal embellishments. Designed for moments that require absolute grace.',
    price: 8900.00,
    image_url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 6,
    category: DUMMY_CATEGORIES[3],
    name: 'Baccarat Rouge 540',
    slug: 'baccarat-rouge',
    description: 'A poetic alchemy of jasmine, saffron, and cedarwood. A radiant and highly sophisticated signature scent.',
    price: 620.00,
    image_url: 'https://images.unsplash.com/photo-1583467875263-d50dec37a88c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 7,
    category: DUMMY_CATEGORIES[4],
    name: 'Cartier Love Bracelet',
    slug: 'cartier-love-bracelet',
    description: '18k yellow gold set with 4 brilliant-cut diamonds. A universal symbol of love and commitment.',
    price: 12100.00,
    image_url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 8,
    category: DUMMY_CATEGORIES[1],
    name: 'Velvet Tuxedo Jacket',
    slug: 'velvet-tuxedo',
    description: 'Deep emerald velvet with silk grosgrain lapels. The ultimate statement in formal masculinity.',
    price: 3400.00,
    image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  }
];

export const DUMMY_USER = {
  id: 1,
  email: 'guest@lcwiki.com',
  username: 'luxury_guest',
  is_email_verified: true,
  is_2fa_enabled: true
};

export const DUMMY_ORDERS = [
  {
    id: 1001,
    created: '2026-04-20T10:00:00Z',
    total_cost: 115000.00,
    status: 'delivered',
    items: [
      { id: 1, product_name: 'Patek Philippe Nautilus', quantity: 1, price: 115000.00 }
    ]
  },
  {
    id: 1002,
    created: '2026-04-25T15:30:00Z',
    total_cost: 620.00,
    status: 'processing',
    items: [
      { id: 2, product_name: 'Baccarat Rouge 540', quantity: 1, price: 620.00 }
    ]
  }
];
