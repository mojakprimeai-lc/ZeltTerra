/* ==========================================================================
   ZELT SOLAR & ELECTRICALS — PROTOTYPE 3: TERRA
   Pesapal Checkout & Africa's Talking SMS Simulation Engine
   Covers Nairobi Bodaboda, Wells Fargo Nationwide & M-Pesa STK Push
   ========================================================================== */

import { formatKES } from './products.js';
import { cartManager } from './cart.js';

export const KENYA_COUNTIES = [
  { name: "Nairobi", courier: "Bodaboda Express", fee: 300, days: "1–2 Days" },
  { name: "Kiambu", courier: "Wells Fargo Couriers", fee: 400, days: "1–2 Days" },
  { name: "Machakos", courier: "Wells Fargo Couriers", fee: 450, days: "2 Days" },
  { name: "Kajiado", courier: "Wells Fargo Couriers", fee: 450, days: "2 Days" },
  { name: "Nakuru", courier: "Wells Fargo Couriers", fee: 550, days: "2 Days" },
  { name: "Mombasa", courier: "Wells Fargo Couriers", fee: 750, days: "2–3 Days" },
  { name: "Kisumu", courier: "Wells Fargo Couriers", fee: 650, days: "2–3 Days" },
  { name: "Eldoret (Uasin Gishu)", courier: "Wells Fargo Couriers", fee: 600, days: "2–3 Days" },
  { name: "Nyeri", courier: "Wells Fargo Couriers", fee: 500, days: "2 Days" },
  { name: "Meru", courier: "Wells Fargo Couriers", fee: 550, days: "2–3 Days" },
  { name: "Kilifi", courier: "Wells Fargo Couriers", fee: 800, days: "3 Days" },
  { name: "Kakamega", courier: "Wells Fargo Couriers", fee: 650, days: "2–3 Days" },
  { name: "Laikipia (Nanyuki)", courier: "Wells Fargo Couriers", fee: 550, days: "2 Days" },
  { name: "Kisii", courier: "Wells Fargo Couriers", fee: 700, days: "2–3 Days" },
  { name: "Other 47 Counties", courier: "Wells Fargo Couriers", fee: 650, days: "2–3 Days" }
];

export class TerraCheckout {
  constructor() {
    this.selectedCounty = "Nairobi";
    this.paymentMethod = "mpesa"; // 'mpesa', 'card', 'pesalink'
    this.deliveryFee = 300;
  }

  openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    const backdrop = document.getElementById('modalBackdrop');
    if (!modal || !backdrop) return;

    if (cartManager.items.length === 0) {
      alert("Your cart is empty. Please add items to checkout.");
      return;
    }

    cartManager.closeDrawer();
    modal.classList.add('active');
    backdrop.classList.add('active');

