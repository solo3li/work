export const USERS = [
  { id: '1', username: 'john_doe', avatar: 'https://i.pravatar.cc/150?img=11', name: 'John Doe' },
  { id: '2', username: 'jane_smith', avatar: 'https://i.pravatar.cc/150?img=5', name: 'Jane Smith' },
  { id: '3', username: 'travel_blogger', avatar: 'https://i.pravatar.cc/150?img=33', name: 'Travel Blogger' },
  { id: '4', username: 'foodie_gal', avatar: 'https://i.pravatar.cc/150?img=44', name: 'Foodie Gal' },
  { id: '5', username: 'fitness_junkie', avatar: 'https://i.pravatar.cc/150?img=65', name: 'Fitness Junkie' },
  { id: '6', username: 'art_lover', avatar: 'https://i.pravatar.cc/150?img=16', name: 'Art Lover' },
];

export const STORIES = USERS.map((user, index) => ({
  ...user,
  hasSeen: index > 3,
}));

export const POSTS = [
  {
    id: '101',
    user: USERS[0],
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=800&auto=format&fit=crop',
    likes: 1234,
    caption: 'Exploring the hidden gems of nature. 🌿✨ #nature #wanderlust',
    comments: 45,
    timestamp: '2 hours ago',
  },
  {
    id: '102',
    user: USERS[1],
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    likes: 856,
    caption: 'Coffee shop aesthetics ☕️ #coffeelover',
    comments: 12,
    timestamp: '4 hours ago',
  },
  {
    id: '103',
    user: USERS[2],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    likes: 4321,
    caption: 'Beach days are the best days 🏖️☀️',
    comments: 108,
    timestamp: '1 day ago',
  },
  {
    id: '104',
    user: USERS[3],
    image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=800&auto=format&fit=crop',
    likes: 672,
    caption: 'Amazing street food! 🍜🔥',
    comments: 32,
    timestamp: '2 days ago',
  },
];

export const REELS = [
  {
    id: '201',
    user: USERS[4],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
    likes: '10.2K',
    comments: '450',
    caption: 'Workout of the day! 💪 #fitness',
  },
  {
    id: '202',
    user: USERS[5],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smart-phone-with-a-blank-screen-95-large.mp4',
    likes: '5.6K',
    comments: '120',
    caption: 'Creating something new today 🎨',
  },
];
