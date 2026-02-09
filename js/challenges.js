/* ============================================
   GreenSage — Daily Green Challenges
   30-day rotating challenges with streak tracking
   ============================================ */

class GreenChallenges {
  constructor() {
    this.STORAGE_KEY = 'gs_challenges';
    this.STREAK_KEY = 'gs_streak';
    this.POINTS_KEY = 'gs_points';

    // Master challenge pool (rotates daily)
    this.challengePool = [
      // Energy
      { id: 'e1', cat: 'energy', title: 'Unplug Phantom Loads', desc: 'Unplug 3 devices you\'re not using (chargers, appliances on standby). Phantom loads waste 5-10% of household energy.', impact: 'Saves ~100 kWh/year', points: 10 },
      { id: 'e2', cat: 'energy', title: 'LED Light Swap', desc: 'Replace one incandescent or CFL bulb with an LED. LEDs use 75% less energy and last 25x longer.', impact: 'Saves ~80 kWh/year per bulb', points: 15 },
      { id: 'e3', cat: 'energy', title: 'Thermostat Challenge', desc: 'Lower your thermostat by 2°F (winter) or raise it 2°F (summer). Each degree saves ~3% on heating/cooling costs.', impact: 'Saves ~200 lbs CO₂/year', points: 10 },
      { id: 'e4', cat: 'energy', title: 'Air Dry Laundry', desc: 'Skip the dryer and air-dry one load of laundry. Dryers use 2-5 kWh per load.', impact: 'Saves ~3 kWh per load', points: 10 },
      { id: 'e5', cat: 'energy', title: 'Cold Water Wash', desc: 'Wash one load of laundry in cold water. 90% of washing machine energy goes to heating water.', impact: 'Saves ~0.3 kWh per load', points: 10 },

      // Water
      { id: 'w1', cat: 'water', title: '5-Minute Shower', desc: 'Take a shower under 5 minutes today. The average shower is 8 minutes and uses 17 gallons.', impact: 'Saves ~6 gallons per shower', points: 10 },
      { id: 'w2', cat: 'water', title: 'Fix a Leak', desc: 'Check all faucets and toilets for leaks. A dripping faucet wastes 3,000+ gallons per year.', impact: 'Saves up to 3,000 gal/year', points: 20 },
      { id: 'w3', cat: 'water', title: 'Full Loads Only', desc: 'Only run the dishwasher or washing machine with a full load today. Partial loads waste water and energy.', impact: 'Saves ~15 gallons per load', points: 10 },
      { id: 'w4', cat: 'water', title: 'Turn Off the Tap', desc: 'Turn off the faucet while brushing teeth and washing hands. Running water wastes 2 gallons/minute.', impact: 'Saves ~8 gallons/day', points: 10 },

      // Food
      { id: 'f1', cat: 'food', title: 'Meatless Meal', desc: 'Replace one meal today with a plant-based option. Producing 1 lb of beef generates 27 lbs of CO₂.', impact: 'Saves ~6 lbs CO₂', points: 15 },
      { id: 'f2', cat: 'food', title: 'Zero Food Waste Day', desc: 'Plan meals to use all food. Eat leftovers, freeze extras. US wastes 30-40% of food supply.', impact: 'Saves ~1.5 lbs CO₂/day', points: 15 },
      { id: 'f3', cat: 'food', title: 'Buy Local', desc: 'Purchase one food item from a local source (farmers market, local farm). Reduces transport emissions.', impact: 'Reduces food miles by ~1,500', points: 15 },
      { id: 'f4', cat: 'food', title: 'Start Composting', desc: 'Compost food scraps today (banana peels, coffee grounds, veggie scraps). Composting diverts waste from landfills.', impact: 'Saves ~0.5 lbs CO₂/day', points: 20 },
      { id: 'f5', cat: 'food', title: 'Cook at Home', desc: 'Prepare all meals at home today. Restaurant food has a 3-5x higher carbon footprint than home cooking.', impact: 'Saves ~5 lbs CO₂', points: 10 },

      // Transport
      { id: 't1', cat: 'transport', title: 'Car-Free Trip', desc: 'Walk, bike, or take public transit for one trip you\'d normally drive. Short car trips are the least efficient.', impact: 'Saves ~2 lbs CO₂ per trip', points: 15 },
      { id: 't2', cat: 'transport', title: 'Combine Errands', desc: 'Combine multiple errands into one trip. Cold starts and short trips increase emissions by 40%.', impact: 'Saves ~3 lbs CO₂', points: 10 },
      { id: 't3', cat: 'transport', title: 'Eco-Driving Day', desc: 'Drive gently today: smooth acceleration, 55-60 mph on highways, no idling. Saves 10-20% on fuel.', impact: 'Saves ~2 lbs CO₂', points: 10 },
      { id: 't4', cat: 'transport', title: 'Tire Check', desc: 'Check your tire pressure. Under-inflated tires reduce fuel efficiency by 3% and wear faster.', impact: 'Saves ~100 lbs CO₂/year', points: 15 },

      // Waste
      { id: 'r1', cat: 'waste', title: 'Refuse Single-Use', desc: 'Say no to one single-use item today (plastic bag, straw, cup, utensils). Bring your own reusable.', impact: 'Prevents ~0.5 lbs plastic waste', points: 10 },
      { id: 'r2', cat: 'waste', title: 'Recycle Right', desc: 'Sort one batch of recyclables properly: rinse containers, remove lids, flatten cardboard. Contamination ruins whole batches.', impact: 'Properly diverts ~5 lbs waste', points: 10 },
      { id: 'r3', cat: 'waste', title: 'Declutter & Donate', desc: 'Find 3 items you no longer need and donate them. Keeps items in use longer and out of landfills.', impact: 'Diverts ~5 lbs from landfill', points: 15 },
      { id: 'r4', cat: 'waste', title: 'Paperless Day', desc: 'Go paperless: use digital notes, e-receipts, online bills. Making paper from trees releases 4 tons CO₂ per ton of paper.', impact: 'Saves ~0.5 lbs paper', points: 10 },
      { id: 'r5', cat: 'waste', title: 'Repair Something', desc: 'Fix an item instead of replacing it (clothing, electronics, furniture). Repair extends product life and reduces waste.', impact: 'Diverts ~10 lbs from landfill', points: 20 },

      // Lifestyle
      { id: 'l1', cat: 'energy', title: 'Digital Detox Hour', desc: 'Turn off all screens for 1 hour. Data centers and device charging account for 3.7% of global emissions.', impact: 'Saves ~0.1 kWh', points: 10 },
      { id: 'l2', cat: 'water', title: 'Plant Something', desc: 'Plant a seed, herb, or small plant. Indoor plants improve air quality and connect you with nature.', impact: 'Absorbs CO₂ + improves air', points: 20 },
      { id: 'l3', cat: 'food', title: 'Bring Your Bottle', desc: 'Use a reusable water bottle all day. Americans use 50 billion plastic water bottles per year.', impact: 'Saves ~1 plastic bottle', points: 10 },
      { id: 'l4', cat: 'waste', title: 'Learn Something Green', desc: 'Read one article about sustainability or watch a documentary about climate change. Knowledge drives action.', impact: 'Builds eco-awareness', points: 10 },
      { id: 'l5', cat: 'transport', title: 'Share a Ride', desc: 'Carpool or rideshare for one trip today. Sharing cuts per-person emissions in half.', impact: 'Saves ~3 lbs CO₂', points: 15 }
    ];

    this.state = this._loadState();
  }