    this.renderOrderSummary();
    this.populateCounties();
  }

  closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    const backdrop = document.getElementById('modalBackdrop');
    if (modal) modal.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
  }

  populateCounties() {
    const countySelect = document.getElementById('checkoutCounty');
    if (!countySelect) return;

    countySelect.innerHTML = KENYA_COUNTIES.map(c => `
      <option value="${c.name}" ${c.name === this.selectedCounty ? 'selected' : ''}>
        ${c.name} (${c.courier} · ${c.fee === 0 ? 'Free' : formatKES(c.fee)})
      </option>
    `).join('');

    countySelect.addEventListener('change', (e) => {
      this.selectedCounty = e.target.value;
      this.updateDeliveryFee();
    });

    this.updateDeliveryFee();
  }

  updateDeliveryFee() {
    const subtotal = cartManager.getSubtotal();
    const countyObj = KENYA_COUNTIES.find(c => c.name === this.selectedCounty) || KENYA_COUNTIES[0];

    // Nairobi free delivery over KSh 5,000
    if (this.selectedCounty === "Nairobi" && subtotal >= 5000) {
      this.deliveryFee = 0;
    } else {
      this.deliveryFee = countyObj.fee;
    }

    this.renderOrderSummary();
  }

  renderOrderSummary() {
    const subtotal = cartManager.getSubtotal();
    const discount = Math.round(subtotal * (cartManager.discountPercent / 100));
    const total = subtotal - discount + this.deliveryFee;

    const subEl = document.getElementById('checkoutSubtotal');
    const shipEl = document.getElementById('checkoutShippingFee');
    const discEl = document.getElementById('checkoutDiscount');
    const totalEl = document.getElementById('checkoutTotalAmount');

    if (subEl) subEl.textContent = formatKES(subtotal);
    if (shipEl) {
      shipEl.textContent = this.deliveryFee === 0 ? "FREE (Nairobi Order > KSh 5,000)" : formatKES(this.deliveryFee);
    }
    if (discEl) {
      discEl.textContent = discount > 0 ? `-${formatKES(discount)} (${cartManager.discountCode})` : "KSh 0";
    }
    if (totalEl) totalEl.textContent = formatKES(total);
  }

  processOrder() {
    const nameInput = document.getElementById('checkoutName');
    const phoneInput = document.getElementById('checkoutPhone');
    const addressInput = document.getElementById('checkoutAddress');

    const name = nameInput ? nameInput.value.trim() : "Valued Customer";
    const phone = phoneInput ? phoneInput.value.trim() : "0701884358";
    const address = addressInput ? addressInput.value.trim() : "Nairobi CBD";

    if (!name || !phone) {
      alert("Please enter your name and Kenyan phone number.");
      return;
    }

    // Generate Order
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ZLT-2026-${randomNum}`;
    const subtotal = cartManager.getSubtotal();
    const total = subtotal + this.deliveryFee;
    const waybill = `WF-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderRecord = {
      orderId,
      customerName: name,
      phone,
      county: this.selectedCounty,
      address,
      courier: this.selectedCounty === 'Nairobi' ? 'Bodaboda Express' : 'Wells Fargo Couriers Kenya',
      waybillNumber: waybill,
      items: [...cartManager.items],
      total,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      statusStep: 1, // 1: Order Received, 2: Confirmed, 3: Ready, 4: Out, 5: Delivered
      statusText: "Order Received"
    };

    // Save to localStorage for tracking page
    const existingOrders = JSON.parse(localStorage.getItem('zelt_terra_orders') || '[]');
    existingOrders.unshift(orderRecord);
    localStorage.setItem('zelt_terra_orders', JSON.stringify(existingOrders));

    // Clear Cart
    cartManager.clearCart();
    this.closeCheckoutModal();

    // Trigger SMS Notification Popup
    this.showSmsSimulation(orderRecord);

    // Open Confirmation Dialog
    this.showConfirmationModal(orderRecord);
  }

  showConfirmationModal(order) {
    const modal = document.getElementById('orderSuccessModal');
    const backdrop = document.getElementById('modalBackdrop');
    if (!modal || !backdrop) return;

    const idEl = document.getElementById('successOrderId');
    const totalEl = document.getElementById('successTotal');
    const courierEl = document.getElementById('successCourier');
    const waybillEl = document.getElementById('successWaybill');

    if (idEl) idEl.textContent = order.orderId;
    if (totalEl) totalEl.textContent = formatKES(order.total);
    if (courierEl) courierEl.textContent = order.courier;
    if (waybillEl) waybillEl.textContent = order.waybillNumber;

    modal.classList.add('active');
    backdrop.classList.add('active');
  }

  showSmsSimulation(order) {
    const smsBox = document.getElementById('smsSimulatorBox');
    if (!smsBox) return;

    smsBox.innerHTML = `
      <div class="sms-phone-frame">
        <div class="sms-header">
          <span style="font-size: 11px;">Africa's Talking SMS · Safaricom</span>
          <strong>ZELT SOLAR</strong>
        </div>
        <div class="sms-body">
          <p>Habari ${order.customerName}, your Zelt order <strong>#${order.orderId}</strong> for ${formatKES(order.total)} has been received!</p>
          <p style="margin-top: 6px;">Status: <em>Order Received & Processing</em>.</p>
          <p style="margin-top: 6px;">Delivery to ${order.county} via ${order.courier}. Track online at zeltsolar.co.ke/track?order=${order.orderId}. Hotline: +254701884358.</p>
        </div>
        <button class="btn btn-sm btn-outline" style="margin-top: 8px; font-size: 11px; padding: 4px 10px;" onclick="this.parentElement.parentElement.style.display='none'">Dismiss SMS</button>
      </div>
    `;
    smsBox.style.display = 'block';

    // Auto dismiss after 15 seconds
    setTimeout(() => {
      if (smsBox) smsBox.style.display = 'none';
    }, 15000);
  }
}

export const checkoutManager = new TerraCheckout();
window.zeltCheckout = checkoutManager;
