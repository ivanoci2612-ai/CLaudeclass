'use strict';

// ── State ──────────────────────────────────────────────
let balance = 1000;
let oddsFormat = 'decimal';
let activeSport = 'football';
let activeFilter = 'all';
let activeLeague = null;
const betSlip = {}; // key: matchId+outcome → { matchId, outcome, label, odds, stake }

// ── Data ───────────────────────────────────────────────
const leagues = [
  { id: 'pl',  name: 'Premier League',    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', sport: 'football' },
  { id: 'ucl', name: 'Champions League',  flag: '🇪🇺', sport: 'football' },
  { id: 'lla', name: 'La Liga',           flag: '🇪🇸', sport: 'football' },
  { id: 'bun', name: 'Bundesliga',        flag: '🇩🇪', sport: 'football' },
  { id: 'sa',  name: 'Serie A',           flag: '🇮🇹', sport: 'football' },
  { id: 'nba', name: 'NBA',              flag: '🇺🇸', sport: 'basketball' },
  { id: 'atp', name: 'ATP Tour',         flag: '🎾', sport: 'tennis' },
  { id: 'ipl', name: 'IPL',             flag: '🇮🇳', sport: 'cricket' },
];

const matches = [
  // Premier League – live
  { id: 'm1', leagueId: 'pl', sport: 'football', live: true, minute: 67, homeTeam: 'Manchester City', awayTeam: 'Arsenal', homeIcon: '🔵', awayIcon: '🔴', homeScore: 2, awayScore: 1, time: null, odds: { home: 1.45, draw: 4.20, away: 6.50 } },
  { id: 'm2', leagueId: 'pl', sport: 'football', live: true, minute: 34, homeTeam: 'Chelsea', awayTeam: 'Tottenham', homeIcon: '🔵', awayIcon: '⚪', homeScore: 0, awayScore: 0, time: null, odds: { home: 2.10, draw: 3.30, away: 3.40 } },
  // Premier League – upcoming
  { id: 'm3', leagueId: 'pl', sport: 'football', live: false, minute: null, homeTeam: 'Liverpool', awayTeam: 'Man United', homeIcon: '🔴', awayIcon: '🔴', homeScore: null, awayScore: null, time: 'Today 20:45', odds: { home: 1.90, draw: 3.50, away: 4.10 } },
  { id: 'm4', leagueId: 'pl', sport: 'football', live: false, minute: null, homeTeam: 'Newcastle', awayTeam: 'Aston Villa', homeIcon: '⚫', awayIcon: '🟣', homeScore: null, awayScore: null, time: 'Sat 15:00', odds: { home: 2.35, draw: 3.20, away: 3.00 } },
  // Champions League – live
  { id: 'm5', leagueId: 'ucl', sport: 'football', live: true, minute: 82, homeTeam: 'Real Madrid', awayTeam: 'PSG', homeIcon: '⚪', awayIcon: '🔵', homeScore: 1, awayScore: 1, time: null, odds: { home: 2.60, draw: 3.40, away: 2.50 } },
  // Champions League – upcoming
  { id: 'm6', leagueId: 'ucl', sport: 'football', live: false, minute: null, homeTeam: 'Bayern Munich', awayTeam: 'Inter Milan', homeIcon: '🔴', awayIcon: '⚫', homeScore: null, awayScore: null, time: 'Wed 21:00', odds: { home: 2.05, draw: 3.60, away: 3.70 } },
  // La Liga
  { id: 'm7', leagueId: 'lla', sport: 'football', live: false, minute: null, homeTeam: 'Barcelona', awayTeam: 'Atletico Madrid', homeIcon: '🔵', awayIcon: '🔴', homeScore: null, awayScore: null, time: 'Sun 16:15', odds: { home: 1.75, draw: 3.80, away: 4.80 } },
  { id: 'm8', leagueId: 'lla', sport: 'football', live: true, minute: 55, homeTeam: 'Sevilla', awayTeam: 'Valencia', homeIcon: '⚪', awayIcon: '⚫', homeScore: 1, awayScore: 2, time: null, odds: { home: 2.80, draw: 3.10, away: 2.60 } },
  // Bundesliga
  { id: 'm9', leagueId: 'bun', sport: 'football', live: false, minute: null, homeTeam: 'Dortmund', awayTeam: 'RB Leipzig', homeIcon: '🟡', awayIcon: '🔴', homeScore: null, awayScore: null, time: 'Sat 17:30', odds: { home: 2.00, draw: 3.40, away: 3.70 } },
  // Serie A
  { id: 'm10', leagueId: 'sa', sport: 'football', live: false, minute: null, homeTeam: 'Juventus', awayTeam: 'AC Milan', homeIcon: '⚫', awayIcon: '🔴', homeScore: null, awayScore: null, time: 'Sun 20:45', odds: { home: 2.20, draw: 3.25, away: 3.30 } },
  // Basketball
  { id: 'm11', leagueId: 'nba', sport: 'basketball', live: true, minute: null, homeTeam: 'Lakers', awayTeam: 'Warriors', homeIcon: '🟣', awayIcon: '🟡', homeScore: 87, awayScore: 91, time: 'Q3 4:22', odds: { home: 2.20, draw: null, away: 1.65 } },
  { id: 'm12', leagueId: 'nba', sport: 'basketball', live: false, minute: null, homeTeam: 'Celtics', awayTeam: 'Heat', homeIcon: '🟢', awayIcon: '🔴', homeScore: null, awayScore: null, time: 'Today 01:30', odds: { home: 1.55, draw: null, away: 2.50 } },
  // Tennis
  { id: 'm13', leagueId: 'atp', sport: 'tennis', live: true, minute: null, homeTeam: 'Djokovic N.', awayTeam: 'Alcaraz C.', homeIcon: '🎾', awayIcon: '🎾', homeScore: '6-3 4', awayScore: '2 4', time: 'Set 2', odds: { home: 1.70, draw: null, away: 2.15 } },
  // Cricket
  { id: 'm14', leagueId: 'ipl', sport: 'cricket', live: false, minute: null, homeTeam: 'Mumbai Indians', awayTeam: 'Chennai Super Kings', homeIcon: '🔵', awayIcon: '🟡', homeScore: null, awayScore: null, time: 'Today 19:30', odds: { home: 1.95, draw: null, away: 1.90 } },
];

// ── Odds helpers ───────────────────────────────────────
function toFractional(dec) {
  const n = dec - 1;
  const gcd = (a, b) => b < 0.01 ? a : gcd(b, a % b);
  const denom = 100;
  const num = Math.round(n * denom);
  const d = gcd(num, denom);
  return `${num / d}/${denom / d}`;
}

function displayOdds(dec) {
  if (!dec) return '—';
  return oddsFormat === 'decimal' ? dec.toFixed(2) : toFractional(dec);
}

// ── Render ─────────────────────────────────────────────
function renderLeagues() {
  const list = document.getElementById('league-list');
  const relevant = leagues.filter(l => l.sport === activeSport);
  list.innerHTML = relevant.map(l => `
    <li class="${activeLeague === l.id ? 'active' : ''}" data-league="${l.id}">
      <span class="league-flag">${l.flag}</span>${l.name}
    </li>`).join('');

  list.querySelectorAll('li').forEach(el => {
    el.addEventListener('click', () => {
      activeLeague = activeLeague === el.dataset.league ? null : el.dataset.league;
      renderLeagues();
      renderMatches();
    });
  });
}

function filterMatches() {
  return matches.filter(m => {
    if (m.sport !== activeSport) return false;
    if (activeLeague && m.leagueId !== activeLeague) return false;
    if (activeFilter === 'live' && !m.live) return false;
    if (activeFilter === 'upcoming' && m.live) return false;
    return true;
  });
}

function renderMatches() {
  const container = document.getElementById('matches-container');
  const filtered = filterMatches();

  if (!filtered.length) {
    container.innerHTML = '<div class="no-matches">No matches found for this selection.</div>';
    return;
  }

  // group by league
  const groups = {};
  filtered.forEach(m => {
    if (!groups[m.leagueId]) groups[m.leagueId] = [];
    groups[m.leagueId].push(m);
  });

  container.innerHTML = Object.entries(groups).map(([lid, ms]) => {
    const league = leagues.find(l => l.id === lid);
    return `
      <div class="league-group">
        <div class="league-group-header">
          <span class="league-group-flag">${league.flag}</span>
          ${league.name}
        </div>
        ${ms.map(matchCard).join('')}
      </div>`;
  }).join('');

  // attach odds button listeners
  container.querySelectorAll('.odds-btn').forEach(btn => {
    btn.addEventListener('click', () => handleOddsClick(btn));
  });

  // reapply selected state
  Object.keys(betSlip).forEach(key => {
    const btn = container.querySelector(`[data-key="${key}"]`);
    if (btn) btn.classList.add('selected');
  });
}

function matchCard(m) {
  const isBball = m.sport === 'basketball';
  const isBaseline = m.sport !== 'football'; // no draw

  const homeOddsDisplay = displayOdds(m.odds.home);
  const drawOddsDisplay = m.odds.draw ? displayOdds(m.odds.draw) : null;
  const awayOddsDisplay = displayOdds(m.odds.away);

  const homeKey = `${m.id}-home`;
  const drawKey = `${m.id}-draw`;
  const awayKey = `${m.id}-away`;

  const scoreBlock = m.live
    ? `<div class="live-score">${m.homeScore}–${m.awayScore}</div>`
    : `<div style="font-size:13px;color:var(--muted);min-width:50px;text-align:center">${m.time}</div>`;

  const drawBtn = drawOddsDisplay ? `
    <button class="odds-btn" data-key="${drawKey}" data-match="${m.id}" data-outcome="draw" data-odds="${m.odds.draw}" data-label="Draw">
      <span class="odds-label">Draw</span>
      <span class="odds-value">${drawOddsDisplay}</span>
    </button>` : '';

  return `
    <div class="match-card">
      <div class="match-info">
        <div class="match-teams">
          <div class="team"><span class="team-icon">${m.homeIcon}</span>${m.homeTeam}</div>
          <div class="team"><span class="team-icon">${m.awayIcon}</span>${m.awayTeam}</div>
        </div>
        <div class="match-meta">
          ${m.live ? `<span class="live-badge">LIVE</span><span class="live-minute">${m.minute ? m.minute + "'" : m.time}</span>` : `<span>${m.time}</span>`}
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        ${scoreBlock}
        <div class="odds-row">
          <button class="odds-btn" data-key="${homeKey}" data-match="${m.id}" data-outcome="home" data-odds="${m.odds.home}" data-label="${m.homeTeam}">
            <span class="odds-label">${isBaseline ? m.homeTeam.split(' ').pop() : '1'}</span>
            <span class="odds-value">${homeOddsDisplay}</span>
          </button>
          ${drawBtn}
          <button class="odds-btn" data-key="${awayKey}" data-match="${m.id}" data-outcome="away" data-odds="${m.odds.away}" data-label="${m.awayTeam}">
            <span class="odds-label">${isBaseline ? m.awayTeam.split(' ').pop() : '2'}</span>
            <span class="odds-value">${awayOddsDisplay}</span>
          </button>
        </div>
      </div>
    </div>`;
}

// ── Bet Slip ───────────────────────────────────────────
function handleOddsClick(btn) {
  const key = btn.dataset.key;
  const matchId = btn.dataset.match;
  const outcome = btn.dataset.outcome;
  const odds = parseFloat(btn.dataset.odds);
  const label = btn.dataset.label;
  const match = matches.find(m => m.id === matchId);

  if (betSlip[key]) {
    delete betSlip[key];
    btn.classList.remove('selected');
  } else {
    // remove other picks for same match
    Object.keys(betSlip).forEach(k => {
      if (betSlip[k].matchId === matchId) {
        delete betSlip[k];
        document.querySelectorAll(`[data-match="${matchId}"]`).forEach(b => b.classList.remove('selected'));
      }
    });
    betSlip[key] = { matchId, outcome, label, odds, stake: '' };
    btn.classList.add('selected');
  }

  renderSlip();
}

function renderSlip() {
  const keys = Object.keys(betSlip);
  const slipItems = document.getElementById('slip-items');
  const slipFooter = document.getElementById('slip-footer');
  const slipCount = document.getElementById('slip-count');

  slipCount.textContent = keys.length;

  if (!keys.length) {
    slipItems.innerHTML = '<p class="slip-empty">Select odds to add bets</p>';
    slipFooter.style.display = 'none';
    return;
  }

  slipFooter.style.display = 'flex';

  slipItems.innerHTML = keys.map(key => {
    const bet = betSlip[key];
    const match = matches.find(m => m.id === bet.matchId);
    const ret = bet.stake ? (parseFloat(bet.stake) * bet.odds).toFixed(2) : '0.00';
    const oddsDisplay = displayOdds(bet.odds);
    return `
      <div class="slip-item">
        <button class="slip-remove" data-key="${key}">×</button>
        <div class="slip-item-match">${match.homeTeam} vs ${match.awayTeam}</div>
        <div class="slip-item-pick">${bet.label} <span>@ ${oddsDisplay}</span></div>
        <div class="slip-stake-row">
          <span class="stake-label">Stake $</span>
          <input class="stake-input" type="number" min="0" step="0.5" placeholder="0.00"
            value="${bet.stake}" data-key="${key}" />
        </div>
        <div class="slip-return">Returns: <span>$${ret}</span></div>
      </div>`;
  }).join('');

  // events
  slipItems.querySelectorAll('.slip-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      delete betSlip[key];
      document.querySelectorAll(`[data-key="${key}"]`).forEach(b => b.classList.remove('selected'));
      renderSlip();
    });
  });

  slipItems.querySelectorAll('.stake-input').forEach(input => {
    input.addEventListener('input', () => {
      betSlip[input.dataset.key].stake = input.value;
      updateTotals();
      // update return in same item
      const item = input.closest('.slip-item');
      const bet = betSlip[input.dataset.key];
      const ret = input.value ? (parseFloat(input.value) * bet.odds).toFixed(2) : '0.00';
      item.querySelector('.slip-return span').textContent = `$${ret}`;
    });
  });

  updateTotals();
}

