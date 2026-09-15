/* ==========================================================================
   ZELT SOLAR & ELECTRICALS — PROTOTYPE 3: TERRA
   Solar Sizing Calculator Engine (Embedded Compact + 4-Step Wizard)
   ========================================================================== */

import { formatKES } from './products.js';

export class TerraSolarCalculator {
  constructor() {
    this.bill = 4500; // Default KSh 4,500
    this.appliances = ['lights', 'tv', 'fridge', 'chargers', 'computer'];
    this.goal = 'reduce'; // 'backup', 'reduce', 'offgrid'
    this.location = 'nairobi'; // 'nairobi' (5.0 hrs) vs 'upcountry' (5.5 hrs)
    this.wizardStep = 1;
  }

  calculate() {
    // 1. Convert KPLC bill to monthly and daily kWh (Average Kenya tariff KES 22.50/kWh)
    const tariffPerKwh = 22.50;
    const monthlyKwh = Math.max(40, this.bill / tariffPerKwh);
    const dailyKwh = monthlyKwh / 30;

    // 2. Peak Sun Hours based on location
    const peakSunHours = this.location === 'nairobi' ? 5.0 : 5.5;

    // 3. Solar Array kW required
    // Formula: Daily kWh / Peak Sun Hours / 0.80 efficiency buffer
    let solarKw = (dailyKwh / peakSunHours) / 0.80;
    if (this.goal === 'backup') {
      solarKw = solarKw * 0.55; // Array sized primarily to recharge backup battery
    } else if (this.goal === 'offgrid') {
      solarKw = solarKw * 1.30; // Extra margin for consecutive overcast days
    }
    solarKw = Math.round(solarKw * 10) / 10;
    solarKw = Math.max(1.2, solarKw);

    // Number of 400W Monocrystalline Panels
    const panelsCount400W = Math.ceil((solarKw * 1000) / 400);

    // 4. Battery Storage Capacity (kWh and Ah at 48V)
    // Formula: Daily kWh * Days backup / 0.85 DoD
    const backupDays = this.goal === 'offgrid' ? 2.0 : (this.goal === 'reduce' ? 1.0 : 0.7);
    let batteryKwh = (dailyKwh * backupDays) / 0.85;
    batteryKwh = Math.round(batteryKwh * 10) / 10;
    batteryKwh = Math.max(2.4, batteryKwh);

    const batteryAh48V = Math.round((batteryKwh * 1000) / 48);

    // 5. Inverter Sizing (kW) based on selected load
    let baseWatts = 1200;
    if (this.appliances.includes('fridge')) baseWatts += 800; // Compressor surge
    if (this.appliances.includes('pump')) baseWatts += 2200;
    if (this.appliances.includes('ac')) baseWatts += 2500;
    if (this.appliances.includes('waterheater')) baseWatts += 2000;
    if (this.appliances.includes('computer')) baseWatts += 300;
    if (this.appliances.includes('kettle')) baseWatts += 1800;

    let inverterKw = Math.ceil((baseWatts * 1.25) / 1000);
    if (inverterKw < 3) inverterKw = 3;
    else if (inverterKw > 3 && inverterKw <= 5) inverterKw = 5;
    else if (inverterKw > 5 && inverterKw <= 7) inverterKw = 6;
    else if (inverterKw > 7) inverterKw = 8;

    // 6. Cost Estimation (KES)
    // Panels: KSh 21,250 per kW (JA Solar 400W @ 8.5k)
    // Inverters: 3kW ~45k, 5kW ~68k, 6kW ~85k, 8kW ~110k
    // LiFePO4 Battery: ~KSh 28,000 per kWh
    // Racking, DC/AC breakers, cables, ATS, labor: ~KSh 35,000
    const panelsCost = solarKw * 21250;
    const invCost = inverterKw <= 3 ? 45000 : (inverterKw <= 5 ? 68000 : (inverterKw <= 6 ? 85000 : 110000));
    const batCost = batteryKwh * 28000;
    const balanceCost = 35000;

    const baseCost = Math.round((panelsCost + invCost + batCost + balanceCost) / 5000) * 5000;
    const costMin = Math.round(baseCost * 0.94);
    const costMax = Math.round(baseCost * 1.15);

    // 7. Monthly Savings & Payback
    let savingsFactor = 0.85;
    if (this.goal === 'backup') savingsFactor = 0.35;
    if (this.goal === 'offgrid') savingsFactor = 0.98;

    const monthlySavings = Math.round(this.bill * savingsFactor);
    const annualSavings = monthlySavings * 12;
    const paybackYears = Math.round((baseCost / annualSavings) * 10) / 10;

    // 8. CO2 Emissions Saved (Kenyan grid emission factor approx 0.45 kg CO2 per kWh)
    const annualKwhGenerated = solarKw * peakSunHours * 365 * 0.82;
    const annualCo2SavedKg = Math.round(annualKwhGenerated * 0.45);
    const annualCo2SavedTonnes = (annualCo2SavedKg / 1000).toFixed(1);

    return {
      dailyKwh: (Math.round(dailyKwh * 10) / 10).toFixed(1),
      solarKw: solarKw.toFixed(1),
      panelsCount400W,
      batteryKwh: batteryKwh.toFixed(1),
      batteryAh48V,
      inverterKw,
      costMin,
      costMax,
      monthlySavings,
      paybackYears: paybackYears.toFixed(1),
      annualCo2SavedTonnes
    };
  }
}

