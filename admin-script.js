// Load products from localStorage or use default products
let products = JSON.parse(localStorage.getItem('adminProducts')) || [
    {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        description: "High-quality wireless headphones with noise cancellation and long battery life.",
        price: 99.99,
        originalPrice: 149.99,
        image: "🎧",
        category: "electronics",
        featured: true,
        badge: "Sale",
        stock: 25
    },
    {
        id: 2,
        title: "Smart Fitness Watch",
        description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring.",
        price: 199.99,
        originalPrice: 249.99,
        image: "⌚",
        category: "electronics",
        featured: true,
        badge: "New",
        stock: 15
    },
    {
        id: 3,
        title: "Premium Coffee Maker",
        description: "Brew the perfect cup of coffee every morning with this premium coffee maker.",
        price: 79.99,
        originalPrice: null,
        image: "☕",
        category: "home",
        featured: true,
        badge: null,
        stock: 30
    }
];

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
    renderProductsTable();
    renderCategories();
    updateAnalytics();
});

function initializeAdmin() {
    // Menu navigation
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const section = this.getAttribute('data-section');
            document.getElementById(section + '-section').classList.add('active');
            
            // Update analytics when analytics section is shown
            if (section === 'analytics') {
                updateAnalytics();
            }
        });
    });

    // Add product form
    document.getElementById('addProductForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewProduct();
    });

    // Edit product form
    document.getElementById('editProductForm').addEventListener('submit', function(e) {
        e.preventDefault();
        updateProduct();
    });

    // Store settings form
    document.getElementById('storeSettingsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveStoreSettings();
    });

    // Import file handler
    document.getElementById('importFile').addEventListener('change', function(e) {
        importData(e.target.files[0]);
    });
}

