/* ==========================================================================
   ZELT SOLAR & ELECTRICALS — PROTOTYPE 3: TERRA
   Zelt Technical Solar Advisor (Powered by MOJAK PRIME AI LIMITED)
   Professional engineering advisory tailored for Kenyan energy requirements
   Zero emojis · Industry-grade terminology
   ========================================================================== */

import { PRODUCTS, formatKES, SVG_ICONS } from './products.js';

export function initChatbot() {
  const windowEl = document.getElementById('chatbotWindow');
  const fabBtn = document.getElementById('aiAdvisorFab');
  const closeBtn = document.getElementById('chatCloseBtn');
  const inputEl = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSendBtn');
  const messagesEl = document.getElementById('chatMessages');

  if (!windowEl || !fabBtn) return;

  fabBtn.addEventListener('click', () => {
    windowEl.classList.toggle('active');
    if (windowEl.classList.contains('active')) {
      if (inputEl) inputEl.focus();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      windowEl.classList.remove('active');
    });
  }

  function appendMessage(text, isUser = false, quickReplies = []) {
    if (!messagesEl) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-bot'}`;
    bubble.innerHTML = text;
    messagesEl.appendChild(bubble);

    if (quickReplies && quickReplies.length > 0) {
      const qrWrap = document.createElement('div');
      qrWrap.className = 'chat-quick-replies';
      quickReplies.forEach(qr => {
        const btn = document.createElement('button');
        btn.className = 'quick-reply-pill';
        btn.textContent = qr;
        btn.onclick = () => handleUserInput(qr);
        qrWrap.appendChild(btn);
      });
      messagesEl.appendChild(qrWrap);
    }

    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function handleUserInput(userText) {
    if (!userText.trim()) return;

    appendMessage(userText, true);
    if (inputEl) inputEl.value = '';

    // Typing indicator
    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-bubble chat-bubble-bot';
    typingBubble.innerHTML = `<em>Zelt Technical Advisor is analyzing...</em>`;
    messagesEl.appendChild(typingBubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    setTimeout(() => {
      typingBubble.remove();
      const response = generateAIResponse(userText.toLowerCase());
      appendMessage(response.text, false, response.quickReplies);
    }, 500);
  }

  if (sendBtn && inputEl) {
    sendBtn.addEventListener('click', () => handleUserInput(inputEl.value));
    inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUserInput(inputEl.value);
    });
  }

  // Professional Guided Opening Message (Zero Emojis)
  setTimeout(() => {
    appendMessage(
      `Hello, I am your <strong>Zelt Technical Advisor</strong>, powered by <em>MOJAK PRIME AI LIMITED</em>. Are you looking to size a complete home or commercial solar system, or do you have a question regarding inverters, lithium batteries, or perimeter lighting?`,
      false,
      [
        "Size a system from my KPLC bill",
        "Commercial solar floodlight specs",
        "LiFePO4 Lithium vs Gel batteries",
        "Showroom locations & dispatch"
      ]
    );
  }, 350);
}

