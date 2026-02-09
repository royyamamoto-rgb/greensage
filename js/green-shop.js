/* ============================================
   GreenSage — Eco-Friendly Product Shop
   Amazon affiliate links with tag: anime88801-20
   ============================================ */

class GreenShop {
  constructor() {
    this.affiliateTag = 'anime88801-20';

    this.products = [
      // Kitchen
      { cat: 'kitchen', icon: '🥤', name: 'Reusable Water Bottle', desc: 'Stainless steel, insulated, BPA-free. Keeps drinks cold 24h, hot 12h.', impact: 'Saves ~167 plastic bottles/yr', search: 'stainless+steel+reusable+water+bottle+insulated' },
      { cat: 'kitchen', icon: '🥡', name: 'Beeswax Food Wraps', desc: 'Natural alternative to plastic wrap. Washable and reusable for 1+ year.', impact: 'Replaces 200+ ft of plastic wrap', search: 'beeswax+food+wraps+reusable' },
      { cat: 'kitchen', icon: '🥢', name: 'Bamboo Utensil Set', desc: 'Portable bamboo cutlery set. Replaces single-use plastic utensils.', impact: 'Saves ~500 plastic utensils/yr', search: 'bamboo+utensil+set+travel+portable' },
      { cat: 'kitchen', icon: '☕', name: 'Reusable Coffee Filter', desc: 'Stainless steel pour-over filter. Eliminates paper filter waste.', impact: 'Saves ~500 paper filters/yr', search: 'reusable+coffee+filter+stainless+steel+pour+over' },
      { cat: 'kitchen', icon: '🧽', name: 'Natural Dish Sponge', desc: 'Biodegradable coconut fiber sponges. Compostable alternative to synthetic sponges.', impact: 'Eliminates microplastic shed', search: 'natural+coconut+dish+sponge+biodegradable' },
      { cat: 'kitchen', icon: '🍱', name: 'Glass Meal Prep Containers', desc: 'Borosilicate glass with bamboo lids. Microwave and dishwasher safe.', impact: 'Replaces plastic containers', search: 'glass+meal+prep+containers+bamboo+lid' },

      // Bathroom
      { cat: 'bathroom', icon: '🪥', name: 'Bamboo Toothbrush', desc: 'Biodegradable bamboo handle with BPA-free bristles. Compostable handle.', impact: 'Saves 4 plastic toothbrushes/yr', search: 'bamboo+toothbrush+biodegradable+bpa+free' },
      { cat: 'bathroom', icon: '🧴', name: 'Shampoo Bar', desc: 'Zero-waste solid shampoo bar. Lasts 80+ washes, no plastic bottle.', impact: 'Eliminates 2-3 plastic bottles', search: 'shampoo+bar+natural+zero+waste' },
      { cat: 'bathroom', icon: '🧻', name: 'Bamboo Toilet Paper', desc: '100% bamboo, tree-free, plastic-free packaging. Bamboo grows 30x faster than trees.', impact: 'Saves 27,000 trees/day (globally)', search: 'bamboo+toilet+paper+tree+free+plastic+free' },
      { cat: 'bathroom', icon: '🪒', name: 'Safety Razor', desc: 'Stainless steel safety razor. One razor lasts decades, blades are recyclable.', impact: 'Eliminates disposable razors', search: 'safety+razor+stainless+steel+double+edge' },

      // Energy
      { cat: 'energy', icon: '💡', name: 'Smart LED Bulbs', desc: 'WiFi-enabled LED bulbs. 80% less energy, 25,000-hour lifespan. Schedule and dim remotely.', impact: 'Saves ~$75/yr per bulb', search: 'smart+led+bulbs+wifi+dimmable+energy+saving' },
      { cat: 'energy', icon: '🔌', name: 'Smart Power Strip', desc: 'Auto-detects phantom loads and cuts power to idle devices. Saves 5-10% on electricity.', impact: 'Saves ~100 kWh/year', search: 'smart+power+strip+energy+saving+auto+shutoff' },
      { cat: 'energy', icon: '🌡️', name: 'Smart Thermostat', desc: 'Learns your schedule and auto-adjusts temperature. Saves 10-15% on heating/cooling.', impact: 'Saves ~$140/yr on energy', search: 'smart+thermostat+energy+saving+programmable' },
      { cat: 'energy', icon: '🔋', name: 'Solar Phone Charger', desc: 'Portable solar panel charger. Charge devices anywhere with free sun energy.', impact: 'Free clean energy on the go', search: 'solar+phone+charger+portable+panel' },
      { cat: 'energy', icon: '⚡', name: 'Portable Solar Generator', desc: 'Solar-powered battery station for camping, emergencies, or off-grid living.', impact: 'Clean backup power', search: 'portable+solar+generator+power+station' },

      // Outdoor
      { cat: 'outdoor', icon: '🌱', name: 'Indoor Herb Garden Kit', desc: 'Grow basil, mint, cilantro indoors year-round. Reduces food miles and packaging waste.', impact: 'Zero food miles for herbs', search: 'indoor+herb+garden+kit+growing+system' },
      { cat: 'outdoor', icon: '🐝', name: 'Bee Hotel', desc: 'Solitary bee house for your garden. Supports pollinator populations critical for food production.', impact: 'Supports local pollinators', search: 'bee+hotel+house+garden+pollinator' },
      { cat: 'outdoor', icon: '🦅', name: 'Bird Feeder', desc: 'Eco-friendly bird feeder made from recycled materials. Support local wildlife.', impact: 'Supports local biodiversity', search: 'bird+feeder+recycled+material+eco+friendly' },
      { cat: 'outdoor', icon: '🪴', name: 'Compost Bin', desc: 'Countertop or outdoor compost bin. Turn food waste into garden gold.', impact: 'Diverts 30% of household waste', search: 'compost+bin+kitchen+countertop+outdoor' },

      // Cleaning
      { cat: 'cleaning', icon: '🧹', name: 'Eco Cleaning Tablets', desc: 'Dissolvable cleaning tablets — just add water. Eliminates single-use plastic spray bottles.', impact: 'Saves ~12 plastic bottles/yr', search: 'eco+cleaning+tablets+dissolvable+refill' },
      { cat: 'cleaning', icon: '🧺', name: 'Eco Laundry Sheets', desc: 'Zero-waste laundry detergent sheets. Biodegradable, plastic-free, pre-measured.', impact: 'Eliminates plastic jugs', search: 'eco+laundry+detergent+sheets+zero+waste' },
      { cat: 'cleaning', icon: '🫧', name: 'Wool Dryer Balls', desc: 'Natural wool dryer balls replace dryer sheets. Reduces drying time by 25%.', impact: 'Saves energy + eliminates chemical sheets', search: 'wool+dryer+balls+natural+organic' },

      // Tech
      { cat: 'tech', icon: '📱', name: 'Eco Phone Case', desc: 'Biodegradable phone case made from plant-based materials. Fully compostable.', impact: 'Compostable in 2 years', search: 'biodegradable+phone+case+compostable+eco' },
      { cat: 'tech', icon: '🔌', name: 'Energy Monitor', desc: 'Whole-home energy monitor. Track exactly where electricity goes and find waste.', impact: 'Typical 10-15% energy reduction', search: 'home+energy+monitor+electricity+usage+tracker' },
      { cat: 'tech', icon: '💧', name: 'Smart Water Monitor', desc: 'WiFi water flow sensor. Detects leaks and tracks usage in real-time.', impact: 'Saves ~10% on water bills', search: 'smart+water+monitor+leak+detector+wifi' }
    ];
  }

  getProducts(category = 'all') {
    if (category === 'all') return this.products;
    return this.products.filter(p => p.cat === category);
  }

  getAmazonUrl(product) {
    return `https://www.amazon.com/s?k=${product.search}&tag=${this.affiliateTag}`;
  }

  getCategories() {
    return ['all', 'kitchen', 'bathroom', 'energy', 'outdoor', 'cleaning', 'tech'];
  }
}

window.greenShop = new GreenShop();
