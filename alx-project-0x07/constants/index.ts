// Environment Variables with Fallbacks
const ENV = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'AI Image Generator',
  APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Generate amazing AI-powered images',
  DEFAULT_IMAGE_SIZE: process.env.NEXT_PUBLIC_DEFAULT_IMAGE_SIZE || '1024x1024',
  ENABLE_IMAGE_SAVING: process.env.NEXT_PUBLIC_ENABLE_IMAGE_SAVING !== 'false',
  ENABLE_SHARING: process.env.NEXT_PUBLIC_ENABLE_SHARING !== 'false',
  RATE_LIMIT_REQUESTS: parseInt(process.env.NEXT_PUBLIC_RATE_LIMIT_REQUESTS || '10', 10),
  RATE_LIMIT_INTERVAL: parseInt(process.env.NEXT_PUBLIC_RATE_LIMIT_INTERVAL || '3600', 10),
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  GENERATE_IMAGE: `${ENV.API_BASE_URL}/generate-image`,
} as const;

// App Constants
export const APP_CONSTANTS = {
  APP_NAME: ENV.APP_NAME,
  APP_DESCRIPTION: ENV.APP_DESCRIPTION,
  MAX_PROMPT_LENGTH: 500,
  DEFAULT_IMAGE_SIZE: ENV.DEFAULT_IMAGE_SIZE as '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792',
  MAX_IMAGES_PER_REQUEST: 4,
  SUPPORTED_IMAGE_SIZES: ['256x256', '512x512', '1024x1024', '1792x1024', '1024x1792'] as const,
  ENABLE_IMAGE_SAVING: ENV.ENABLE_IMAGE_SAVING,
  ENABLE_SHARING: ENV.ENABLE_SHARING,
  RATE_LIMIT: {
    REQUESTS: ENV.RATE_LIMIT_REQUESTS,
    INTERVAL: ENV.RATE_LIMIT_INTERVAL,
  },
} as const;

// UI Constants
export const UI = {
  DEFAULT_THEME: 'light',
  THEMES: ['light', 'dark', 'system'] as const,
  GRID_COLUMNS: {
    DEFAULT: 1,
    SM: 2,
    MD: 3,
    LG: 4,
    XL: 5,
  },
  ALERT_DISPLAY_DURATION: 5000, // 5 seconds
  DEBOUNCE_DELAY: 300, // milliseconds
  ANIMATION: {
    DEFAULT_DURATION: 200,
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection and try again.',
  RATE_LIMIT: 'You have reached the maximum number of requests. Please try again later.',
  INVALID_INPUT: 'Please enter a valid prompt.',
  IMAGE_GENERATION_FAILED: 'Failed to generate image. Please try again with a different prompt.',
} as const;