  _loadState() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const state = JSON.parse(saved);
        // Check if it's a new day
        if (state.date !== this._today()) {
          return this._newDay(state);
        }
        return state;
      }
    } catch (e) { /* ignore */ }
    return this._freshState();
  }

  _freshState() {
    return {
      date: this._today(),
      streak: 0,
      totalPoints: 0,
      todayChallenges: this._pickDaily(3),
      completedToday: [],
      history: []
    };
  }

  _newDay(prevState) {
    // Check if previous day was completed (all 3 challenges done)
    const prevCompleted = prevState.completedToday.length >= 3;
    const wasYesterday = this._isYesterday(prevState.date);
    const newStreak = (prevCompleted && wasYesterday) ? prevState.streak + 1 : (prevCompleted ? 1 : 0);

    return {
      date: this._today(),
      streak: newStreak,
      totalPoints: prevState.totalPoints || 0,
      todayChallenges: this._pickDaily(3, prevState.todayChallenges?.map(c => c.id)),
      completedToday: [],
      history: (prevState.history || []).slice(-30) // Keep last 30 days
    };
  }

  _pickDaily(count, excludeIds = []) {
    // Use date as seed for consistent daily challenges
    const seed = this._dateHash(this._today());
    const available = this.challengePool.filter(c => !excludeIds.includes(c.id));
    const shuffled = this._seededShuffle([...available], seed);

    // Pick from different categories
    const picked = [];
    const usedCats = new Set();
    for (const c of shuffled) {
      if (picked.length >= count) break;
      if (!usedCats.has(c.cat) || picked.length >= 2) {
        picked.push({ ...c });
        usedCats.add(c.cat);
      }
    }
    return picked;
  }

  _seededShuffle(arr, seed) {
    let s = seed;
    for (let i = arr.length - 1; i > 0; i--) {
      s = (s * 1664525 + 1013904223) & 0xFFFFFFFF;
      const j = Math.abs(s) % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  _dateHash(dateStr) {
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  _today() {
    return new Date().toISOString().split('T')[0];
  }

  _isYesterday(dateStr) {
    const d = new Date(dateStr);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return d.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0];
  }

  _save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) { /* ignore */ }
  }

  completeChallenge(challengeId) {
    if (this.state.completedToday.includes(challengeId)) return false;

    const challenge = this.state.todayChallenges.find(c => c.id === challengeId);
    if (!challenge) return false;

    this.state.completedToday.push(challengeId);
    this.state.totalPoints += challenge.points;

    // If all 3 completed, update streak
    if (this.state.completedToday.length >= 3) {
      this.state.streak = (this.state.streak || 0) + 1;
      this.state.history.push({
        date: this._today(),
        completed: this.state.completedToday.length,
        points: this.state.todayChallenges.reduce((sum, c) => sum + c.points, 0)
      });
    }

    this._save();
    return true;
  }

  getState() {
    return {
      date: this.state.date,
      streak: this.state.streak,
      totalPoints: this.state.totalPoints,
      challenges: this.state.todayChallenges.map(c => ({
        ...c,
        completed: this.state.completedToday.includes(c.id)
      })),
      completedCount: this.state.completedToday.length,
      totalChallenges: this.state.todayChallenges.length
    };
  }
}

window.greenChallenges = new GreenChallenges();
