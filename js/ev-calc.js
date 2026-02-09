/* ============================================
   GreenSage — EV Switching Calculator
   Compare gas car vs EV: savings, emissions, TCO
   Data from DOE, EPA, AAA, EnergySage 2024
   ============================================ */

class EVCalc {
  constructor() {
    // Gas car data (per gallon)
    this.gasPrices = {
      low:  3.00,
      avg:  3.50,
      high: 4.50
    };

    // EV electricity cost per kWh
    this.defaultElecRate = 0.13; // US avg $/kWh

    // Vehicle database: mpg (gas) or mi/kWh (EV), MSRP, annual maintenance
    this.vehicles = {
      gas: {
        'sedan-compact':   { label: 'Compact Sedan (Civic, Corolla)',  mpg: 33, maintenance: 1200 },
        'sedan-mid':       { label: 'Midsize Sedan (Camry, Accord)',   mpg: 30, maintenance: 1300 },
        'sedan-full':      { label: 'Full-Size Sedan (Avalon, Impala)',mpg: 26, maintenance: 1400 },
        'suv-small':       { label: 'Small SUV (RAV4, CR-V)',         mpg: 29, maintenance: 1350 },
        'suv-mid':         { label: 'Midsize SUV (Highlander, Pilot)',  mpg: 24, maintenance: 1500 },
        'suv-full':        { label: 'Full-Size SUV (Tahoe, Expedition)',mpg: 18, maintenance: 1700 },
        'truck':           { label: 'Pickup Truck (F-150, Silverado)',  mpg: 20, maintenance: 1600 },
        'minivan':         { label: 'Minivan (Sienna, Odyssey)',        mpg: 25, maintenance: 1400 },
        'sports':          { label: 'Sports Car',                       mpg: 22, maintenance: 1800 }
      },
      ev: {
        'tesla-3':         { label: 'Tesla Model 3',                miPerKwh: 3.8, msrp: 38990, maintenance: 500, range: 272, taxCredit: 7500 },
        'tesla-y':         { label: 'Tesla Model Y',                miPerKwh: 3.5, msrp: 44990, maintenance: 500, range: 310, taxCredit: 7500 },
        'tesla-s':         { label: 'Tesla Model S',                miPerKwh: 3.3, msrp: 74990, maintenance: 600, range: 405, taxCredit: 0 },
        'chevy-equinox':   { label: 'Chevy Equinox EV',            miPerKwh: 3.4, msrp: 33900, maintenance: 450, range: 319, taxCredit: 7500 },
        'chevy-bolt':      { label: 'Chevy Bolt EUV',              miPerKwh: 3.6, msrp: 28795, maintenance: 450, range: 247, taxCredit: 7500 },
        'ford-mach-e':     { label: 'Ford Mustang Mach-E',         miPerKwh: 3.2, msrp: 42995, maintenance: 500, range: 312, taxCredit: 3750 },
        'ford-f150':       { label: 'Ford F-150 Lightning',        miPerKwh: 2.4, msrp: 49995, maintenance: 550, range: 320, taxCredit: 7500 },
        'hyundai-ioniq5':  { label: 'Hyundai IONIQ 5',             miPerKwh: 3.5, msrp: 41800, maintenance: 450, range: 303, taxCredit: 7500 },
        'hyundai-ioniq6':  { label: 'Hyundai IONIQ 6',             miPerKwh: 4.0, msrp: 42450, maintenance: 450, range: 361, taxCredit: 7500 },
        'kia-ev6':         { label: 'Kia EV6',                     miPerKwh: 3.5, msrp: 42600, maintenance: 450, range: 310, taxCredit: 3750 },
        'nissan-leaf':     { label: 'Nissan Leaf',                  miPerKwh: 3.5, msrp: 28140, maintenance: 400, range: 212, taxCredit: 0 },
        'rivian-r1s':      { label: 'Rivian R1S',                  miPerKwh: 2.8, msrp: 75900, maintenance: 600, range: 321, taxCredit: 3750 },
        'bmw-ix':          { label: 'BMW iX',                      miPerKwh: 2.9, msrp: 87100, maintenance: 700, range: 324, taxCredit: 0 },
        'vw-id4':          { label: 'Volkswagen ID.4',             miPerKwh: 3.2, msrp: 38995, maintenance: 450, range: 275, taxCredit: 7500 }
      }
    };

    // Constants
    this.co2PerGallon = 0.00887;  // tons CO₂ per gallon of gas (EPA)
    this.co2PerKwh = 0.000417;    // tons CO₂ per kWh (EPA eGRID US avg)
    this.treesPerTonCO2 = 45;
    this.gasInflation = 0.03;      // 3% annual gas price increase
    this.elecInflation = 0.025;    // 2.5% annual electricity price increase
    this.insuranceDiff = -200;     // EVs slightly higher insurance (net per year)

    this.lastResult = null;
  }

  getGasVehicles() {
    return Object.entries(this.vehicles.gas).map(([id, v]) => ({ id, ...v }));
  }

  getEVVehicles() {
    return Object.entries(this.vehicles.ev).map(([id, v]) => ({ id, ...v }));
  }

