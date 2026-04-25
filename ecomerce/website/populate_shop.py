import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from shop.models import Category, Product

def populate():
    print("Clearing existing data...")
    Product.objects.all().delete()
    Category.objects.all().delete()

    # New Curated Luxury Categories
    categories_data = [
        {'name': 'Grand Complications', 'slug': 'grand-complications'},
        {'name': 'Haute Couture', 'slug': 'haute-couture'},
        {'name': 'Artisan Leather', 'slug': 'artisan-leather'},
        {'name': 'Elite Fragrance', 'slug': 'elite-fragrance'},
        {'name': 'Precious Jewelry', 'slug': 'precious-jewelry'},
    ]

    categories = {}
    for cat_data in categories_data:
        cat = Category.objects.create(name=cat_data['name'], slug=cat_data['slug'])
        categories[cat_data['slug']] = cat

    # New "Real" Luxury Products
    products = [
        {
            'category': categories['grand-complications'],
            'name': 'The Royal Oak Chronograph',
            'slug': 'royal-oak-chronograph',
            'description': 'A symbol of uncompromising luxury. Brushed steel casing with a "Grande Tapisserie" pattern dial and integrated bracelet.',
            'price': 45000.00,
            'image_url': 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
        },
        {
            'category': categories['grand-complications'],
            'name': 'Patek Philippe Nautilus',
            'slug': 'patek-nautilus',
            'description': 'The pinnacle of sports elegance. Featuring a horizontally embossed dial and an exceptionally thin mechanical movement.',
            'price': 115000.00,
            'image_url': 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
        },
        {
            'category': categories['artisan-leather'],
            'name': 'The Birkin Noir 35',
            'slug': 'birkin-noir-35',
            'description': 'Handcrafted from Togo leather with palladium hardware. A timeless investment piece that defines the heritage of leather-making.',
            'price': 22500.00,
            'image_url': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
        },
        {
            'category': categories['artisan-leather'],
            'name': 'Monogram Valise',
            'slug': 'monogram-valise',
            'description': 'Classic travel luggage featuring reinforced corners and the iconic hand-painted monogram canvas.',
            'price': 5800.00,
            'image_url': 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
        },
        {
            'category': categories['haute-couture'],
            'name': 'Silk Evening Gown',
            'slug': 'silk-evening-gown',
            'description': 'Flowing midnight silk with hand-sewn crystal embellishments. Designed for moments that require absolute grace.',
            'price': 8900.00,
            'image_url': 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
        },
        {
            'category': categories['elite-fragrance'],
            'name': 'Baccarat Rouge 540',
            'slug': 'baccarat-rouge',
            'description': 'A poetic alchemy of jasmine, saffron, and cedarwood. A radiant and highly sophisticated signature scent.',
            'price': 620.00,
            'image_url': 'https://images.unsplash.com/photo-1583467875263-d50dec37a88c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
        },
        {
            'category': categories['precious-jewelry'],
            'name': 'Cartier Love Bracelet',
            'slug': 'cartier-love-bracelet',
            'description': '18k yellow gold set with 4 brilliant-cut diamonds. A universal symbol of love and commitment.',
            'price': 12100.00,
            'image_url': 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
        },
        {
            'category': categories['haute-couture'],
            'name': 'Velvet Tuxedo Jacket',
            'slug': 'velvet-tuxedo',
            'description': 'Deep emerald velvet with silk grosgrain lapels. The ultimate statement in formal masculinity.',
            'price': 3400.00,
            'image_url': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
        }
    ]

    for p in products:
        Product.objects.create(
            category=p['category'],
            name=p['name'],
            slug=p['slug'],
            description=p['description'],
            price=p['price'],
            image_url=p['image_url'],
            available=True
        )

    print("Success: Database cleared and repopulated with elite luxury items.")

if __name__ == '__main__':
    populate()
