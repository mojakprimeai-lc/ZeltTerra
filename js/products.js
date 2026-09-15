/* ==========================================================================
   ZELT SOLAR & ELECTRICALS — PROTOTYPE 3: TERRA
   Product Catalog & Master Inventory
   Real Kenyan Pricing (KES), Authentic Technical Specs & Industry Standards
   ========================================================================== */

export const SVG_ICONS = {
  sun: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`,
  lightbulb: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/></svg>`,
  camera: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  home: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  power: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  tube: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="10" rx="2"/><line x1="6" y1="12" x2="18" y2="12"/></svg>`,
  shield: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  switchgear: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
  battery: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="11" x2="23" y2="13"/></svg>`,
  inverter: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 12c1.5-2 3-2 4.5 0s3 2 4.5 0"/></svg>`,
  star: `<svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  check: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2D7A4F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  heartOutline: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  heartFilled: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#EF4444" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
};

export const CATEGORIES = [
  {
    id: "solar-energy",
    name: "Solar Energy Systems",
    shortName: "Solar Systems",
    iconKey: "sun",
    description: "Generate clean, dependable power from Kenya's abundant sunshine. Monocrystalline panels, hybrid inverters & LiFePO4 batteries.",
    tagline: "Power your system",
    image: "assets/images/hybrid_system.jpg",
    itemCount: 38,
    guideBanner: {
      title: "Buying Guide: What Wattage Do I Need?",
      text: "For a standard Kenyan home, a 400W–550W panel array works best with 48V hybrid inverters. Commercial setups prefer 550W–650W.",
      guideId: "sizing-kplc"
    }
  },
  {
    id: "solar-outdoor",
    name: "Solar Outdoor Lighting",
    shortName: "Outdoor Solar",
    iconKey: "lightbulb",
    description: "Secure and illuminate your compound, gate, and perimeter with zero electricity bills. Dusk-to-dawn radar floodlights & streetlights.",
    tagline: "Light your compound",
    image: "assets/images/solar_floodlight.jpg",
    itemCount: 47,
    guideBanner: {
      title: "Buying Guide: Floodlights vs Streetlights",
      text: "Floodlights provide wide beam angle for compounds and backyards. Streetlights deliver directional throw along driveways and perimeter walls.",
      guideId: "outdoor-lighting"
    }
  },
  {
    id: "solar-specialty",
    name: "Solar Specialty Products",
    shortName: "Solar Specialty",
    iconKey: "camera",
    description: "4G SIM solar security cameras, pressurized solar water heaters, and heavy-duty borehole solar pump inverters.",
    tagline: "Specialized solar equipment",
    image: "assets/images/solar_camera.jpg",
    itemCount: 22,
    guideBanner: {
      title: "Buying Guide: Solar Cameras & 4G Security",
      text: "Works anywhere in Kenya with a Safaricom or Airtel SIM card. Continuous recording without grid power or home WiFi.",
      guideId: "solar-cameras"
    }
  },
  {
    id: "indoor-decorative",
    name: "Indoor & Decorative Lighting",
    shortName: "Indoor Lighting",
    iconKey: "home",
    description: "Premium modern chandeliers, minimalist architectural pendants, magnetic track rails, downlighters and sunset lamps.",
    tagline: "Elevate your interiors",
    image: "assets/images/chandelier.jpg",
    itemCount: 54,
    guideBanner: {
      title: "Choosing Color Temperature: Warm vs Cool Light",
      text: "Warm White (3000K) creates cozy living and bedroom spaces, while Cool Day Light (6000K) is optimal for kitchens and study areas.",
      guideId: "indoor-lighting"
    }
  },
  {
    id: "outdoor-ac",
    name: "Outdoor Lighting (AC)",
    shortName: "Outdoor AC",
    iconKey: "power",
    description: "Mains-powered commercial AC floodlights, IP65 waterproof bulkheads, wall brackets and gate post lights.",
    tagline: "High-power grid lighting",
    image: "assets/images/solar_floodlight.jpg",
    itemCount: 29
  },
  {
    id: "bulbs-tubes",
    name: "Bulbs & Tubes",
    shortName: "Bulbs & Tubes",
    iconKey: "tube",
    description: "Ultra-efficient LED filament bulbs, commercial T8 diffusers, LED ceiling panels, shower lights and holders.",
    tagline: "Everyday efficient illumination",
    image: "assets/images/showroom.jpg",
    itemCount: 36
  },
  {
    id: "security-safety",
    name: "Security & Safety",
    shortName: "Security & Safety",
    iconKey: "shield",
    description: "Microwave radar sensors, photocell dusk-to-dawn switches, industrial warning sirens and optical currency detectors.",
    tagline: "Protect premises & power",
    image: "assets/images/solar_camera.jpg",
    itemCount: 18
  },
  {
    id: "electrical-infrastructure",
    name: "Electrical Infrastructure",
    shortName: "Electrical",
    iconKey: "switchgear",
    description: "Schneider & Chint MCBs, consumer units, automatic changeover switches, surge protectors, cables and PVC trunking.",
    tagline: "Wiring & switchgear for pros",
    image: "assets/images/hero.jpg",
    itemCount: 63
  }
];

export const PRODUCTS = [
  // 1. Flagship 400W Solar Panel
  {
    id: "zlt-sp-400",
    name: "400W Monocrystalline Tier-1 Solar Panel",
    subtitle: "High-Efficiency Half-Cell Mono PERC with Anodized Aluminum Frame & IP68 Junction Box",
    category: "solar-energy",
    subCategory: "Solar Panels",
    brand: "JA Solar",
    wattage: 400,
    price: 8500,
    comparePrice: 9200,
    inStock: true,
    stockQty: 32,
    soldCount: 88,
    isTopSeller: true,
    isNewArrival: false,
    badge: "TOP SELLER",
    rating: 4.9,
    reviewsCount: 17,
    image: "assets/images/hybrid_system.jpg",
    gallery: [
      "assets/images/hybrid_system.jpg",
      "assets/images/hero.jpg",
      "assets/images/showroom.jpg"
    ],
    sku: "ZLT-SP-400W-M",
    deliveryDays: 2,
    needToKnow: [
      "Generates ~1,600–2,000 Wh/day under typical Kenya sunlight (5.0 peak sun hours)",
      "Fully compatible with all standard 48V hybrid and off-grid solar inverters",
      "Backed by manufacturer 12-year product warranty and 25-year linear power warranty"
    ],
    compatibility: {
      type: "panel",
      voc: "49.8V",
      isc: "10.36A",
      vmp: "41.8V",
      imp: "9.57A"
    },
    specs: {
      "Rated Peak Power": "400W (STC 1000W/m²)",
      "Cell Type": "Monocrystalline Half-Cell PERC",
      "Module Efficiency": "21.3%",
      "Open Circuit Voltage (Voc)": "49.8V",
      "Short Circuit Current (Isc)": "10.36A",
      "Optimum Operating Voltage (Vmp)": "41.8V",
      "Optimum Operating Current (Imp)": "9.57A",
      "Dimensions": "1755 × 1038 × 35 mm",
      "Weight": "20.5 kg",
      "Warranty": "25 Years Linear Performance"
    },
    features: [
      "Multi-busbar technology enhances light absorption and current collection",
      "Certified to withstand high wind loads (2400 Pascal) and heavy hail",
      "Anti-reflective tempered solar glass ensures peak yield during overcast Nairobi mornings",
      "Pre-drilled grounded holes for easy roof or ground racking mounts"
    ]
  },

  // 2. 200W Commercial Solar Floodlight
  {
    id: "zlt-fl-200",
    name: "200W Commercial Solar Floodlight with Radar Motion Sensor",
    subtitle: "IP65 Weatherproof Heavy-Duty Die-Cast Aluminum with Monocrystalline Solar Panel & Remote",
    category: "solar-outdoor",
    subCategory: "Solar Floodlights",
    brand: "MODI Solar",
    wattage: 200,
    price: 6500,
    comparePrice: 8000,
    inStock: true,
    stockQty: 14,
    soldCount: 142,
    isTopSeller: true,
    isNewArrival: false,
    badge: "BEST SELLER",
    rating: 4.8,
    reviewsCount: 23,
    image: "assets/images/solar_floodlight.jpg",
    gallery: [
      "assets/images/solar_floodlight.jpg",
      "assets/images/hero.jpg",
      "assets/images/showroom.jpg"
    ],
    sku: "ZLT-FL-200W-IP65",
    deliveryDays: 1,
    needToKnow: [
      "Illuminates an area of 150–180 m² with vivid 6500K daylight beam",
      "Built-in Grade-A LiFePO4 battery delivers 14–18 hours of continuous night lighting",
      "Includes wireless multi-mode remote control and heavy-duty steel mounting bracket"
    ],
    specs: {
      "Power Rating": "200W High Lumen LED",
      "Luminous Flux": "7,200 Lumens",
      "Battery Type": "Grade-A 3.2V 30,000mAh LiFePO4",
      "Solar Panel": "6V 35W High-Efficiency Monocrystalline",
      "Charging Time": "4–6 Hours direct sunlight",
      "Discharge Duration": "14–18 Hours (Dusk-to-Dawn)",
      "Sensor Range": "Smart Microwave Radar up to 10–12 meters",
      "Waterproof Rating": "IP65 Marine Powder Coating",
      "Warranty": "2 Years Full Replacement Warranty"
    },
    features: [
      "Auto dusk-to-dawn intelligence turns light on at dusk and off at sunrise",
      "Smart radar sensor automatically brightens to 100% when movement is detected",
      "Die-cast aluminum heat-dissipating shell resists coastal salt spray and sun degradation",
      "Includes 5-meter heavy-duty DC copper cable with waterproof bayonet connector"
    ]
  },

  // 3. 5kW 48V Hybrid Solar Inverter
  {
    id: "zlt-inv-5k",
    name: "5kW 48V Pure Sine Wave Hybrid Solar Inverter",
    subtitle: "Built-in 100A MPPT Solar Charge Controller with WiFi Monitoring & Generator Auto-Start",
    category: "solar-energy",
    subCategory: "Solar Inverters",
    brand: "Growatt / Deye",
    wattage: 5000,
    price: 68000,
    comparePrice: 78000,
    inStock: true,
    stockQty: 8,
    soldCount: 39,
    isTopSeller: true,
    isNewArrival: false,
    badge: "EXPERT CHOICE",
    rating: 4.9,
    reviewsCount: 14,
    image: "assets/images/hybrid_system.jpg",
    gallery: [
      "assets/images/hybrid_system.jpg",
      "assets/images/hero.jpg"
    ],
    sku: "ZLT-INV-5000W-48V",
    deliveryDays: 2,
    needToKnow: [
      "Powers your entire home: Refrigerator, borehole pump, TV, lighting, and kitchen appliances",
      "Seamless 10ms transfer switch ensures computers and TVs never reboot during KPLC blackouts",
      "Compatible with both Lithium (LiFePO4) and Gel deep cycle battery banks"
    ],
    compatibility: {
      type: "inverter",
      maxPvPower: "5500W",
      mpptRange: "120V–450V DC",
      nominalBatteryVolt: "48V DC"
    },
    specs: {
      "Continuous AC Power": "5,000 Watts (5kVA)",
      "Surge Power Rating": "10,000 Watts (Peak inductive motor start)",
      "Output Waveform": "Pure Sine Wave (THD < 3%)",
      "Battery System Voltage": "48V DC Nominal",
      "Max MPPT PV Input Array": "5,500 Watts",
      "MPPT Voltage Range": "120V – 450V DC",
      "Max PV Open Circuit Voltage": "500V DC",
      "Communication": "RS485, CAN, USB, Built-in WiFi Dongle",
      "Warranty": "3 Years Comprehensive Warranty"
    },
    features: [
      "Simultaneous solar, battery, and KPLC grid blending for maximum monthly savings",
      "Zero-export functionality prevents backfeeding to KPLC meter if unpermitted",
      "Programmable charging priority: Solar first, Utility backup, or Hybrid",
      "Mobile iOS / Android app for live monitoring of generation, consumption, and battery state"
    ]
  },

  // 4. 4.8kWh 48V Lithium Battery
  {
    id: "zlt-bat-48v",
    name: "4.8kWh 48V 100Ah LiFePO4 Lithium Battery Bank",
    subtitle: "Grade-A Smart BMS with 6,000+ Deep Cycles & Active Battery Balancing",
    category: "solar-energy",
    subCategory: "Solar Batteries",
    brand: "Felicity Solar / Pylontech",
    wattage: 4800,
    price: 135000,
    comparePrice: 152000,
    inStock: true,
    stockQty: 6,
    soldCount: 27,
    isTopSeller: true,
    isNewArrival: false,
    badge: "10-YEAR LIFESPAN",
    rating: 5.0,
    reviewsCount: 11,
    image: "assets/images/hybrid_system.jpg",
    gallery: ["assets/images/hybrid_system.jpg"],
    sku: "ZLT-BAT-48V-100AH",
    deliveryDays: 2,
    needToKnow: [
      "Stores 4.8 units (kWh) of usable electrical energy for night-time household use",
      "Over 6,000 cycles at 80% Depth-of-Discharge (DoD) — lasts 12–15 years",
      "Plug-and-play communication with Growatt, Deye, Victron, and Must inverters"
    ],
    specs: {
      "Nominal Energy": "4,800 Wh (4.8 kWh)",
      "Nominal Voltage": "48V DC",
      "Capacity": "100Ah",
      "Cell Chemistry": "Lithium Iron Phosphate (LiFePO4)",
      "Cycle Life": "6,000+ Cycles @ 80% DoD, 25°C",
      "Max Charge Current": "50A recommended (100A peak)",
      "Max Discharge Current": "100A continuous",
      "Dimensions": "482 × 480 × 133 mm (3U Rack Mount)",
      "Weight": "42 kg",
      "Warranty": "5 Years Manufacturer Warranty"
    },
    features: [
      "Integrated Smart Battery Management System (BMS) prevents overcharging, short circuit, and thermal runaway",
      "Built-in LCD screen displays cell voltages, current, temperature, and State of Charge (SoC)",
      "Parallel scalability up to 15 battery modules (72 kWh total capacity)",
      "Zero maintenance required — no water topping or acid fumes unlike lead-acid batteries"
    ]
  },

  // 5. 4G SIM Solar Security Camera
  {
    id: "zlt-cam-4g",
    name: "4G Solar PTZ CCTV Camera with Color Night Vision",
    subtitle: "Standalone 2K Quad-HD Security with Built-in 8W Solar Panel, Two-Way Audio & PIR Human Tracking",
    category: "solar-specialty",
    subCategory: "Solar Cameras (4G/WiFi)",
    brand: "UBox / Vstarcam",
    wattage: 8,
    price: 9500,
    comparePrice: 11500,
    inStock: true,
    stockQty: 18,
    soldCount: 94,
    isTopSeller: true,
    isNewArrival: false,
    badge: "HOT SELLER",
    rating: 4.7,
    reviewsCount: 31,
    image: "assets/images/solar_camera.jpg",
    gallery: [
      "assets/images/solar_camera.jpg",
      "assets/images/hero.jpg"
    ],
    sku: "ZLT-CAM-4G-PTZ",
    deliveryDays: 1,
    needToKnow: [
      "Requires no electricity grid and no home WiFi — connects directly via Safaricom/Airtel 4G SIM",
      "355° Pan and 90° Tilt allows remote smartphone viewing from anywhere in the world",
      "Equipped with PIR human heat sensor to send instant intrusion notifications to your phone"
    ],
    specs: {
      "Resolution": "2K Super HD (2560 × 1440p)",
      "Connectivity": "4G LTE Cellular (Nano-SIM Card Slot)",
      "Solar Panel": "8W Monocrystalline Integrated/Detachable Panel",
      "Battery": "15,600mAh Rechargeable Lithium Pack",
      "Night Vision": "Full Color Spotlight Night Vision (up to 25m)",
      "Storage": "MicroSD Slot (up to 128GB) & Encrypted Cloud",
      "Audio": "Two-way talk with noise-canceling mic & speaker",
      "Waterproofing": "IP66 All-Weather Heavy Rainproof",
      "Warranty": "1 Year Full Warranty"
    },
    features: [
      "Continuous non-stop operation even through 5 straight cloudy days in Limuru or Kericho",
      "AI human detection filters out swaying trees, rain, and livestock to eliminate false alarms",
      "Two-way talk lets you speak to visitors or ward off intruders directly from your mobile app",
      "Includes 3-meter extension cord for mounting solar panel on roof while camera is under eaves"
    ]
  },

  // 6. Contemporary Nordic Ring Chandelier
  {
    id: "zlt-ch-nordic",
    name: "Nordic 3-Ring Minimalist LED Chandelier",
    subtitle: "Architectural Aluminum & Silicone Diffuser with Tri-Color Dimmable Lighting & Remote",
    category: "indoor-decorative",
    subCategory: "Chandeliers",
    brand: "Zelt Signature",
    wattage: 90,
    price: 18500,
    comparePrice: 22000,
    inStock: true,
    stockQty: 9,
    soldCount: 33,
    isTopSeller: false,
    isNewArrival: true,
    badge: "NEW ARRIVAL",
    rating: 4.9,
    reviewsCount: 15,
    image: "assets/images/chandelier.jpg",
    gallery: [
      "assets/images/chandelier.jpg",
      "assets/images/showroom.jpg"
    ],
    sku: "ZLT-CH-3RING-GOLD",
    deliveryDays: 1,
    needToKnow: [
      "Adjustable aircraft cables allow customizable geometric configurations (nested rings, wave, or cascading)",
      "Includes remote to seamlessly switch between 3000K Warm, 4500K Neutral, and 6000K Daylight",
      "Ideal centerpiece for dining rooms, high-ceiling living rooms, and reception lounges"
    ],
    specs: {
      "Ring Diameters": "60cm + 40cm + 20cm",
      "Total Wattage": "90W High-Efficiency LED",
      "Finish": "Brushed Warm Champagne Gold / Anodized Black",
      "Suspension Cable": "Adjustable up to 150 cm",
      "Voltage": "220V–240V AC 50Hz",
      "Dimmable": "Yes, stepless dimming via RF Remote",
      "Warranty": "2 Years Replacement Warranty"
    },
    features: [
      "High CRI (>90) rendering brings out the true rich colors of furniture and decor",
      "Flicker-free eye-protection driver protects eyes and works perfectly on solar inverters",
      "Premium brushed aluminum body prevents rusting and dust attraction",
      "Pre-assembled rings ensure straightforward mounting for any qualified electrician"
    ]
  },

  // 7. 100W All-In-One Solar Streetlight
  {
    id: "zlt-sl-100",
    name: "100W Integrated Commercial Solar Streetlight",
    subtitle: "Dusk-to-Dawn Streetlight with Monocrystalline Top & High-Angle Batwing Optical Lens",
    category: "solar-outdoor",
    subCategory: "Solar Street Lights",
    brand: "MODI Solar",
    wattage: 100,
    price: 8900,
    comparePrice: 10500,
    inStock: true,
    stockQty: 21,
    soldCount: 110,
    isTopSeller: true,
    isNewArrival: false,
    badge: "ESTATE CHOICE",
    rating: 4.8,
    reviewsCount: 19,
    image: "assets/images/solar_floodlight.jpg",
    gallery: ["assets/images/solar_floodlight.jpg"],
    sku: "ZLT-SL-100W-AIO",
    deliveryDays: 1,
    needToKnow: [
      "Engineered for perimeter fencing, estate access roads, farm driveways, and security posts",
      "Batwing optical lens distributes beam 140° wide to eliminate blind dark spots between poles",
      "Fits standard 50mm–60mm pole mount brackets (bracket and bolts included in box)"
    ],
    specs: {
      "Power": "100W Ultra Bright",
      "Luminous Output": "6,500 Lumens",
      "Battery": "3.2V 24,000mAh LiFePO4",
      "Solar Panel": "6V 28W Integrated Mono",
      "Mounting Diameter": "60mm Pole Socket",
      "Recommended Height": "4–6 Meters",
      "Lighting Time": "14+ Hours Nightly",
      "Warranty": "2 Years Official Warranty"
    },
    features: [
      "All-in-one unified body: Solar panel, lithium battery, LEDs, and MPPT controller in a single rugged housing",
      "Auto dawn/dusk light sensor with optional timed dimming profiles",
      "Corrosion-resistant ABS and aluminum alloy withstands harsh sun and tropical rain",
      "Zero wiring required — bolt to pole and turn on with remote once"
    ]
  },

  // 8. 63A Automatic Transfer Switch
  {
    id: "zlt-ats-63a",
    name: "63A 2P Automatic Transfer Switch (ATS) Dual Power Changeover",
    subtitle: "Seamless Solar-to-Grid Automatic Switching for Consumer Units & Inverter Protection",
    category: "electrical-infrastructure",
    subCategory: "Changeover & Isolators",
    brand: "Chint / Schneider",
    wattage: 0,
    price: 4800,
    comparePrice: 5800,
    inStock: true,
    stockQty: 28,
    soldCount: 64,
    isTopSeller: false,
    isNewArrival: false,
    badge: "CONTRACTOR ESSENTIAL",
    rating: 4.9,
    reviewsCount: 22,
    image: "assets/images/hero.jpg",
    gallery: ["assets/images/hero.jpg"],
    sku: "ZLT-ATS-63A-2P",
    deliveryDays: 1,
    needToKnow: [
      "Automatically transfers household electrical load between Solar Inverter and KPLC mains in milliseconds",
      "Prevents dangerous accidental backfeeding into the grid or damaging your inverter",
      "Standard 35mm DIN rail mounting fits cleanly into any existing domestic consumer unit"
    ],
    specs: {
      "Rated Current": "63A Amperes",
      "Poles": "2P (Single Phase + Neutral)",
      "Transfer Time": "< 50 milliseconds",
      "Operating Voltage": "220V AC 50/60Hz",
      "Modes": "Automatic & Manual Toggle Handle",
      "Mounting": "Standard 35mm DIN Rail",
      "Warranty": "2 Years Warranty"
    },
    features: [
      "Silver alloy contacts guarantee high conductivity and zero contact welding",
      "Mechanical and electrical dual interlock ensures only one power source connects at a time",
      "Visual LED indicators display active source (Mains vs Backup)",
      "Certified to IEC60947-6-1 international electrical safety standards"
    ]
  }
];

// Utility: Format KES Currency (e.g. KSh 6,500)
export function formatKES(amount) {
  if (typeof amount !== 'number') amount = Number(amount) || 0;
  return `KSh ${amount.toLocaleString('en-KE')}`;
}

// Utility: Calculate Savings in KES
export function calculateSaving(price, comparePrice) {
  if (!comparePrice || comparePrice <= price) return 0;
  return comparePrice - price;
}

// Utility: Get Product by ID
export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

// Utility: Get Products by Category
export function getProductsByCategory(catId) {
  if (!catId || catId === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === catId);
}

// Utility: Render Stars SVG
export function renderStarsHtml(count = 5) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    stars += SVG_ICONS.star;
  }
  return stars;
}