  calculate(inputs) {
    const { gasVehicle, evVehicle, annualMiles, gasPrice, elecRate, yearsToCompare } = inputs;

    const gas = this.vehicles.gas[gasVehicle];
    const ev = this.vehicles.ev[evVehicle];
    if (!gas || !ev) return null;

    const years = yearsToCompare || 10;

    // ---- Annual fuel costs ----
    const annualGallons = annualMiles / gas.mpg;
    const annualGasCost = annualGallons * gasPrice;

    const annualKwh = annualMiles / ev.miPerKwh;
    const annualElecCost = annualKwh * elecRate;

    const annualFuelSaving = annualGasCost - annualElecCost;

    // ---- Maintenance savings ----
    const annualMaintSaving = gas.maintenance - ev.maintenance;

    // ---- Multi-year projection ----
    let totalGasCost = 0;
    let totalEvCost = 0;
    let totalGasMaint = 0;
    let totalEvMaint = 0;
    let gPrice = gasPrice;
    let eRate = elecRate;
    const yearlyData = [];

    for (let y = 1; y <= years; y++) {
      const yGasFuel = (annualMiles / gas.mpg) * gPrice;
      const yEvFuel = (annualMiles / ev.miPerKwh) * eRate;
      const yGasMaint = gas.maintenance;
      const yEvMaint = ev.maintenance;

      totalGasCost += yGasFuel;
      totalEvCost += yEvFuel;
      totalGasMaint += yGasMaint;
      totalEvMaint += yEvMaint;

      yearlyData.push({
        year: y,
        gasFuel: Math.round(yGasFuel),
        evFuel: Math.round(yEvFuel),
        gasMaint: yGasMaint,
        evMaint: yEvMaint,
        cumulativeGas: Math.round(totalGasCost + totalGasMaint),
        cumulativeEv: Math.round(totalEvCost + totalEvMaint),
        savings: Math.round((totalGasCost + totalGasMaint) - (totalEvCost + totalEvMaint))
      });

      gPrice *= (1 + this.gasInflation);
      eRate *= (1 + this.elecInflation);
    }

    // ---- Total Cost of Ownership ----
    const totalGasTCO = totalGasCost + totalGasMaint;
    const totalEvTCO = totalEvCost + totalEvMaint;
    const effectiveEvPrice = ev.msrp - ev.taxCredit;
    const totalSavings = totalGasTCO - totalEvTCO;

    // ---- Payback (if EV is more expensive upfront) ----
    // We compare running cost savings against the price premium
    // Assume gas car purchase is "sunk" — user already has it
    // So payback = how many years of fuel+maint savings to recoup EV purchase
    let paybackYear = years;
    let cumSavings = 0;
    for (let y = 0; y < yearlyData.length; y++) {
      const d = yearlyData[y];
      cumSavings = d.savings;
      if (cumSavings >= effectiveEvPrice) {
        paybackYear = y + 1;
        break;
      }
    }

    // ---- Environmental impact ----
    const annualGasCO2 = annualGallons * this.co2PerGallon;
    const annualEvCO2 = annualKwh * this.co2PerKwh;
    const annualCO2Saved = annualGasCO2 - annualEvCO2;
    const totalCO2Saved = annualCO2Saved * years;
    const treesEquiv = Math.round(annualCO2Saved * this.treesPerTonCO2);

    // ---- Per-mile cost ----
    const gasCostPerMile = gasPrice / gas.mpg;
    const evCostPerMile = elecRate / ev.miPerKwh;

    // ---- Comparison chart data (5-year intervals) ----
    const chartYears = [1, 3, 5, 7, 10].filter(y => y <= years);
    const chartData = chartYears.map(y => yearlyData[y - 1]);

    this.lastResult = {
      gasVehicle: gas.label,
      evVehicle: ev.label,
      evMsrp: ev.msrp,
      evTaxCredit: ev.taxCredit,
      evEffectivePrice: effectiveEvPrice,
      evRange: ev.range,
      annualMiles,
      years,

      // Annual
      annualGasFuel: Math.round(annualGasCost),
      annualEvFuel: Math.round(annualElecCost),
      annualFuelSaving: Math.round(annualFuelSaving),
      annualMaintGas: gas.maintenance,
      annualMaintEv: ev.maintenance,
      annualMaintSaving: Math.round(annualMaintSaving),
      annualTotalSaving: Math.round(annualFuelSaving + annualMaintSaving),

      // Multi-year
      totalGasTCO: Math.round(totalGasTCO),
      totalEvTCO: Math.round(totalEvTCO),
      totalSavings: Math.round(totalSavings),
      paybackYear,

      // Per mile
      gasCostPerMile: Math.round(gasCostPerMile * 100) / 100,
      evCostPerMile: Math.round(evCostPerMile * 100) / 100,

      // Environment
      annualGasCO2: Math.round(annualGasCO2 * 10) / 10,
      annualEvCO2: Math.round(annualEvCO2 * 10) / 10,
      annualCO2Saved: Math.round(annualCO2Saved * 10) / 10,
      totalCO2Saved: Math.round(totalCO2Saved * 10) / 10,
      treesEquiv,

      // Chart
      yearlyData,
      chartData
    };

    return this.lastResult;
  }
}

window.evCalc = new EVCalc();
