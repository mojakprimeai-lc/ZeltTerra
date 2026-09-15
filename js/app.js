/* ==========================================================================
   ZELT SOLAR & ELECTRICALS — PROTOTYPE 3: TERRA
   Main Application Controller & SPA View Router
   "The Solar Experts. Right Here in Nairobi."
   Zero Emojis · Clean SVG Vector Icons Throughout
   ========================================================================== */

import { CATEGORIES, PRODUCTS, formatKES, calculateSaving, getProductById, getProductsByCategory, SVG_ICONS, renderStarsHtml } from './products.js';
import { BUYING_GUIDES, getGuideById } from './guides.js';
import { initCalculatorUI } from './calculator.js';
import { initCompatibilityUI } from './compatibility.js';
import { cartManager } from './cart.js';
import { checkoutManager } from './checkout.js';
import { initOrderTracking } from './tracking.js';
import { comparisonManager } from './comparison.js';
import { initChatbot } from './chatbot.js';

class TerraApp {
  constructor() {
    this.currentView = 'home';
    this.selectedCategory = 'all';
    this.wishlist = this.loadWishlist();
    this.activeFilter = {
      category: 'all',
      maxPrice: 150000,
      inStockOnly: false,
      sortBy: 'popular'
    };
  }

  init() {
    this.initRouter();
    this.initStoreHours();
    this.initNavigation();
    this.initCatalogRender();
    this.initBuyingGuidesRender();
    this.initSearch();
    this.initWishlist();
    
    // Sub-systems
    initCalculatorUI();
    initCompatibilityUI();
    initOrderTracking();
    initChatbot();

    // Render initial page views
    this.renderTopSellers();
    this.renderCategoryEditorialGrid();
    this.renderGuideStrip();
    this.updateWishlistBadges();

    // Check URL hash
    const initialHash = window.location.hash.replace('#', '') || 'home';
    this.navigate(initialHash);
  }

  /* --------------------------------------------------------------------------
     1. SPA View Routing
     -------------------------------------------------------------------------- */
  initRouter() {
    window.addEventListener('hashchange', () => {
      const route = window.location.hash.replace('#', '') || 'home';
      this.navigate(route);
    });
  }

