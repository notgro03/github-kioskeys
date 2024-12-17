// Configuration constants
export const UPLOADCARE_CONFIG = {
  publicKey: '1985ca48f4d597426e30',
  tabs: 'file url',
  previewStep: true,
  clearable: true,
  multiple: false,
  imagesOnly: true,
  crop: '1:1'
};

export const DB_CONFIG = {
  name: 'kioskeysDB',
  version: 1,
  stores: {
    brands: '++id, name, type, logo',
    products: '++id, name, brandId, category, price, description, image',
    categories: '++id, name, description',
    settings: 'key, value'
  }
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'kioskeys_auth_token',
  USER_DATA: 'kioskeys_user_data',
  THEME: 'kioskeys_theme',
  LOGO: 'kioskeys_logo'
};

export const API_BASE_URL = '/api';