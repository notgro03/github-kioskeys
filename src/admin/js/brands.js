// Brand management functionality
import { showSuccess, showError } from './utils/ui.js';
import { db } from './utils/db.js';

export class BrandsManager {
  constructor() {
    this.brands = [];
    this.initializeEventListeners();
    this.loadBrands();
  }

  initializeEventListeners() {
    const form = document.getElementById('brandForm');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  async loadBrands() {
    try {
      const brands = await db.brands.toArray();
      this.renderBrands(brands);
    } catch (error) {
      showError('Error al cargar las marcas');
      console.error(error);
    }
  }

  renderBrands(brands) {
    const container = document.getElementById('brandsList');
    if (!container) return;

    container.innerHTML = brands.map(brand => `
      <div class="brand-card" data-id="${brand.id}">
        <img src="${brand.logo}" alt="${brand.name}" class="brand-logo">
        <div class="brand-info">
          <h3>${brand.name}</h3>
          <p>${brand.type}</p>
        </div>
        <div class="brand-actions">
          <button onclick="brandsManager.editBrand(${brand.id})" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button onclick="brandsManager.deleteBrand(${brand.id})" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  async handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const brandData = {
      name: formData.get('name'),
      type: formData.get('type'),
      logo: formData.get('logo')
    };

    try {
      await db.brands.add(brandData);
      showSuccess('Marca agregada correctamente');
      e.target.reset();
      document.getElementById('logoPreview').src = '/placeholder-logo.png';
      this.loadBrands();
    } catch (error) {
      showError('Error al guardar la marca');
      console.error(error);
    }
  }

  async deleteBrand(id) {
    try {
      await db.brands.delete(id);
      showSuccess('Marca eliminada correctamente');
      this.loadBrands();
    } catch (error) {
      showError('Error al eliminar la marca');
      console.error(error);
    }
  }

  async editBrand(id) {
    try {
      const brand = await db.brands.get(id);
      if (!brand) return;

      const form = document.getElementById('brandForm');
      if (!form) return;

      form.elements['id'].value = brand.id;
      form.elements['name'].value = brand.name;
      form.elements['type'].value = brand.type;
      form.elements['logo'].value = brand.logo;
      document.getElementById('logoPreview').src = brand.logo;
    } catch (error) {
      showError('Error al cargar la marca');
      console.error(error);
    }
  }
}