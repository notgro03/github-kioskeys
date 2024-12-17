// Form validation utilities
export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePhone(phone) {
  const regex = /^\+?[\d\s-]{8,}$/;
  return regex.test(phone);
}

export function validateRequired(value) {
  return value !== null && value !== undefined && value.trim() !== '';
}