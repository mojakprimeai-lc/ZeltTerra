/* ==========================================================================
   ZELT SOLAR & ELECTRICALS — PROTOTYPE 3: TERRA
   Product Comparison Drawer Engine (Up to 3 Products Side-by-Side)
   ========================================================================== */

import { PRODUCTS, formatKES } from './products.js';

export class TerraComparison {
  constructor() {
    this.compareIds = [];
  }

  toggleProduct(productId) {
    const idx = this.compareIds.indexOf(productId);
    if (idx > -1) {
      this.compareIds.splice(idx, 1);
    } else {
      if (this.compareIds.length >= 3) {
        alert("You can compare up to 3 products at a time.");
        return;
      }
      this.compareIds.push(productId);
    }
    this.updateCompareBar();
  }

  updateCompareBar() {
    const bar = document.getElementById('compareFloatingBar');
    const countEl = document.getElementById('compareCountBadge');
    if (!bar) return;

    if (this.compareIds.length > 0) {
      bar.classList.add('active');
      if (countEl) countEl.textContent = this.compareIds.length;
    } else {
      bar.classList.remove('active');
    }
  }

  openCompareModal() {
    const modal = document.getElementById('compareModal');
    const backdrop = document.getElementById('modalBackdrop');
    if (!modal || !backdrop) return;

    if (this.compareIds.length < 2) {
      alert("Please select at least 2 products to compare.");
      return;
    }

    this.renderCompareGrid();
    modal.classList.add('active');
    backdrop.classList.add('active');
  }

  closeCompareModal() {
    const modal = document.getElementById('compareModal');
    const backdrop = document.getElementById('modalBackdrop');
    if (modal) modal.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
  }

  renderCompareGrid() {
    const grid = document.getElementById('compareGridContainer');
    if (!grid) return;

    const prods = this.compareIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

    let html = `
      <div style="display: grid; grid-template-columns: 180px repeat(${prods.length}, 1fr); gap: 16px; min-width: 600px;">
        <!-- Column 1: Labels -->
        <div style="font-weight: 700; color: var(--text-secondary); display: flex; flex-direction: column; gap: 16px; padding-top: 180px;">
          <div>Price (KES)</div>
          <div>Power / Wattage</div>
          <div>Category</div>
          <div>Brand</div>
          <div>Delivery Time</div>
          <div>Warranty</div>
          <div>In Stock</div>
          <div>Action</div>
        </div>
    `;

    prods.forEach(p => {
      html += `
        <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; display: flex; flex-direction: column; gap: 16px;">
          <div style="height: 140px; display: flex; align-items: center; justify-content: center; background: #FFF; border-radius: 6px; overflow: hidden;">
            <img src="${p.image}" alt="${p.name}" style="max-height: 100%; object-fit: cover;">
          </div>
          <div style="font-weight: 700; font-size: 14px; min-height: 40px;">${p.name}</div>
          
          <div style="font-weight: 700; color: var(--accent-primary); font-size: 16px;">${formatKES(p.price)}</div>
          <div>${p.wattage > 0 ? p.wattage + 'W' : 'Standard'}</div>
          <div>${p.subCategory}</div>
          <div>${p.brand}</div>
          <div>${p.deliveryDays} Business Days</div>
          <div style="color: var(--accent-success); font-weight: 600; display: flex; align-items: center; gap: 6px;">
            <span class="status-bullet" style="width: 8px; height: 8px; border-radius: 50%; background: ${p.inStock ? 'var(--accent-success)' : 'var(--accent-danger)'}; display: inline-block;"></span>
            ${p.inStock ? 'In Stock (Nairobi)' : 'Out of Stock'}
          </div>
          
          <button class="btn btn-sm btn-primary" onclick="window.zeltCart.addItem('${p.id}', 1); window.zeltCompare.closeCompareModal();">
            Add to Cart
          </button>
        </div>
      `;
    });

    html += `</div>`;
    grid.innerHTML = html;
  }
}

export const comparisonManager = new TerraComparison();
window.zeltCompare = comparisonManager;
