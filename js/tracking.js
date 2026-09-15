/* ==========================================================================
   ZELT SOLAR & ELECTRICALS — PROTOTYPE 3: TERRA
   5-Stage Order Tracking Engine with Wells Fargo Waybill Integration
   Zero emojis · Clean vector status icons
   ========================================================================== */

import { formatKES, PRODUCTS, SVG_ICONS } from './products.js';

export const SAMPLE_ORDERS = [
  {
    orderId: "ZLT-2024-8847",
    customerName: "Jane Wanjiku",
    phone: "0722123456",
    county: "Nakuru",
    address: "Milimani Estate, Nakuru",
    courier: "Wells Fargo Couriers Kenya",
    waybillNumber: "WF-2024-993847",
    total: 52000,
    currentStep: 4, // 1 to 5
    date: "15 Sept 2026",
    items: [
      { productId: "zlt-fl-200", qty: 8 }
    ],
    timeline: [
      { step: 1, title: "Order Received", time: "Sept 15 · 10:23am", desc: "We have received your order and are reviewing technical requirements." },
      { step: 2, title: "Confirmed & Processing", time: "Sept 15 · 11:45am", desc: "Order verified. Items packed carefully at our Mwangaza Arcade showroom." },
      { step: 3, title: "Ready for Dispatch", time: "Sept 16 · 08:30am", desc: "Your order is packed and scheduled for Wells Fargo courier pickup." },
      { step: 4, title: "Out for Delivery", time: "Sept 16 — IN TRANSIT", desc: "Consignment is in transit to Nakuru branch via Wells Fargo Couriers.", active: true },
      { step: 5, title: "Delivered", time: "Est. Sept 17", desc: "You will receive an SMS confirmation upon final handoff." }
    ]
  }
];

