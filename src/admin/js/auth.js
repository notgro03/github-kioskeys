import { STORAGE_KEYS } from './config.js';
import { showError } from './ui.js';

class Auth {
  constructor() {
    this.token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    this.user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_DATA));
  }

  isAuthenticated() {
    return !!this.token;
  }

  async login(username, password) {
    try {
      // For demo purposes, using hardcoded credentials
      // In production, this should validate against a secure backend
      if (username === 'admin' && password === 'kioskeys2024') {
        const token = 'demo-token-' + Date.now();
        const userData = {
          id: 1,
          username: 'admin',
          role: 'administrator'
        };

        this.token = token;
        this.user = userData;

        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));

        return true;
      }
      throw new Error('Credenciales inválidas');
    } catch (error) {
      showError(error.message);
      return false;
    }
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    window.location.href = '/admin/login.html';
  }
}

export const auth = new Auth();