export const SPORTS_CATEGORIES = [
  { id: '1', name: 'Football', icon: 'football' },
  { id: '2', name: 'Basketball', icon: 'basketball' },
  { id: '3', name: 'Tennis', icon: 'tennisball' },
  { id: '4', name: 'Esports', icon: 'game-controller' },
];

export const LIVE_MATCHES = [
  {
    id: 'm1',
    sport: 'Football',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    score: '2 - 1',
    time: '75\'',
    odds: { home: 1.5, draw: 3.2, away: 4.5 },
  },
  {
    id: 'm2',
    sport: 'Basketball',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    score: '89 - 85',
    time: 'Q3 2:15',
    odds: { home: 1.8, draw: null, away: 2.1 },
  },
];

export const UPCOMING_MATCHES = [
  {
    id: 'u1',
    sport: 'Football',
    homeTeam: 'Manchester City',
    awayTeam: 'Arsenal',
    date: 'Today, 20:00',
    odds: { home: 1.9, draw: 3.5, away: 4.0 },
  },
  {
    id: 'u2',
    sport: 'Tennis',
    homeTeam: 'Alcaraz C.',
    awayTeam: 'Djokovic N.',
    date: 'Tomorrow, 15:00',
    odds: { home: 2.1, draw: null, away: 1.7 },
  },
];

export const CASINO_GAMES = [
  { id: 'c1', name: '7rbit Mega Moolah', type: 'Slots', image: 'https://via.placeholder.com/150/ff4500/ffffff?text=Slots' },
  { id: 'c2', name: 'Live Roulette', type: 'Live Casino', image: 'https://via.placeholder.com/150/ff4500/ffffff?text=Roulette' },
  { id: 'c3', name: 'Blackjack Pro', type: 'Cards', image: 'https://via.placeholder.com/150/ff4500/ffffff?text=Blackjack' },
  { id: 'c4', name: 'Aviator Crash', type: 'Crash', image: 'https://via.placeholder.com/150/ff4500/ffffff?text=Crash' },
];

export const TRANSACTIONS = [
  { id: 't1', type: 'Deposit', amount: 500, currency: 'USD', date: '2023-10-01', status: 'Completed' },
  { id: 't2', type: 'Withdraw', amount: -150, currency: 'USD', date: '2023-10-03', status: 'Pending' },
  { id: 't3', type: 'Bet Won', amount: 320, currency: 'USD', date: '2023-10-05', status: 'Completed' },
];

export const USER_PROFILE = {
  name: 'Ahmed Solo',
  username: '@ahmedsolo',
  balance: 1250.50,
  currency: 'USD',
  vipLevel: 'Gold',
  loyaltyPoints: 4500,
  avatar: 'https://via.placeholder.com/100/121212/F27405?text=AS',
};

export const PROMOTIONS = [
  { id: 'p1', title: 'Welcome Bonus 100%', description: 'Double your first deposit up to $500', code: 'WELCOME7RBIT' },
  { id: 'p2', title: 'Cashback 10%', description: 'Get 10% cashback on weekend losses', code: 'WEEKEND10' },
];