function updateTotals() {
  let totalStake = 0, totalReturn = 0;
  Object.values(betSlip).forEach(b => {
    const s = parseFloat(b.stake) || 0;
    totalStake += s;
    totalReturn += s * b.odds;
  });
  document.getElementById('total-stake').textContent = `$${totalStake.toFixed(2)}`;
  document.getElementById('total-return').textContent = `$${totalReturn.toFixed(2)}`;
}

function placeBet() {
  const keys = Object.keys(betSlip);
  if (!keys.length) return showToast('Add bets to your slip first!');

  const totalStake = Object.values(betSlip).reduce((s, b) => s + (parseFloat(b.stake) || 0), 0);
  if (!totalStake) return showToast('Enter a stake amount to continue');
  if (totalStake > balance) return showToast('Insufficient balance!');

  balance -= totalStake;
  updateBalance();

  // clear slip
  Object.keys(betSlip).forEach(k => delete betSlip[k]);
  document.querySelectorAll('.odds-btn.selected').forEach(b => b.classList.remove('selected'));
  renderSlip();
  showToast(`✓ Bet placed! $${totalStake.toFixed(2)} deducted`);
}

function clearSlip() {
  Object.keys(betSlip).forEach(k => delete betSlip[k]);
  document.querySelectorAll('.odds-btn.selected').forEach(b => b.classList.remove('selected'));
  renderSlip();
}

