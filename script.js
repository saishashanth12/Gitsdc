// ==================== 
// Product Data
// ====================
const products = [
    {
        id: 1,
        name: 'Wireless Earbuds Pro',
        category: 'accessories',
        price: 129.99,
        rating: '★★★★★',
        reviews: 234,
        image: '🎧',
        description: 'Premium noise-cancelling wireless earbuds'
    },
    {
        id: 2,
        name: 'iPhone 15 Pro Max',
        category: 'phones',
        price: 1199.99,
        rating: '★★★★★',
        reviews: 512,
        image: '📱',
        description: 'Latest flagship smartphone with advanced features'
    },
    {
        id: 3,
        name: 'MacBook Pro 16"',
        category: 'laptops',
        price: 2499.99,
        rating: '★★★★★',
        reviews: 389,
        image: '💻',
        description: 'Powerful laptop for professionals'
    },
    {
        id: 4,
        name: 'Samsung Galaxy S24',
        category: 'phones',
        price: 999.99,
        rating: '★★★★★',
        reviews: 456,
        image: '📱',
        description: 'High-performance Android smartphone'
    },
    {
        id: 5,
        name: 'Dell XPS 15',
        category: 'laptops',
        price: 1799.99,
        rating: '★★★★☆',
        reviews: 321,
        image: '💻',
        description: 'Ultra-thin laptop with stunning display'
    },
    {
        id: 6,
        name: 'AirPods Max',
        category: 'accessories',
        price: 549.99,
        rating: '★★★★★',
        reviews: 278,
        image: '🎧',
        description: 'Premium over-ear wireless headphones'
    },
    {
        id: 7,
        name: 'Google Pixel 8 Pro',
        category: 'phones',
        price: 999.99,
        rating: '★★★★★',
        reviews: 567,
        image: '📱',
        description: 'AI-powered smartphone with exceptional camera'
    },
    {
        id: 8,
        name: 'Lenovo ThinkPad X1',
        category: 'laptops',
        price: 1449.99,
        rating: '★★★★☆',
        reviews: 234,
        image: '💻',
        description: 'Business-class ultrabook laptop'
    },
    {
        id: 9,
        name: 'Sony WH-1000XM5',
        category: 'accessories',
        price: 399.99,
        rating: '★★★★★',
        reviews: 678,
        image: '🎧',
        description: 'Industry-leading noise-cancelling headphones'
    },
    {
        id: 10,
        name: 'iPad Pro 12.9"',
        category: 'phones',
        price: 1099.99,
        rating: '★★★★★',
        reviews: 445,
        image: '📱',
        description: 'Powerful tablet for creative professionals'
    },
    {
        id: 11,
        name: 'ASUS ROG Laptop',
        category: 'laptops',
        price: 1899.99,
        rating: '★★★★★',
        reviews: 389,
        image: '💻',
        description: 'High-performance gaming laptop'
    },
    {
        id: 12,
        name: 'Universal Phone Stand',
        category: 'accessories',
        price: 29.99,
        rating: '★★★★☆',
        reviews: 156,
        image: '🎧',
        description: 'Adjustable phone stand for any device'
    }
];

// ==================== 
// Shopping Cart
// ====================
let cart = [];

// ==================== 
// Initialize Page
// ====================
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    setupNavigation();
    loadCartFromLocalStorage();
});

// ==================== 
// Display Products
// ====================
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found</p>';
        return;
    }

    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// ==================== 
// Create Product Card
// ====================
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            ${product.image}
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-rating">${product.rating} (${product.reviews})</div>
            <div class="product-footer">
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    return card;
}

// ==================== 
// Filter Products
// ====================
function filterProducts(category) {
    // Update active button
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter and display products
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

// ==================== 
// Shopping Cart Functions
// ====================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCartToLocalStorage();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToLocalStorage();
    updateCartCount();
    displayCart();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
}

function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartEmptyDiv = document.getElementById('cart-empty');
    const cartTotal = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '';
        cartEmptyDiv.style.display = 'block';
        cartTotal.textContent = '0.00';
        return;
    }

    cartEmptyDiv.style.display = 'none';
    cartItemsDiv.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
            <div>$${itemTotal.toFixed(2)}</div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsDiv.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);
}

function openCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'block';
    displayCart();
}

function closeCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Proceeding to checkout with ${cart.length} item(s). Total: $${total.toFixed(2)}`);
    
    // Reset cart
    cart = [];
    saveCartToLocalStorage();
    updateCartCount();
    closeCart();
}

// ==================== 
// Local Storage Functions
// ====================
function saveCartToLocalStorage() {
    localStorage.setItem('techhub-cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('techhub-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// ==================== 
// Navigation Functions
// ====================
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Cart icon click
    document.getElementById('cart-icon').addEventListener('click', function(e) {
        e.preventDefault();
        openCart();
    });

    // Close cart when clicking outside modal
    const modal = document.getElementById('cart-modal');
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeCart();
        }
    });
}

function scrollToProducts() {
    const productsSection = document.getElementById('products');
    productsSection.scrollIntoView({ behavior: 'smooth' });
}

// ==================== 
// Form Handlers
// ====================
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (email) {
        showNotification(`Thank you for subscribing with ${email}!`);
        event.target.reset();
    }
}

function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: event.target.querySelector('input[type="text"]').value,
        email: event.target.querySelector('input[type="email"]').value,
        message: event.target.querySelector('textarea').value
    };

    // Simulate form submission
    console.log('Contact Form Submitted:', formData);
    showNotification('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// ==================== 
// Notification System
// ====================
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #00d4ff, #00a8cc);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        font-weight: 600;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== 
// Smooth Scroll for Navigation
// ====================
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// ==================== 
// Animation Keyframes
// ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== 
// Search Functionality (Can be enhanced)
// ====================
function searchProducts(query) {
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filtered);
}
