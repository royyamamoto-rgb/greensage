/* ============================================
   GreenSage — Government Incentives Finder
   Federal + State green energy incentives
   Updated Feb 2026 — reflects OBBBA changes
   Sources: IRS, DOE, DSIRE, state agencies
   ============================================ */

class IncentivesFinder {
  constructor() {
    // Federal incentives — updated Feb 2026, reflects OBBBA (One Big Beautiful Bill Act, signed July 4, 2025)
    // Sources: IRS.gov, DOE AFDC, Electrification Coalition, H&R Block, TurboTax, Grant Thornton
    this.federal = [
      {
        id: 'fed-auto-loan',
        name: 'Auto Loan Interest Deduction (NEW)',
        amount: 'Up to $10,000/yr deduction',
        category: 'ev',
        status: 'active',
        desc: 'NEW under OBBBA: Above-the-line tax deduction for auto loan interest on NEW vehicles assembled in the US. Up to $10,000/yr. Applies to ALL vehicle types (gas, hybrid, EV). Income phase-out: $100K single / $200K joint. Active 2025-2028.',
        url: 'https://www.irs.gov/newsroom/treasury-irs-provide-guidance-on-the-new-deduction-for-car-loan-interest-under-the-one-big-beautiful-bill',
        icon: '💰'
      },
      {
        id: 'fed-ev-new',
        name: 'Clean Vehicle Credit (30D) — Small Mfrs Only',
        amount: 'Up to $7,500',
        category: 'ev',
        status: 'limited',
        desc: 'Expired Sep 30, 2025 for major manufacturers (Tesla, GM, Ford, Toyota, Hyundai/Kia, BMW, Nissan, VW, Stellantis — all exceeded 200K sales cap). Through Dec 31, 2026 ONLY for: Honda, Rivian, Lucid, Mercedes, Subaru, Volvo, Mazda. Vehicles must still meet assembly, MSRP ($55K sedan/$80K SUV), and income requirements. ALL credits end Jan 1, 2027.',
        url: 'https://fueleconomy.gov/feg/tax2023.shtml',
        icon: '🚗'
      },
      {
        id: 'fed-ev-charger',
        name: 'EV Charger Tax Credit (30C)',
        amount: '30% up to $1,000',
        category: 'ev',
        status: 'active',
        desc: 'Tax credit for home EV charging equipment. 30% of hardware + installation, up to $1,000 residential / $100,000 commercial per port. RESTRICTION: Must be in eligible census tract (rural or low-income area). Active through June 30, 2026.',
        url: 'https://www.irs.gov/credits-deductions/alternative-fuel-vehicle-refueling-property-credit-for-individuals',
        icon: '🔌'
      },
      {
        id: 'fed-hear',
        name: 'Home Electrification & Appliance Rebates (HEAR)',
        amount: 'Up to $14,000',
        category: 'appliance',
        status: 'active',
        desc: 'IRA-funded point-of-sale rebates: heat pumps ($8,000), electrical panels ($4,000), insulation ($1,600), electric stoves ($840), dryers ($840). Income-qualified (under 150% AMI). Panel upgrades can enable L2 EV charger installation. Varies by state — some states fully launched, others pending.',
        url: 'https://www.energystar.gov/partner-resources/state-and-tribal-rebate-programs/hear-program',
        icon: '⚡'
      },
      {
        id: 'fed-homes',
        name: 'HOMES Efficiency Rebates',
        amount: 'Up to $8,000',
        category: 'home',
        status: 'active',
        desc: 'IRA-funded performance-based whole-house rebates for 20-35%+ energy savings. Up to $4,000 moderate-income, $8,000 low-income. Administered by states. These are spending-side appropriations (not tax credits) so OBBBA did not terminate them.',
        url: 'https://www.energy.gov/scep/home-efficiency-rebates',
        icon: '🏡'
      },
      {
        id: 'fed-ev-used',
        name: 'Used Clean Vehicle Credit (25E)',
        amount: 'Up to $4,000',
        category: 'ev',
        status: 'expired',
        desc: 'Was 30% of sale price up to $4,000 for used EVs under $25,000 from dealers. Expired Sep 30, 2025 under OBBBA. No small-manufacturer exception — fully terminated. No replacement program.',
        url: 'https://www.irs.gov/credits-deductions/used-clean-vehicle-credit',
        icon: '🚙'
      },
      {
        id: 'fed-ev-commercial',
        name: 'Commercial Clean Vehicle Credit (45W)',
        amount: 'Up to $7,500-$40,000',
        category: 'ev',
        status: 'expired',
        desc: 'Was up to $7,500 for light-duty / $40,000 for heavy-duty commercial EVs. Expired Sep 30, 2025 under OBBBA. Binding contract rule applies for contracts signed before cutoff.',
        url: 'https://afdc.energy.gov/laws/ev-tax-credits',
        icon: '🚛'
      },
      {
        id: 'fed-solar-itc',
        name: 'Residential Solar Tax Credit (25D)',
        amount: '30% of cost',
        category: 'solar',
        status: 'expired',
        desc: 'Was 30% of solar system cost with no cap. Expired Dec 31, 2025 for customer-owned systems under OBBBA. Third-party owned (leases/PPAs) may still qualify through 2027 under separate provisions.',
        url: 'https://www.irs.gov/credits-deductions/residential-clean-energy-credit',
        icon: '☀️'
      },
      {
        id: 'fed-battery',
        name: 'Home Battery Storage Credit',
        amount: '30% of cost',
        category: 'solar',
        status: 'expired',
        desc: 'Was 30% for battery storage systems (3+ kWh capacity). Expired Dec 31, 2025 under OBBBA.',
        url: 'https://www.energy.gov/eere/solar/homeowners-guide-federal-tax-credit-solar-photovoltaics',
        icon: '🔋'
      },
      {
        id: 'fed-heat-pump',
        name: 'Heat Pump Tax Credit (25C)',
        amount: 'Up to $2,000/year',
        category: 'home',
        status: 'expired',
        desc: 'Was 30% up to $2,000/year for qualifying heat pumps. Part of Energy Efficient Home Improvement Credit. Expired Dec 31, 2025 under OBBBA. HEAR rebates ($8,000 for heat pumps) may still be available as alternative.',
        url: 'https://www.energystar.gov/about/federal-tax-credits/air-source-heat-pumps',
        icon: '🌡️'
      },
      {
        id: 'fed-insulation',
        name: 'Home Insulation & Windows Credit (25C)',
        amount: 'Up to $1,200/year',
        category: 'home',
        status: 'expired',
        desc: 'Was 30% for insulation, doors ($250/door), windows ($600 max). Expired Dec 31, 2025 under OBBBA. HOMES rebates may still cover insulation improvements.',
        url: 'https://www.energystar.gov/about/federal-tax-credits/insulation',
        icon: '🏠'
      }
    ];

    // State incentives — these are UNAFFECTED by OBBBA (state programs independent of federal)
    this.states = {
      'CO': {
        name: 'Colorado',
        incentives: [
          { name: 'Colorado EV Tax Credit', amount: '$750-$3,250', category: 'ev', desc: '$750 base credit + $2,500 additional for EVs with MSRP under $35,000. Stacks with other incentives.', url: 'https://energyoffice.colorado.gov/transportation/grants-incentives/ev-tax-credits' },
          { name: 'Vehicle Exchange Colorado (VXC)', amount: 'Up to $9,000 new / $6,000 used', category: 'ev', desc: 'Income-qualified program: up to $9,000 for new EV, $6,000 for used EV. One of the best state EV programs in the US.', url: 'https://energyoffice.colorado.gov/transportation/grants-incentives/vehicle-exchange-colorado' },
          { name: 'Xcel Energy EV Rebate', amount: 'Up to $5,500 new / $3,000 used', category: 'ev', desc: 'Xcel Energy utility rebate stackable with state credit. Up to $5,500 new / $3,000 used EV.', url: 'https://ev.xcelenergy.com/ev-rebate' },
          { name: 'Solar Property Tax Exemption', amount: '100% exempt', category: 'solar', desc: 'Solar systems exempt from property tax assessment for 20 years.', url: 'https://energyoffice.colorado.gov/renewable-energy/solar' }
        ]
      },
      'CT': {
        name: 'Connecticut',
        incentives: [
          { name: 'CHEAPR EV Rebate', amount: 'Up to $9,500', category: 'ev', desc: 'Up to $9,500 for purchase/lease of eligible BEV, PHEV, or FCEV. One of the highest state EV incentives.', url: 'https://portal.ct.gov/deep/air/mobile-sources/cheapr/cheapr---connecticut-hydrogen-and-electric-automobile-purchase-rebate' },
          { name: 'Home EV Charger Rebate', amount: 'Up to $1,500', category: 'ev', desc: '$1,500 rebate for home Level 2 EV charger purchase and installation.', url: 'https://portal.ct.gov/deep/air/mobile-sources/cheapr/cheapr---connecticut-hydrogen-and-electric-automobile-purchase-rebate' },
          { name: 'Net Metering (Full Retail)', amount: '1:1 retail credits', category: 'solar', desc: 'Full retail rate net metering for residential solar systems.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/ct/' },
          { name: 'Solar Sales Tax Exemption', amount: '6.35% exempt', category: 'solar', desc: 'Solar equipment exempt from 6.35% CT sales tax.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/ct/' }
        ]
      },
      'OR': {
        name: 'Oregon',
        incentives: [
          { name: 'Charge Ahead Rebate', amount: 'Up to $7,500 new / $5,000 used', category: 'ev', desc: 'Up to $7,500 for new EV, $5,000 for used. SUSPENDED Sep 2025 (funding exhausted) — watch for 2026 refunding.', url: 'https://goelectric.oregon.gov/incentives' },
          { name: 'Solar + Storage Rebate', amount: 'Up to $5,000', category: 'solar', desc: 'Oregon Solar + Storage Rebate Program for residential systems. Income-qualified.', url: 'https://www.oregon.gov/energy/incentives/pages/solar-storage-rebate-program.aspx' },
          { name: 'Net Metering (Full Retail)', amount: '1:1 retail credits', category: 'solar', desc: 'Full retail rate net metering for all major OR utilities.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/or/' }
        ]
      },
      'CA': {
        name: 'California',
        incentives: [
          { name: 'Clean Cars 4 All', amount: 'Up to $12,000 + $2,000 charger', category: 'ev', desc: 'Income-qualified residents get up to $12,000 toward new/used EV plus $2,000 for charging. Replaces retired CVRP.', url: 'https://ww2.arb.ca.gov/our-work/programs/clean-cars-4-all' },
          { name: 'Self-Generation Incentive (SGIP)', amount: '$150-$1,000/kWh storage', category: 'solar', desc: 'Battery storage rebate: $150/kWh general, $850/kWh equity, $1,000/kWh equity resilience. PG&E, SCE, SDG&E customers.', url: 'https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/demand-side-management/self-generation-incentive-program' },
          { name: 'Net Billing (NEM 3.0)', amount: 'Wholesale rate credits', category: 'solar', desc: 'Export credits at ~25% of retail rate. Battery storage strongly recommended to maximize savings.', url: 'https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/demand-side-management/net-energy-metering' },
          { name: 'HEAR Program (California)', amount: 'Up to $14,000', category: 'appliance', desc: 'IRA-funded electrification rebates for low-to-moderate income households. Heat pumps, panels, insulation. Program active.', url: 'https://www.energy.ca.gov/programs-and-topics/programs/inflation-reduction-act-residential-energy-rebate-programs' },
          { name: 'Solar & Storage Equity Program', amount: '$280M fund', category: 'solar', desc: 'Fully subsidized solar + storage for low-income customers in disadvantaged communities.', url: 'https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/demand-side-management/net-energy-metering/solar-and-storage-equity-program' }
        ]
      },
      'TX': {
        name: 'Texas',
        incentives: [
          { name: 'Light-Duty Vehicle Purchase Incentive', amount: 'Up to $2,500', category: 'ev', desc: 'Grant for new EV purchase/lease. Available through March 2026 or until funds exhausted.', url: 'https://www.tceq.texas.gov/airquality/terp/ldplip' },
          { name: 'Solar Property Tax Exemption', amount: '100% exempt', category: 'solar', desc: 'Solar systems exempt from property tax increases. Home value increases but taxes don\'t.', url: 'https://comptroller.texas.gov/taxes/property-tax/exemptions/' },
          { name: 'Oncor Energy Efficiency Rebates', amount: 'Varies', category: 'home', desc: 'Rebates for HVAC, insulation, smart thermostats for Oncor customers.', url: 'https://www.oncor.com/en/content/take-advantage-of-energy-efficiency-rebates' },
          { name: 'Utility Buy-Back Programs', amount: 'Varies by utility', category: 'solar', desc: 'No statewide net metering. Austin Energy and CPS Energy offer buy-back at varying rates.', url: 'https://www.texaselectricityratings.com/blog/solar-buyback-plans-in-texas/' }
        ]
      },
      'FL': {
        name: 'Florida',
        incentives: [
          { name: 'Solar Sales Tax Exemption', amount: '6% savings', category: 'solar', desc: 'Solar equipment exempt from 6% state sales tax. Saves $1,000-$2,000+ on typical install.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/fl/' },
          { name: 'Solar Property Tax Exemption', amount: '100% exempt', category: 'solar', desc: 'Added home value from solar is completely tax-free in Florida.', url: 'https://floridarevenue.com/property/Pages/Taxpayers_Exemptions.aspx' },
          { name: 'Net Metering (Declining)', amount: '60% retail rate (2026)', category: 'solar', desc: 'Credits for excess solar at 60% retail in 2026, dropping to 50% in 2027. Grandfathering may apply.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/fl/' },
          { name: 'FPL SolarTogether', amount: 'Bill credits', category: 'solar', desc: 'Community solar — subscribe without rooftop panels. Monthly bill credits.', url: 'https://www.fpl.com/clean-energy/solar/solar-together.html' }
        ]
      },
      'NY': {
        name: 'New York',
        incentives: [
          { name: 'Drive Clean Rebate', amount: 'Up to $2,000', category: 'ev', desc: '$2,000 rebate for new BEVs with 200+ mile range. Applied at point of sale. 60+ qualifying models.', url: 'https://www.nyserda.ny.gov/All-Programs/Drive-Clean-Rebate-For-Electric-Cars' },
          { name: 'NY State Solar Tax Credit', amount: '25% up to $5,000', category: 'solar', desc: 'State income tax credit of 25% of solar cost, max $5,000. Stacks with any remaining federal credit.', url: 'https://www.tax.ny.gov/pit/credits/solar_energy_system_equipment_credit.htm' },
          { name: 'NY-Sun Incentive (NYSERDA)', amount: '$0.20-$0.60/W', category: 'solar', desc: 'Upfront per-watt rebate on installation. Varies by region. LMI incentives continue.', url: 'https://www.nyserda.ny.gov/All-Programs/NY-Sun' },
          { name: 'Net Metering (Full Retail)', amount: '1:1 retail credits', category: 'solar', desc: 'All major NY utilities offer full retail rate net metering for systems up to 25 kW.', url: 'https://www.nyserda.ny.gov/All-Programs/NY-Sun/On-site-Solar/Homes/Paying-for-Solar' },
          { name: 'HEAR Program (New York)', amount: 'Up to $14,000', category: 'appliance', desc: 'IRA-funded electrification rebates for income-qualified NY residents. Through NYSERDA.', url: 'https://www.nyserda.ny.gov/All-Programs/Inflation-Reduction-Act/Inflation-Reduction-Act-homeowners' }
        ]
      },
      'PA': {
        name: 'Pennsylvania',
        incentives: [
          { name: 'Alternative Fuel Vehicle Rebate', amount: 'Up to $2,000', category: 'ev', desc: 'Rebate for new battery electric and plug-in hybrid vehicles. Administered by PA DEP.', url: 'https://www.dep.pa.gov/Citizens/GrantsLoansRebates/Alternative-Fuels-Incentive-Grant/pages/alternative-fuel-vehicles.aspx' },
          { name: 'Solar Renewable Energy Credits', amount: '$25-$35/SREC', category: 'solar', desc: 'Earn 1 SREC per 1,000 kWh generated. Sell on open market. Prices fluctuate.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/pa/' },
          { name: 'Net Metering (Full Retail)', amount: '1:1 retail credits', category: 'solar', desc: 'All PA investor-owned utilities provide full retail rate net metering.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/pa/' },
          { name: 'Philadelphia Solar Rebate', amount: 'Up to $1,000', category: 'solar', desc: 'City rebate for Philadelphia residents. Limited to city residents only.', url: 'https://www.phila.gov/programs/solarize-philly/' }
        ]
      },
      'IL': {
        name: 'Illinois',
        incentives: [
          { name: 'Illinois Shines Solar SRECs', amount: '$75-$95/SREC (15-yr)', category: 'solar', desc: 'Lump-sum payment for 15 years of SRECs. Rates increasing 34-43% for 2026-27. One of the best in the US.', url: 'https://www.illinoisshines.com/' },
          { name: 'Solar + Battery Rebate', amount: '$300/kW + $300/kWh', category: 'solar', desc: '$300 per kW solar + $300 per kWh storage for qualifying residential installations.', url: 'https://www.illinoisshines.com/' },
          { name: 'Illinois EV Rebate (CEJA)', amount: 'Up to $4,000', category: 'ev', desc: '$4,000 for new EVs under Climate & Equitable Jobs Act. Income/price caps apply.', url: 'https://www.illinoisgreenalliance.org/resources/illinois-ev-rebate' },
          { name: 'Net Metering (Full Retail)', amount: '1:1 retail credits', category: 'solar', desc: 'ComEd, Ameren, MidAmerican offer full retail net metering for systems up to 25 kW.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/il/' }
        ]
      },
      'OH': {
        name: 'Ohio',
        incentives: [
          { name: 'Net Metering (Full Retail)', amount: '1:1 retail credits', category: 'solar', desc: 'Ohio investor-owned utilities offer full retail rate net metering. Credits carry forward.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/oh/' },
          { name: 'Utility EV Charger Rebates', amount: '$200-$1,000', category: 'ev', desc: '14 Ohio utilities offer Level 2 charger rebates. Varies by utility.', url: 'https://www.energysage.com/ev-charging/ohio-ev-incentives/' },
          { name: 'Home Energy Rebates (IRA)', amount: 'Up to $14,000', category: 'home', desc: 'Ohio received ~$250M in IRA funding. Program launching late 2025/early 2026.', url: 'https://energizeohio.osu.edu/incentives' }
        ]
      },
      'GA': {
        name: 'Georgia',
        incentives: [
          { name: 'Georgia Home Energy Rebates', amount: 'Up to $16,000', category: 'home', desc: 'Up to $16,000 depending on income and energy savings. Weatherization, HVAC, appliances.', url: 'https://energyrebates.georgia.gov/' },
          { name: 'Georgia Power Rebates', amount: 'Up to $1,000', category: 'home', desc: 'Water heater ($1,000), insulation ($250), smart thermostat ($200) for GP customers.', url: 'https://www.georgiapower.com/residential/save-money-and-energy/rebates-and-discounts.html' },
          { name: 'Georgia Power EV Charger', amount: 'Up to $150', category: 'ev', desc: '$150 toward Level 2 EV charger for Georgia Power residential customers.', url: 'https://www.georgiapower.com/residential/electric-vehicles.html' }
        ]
      },
      'NC': {
        name: 'North Carolina',
        incentives: [
          { name: 'Duke Energy PowerPair', amount: 'Up to $9,000', category: 'solar', desc: 'Up to $9,000 for solar-plus-battery storage system. Depends on battery capacity.', url: 'https://www.duke-energy.com/home/products/power-pair' },
          { name: 'Duke Energy EV Charger Credit', amount: 'Up to $1,133', category: 'ev', desc: 'Credit toward Level 2 home EV charger installation for Duke Carolinas customers.', url: 'https://www.duke-energy.com/home/products/ev-complete-home' },
          { name: 'Net Metering (Full Retail)', amount: '1:1 retail credits', category: 'solar', desc: 'Duke and Dominion NC offer full retail rate net metering.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/nc/' },
          { name: 'NC Home Energy Rebates', amount: 'Varies', category: 'home', desc: 'IRA-funded rebates launched Jan 2025. Insulation, heat pumps, air sealing.', url: 'https://nccleantech.ncsu.edu/2025/01/28/new-energy-efficiency-rebates-now-available-in-north-carolina/' }
        ]
      },
      'MI': {
        name: 'Michigan',
        incentives: [
          { name: 'DTE Home EV Charger Rebate', amount: 'Up to $500', category: 'ev', desc: 'Rebate for Level 2 home EV charger for DTE residential customers.', url: 'https://www.dteenergy.com/residential/programs-services/electric-vehicles' },
          { name: 'LBWL EV Charger Rebate', amount: 'Up to $1,000', category: 'ev', desc: 'Lansing Board of Water & Light customers get up to $1,000 for home charger.', url: 'https://www.lbwl.com/community/electric-vehicle-rebate' },
          { name: 'LBWL Solar Rebate', amount: '$500/kW up to $2,000', category: 'solar', desc: 'Lansing BWL offers $500/kW installed, max $2,000 for LBWL residential customers.', url: 'https://www.lbwl.com/' },
          { name: 'Michigan HEAR Program', amount: 'Up to $14,000', category: 'appliance', desc: 'IRA-funded electrification rebates for income-qualified MI residents. Program active.', url: 'https://www.michigan.gov/egle/about/featured/ira-home-energy-rebates' }
        ]
      },
      'NJ': {
        name: 'New Jersey',
        incentives: [
          { name: 'Charge Up New Jersey', amount: 'Up to $4,000 + $250 charger', category: 'ev', desc: '$4,000 off qualifying new EV + $250 for Level 2 charger. Point-of-sale at dealers.', url: 'https://chargeup.njcleanenergy.com/' },
          { name: 'SREC-II / SuSI Program', amount: '$85/MWh for 15 years', category: 'solar', desc: '$85 per MWh for 15 years. One of the most valuable solar incentives in the US. Review March 2026.', url: 'https://njcleanenergy.com/renewable-energy/programs/susi-program' },
          { name: 'Solar Sales & Property Tax Exempt', amount: '100% exempt', category: 'solar', desc: 'Solar exempt from NJ sales tax AND property tax increases. Double exemption.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/nj/' },
          { name: 'Net Metering (Full Retail)', amount: '1:1 retail credits', category: 'solar', desc: 'Full retail rate net metering. Excess credits carry forward annually.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/nj/' }
        ]
      },
      'VA': {
        name: 'Virginia',
        incentives: [
          { name: 'Net Metering (Full Retail)', amount: '1:1 retail credits', category: 'solar', desc: 'Dominion and Appalachian Power offer full retail rate net metering.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/va/' },
          { name: 'Local Solar Property Tax Exemption', amount: 'Varies by locality', category: 'solar', desc: 'Counties/cities may exempt solar from property tax. Several NoVA counties offer credits.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/va/' },
          { name: 'Dominion Energy EV Charger Rebate', amount: 'Up to $500', category: 'ev', desc: 'Rebate on Level 2 charger plus off-peak EV charging rates for Dominion customers.', url: 'https://www.dominionenergy.com/virginia/save-energy/electric-vehicles' }
        ]
      },
      'WA': {
        name: 'Washington',
        incentives: [
          { name: 'WA EV Instant Rebate', amount: 'Up to $9,000 new / $2,500 used', category: 'ev', desc: 'Income-qualified (300% FPL). Program closed Oct 2024, may reopen with new funding.', url: 'https://ecology.wa.gov/air-climate/reducing-greenhouse-gas-emissions/zev/ev-rebate' },
          { name: 'Solar Sales Tax Exemption', amount: '100% exempt', category: 'solar', desc: 'Solar equipment and installation exempt from WA state sales tax (~8%+ savings).', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/wa/' },
          { name: 'PSE EV Charger Rebate', amount: '$300-$2,600', category: 'ev', desc: '$300 general, up to $2,600 income-qualified for Level 2 charger + installation.', url: 'https://www.pse.com/en/rebates/electric-car-charger-rebate' },
          { name: 'Washington HEAR Program', amount: 'Up to $14,000', category: 'appliance', desc: '$73.5M invested 2024-2025, additional $30.1M for 2026. Heat pumps, appliances, efficiency. Active.', url: 'https://www.commerce.wa.gov/energy-incentives/hear/' }
        ]
      },
      'AZ': {
        name: 'Arizona',
        incentives: [
          { name: 'AZ Solar Tax Credit', amount: '25% up to $1,000', category: 'solar', desc: 'State income tax credit, 25% of solar cost capped at $1,000. Unused rolls over 5 years.', url: 'https://resilient.az.gov/clean-energy-hub/households/residential-solar-and-wind-energy-systems-tax-credit' },
          { name: 'Solar Sales & Property Tax Exempt', amount: '100% exempt', category: 'solar', desc: 'Solar exempt from both AZ sales tax and property tax increases.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/az/' },
          { name: 'Arizona HEAR Program', amount: 'Up to $8,000 heat pump', category: 'appliance', desc: '$76.4M available. Up to $8,000 heat pump, plus insulation, panels, air sealing.', url: 'https://resilient.az.gov/clean-energy-hub/households/home-energy-upgrade-incentives' },
          { name: 'APS Home Energy Rebates', amount: 'Varies', category: 'home', desc: 'APS customers get rebates on HVAC, insulation, smart thermostats.', url: 'https://www.aps.com/residential/save-money-and-energy/rebates-incentives' }
        ]
      },
      'MA': {
        name: 'Massachusetts',
        incentives: [
          { name: 'MOR-EV Rebate', amount: '$3,500 + $1,500 income adder', category: 'ev', desc: '$3,500 for new BEVs, $3,500 for used BEVs under $40K. Extra $1,500 for income-qualifying.', url: 'https://mor-ev.org/' },
          { name: 'SMART 3.0 Solar Incentive', amount: 'Per-kWh for 20 years', category: 'solar', desc: 'Performance incentive per kWh for 20 years. 2026 program opened Jan 1 with 600 MW capacity. Very generous.', url: 'https://www.mass.gov/info-details/smart-30-program-details' },
          { name: 'Mass Save Rebates', amount: 'Up to $10,000+ heat pumps', category: 'home', desc: '$10,000 whole-home heat pump, 75-100% insulation costs. Available to ALL MA utility customers.', url: 'https://www.masssave.com/' },
          { name: 'Net Metering (Full Retail)', amount: '1:1 retail credits', category: 'solar', desc: 'Full retail rate net metering. Credits carry forward 12 months.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/ma/' },
          { name: 'Solar Sales Tax Exemption', amount: '6.25% exempt', category: 'solar', desc: 'Solar equipment exempt from 6.25% state sales tax.', url: 'https://www.energysage.com/local-data/solar-rebates-incentives/ma/' }
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
    let total = 0;
    // Active federal: HEAR ($14,000) + HOMES ($8,000) + EV charger ($1,000) + Auto loan deduction (~$2,500 tax value)
    total += 14000 + 8000 + 1000 + 2500;

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

// Dynamic content layer — fetch from API if available, merge with static fallback
(function() {
  const API = 'https://greensage-api.roy-yamamoto.workers.dev/api';
  const finder = window.incentivesFinder;

  // Fetch updated federal incentives
  fetch(API + '/incentives').then(r => r.json()).then(data => {
    if (data && data.federal && data.federal.length > 0) {
      finder.federal = data.federal;
      finder._dynamicUpdated = data.updated;
      // Re-render if incentives tab is visible
      if (typeof window._refreshIncentives === 'function') window._refreshIncentives();
    }
  }).catch(() => {}); // silently fall back to static data

  // Fetch news feed
  fetch(API + '/news').then(r => r.json()).then(data => {
    if (data && data.items) {
      window._greenSageNews = data;
    }
  }).catch(() => {});

  // Fetch blog index
  fetch(API + '/blog-index').then(r => r.json()).then(data => {
    if (data && data.posts) {
      window._greenSageBlogIndex = data;
    }
  }).catch(() => {});
})();