function updateBalance() {
  document.getElementById('balance').textContent =
    '$' + balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ── Ticker ─────────────────────────────────────────────
function renderTicker() {
  const live = matches.filter(m => m.live && typeof m.homeScore === 'number');
  if (!live.length) return;
  const items = [...live, ...live].map(m => `
    <span class="ticker-item">
      ${m.homeTeam} <span class="ticker-score">${m.homeScore}–${m.awayScore}</span> ${m.awayTeam}
      <span class="ticker-min">${m.minute ? m.minute + "'" : m.time}</span>
    </span>`).join('');
  document.getElementById('ticker-track').innerHTML = items;
}

// ── Toast ──────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── Event listeners ────────────────────────────────────
document.querySelectorAll('.sport-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    activeSport = btn.dataset.sport;
    activeLeague = null;
    document.querySelectorAll('.sport-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const titles = { football: 'Football Matches', basketball: 'Basketball', tennis: 'Tennis', cricket: 'Cricket' };
    document.getElementById('section-title').textContent =
      (activeFilter === 'live' ? 'Live ' : activeFilter === 'upcoming' ? 'Upcoming ' : 'All ') + titles[activeSport];
    renderLeagues();
    renderMatches();
  });
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    activeFilter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMatches();
  });
});

document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    oddsFormat = btn.dataset.format;
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMatches();
    renderSlip();
  });
});

document.getElementById('place-bet-btn').addEventListener('click', placeBet);
document.getElementById('clear-btn').addEventListener('click', clearSlip);

// ── Init ───────────────────────────────────────────────
renderTicker();
renderLeagues();
renderMatches();
updateBalance();
