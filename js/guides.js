/* ==========================================================================
   ZELT SOLAR & ELECTRICALS — PROTOTYPE 3: TERRA
   Solar Buying Guides Library (Editorial Knowledge Base)
   "Everything you need to know before you buy. Written by the Zelt team."
   ========================================================================== */

export const BUYING_GUIDES = [
  {
    id: "sizing-kplc",
    title: "How to Size a Solar System Using Your KPLC Bill",
    readTime: "5 min read",
    badge: "ESSENTIAL GUIDE",
    summary: "Most Nairobi households either overspend on oversized equipment or buy systems that leave them in the dark. Here is the exact calculation method our showroom engineers use.",
    content: `
      <h3>Step 1: Convert Your Money into Energy Units (kWh)</h3>
      <p>Your KPLC token or postpaid bill is charged in Kenya Shillings, but solar systems are measured in <strong>Kilowatt-hours (kWh)</strong>. In Kenya, the average domestic tariff (including fuel energy charge, inflation adjustment, and VAT) averages approximately <strong>KES 22.50 per kWh</strong>.</p>
      
      <div style="background:#F2F0EA; padding:16px; border-left:4px solid #2D7A4F; margin:16px 0; border-radius:0 8px 8px 0;">
        <strong>The Quick Formula:</strong><br>
        <code>Monthly Units (kWh) = Your Monthly Bill (KES) ÷ 22.5</code><br>
        <em>Example: KSh 4,500 ÷ 22.5 = 200 kWh per month (approx. 6.6 kWh per day).</em>
      </div>

      <h3>Step 2: Calculate Required Solar Panel Wattage</h3>
      <p>Kenya enjoys world-class solar irradiance. On average, Nairobi receives <strong>5.0 Peak Sun Hours (PSH)</strong> per day, while upcountry locations like Nakuru, Kisumu, and Eldoret receive <strong>5.5 to 6.0 hours</strong>.</p>
      <p>To generate 6.6 kWh daily with an 80% system efficiency buffer:</p>
      <p><code>Required Solar Array = 6.6 kWh ÷ 5.0 hours ÷ 0.80 = 1.65 kW (1,650 Watts)</code></p>
      <p>This equals approximately <strong>four 400W Monocrystalline panels</strong>.</p>

      <h3>Step 3: Sizing Your Battery Bank</h3>
      <p>Solar panels only produce during daylight hours (typically 8:00 AM to 5:30 PM). For evening lighting, TVs, and refrigeration, you need battery storage. A standard Kenyan family uses roughly 60% of their daily energy after sunset.</p>
      <p>For a 6.6 kWh daily home, a <strong>4.8kWh to 5kWh LiFePO4 Lithium battery</strong> provides uninterrupted night-time power with zero flickering.</p>

      <h3>Ready to find your system?</h3>
      <p>You don't need to do these calculations by hand — our interactive calculator does it all in 30 seconds.</p>
    `,
    relatedProductId: "zlt-sp-400"
  },
  {
    id: "lithium-vs-gel",
    title: "Lithium vs Gel Batteries — Which Is Right for Your Home?",
    readTime: "4 min read",
    badge: "BATTERY COMPARISON",
    summary: "Gel batteries seem cheaper at first glance, but Lithium Iron Phosphate (LiFePO4) lasts five times longer. An honest breakdown of lifetime costs.",
    content: `
      <h3>The Upfront Price vs. Lifetime Reality</h3>
      <p>When customers visit our Mwangaza Arcade counter, the most frequent dilemma is battery cost. A 200Ah 12V Gel battery costs around KSh 32,000, while a 4.8kWh Lithium battery is KSh 135,000. Why do smart buyers choose Lithium?</p>

      <div class="table-responsive" style="overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 20px 0; border-radius: 8px; border: 1px solid var(--border-color);">
        <table style="width:100%; border-collapse:collapse; font-size:14px; min-width: 480px;">
          <thead>
            <tr style="background:#2D7A4F; color:#FFFFFF;">
              <th style="padding:10px; text-align:left;">Feature</th>
              <th style="padding:10px; text-align:left;">LiFePO4 Lithium</th>
              <th style="padding:10px; text-align:left;">Deep Cycle Gel</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #D6D3CC;">
              <td style="padding:10px; font-weight:600;">Cycle Life (80% DoD)</td>
              <td style="padding:10px; color:#166534; font-weight:700;">6,000+ Cycles (12–15 yrs)</td>
              <td style="padding:10px; color:#991B1B;">800–1,200 Cycles (2–3 yrs)</td>
            </tr>
            <tr style="border-bottom:1px solid #D6D3CC;">
              <td style="padding:10px; font-weight:600;">Usable Depth of Discharge</td>
              <td style="padding:10px;">85% – 95%</td>
              <td style="padding:10px;">50% (Deeper damages cells)</td>
            </tr>
            <tr style="border-bottom:1px solid #D6D3CC;">
              <td style="padding:10px; font-weight:600;">Charging Speed</td>
              <td style="padding:10px;">Fast (2–3 hours)</td>
              <td style="padding:10px;">Slow (8–10 hours)</td>
            </tr>
            <tr>
              <td style="padding:10px; font-weight:600;">Weight & Footprint</td>
              <td style="padding:10px;">Compact 42 kg</td>
              <td style="padding:10px;">Heavy 140+ kg bank</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>The Zelt Verdict</h3>
      <p>If you need temporary backup power for an emergency light or Wi-Fi router on a tight budget, Gel is adequate. But for a home system running a fridge, TVs, and lighting, <strong>Lithium works out to less than half the cost per year</strong> because you will not be replacing it every 24 months.</p>
    `,
    relatedProductId: "zlt-bat-48v"
  },
  {
    id: "hybrid-vs-offgrid",
    title: "Grid-Tied vs Off-Grid vs Hybrid Solar Systems",
    readTime: "6 min read",
    badge: "SYSTEM ARCHITECTURE",
    summary: "Understanding the three primary system architectures prevents buying equipment that cannot legally connect or operate during power outages.",
    content: `
      <h3>1. Off-Grid Systems (100% Independence)</h3>
      <p>An Off-Grid system has no connection whatsoever to Kenya Power (KPLC). It relies entirely on solar panels and batteries. During rainy weeks, backup is provided by a fuel generator.</p>
      <p><strong>Best for:</strong> Rural homes, lodges, agricultural boreholes, and remote areas where grid connectivity does not exist.</p>

      <h3>2. Grid-Tied Systems (Bill Reduction Only)</h3>
      <p>Grid-tied systems feed solar power directly into your home circuits during the day. However, for utility worker safety, <strong>they shut down automatically when KPLC has a blackout</strong> unless paired with specialized islanding equipment.</p>

      <h3>3. Hybrid Systems (The Ultimate Choice for Kenya)</h3>
      <p>A Hybrid inverter seamlessly blends all three sources:</p>
      <ul>
        <li><strong>Daytime:</strong> Powers home loads directly from sunshine, routing surplus into batteries.</li>
        <li><strong>Evening:</strong> Draws from your battery bank to avoid high peak-rate KPLC charges.</li>
        <li><strong>Blackout:</strong> Switches over in under 10 milliseconds — your computers, TVs, and lights do not even flicker.</li>
        <li><strong>Cloudy days:</strong> If batteries run low, it gently tops them up from the grid at off-peak rates.</li>
      </ul>
      <p>Over 85% of our residential clients in Nairobi install Hybrid systems.</p>
    `,
    relatedProductId: "zlt-inv-5k"
  },
  {
    id: "outdoor-lighting",
    title: "Solar Outdoor Lighting Guide: Floodlights, Streetlights & Gates",
    readTime: "4 min read",
    badge: "SECURITY & LIGHTING",
    summary: "Don't pay KPLC to light your compound or perimeter fence. How to select the correct lumen output and battery capacity for all-night security.",
    content: `
      <h3>Choosing the Right Wattage for Your Space</h3>
      <p>A floodlight labeled "300W" from an unverified street vendor often outputs less light than a genuine 100W commercial unit with Grade-A LED chips.</p>
      <ul>
        <li><strong>50W – 100W:</strong> Perfect for residential gates, front entryways, and small backyard gardens (up to 80 m²).</li>
        <li><strong>200W:</strong> The gold standard for typical Nairobi suburban compounds, parking aprons, and perimeter fences (up to 180 m²).</li>
        <li><strong>300W – 500W:</strong> Industrial yards, godowns, school compounds, and commercial perimeter walls.</li>
      </ul>

      <h3>What to Check in the Specifications</h3>
      <p>Always inspect the <strong>Battery Capacity (mAh)</strong> and <strong>Solar Panel Size</strong>. A 200W light needs at least a 30,000mAh LiFePO4 battery and a 35W monocrystalline panel to stay bright through morning hours (5:00 AM) during Nairobi's colder months of June and July.</p>
    `,
    relatedProductId: "zlt-fl-200"
  },
  {
    id: "inverter-guide",
    title: "How to Choose an Inverter: PWM vs MPPT, Hybrid vs Pure Sine Wave",
    readTime: "7 min read",
    badge: "TECHNICAL GUIDE",
    summary: "Modified sine wave inverters destroy refrigerator compressors and cause hums in audio systems. Why pure sine wave and MPPT controllers are essential.",
    content: `
      <h3>Modified Sine Wave vs Pure Sine Wave</h3>
      <p>Never run modern appliances on a "Modified" or "Square Wave" inverter. AC equipment in Kenya is designed for a clean, smooth 50Hz sine wave. Modified sine waves cause motors (fridges, fans, blenders) to overheat and can fry TV mainboards.</p>
      <p>Every inverter sold at Zelt is <strong>100% Pure Sine Wave (THD &lt; 3%)</strong>.</p>

      <h3>PWM vs MPPT Charge Controllers</h3>
      <p>The solar charge controller regulates the voltage coming from the solar panels into your battery:</p>
      <ul>
        <li><strong>PWM (Pulse Width Modulation):</strong> Clips high panel voltage down to battery voltage, wasting up to 30% of available solar power. Only acceptable for small 1–2 panel setups.</li>
        <li><strong>MPPT (Maximum Power Point Tracking):</strong> Continuously tracks optimal voltage and current to squeeze out up to 98% efficiency. An MPPT controller pays for itself within months.</li>
      </ul>
    `,
    relatedProductId: "zlt-inv-5k"
  },
  {
    id: "panel-wattage",
    title: "Understanding Solar Panel Wattage: What Does kW Mean?",
    readTime: "3 min read",
    badge: "BEGINNER GUIDE",
    summary: "Watts, Kilowatts, and Kilowatt-hours demystified in plain language for non-engineers.",
    content: `
      <h3>Watts vs Kilowatts: The Basics</h3>
      <p>A <strong>Watt (W)</strong> is a unit of power — how fast electricity is generated or consumed. One <strong>Kilowatt (kW)</strong> is simply 1,000 Watts.</p>
      <p>For example, if you have six 400W solar panels on your roof:</p>
      <p><code>6 × 400W = 2,400 Watts = 2.4 kW peak output</code></p>

      <h3>What is a Kilowatt-Hour (kWh)?</h3>
      <p>A <strong>Kilowatt-hour (kWh)</strong> is energy over time. It is the exact "unit" you purchase from KPLC when you buy electricity tokens. If your 2.4 kW solar array produces for 5 peak sunlight hours, it generates:</p>
      <p><code>2.4 kW × 5 hours = 12 kWh (units) of energy per day</code></p>
      <p>At KES 22.50 per unit, that is <strong>KES 270 per day or KES 8,100 per month</strong> in free electricity from your roof.</p>
    `,
    relatedProductId: "zlt-sp-400"
  }
];

export function getGuideById(id) {
  return BUYING_GUIDES.find(g => g.id === id) || null;
}