export function initOrderTracking() {
  const findBtn = document.getElementById('trackingSubmitBtn');
  const orderInput = document.getElementById('trackingOrderInput');
  const resultsContainer = document.getElementById('trackingResultContainer');

  if (!findBtn || !orderInput) return;

  function lookupOrder(orderId) {
    const cleanId = (orderId || orderInput.value).trim().toUpperCase();
    if (!cleanId) {
      alert("Please enter an Order ID (e.g. ZLT-2024-8847)");
      return;
    }

    // Check user orders in localStorage first, then sample orders
    const localOrders = JSON.parse(localStorage.getItem('zelt_terra_orders') || '[]');
    let order = localOrders.find(o => o.orderId.toUpperCase() === cleanId) ||
                SAMPLE_ORDERS.find(o => o.orderId.toUpperCase() === cleanId);

    if (!order) {
      // Fallback: create dynamic view so the user can test any order ID
      order = {
        orderId: cleanId,
        customerName: "Valued Customer",
        phone: "+254 701 884 358",
        county: "Nairobi",
        address: "Nairobi CBD",
        courier: "Wells Fargo Couriers Kenya",
        waybillNumber: `WF-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        total: 15000,
        currentStep: 3,
        date: "Today",
        items: [{ productId: "zlt-fl-200", qty: 2 }],
        timeline: [
          { step: 1, title: "Order Received", time: "Today · 09:15am", desc: "Order received and validated by technical counter." },
          { step: 2, title: "Confirmed & Processing", time: "Today · 10:45am", desc: "Testing and packaging underway at Mwangaza Arcade." },
          { step: 3, title: "Ready for Dispatch", time: "Today · 02:30pm", desc: "Consignment staged for courier dispatch.", active: true },
          { step: 4, title: "Out for Delivery", time: "Pending Courier Pickup", desc: "Parcel being transferred to regional Wells Fargo station." },
          { step: 5, title: "Delivered", time: "Est. 2-3 Business Days", desc: "SMS notification scheduled upon customer reception." }
        ]
      };
    }

    renderTrackingResults(order);
  }

  findBtn.addEventListener('click', () => lookupOrder());
  orderInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') lookupOrder();
  });

  // Pre-load sample order on page visit
  lookupOrder("ZLT-2024-8847");
}

function renderTrackingResults(order) {
  const container = document.getElementById('trackingResultContainer');
  if (!container) return;

  const currentStep = order.currentStep || 4;

  let timelineHtml = '';
  const timelineSteps = order.timeline || [
    { step: 1, title: "Order Received", time: "Day 1 · 10:23am", desc: "Order received and logged in system." },
    { step: 2, title: "Confirmed & Processing", time: "Day 1 · 11:45am", desc: "Quality checks and packing completed." },
    { step: 3, title: "Ready for Dispatch", time: "Day 2 · 08:30am", desc: "Consignment prepared for transit." },
    { step: 4, title: "Out for Delivery", time: "Day 2 — IN TRANSIT", desc: "In transit with regional delivery team.", active: true },
    { step: 5, title: "Delivered", time: "Est. Tomorrow", desc: "Delivery confirmation notification." }
  ];

  timelineSteps.forEach(s => {
    const isDone = s.step < currentStep;
    const isCurrent = s.step === currentStep;
    const isPending = s.step > currentStep;

    let nodeClass = "timeline-node";
    let iconSvg = '';
    if (isDone) {
      nodeClass += " done";
      iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (isCurrent) {
      nodeClass += " current";
      iconSvg = `<span class="timeline-pulse-dot"></span>`;
    } else {
      nodeClass += " pending";
      iconSvg = `<span class="timeline-empty-dot"></span>`;
    }

    timelineHtml += `
      <div class="${nodeClass}">
        <div class="timeline-indicator">${iconSvg}</div>
        <div class="timeline-body">
          <div class="timeline-title-row">
            <h4>${s.title}</h4>
            <span class="timeline-time">${s.time}</span>
          </div>
          <p class="timeline-desc">"${s.desc}"</p>
        </div>
      </div>
    `;
  });

  // Items in Order
  let itemsHtml = '';
  if (order.items && order.items.length > 0) {
    order.items.forEach(it => {
      const prod = PRODUCTS.find(p => p.id === it.productId) || PRODUCTS[0];
      itemsHtml += `
        <div style="display: flex; gap: 14px; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border-color);">
          <img src="${prod.image}" alt="${prod.name}" style="width: 56px; height: 56px; border-radius: 6px; object-fit: cover; background: var(--bg-primary);">
          <div style="flex: 1;">
            <div style="font-weight: 600; font-size: 14px; color: var(--text-primary);">${prod.name}</div>
            <div style="font-size: 12.5px; color: var(--text-secondary); margin-top: 2px;">Quantity: ${it.qty} · ${formatKES(prod.price * it.qty)}</div>
          </div>
        </div>
      `;
    });
  }

  container.innerHTML = `
    <div style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 32px; box-shadow: var(--shadow-sm);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid var(--border-color);">
        <div>
          <span class="badge badge-green" style="margin-bottom: 8px;">VERIFIED DISPATCH</span>
          <h3 style="font-family: var(--font-display); font-size: 24px; font-weight: 700; color: var(--text-primary);">
            Order #${order.orderId} — ${order.customerName}
          </h3>
          <p style="font-size: 13.5px; color: var(--text-secondary); margin-top: 4px;">
            Destination: ${order.address}, ${order.county} · Contact: ${order.phone}
          </p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 11.5px; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Total Amount</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--accent-primary); margin-top: 2px;">${formatKES(order.total)}</div>
        </div>
      </div>

      <!-- Vertical Timeline -->
      <div class="tracking-vertical-timeline" style="margin-bottom: 32px;">
        ${timelineHtml}
      </div>

      <!-- Courier Partner Info Box -->
      <div style="background: var(--bg-accent); border: 1px solid #C4E2CB; border-radius: var(--radius-sm); padding: 20px 24px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-primary); font-weight: 700; margin-bottom: 4px;">
            LOGISTICS PARTNER
          </div>
          <div style="font-size: 16px; font-weight: 700; color: var(--text-primary);">
            ${order.courier}
          </div>
          <div style="font-size: 13px; color: var(--text-secondary); margin-top: 2px;">
            Waybill Consignment: <code style="font-weight: 700; background: #FFFFFF; padding: 3px 8px; border-radius: 4px; border: 1px solid #C4E2CB;">${order.waybillNumber}</code>
          </div>
        </div>
        <button class="btn btn-sm btn-primary" onclick="alert('Connecting to Wells Fargo Couriers Kenya tracking API for Waybill: ' + '${order.waybillNumber}')">
          Verify on Wells Fargo Portal →
        </button>
      </div>

      <!-- Order Items -->
      <div>
        <h4 style="font-family: var(--font-display); font-size: 16px; font-weight: 700; margin-bottom: 12px; color: var(--text-primary);">Order Items</h4>
        ${itemsHtml}
      </div>
    </div>
  `;
}
