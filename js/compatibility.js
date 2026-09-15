/* ==========================================================================
   ZELT SOLAR & ELECTRICALS — PROTOTYPE 3: TERRA
   Interactive Panel-to-Inverter Compatibility Engine
   "Will this panel work with my inverter?"
   ========================================================================== */

export const INVERTER_DATABASE = [
  { id: "inv-3k", name: "3kW 24V/48V Hybrid Inverter", maxPvWatts: 3500, minPanels: 2, maxPanels: 8, recommendedPanels: 4, mpptAmps: 60 },
  { id: "inv-5k", name: "5kW 48V Pure Sine Wave Hybrid Inverter", maxPvWatts: 5500, minPanels: 4, maxPanels: 14, recommendedPanels: 8, mpptAmps: 100 },
  { id: "inv-6k", name: "6kW 48V High-Voltage Hybrid Inverter", maxPvWatts: 7000, minPanels: 6, maxPanels: 16, recommendedPanels: 12, mpptAmps: 120 },
  { id: "inv-8k", name: "8kW 48V Commercial Hybrid Inverter", maxPvWatts: 10000, minPanels: 8, maxPanels: 24, recommendedPanels: 16, mpptAmps: 160 }
];

export function checkPanelCompatibility(inverterId, panelCount, panelWattage = 400) {
  const inverter = INVERTER_DATABASE.find(inv => inv.id === inverterId) || INVERTER_DATABASE[1];
  const totalWatts = panelCount * panelWattage;

  let isCompatible = true;
  let statusMessage = "";
  let technicalDetail = "";

  if (panelCount < inverter.minPanels) {
    isCompatible = false;
    statusMessage = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 6px;" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>Undersized Array: ${panelCount} × ${panelWattage}W (${totalWatts}W) may not reach the minimum MPPT startup voltage (~120V DC) for the ${inverter.name}.`;
    technicalDetail = `We recommend at least ${inverter.minPanels} panels connected in series to reliably start charging.`;
  } else if (totalWatts > inverter.maxPvWatts) {
    isCompatible = false;
    statusMessage = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 6px;" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>Overloaded Array: ${panelCount} × ${panelWattage}W produces ${totalWatts}W peak, which exceeds the ${inverter.name}'s max PV input of ${inverter.maxPvWatts}W.`;
    technicalDetail = `Reduce panel count to ${inverter.maxPanels} or upgrade to a higher-capacity inverter model.`;
  } else {
    isCompatible = true;
    statusMessage = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align: middle; margin-right: 6px;" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>100% Compatible: The ${inverter.name} is engineered to work reliably with ${panelCount} × ${panelWattage}W panels.`;
    technicalDetail = `Your array will generate up to ${totalWatts.toLocaleString()}W peak power. Requires a standard ${inverter.mpptAmps}A built-in MPPT controller with 48V battery bank.`;
  }

  return {
    isCompatible,
    totalWatts,
    statusMessage,
    technicalDetail,
    inverterName: inverter.name
  };
}

export function initCompatibilityUI() {
  const inverterSelect = document.getElementById('compatInverterSelect');
  const panelCountSelect = document.getElementById('compatPanelCountSelect');
  const resultBox = document.getElementById('compatResultBox');

  if (!inverterSelect || !panelCountSelect || !resultBox) return;

  function updateCompatibility() {
    const invId = inverterSelect.value;
    const count = parseInt(panelCountSelect.value, 10) || 4;
    const res = checkPanelCompatibility(invId, count, 400);

    resultBox.innerHTML = `
      <div class="compat-status-badge" style="color: ${res.isCompatible ? 'var(--accent-success)' : 'var(--accent-danger)'};">
        ${res.statusMessage}
      </div>
      <p style="color: var(--text-secondary); font-size: 13.5px; margin-top: 6px; line-height: 1.5;">
        ${res.technicalDetail}
      </p>
      <div style="margin-top: 14px; display: flex; gap: 10px; flex-wrap: wrap;">
        <button class="btn btn-sm btn-outline" onclick="window.zeltApp.openCatalogCategory('solar-energy')">Shop Matching Inverters</button>
        <button class="btn btn-sm btn-whatsapp" onclick="window.open('https://wa.me/254701884358?text=${encodeURIComponent('Hi Zelt, I am checking compatibility for ' + count + 'x 400W panels with the ' + res.inverterName)}', '_blank')">Ask Counter Team on WhatsApp</button>
      </div>
    `;
  }

  inverterSelect.addEventListener('change', updateCompatibility);
  panelCountSelect.addEventListener('change', updateCompatibility);

  // Initial calculation
  updateCompatibility();
}
