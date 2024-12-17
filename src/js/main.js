import { toggleMenu } from './utils/ui.js';
import { ProductSearch } from './components/search.js';
import { initMap } from './components/map.js';

// Initialize main functionality
document.addEventListener('DOMContentLoaded', () => {
  // Initialize menu
  const menuButton = document.querySelector('.menu-button');
  if (menuButton) {
    menuButton.addEventListener('click', toggleMenu);
  }

  // Initialize search if on relevant pages
  const searchContainer = document.querySelector('.search-container');
  if (searchContainer) {
    new ProductSearch({
      inputId: 'productSearch',
      containerId: 'searchResults'
    });
  }

  // Initialize map if on locations page
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    initMap('map');
  }

  // Handle scroll effects
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const hero = document.querySelector('.hero');
    
    if (window.scrollY > 50) {
      nav?.classList.add('scrolled');
      hero?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
      hero?.classList.remove('scrolled');
    }
  });
});