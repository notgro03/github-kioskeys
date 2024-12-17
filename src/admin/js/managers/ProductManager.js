import { carBrands, remoteTypes } from '../../../data/products.js';
import { showSuccess, showError } from '../ui.js';
import { db } from '../db.js';

export class ProductManager {
  constructor() {
    this.brands = carBrands;
    this.remoteTypes = remoteTypes;
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    const brandSelect = document.getElementById('brandSelect');
    const modelSelect = document.getElementById('modelSelect');
    const yearSelect = document.getElementById('yearSelect');

    if (brandSelect) {
      // Populate brands
      Object.keys(this.brands).forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
      });

      // Handle brand selection
      brandSelect.addEventListener('change', () => {
        const brand = brandSelect.value;
        this.updateModels(brand);
      });
    }

    if (modelSelect) {
      // Handle model selection
      modelSelect.addEventListener('change', () => {
        const brand = brandSelect.value;
        const model = modelSelect.value;
        this.updateYears(brand, model);
      });
    }
  }

  updateModels(brand) {
    const modelSelect = document.getElementById('modelSelect');
    const yearSelect = document.getElementById('yearSelect');

    modelSelect.innerHTML = '<option value="">Seleccionar modelo</option>';
    yearSelect.innerHTML = '<option value="">Seleccionar año</option>';

    if (brand && this.brands[brand]) {
      modelSelect.disabled = false;
      Object.keys(this.brands[brand].models).forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
      });
    } else {
      modelSelect.disabled = true;
      yearSelect.disabled = true;
    }
  }

  updateYears(brand, model) {
    const yearSelect = document.getElementById('yearSelect');
    yearSelect.innerHTML = '<option value="">Seleccionar año</option>';

    if (brand && model && this.brands[brand]?.models[model]) {
      yearSelect.disabled = false;
      const yearRanges = this.brands[brand].models[model];
      yearRanges.forEach(range => {
        const [start, end] = range.split('-').map(y => parseInt(y));
        for (let year = end; year >= start; year--) {
          const option = document.createElement('option');
          option.value = year.toString();
          option.textContent = year.toString();
          yearSelect.appendChild(option);
        }
      });
    } else {
      yearSelect.disabled = true;
    }
  }

  async saveProduct(productData) {
    try {
      await db.products.add(productData);
      showSuccess('Producto guardado correctamente');
      return true;
    } catch (error) {
      showError('Error al guardar el producto');
      console.error('Error saving product:', error);
      return false;
    }
  }

  async getProducts() {
    try {
      return await db.products.toArray();
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  }
}