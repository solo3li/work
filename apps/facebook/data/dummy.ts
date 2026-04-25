export const USERS = [
  { id: 'u1', name: 'Mark Zuckerberg', avatar: 'https://i.pravatar.cc/150?u=u1' },
  { id: 'u2', name: 'Sheryl Sandberg', avatar: 'https://i.pravatar.cc/150?u=u2' },
  { id: 'u3', name: 'Eduardo Saverin', avatar: 'https://i.pravatar.cc/150?u=u3' },
  { id: 'u4', name: 'Dustin Moskovitz', avatar: 'https://i.pravatar.cc/150?u=u4' },
  { id: 'u5', name: 'Chris Hughes', avatar: 'https://i.pravatar.cc/150?u=u5' },
];

export const CURRENT_USER = USERS[0];

export const STORIES = [
  { id: 's1', user: USERS[0], image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', isAddStory: true },
  { id: 's2', user: USERS[1], image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 's3', user: USERS[2], image: 'https://images.unsplash.com/photo-1533227268428-f9ed0900f4f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 's4', user: USERS[3], image: 'https://images.unsplash.com/photo-1506744626753-1fa7604d4565?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 's5', user: USERS[4], image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

export const POSTS = [
  {
    id: 'p1',
    user: USERS[1],
    time: '2 hrs',
    content: 'Just launched a new feature! So excited for everyone to try it out. Let me know what you think in the comments! 🚀',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    likes: 120,
    comments: 45,
    shares: 12,
  },
  {
    id: 'p2',
    user: USERS[2],
    time: '5 hrs',
    content: 'Beautiful day in San Francisco! ☀️',
    image: null,
    likes: 85,
    comments: 10,
    shares: 2,
  },
  {
    id: 'p3',
    user: USERS[3],
    time: '1 day',
    content: 'Throwback to an amazing trip! Can\'t wait to go back soon.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    likes: 340,
    comments: 89,
    shares: 45,
  },
  {
    id: 'p4',
    user: USERS[4],
    time: '2 days',
    content: 'Just published a new blog post on React Native Reanimated. Check it out!',
    image: null,
    likes: 56,
    comments: 4,
    shares: 8,
  }
];

export const NOTIFICATIONS = [
  { id: 'n1', user: USERS[1], action: 'liked your post', time: '10 mins ago', isRead: false },
  { id: 'n2', user: USERS[2], action: 'commented on your photo', time: '1 hr ago', isRead: false },
  { id: 'n3', user: USERS[3], action: 'mentioned you in a comment', time: '3 hrs ago', isRead: true },
  { id: 'n4', user: USERS[4], action: 'sent you a friend request', time: '1 day ago', isRead: true },
];

export const VIDEOS = [
  {
    id: 'v1',
    user: USERS[2],
    time: 'Just now',
    title: 'Amazing React Native Animation Tutorial! 🎬',
    views: '1.2M',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'v2',
    user: USERS[3],
    time: '4 hrs',
    title: 'Coding ASMR - Mechanical Keyboard Sounds',
    views: '845K',
    thumbnail: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export const MARKETPLACE_ITEMS = [
  { id: 'm1', title: 'MacBook Pro M2', price: '$1200', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 'm2', title: 'Herman Miller Chair', price: '$450', location: 'Oakland, CA', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 'm3', title: 'Sony A7III Camera', price: '$1500', location: 'San Jose, CA', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 'm4', title: 'Nintendo Switch', price: '$200', location: 'Berkeley, CA', image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
];
