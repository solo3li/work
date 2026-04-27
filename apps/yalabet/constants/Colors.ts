const tintColorDark = '#F27405'; // Vibrant orange like 1xbit
const tintColorLight = '#F27405';

export default {
  light: {
    text: '#000',
    background: '#f4f4f4',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    card: '#fff',
    border: '#e0e0e0',
    success: '#4CAF50',
    danger: '#F44336',
    header: '#fff',
  },
  dark: {
    text: '#fff',
    background: '#121212', // Dark background
    tint: tintColorDark,
    tabIconDefault: '#888',
    tabIconSelected: tintColorDark,
    card: '#1E1E1E', // Slightly lighter dark for cards
    border: '#2C2C2C',
    success: '#00C853',
    danger: '#D50000',
    header: '#1a1a1a',
  },
};