function generateAIResponse(query) {
  // Sizing / Calculator query
  if (query.includes("size") || query.includes("bill") || query.includes("calculator") || query.includes("kplc")) {
    return {
      text: `For a typical Kenyan household with a monthly bill of <strong>KSh 4,500</strong>:
      <ul style="margin-top: 8px; padding-left: 18px; line-height: 1.6;">
        <li>Daily energy consumption averages <strong>6.6 kWh/day</strong>.</li>
        <li>Recommended solar array: <strong>1.6kW to 2.5kW</strong> (4 to 6 JA Solar 400W Tier-1 panels).</li>
        <li>Inverter capacity: <strong>3kW to 5kW Hybrid Pure Sine Wave</strong> with MPPT.</li>
        <li>Storage requirement: <strong>100Ah to 150Ah / 48V Grade-A LiFePO4 Lithium</strong>.</li>
      </ul>
      <p style="margin-top: 8px;">You can test your exact load requirements in our <a href="#calculator" onclick="window.zeltApp.navigate('calculator');" style="color:var(--accent-primary); font-weight:700; text-decoration:underline;">Engineering Sizing Calculator</a>.</p>`,
      quickReplies: [
        "Open Solar Calculator",
        "Cost of a 5kW Hybrid System",
        "Speak to Showroom Engineer on WhatsApp"
      ]
    };
  }

  // Floodlights query
  if (query.includes("floodlight") || query.includes("compound") || query.includes("outdoor") || query.includes("security")) {
    return {
      text: `Our recommended specification is the <strong>200W Commercial Solar Floodlight</strong> (KSh 6,500; comparison value KSh 8,000):
      <ul style="margin-top: 8px; padding-left: 18px; line-height: 1.6;">
        <li>Coverage area: 150 to 180 m² perimeter throw.</li>
        <li>Battery chemistry: Grade-A 3.2V 30,000mAh LiFePO4 (14 to 18 hours run time).</li>
        <li>Sensor: Smart microwave radar motion detection + IR remote control.</li>
        <li>Protection: IP65 marine powder-coated aluminum casing; 2-year warranty.</li>
      </ul>`,
      quickReplies: [
        "View 200W Floodlight details",
        "Add Floodlight to Cart",
        "Solar streetlights catalog"
      ]
    };
  }

  // Battery query
  if (query.includes("battery") || query.includes("lithium") || query.includes("gel")) {
    return {
      text: `Comparison between battery storage technologies for Kenya:
      <ul style="margin-top: 8px; padding-left: 18px; line-height: 1.6;">
        <li><strong>LiFePO4 Lithium:</strong> 6,000+ cycles (12 to 15 years lifespan), 90% depth of discharge, 2-3 hour fast charge, zero maintenance.</li>
        <li><strong>Deep Cycle Gel:</strong> 800 to 1,200 cycles (2 to 3 years lifespan), 50% max safe discharge, 8-10 hour recharge.</li>
      </ul>
      <p style="margin-top: 8px;">Lithium delivers less than half the lifetime cost per kWh compared to Gel. Read our technical analysis in the <a href="#solar-guide" onclick="window.zeltApp.openGuideModal('lithium-vs-gel')" style="color:var(--accent-primary); font-weight:700; text-decoration:underline;">Lithium vs Gel Buying Guide</a>.</p>`,
      quickReplies: [
        "View 4.8kWh Lithium Battery",
        "Inverter compatibility check",
        "Contact Technical Desk"
      ]
    };
  }

  // Showroom location & contact
  if (query.includes("shop") || query.includes("location") || query.includes("address") || query.includes("where")) {
    return {
      text: `Zelt Solar & Electricals operates two commercial showrooms in Nairobi CBD:
      <div style="margin-top: 8px; line-height: 1.6;">
        <strong>1. Flagship Showroom:</strong> Mwangaza Arcade, Shop G7, Charles Rubia Road (near Sheikh Karume Rd).<br>
        <strong>2. Distribution Branch:</strong> Jamii Business Centre (JBC) Mall, Shop 35, Sheikh Karume Road.<br>
        <strong>Hotline / WhatsApp:</strong> +254 701 884 358<br>
        <strong>Operating Hours:</strong> Monday – Saturday, 8:00 AM – 6:00 PM.<br>
        <strong>Logistics:</strong> Bodaboda express in Nairobi; Wells Fargo Couriers nationwide.
      </div>`,
      quickReplies: [
        "Call Counter (+254701884358)",
        "Chat on WhatsApp",
        "Wells Fargo Delivery Rates"
      ]
    };
  }

  // Open Calculator
  if (query.includes("open solar calculator")) {
    if (window.zeltApp) window.zeltApp.navigate('calculator');
    return {
      text: `Navigating to the 4-Step Solar Sizing Wizard. Our algorithm will calculate your photovoltaic peak wattage, inverter sizing, and LiFePO4 storage capacity.`,
      quickReplies: ["Backup only", "Off-grid complete", "Nairobi delivery"]
    };
  }

  // View details / add to cart
  if (query.includes("view 200w floodlight")) {
    if (window.zeltApp) window.zeltApp.openProductModal('zlt-fl-200');
    return {
      text: `Displaying the technical specification for the 200W Commercial Solar Floodlight.`,
      quickReplies: ["Add to Cart", "Compatibility Guide", "Ask on WhatsApp"]
    };
  }

  if (query.includes("add") && query.includes("cart")) {
    if (window.zeltCart) window.zeltCart.addItem('zlt-fl-200', 1);
    return {
      text: `The 200W Commercial Solar Floodlight has been added to your shopping cart.`,
      quickReplies: ["View Cart Drawer", "Proceed to Checkout", "Continue Shopping"]
    };
  }

  // WhatsApp routing
  if (query.includes("whatsapp") || query.includes("engineer")) {
    window.open('https://wa.me/254701884358?text=Hello%20Zelt%20Solar,%20I%20am%20chatting%20with%20your%20Technical%20Advisor%20and%20would%20like%20to%20consult%20an%20engineer.', '_blank');
    return {
      text: `Opening direct WhatsApp consultation with our Nairobi counter engineers (+254 701 884 358).`,
      quickReplies: ["Back to products", "Sizing calculator"]
    };
  }

  // Default response
  return {
    text: `Our engineering team provides genuine Tier-1 solar systems, pure sine wave inverters, and IP65 commercial lighting across Kenya. How can we assist your project today?`,
    quickReplies: [
      "Size a system from my KPLC bill",
      "Commercial solar floodlights",
      "Showroom locations",
      "WhatsApp Technical Desk"
    ]
  };
}
