import { api } from './api';
import { showSuccess, showError, showConfirm, showLoading, hideLoading } from './ui';
import { validate, validators } from './utils/validation';
import { storage } from './utils/storage';

class ProductManager {
  constructor() {
    this.products = [];
    this.currentProduct = null;
    this.imageUploader = null;
    this.initializeEventListeners();
    this.initializeImageUploader();
    this.loadProducts();
  }

  initializeEventListeners() {
    // Product form
    const form = document.getElementById('productForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleProductSubmit(e);
      });
    }

    // Search functionality
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
      searchInput.addEventListener('input', this.handleSearch.bind(this));
    }

    // Category filters
    const categoryFilters = document.querySelectorAll('[data-category]');
    categoryFilters.forEach(filter => {
      filter.addEventListener('click', () => {
        categoryFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        this.filterProducts(filter.dataset.category);
      });
    });
  }

  initializeImageUploader() {
    const uploader = document.getElementById('productImage');
    if (!uploader) return;

    this.imageUploader = uploadcare.Widget(uploader, {
      publicKey: '1985ca48f4d597426e30',
      tabs: 'file url',
      previewStep: true,
      clearable: true,
      multiple: false,
      crop: '16:9',
      imageShrink: '1024x1024',
      imageQuality: 0.8
    });

    this.imageUploader.onUploadComplete((fileInfo) => {
      const preview = document.getElementById('imagePreview');
      if (preview) {
        preview.src = fileInfo.cdnUrl;
        preview.style.display = 'block';
      }
    });
  }

  async loadProducts() {
    try {
      showLoading();
      const products = await api.getProducts();
      this.products = products;
      this.renderProducts();
      storage.set('products', products);
    } catch (error) {
      showError('Error al cargar los productos');
      console.error('Error loading products:', error);
      // Try to load from cache
      const cachedProducts = storage.get('products');
      if (cachedProducts) {
        this.products = cachedProducts;
        this.renderProducts();
      }
    } finally {
      hideLoading();
    }
  }

  renderProducts() {
    const container = document.getElementById('productsList');
    if (!container) return;

    container.innerHTML = this.products.map(product => `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <div class="product-actions">
            <button onclick="productManager.editProduct('${product.id}')" class="edit-button">
              <i class="fas fa-edit"></i>
            </button>
            <button onclick="productManager.deleteProduct('${product.id}')" class="delete-button">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="product-content">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-meta">
            <span class="product-category">${product.category}</span>
            <span class="product-price">$${product.price}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  async handleProductSubmit(e) {
    try {
      const form = e.target;
      const formData = new FormData(form);
      const productData = Object.fromEntries(formData.entries());

      // Validate required fields
      const validations = {
        name: [validators.required, validators.maxLength(100)],
        description: [validators.required],
        price: [validators.required],
        category: [validators.required]
      };

      for (const [field, rules] of Object.entries(validations)) {
        const { valid, error } = validate(productData[field], rules);
        if (!valid) {
          throw new Error(`Error en ${field}: ${error}`);
        }
      }

      showLoading();

      if (this.currentProduct) {
        // Update existing product
        await api.updateProduct(this.currentProduct.id, productData);
        showSuccess('Producto actualizado correctamente');
      } else {
        // Create new product
        await api.createProduct(productData);
        showSuccess('Producto creado correctamente');
      }

      // Reset form and reload products
      form.reset();
      this.currentProduct = null;
      document.getElementById('imagePreview').style.display = 'none';
      this.loadProducts();

    } catch (error) {
      showError(error.message || 'Error al guardar el producto');
      console.error('Error saving product:', error);
    } finally {
      hideLoading();
    }
  }

  async deleteProduct(id) {
    if (await showConfirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        showLoading();
        await api.deleteProduct(id);
        showSuccess('Producto eliminado correctamente');
        this.loadProducts();
      } catch (error) {
        showError('Error al eliminar el producto');
        console.error('Error deleting product:', error);
      } finally {
        hideLoading();
      }
    }
  }

  editProduct(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) return;

    this.currentProduct = product;
    const form = document.getElementById('productForm');
    if (!form) return;

    // Fill form fields
    Object.entries(product).forEach(([key, value]) => {
      const input = form.elements[key];
      if (input) {
        input.value = value;
      }
    });

    // Update image preview
    const preview = document.getElementById('imagePreview');
    if (preview && product.image) {
      preview.src = product.image;
      preview.style.display = 'block';
    }

    // Update form title
    const formTitle = document.querySelector('.form-title');
    if (formTitle) {
      formTitle.textContent = 'Editar Producto';
    }

    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth' });
  }

  handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
    this.renderProducts(filteredProducts);
  }

  filterProducts(category) {
    const filteredProducts = category === 'all' 
      ? this.products 
      : this.products.filter(product => product.category === category);
    this.renderProducts(filteredProducts);
  }
}

// Initialize product manager
const productManager = new ProductManager();
export { productManager };