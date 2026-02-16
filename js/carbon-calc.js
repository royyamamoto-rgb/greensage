/* ============================================
   GreenSage — Carbon Footprint Calculator
   EPA emission factors + IPCC AR6 data
   ============================================ */

class CarbonCalc {
  constructor() {
    // Emission factors (tons CO₂ per year)
    this.transportFactors = {
      'car-gas':    { perMile: 0.000404 },  // ~0.404 kg CO₂/mile (EPA avg sedan)
      'car-diesel': { perMile: 0.000458 },  // ~0.458 kg CO₂/mile
      'car-hybrid': { perMile: 0.000227 },  // ~0.227 kg CO₂/mile
      'car-ev':     { perMile: 0.000100 },  // ~0.100 kg CO₂/mile (grid avg)
      'public':     { perMile: 0.000170 },  // ~0.170 kg CO₂/mile (bus/train avg)
      'bike':       { perMile: 0.000000 },
      'wfh':        { perMile: 0.000000 }
    };

    // Flights: tons CO₂ per flight (avg domestic round trip ~0.9t, intl ~2.5t)
    this.flightFactors = {
      0:  0,
      1:  0.9,    // 1-2 short flights
      3:  2.5,    // 3-5 flights
      6:  5.0,    // 6-10 flights
      12: 10.0    // 10+ flights
    };

    // Home energy: tons CO₂ per $100/month electricity
    this.energyFactors = {
      'gas':            { perDollar: 0.065 },  // gas heating + grid electric
      'electric-grid':  { perDollar: 0.050 },  // grid electric only
      'electric-green': { perDollar: 0.010 },  // solar/wind
      'oil':            { perDollar: 0.078 },  // heating oil
      'mixed':          { perDollar: 0.058 }
    };

    // Diet: tons CO₂ per year
    this.dietFactors = {
      'heavy-meat':  3.3,
      'medium-meat': 2.5,
      'low-meat':    1.9,
      'pescatarian': 1.7,
      'vegetarian':  1.4,
      'vegan':       1.0
    };

    // Shopping: tons CO₂ per year
    this.shoppingFactors = {
      'high':   2.0,
      'medium': 1.2,
      'low':    0.5
    };

    // Recycling offset: tons CO₂ saved per year
    this.recycleFactors = {
      'none': 0,
      'some': -0.2,
      'most': -0.5,
      'all':  -0.8
    };

    this.lastResult = null;
  }

  calculate(inputs) {
    const { transport, distance, flights, energy, elecBill, diet, shopping, recycle } = inputs;

    // Transport: weekly miles × 52 weeks × factor
    const annualMiles = distance * 52;
    const transportTons = annualMiles * (this.transportFactors[transport]?.perMile || 0);

    // Flights
    const flightTons = this.flightFactors[flights] || 0;

    // Home energy: monthly bill → annual
    const annualBillHundreds = (elecBill * 12) / 100;
    const energyTons = annualBillHundreds * (this.energyFactors[energy]?.perDollar || 0.05);

    // Diet
    const dietTons = this.dietFactors[diet] || 2.5;

    // Shopping
    const shoppingTons = this.shoppingFactors[shopping] || 1.2;

    // Recycling offset
    const recycleOffset = this.recycleFactors[recycle] || 0;

    // Total
    const total = Math.max(0, transportTons + flightTons + energyTons + dietTons + shoppingTons + recycleOffset);

    // Grade
    let grade, gradeLabel, gradeDesc, gradeClass;
    if (total <= 4) {
      grade = 'A';
      gradeLabel = 'Excellent';
      gradeDesc = 'You\'re well below the sustainable target of 4 tons/year. Keep it up!';
      gradeClass = 'eco-grade-excellent';
    } else if (total <= 8) {
      grade = 'B';
      gradeLabel = 'Good';
      gradeDesc = 'Below average, but there\'s room to improve. See tips below.';
      gradeClass = 'eco-grade-good';
    } else if (total <= 16) {
      grade = 'C';
      gradeLabel = 'Average';
      gradeDesc = 'Near the US average of 16 tons/year. Small changes can make a big difference.';
      gradeClass = 'eco-grade-average';
    } else {
      grade = 'D';
      gradeLabel = 'High Impact';
      gradeDesc = 'Above average. Focus on the biggest categories below for maximum impact.';
      gradeClass = 'eco-grade-poor';
    }

    // Breakdown
    const breakdown = [
      { label: 'Transport', value: transportTons, icon: '🚗' },
      { label: 'Flights', value: flightTons, icon: '✈️' },
      { label: 'Home Energy', value: energyTons, icon: '🏠' },
      { label: 'Diet', value: dietTons, icon: '🍽️' },
      { label: 'Shopping', value: shoppingTons, icon: '🛍️' },
      { label: 'Recycling', value: recycleOffset, icon: '♻️' }
    ];

    // Tips based on highest categories
    const tips = this._generateTips(inputs, breakdown);

    this.lastResult = {
      total: Math.round(total * 10) / 10,
      grade, gradeLabel, gradeDesc, gradeClass,
      breakdown,
      tips,
      usAvg: 16,
      globalAvg: 4.7,
      target: 4
    };

    return this.lastResult;
  }

