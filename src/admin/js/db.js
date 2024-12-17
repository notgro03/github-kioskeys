import Dexie from 'dexie';

// Create database
const db = new Dexie('kioskeysDB');

// Define schema
db.version(1).stores({
  brands: '++id, name, type, logo',
  products: '++id, name, brandId, category, price, description, image',
  categories: '++id, name, description',
  settings: 'key, value'
});

export { db };