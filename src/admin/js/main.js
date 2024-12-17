import { BrandsManager } from './brands.js';
import { db } from './utils/db.js';

// Initialize admin interface
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await db.open();
    window.brandsManager = new BrandsManager();
  } catch (error) {
    console.error('Error initializing admin panel:', error);
  }
});