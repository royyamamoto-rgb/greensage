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
    setupNavigation();
    setupCarbonCalc();
    setupSolarCalc();
    setupChallenges();
    setupShop();
    setupLearn();
    setupShareActions();
    setupInstallPrompt();
  }

  // ============================================
  // NAVIGATION
  // ============================================
  function setupNavigation() {
    const navBtns = els.bottomNav.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
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
  }

  function renderLearnList() {
    const articles = window.learnContent.getArticles();
    els.learnList.style.display = 'block';
    els.learnContent.classList.remove('active');

    els.learnList.innerHTML = articles.map(a => `
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
  // INIT ON DOM READY
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