  _generateTips(inputs, breakdown) {
    const tips = [];
    const sorted = [...breakdown].filter(b => b.value > 0).sort((a, b) => b.value - a.value);

    // Always add top category tip
    if (sorted.length > 0) {
      const top = sorted[0];
      if (top.label === 'Transport' && inputs.transport.startsWith('car')) {
        tips.push({
          icon: '🚗',
          text: 'Switching to an EV or hybrid could cut your transport emissions by 50-75%.',
          savings: `Save ~${(top.value * 0.5).toFixed(1)} tons CO₂/yr`
        });
      }
      if (top.label === 'Flights') {
        tips.push({
          icon: '✈️',
          text: 'One round-trip transatlantic flight ≈ 2.5 tons CO₂. Consider trains for shorter trips or carbon offsets for necessary flights.',
          savings: `Save ~${(top.value * 0.3).toFixed(1)} tons CO₂/yr`
        });
      }
    }

    // Diet tips
    if (['heavy-meat', 'medium-meat'].includes(inputs.diet)) {
      const currentDiet = this.dietFactors[inputs.diet];
      const vegSave = currentDiet - this.dietFactors['vegetarian'];
      tips.push({
        icon: '🥬',
        text: 'Reducing meat consumption to 2-3 days/week can significantly lower your food emissions. Try Meatless Mondays!',
        savings: `Save ~${vegSave.toFixed(1)} tons CO₂/yr going vegetarian`
      });
    }

    // Energy tips
    if (['gas', 'oil', 'electric-grid'].includes(inputs.energy)) {
      tips.push({
        icon: '☀️',
        text: 'Switching to solar or green energy can cut home emissions by 80%. Check our Solar Calculator for savings estimates.',
        savings: 'Save 60-80% of home energy emissions'
      });
    }

    // Shopping tips
    if (inputs.shopping === 'high') {
      tips.push({
        icon: '🛍️',
        text: 'Buy less, choose well. Second-hand shopping and buying quality over quantity reduces waste and emissions.',
        savings: 'Save ~1.5 tons CO₂/yr'
      });
    }

    // Recycling tip
    if (['none', 'some'].includes(inputs.recycle)) {
      tips.push({
        icon: '♻️',
        text: 'Comprehensive recycling + composting can offset 0.5-0.8 tons CO₂/yr. Start with paper, plastic, glass, and food waste.',
        savings: 'Save ~0.5-0.8 tons CO₂/yr'
      });
    }

    // Always add tree planting tip
    tips.push({
      icon: '🌳',
      text: 'One mature tree absorbs ~22 kg CO₂/year. Planting trees in your yard or supporting reforestation projects helps offset remaining emissions.',
      savings: '10 trees ≈ 0.22 tons CO₂/yr offset'
    });

    return tips.slice(0, 5); // Max 5 tips
  }
}

// Export singleton
window.carbonCalc = new CarbonCalc();
