export const SERVERS = [
  { id: '1', name: 'General', icon: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=200' },
  { id: '2', name: 'Gaming', icon: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=200' },
  { id: '3', name: 'Music', icon: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=200' },
  { id: '4', name: 'Art', icon: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=200' },
];

export const CHANNELS = {
  '1': [
    { id: '101', name: 'welcome', type: 'text' },
    { id: '102', name: 'general', type: 'text' },
    { id: '103', name: 'announcements', type: 'text' },
    { id: '104', name: 'Lobby', type: 'voice' },
  ],
  '2': [
    { id: '201', name: 'lfg', type: 'text' },
    { id: '202', name: 'clips', type: 'text' },
    { id: '203', name: 'Squad', type: 'voice' },
  ],
  '3': [
    { id: '301', name: 'recommendations', type: 'text' },
    { id: '302', name: 'Listening Party', type: 'voice' },
  ],
  '4': [
    { id: '401', name: 'showcase', type: 'text' },
    { id: '402', name: 'feedback', type: 'text' },
  ],
};

export const USERS = {
  'u1': { id: 'u1', name: 'Alice', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  'u2': { id: 'u2', name: 'Bob', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  'u3': { id: 'u3', name: 'Charlie', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
  'u4': { id: 'u4', name: 'Diana', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
};

export const MESSAGES = {
  '102': [
    { id: 'm1', userId: 'u1', content: 'Hello everyone! Welcome to the general channel.', timestamp: 'Today at 10:00 AM' },
    { id: 'm2', userId: 'u2', content: 'Hey Alice, how are you doing today?', timestamp: 'Today at 10:05 AM' },
    { id: 'm3', userId: 'u3', content: 'Good morning folks! Ready to build something amazing.', timestamp: 'Today at 10:15 AM' },
    { id: 'm4', userId: 'u1', content: 'Doing great, just working on a new React Native project.', timestamp: 'Today at 10:20 AM' },
    { id: 'm5', userId: 'u4', content: 'Wow, this looks awesome. Are you using Expo Router?', timestamp: 'Today at 10:25 AM' },
    { id: 'm6', userId: 'u1', content: 'Yes! It makes building universal apps a breeze.', timestamp: 'Today at 10:30 AM' },
    { id: 'm61', userId: 'u2', content: 'That is so cool. I love the routing system.', timestamp: 'Today at 10:32 AM' },
  ],
  '201': [
    { id: 'm7', userId: 'u3', content: 'Anyone playing Valorant tonight?', timestamp: 'Yesterday at 8:00 PM' },
    { id: 'm8', userId: 'u2', content: 'I am down. What time?', timestamp: 'Yesterday at 8:15 PM' },
    { id: 'm9', userId: 'u4', content: 'Count me in too! I will be online around 9.', timestamp: 'Yesterday at 8:30 PM' },
  ],
  '101': [
    { id: 'w1', userId: 'u1', content: 'Welcome to the server! Please read the rules.', timestamp: '2 days ago' }
  ]
};

export const getMessagesForChannel = (channelId: string) => {
  return MESSAGES[channelId as keyof typeof MESSAGES] || [];
};

export const getChannelsForServer = (serverId: string) => {
  return CHANNELS[serverId as keyof typeof CHANNELS] || [];
};