function addNewProduct() {
    const form = document.getElementById('addProductForm');
    const formData = new FormData(form);
    
    // Generate new ID
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    
    // Create new product object
    const newProduct = {
        id: newId,
        title: formData.get('title'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        originalPrice: formData.get('originalPrice') ? parseFloat(formData.get('originalPrice')) : null,
        image: formData.get('image') || '📦',
        category: formData.get('category'),
        featured: formData.get('featured') === 'on',
        badge: formData.get('badge') || null,
        stock: parseInt(formData.get('stock')) || 0
    };
    
    // Add to products array
    products.push(newProduct);
    
    // Save to localStorage
    saveProducts();
    
    // Update displays
    renderProductsTable();
    updateAnalytics();
    
    // Reset form
    form.reset();
    
    // Show success message
    showMessage('Product added successfully!', 'success');
    
    // Switch to products view
    showProductsSection();
}

function renderProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    
    tbody.innerHTML = products.map(product => {
        const stockClass = product.stock <= 5 ? 'stock-low' : product.stock <= 20 ? 'stock-medium' : 'stock-high';
        
        return `
            <tr>
                <td>${product.id}</td>
                <td class="product-image-cell">${product.image}</td>
                <td>${product.title}</td>
                <td>${product.category}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td class="${stockClass}">${product.stock}</td>
                <td>
                    ${product.featured ? 
                        '<span class="featured-badge">Featured</span>' : 
                        '<span class="not-featured">Not Featured</span>'
                    }
                </td>
                <td class="product-actions">
                    <button class="action-btn edit-btn" onclick="editProduct(${product.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Fill edit form
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductTitle').value = product.title;
    document.getElementById('editProductDescription').value = product.description;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductOriginalPrice').value = product.originalPrice || '';
    document.getElementById('editProductImage').value = product.image;
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductBadge').value = product.badge || '';
    document.getElementById('editProductFeatured').checked = product.featured;
    document.getElementById('editProductStock').value = product.stock;
    
    // Show modal
    document.getElementById('editProductModal').style.display = 'block';
}

function updateProduct() {
    const productId = parseInt(document.getElementById('editProductId').value);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) return;
    
    // Update product
    products[productIndex] = {
        ...products[productIndex],
        title: document.getElementById('editProductTitle').value,
        description: document.getElementById('editProductDescription').value,
        price: parseFloat(document.getElementById('editProductPrice').value),
        originalPrice: document.getElementById('editProductOriginalPrice').value ? 
            parseFloat(document.getElementById('editProductOriginalPrice').value) : null,
        image: document.getElementById('editProductImage').value,
        category: document.getElementById('editProductCategory').value,
        badge: document.getElementById('editProductBadge').value || null,
        featured: document.getElementById('editProductFeatured').checked,
        stock: parseInt(document.getElementById('editProductStock').value)
    };
    
    // Save and update
    saveProducts();
    renderProductsTable();
    updateAnalytics();
    closeEditModal();
    
    showMessage('Product updated successfully!', 'success');
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        saveProducts();
        renderProductsTable();
        updateAnalytics();
        showMessage('Product deleted successfully!', 'success');
    }
}

function closeEditModal() {
    document.getElementById('editProductModal').style.display = 'none';
}

function showAddProductForm() {
    // Remove active class from all links and sections
    document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    
    // Activate add product section
    document.querySelector('[data-section="add-product"]').classList.add('active');
    document.getElementById('add-product-section').classList.add('active');
}

function showProductsSection() {
    // Remove active class from all links and sections
    document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    
    // Activate products section
    document.querySelector('[data-section="products"]').classList.add('active');
    document.getElementById('products-section').classList.add('active');
}

function renderCategories() {
    const categories = [
        { name: 'Electronics', count: products.filter(p => p.category === 'electronics').length },
        { name: 'Fashion', count: products.filter(p => p.category === 'fashion').length },
        { name: 'Home & Garden', count: products.filter(p => p.category === 'home').length },
        { name: 'Sports', count: products.filter(p => p.category === 'sports').length },
        { name: 'Books', count: products.filter(p => p.category === 'books').length },
        { name: 'Beauty', count: products.filter(p => p.category === 'beauty').length }
    ];
    
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = categories.map(category => `
        <div class="category-card">
            <h3>${category.name}</h3>
            <p>${category.count} products</p>
            <button class="btn btn-primary">Manage</button>
        </div>
    `).join('');
}

function updateAnalytics() {
    const totalProducts = products.length;
    const featuredProducts = products.filter(p => p.featured).length;
    const totalCategories = 6;
    const averagePrice = products.length > 0 ? 
        (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2) : 0;
    
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('featuredProducts').textContent = featuredProducts;
    document.getElementById('totalCategories').textContent = totalCategories;
    document.getElementById('averagePrice').textContent = `$${averagePrice}`;
}

function saveProducts() {
    localStorage.setItem('adminProducts', JSON.stringify(products));
    // Also update the main products array for the store
    localStorage.setItem('storeProducts', JSON.stringify(products));
}

function exportProducts() {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.json';
    link.click();
    URL.revokeObjectURL(url);
    
    showMessage('Products exported successfully!', 'success');
}

function exportAllData() {
    const allData = {
        products: products,
        timestamp: new Date().toISOString(),
        version: '1.0'
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'shopping-center-data.json';
    link.click();
    URL.revokeObjectURL(url);
    
    showMessage('All data exported successfully!', 'success');
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        products = [];
        saveProducts();
        renderProductsTable();
        updateAnalytics();
        showMessage('All data cleared successfully!', 'success');
    }
}

function importData(file) {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.products && Array.isArray(data.products)) {
                products = data.products;
            } else if (Array.isArray(data)) {
                products = data;
            } else {
                throw new Error('Invalid data format');
            }
            
            saveProducts();
            renderProductsTable();
            updateAnalytics();
            showMessage('Data imported successfully!', 'success');
        } catch (error) {
            showMessage('Error importing data: ' + error.message, 'error');
        }
    };
    reader.readAsText(file);
}

function saveStoreSettings() {
    const settings = {
        storeName: document.getElementById('storeName').value,
        storeEmail: document.getElementById('storeEmail').value,
        storePhone: document.getElementById('storePhone').value
    };
    
    localStorage.setItem('storeSettings', JSON.stringify(settings));
    showMessage('Settings saved successfully!', 'success');
}

function showMessage(text, type) {
    // Create message element
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    message.style.display = 'block';
    
    // Insert at top of admin main
    const adminMain = document.querySelector('.admin-main');
    adminMain.insertBefore(message, adminMain.firstChild);
    
    // Remove after 3 seconds
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('editProductModal');
    if (e.target === modal) {
        closeEditModal();
    }
});