export const calcEngine = new TerraSolarCalculator();

// Initialize UI Handlers for Embedded and Wizard Calculators
export function initCalculatorUI() {
  initCompactCalculator();
  initWizardCalculator();
}

/* --------------------------------------------------------------------------
   Embedded Compact Calculator (Homepage Section 3)
   -------------------------------------------------------------------------- */
function initCompactCalculator() {
  const billInput = document.getElementById('compactCalcBill');
  const goalSelect = document.getElementById('compactCalcGoal');
  const chipContainer = document.getElementById('compactCalcChips');
  const calcBtn = document.getElementById('compactCalcBtn');

  if (!billInput || !calcBtn) return;

  function runCompactCalc() {
    const billVal = parseFloat(billInput.value) || 4500;
    calcEngine.bill = billVal;
    if (goalSelect) calcEngine.goal = goalSelect.value;

    // Collect active appliance chips
    if (chipContainer) {
      const activeChips = chipContainer.querySelectorAll('.calc-chip.active');
      calcEngine.appliances = Array.from(activeChips).map(c => c.dataset.appliance);
    }

    const res = calcEngine.calculate();
    renderCompactResults(res);
  }

  // Toggle chips
  if (chipContainer) {
    chipContainer.querySelectorAll('.calc-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        chip.classList.toggle('active');
        runCompactCalc();
      });
    });
  }

  billInput.addEventListener('input', runCompactCalc);
  if (goalSelect) goalSelect.addEventListener('change', runCompactCalc);
  calcBtn.addEventListener('click', runCompactCalc);

  // Initial calculation
  runCompactCalc();
}

function renderCompactResults(res) {
  const solarEl = document.getElementById('compactResSolar');
  const batteryEl = document.getElementById('compactResBattery');
  const inverterEl = document.getElementById('compactResInverter');
  const costEl = document.getElementById('compactResCost');
  const saveEl = document.getElementById('compactResSave');
  const paybackEl = document.getElementById('compactResPayback');
  const co2El = document.getElementById('compactResCo2');
  const waBtn = document.getElementById('compactCalcWhatsApp');

  if (solarEl) solarEl.textContent = `${res.solarKw} kW (${res.panelsCount400W} × 400W)`;
  if (batteryEl) batteryEl.textContent = `${res.batteryAh48V}Ah / 48V (${res.batteryKwh} kWh)`;
  if (inverterEl) inverterEl.textContent = `${res.inverterKw} kW Hybrid`;
  if (costEl) costEl.textContent = `${formatKES(res.costMin)} – ${formatKES(res.costMax)}`;
  if (saveEl) saveEl.textContent = `${formatKES(res.monthlySavings)} / mo`;
  if (paybackEl) paybackEl.textContent = `${res.paybackYears} Years`;
  if (co2El) co2El.textContent = `~${res.annualCo2SavedTonnes} tonnes`;

  if (waBtn) {
    const text = encodeURIComponent(
      `Hi Zelt, I used your TERRA Solar Calculator for my KSh ${calcEngine.bill.toLocaleString()} KPLC bill. The system recommended: ${res.solarKw}kW Panels, ${res.batteryAh48V}Ah Battery, and ${res.inverterKw}kW Inverter. Can you advise me on installation?`
    );
    waBtn.href = `https://wa.me/254701884358?text=${text}`;
  }
}

/* --------------------------------------------------------------------------
   Full 4-Step Wizard Calculator (Page 5 / #calculator)
   -------------------------------------------------------------------------- */
