/* ============================================
   GreenSage — Solar Savings Calculator
   Based on NREL PVWatts & EnergySage data
   ============================================ */

class SolarCalc {
  constructor() {
    // System assumptions
    this.panelWatts = 400;          // Watts per panel (modern residential)
    this.panelSqFt = 17.5;         // Sq ft per panel
    this.costPerWatt = 2.75;        // $ per watt (pre-incentive cost)
    this.federalITC = 0.0;          // Federal ITC expired Dec 31, 2025 (OBBBA)
    this.degradation = 0.005;       // 0.5% annual panel degradation
    this.electricityInflation = 0.025; // 2.5% annual electricity price increase
    this.co2PerKwh = 0.000417;      // tons CO₂ per kWh (EPA eGRID US avg)
    this.treesPerTonCO2 = 45;       // ~45 trees to absorb 1 ton CO₂/yr

    // Monthly sun variation (fraction of peak, Northern Hemisphere avg)
    this.monthlyFraction = [
      0.55, 0.65, 0.85, 0.95, 1.0, 1.05,
      1.05, 1.0, 0.90, 0.75, 0.60, 0.50
    ];
    this.monthLabels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

    this.lastResult = null;
  }

  calculate(inputs) {
    const { monthlyBill, roofSqFt, sunHours, electricityRate } = inputs;

    // System sizing
    const maxPanels = Math.floor(roofSqFt / this.panelSqFt);
    const maxSystemKW = (maxPanels * this.panelWatts) / 1000;

    // How much kWh does the user consume monthly?
    const monthlyKwh = monthlyBill / electricityRate;
    const annualKwh = monthlyKwh * 12;

    // How much kWh can the system produce annually?
    // kW × sun hours/day × 365 × 0.80 (system efficiency)
    const annualProduction = maxSystemKW * sunHours * 365 * 0.80;

    // Size system to cover consumption (don't oversize beyond roof)
    const neededKW = annualKwh / (sunHours * 365 * 0.80);
    const systemKW = Math.min(maxSystemKW, Math.max(1, Math.round(neededKW * 10) / 10));
    const actualPanels = Math.ceil((systemKW * 1000) / this.panelWatts);
    const actualAnnualKwh = systemKW * sunHours * 365 * 0.80;

    // Costs
    const grossCost = systemKW * 1000 * this.costPerWatt;
    const federalCredit = grossCost * this.federalITC;
    const netCost = grossCost - federalCredit;

    // 25-year savings calculation
    let totalSavings = 0;
    let yearlyProduction = actualAnnualKwh;
    let yearlyRate = electricityRate;
    const yearlyData = [];

    for (let y = 1; y <= 25; y++) {
      yearlyProduction *= (1 - this.degradation);
      yearlyRate *= (1 + this.electricityInflation);
      const yearlySaving = yearlyProduction * yearlyRate;
      totalSavings += yearlySaving;
      yearlyData.push({ year: y, production: yearlyProduction, saving: yearlySaving, cumulative: totalSavings });
    }

    const netSavings25 = totalSavings - netCost;
    const monthlySavings = (actualAnnualKwh * electricityRate) / 12;

    // Payback period
    let paybackYear = 25;
    let cumSavings = 0;
    let yearlyProd = actualAnnualKwh;
    let yearlyR = electricityRate;
    for (let y = 1; y <= 25; y++) {
      yearlyProd *= (1 - this.degradation);
      yearlyR *= (1 + this.electricityInflation);
      cumSavings += yearlyProd * yearlyR;
      if (cumSavings >= netCost) {
        paybackYear = y;
        break;
      }
    }

    // Environmental impact
    const annualCO2Offset = actualAnnualKwh * this.co2PerKwh;
    const treesEquivalent = Math.round(annualCO2Offset * this.treesPerTonCO2);

    // Monthly production chart
    const monthlyProduction = this.monthlyFraction.map(f => Math.round(actualAnnualKwh / 12 * f));

    // Coverage
    const coveragePercent = Math.min(100, Math.round((actualAnnualKwh / annualKwh) * 100));

    this.lastResult = {
      systemKW: Math.round(systemKW * 10) / 10,
      panels: actualPanels,
      grossCost: Math.round(grossCost),
      federalCredit: Math.round(federalCredit),
      netCost: Math.round(netCost),
      monthlySavings: Math.round(monthlySavings),
      totalSavings25: Math.round(netSavings25),
      paybackYears: paybackYear,
      annualKwh: Math.round(actualAnnualKwh),
      annualCO2Offset: Math.round(annualCO2Offset * 10) / 10,
      treesEquivalent,
      coveragePercent,
      monthlyProduction,
      monthLabels: this.monthLabels,
      yearlyData
    };

    return this.lastResult;
  }
}

window.solarCalc = new SolarCalc();
