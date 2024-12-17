// Map initialization and configuration
export function initMap(containerId, options = {}) {
  const defaultOptions = {
    center: [-34.6037, -58.3816],
    zoom: 12
  };

  const mapOptions = { ...defaultOptions, ...options };
  
  try {
    if (typeof L === 'undefined') {
      console.error('Leaflet library not loaded');
      return;
    }

    const container = document.getElementById(containerId);
    if (!container) {
      console.error('Map container not found');
      return;
    }

    const map = L.map(containerId).setView(mapOptions.center, mapOptions.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    return map;
  } catch (error) {
    console.error('Error initializing map:', error);
  }
}