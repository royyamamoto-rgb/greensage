/* ============================================
   GreenSage — Main App Controller
   Wires all modules, handles UI, navigation
   ============================================ */

(function() {
  'use strict';

  // ---- DOM References ----
  const $ = id => document.getElementById(id);

  const els = {
    // Navigation
    bottomNav: $('bottomNav'),
    tabCarbon: $('tabCarbon'),
    tabSolar: $('tabSolar'),
    tabChallenge: $('tabChallenge'),
    tabShop: $('tabShop'),
    tabLearn: $('tabLearn'),
    tabEV: $('tabEV'),
    tabInfo: $('tabInfo'),

    // Carbon Calculator
    carbonForm: $('carbonForm'),
    carbonResult: $('carbonResult'),
    cfTransport: $('cfTransport'),
    cfDistance: $('cfDistance'),
    cfDistanceVal: $('cfDistanceVal'),
    cfFlights: $('cfFlights'),
    cfEnergy: $('cfEnergy'),
    cfElecBill: $('cfElecBill'),
    cfElecBillVal: $('cfElecBillVal'),
    cfDiet: $('cfDiet'),
    cfShopping: $('cfShopping'),
    cfRecycle: $('cfRecycle'),
    btnCalcCarbon: $('btnCalcCarbon'),
    btnRecalc: $('btnRecalc'),
    ecoScoreCircle: $('ecoScoreCircle'),
    ecoScoreValue: $('ecoScoreValue'),
    ecoScoreLabel: $('ecoScoreLabel'),
    ecoScoreDesc: $('ecoScoreDesc'),
    ecoBreakdown: $('ecoBreakdown'),
    ecoTips: $('ecoTips'),

    // Solar Calculator
    solarForm: $('solarForm'),
    solarResult: $('solarResult'),
    slrBill: $('slrBill'),
    slrBillVal: $('slrBillVal'),
    slrRoof: $('slrRoof'),
    slrRoofVal: $('slrRoofVal'),
    slrSun: $('slrSun'),
    slrRate: $('slrRate'),
    slrRateVal: $('slrRateVal'),
    btnCalcSolar: $('btnCalcSolar'),
    btnRecalcSolar: $('btnRecalcSolar'),
    slrSavings25: $('slrSavings25'),
    slrSystemKW: $('slrSystemKW'),
    slrInstallCost: $('slrInstallCost'),
    slrPayback: $('slrPayback'),
    slrMonthlySave: $('slrMonthlySave'),
    slrCO2: $('slrCO2'),
    slrTrees: $('slrTrees'),
    solarChartBars: $('solarChartBars'),

    // Incentives
    tabIncentives: $('tabIncentives'),
    incentiveState: $('incentiveState'),
    incentiveCategories: $('incentiveCategories'),
    incentiveTotalBanner: $('incentiveTotalBanner'),
    incentiveTotalValue: $('incentiveTotalValue'),
    federalIncentivesList: $('federalIncentivesList'),
    stateIncentivesSection: $('stateIncentivesSection'),
    stateSectionTitle: $('stateSectionTitle'),
    stateIncentivesList: $('stateIncentivesList'),
    noStateData: $('noStateData'),

    // EV Calculator
    evForm: $('evForm'),
    evResult: $('evResult'),
    evGasVehicle: $('evGasVehicle'),
    evEVVehicle: $('evEVVehicle'),
    evMiles: $('evMiles'),
    evMilesVal: $('evMilesVal'),
    evGasPrice: $('evGasPrice'),
    evGasPriceVal: $('evGasPriceVal'),
    evElecRate: $('evElecRate'),
    evElecRateVal: $('evElecRateVal'),
    evYears: $('evYears'),
    btnCalcEV: $('btnCalcEV'),
    btnRecalcEV: $('btnRecalcEV'),

    // Challenges
    streakCount: $('streakCount'),
    totalPoints: $('totalPoints'),
    challengeList: $('challengeList'),
    challengeProgressVal: $('challengeProgressVal'),
    challengeProgressBar: $('challengeProgressBar'),

    // Shop
    shopCategories: $('shopCategories'),
    shopGrid: $('shopGrid'),

    // Learn
    learnList: $('learnList'),
    learnContent: $('learnContent'),

    // Share
    btnShare: $('btnShare'),
    btnHome: $('btnHome'),
    shareSheet: $('shareSheet'),
    btnShareLink: $('btnShareLink'),
    btnAddHome: $('btnAddHome'),
    btnShareCancel: $('btnShareCancel'),
    iosInstallModal: $('iosInstallModal')
  };

  // ---- State ----
  let currentTab = 'tabCarbon';
  let deferredInstallPrompt = null;

  // ---- Initialize ----
  function init() {
    const modules = [
      setupNavigation, setupCarbonCalc, setupSolarCalc, setupEVCalc,
      setupIncentives, setupChallenges, setupShop, setupLearn,
      setupShareActions, setupInstallPrompt, setupShareResults, setupEmailCapture
    ];
    modules.forEach(fn => {
      try { fn(); } catch (e) { console.warn('GreenSage init:', fn.name, e); }
    });
  }

  // ============================================
  // NAVIGATION
  // ============================================
  function setupNavigation() {
    const navBtns = els.bottomNav.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabId = btn.dataset.tab;
        if (!tabId) return; // skip Blog link (no data-tab)
        e.preventDefault();
        switchTab(tabId);
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    const tab = $(tabId);
    if (tab) {
      tab.classList.add('active');
      currentTab = tabId;
    }
  }

  // ============================================
  // CARBON CALCULATOR
  // ============================================
  function setupCarbonCalc() {
    // Range sliders: update display values
    els.cfDistance.addEventListener('input', () => {
      els.cfDistanceVal.textContent = els.cfDistance.value + ' mi';
    });
    els.cfElecBill.addEventListener('input', () => {
      els.cfElecBillVal.textContent = '$' + els.cfElecBill.value;
    });

    // Calculate button
    els.btnCalcCarbon.addEventListener('click', calculateCarbon);
    els.btnRecalc.addEventListener('click', () => {
      els.carbonResult.classList.remove('active');
      els.carbonForm.style.display = 'block';
    });
  }

  function calculateCarbon() {
    const inputs = {
      transport: els.cfTransport.value,
      distance: parseInt(els.cfDistance.value),
      flights: parseInt(els.cfFlights.value),
      energy: els.cfEnergy.value,
      elecBill: parseInt(els.cfElecBill.value),
      diet: els.cfDiet.value,
      shopping: els.cfShopping.value,
      recycle: els.cfRecycle.value
    };

    const result = window.carbonCalc.calculate(inputs);
    window.carbonCalc.lastResult = result;
    trackCalcUse();
    renderCarbonResult(result);
  }

  function renderCarbonResult(result) {
    els.carbonForm.style.display = 'none';
    els.carbonResult.classList.add('active');

    // Score circle
    els.ecoScoreCircle.className = 'eco-score-circle ' + result.gradeClass;
    els.ecoScoreValue.textContent = result.total;
    els.ecoScoreLabel.textContent = result.gradeLabel + ' (Grade ' + result.grade + ')';
    els.ecoScoreDesc.textContent = result.gradeDesc;

    // Breakdown
    els.ecoBreakdown.innerHTML = result.breakdown
      .filter(b => b.value !== 0)
      .map(b => `
        <div class="eco-breakdown-item">
          <div class="eco-breakdown-value">${b.value > 0 ? b.value.toFixed(1) : b.value.toFixed(1)}</div>
          <div class="eco-breakdown-label">${b.icon} ${b.label}</div>
        </div>
      `).join('');

    // Comparison bars
    els.ecoBreakdown.innerHTML += `
      <div class="eco-breakdown-item">
        <div class="eco-breakdown-value" style="color:var(--text-dim);">${result.usAvg}</div>
        <div class="eco-breakdown-label">🇺🇸 US Average</div>
      </div>
      <div class="eco-breakdown-item">
        <div class="eco-breakdown-value" style="color:var(--secondary);">${result.target}</div>
        <div class="eco-breakdown-label">🎯 Sustainable Target</div>
      </div>
    `;

    // Tips
    els.ecoTips.innerHTML = '<div class="card-title" style="margin-bottom:12px;">💡 Personalized Tips</div>' +
      result.tips.map(t => `
        <div class="eco-tip">
          <div class="eco-tip-icon">${t.icon}</div>
          <div>
            <div class="eco-tip-text">${t.text}</div>
            <div class="eco-tip-savings">${t.savings}</div>
          </div>
        </div>
      `).join('');

    // Save to localStorage
    try {
      localStorage.setItem('gs_last_carbon', JSON.stringify(result));
    } catch (e) { /* ignore */ }
  }

  // ============================================
  // SOLAR CALCULATOR
  // ============================================
  function setupSolarCalc() {
    els.slrBill.addEventListener('input', () => {
      els.slrBillVal.textContent = '$' + els.slrBill.value;
    });
    els.slrRoof.addEventListener('input', () => {
      els.slrRoofVal.textContent = els.slrRoof.value + ' sq ft';
    });
    els.slrRate.addEventListener('input', () => {
      els.slrRateVal.textContent = '$' + parseFloat(els.slrRate.value).toFixed(2) + '/kWh';
    });

    els.btnCalcSolar.addEventListener('click', calculateSolar);
    els.btnRecalcSolar.addEventListener('click', () => {
      els.solarResult.classList.remove('active');
      els.solarResult.style.display = 'none';
      els.solarForm.style.display = 'block';
    });
  }

  function calculateSolar() {
    const inputs = {
      monthlyBill: parseInt(els.slrBill.value),
      roofSqFt: parseInt(els.slrRoof.value),
      sunHours: parseFloat(els.slrSun.value),
      electricityRate: parseFloat(els.slrRate.value)
    };

    const result = window.solarCalc.calculate(inputs);
    window.solarCalc.lastResult = result;
    trackCalcUse();
    renderSolarResult(result);
  }

  function renderSolarResult(result) {
    els.solarForm.style.display = 'none';
    els.solarResult.classList.add('active');
    els.solarResult.style.display = 'block';

    // Hero
    const savings = result.totalSavings25;
    els.slrSavings25.textContent = (savings >= 0 ? '+' : '') + '$' + Math.abs(savings).toLocaleString();
    els.slrSavings25.style.color = savings >= 0 ? 'var(--accent)' : 'var(--danger)';

    // Stats
    els.slrSystemKW.textContent = result.systemKW + ' kW';
    els.slrInstallCost.textContent = '$' + result.netCost.toLocaleString();
    els.slrPayback.textContent = result.paybackYears + ' yrs';
    els.slrMonthlySave.textContent = '$' + result.monthlySavings;
    els.slrCO2.textContent = result.annualCO2Offset + 't';
    els.slrTrees.textContent = result.treesEquivalent;

    // Monthly chart
    const maxProd = Math.max(...result.monthlyProduction);
    els.solarChartBars.innerHTML = result.monthlyProduction.map((kwh, i) => {
      const height = Math.max(4, (kwh / maxProd) * 100);
      return `
        <div class="solar-chart-bar" style="height:${height}%" title="${kwh} kWh">
          <span class="solar-chart-bar-label">${result.monthLabels[i]}</span>
        </div>
      `;
    }).join('');

    // Save
    try {
      localStorage.setItem('gs_last_solar', JSON.stringify(result));
    } catch (e) { /* ignore */ }
  }

  // ============================================
  // EV SWITCHING CALCULATOR
  // ============================================
  function setupEVCalc() {
    // Populate vehicle dropdowns
    const gasVehicles = window.evCalc.getGasVehicles();
    const evVehicles = window.evCalc.getEVVehicles();

    els.evGasVehicle.innerHTML = gasVehicles.map(v =>
      `<option value="${v.id}">${v.label} (${v.mpg} MPG)</option>`
    ).join('');

    els.evEVVehicle.innerHTML = evVehicles.map(v =>
      `<option value="${v.id}">${v.label} — ${v.range} mi${v.taxCredit > 0 ? ' ✓ $' + v.taxCredit.toLocaleString() + ' credit' : ' (no federal credit)'}</option>`
    ).join('');

    // Range sliders
    els.evMiles.addEventListener('input', () => {
      els.evMilesVal.textContent = parseInt(els.evMiles.value).toLocaleString() + ' mi';
    });
    els.evGasPrice.addEventListener('input', () => {
      els.evGasPriceVal.textContent = '$' + parseFloat(els.evGasPrice.value).toFixed(2) + '/gal';
    });
    els.evElecRate.addEventListener('input', () => {
      els.evElecRateVal.textContent = '$' + parseFloat(els.evElecRate.value).toFixed(2) + '/kWh';
    });

    // Calculate
    els.btnCalcEV.addEventListener('click', calculateEV);
    els.btnRecalcEV.addEventListener('click', () => {
      els.evResult.classList.remove('active');
      els.evResult.style.display = 'none';
      els.evForm.style.display = 'block';
    });
  }

  function calculateEV() {
    const inputs = {
      gasVehicle: els.evGasVehicle.value,
      evVehicle: els.evEVVehicle.value,
      annualMiles: parseInt(els.evMiles.value),
      gasPrice: parseFloat(els.evGasPrice.value),
      elecRate: parseFloat(els.evElecRate.value),
      yearsToCompare: parseInt(els.evYears.value)
    };

    const result = window.evCalc.calculate(inputs);
    if (result) {
      trackCalcUse();
      renderEVResult(result);
    }
  }

  function renderEVResult(r) {
    els.evForm.style.display = 'none';
    els.evResult.classList.add('active');
    els.evResult.style.display = 'block';

    // Hero
    $('evResYears').textContent = r.years;
    $('evResTotalSaving').textContent = '+$' + r.totalSavings.toLocaleString();
    $('evResTotalSaving').style.color = r.totalSavings >= 0 ? 'var(--primary)' : 'var(--danger)';
    $('evResPerYear').textContent = '~$' + Math.round(r.totalSavings / r.years).toLocaleString() + '/year in running cost savings';

    // Matchup
    $('evResGasName').textContent = r.gasVehicle;
    $('evResEvName').textContent = r.evVehicle;

    // Annual comparison grid
    $('evResFuelGas').textContent = '$' + r.annualGasFuel.toLocaleString();
    $('evResFuelEv').textContent = '$' + r.annualEvFuel.toLocaleString();
    $('evResMaintGas').textContent = '$' + r.annualMaintGas.toLocaleString();
    $('evResMaintEv').textContent = '$' + r.annualMaintEv.toLocaleString();
    $('evResCpmGas').textContent = '$' + r.gasCostPerMile.toFixed(2);
    $('evResCpmEv').textContent = '$' + r.evCostPerMile.toFixed(2);
    $('evResTotalGas').textContent = '$' + (r.annualGasFuel + r.annualMaintGas).toLocaleString();
    $('evResTotalEv').textContent = '$' + (r.annualEvFuel + r.annualMaintEv).toLocaleString();

    // Purchase info
    $('evResMsrp').textContent = '$' + r.evMsrp.toLocaleString();
    if (r.evTaxCredit > 0) {
      $('evResCredit').textContent = '-$' + r.evTaxCredit.toLocaleString();
      $('evResCredit').style.color = 'var(--primary)';
    } else {
      $('evResCredit').textContent = 'Expired (OBBBA)';
      $('evResCredit').style.color = 'var(--danger)';
    }
    $('evResEffective').textContent = '$' + r.evEffectivePrice.toLocaleString();
    $('evResRange').textContent = r.evRange + ' miles';

    // Environmental
    $('evResCO2Gas').textContent = r.annualGasCO2 + 't';
    $('evResCO2Ev').textContent = r.annualEvCO2 + 't';
    $('evResCO2Saved').textContent = r.annualCO2Saved + 't';
    $('evResTotalCO2').textContent = r.totalCO2Saved + 't';
    $('evResTrees').textContent = r.treesEquiv;

    const emReduction = r.annualGasCO2 > 0 ? Math.round((r.annualCO2Saved / r.annualGasCO2) * 100) : 0;
    $('evResEmReduce').textContent = emReduction + '%';

    // Cumulative savings chart
    const chartBars = $('evChartBars');
    const maxSaving = Math.max(...r.yearlyData.map(d => d.savings));
    // Show every other year or every 2 years for readability
    const step = r.years <= 5 ? 1 : r.years <= 10 ? 2 : 3;
    const displayYears = r.yearlyData.filter((d, i) => i % step === step - 1 || i === r.yearlyData.length - 1);

    chartBars.innerHTML = displayYears.map(d => {
      const height = Math.max(4, (d.savings / maxSaving) * 100);
      return `
        <div class="solar-chart-bar" style="height:${height}%;background:linear-gradient(to top, var(--primary-dim), var(--primary));" title="Year ${d.year}: $${d.savings.toLocaleString()} saved">
          <span class="solar-chart-bar-label">Yr${d.year}</span>
        </div>
      `;
    }).join('');

    // Save
    try {
      localStorage.setItem('gs_last_ev', JSON.stringify(r));
    } catch (e) { /* ignore */ }
  }

  // ============================================
  // INCENTIVES FINDER
  // ============================================
  function setupIncentives() {
    // Populate state dropdown
    const states = window.incentivesFinder.getStateList();
    els.incentiveState.innerHTML = '<option value="">-- Select Your State --</option>' +
      states.map(s => `<option value="${s.code}">${s.name}</option>`).join('');

    // Load saved state
    const savedState = localStorage.getItem('gs_state');
    if (savedState) {
      els.incentiveState.value = savedState;
    }

    // Render federal incentives on load
    renderIncentives('all');

    // State change
    els.incentiveState.addEventListener('change', () => {
      const code = els.incentiveState.value;
      if (code) localStorage.setItem('gs_state', code);
      renderIncentives(getCurrentIncentiveCat());
    });

    // Category filter
    els.incentiveCategories.addEventListener('click', (e) => {
      const btn = e.target.closest('.shop-cat-btn');
      if (!btn) return;
      const cat = btn.dataset.cat;
      els.incentiveCategories.querySelectorAll('.shop-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderIncentives(cat);
    });
  }

  function getCurrentIncentiveCat() {
    const active = els.incentiveCategories.querySelector('.shop-cat-btn.active');
    return active ? active.dataset.cat : 'all';
  }

  function renderIncentives(category) {
    const stateCode = els.incentiveState.value;

    // Federal
    const federalItems = window.incentivesFinder.getFederal(category);
    els.federalIncentivesList.innerHTML = federalItems.map(i => renderIncentiveCard(i)).join('');

    // State
    if (stateCode && window.incentivesFinder.hasStateData(stateCode)) {
      const stateData = window.incentivesFinder.getState(stateCode);
      let stateItems = stateData.incentives;
      if (category !== 'all') {
        stateItems = stateItems.filter(i => i.category === category);
      }

      els.stateSectionTitle.textContent = '🏛️ ' + stateData.name + ' Incentives';
      els.stateIncentivesList.innerHTML = stateItems.length > 0
        ? stateItems.map(i => renderIncentiveCard(i)).join('')
        : '<div class="info-text" style="text-align:center; padding:12px;">No ' + category + ' incentives found for this state.</div>';
      els.stateIncentivesSection.style.display = 'block';
      els.noStateData.style.display = 'none';

      // Total banner
      const total = window.incentivesFinder.getTotalPotentialSavings(stateCode);
      els.incentiveTotalValue.textContent = '$' + total.toLocaleString() + '+';
      els.incentiveTotalBanner.style.display = 'block';
    } else if (stateCode) {
      els.stateIncentivesSection.style.display = 'none';
      els.noStateData.style.display = 'block';
      els.incentiveTotalBanner.style.display = 'none';
    } else {
      els.stateIncentivesSection.style.display = 'none';
      els.noStateData.style.display = 'none';
      els.incentiveTotalBanner.style.display = 'none';
    }
  }

  function renderIncentiveCard(item) {
    const statusLabels = { active: 'Active', limited: 'Limited Eligibility', expired: 'Expired (OBBBA)' };
    const statusBadge = item.status
      ? `<span class="incentive-status-badge incentive-status-${item.status}">${statusLabels[item.status] || item.status}</span>`
      : '';
    const expiredClass = item.status === 'expired' ? ' status-expired' : '';
    return `
      <div class="incentive-card${expiredClass}">
        <div class="incentive-card-cat">${item.icon || '📋'} ${item.category} ${statusBadge}</div>
        <div class="incentive-card-top">
          <div class="incentive-card-name">${item.name}</div>
          <div class="incentive-card-amount">${item.amount}</div>
        </div>
        <div class="incentive-card-desc">${item.desc}</div>
        ${item.url ? `<a class="incentive-card-link" href="${item.url}" target="_blank" rel="noopener">Learn more & apply →</a>` : ''}
      </div>
    `;
  }

  // ============================================
  // TAB SWITCHING HELPERS (for Smart CTAs)
  // ============================================
  window._switchToTab = function(tabId, shopCat) {
    switchTab(tabId);
    // Update nav buttons
    els.bottomNav.querySelectorAll('.nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabId);
    });
    // Scroll to top
    window.scrollTo(0, 0);
    // If switching to shop with a category
    if (shopCat && tabId === 'tabShop') {
      els.shopCategories.querySelectorAll('.shop-cat-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.cat === shopCat);
      });
      renderShop(shopCat);
    }
  };

  // Expose refresh for dynamic content updates
  window._refreshIncentives = function() {
    renderIncentives(getCurrentIncentiveCat());
  };

  // ============================================
  // GREEN CHALLENGES
  // ============================================
  function setupChallenges() {
    renderChallenges();
  }

  function renderChallenges() {
    const state = window.greenChallenges.getState();

    // Streak & points
    els.streakCount.textContent = state.streak;
    els.totalPoints.textContent = state.totalPoints;

    // Progress
    els.challengeProgressVal.textContent = state.completedCount + ' / ' + state.totalChallenges;
    const pct = (state.completedCount / state.totalChallenges) * 100;
    els.challengeProgressBar.style.width = pct + '%';

    // Challenge cards
    els.challengeList.innerHTML = state.challenges.map(c => `
      <div class="challenge-card ${c.completed ? 'completed' : ''}" data-id="${c.id}">
        <div class="challenge-top">
          <span class="challenge-category ${c.cat}">${c.cat}</span>
          <span class="challenge-points">+${c.points} pts</span>
        </div>
        <div class="challenge-title">${c.title}</div>
        <div class="challenge-desc">${c.desc}</div>
        <div class="challenge-impact">${c.impact}</div>
        <button class="challenge-btn ${c.completed ? 'done' : ''}"
                onclick="window._completeChallenge('${c.id}')"
                ${c.completed ? 'disabled' : ''}>
          ${c.completed ? '✓ Completed' : 'Mark Complete'}
        </button>
      </div>
    `).join('');
  }

  // Expose to onclick
  window._completeChallenge = function(id) {
    const success = window.greenChallenges.completeChallenge(id);
    if (success) {
      renderChallenges();
      // Quick animation
      const card = document.querySelector(`.challenge-card[data-id="${id}"]`);
      if (card) {
        card.classList.add('animate-in');
      }
    }
  };

  // ============================================
  // GREEN SHOP
  // ============================================
  function setupShop() {
    renderShop('all');

    // Category filter
    els.shopCategories.addEventListener('click', (e) => {
      const btn = e.target.closest('.shop-cat-btn');
      if (!btn) return;
      const cat = btn.dataset.cat;
      els.shopCategories.querySelectorAll('.shop-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderShop(cat);
    });
  }

  function renderShop(category) {
    const products = window.greenShop.getProducts(category);
    els.shopGrid.innerHTML = products.map(p => {
      const url = window.greenShop.getAmazonUrl(p);
      return `
        <div class="shop-item">
          <div class="shop-item-icon">${p.icon}</div>
          <div class="shop-item-name">${p.name}</div>
          <div class="shop-item-desc">${p.desc}</div>
          <div class="shop-item-impact">${p.impact}</div>
          <a class="shop-item-btn" href="${url}" target="_blank" rel="noopener">View on Amazon</a>
        </div>
      `;
    }).join('');
  }

  // ============================================
  // LEARN / MASTERTEACH
  // ============================================
  function setupLearn() {
    renderLearnList();
    // Poll for dynamic blog index from API
    let _blogCheck = setInterval(() => {
      if (window._greenSageBlogIndex && window._greenSageBlogIndex.posts) {
        renderLearnList(); // re-render with blog posts included
        clearInterval(_blogCheck);
      }
    }, 600);
    setTimeout(() => clearInterval(_blogCheck), 10000);
  }

  function renderLearnList() {
    const articles = window.learnContent.getArticles();
    els.learnList.style.display = 'block';
    els.learnContent.classList.remove('active');

    // Static articles
    let html = articles.map(a => `
      <div class="learn-card" onclick="window._openArticle('${a.id}')">
        <div class="learn-card-top">
          <div class="learn-card-icon">${a.icon}</div>
          <div>
            <div class="learn-card-title">${a.title}</div>
            <div class="learn-card-desc">${a.desc}</div>
            <div class="learn-card-meta">
              <span>${a.readTime}</span>
              <span>${a.category}</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Dynamic blog posts from API
    const blogData = window._greenSageBlogIndex;
    if (blogData && blogData.posts && blogData.posts.length > 0) {
      html += `<div style="padding:12px 16px 4px;font-weight:700;font-size:0.85rem;color:var(--primary);">📝 Latest Blog Posts</div>`;
      html += blogData.posts.map(p => {
        const icon = p.category === 'Solar' ? '☀️' : p.category === 'Electric Vehicles' ? '🚗' : p.category === 'Climate' ? '🌍' : p.category === 'Home Energy' ? '🏠' : p.category === 'Green Living' ? '🌿' : '📄';
        return `
        <div class="learn-card" onclick="window._openBlogPost('${p.url}')">
          <div class="learn-card-top">
            <div class="learn-card-icon">${icon}</div>
            <div>
              <div class="learn-card-title">${p.title}</div>
              <div class="learn-card-meta">
                <span>${p.readTime || ''}</span>
                <span>${p.category}</span>
                <span>${p.date}</span>
              </div>
            </div>
          </div>
        </div>`;
      }).join('');
    }

    els.learnList.innerHTML = html;
  }

  window._openArticle = function(id) {
    const article = window.learnContent.getArticle(id);
    if (!article) return;

    els.learnList.style.display = 'none';
    els.learnContent.classList.add('active');
    els.learnContent.innerHTML = `
      <button class="learn-back-btn" onclick="window._backToLearnList()">← Back to Articles</button>
      <h2 style="font-size:1.2rem; margin-bottom:4px;">${article.icon} ${article.title}</h2>
      <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:16px;">${article.readTime} · ${article.category}</div>
      ${article.content}
    `;
  };

  window._backToLearnList = function() {
    renderLearnList();
  };

  window._openBlogPost = function(url) {
    if (url) window.open(url, '_blank', 'noopener');
  };

  // ============================================
  // SHARE & INSTALL
  // ============================================
  function setupShareActions() {
    // Share button opens action sheet
    els.btnShare.addEventListener('click', () => {
      els.shareSheet.classList.add('active');
    });

    // Home button
    els.btnHome.addEventListener('click', () => {
      showInstallInstructions();
    });

    // Share link
    els.btnShareLink.addEventListener('click', () => {
      els.shareSheet.classList.remove('active');
      if (navigator.share) {
        navigator.share({
          title: 'GreenSage — Sustainable Living Coach',
          text: 'Calculate your carbon footprint, track green challenges, and discover solar savings!',
          url: window.location.href
        }).catch(() => {});
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert('Link copied to clipboard!');
        }).catch(() => {
          alert('Share URL: ' + window.location.href);
        });
      }
    });

    // Add to home
    els.btnAddHome.addEventListener('click', () => {
      els.shareSheet.classList.remove('active');
      showInstallInstructions();
    });

    // Cancel
    els.btnShareCancel.addEventListener('click', () => {
      els.shareSheet.classList.remove('active');
    });

    // Close sheet on overlay tap
    document.addEventListener('click', (e) => {
      if (els.shareSheet.classList.contains('active') && !els.shareSheet.contains(e.target) && e.target !== els.btnShare) {
        els.shareSheet.classList.remove('active');
      }
    });
  }

  function showInstallInstructions() {
    // Android: use deferred prompt
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then(choice => {
        deferredInstallPrompt = null;
      });
      return;
    }

    // iOS: show instructions modal
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      els.iosInstallModal.classList.add('active');
    } else {
      // Generic instructions
      els.iosInstallModal.classList.add('active');
    }
  }

  function setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
    });
  }

  // ============================================
  // SHAREABLE CALCULATOR RESULTS
  // ============================================
  function setupShareResults() {
    // Carbon share
    const btnShareCarbon = $('btnShareCarbon');
    if (btnShareCarbon) {
      btnShareCarbon.addEventListener('click', () => {
        const r = window.carbonCalc.lastResult;
        if (!r) return;
        shareText(
          'My Carbon Footprint Results',
          `My carbon footprint is ${r.total} tons CO₂/year (Grade ${r.grade}). US average is ${r.usAvg}t. Sustainable target is ${r.target}t.\n\nCalculate yours free:`
        );
      });
    }

    // Solar share
    const btnShareSolar = $('btnShareSolar');
    if (btnShareSolar) {
      btnShareSolar.addEventListener('click', () => {
        const r = window.solarCalc.lastResult;
        if (!r) return;
        shareText(
          'My Solar Savings Estimate',
          `My solar estimate: ${r.systemKW} kW system could save $${r.totalSavings25.toLocaleString()} over 25 years! Payback in ${r.paybackYears} years, offsetting ${r.annualCO2Offset}t CO₂/year.\n\nCalculate yours free:`
        );
      });
    }

    // EV share
    const btnShareEV = $('btnShareEV');
    if (btnShareEV) {
      btnShareEV.addEventListener('click', () => {
        const r = window.evCalc.lastResult;
        if (!r) return;
        shareText(
          'My EV vs Gas Comparison',
          `Switching from ${r.gasVehicle} to ${r.evVehicle} could save $${r.totalSavings.toLocaleString()} over ${r.years} years and prevent ${r.totalCO2Saved}t of CO₂!\n\nCompare yours free:`
        );
      });
    }
  }

  function shareText(title, text) {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title, text: text + '\n' + url, url }).catch(() => {});
    } else {
      const full = text + '\n' + url;
      navigator.clipboard.writeText(full).then(() => {
        alert('Results copied to clipboard! Paste to share.');
      }).catch(() => {
        alert(full);
      });
    }
  }

  // ============================================
  // EMAIL CAPTURE & LEAD GEN
  // ============================================
  function setupEmailCapture() {
    // Modal email submit
    const btnEmailSubmit = $('btnEmailSubmit');
    if (btnEmailSubmit) {
      btnEmailSubmit.addEventListener('click', () => {
        const email = $('emailInput').value.trim();
        if (email && email.includes('@')) {
          captureEmail(email, 'modal');
          $('emailCaptureForm').style.display = 'none';
          $('emailSuccess').style.display = 'block';
        }
      });
    }

    // Landing page email
    const btnLandingEmail = $('btnLandingEmail');
    if (btnLandingEmail) {
      btnLandingEmail.addEventListener('click', () => {
        const email = $('landingEmailInput').value.trim();
        if (email && email.includes('@')) {
          captureEmail(email, 'landing');
          btnLandingEmail.textContent = 'Subscribed!';
          btnLandingEmail.disabled = true;
          $('landingEmailInput').disabled = true;
        }
      });
    }

    // Show email popup after 3rd calculator use (non-intrusive timing)
    const calcCount = parseInt(localStorage.getItem('gs_calc_count') || '0');
    if (calcCount >= 3 && !localStorage.getItem('gs_email_captured') && !localStorage.getItem('gs_email_dismissed')) {
      setTimeout(() => {
        $('emailCaptureModal').classList.add('active');
      }, 2000);
    }
  }

  function captureEmail(email, source) {
    // Store locally — ready for integration with Mailchimp/ConvertKit/Beehiiv
    const subscribers = JSON.parse(localStorage.getItem('gs_subscribers') || '[]');
    subscribers.push({ email, source, date: new Date().toISOString() });
    localStorage.setItem('gs_subscribers', JSON.stringify(subscribers));
    localStorage.setItem('gs_email_captured', '1');
  }

  // Track calculator usage for email popup trigger
  function trackCalcUse() {
    const count = parseInt(localStorage.getItem('gs_calc_count') || '0') + 1;
    localStorage.setItem('gs_calc_count', String(count));
  }

  // ============================================
  // DYNAMIC NEWS FEED
  // ============================================
  function renderNewsFeed() {
    const newsData = window._greenSageNews;
    if (!newsData || !newsData.items || newsData.items.length === 0) return;

    const section = $('newsSection');
    const feed = $('newsFeed');
    const updated = $('newsUpdated');
    if (!section || !feed) return;

    feed.innerHTML = newsData.items.map(item => `
      <div style="padding:10px 0;border-bottom:1px solid var(--border);">
        <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:2px;">${item.category} · ${item.date}</div>
        <div style="font-weight:600;font-size:0.85rem;margin-bottom:4px;">
          ${item.url ? '<a href="' + item.url + '" style="color:var(--primary);text-decoration:none;">' + item.title + '</a>' : item.title}
        </div>
        <div style="font-size:0.78rem;color:var(--text-dim);line-height:1.4;">${item.summary}</div>
      </div>
    `).join('');

    if (updated && newsData.updated) {
      updated.textContent = 'Last updated: ' + new Date(newsData.updated).toLocaleDateString();
    }
    section.style.display = 'block';
  }

  // Poll for dynamic data readiness (API fetch is async)
  let _newsCheckInterval = setInterval(() => {
    if (window._greenSageNews) {
      renderNewsFeed();
      clearInterval(_newsCheckInterval);
    }
  }, 500);
  setTimeout(() => clearInterval(_newsCheckInterval), 10000); // stop checking after 10s

  // ============================================
  // INIT ON DOM READY
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
