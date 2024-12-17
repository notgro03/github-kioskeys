// Map initialization and configuration
export const initMap = () => {
  try {
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
      console.error('Leaflet library not loaded');
      return;
    }

    // Check if map container exists
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('Map container not found');
      return;
    }

    // Initialize map
    const map = L.map('map').setView([-34.6037, -58.3816], 12);

    // Add tile layer with error handling
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    // Add sample service points
    const servicePoints = [
      { lat: -34.6037, lng: -58.3816, name: 'Centro' },
      { lat: -34.5997, lng: -58.3831, name: 'Recoleta' },
      { lat: -34.6084, lng: -58.3731, name: 'San Telmo' }
    ];

    // Add markers
    servicePoints.forEach(point => {
      L.marker([point.lat, point.lng])
        .bindPopup(`<b>Kioskeys ${point.name}</b>`)
        .addTo(map);
    });

    return map;
  } catch (error) {
    console.error('Error initializing map:', error);
  }
};