function initWizardCalculator() {
  const wizardContainer = document.getElementById('wizardCalcContainer');
  if (!wizardContainer) return;

  const nextBtn = document.getElementById('wizardNextBtn');
  const prevBtn = document.getElementById('wizardPrevBtn');
  const wizardBillInput = document.getElementById('wizardBillInput');

  function updateWizardView() {
    // Show current step body, hide others
    for (let i = 1; i <= 4; i++) {
      const stepBody = document.getElementById(`wizardStepBody${i}`);
      const stepNode = document.getElementById(`wizardStepNode${i}`);
      if (stepBody) {
        stepBody.style.display = (i === calcEngine.wizardStep) ? 'block' : 'none';
      }
      if (stepNode) {
        stepNode.classList.remove('active', 'completed');
        if (i === calcEngine.wizardStep) stepNode.classList.add('active');
        else if (i < calcEngine.wizardStep) stepNode.classList.add('completed');
      }
    }

    // Handle prev/next button states
    if (prevBtn) {
      prevBtn.style.visibility = (calcEngine.wizardStep === 1) ? 'hidden' : 'visible';
    }
    if (nextBtn) {
      if (calcEngine.wizardStep === 3) {
        nextBtn.textContent = 'See My Results →';
      } else if (calcEngine.wizardStep === 4) {
        nextBtn.textContent = 'Shop Recommended System →';
      } else {
        nextBtn.textContent = 'Next Step →';
      }
    }

    if (calcEngine.wizardStep === 4) {
      const res = calcEngine.calculate();
      renderWizardResults(res);
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (calcEngine.wizardStep < 4) {
        calcEngine.wizardStep++;
        updateWizardView();
      } else {
        // Shop Matching Products
        if (window.zeltApp) {
          window.zeltApp.openCatalogCategory('solar-energy');
        }
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (calcEngine.wizardStep > 1) {
        calcEngine.wizardStep--;
        updateWizardView();
      }
    });
  }

  if (wizardBillInput) {
    wizardBillInput.addEventListener('input', (e) => {
      calcEngine.bill = parseFloat(e.target.value) || 4500;
    });
  }

  // Appliances checkboxes in step 2
  const applianceBoxes = wizardContainer.querySelectorAll('.appliance-check-card');
  applianceBoxes.forEach(card => {
    const chk = card.querySelector('input[type="checkbox"]');
    card.addEventListener('click', (e) => {
      if (e.target !== chk) chk.checked = !chk.checked;
      card.classList.toggle('checked', chk.checked);

      const activeBoxes = wizardContainer.querySelectorAll('.appliance-check-card input[type="checkbox"]:checked');
      calcEngine.appliances = Array.from(activeBoxes).map(b => b.value);
    });
  });

  // Goal Radios in step 3
  const goalCards = wizardContainer.querySelectorAll('.goal-radio-card');
  goalCards.forEach(card => {
    card.addEventListener('click', () => {
      goalCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        calcEngine.goal = radio.value;
      }
    });
  });

  // Direct Step Node Clicks
  for (let i = 1; i <= 4; i++) {
    const node = document.getElementById(`wizardStepNode${i}`);
    if (node) {
      node.addEventListener('click', () => {
        calcEngine.wizardStep = i;
        updateWizardView();
      });
    }
  }

  // Recalculate button in Step 4
  const recalcBtn = document.getElementById('wizardRecalcBtn');
  if (recalcBtn) {
    recalcBtn.addEventListener('click', () => {
      calcEngine.wizardStep = 1;
      updateWizardView();
    });
  }

  // Initial render
  updateWizardView();
}

function renderWizardResults(res) {
  const solarEl = document.getElementById('wizResSolar');
  const batEl = document.getElementById('wizResBattery');
  const invEl = document.getElementById('wizResInverter');
  const costEl = document.getElementById('wizResCost');
  const saveEl = document.getElementById('wizResSave');
  const paybackEl = document.getElementById('wizResPayback');
  const co2El = document.getElementById('wizResCo2');
  const waBtn = document.getElementById('wizResWhatsApp');

  if (solarEl) solarEl.textContent = `${res.solarKw} kW (${res.panelsCount400W} × 400W Tier-1 Panels)`;
  if (batEl) batEl.textContent = `${res.batteryAh48V}Ah / 48V Lithium (${res.batteryKwh} kWh LiFePO4)`;
  if (invEl) invEl.textContent = `${res.inverterKw} kW Pure Sine Wave Hybrid Inverter`;
  if (costEl) costEl.textContent = `${formatKES(res.costMin)} – ${formatKES(res.costMax)}`;
  if (saveEl) saveEl.textContent = `${formatKES(res.monthlySavings)} / Month`;
  if (paybackEl) paybackEl.textContent = `${res.paybackYears} Years`;
  if (co2El) co2El.textContent = `~${res.annualCo2SavedTonnes} tonnes / year`;

  if (waBtn) {
    const text = encodeURIComponent(
      `Hello Zelt, I completed the TERRA Solar Wizard for my KSh ${calcEngine.bill.toLocaleString()} KPLC bill. Recommended: ${res.solarKw}kW Solar, ${res.batteryAh48V}Ah Lithium Battery, and ${res.inverterKw}kW Inverter. How soon can you deliver & install?`
    );
    waBtn.href = `https://wa.me/254701884358?text=${text}`;
  }
}
