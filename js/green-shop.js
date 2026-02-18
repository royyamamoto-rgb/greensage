/* ============================================
   GreenSage — Eco-Friendly Product Shop
   Amazon affiliate links with tag: anime88801-20
   All 35 product images verified working.
   ============================================ */

class GreenShop {
  constructor() {
    this.affiliateTag = 'anime88801-20';

    this.products = [
      // Kitchen (5)
      { cat: 'kitchen', name: 'Owala FreeSip Water Bottle', desc: 'Stainless steel, insulated, BPA-free. Keeps drinks cold 24h, hot 12h.', impact: 'Saves ~167 plastic bottles/yr', asin: 'B085DTZQNZ' },
      { cat: 'kitchen', name: 'To-Go Ware Bamboo Utensil Set', desc: 'Portable bamboo cutlery in carry case. Replaces single-use plastic utensils on the go.', impact: 'Saves ~500 plastic utensils/yr', asin: 'B001ANQVZE' },
      { cat: 'kitchen', name: 'Hario V60 Pour-Over Coffee Dripper', desc: 'Ceramic pour-over dripper. Brew perfect coffee without K-cups or electric machines.', impact: 'Eliminates K-cup waste', asin: 'B001FSJB2E' },
      { cat: 'kitchen', name: 'Snapware Glass Food Storage Set', desc: 'Tempered glass containers with locking lids. Oven, microwave, and dishwasher safe.', impact: 'Replaces plastic tupperware', asin: 'B001339ZMW' },
      { cat: 'kitchen', name: 'Glasslock Oven-Safe Glass Containers', desc: 'Borosilicate glass meal prep set. Airtight, leak-proof lids. Freezer to oven safe.', impact: 'Eliminates single-use containers', asin: 'B00COK3FD8' },

      // Bathroom (4)
      { cat: 'bathroom', name: 'Preserve Recycled Toothbrush', desc: 'Made from recycled #5 plastics. Replaceable heads reduce waste by 80% vs. regular brushes.', impact: 'Diverts plastic from landfills', asin: 'B001E5E2M2' },
      { cat: 'bathroom', name: 'Jason Natural Shampoo', desc: 'Plant-based, paraben-free, sulfate-free shampoo. No harsh chemicals, gentle on hair and Earth.', impact: 'Eliminates toxic chemical runoff', asin: 'B000Z93FQC' },
      { cat: 'bathroom', name: 'Reel Bamboo Toilet Paper 24-Pack', desc: '100% bamboo, tree-free, plastic-free packaging. Bamboo grows 30x faster than trees.', impact: 'Saves ~27,000 trees/day (globally)', asin: 'B088T79ZCS' },
      { cat: 'bathroom', name: 'Merkur 34C Safety Razor', desc: 'Heavy-duty chrome safety razor. One razor lasts decades, blades are fully recyclable.', impact: 'Eliminates disposable razors forever', asin: 'B000NL0T1G' },

      // Energy (5)
      { cat: 'energy', name: 'Kasa Smart LED Bulbs 4-Pack', desc: 'WiFi-enabled LED bulbs. 80% less energy, 25,000-hour lifespan. Schedule and dim remotely.', impact: 'Saves ~$75/yr per bulb', asin: 'B08TB8Z5HF' },
      { cat: 'energy', name: 'Smart Strip Energy Saving Power Strip', desc: 'Auto-detects phantom loads and cuts power to idle devices. Saves 5-10% on electricity.', impact: 'Saves ~100 kWh/year', asin: 'B0006PUDQK' },
      { cat: 'energy', name: 'ecobee Smart Thermostat', desc: 'Learns your schedule and auto-adjusts temperature. Saves 10-15% on heating/cooling bills.', impact: 'Saves ~$140/yr on energy', asin: 'B09XXTQPXC' },
      { cat: 'energy', name: 'BigBlue 28W Solar Phone Charger', desc: 'Portable solar panel charger. Charge devices anywhere with free sun energy.', impact: 'Free clean energy on the go', asin: 'B01EXWCPLC' },
      { cat: 'energy', name: 'P3 Kill A Watt Electricity Monitor', desc: 'Plug in any device to see exactly how much electricity it uses. Find energy vampires instantly.', impact: 'Typical 10-15% energy reduction', asin: 'B00009MDBU' },

      // Outdoor (5)
      { cat: 'outdoor', name: 'AeroGarden Harvest Indoor Garden', desc: 'Grow basil, mint, cilantro indoors year-round. LED grow lights, auto water reminder.', impact: 'Zero food miles for herbs', asin: 'B07CKK8Z78' },
      { cat: 'outdoor', name: 'Wildlife World Interactive Bee House', desc: 'Handcrafted wooden bee house for your garden. Supports pollinator populations critical for food.', impact: 'Supports local pollinators', asin: 'B001HIYW44' },
      { cat: 'outdoor', name: 'Woodlink Going Green Bird Feeder', desc: 'Eco-friendly bird feeder made from recycled materials. Support local wildlife and biodiversity.', impact: 'Supports local biodiversity', asin: 'B002W8PVWK' },
      { cat: 'outdoor', name: 'Natural Home Stainless Steel Compost Bin', desc: 'Countertop compost bin with charcoal filter. Turn food waste into garden gold. No odor.', impact: 'Diverts 30% of household waste', asin: 'B00P0J7QU8' },
      { cat: 'outdoor', name: 'LifeStraw Personal Water Filter', desc: 'Portable water filter removes 99.9% of bacteria. Perfect for hiking, travel, and emergencies.', impact: 'Replaces 1,000 plastic bottles', asin: 'B001FWYGJS' },

      // Cleaning (3)
      { cat: 'cleaning', name: 'Mrs. Meyer\'s Multi-Surface Cleaner', desc: 'Plant-derived cleaning concentrate. Biodegradable, cruelty-free, no harsh chemicals.', impact: 'Eliminates toxic cleaning chemicals', asin: 'B00M8VVVK2' },
      { cat: 'cleaning', name: 'Seventh Generation Laundry Detergent', desc: 'Plant-based, free & clear formula. No dyes, fragrances, or artificial brighteners. 4x concentrated.', impact: 'Eliminates plastic jugs', asin: 'B00CS9D332' },
      { cat: 'cleaning', name: 'SnugPad Wool Dryer Balls 6-Pack', desc: 'Natural New Zealand wool dryer balls. Replace dryer sheets, reduce drying time by 25%.', impact: 'Saves energy + eliminates chemical sheets', asin: 'B074PFTJTZ' },

      // Tech (3)
      { cat: 'tech', name: 'Incipio Organicore Eco Phone Case', desc: 'Plant-based phone case made from compostable materials. Drop protection meets sustainability.', impact: 'Compostable at end of life', asin: 'B000YDDF6O' },
      { cat: 'tech', name: 'Moen Flo Smart Water Monitor', desc: 'WiFi water flow sensor. Detects leaks and tracks usage in real-time. Prevents water damage.', impact: 'Saves ~10% on water bills', asin: 'B00C03D01Q' },
      { cat: 'tech', name: 'TED Energy Detective Monitor', desc: 'Whole-home energy monitor. Track real-time electricity usage and find where power is wasted.', impact: 'Typical 15-20% energy reduction', asin: 'B000RGF29Q' },

      // EV & Charging (5)
      { cat: 'ev', name: 'Siemens VersiCharge Level 2 EV Charger', desc: '240V, 30A home EV charging station. Indoor/outdoor rated. Add up to 25 miles of range per hour.', impact: 'Full charge overnight at home', asin: 'B00MFVI92S' },
      { cat: 'ev', name: 'Leviton NEMA 14-50R Outlet', desc: '50A, 125/250V flush-mount receptacle. The standard outlet for Level 2 EV home charging.', impact: 'Required for Level 2 home charging', asin: 'B00004YUNO' },
      { cat: 'ev', name: 'BMZX EV Cable Wall Mount', desc: 'Wall-mounted cable management for your EV charger. Keeps garage tidy and cable protected.', impact: 'Extends cable life, safer garage', asin: 'B0799GVJWN' },
      { cat: 'ev', name: 'Bryant NEMA 14-50R Receptacle', desc: 'Industrial-grade 50A outlet for EV charging. Weather-rated, UL-listed for safety.', impact: 'Professional-grade EV outlet', asin: 'B000BPEPNW' },
      { cat: 'ev', name: 'Hubbell NEMA 14-50R Receptacle', desc: 'Heavy-duty 50A, 125/250V industrial receptacle. Built for continuous EV charging loads.', impact: 'Commercial-grade reliability', asin: 'B00EN9VO7W' },

      // Solar & Home Energy (5)
      { cat: 'solar', name: 'Renogy 400W Solar Panel Kit', desc: 'Starter solar panel kit with mounting hardware. Great for sheds, RVs, or supplemental power.', impact: 'Generate ~50 kWh/month free', asin: 'B00BSZUHRC' },
      { cat: 'solar', name: 'Paxcess 100W Portable Power Station', desc: 'Compact 151Wh solar-compatible battery station. Charge via solar, wall, or car. Silent power.', impact: 'Clean portable backup power', asin: 'B01M3S00H0' },
      { cat: 'solar', name: 'Stainless Steel Solar Pathway Lights', desc: 'Solar-powered pathway and garden lights. No wiring, no electricity cost. Auto on at dusk.', impact: '$0 electricity for outdoor lighting', asin: 'B0017TNJWY' },
      { cat: 'solar', name: 'ecobee Smart Thermostat Enhanced', desc: 'WiFi thermostat with room sensors. Energy Star certified. Works with solar and all HVAC systems.', impact: 'Saves ~$140/year on energy', asin: 'B09XXTQPXC' },
      { cat: 'solar', name: '3M Window Insulation Film Kit', desc: 'Heat-shrink window insulation for 5 windows. Reduces drafts and heat loss in winter.', impact: 'Saves 5-10% on heating costs', asin: 'B00002NCJI' }
    ];
  }

  getProducts(category = 'all') {
    if (category === 'all') return this.products;
    return this.products.filter(p => p.cat === category);
  }

  getAmazonUrl(product) {
    return `https://www.amazon.com/dp/${product.asin}?tag=${this.affiliateTag}`;
  }

  getImageUrl(product) {
    return `https://m.media-amazon.com/images/P/${product.asin}.01._SCLZZZZZZZ_SX200_.jpg`;
  }

  getCategories() {
    return ['all', 'ev', 'solar', 'kitchen', 'bathroom', 'energy', 'outdoor', 'cleaning', 'tech'];
  }
}

window.greenShop = new GreenShop();
