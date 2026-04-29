import { Platform } from 'react-native';

// Centralized configuration for API access
// This URL is generated via Cloudflare Tunnel
export const API_BASE_URL = 'https://specifics-protection-suddenly-beliefs.trycloudflare.com'; 

// For local development fallback if needed
const DEV_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5035' : 'http://localhost:5035';

export const API_URL = `${API_BASE_URL}/api`;

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const headers: HeadersInit = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // Ignored
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) return null;

  try {
      return await response.json();
  } catch(e) {
      return null;
  }
};