  navigate(viewName) {
    this.currentView = viewName;

    // View containers
    const views = ['home', 'catalog', 'calculator', 'solar-guide', 'tracking', 'about', 'contact'];
    views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) el.style.display = (v === viewName) ? 'block' : 'none';
    });

    // Update nav active states
    document.querySelectorAll('.nav-link, .drawer-nav-item, .bottom-nav-btn').forEach(l => {
      const target = l.getAttribute('href') ? l.getAttribute('href').replace('#', '') : '';
      if (target === viewName) {
        l.classList.add('active');
      } else {
        l.classList.remove('active');
      }
    });

    // Close drawers & mobile menus
    this.closeMobileDrawer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* --------------------------------------------------------------------------
     2. Live Store Hours Indicator (8am – 6pm Mon–Sat) - Zero Emojis
     -------------------------------------------------------------------------- */
  initStoreHours() {
    const el = document.getElementById('storeOpenStatus');
    if (!el) return;

    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 1-6 = Mon-Sat
    const hours = now.getHours();

    const isSunday = (day === 0);
    const isOpen = !isSunday && (hours >= 8 && hours < 18);

    if (isOpen) {
      el.innerHTML = `<span class="status-dot open"></span> Nairobi Showroom Open: 8am – 6pm Mon–Sat · Open Now`;
    } else if (isSunday) {
      el.innerHTML = `<span class="status-dot" style="background:#EF4444;"></span> Nairobi Showroom: Opens Monday at 8am`;
    } else {
      el.innerHTML = `<span class="status-dot" style="background:#F59E0B;"></span> Showroom Closed · Opens tomorrow at 8am`;
    }
  }

  /* --------------------------------------------------------------------------
     3. Navigation & Drawers
     -------------------------------------------------------------------------- */
  initNavigation() {
    const mobileBtn = document.getElementById('mobileMenuToggle');
    const drawer = document.getElementById('mobileDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    const closeDrawerBtn = document.getElementById('drawerCloseBtn');

    if (mobileBtn && drawer && backdrop) {
      mobileBtn.addEventListener('click', () => {
        drawer.classList.add('active');
        backdrop.classList.add('active');
      });
    }

    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', () => this.closeMobileDrawer());
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        this.closeMobileDrawer();
        cartManager.closeDrawer();
        this.closeAllModals();
      });
    }

    // Modal close buttons
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => this.closeAllModals());
    });
  }

  closeMobileDrawer() {
    const drawer = document.getElementById('mobileDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop && !document.querySelector('.cart-drawer.active') && !document.querySelector('.modal-backdrop.active')) {
      backdrop.classList.remove('active');
    }
  }

  closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
  }

  /* --------------------------------------------------------------------------
     4. Homepage Components Rendering (Clean SVG Icons)
     -------------------------------------------------------------------------- */
  renderCategoryEditorialGrid() {
    const container = document.getElementById('editorialCategoryGrid');
    if (!container) return;

    container.innerHTML = CATEGORIES.slice(0, 6).map(cat => {
      const iconSvg = SVG_ICONS[cat.iconKey] || SVG_ICONS.sun;
      return `
        <div class="category-editorial-card" onclick="window.zeltApp.openCatalogCategory('${cat.id}')">
          <div class="category-card-top">
            <div class="category-icon-box">${iconSvg}</div>
            <span class="category-tag">${cat.tagline || 'Essential Solar'}</span>
          </div>
          <div>
            <h3 class="category-title">${cat.name}</h3>
            <p class="category-desc">${cat.description}</p>
          </div>
          <div class="category-link">
            <span>${cat.itemCount} Products</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
      `;
    }).join('');
  }

  renderGuideStrip() {
    const container = document.getElementById('homeGuideCardsGrid');
    if (!container) return;

    const bookSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;

    container.innerHTML = BUYING_GUIDES.slice(0, 3).map(g => `
      <div class="guide-card" onclick="window.zeltApp.openGuideModal('${g.id}')">
        <div class="guide-icon-pill">${bookSvg}</div>
        <div class="guide-meta">
          <span class="guide-badge">${g.badge}</span>
          <span>·</span>
          <span>${g.readTime}</span>
        </div>
        <h3 class="guide-title">${g.title}</h3>
        <p class="guide-summary">${g.summary}</p>
        <div class="guide-cta">
          <span>Read Guide</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    `).join('');
  }

  renderTopSellers() {
    const container = document.getElementById('topSellersGrid');
    if (!container) return;

    const topProducts = PRODUCTS.filter(p => p.isTopSeller || p.badge).slice(0, 4);
    container.innerHTML = topProducts.map(p => this.createProductCardHtml(p)).join('');
  }

  createProductCardHtml(p) {
    const isWishlisted = this.wishlist.includes(p.id);
    const saving = calculateSaving(p.price, p.comparePrice);
    const starsHtml = renderStarsHtml(5);
    const heartSvg = isWishlisted ? SVG_ICONS.heartFilled : SVG_ICONS.heartOutline;

    return `
      <div class="product-card" data-product-id="${p.id}">
        <div class="product-image-wrap" onclick="window.zeltApp.openProductModal('${p.id}')">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          ${p.badge ? `<div class="product-badge-top-left"><span class="badge badge-amber">${p.badge}</span></div>` : ''}
          <button class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="event.stopPropagation(); window.zeltApp.toggleWishlist('${p.id}')" title="Save to wishlist" aria-label="Wishlist">
            ${heartSvg}
          </button>
        </div>

        <div class="product-body">
          <div class="product-category-sub">${p.subCategory}</div>
          <h4 class="product-title" onclick="window.zeltApp.openProductModal('${p.id}')">${p.name}</h4>
          <p class="product-subtitle">${p.subtitle}</p>

          <div class="product-rating">
            <div class="stars-row">${starsHtml}</div>
            <span class="rating-count">(${p.reviewsCount} reviews)</span>
            <span style="margin-left: auto;" class="badge-stock ${p.inStock ? 'in-stock' : 'out-of-stock'}">
              <span class="stock-bullet"></span> ${p.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div class="product-pricing-wrap">
            <div class="price-row">
              <span class="current-price">${formatKES(p.price)}</span>
              ${p.comparePrice ? `<span class="compare-price">${formatKES(p.comparePrice)}</span>` : ''}
            </div>
            ${saving > 0 ? `<div class="save-label">You save ${formatKES(saving)}</div>` : ''}
          </div>

          <div class="product-actions">
            <button class="btn btn-primary btn-full" onclick="window.zeltCart.addItem('${p.id}', 1)">
              Add to Cart
            </button>
            <div class="card-return-info">
              <span>Official Warranty</span>
              <span>·</span>
              <span>Verified Genuine</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* --------------------------------------------------------------------------
     5. Catalog Page & Filters
     -------------------------------------------------------------------------- */
  initCatalogRender() {
    this.renderCatalog();
    this.initCatalogFilters();
  }

  openCatalogCategory(catId) {
    this.activeFilter.category = catId;
    this.navigate('catalog');
    this.renderCatalog();
  }

  initCatalogFilters() {
    const catSelect = document.getElementById('catalogCategorySelect');
    const sortSelect = document.getElementById('catalogSortSelect');
    const stockChk = document.getElementById('catalogInStockOnly');
    const priceSlider = document.getElementById('catalogPriceRange');
    const priceDisplay = document.getElementById('catalogPriceDisplay');

    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        this.activeFilter.category = e.target.value;
        this.renderCatalog();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.activeFilter.sortBy = e.target.value;
        this.renderCatalog();
      });
    }

    if (stockChk) {
      stockChk.addEventListener('change', (e) => {
        this.activeFilter.inStockOnly = e.target.checked;
        this.renderCatalog();
      });
    }

    if (priceSlider && priceDisplay) {
      priceSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        this.activeFilter.maxPrice = val;
        priceDisplay.textContent = formatKES(val);
        this.renderCatalog();
      });
    }
  }

  renderCatalog() {
    const grid = document.getElementById('catalogProductsGrid');
    const titleEl = document.getElementById('catalogTitle');
    const countEl = document.getElementById('catalogCount');
    const bannerBox = document.getElementById('catalogGuideBanner');
    if (!grid) return;

    let filtered = PRODUCTS.filter(p => {
      if (this.activeFilter.category !== 'all' && p.category !== this.activeFilter.category) return false;
      if (this.activeFilter.inStockOnly && !p.inStock) return false;
      if (p.price > this.activeFilter.maxPrice) return false;
      return true;
    });

    // Sorting
    if (this.activeFilter.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.activeFilter.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (this.activeFilter.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    // Update Header & Banner
    const currentCatObj = CATEGORIES.find(c => c.id === this.activeFilter.category);
    if (titleEl) {
      titleEl.textContent = currentCatObj ? currentCatObj.name : "All Solar & Electrical Equipment";
    }
    if (countEl) {
      countEl.textContent = `${filtered.length} products`;
    }

    // Category Buying Guide Banner (Zero emojis)
    if (bannerBox) {
      if (currentCatObj && currentCatObj.guideBanner) {
        bannerBox.style.display = 'block';
        bannerBox.innerHTML = `
          <div style="background: var(--bg-accent); border: 1.5px solid #C4E2CB; border-radius: var(--radius-sm); padding: 18px 24px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
            <div>
              <h4 style="font-family: var(--font-display); font-size: 16.5px; font-weight: 700; color: var(--accent-primary); margin-bottom: 4px;">
                ${currentCatObj.guideBanner.title}
              </h4>
              <p style="font-size: 13.5px; color: var(--text-secondary); margin: 0;">
                ${currentCatObj.guideBanner.text}
              </p>
            </div>
            <button class="btn btn-sm btn-primary" onclick="window.zeltApp.openGuideModal('${currentCatObj.guideBanner.guideId}')">
              Read Full Guide →
            </button>
          </div>
        `;
      } else {
        bannerBox.style.display = 'none';
      }
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <h4 style="font-family: var(--font-display); font-size: 20px; color: var(--text-primary); margin-bottom: 8px;">No products match your filter criteria</h4>
          <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">Try adjusting price ranges or clearing filters.</p>
          <button class="btn btn-outline" onclick="window.zeltApp.openCatalogCategory('all')">Reset All Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(p => this.createProductCardHtml(p)).join('');
  }

  /* --------------------------------------------------------------------------
     6. Product Detail Modal & Compatibility (Zero Emojis)
     -------------------------------------------------------------------------- */
  openProductModal(productId) {
    const p = getProductById(productId);
    if (!p) return;

    const modal = document.getElementById('productDetailModal');
    const backdrop = document.getElementById('modalBackdrop');
    if (!modal || !backdrop) return;

    const titleEl = document.getElementById('pModalTitle');
    const subEl = document.getElementById('pModalSubtitle');
    const priceEl = document.getElementById('pModalPrice');
    const compareEl = document.getElementById('pModalComparePrice');
    const saveEl = document.getElementById('pModalSaveAmount');
    const mainImg = document.getElementById('pModalMainImg');
    const thumbsWrap = document.getElementById('pModalThumbs');
    const needToKnowWrap = document.getElementById('pModalNeedToKnow');
    const specsWrap = document.getElementById('pModalSpecs');
    const featuresWrap = document.getElementById('pModalFeatures');
    const reviewsWrap = document.getElementById('pModalReviews');
    const whatsappBtn = document.getElementById('pModalWhatsAppBtn');
    const addToCartBtn = document.getElementById('pModalAddToCartBtn');
    const qtyInput = document.getElementById('pModalQtyInput');

    if (titleEl) titleEl.textContent = p.name;
    if (subEl) subEl.textContent = p.subtitle;
    if (priceEl) priceEl.textContent = formatKES(p.price);
    if (compareEl) {
      compareEl.textContent = p.comparePrice ? formatKES(p.comparePrice) : '';
      compareEl.style.display = p.comparePrice ? 'inline' : 'none';
    }
    const saving = calculateSaving(p.price, p.comparePrice);
    if (saveEl) {
      saveEl.textContent = saving > 0 ? `You save ${formatKES(saving)}` : '';
      saveEl.style.display = saving > 0 ? 'inline-block' : 'none';
    }

    if (mainImg) {
      mainImg.src = p.image;
      mainImg.alt = p.name;
    }

    // Gallery Thumbnails
    if (thumbsWrap) {
      const gallery = p.gallery || [p.image];
      thumbsWrap.innerHTML = gallery.map((img, i) => `
        <div class="p-thumb ${i === 0 ? 'active' : ''}" onclick="window.zeltApp.switchModalImage('${img}', this)">
          <img src="${img}" alt="${p.name}">
        </div>
      `).join('');
    }

    // "What you need to know" 3 Critical Points (Clean SVGs)
    if (needToKnowWrap) {
      const bullets = p.needToKnow || [
        "Backed by official manufacturer warranty",
        "Direct nationwide courier dispatch via Wells Fargo",
        "Tested and verified for Kenya electrical standards"
      ];
      needToKnowWrap.innerHTML = bullets.map(b => `
        <li>
          <span class="check-bullet">${SVG_ICONS.check}</span>
          <span>${b}</span>
        </li>
      `).join('');
    }

    // Technical Specs Grid
    if (specsWrap) {
      let specRows = '';
      for (const [k, v] of Object.entries(p.specs || {})) {
        specRows += `
          <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border-color);">
            <strong style="color: var(--text-secondary); font-weight: 600;">${k}</strong>
            <span style="font-weight: 600; color: var(--text-primary); text-align: right;">${v}</span>
          </div>
        `;
      }
      specsWrap.innerHTML = specRows;
    }

    // Features List
    if (featuresWrap) {
      featuresWrap.innerHTML = (p.features || []).map(f => `
        <li style="margin-bottom: 10px; display: flex; align-items: flex-start; gap: 8px;">
          <span style="margin-top: 2px;">${SVG_ICONS.check}</span>
          <span>${f}</span>
        </li>
      `).join('');
    }

    // Reviews tab
    if (reviewsWrap) {
      reviewsWrap.innerHTML = `
        <div style="margin-bottom: 20px;">
          <div style="font-size: 24px; font-weight: 700; color: var(--accent-primary); margin-bottom: 4px;">${p.rating} / 5.0</div>
          <div class="stars-row" style="margin-bottom: 8px;">${renderStarsHtml(5)}</div>
          <p style="font-size: 13.5px; color: var(--text-secondary);">Based on ${p.reviewsCount} verified customer purchases across Nairobi and upcountry Kenya.</p>
        </div>
        <div style="background: var(--bg-secondary); padding: 18px 20px; border-radius: 8px; font-style: italic; font-size: 14px; line-height: 1.6;">
          "Installed this for my property in Karen. Genuine quality, flawless performance through rain and power cuts. Delivered to my doorstep within 24 hours."
          <div style="margin-top: 8px; font-weight: 700; font-style: normal; font-size: 13px; color: var(--text-primary);">— David K., Nairobi (Verified Customer)</div>
        </div>
      `;
    }

    // WhatsApp Pre-fill Button
    if (whatsappBtn) {
      const waText = encodeURIComponent(`Hi Zelt, I am interested in the ${p.name} (SKU: ${p.sku}, ${formatKES(p.price)}). Can you provide consultation?`);
      whatsappBtn.href = `https://wa.me/254701884358?text=${waText}`;
    }

    // Add to Cart
    if (addToCartBtn) {
      addToCartBtn.onclick = () => {
        const qty = qtyInput ? (parseInt(qtyInput.value, 10) || 1) : 1;
        cartManager.addItem(p.id, qty);
        this.closeAllModals();
      };
    }

    // Reset tabs to Overview
    this.switchModalTab('overview');

    modal.classList.add('active');
    backdrop.classList.add('active');
  }

  switchModalImage(src, thumbEl) {
    const mainImg = document.getElementById('pModalMainImg');
    if (mainImg) mainImg.src = src;

    document.querySelectorAll('.p-thumb').forEach(t => t.classList.remove('active'));
    if (thumbEl) thumbEl.classList.add('active');
  }

  switchModalTab(tabName) {
    document.querySelectorAll('.p-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.p-tab-pane').forEach(pane => {
      pane.style.display = (pane.id === `tabPane-${tabName}`) ? 'block' : 'none';
    });
  }

  /* --------------------------------------------------------------------------
     7. Buying Guides Page & Reader Modal
     -------------------------------------------------------------------------- */
  initBuyingGuidesRender() {
    const grid = document.getElementById('fullGuidesGrid');
    if (!grid) return;

    const bookSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;

    grid.innerHTML = BUYING_GUIDES.map(g => `
      <div class="guide-card" onclick="window.zeltApp.openGuideModal('${g.id}')">
        <div class="guide-icon-pill">${bookSvg}</div>
        <div class="guide-meta">
          <span class="guide-badge">${g.badge}</span>
          <span>·</span>
          <span>${g.readTime}</span>
        </div>
        <h3 class="guide-title">${g.title}</h3>
        <p class="guide-summary">${g.summary}</p>
        <div class="guide-cta">
          <span>Read Full Article</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    `).join('');
  }

  openGuideModal(guideId) {
    const guide = getGuideById(guideId) || BUYING_GUIDES[0];
    const modal = document.getElementById('guideReaderModal');
    const backdrop = document.getElementById('modalBackdrop');
    if (!modal || !backdrop) return;

    const titleEl = document.getElementById('guideReaderTitle');
    const metaEl = document.getElementById('guideReaderMeta');
    const bodyEl = document.getElementById('guideReaderContent');
    const relatedBox = document.getElementById('guideReaderRelated');

    if (titleEl) titleEl.textContent = guide.title;
    if (metaEl) metaEl.textContent = `${guide.badge} · ${guide.readTime} · By Zelt Technical Team`;
    if (bodyEl) bodyEl.innerHTML = guide.content;

    if (relatedBox && guide.relatedProductId) {
      const prod = getProductById(guide.relatedProductId);
      if (prod) {
        relatedBox.innerHTML = `
          <div style="background: var(--bg-accent); border: 1px solid #C4E2CB; border-radius: var(--radius-sm); padding: 16px; margin-top: 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <img src="${prod.image}" alt="${prod.name}" style="width: 56px; height: 56px; border-radius: 6px; object-fit: cover;">
              <div>
                <div style="font-size: 11px; text-transform: uppercase; color: var(--accent-primary); font-weight: 700;">Featured In This Guide</div>
                <div style="font-weight: 700; font-size: 14px;">${prod.name}</div>
                <div style="color: var(--accent-primary); font-weight: 700; font-size: 13.5px;">${formatKES(prod.price)}</div>
              </div>
            </div>
            <button class="btn btn-sm btn-primary" onclick="window.zeltApp.openProductModal('${prod.id}')">
              View Product
            </button>
          </div>
        `;
      }
    }

    modal.classList.add('active');
    backdrop.classList.add('active');
  }

  /* --------------------------------------------------------------------------
     8. Live Search with Autocomplete
     -------------------------------------------------------------------------- */
  initSearch() {
    const searchBtn = document.getElementById('headerSearchBtn');
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchMainInput');

    if (searchBtn && searchModal) {
      searchBtn.addEventListener('click', () => {
        searchModal.classList.add('active');
        document.getElementById('modalBackdrop').classList.add('active');
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        this.renderSearchResults('');
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.renderSearchResults(e.target.value.toLowerCase().trim());
      });
    }
  }

  renderSearchResults(query) {
    const box = document.getElementById('searchResultsBox');
    if (!box) return;

    if (!query) {
      box.innerHTML = `
        <div style="padding: 12px 0;">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 10px;">
            SUGGESTED EQUIPMENT
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="quick-reply-pill" onclick="window.zeltApp.setSearchQuery('solar floodlight')">Solar Floodlight</button>
            <button class="quick-reply-pill" onclick="window.zeltApp.setSearchQuery('400W solar panel')">400W Solar Panel</button>
            <button class="quick-reply-pill" onclick="window.zeltApp.setSearchQuery('hybrid inverter')">5kW Hybrid Inverter</button>
            <button class="quick-reply-pill" onclick="window.zeltApp.setSearchQuery('lithium battery')">LiFePO4 Lithium Battery</button>
          </div>
        </div>
      `;
      return;
    }

    const matches = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.subtitle.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.subCategory.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      box.innerHTML = `
        <div style="text-align: center; padding: 28px; color: var(--text-secondary);">
          No equipment found matching "<strong>${query}</strong>". Try searching for "floodlight", "panel", or "inverter".
        </div>
      `;
      return;
    }

    box.innerHTML = matches.map(p => `
      <div class="search-result-item" onclick="window.zeltApp.openProductModal('${p.id}'); window.zeltApp.closeAllModals();">
        <img src="${p.image}" alt="${p.name}" style="width: 48px; height: 48px; border-radius: 4px; object-fit: cover;">
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 14px; color: var(--text-primary);">${p.name}</div>
          <div style="font-size: 12px; color: var(--text-secondary);">${p.subCategory} · ${p.brand}</div>
        </div>
        <div style="font-weight: 700; color: var(--accent-primary); font-size: 14px;">
          ${formatKES(p.price)}
        </div>
      </div>
    `).join('');
  }

  setSearchQuery(q) {
    const input = document.getElementById('searchMainInput');
    if (input) {
      input.value = q;
      this.renderSearchResults(q.toLowerCase());
    }
  }

  /* --------------------------------------------------------------------------
     9. Wishlist
     -------------------------------------------------------------------------- */
  initWishlist() {
    const btn = document.getElementById('headerWishlistBtn');
    if (btn) {
      btn.addEventListener('click', () => this.openWishlistModal());
    }
  }

  loadWishlist() {
    try {
      return JSON.parse(localStorage.getItem('zelt_terra_wishlist') || '[]');
    } catch (e) {
      return [];
    }
  }

  toggleWishlist(productId) {
    const idx = this.wishlist.indexOf(productId);
    if (idx > -1) {
      this.wishlist.splice(idx, 1);
      cartManager.showCartToast("Item removed from Wishlist");
    } else {
      this.wishlist.push(productId);
      cartManager.showCartToast("Item saved to Wishlist");
    }
    localStorage.setItem('zelt_terra_wishlist', JSON.stringify(this.wishlist));
    this.updateWishlistBadges();
    this.renderTopSellers();
    this.renderCatalog();
  }

  updateWishlistBadges() {
    const badge = document.getElementById('wishlistCounter');
    if (badge) {
      badge.textContent = this.wishlist.length;
      badge.style.display = this.wishlist.length > 0 ? 'flex' : 'none';
    }
  }

  openWishlistModal() {
    const modal = document.getElementById('wishlistModal');
    const backdrop = document.getElementById('modalBackdrop');
    const container = document.getElementById('wishlistItemsContainer');
    if (!modal || !backdrop || !container) return;

    if (this.wishlist.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 16px; color: var(--text-secondary);">
          <div style="width: 48px; height: 48px; margin: 0 auto 12px auto; color: var(--text-muted);">${SVG_ICONS.heartOutline}</div>
          <h4 style="font-family: var(--font-display); font-size: 18px; color: var(--text-primary); margin-bottom: 6px;">Your Wishlist is Empty</h4>
          <p style="font-size: 13.5px;">Click the heart icon on any product to save items for future orders.</p>
        </div>
      `;
    } else {
      const items = this.wishlist.map(id => getProductById(id)).filter(Boolean);
      container.innerHTML = items.map(p => `
        <div style="display: flex; gap: 14px; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border-color);">
          <img src="${p.image}" alt="${p.name}" style="width: 60px; height: 60px; border-radius: 6px; object-fit: cover;">
          <div style="flex: 1;">
            <div style="font-weight: 600; font-size: 14px;">${p.name}</div>
            <div style="font-weight: 700; color: var(--accent-primary); font-size: 14px;">${formatKES(p.price)}</div>
          </div>
          <button class="btn btn-sm btn-primary" onclick="window.zeltCart.addItem('${p.id}', 1); window.zeltApp.toggleWishlist('${p.id}');">
            Move to Cart
          </button>
        </div>
      `).join('');
    }

    modal.classList.add('active');
    backdrop.classList.add('active');
  }
}

// Global Bootstrap
window.zeltApp = new TerraApp();
document.addEventListener('DOMContentLoaded', () => {
  window.zeltApp.init();
});
