import { auth } from './auth.js';

// Check authentication on admin pages
function checkAuth() {
  const isLoginPage = window.location.pathname.includes('/admin/login.html');
  
  if (!auth.isAuthenticated() && !isLoginPage) {
    window.location.href = '/admin/login.html';
    return false;
  }
  
  if (auth.isAuthenticated() && isLoginPage) {
    window.location.href = '/admin/';
    return false;
  }

  return true;
}

// Initialize admin interface
export function initializeAdmin() {
  if (!checkAuth()) return;

  // Add logout functionality
  const logoutButton = document.querySelector('[data-logout]');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => auth.logout());
  }
}