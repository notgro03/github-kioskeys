// UI utility functions
export function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

export function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  const menuButton = document.querySelector('.menu-button');
  
  if (navLinks && menuButton) {
    navLinks.classList.toggle('active');
    menuButton.classList.toggle('active');
  }
}