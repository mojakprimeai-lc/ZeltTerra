/* ==========================================================================
   ZELT SOLAR & ELECTRICALS — PROTOTYPE 3: TERRA
   Cart & Slide-in Drawer Management
   LocalStorage Persistence, Quantity Steppers & Kenya Threshold Free Shipping
   ========================================================================== */

import { PRODUCTS, formatKES } from './products.js';

export class TerraCart {
  constructor() {
    this.items = this.loadCart();
    this.discountPercent = 0;
    this.discountCode = "";
  }

  loadCart() {
    try {
      const saved = localStorage.getItem('zelt_terra_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not load cart from localStorage", e);
    }
    // Default 1 item so cart starts active as in prototype blueprint
    return [
      { productId: "zlt-fl-200", qty: 2 }
    ];
  }

  saveCart() {
    try {
      localStorage.setItem('zelt_terra_cart', JSON.stringify(this.items));
    } catch (e) {
      console.warn("Could not save cart", e);
    }
    this.updateCartBadges();
  }

  addItem(productId, qty = 1) {
    const existing = this.items.find(i => i.productId === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ productId, qty });
    }
    this.saveCart();
    this.renderDrawer();
    this.showCartToast("Item added to your cart!");
  }

  updateQty(productId, newQty) {
    if (newQty <= 0) {
      this.removeItem(productId);
      return;
    }
    const item = this.items.find(i => i.productId === productId);
    if (item) {
      item.qty = newQty;
      this.saveCart();
      this.renderDrawer();
    }
  }

  removeItem(productId) {
    this.items = this.items.filter(i => i.productId !== productId);
    this.saveCart();
    this.renderDrawer();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.renderDrawer();
  }

  getSubtotal() {
    return this.items.reduce((total, item) => {
      const prod = PRODUCTS.find(p => p.id === item.productId);
      if (!prod) return total;
      return total + (prod.price * item.qty);
    }, 0);
  }

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  }

  applyDiscount(code) {
    const clean = code.trim().toUpperCase();
    if (clean === "ZELT10") {
      this.discountPercent = 10;
      this.discountCode = "ZELT10";
      return { success: true, message: "10% Zelt Discount Applied!" };
    } else if (clean === "KARIBU5") {
      this.discountPercent = 5;
      this.discountCode = "KARIBU5";
      return { success: true, message: "5% Welcome Discount Applied!" };
    }
    return { success: false, message: "Invalid promo code" };
  }

  updateCartBadges() {
    const count = this.getTotalCount();
    const badges = document.querySelectorAll('.cart-counter, .bottom-nav-badge');
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  renderDrawer() {
    const container = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('cartSubtotal');
    const totalEl = document.getElementById('cartTotal');
    const countHeader = document.getElementById('cartHeaderCount');
    const freeShipText = document.getElementById('freeShipText');
    const freeShipFill = document.getElementById('freeShipFill');

    if (!container) return;

    if (countHeader) countHeader.textContent = `(${this.getTotalCount()})`;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 48px 16px; color: var(--text-secondary);">
          <div style="margin-bottom: 16px; color: var(--text-tertiary); display: flex; justify-content: center;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <h4 style="font-family: var(--font-display); font-size: 18px; color: var(--text-primary); margin-bottom: 6px;">Your cart is empty</h4>
          <p style="font-size: 13.5px; margin-bottom: 20px;">Explore Kenya's premier solar energy systems and floodlights.</p>
          <button class="btn btn-primary" onclick="window.zeltApp.openCatalogCategory('all'); window.zeltCart.closeDrawer();">Browse Catalog</button>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = formatKES(0);
      if (totalEl) totalEl.textContent = formatKES(0);
      if (freeShipFill) freeShipFill.style.width = '0%';
      return;
    }

    let html = '';
    this.items.forEach(item => {
      const prod = PRODUCTS.find(p => p.id === item.productId);
      if (!prod) return;

      const itemTotal = prod.price * item.qty;
      html += `
        <div class="cart-item">
          <div class="cart-item-img">
            <img src="${prod.image}" alt="${prod.name}">
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${prod.name}</div>
            <div class="cart-item-price">${formatKES(prod.price)}</div>
            <div class="cart-item-bottom">
              <div class="qty-stepper" style="border-radius: 4px; transform: scale(0.9); transform-origin: left;">
                <button class="qty-btn" onclick="window.zeltCart.updateQty('${prod.id}', ${item.qty - 1})">−</button>
                <input class="qty-input" type="text" value="${item.qty}" readonly style="width: 32px; height: 32px;">
                <button class="qty-btn" onclick="window.zeltCart.updateQty('${prod.id}', ${item.qty + 1})">+</button>
              </div>
              <button style="font-size: 12px; color: var(--accent-danger); font-weight: 500;" onclick="window.zeltCart.removeItem('${prod.id}')">Remove</button>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    const subtotal = this.getSubtotal();
    const discountAmount = Math.round(subtotal * (this.discountPercent / 100));
    const finalTotal = subtotal - discountAmount;

    if (subtotalEl) subtotalEl.textContent = formatKES(subtotal);
    if (totalEl) totalEl.textContent = formatKES(finalTotal);

    // Free delivery progress for Nairobi (Threshold: KSh 5,000)
    const threshold = 5000;
    if (freeShipText && freeShipFill) {
      if (subtotal >= threshold) {
        freeShipText.innerHTML = `<span style="display:inline-flex; align-items:center; gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-success)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> You qualify for <strong>FREE Bodaboda Delivery</strong> in Nairobi!</span>`;
        freeShipFill.style.width = '100%';
        freeShipFill.style.backgroundColor = 'var(--accent-success)';
      } else {
        const remaining = threshold - subtotal;
        const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
        freeShipText.innerHTML = `Add <strong>${formatKES(remaining)}</strong> more to get FREE delivery in Nairobi`;
        freeShipFill.style.width = `${pct}%`;
        freeShipFill.style.backgroundColor = 'var(--accent-primary)';
      }
    }
  }

  openDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer && backdrop) {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      this.renderDrawer();
    }
  }

  closeDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
  }

  showCartToast(msg) {
    const toast = document.getElementById('globalToast');
    if (toast) {
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }
}

export const cartManager = new TerraCart();
window.zeltCart = cartManager;
