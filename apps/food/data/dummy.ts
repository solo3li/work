export const CATEGORIES = [
  { id: 'c1', name: 'Burgers', icon: '🍔' },
  { id: 'c2', name: 'Pizza', icon: '🍕' },
  { id: 'c3', name: 'Sushi', icon: '🍣' },
  { id: 'c4', name: 'Desserts', icon: '🍰' },
  { id: 'c5', name: 'Drinks', icon: '🥤' },
  { id: 'c6', name: 'Healthy', icon: '🥗' },
];

export const RESTAURANTS = [
  {
    id: 'r1',
    name: 'Burger Joint',
    rating: 4.5,
    deliveryTime: '15-25 min',
    deliveryFee: 2.99,
    categoryIds: ['c1', 'c5'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80',
    description: 'The best burgers in town, made with 100% Angus beef and fresh ingredients.',
  },
  {
    id: 'r2',
    name: 'Pizza Paradise',
    rating: 4.8,
    deliveryTime: '20-35 min',
    deliveryFee: 0,
    categoryIds: ['c2', 'c5'],
    image: 'https://images.unsplash.com/photo-1604381536173-63ee515eb5f1?w=500&q=80',
    description: 'Authentic Italian pizza baked in a wood-fired oven. Try our famous Margherita!',
  },
  {
    id: 'r3',
    name: 'Sushi Master',
    rating: 4.7,
    deliveryTime: '30-45 min',
    deliveryFee: 3.99,
    categoryIds: ['c3', 'c6'],
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80',
    description: 'Premium sushi rolls, sashimi, and nigiri prepared by expert chefs.',
  },
  {
    id: 'r4',
    name: 'Sweet Tooth',
    rating: 4.9,
    deliveryTime: '10-20 min',
    deliveryFee: 1.49,
    categoryIds: ['c4'],
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&q=80',
    description: 'Delicious cakes, pastries, and ice cream to satisfy your sweet cravings.',
  },
  {
    id: 'r5',
    name: 'Green Bowl',
    rating: 4.6,
    deliveryTime: '15-30 min',
    deliveryFee: 1.99,
    categoryIds: ['c6'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80',
    description: 'Fresh and healthy salads, bowls, and smoothies.',
  },
];

export const MENU_ITEMS = [
  // Burger Joint
  { id: 'm1', restaurantId: 'r1', name: 'Classic Burger', description: 'Beef patty, lettuce, tomato, cheese', price: 8.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80' },
  { id: 'm2', restaurantId: 'r1', name: 'Double Bacon Burger', description: 'Two beef patties, bacon, double cheese, BBQ sauce', price: 12.99, image: 'https://images.unsplash.com/photo-1594212202863-71ab527e58a2?w=300&q=80' },
  { id: 'm3', restaurantId: 'r1', name: 'French Fries', description: 'Crispy golden fries', price: 3.49, image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=300&q=80' },
  
  // Pizza Paradise
  { id: 'm4', restaurantId: 'r2', name: 'Margherita Pizza', description: 'Tomato sauce, mozzarella, fresh basil', price: 14.99, image: 'https://images.unsplash.com/photo-1604381536173-63ee515eb5f1?w=300&q=80' },
  { id: 'm5', restaurantId: 'r2', name: 'Pepperoni Pizza', description: 'Tomato sauce, mozzarella, pepperoni slices', price: 16.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&q=80' },
  
  // Sushi Master
  { id: 'm6', restaurantId: 'r3', name: 'Dragon Roll', description: 'Eel, cucumber, topped with avocado', price: 15.99, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&q=80' },
  { id: 'm7', restaurantId: 'r3', name: 'Spicy Tuna Roll', description: 'Fresh tuna, spicy mayo, cucumber', price: 12.99, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&q=80' },
  
  // Sweet Tooth
  { id: 'm8', restaurantId: 'r4', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center', price: 7.99, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&q=80' },
  { id: 'm9', restaurantId: 'r4', name: 'Cheesecake', description: 'New York style cheesecake with strawberry topping', price: 6.99, image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=300&q=80' },
  
  // Green Bowl
  { id: 'm10', restaurantId: 'r5', name: 'Quinoa Salad', description: 'Quinoa, mixed greens, cherry tomatoes, feta cheese', price: 11.99, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80' },
  { id: 'm11', restaurantId: 'r5', name: 'Acai Bowl', description: 'Acai blend, granola, banana, mixed berries, honey', price: 9.99, image: 'https://images.unsplash.com/photo-1590137531778-d5d88691dfcc?w=300&q=80' },
];
