import Swal from 'sweetalert2';

export function showSuccess(message, timer = 2000) {
  return Swal.fire({
    title: '¡Éxito!',
    text: message,
    icon: 'success',
    timer,
    showConfirmButton: false,
    position: 'top-end',
    toast: true
  });
}

export function showError(message) {
  return Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error',
    position: 'top-end',
    toast: true,
    timer: 3000,
    showConfirmButton: false
  });
}

export function showConfirm(message) {
  return Swal.fire({
    title: '¿Estás seguro?',
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar'
  });
}

export function updatePreview(imageUrl, previewElement) {
  if (!previewElement) return;
  
  const img = previewElement instanceof HTMLImageElement ? 
    previewElement : 
    previewElement.querySelector('img');

  if (img) {
    img.src = imageUrl;
    img.onerror = () => {
      img.src = 'https://via.placeholder.com/200x200?text=Error+de+imagen';
    };
  }
}

export function initializeUploadcare(element, options = {}) {
  const widget = uploadcare.Widget(element, {
    publicKey: '1985ca48f4d597426e30',
    tabs: 'file url',
    previewStep: true,
    clearable: true,
    multiple: false,
    ...options
  });

  return widget;
}