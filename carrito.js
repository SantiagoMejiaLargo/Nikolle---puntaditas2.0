// Shopping Cart System for Nikolle Puntaditas
class ShoppingCart {
    constructor() {
        this.cart = this.loadCart();
        this.products = [];
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.renderProducts();
        this.renderCart();
        this.updateCartCount();
    }

    async loadProducts() {
        try {
            const response = await fetch('api.json');
            this.products = await response.json();
        } catch (error) {
            console.error('Error loading products:', error);
            // Fallback products
            this.products = [
                { id: 1, nombre: "Capibara", precio: 10000 },
                { id: 2, nombre: "Pollitos", precio: 10000 },
                { id: 3, nombre: "Ovejas", precio: 15000 },
                { id: 4, nombre: "Ranas", precio: 12000 }
            ];
        }
    }

    loadCart() {
        const savedCart = localStorage.getItem('nikolle-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    saveCart() {
        localStorage.setItem('nikolle-cart', JSON.stringify(this.cart));
    }

    addToCart(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.renderCart();
        this.showNotification(`${product.nombre} agregado al carrito`);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.renderCart();
            }
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
    }

    getCartCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    renderProducts() {
        const productContainer = document.getElementById('productos-container');
        if (!productContainer) return;

        productContainer.innerHTML = this.products.map(product => `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="img/${product.nombre.toLowerCase()}.jpg" 
                         class="card-img-top" 
                         alt="${product.nombre}"
                         onerror="this.src='img/amigurumis.jpg'">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.nombre}</h5>
                        <p class="card-text">$${product.precio.toLocaleString()}</p>
                        <div class="mt-auto">
                            <button class="btn btn-outline-danger btn-sm" 
                                    onclick="cart.addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderCart() {
        const cartContainer = document.getElementById('items');
        const footer = document.getElementById('footer');
        
        if (!cartContainer || !footer) return;

        if (this.cart.length === 0) {
            cartContainer.innerHTML = '';
            footer.innerHTML = '<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>';
            return;
        }

        cartContainer.innerHTML = this.cart.map((item, index) => `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${item.nombre}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-outline-secondary" 
                                onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="btn btn-sm btn-light">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" 
                                onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </td>
                <td>
                    <button class="btn btn-sm btn-danger" 
                            onclick="cart.removeFromCart(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>$${(item.precio * item.quantity).toLocaleString()}</td>
            </tr>
        `).join('');

        footer.innerHTML = `
            <th scope="row" colspan="4">Total:</th>
            <td><strong>$${this.getCartTotal().toLocaleString()}</strong></td>
        `;
    }

    updateCartCount() {
        const countElement = document.getElementById('contador');
        if (countElement) {
            countElement.textContent = this.getCartCount();
        }
    }

    showNotification(message) {
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'alert alert-success position-fixed';
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999;';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    checkout() {
        if (this.cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }

        const total = this.getCartTotal();
        const confirmMessage = `Total a pagar: $${total.toLocaleString()}\n¿Confirmar compra?`;
        
        if (confirm(confirmMessage)) {
            alert('¡Compra realizada con éxito!');
            this.clearCart();
            window.location.href = 'checkout.html';
        }
    }
}

// Inicializar carrito
const cart = new ShoppingCart();

// Funciones globales
window.addToCart = (id, qty = 1) => cart.addToCart(id, qty);
window.removeFromCart = (id) => cart.removeFromCart(id);
window.updateQuantity = (id, qty) => cart.updateQuantity(id, qty);
window.checkout = () => cart.checkout();
