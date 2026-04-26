export const users = [
  { id: '1', name: 'Mark Zuckerberg', avatar: 'https://i.pravatar.cc/150?u=1', isOnline: true },
  { id: '2', name: 'Sheryl Sandberg', avatar: 'https://i.pravatar.cc/150?u=2', isOnline: false },
  { id: '3', name: 'Eduardo Saverin', avatar: 'https://i.pravatar.cc/150?u=3', isOnline: true },
  { id: '4', name: 'Dustin Moskovitz', avatar: 'https://i.pravatar.cc/150?u=4', isOnline: true },
  { id: '5', name: 'Chris Hughes', avatar: 'https://i.pravatar.cc/150?u=5', isOnline: false },
  { id: '6', name: 'Sean Parker', avatar: 'https://i.pravatar.cc/150?u=6', isOnline: true },
  { id: '7', name: 'Peter Thiel', avatar: 'https://i.pravatar.cc/150?u=7', isOnline: false },
  { id: '8', name: 'Elon Musk', avatar: 'https://i.pravatar.cc/150?u=8', isOnline: true },
  { id: '9', name: 'Steve Jobs', avatar: 'https://i.pravatar.cc/150?u=9', isOnline: false },
  { id: '10', name: 'Bill Gates', avatar: 'https://i.pravatar.cc/150?u=10', isOnline: true },
];

export const chatThreads = [
  {
    id: 't1',
    participants: [users[0], users[1]],
    lastMessage: 'Are we still on for the meeting?',
    lastMessageTime: '10:30 AM',
    unreadCount: 2,
  },
  {
    id: 't2',
    participants: [users[0], users[2]],
    lastMessage: 'Check out this new feature.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: 't3',
    participants: [users[0], users[3]],
    lastMessage: 'See you tomorrow!',
    lastMessageTime: 'Tuesday',
    unreadCount: 0,
  },
  {
    id: 't4',
    participants: [users[0], users[4]],
    lastMessage: 'Can you send the files?',
    lastMessageTime: 'Monday',
    unreadCount: 5,
  },
  {
    id: 't5',
    participants: [users[0], users[5]],
    lastMessage: 'That sounds like a great idea.',
    lastMessageTime: 'Sunday',
    unreadCount: 0,
  },
  {
    id: 't6',
    participants: [users[0], users[6]],
    lastMessage: 'Let\'s catch up soon.',
    lastMessageTime: 'Mar 15',
    unreadCount: 0,
  },
  {
    id: 't7',
    participants: [users[0], users[7]],
    lastMessage: 'Rocket launch was successful!',
    lastMessageTime: 'Mar 14',
    unreadCount: 1,
  },
  {
    id: 't8',
    participants: [users[0], users[8]],
    lastMessage: 'Stay hungry, stay foolish.',
    lastMessageTime: 'Mar 10',
    unreadCount: 0,
  },
];

export const messages = {
  't1': [
    { id: 'm1', text: 'Hi Mark!', senderId: '2', time: '10:00 AM' },
    { id: 'm2', text: 'Hey Sheryl, what\'s up?', senderId: '1', time: '10:05 AM' },
    { id: 'm3', text: 'Are we still on for the meeting?', senderId: '2', time: '10:30 AM' },
  ],
  't2': [
    { id: 'm4', text: 'Hey man', senderId: '3', time: 'Yesterday' },
    { id: 'm5', text: 'Hey Eduardo', senderId: '1', time: 'Yesterday' },
    { id: 'm6', text: 'Check out this new feature.', senderId: '3', time: 'Yesterday' },
  ],
  't7': [
    { id: 'm7', text: 'How is the metaverse going?', senderId: '8', time: 'Mar 14' },
    { id: 'm8', text: 'Going great! How are the rockets?', senderId: '1', time: 'Mar 14' },
    { id: 'm9', text: 'Rocket launch was successful!', senderId: '8', time: 'Mar 14' },
  ]
};

export const callsData = [
  { id: 'c1', user: users[1], time: 'Today, 10:30 AM', type: 'incoming', missed: true },
  { id: 'c2', user: users[3], time: 'Yesterday, 8:15 PM', type: 'outgoing', missed: false },
  { id: 'c3', user: users[5], time: 'Monday, 2:00 PM', type: 'incoming', missed: false },
  { id: 'c4', user: users[7], time: 'Sunday, 11:45 AM', type: 'outgoing', missed: true },
  { id: 'c5', user: users[8], time: 'Mar 14, 9:00 AM', type: 'incoming', missed: false },
];

export const storiesData = [
  { id: 's1', user: users[1], image: 'https://picsum.photos/id/1018/400/600', viewed: false },
  { id: 's2', user: users[3], image: 'https://picsum.photos/id/1015/400/600', viewed: false },
  { id: 's3', user: users[7], image: 'https://picsum.photos/id/1019/400/600', viewed: true },
  { id: 's4', user: users[8], image: 'https://picsum.photos/id/1016/400/600', viewed: true },
];

export const CURRENT_USER_ID = '1';
