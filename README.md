# Zelt Solar & Electricals — Prototype 3: TERRA
> *"The Solar Experts. Right Here in Nairobi."*

A state-of-the-art, professional e-commerce platform and solar engineering advisory web application built for **Zelt Solar & Electricals Kenya** (Mwangaza Arcade G7 & JBC Mall 35, Nairobi CBD).

Designed according to the **TERRA** design system ("Warm Earthy Trust") featuring natural tones, deep forest greens (`#2D7A4F`, `#1A2E1F`), solar ambers (`#F59E0B`), elegant serif typography (`Fraunces`), and 100% vector SVG icons with strictly zero emojis.

---

## Key Features & Capabilities

### 1. Interactive Solar Sizing Engines
- **Compact Quick-Estimator (Homepage):** Real-time solar array, LiFePO4 battery bank, hybrid inverter sizing, financial estimation, and carbon offset calculations with appliance chip toggles.
- **4-Step Comprehensive Sizing Wizard:**
  - Step 1: Kenya Power (KPLC) monthly bill input (KES 1,000 – 100,000+).
  - Step 2: Appliance load audit (lights, TV, refrigeration, water pumping, AC).
  - Step 3: Energy objective selection (Bill Reduction, Pure Backup, or 100% Off-Grid).
  - Step 4: Full engineering specification sheet, payback period, and 1-click WhatsApp counter handoff.

### 2. Verified Technical Solar Tools
- **Inverter & Solar Panel Compatibility Calculator:** Evaluates DC MPPT startup voltages, maximum array peak wattage, and delivers technical sizing validation.
- **Side-by-Side Product Comparison Engine:** Compares up to 4 solar panels, floodlights, or inverters with detailed spec breakdowns.
- **Interactive Order Tracking:** Real-time 5-stage tracking simulation (`Confirmed`, `Packed`, `Dispatched via Wells Fargo / Bodaboda`, `Out for Delivery`, `Delivered`).

### 3. Comprehensive Product Catalog & E-Commerce
- **8 Master Product Categories:**
  1. Solar Energy Systems (Hybrid Inverters, LiFePO4 Batteries, Monocrystalline Panels)
  2. Solar Outdoor Lighting (Commercial 100W–500W Floodlights, Integrated Streetlights)
  3. Solar Specialty & Security (4G CCTV Solar Cameras, Solar Water Pumps)
  4. Indoor & Decorative Lighting (Recessed LED Downlights, Chandeliers)
  5. Outdoor Lighting AC (IP66 Stadium Floodlights, Landscape Spotlights)
  6. Bulbs & Tubes (LED T8 Tubes, Filament Bulbs, Motion Sensor Bulbs)
  7. Security & Safety (Solar Siren Alarms, Microwave Sensors)
  8. Electrical Infrastructure (Schneider MCBs, Distribution Boards, Pure Copper Cables)
- **Kenyan Localized Checkout:**
  - M-Pesa STK Push integration simulation.
  - Cash on Delivery (COD) for Nairobi CBD orders.
  - Nationwide courier shipping (Wells Fargo Couriers, G4S, Bodaboda Express).
  - Showroom pickup at Mwangaza Arcade G7 or JBC Mall 35.

### 4. Technical Advisor AI Chatbot
- Embedded interactive solar advisor trained on Kenyan electrical standards, blackouts, battery chemistry (LiFePO4 vs Gel), and inverter topologies.

### 5. Responsive & Professional Design
- 100% vector SVG icons throughout (zero emojis).
- Fully responsive from 320px mobile screens (iPhone SE, Galaxy Fold) up to 4K ultra-wide desktop monitors.
- Bottom sheet mobile modals, touch targets meeting 44–48px standards, and zero horizontal overflow.
- Optimized for deployment on **Netlify** with clean SPA fallback routing.

---

## Project Structure

```
ZeltTerra/
├── index.html              # Core single-page application entry
├── netlify.toml            # Netlify build and routing configuration
├── _redirects              # Netlify SPA rewrite rules
├── .gitignore              # Git ignore rules
├── README.md               # Documentation and technical guide
├── assets/
│   └── images/             # Product and showroom photography
├── js/
│   ├── app.js              # SPA navigation, state manager & bootstrapper
│   ├── calculator.js       # Solar sizing math, payback models & wizard
│   ├── cart.js             # Cart state, free delivery progress & drawer
│   ├── chatbot.js          # Technical solar advisor chatbot
│   ├── checkout.js         # M-Pesa STK push & Kenyan delivery checkout
│   ├── compatibility.js    # Inverter & solar panel electrical validator
│   ├── comparison.js       # Side-by-side product comparison modal
│   ├── guides.js           # 6 technical solar buying guides
│   ├── products.js         # Master product database (KES pricing & specs)
│   └── tracking.js         # Order tracking engine
└── styles/
    ├── variables.css       # Design tokens, color palette, typography & shadows
    ├── layout.css          # Top bar, header, hero, footer, responsive containers
    ├── components.css      # Product cards, badges, buttons, modals, drawers
    ├── calculator.css      # Quick calculator & 4-step sizing wizard UI
    └── responsive.css      # Mobile, tablet, and desktop breakpoint rules
```

---

## Deployment to Netlify

This repository is pre-configured for instant zero-configuration deployment on Netlify:
1. Connect this GitHub repository (`https://github.com/mojakprimeai-lc/ZeltTerra.git`) to Netlify.
2. Build command: *(leave empty)*
3. Publish directory: `.` (or root directory)
4. Netlify will automatically detect `_redirects` and `netlify.toml` to serve the application seamlessly.

---

© 2026 Zelt Solar & Electricals. Nairobi, Kenya. Powered by Mojak Prime AI.
