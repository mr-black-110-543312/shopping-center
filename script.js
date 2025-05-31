// Load products from admin panel or use default products
let products = JSON.parse(localStorage.getItem('storeProducts')) || [
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
    },
    {
        id: 4,
        title: "Designer Sunglasses",
        description: "Stylish sunglasses with UV protection and premium frame materials.",
        price: 59.99,
        originalPrice: 89.99,
        image: "🕶️",
        category: "fashion",
        featured: true,
        badge: "Sale",
        stock: 40
    },
    {
        id: 5,
        title: "Wireless Gaming Mouse",
        description: "High-precision gaming mouse with RGB lighting and customizable buttons.",
        price: 49.99,
        originalPrice: null,
        image: "🖱️",
        category: "electronics",
        featured: true,
        badge: null,
        stock: 20
    },
    {
        id: 6,
        title: "Yoga Mat Premium",
        description: "Non-slip yoga mat for your daily practice, made from eco-friendly materials.",
        price: 29.99,
        originalPrice: 39.99,
        image: "🧘",
        category: "sports",
        featured: true,
        badge: "Sale",
        stock: 50
    },
    {
        id: 7,
        title: "Smartphone Case",
        description: "Protective case for your smartphone with shock absorption and wireless charging support.",
        price: 19.99,
        originalPrice: null,
        image: "📱",
        category: "electronics",
        featured: true,
        badge: null,
        stock: 100
    },
    {
        id: 8,
        title: "Running Shoes",
        description: "Comfortable running shoes for daily exercise with advanced cushioning technology.",
        price: 89.99,
        originalPrice: 119.99,
        image: "👟",
        category: "sports",
        featured: true,
        badge: "Sale",
        stock: 35
    }
];

// Shopping cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const productModal = document.getElementById('productModal');
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
    renderProducts();
    updateCartCount();
    initializeEventListeners();
    startCountdown();
});

// Function to refresh products from admin panel
function refreshProducts() {
    const adminProducts = JSON.parse(localStorage.getItem('storeProducts'));
    if (adminProducts && JSON.stringify(adminProducts) !== JSON.stringify(products)) {
        products = adminProducts;
        renderProducts();
        updateCartCount();
    }
}

// Check for product updates every 5 seconds
setInterval(refreshProducts, 5000);

// Hero slider functionality
function initializeSlider() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('sliderDots');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    // Auto-play slider
    setInterval(nextSlide, 5000);

    // Navigation buttons
    document.getElementById('nextBtn').addEventListener('click', nextSlide);
    document.getElementById('prevBtn').addEventListener('click', prevSlide);
}

// Render products
function renderProducts(productsToRender = products) {
    productsGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const isOutOfStock = product.stock === 0;
    const stockClass = product.stock <= 5 ? 'stock-low' : product.stock <= 20 ? 'stock-medium' : 'stock-high';
    
    card.innerHTML = `
        <div class="product-image">
            ${product.image}
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">
                <div>
                    <span class="price">$${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                </div>
            </div>
            <div class="stock-info ${stockClass}">
                ${isOutOfStock ? 'Out of Stock' : `${product.stock} in stock`}
            </div>
            <div class="product-actions">
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${isOutOfStock ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i> ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button class="wishlist-btn" onclick="toggleWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.product-actions')) {
            showProductModal(product);
        }
    });
    
    return card;
}

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity += 1;
        } else {
            showNotification(`Sorry, only ${product.stock} items available in stock!`, 'error');
            return;
        }
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCart();
    showNotification(`${product.title} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCart();
    renderCartItems();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);
    
    if (!item || !product) return;
    
    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
    } else if (newQuantity <= product.stock) {
        item.quantity = newQuantity;
        updateCartCount();
        saveCart();
        renderCartItems();
    } else {
        showNotification(`Sorry, only ${product.stock} items available in stock!`, 'error');
    }
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show cart modal
function showCartModal() {
    renderCartItems();
    cartModal.style.display = 'block';
}

// Render cart items
function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Show product modal
function showProductModal(product) {
    const modalTitle = document.getElementById('productModalTitle');
    const modalBody = document.getElementById('productModalBody');
    
    const isOutOfStock = product.stock === 0;
    const stockClass = product.stock <= 5 ? 'stock-low' : product.stock <= 20 ? 'stock-medium' : 'stock-high';
    
    modalTitle.textContent = product.title;
    modalBody.innerHTML = `
        <div style="display: flex; gap: 30px; align-items: flex-start;">
            <div style="font-size: 8rem; flex-shrink: 0;">${product.image}</div>
            <div style="flex: 1;">
                <h3 style="margin-bottom: 15px; color: #2c3e50;">${product.title}</h3>
                <p style="margin-bottom: 20px; color: #7f8c8d; line-height: 1.6;">${product.description}</p>
                <div style="margin-bottom: 15px;">
                    <span style="font-size: 2rem; font-weight: bold; color: #e74c3c;">$${product.price}</span>
                    ${product.originalPrice ? `<span style="text-decoration: line-through; color: #95a5a6; margin-left: 10px;">$${product.originalPrice}</span>` : ''}
                </div>
                <div style="margin-bottom: 20px;" class="${stockClass}">
                    <strong>${isOutOfStock ? 'Out of Stock' : `${product.stock} in stock`}</strong>
                </div>
                <div style="display: flex; gap: 15px;">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}); closeProductModal();" style="flex: 1;" ${isOutOfStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i> ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                    <button class="wishlist-btn" onclick="toggleWishlist(${product.id})" style="width: 50px; height: 50px;">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    productModal.style.display = 'block';
}

// Close modals
function closeCartModal() {
    cartModal.style.display = 'none';
}

function closeProductModal() {
    productModal.style.display = 'none';
}

// Search functionality
function searchProducts() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        renderProducts();
        return;
    }
    
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    
    renderProducts(filteredProducts);
}

// Filter by category
function filterByCategory(category) {
    const filteredProducts = products.filter(product => product.category === category);
    renderProducts(filteredProducts);
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[href="#${category}"]`).classList.add('active');
}

// Toggle wishlist
function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    showNotification(`${product.title} added to wishlist!`);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Countdown timer
function startCountdown() {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7); // 7 days from now
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<h3>Offer Expired!</h3>';
        }
    }
    
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

// Initialize event listeners
function initializeEventListeners() {
    // Cart button
    document.getElementById('cartBtn').addEventListener('click', showCartModal);
    
    // Close modal buttons
    document.getElementById('closeCartModal').addEventListener('click', closeCartModal);
    document.getElementById('closeProductModal').addEventListener('click', closeProductModal);
    
    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', searchProducts);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Category navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href === '#home') {
                renderProducts();
            } else if (href.startsWith('#')) {
                const category = href.substring(1);
                filterByCategory(category);
            }
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
            
            // Scroll to products section
            document.querySelector('.featured-products').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Newsletter form
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        showNotification('Thank you for subscribing to our newsletter!');
        this.reset();
    });
    
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
            return;
        }
        showNotification('Redirecting to checkout...');
        closeCartModal();
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            closeCartModal();
        }
        if (e.target === productModal) {
            closeProductModal();
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);