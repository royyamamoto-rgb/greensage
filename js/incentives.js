/* ============================================
   GreenSage — Government Incentives Finder
   Federal + State green energy incentives
   Sources: IRS, DOE, DSIRE, state agencies
   ============================================ */

class IncentivesFinder {
  constructor() {
    // Federal incentives (Inflation Reduction Act 2022, extended through 2032)
    this.federal = [
      {
        id: 'fed-ev-new',
        name: 'Clean Vehicle Tax Credit (New EV)',
        amount: 'Up to $7,500',
        category: 'ev',
        desc: 'Tax credit for new qualifying electric vehicles. Must meet final assembly, battery component, and critical mineral requirements. Income limits: $150k single / $300k joint.',
        url: 'https://fueleconomy.gov/feg/tax2023.shtml',
        icon: '🚗'
      },
      {
        id: 'fed-ev-used',
        name: 'Used Clean Vehicle Credit',
        amount: 'Up to $4,000',
        category: 'ev',
        desc: 'Tax credit for used EVs purchased from a dealer. Vehicle must be at least 2 years old and under $25,000. Income limits: $75k single / $150k joint.',
        url: 'https://www.irs.gov/credits-deductions/used-clean-vehicle-credit',
        icon: '🚙'
      },
      {
        id: 'fed-ev-charger',
        name: 'EV Charger Tax Credit (30C)',
        amount: '30% up to $1,000',
        category: 'ev',
        desc: 'Tax credit for home EV charging equipment. Covers 30% of cost and installation, up to $1,000 for residential. Must be in eligible census tract.',
        url: 'https://afdc.energy.gov/laws/alternative-fuel-infrastructure-tax-credit',
        icon: '🔌'
      },
      {
        id: 'fed-solar-itc',
        name: 'Residential Solar Tax Credit (ITC)',
        amount: '30% of cost',
        category: 'solar',
        desc: 'Federal tax credit covers 30% of solar panel system cost including installation. No cap. Applies through 2032, then drops to 26% in 2033.',
        url: 'https://www.energy.gov/eere/solar/homeowners-guide-federal-tax-credit-solar-photovoltaics',
        icon: '☀️'
      },
      {
        id: 'fed-battery',
        name: 'Home Battery Storage Credit',
        amount: '30% of cost',
        category: 'solar',
        desc: 'Tax credit for home battery storage systems (3+ kWh capacity). Standalone batteries now qualify — no solar required.',
        url: 'https://www.energy.gov/eere/solar/homeowners-guide-federal-tax-credit-solar-photovoltaics',
        icon: '🔋'
      },
      {
        id: 'fed-heat-pump',
        name: 'Heat Pump Tax Credit',
        amount: 'Up to $2,000/year',
        category: 'home',
        desc: 'Tax credit for qualifying heat pumps (air source, geothermal, mini-split). Covers 30% of cost up to $2,000/year. Must meet Energy Star efficiency.',
        url: 'https://www.energystar.gov/about/federal-tax-credits/air-source-heat-pumps',
        icon: '🌡️'
      },
      {
        id: 'fed-insulation',
        name: 'Home Insulation & Doors Credit',
        amount: 'Up to $1,200/year',
        category: 'home',
        desc: 'Tax credit for insulation, exterior doors ($250/door), and windows ($600 max). Part of the Energy Efficient Home Improvement Credit.',
        url: 'https://www.energystar.gov/about/federal-tax-credits/insulation',
        icon: '🏠'
      },
      {
        id: 'fed-water-heater',
        name: 'Heat Pump Water Heater Credit',
        amount: 'Up to $2,000/year',
        category: 'home',
        desc: 'Tax credit for heat pump water heaters meeting Energy Star requirements. 3-4x more efficient than standard electric water heaters.',
        url: 'https://www.energystar.gov/about/federal-tax-credits/water-heaters-heat-pump',
        icon: '🚿'
      },
      {
        id: 'fed-energy-audit',
        name: 'Home Energy Audit Credit',
        amount: 'Up to $150',
        category: 'home',
        desc: 'Tax credit for a professional home energy audit to identify efficiency improvements. Must meet DOE requirements.',
        url: 'https://www.energystar.gov/about/federal-tax-credits/home-energy-audits',
        icon: '📋'
      },
      {
        id: 'fed-appliance-rebate',
        name: 'HOMES Rebate Program',
        amount: 'Up to $8,000',
        category: 'appliance',
        desc: 'Income-based rebates for whole-home energy efficiency upgrades. Up to $8,000 for low-income households. Funded by IRA, distributed by states.',
        url: 'https://www.energy.gov/scep/home-energy-rebates-programs',
        icon: '🏡'
      },
      {
        id: 'fed-electrification',
        name: 'High-Efficiency Electric Home Rebate',
        amount: 'Up to $14,000',
        category: 'appliance',
        desc: 'Point-of-sale rebates for heat pumps ($8,000), heat pump water heaters ($1,750), electric stoves ($840), insulation ($1,600), and more. Income-qualified.',
        url: 'https://www.energy.gov/scep/home-energy-rebates-programs',
        icon: '⚡'
      }
    ];

    // State incentives database
    this.states = {
      'CA': {
        name: 'California',
        incentives: [
          { name: 'CVRP — Clean Vehicle Rebate', amount: 'Up to $7,500', category: 'ev', desc: 'Rebate for new EVs. $2,000-$7,500 based on income. Stackable with federal credit.', url: 'https://cleanvehiclerebate.org/' },
          { name: 'Self-Generation Incentive (SGIP)', amount: 'Up to $1,000/kWh', category: 'solar', desc: 'Rebate for home battery storage. Higher incentives for low-income and fire-risk areas.', url: 'https://www.selfgenc.com/' },
          { name: 'Net Energy Metering (NEM 3.0)', amount: 'Bill credits', category: 'solar', desc: 'Export excess solar to grid for bill credits. Rates vary by time of export.', url: 'https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/demand-side-management/net-energy-metering' },
          { name: 'TECH Clean California', amount: 'Up to $4,250', category: 'home', desc: 'Rebates for heat pump HVAC and water heaters. Statewide program for all-electric homes.', url: 'https://techcleanca.com/' },
          { name: 'PG&E EV Rate', amount: 'Discounted rates', category: 'ev', desc: 'Special electricity rate for EV charging. Off-peak rates as low as $0.24/kWh for overnight charging.', url: 'https://www.pge.com/en/account/rate-plans/find-your-best-rate-plan.html' }
        ]
      },
      'TX': {
        name: 'Texas',
        incentives: [
          { name: 'Light-Duty Motor Vehicle Purchase Incentive', amount: 'Up to $2,500', category: 'ev', desc: 'Rebate for new EVs purchased or leased by Texas residents. First-come, first-served funding.', url: 'https://www.tceq.texas.gov/airquality/terp/ld.html' },
          { name: 'Net Metering (Utility-Specific)', amount: 'Varies by utility', category: 'solar', desc: 'Some TX utilities offer net metering or buyback programs. Check with your provider (Oncor, CenterPoint, etc.).', url: 'https://www.texaselectricityratings.com/blog/net-metering-in-texas/' },
          { name: 'Property Tax Exemption for Solar', amount: '100% exemption', category: 'solar', desc: 'Solar panels are exempt from property tax increases in Texas. Your home value increases but taxes don\'t.', url: 'https://comptroller.texas.gov/taxes/property-tax/' },
          { name: 'Austin Energy Solar Rebate', amount: '$2,500', category: 'solar', desc: 'Austin Energy customers get $2,500 rebate for solar installation. Additional battery incentives available.', url: 'https://austinenergy.com/green-power/solar-solutions' }
        ]
      },
      'FL': {
        name: 'Florida',
        incentives: [
          { name: 'Sales Tax Exemption for Solar', amount: '6% savings', category: 'solar', desc: 'Solar energy systems are exempt from Florida\'s 6% sales tax. Saves $1,000-$2,000+ on typical install.', url: 'https://www.flsenate.gov/Laws/Statutes/2023/212.08' },
          { name: 'Property Tax Exemption for Solar', amount: '100% exemption', category: 'solar', desc: 'Residential solar installations exempt from property tax increases. Added home value is tax-free.', url: 'https://floridarevenue.com/property/Pages/Taxpayers_Exemptions.aspx' },
          { name: 'Net Metering', amount: 'Retail rate credits', category: 'solar', desc: 'Florida requires utilities to offer net metering at full retail rate for systems up to 2 MW.', url: 'https://www.flrules.org/gateway/ChapterHome.asp?Chapter=25-6' },
          { name: 'FPL SolarTogether', amount: 'Bill credits', category: 'solar', desc: 'Community solar program — subscribe to solar without rooftop panels. Monthly bill credits.', url: 'https://www.fpl.com/clean-energy/solar/solar-together.html' }
        ]
      },
      'NY': {
        name: 'New York',
        incentives: [
          { name: 'Drive Clean Rebate', amount: 'Up to $2,000', category: 'ev', desc: 'Point-of-sale rebate for new EVs. $500-$2,000 depending on vehicle price. Applies automatically at dealer.', url: 'https://www.nyserda.ny.gov/All-Programs/Drive-Clean-Rebate-For-Electric-Cars' },
          { name: 'NY-Sun Solar Incentive', amount: '$0.20-$0.40/W', category: 'solar', desc: 'Upfront incentive reducing solar install cost. Typical savings $2,000-$5,000 depending on region and system size.', url: 'https://www.nyserda.ny.gov/All-Programs/NY-Sun' },
          { name: 'Solar Energy System Tax Credit', amount: '25% up to $5,000', category: 'solar', desc: 'State tax credit of 25% of solar system cost, max $5,000. Stacks with federal 30% ITC.', url: 'https://www.tax.ny.gov/pit/credits/solar-energy-system-equipment-credit.htm' },
          { name: 'EmPower+ Program', amount: 'Free upgrades', category: 'home', desc: 'Free energy efficiency upgrades for income-eligible households. Includes insulation, air sealing, LED lighting.', url: 'https://www.nyserda.ny.gov/All-Programs/EmPower-New-York' },
          { name: 'SREC Credits', amount: '~$15-25/MWh', category: 'solar', desc: 'Earn Solar Renewable Energy Credits for electricity generated. Sell on market for additional income.', url: 'https://www.nyserda.ny.gov/All-Programs/NY-Sun/Contractors/Value-of-Distributed-Energy-Resources' }
        ]
      },
      'PA': {
        name: 'Pennsylvania',
        incentives: [
          { name: 'Alternative Fuel Vehicle Rebate', amount: 'Up to $2,000', category: 'ev', desc: 'Rebate for new battery EVs or PHEVs purchased by PA residents. Income limits may apply.', url: 'https://www.dep.pa.gov/Citizens/GrantsLoansRebates/Alternative-Fuels-Incentive-Grant/Pages/default.aspx' },
          { name: 'SREC Market', amount: '~$20-40/MWh', category: 'solar', desc: 'Pennsylvania has an active SREC market. Solar owners earn credits worth $20-40 per MWh generated.', url: 'https://www.puc.pa.gov/filing-resources/issues-laws-regulations/act-129/' },
          { name: 'Net Metering', amount: 'Retail rate credits', category: 'solar', desc: 'PA requires net metering at retail rate for systems up to 50 kW. Year-end credit settlement.', url: 'https://www.puc.pa.gov/filing-resources/issues-laws-regulations/net-metering/' },
          { name: 'PECO Smart Ideas Rebates', amount: 'Varies', category: 'home', desc: 'Rebates on smart thermostats, insulation, heat pumps, and LED bulbs for PECO customers.', url: 'https://www.peco.com/smart-ideas' }
        ]
      },
      'IL': {
        name: 'Illinois',
        incentives: [
          { name: 'Illinois EV Rebate', amount: 'Up to $4,000', category: 'ev', desc: 'Rebate for new EVs. Illinois Climate & Equitable Jobs Act provides $4,000 for new EVs.', url: 'https://www2.illinois.gov/epa/topics/ceja/Pages/Electric-Vehicle-Rebates.aspx' },
          { name: 'IL Solar Renewable Energy Credits', amount: '~$60-80/REC', category: 'solar', desc: 'Illinois has some of the highest SREC values in the US. 15-year contract through IL Shines program.', url: 'https://www.illinoisshines.com/' },
          { name: 'ComEd Solar & EV Programs', amount: 'Varies', category: 'solar', desc: 'ComEd offers hourly pricing, EV charging rates, and community solar programs for Chicagoland.', url: 'https://www.comed.com/ways-to-save' },
          { name: 'IL EV Charging Rebate', amount: '80% up to $3,200', category: 'ev', desc: 'Rebate covers 80% of EV charger purchase and installation cost, up to $3,200 residential.', url: 'https://www2.illinois.gov/epa/topics/ceja/Pages/Electric-Vehicle-Rebates.aspx' }
        ]
      },
      'OH': {
        name: 'Ohio',
        incentives: [
          { name: 'AEP Ohio EV Rebate', amount: 'Up to $500', category: 'ev', desc: 'AEP customers can get $500 off Level 2 home EV charger purchase and installation.', url: 'https://www.aepohio.com/savings/electric-vehicles' },
          { name: 'Property Tax Exemption for Solar', amount: '100% exemption', category: 'solar', desc: 'Residential solar qualifies for property tax exemption on added home value in Ohio.', url: 'https://tax.ohio.gov/help-center/faqs/property-tax' },
          { name: 'Net Metering', amount: 'Retail rate credits', category: 'solar', desc: 'Ohio requires net metering for systems up to 25 kW at full retail rate.', url: 'https://puco.ohio.gov/utilities/electricity/resources/net-metering' },
          { name: 'Home Weatherization Assistance', amount: 'Free upgrades', category: 'home', desc: 'Free weatherization for income-eligible Ohio residents. Insulation, sealing, HVAC improvements.', url: 'https://development.ohio.gov/community/community-resources/home-weatherization-assistance-program' }
        ]
      },
      'GA': {
        name: 'Georgia',
        incentives: [
          { name: 'Georgia Power EV Rate', amount: 'Discounted off-peak', category: 'ev', desc: 'Special TOU rate for EV owners. Off-peak charging at ~$0.01/kWh (super off-peak 11pm-7am).', url: 'https://www.georgiapower.com/residential/billing-and-rate-plans/pricing-and-rate-plans.html' },
          { name: 'Net Metering (Georgia Power)', amount: 'Avoided cost credits', category: 'solar', desc: 'Georgia Power offers net metering at avoided cost rate. Not full retail, but still provides value.', url: 'https://www.georgiapower.com/residential/save-money-and-energy/products-programs/solar-energy.html' },
          { name: 'Sales Tax Exemption for Solar', amount: '4% savings', category: 'solar', desc: 'Solar panels exempt from Georgia state sales tax (4%).', url: 'https://dor.georgia.gov/taxes/sales-use-tax' }
        ]
      },
      'NC': {
        name: 'North Carolina',
        incentives: [
          { name: 'Duke Energy EV Rebate', amount: '$1,000-$1,500', category: 'ev', desc: 'Duke Energy customers get $1,000-$1,500 for installing a Level 2 home EV charger.', url: 'https://www.duke-energy.com/energy-education/electric-vehicles' },
          { name: 'NC Solar Property Tax Exemption', amount: '80% exemption', category: 'solar', desc: '80% of the added value from solar is exempt from property taxes in North Carolina.', url: 'https://www.ncleg.gov/EnactedLegislation/Statutes/PDF/BySection/Chapter_105/GS_105-275.pdf' },
          { name: 'Net Metering', amount: 'Retail rate credits', category: 'solar', desc: 'NC requires utilities to offer net metering at avoided cost rate for systems up to 1 MW.', url: 'https://www.ncuc.gov/ncrules/chapter08.html' }
        ]
      },
      'MI': {
        name: 'Michigan',
        incentives: [
          { name: 'DTE EV Rate', amount: 'Discounted off-peak', category: 'ev', desc: 'DTE Energy offers special EV charging rates. Off-peak rates significantly lower for overnight charging.', url: 'https://www.dteenergy.com/us/en/residential/service-request/pev.html' },
          { name: 'Consumers Energy PowerMIDrive', amount: 'Up to $500', category: 'ev', desc: 'Rebate on Level 2 EV charger installation for Consumers Energy customers.', url: 'https://www.consumersenergy.com/residential/programs-and-services/electric-vehicles' },
          { name: 'MI Solar Outright Purchase Credit', amount: 'Varies', category: 'solar', desc: 'DTE and Consumers Energy offer net metering and distributed generation programs for solar.', url: 'https://www.michigan.gov/egle/about/organization/materials-management/energy/renewable-energy' }
        ]
      },
      'NJ': {
        name: 'New Jersey',
        incentives: [
          { name: 'NJ EV Sales Tax Exemption', amount: '~7% savings', category: 'ev', desc: 'Zero-emission vehicles exempt from NJ sales tax (6.625%). Saves $2,000-$5,000+ on purchase.', url: 'https://www.nj.gov/treasury/taxation/su_zev.shtml' },
          { name: 'NJ Successor Solar Incentive (SuSI)', amount: '$85-$100/MWh', category: 'solar', desc: 'Fixed payments for 15 years per MWh of solar generated. One of the best solar incentives in the US.', url: 'https://www.njcleanenergy.com/renewable-energy/programs/susi-program' },
          { name: 'NJ Solar Property Tax Exemption', amount: '100% exemption', category: 'solar', desc: 'Full property tax exemption for solar installations. Added home value is completely tax-free.', url: 'https://www.njcleanenergy.com/renewable-energy/programs/property-tax-exemption' },
          { name: 'NJ Clean Energy HVAC Rebates', amount: 'Up to $5,000', category: 'home', desc: 'Rebates on high-efficiency HVAC, heat pumps, and water heaters for NJ residents.', url: 'https://www.njcleanenergy.com/residential/programs/programs' }
        ]
      },
      'VA': {
        name: 'Virginia',
        incentives: [
          { name: 'Dominion Energy EV Rebate', amount: '$500-$1,000', category: 'ev', desc: 'Dominion Energy customers get rebates on Level 2 EV chargers and off-peak charging rates.', url: 'https://www.dominionenergy.com/virginia/save-energy/electric-vehicles' },
          { name: 'VA Solar Property Tax Exemption', amount: '80% exemption', category: 'solar', desc: 'Solar installations exempt from 80% of property tax on added value (local jurisdictions may vary).', url: 'https://law.lis.virginia.gov/vacode/title58.1/chapter32/section58.1-3661/' },
          { name: 'Net Metering', amount: 'Retail rate credits', category: 'solar', desc: 'Virginia requires net metering at retail rate for residential systems up to 25 kW.', url: 'https://www.scc.virginia.gov/pages/Net-Metering' }
        ]
      },
      'WA': {
        name: 'Washington',
        incentives: [
          { name: 'WA EV Sales Tax Exemption', amount: '~8% savings', category: 'ev', desc: 'EVs under $45,000 MSRP exempt from state sales tax (6.5%+). Saves $3,000-$4,000+.', url: 'https://dor.wa.gov/taxes-rates/tax-incentives/incentives/clean-alternative-fuel-commercial-vehicles-sales-and-use-tax-exemption' },
          { name: 'WA Solar Sales Tax Exemption', amount: '~8% savings', category: 'solar', desc: 'Solar panels and installation exempt from Washington state sales tax.', url: 'https://dor.wa.gov/taxes-rates/tax-incentives/incentives/renewable-energy-system-incentive-program' },
          { name: 'Net Metering', amount: 'Retail rate credits', category: 'solar', desc: 'Washington requires net metering at retail rate for systems up to 100 kW.', url: 'https://www.utc.wa.gov/consumers/energy/net-metering' },
          { name: 'PSE Rebates', amount: 'Varies', category: 'home', desc: 'Puget Sound Energy offers rebates on heat pumps, insulation, and smart thermostats.', url: 'https://www.pse.com/rebates' }
        ]
      },
      'AZ': {
        name: 'Arizona',
        incentives: [
          { name: 'AZ Solar Equipment Tax Credit', amount: 'Up to $1,000', category: 'solar', desc: 'Arizona personal income tax credit of 25% of solar equipment cost, up to $1,000.', url: 'https://azdor.gov/tax-credits/solar-energy-credit' },
          { name: 'AZ Property Tax Exemption for Solar', amount: '100% exemption', category: 'solar', desc: 'Solar installations fully exempt from property tax increases in Arizona.', url: 'https://www.azleg.gov/ars/42/11054.htm' },
          { name: 'APS Solar Rate Plans', amount: 'Bill credits', category: 'solar', desc: 'APS offers solar rate plans with export credit and demand-based rates for solar customers.', url: 'https://www.aps.com/en/Residential/Service-Plans/Compare-Service-Plans/Solar-Plans' },
          { name: 'SRP EV Price Plan', amount: 'Discounted off-peak', category: 'ev', desc: 'Salt River Project offers EV-specific rate plan with very low off-peak rates for overnight charging.', url: 'https://www.srpnet.com/electric/home/ev-price-plan.aspx' }
        ]
      },
      'MA': {
        name: 'Massachusetts',
        incentives: [
          { name: 'MOR-EV Rebate', amount: 'Up to $3,500', category: 'ev', desc: 'Massachusetts rebate for new EVs. $3,500 for battery EVs under $55,000 MSRP.', url: 'https://mor-ev.org/' },
          { name: 'MA SMART Solar Incentive', amount: 'Up to $0.35/kWh', category: 'solar', desc: 'Performance-based incentive paying solar owners per kWh generated for 10 years. Very lucrative.', url: 'https://www.mass.gov/solar-massachusetts-renewable-target-smart' },
          { name: 'Mass Save Rebates', amount: 'Up to $10,000+', category: 'home', desc: 'Comprehensive rebates on heat pumps ($10,000+), insulation (75-100% covered), and thermostats.', url: 'https://www.masssave.com/residential/rebates-and-incentives' },
          { name: 'MA Solar Property Tax Exemption', amount: '20-year exemption', category: 'solar', desc: 'Solar installations exempt from property tax for 20 years in Massachusetts.', url: 'https://www.mass.gov/info-details/massachusetts-incentives-for-solar' }
        ]
      }
    };

    this.stateList = [
      { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' },
      { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' },
      { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
      { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' },
      { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' },
      { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
      { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' },
      { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' },
      { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
      { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' },
      { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' },
      { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
      { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' },
      { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' },
      { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
      { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' },
      { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' },
      { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
      { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' },
      { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' },
      { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
      { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' },
      { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' },
      { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
      { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' },
      { code: 'DC', name: 'Washington D.C.' }
    ];
  }

  getFederal(category = 'all') {
    if (category === 'all') return this.federal;
    return this.federal.filter(i => i.category === category);
  }

  getState(stateCode) {
    return this.states[stateCode] || null;
  }

  getStateList() {
    return this.stateList;
  }

  hasStateData(stateCode) {
    return !!this.states[stateCode];
  }

  getTotalPotentialSavings(stateCode) {
    // Estimate total potential savings for a state
    let total = 0;
    // Federal: EV ($7,500) + Solar 30% of $20k ($6,000) + Home ($3,200)
    total += 7500 + 6000 + 3200;

    const state = this.states[stateCode];
    if (state) {
      state.incentives.forEach(i => {
        const match = i.amount.match(/\$([0-9,]+)/);
        if (match) {
          total += parseInt(match[1].replace(/,/g, ''));
        }
      });
    }

    return total;
  }
}

window.incentivesFinder = new IncentivesFinder();
