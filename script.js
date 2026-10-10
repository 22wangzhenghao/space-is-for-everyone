const pages = [...document.querySelectorAll('.page')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const sideNav = document.getElementById('sideNav');
const menuToggle = document.getElementById('menuToggle');

const planetData = [
  { id: 'math', name: 'Orbitus', subject: 'Math', symbol: '∠', color: 'blue' },
  { id: 'science', name: 'Ignitia', subject: 'Science', symbol: '✦', color: 'orange' },
  { id: 'reading', name: 'Wordia', subject: 'Reading & Writing', symbol: 'Aa', color: 'lilac' },
  { id: 'design', name: 'Forma', subject: 'Art & Design', symbol: '✳', color: 'lime' },
  { id: 'engineering', name: 'Rovera', subject: 'Engineering & Tech', symbol: '⌘', color: 'red' },
  { id: 'history', name: 'Chronos', subject: 'History & Teamwork', symbol: '◎', color: 'yellow' }
];
const discoveryKey = 'spaceIsForEveryone.discoveredPlanets';
let discoveredPlanets = new Set();
try { discoveredPlanets = new Set(JSON.parse(localStorage.getItem(discoveryKey) || '[]')); } catch { discoveredPlanets = new Set(); }

function saveDiscovery() {
  localStorage.setItem(discoveryKey, JSON.stringify([...discoveredPlanets]));
}

function setupSolarHub() {
  const home = document.querySelector('.home-page');
  home.classList.add('solar-mode');
  const hub = document.createElement('div');
  hub.className = 'solar-hub';
  hub.innerHTML = `<div class="hub-heading"><div><p class="eyebrow">Mission map / 01</p><h1>Discover your<br /><span>solar system.</span></h1><p>Every planet holds a different way to reach space. Complete its mission to light it up and reveal the route to the next one.</p></div><div class="progress-panel"><div class="progress-top"><span>DISCOVERY PROGRESS</span><strong id="discoveryCount">0 / 6</strong></div><div class="progress-track"><span id="discoveryBar"></span></div><p id="discoveryMessage">Six worlds are waiting to be found.</p></div></div><div class="solar-map" aria-label="Solar system discovery map"><div class="solar-sun"><span>START</span><b>✦</b></div><div class="solar-orbit orbit-a"></div><div class="solar-orbit orbit-b"></div><div class="solar-orbit orbit-c"></div><div class="planet-nodes">${planetData.map((planet, index) => `<button class="planet-node planet-${planet.color}" data-planet="${planet.id}" style="--planet-index:${index}" aria-label="Discover ${planet.subject}, ${planet.name}"><span class="planet-glow"></span><b>${planet.symbol}</b><small>${planet.name}</small><em>${planet.subject}</em><i>undiscovered</i></button>`).join('')}</div></div><div class="hub-footer"><span id="hubNextText">Choose a dim planet to begin.</span><a class="primary-button hub-next" id="hubNext" href="#math">Begin with Math <span>↗</span></a><button class="certificate-link" id="certificateLink" type="button" hidden>View certificate <span>✦</span></button></div>`;
  home.prepend(hub);
  const starNames = ['Alnilam', 'Saiph', 'Mintaka', 'Bellatrix', 'Rigel', 'Betelgeuse'];
  const starSubjects = ['MATH', 'SCIENCE', 'READING', 'ART', 'ENGINEERING', 'HISTORY'];
  home.classList.add('constellation-mode');
  hub.classList.add('constellation-hub');
  hub.querySelector('.solar-map').classList.add('constellation-map');
  hub.querySelector('.solar-map').setAttribute('aria-label', 'Orion-inspired constellation discovery map');
  hub.querySelector('h1').innerHTML = 'Trace your<br /><span>constellation.</span>';
  hub.querySelector('h1').nextElementSibling.textContent = 'Every star holds a different way to reach space. Complete its mission to light it up and reveal the constellation one connection at a time.';
  hub.querySelector('.solar-sun span').textContent = 'ORION';
  hub.querySelectorAll('.solar-orbit').forEach(orbit => orbit.remove());
  hub.querySelectorAll('.planet-node').forEach((node, index) => { node.classList.add('star-node'); node.querySelector('small').textContent = starNames[index]; node.querySelector('em').textContent = starSubjects[index]; node.setAttribute('aria-label', `Discover ${planetData[index].subject}, star ${starNames[index]}`); });
  hub.querySelector('.solar-map').insertAdjacentHTML('afterbegin', '<svg class="constellation-lines" viewBox="0 0 820 470" aria-hidden="true"><path d="M245 72 L350 205 L410 205 L575 72 M350 205 L310 367 M410 205 L550 367" /><g class="constellation-sword"><circle cx="448" cy="266" r="4" /><circle cx="430" cy="305" r="3" /><circle cx="414" cy="337" r="2" /></g></svg>');
  hub.insertAdjacentHTML('beforeend', '<div class="pleiades-cluster" aria-label="Small Pleiades star cluster"><i class="pleiades-star p1"></i><i class="pleiades-star p2"></i><i class="pleiades-star p3"></i><i class="pleiades-star p4"></i><i class="pleiades-star p5"></i><i class="pleiades-star p6"></i><i class="pleiades-star p7"></i><span>PLEIADES / SIDE CLUSTER</span></div>');
  hub.querySelectorAll('.planet-node').forEach(node => node.addEventListener('click', () => { window.location.hash = node.dataset.planet; }));
  document.getElementById('certificateLink').addEventListener('click', () => openCertificate());
  document.body.insertAdjacentHTML('beforeend', `<div class="discovery-toast" id="discoveryToast" role="status" aria-live="polite"></div><div class="certificate-modal" id="certificateModal" hidden><div class="certificate-sheet"><button class="certificate-close" id="certificateClose" type="button" aria-label="Close certificate">×</button><p class="eyebrow">Space is for everyone / explorer record</p><div class="certificate-star">✦</div><h2>Space Explorer<br /><span>Certificate</span></h2><p>This certifies that</p><input id="certificateName" class="certificate-name" maxlength="24" placeholder="YOUR NAME" aria-label="Your name" /><p>discovered all six subject planets and completed the mission to see how school skills help us reach space.</p><div class="certificate-planets">${planetData.map(planet => `<span class="planet-${planet.color}">${planet.symbol}</span>`).join('')}</div><div class="certificate-sign">SPACE IS FOR EVERYONE <span>✦</span></div><button class="secondary-button" id="printCertificate" type="button">Print / save as PDF <span>↑</span></button></div></div>`);
  const certificateDescription = [...document.querySelectorAll('.certificate-sheet > p')].find(paragraph => paragraph.textContent.includes('discovered all six'));
  if (certificateDescription) certificateDescription.textContent = 'discovered all six constellation stars and completed the mission to see how school skills help us reach space.';
  document.getElementById('certificateClose').addEventListener('click', () => { document.getElementById('certificateModal').hidden = true; });
  document.getElementById('printCertificate').addEventListener('click', () => window.print());
  updateDiscoveryHub();
}

function updateDiscoveryHub() {
  const count = discoveredPlanets.size;
  const allFound = count === planetData.length;
  const countElement = document.getElementById('discoveryCount');
  if (!countElement) return;
  countElement.textContent = `${count} / ${planetData.length}`;
  document.getElementById('discoveryBar').style.width = `${(count / planetData.length) * 100}%`;
  document.getElementById('discoveryMessage').textContent = allFound ? 'Constellation complete. You found the connection.' : `${planetData.length - count} star${planetData.length - count === 1 ? '' : 's'} left to discover.`;
  document.querySelectorAll('.planet-node').forEach(node => {
    const isFound = discoveredPlanets.has(node.dataset.planet);
    node.classList.toggle('discovered', isFound);
    node.querySelector('i').textContent = isFound ? 'discovered' : 'undiscovered';
  });
  const nextPlanet = planetData.find(planet => !discoveredPlanets.has(planet.id));
  const nextLink = document.getElementById('hubNext');
  const nextText = document.getElementById('hubNextText');
  if (nextPlanet) { nextLink.href = `#${nextPlanet.id}`; nextLink.innerHTML = `Visit ${nextPlanet.subject} <span>↗</span>`; nextText.textContent = count ? 'Your next launch route is ready.' : 'Choose a dim planet to begin.'; }
  else { nextLink.hidden = true; nextText.textContent = 'You completed the whole constellation.'; }
  document.getElementById('certificateLink').hidden = !allFound;
}

function openCertificate() {
  if (discoveredPlanets.size !== planetData.length) return;
  document.getElementById('certificateModal').hidden = false;
}

function launchConfetti() {
  const colors = ['#b9d7ff', '#ffb36b', '#d8c9fa', '#cce79b', '#ff8f79', '#f3db79'];
  const burst = document.createElement('div');
  burst.className = 'confetti-burst';
  for (let i = 0; i < 42; i += 1) { const piece = document.createElement('i'); piece.style.setProperty('--confetti-color', colors[i % colors.length]); piece.style.setProperty('--confetti-x', `${(Math.random() * 100) - 50}px`); piece.style.setProperty('--confetti-y', `${-70 - Math.random() * 150}px`); piece.style.setProperty('--confetti-r', `${Math.random() * 360}deg`); burst.appendChild(piece); }
  document.body.appendChild(burst);
  window.setTimeout(() => burst.remove(), 1900);
}

function completePlanet(id) {
  if (discoveredPlanets.has(id)) return;
  discoveredPlanets.add(id);
  saveDiscovery();
  updateDiscoveryHub();
  const planet = planetData.find(item => item.id === id);
  const nextPlanet = planetData.find(item => !discoveredPlanets.has(item.id));
  const toast = document.getElementById('discoveryToast');
  toast.innerHTML = `<strong>${planet.name} discovered!</strong><span>${planet.subject} is now part of your mission map.</span>${nextPlanet ? `<a href="#${nextPlanet.id}">Continue to ${nextPlanet.subject} <b>↗</b></a>` : '<button id="toastCertificate" type="button">Open your certificate <b>✦</b></button>'}`;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 6500);
  if (nextPlanet) toast.querySelector('a').addEventListener('click', () => toast.classList.remove('show'));
  if (!nextPlanet) { launchConfetti(); window.setTimeout(openCertificate, 550); document.getElementById('toastCertificate').addEventListener('click', openCertificate); }
}

setupSolarHub();

function showPage(route) {
  const validRoute = pages.some(page => page.dataset.page === route) ? route : 'home';
  pages.forEach(page => { page.hidden = page.dataset.page !== validRoute; });
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.route === validRoute));
  sideNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  if (validRoute !== 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('hashchange', () => showPage(location.hash.slice(1)));
showPage(location.hash.slice(1) || 'home');

menuToggle.addEventListener('click', () => {
  const open = sideNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

// Math: plot three different trajectories and give the learner an immediate result.
const mathFeedback = document.getElementById('mathFeedback');
const mathVisual = document.querySelector('.math-visual');
const mathSpeedControl = document.createElement('label');
mathSpeedControl.className = 'range-control';
mathSpeedControl.htmlFor = 'mathSpeed';
mathSpeedControl.innerHTML = '<span>Launch speed <output id="mathSpeedOutput">72%</output></span><input id="mathSpeed" type="range" min="0" max="100" value="72" />';
mathFeedback.before(mathSpeedControl);
const mathSpeed = document.getElementById('mathSpeed');
function tryCompleteMath() {
  const angleLocked = document.querySelector('#mathChoices button.selected')?.dataset.angle === 'right';
  const speed = Number(mathSpeed.value);
  if (angleLocked && speed >= 60 && speed <= 82) completePlanet('math');
}
mathSpeed.addEventListener('input', () => {
  const value = Number(mathSpeed.value);
  document.getElementById('mathSpeedOutput').textContent = `${value}%`;
  document.querySelector('.math-ship').style.transform = `scale(${0.8 + value / 180})`;
  mathFeedback.textContent = value >= 60 && value <= 82 ? 'Nice speed. The spacecraft has enough energy to stay on course.' : value < 60 ? 'Too slow: the spacecraft will fall back toward Earth.' : 'Too fast: the spacecraft may escape its planned orbit.';
  tryCompleteMath();
});
document.querySelectorAll('#mathChoices button').forEach(button => button.addEventListener('click', () => {
  const angle = button.dataset.angle;
  document.querySelectorAll('#mathChoices button').forEach(item => item.classList.remove('selected'));
  button.classList.add('selected');
  document.getElementById('mathPath').className = `math-path ${angle}`;
  document.querySelector('.math-ship').classList.toggle('fly', angle === 'right');
  mathVisual.classList.remove('launching');
  void mathVisual.offsetWidth;
  mathVisual.classList.add('launching');
  mathFeedback.textContent = angle === 'right' ? 'Trajectory locked! 45° gives us a stable path to orbit.' : angle === 'low' ? 'That path dips back toward Earth. Try a bigger angle.' : 'That path shoots too far away. Try a gentler angle.';
  tryCompleteMath();
}));

// Science: simple propellant matching interaction.
const scienceFeedback = document.getElementById('scienceFeedback');
const mixControl = document.createElement('div');
mixControl.className = 'mix-control';
mixControl.innerHTML = '<label for="mixRatio">Mix ratio</label><input id="mixRatio" type="range" min="0" max="100" value="70" /><output id="mixOutput">70 / 30</output>';
scienceFeedback.before(mixControl);
const mixRatio = document.getElementById('mixRatio');
function updateScienceMix() {
  const ratio = Number(mixRatio.value);
  const isRight = document.querySelector('#fuelChoices button.selected')?.dataset.fuel === 'methane';
  const balanced = ratio >= 60 && ratio <= 80;
  document.getElementById('mixOutput').textContent = `${ratio} / ${100 - ratio}`;
  const isBurning = isRight && balanced;
  document.getElementById('rocketFlame').classList.toggle('burning', isBurning);
  document.querySelector('.fuel-visual').classList.toggle('igniting', isBurning);
  scienceFeedback.textContent = !isRight ? 'Not quite. Think: a fuel plus something that helps it burn.' : balanced ? 'Launch! The fuel pair and mix are balanced for a controlled burn.' : 'Good fuel pair. Adjust the mix until the burn is balanced.';
  if (isBurning) completePlanet('science');
}
mixRatio.addEventListener('input', updateScienceMix);
document.querySelectorAll('#fuelChoices button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('#fuelChoices button').forEach(item => item.classList.remove('selected'));
  button.classList.add('selected');
  updateScienceMix();
}));

// Reading: turn a filled-in dispatch into a small moment of accomplishment.
const readingFeedback = document.getElementById('readingFeedback');
const reportPaper = document.querySelector('.report-paper');
function animateFeedback(element) {
  element.classList.remove('message-pop');
  void element.offsetWidth;
  element.classList.add('message-pop');
}
const audienceChoices = document.createElement('div');
audienceChoices.className = 'audience-choices';
audienceChoices.innerHTML = '<span>Send to:</span><button data-audience="the crew">Crew</button><button data-audience="your class">Class</button><button data-audience="Earth">Earth</button>';
readingFeedback.before(audienceChoices);
let reportAudience = 'Earth';
audienceChoices.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
  audienceChoices.querySelectorAll('button').forEach(item => item.classList.remove('selected'));
  button.classList.add('selected');
  reportAudience = button.dataset.audience;
  readingFeedback.textContent = `Audience selected: ${reportAudience}. Now send the report.`;
  animateFeedback(readingFeedback);
}));
document.getElementById('sendReport').addEventListener('click', () => {
  const place = document.getElementById('reportPlace').value;
  const thing = document.getElementById('reportThing').value;
  const feeling = document.getElementById('reportFeeling').value;
  reportPaper.classList.remove('report-launch');
  void reportPaper.offsetWidth;
  reportPaper.classList.add('report-launch');
  readingFeedback.textContent = `Dispatch sent to ${reportAudience}: at ${place}, the crew saw a ${thing}. That sounds ${feeling}.`;
  animateFeedback(readingFeedback);
  completePlanet('reading');
});

// Design: change a mission patch with a few small, legible controls.
document.querySelectorAll('#swatches .swatch').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('#swatches .swatch').forEach(item => item.classList.remove('selected'));
  button.classList.add('selected');
  document.getElementById('patchPreview').className = `patch-preview ${button.dataset.color === 'navy' ? '' : button.dataset.color}`;
  const preview = document.getElementById('patchPreview');
  preview.classList.remove('patch-pulse');
  void preview.offsetWidth;
  preview.classList.add('patch-pulse');
  document.getElementById('designFeedback').textContent = 'Nice choice. Your patch is starting to tell a story.';
}));
document.querySelectorAll('#symbolButtons button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('#symbolButtons button').forEach(item => item.classList.remove('selected'));
  button.classList.add('selected');
  document.getElementById('patchSymbol').textContent = button.dataset.symbol;
  const preview = document.getElementById('patchPreview');
  preview.classList.remove('patch-pulse');
  void preview.offsetWidth;
  preview.classList.add('patch-pulse');
  document.getElementById('designFeedback').textContent = 'That signal gives your crew a symbol to rally around.';
}));
document.getElementById('mottoInput').addEventListener('input', event => {
  document.getElementById('patchMotto').textContent = event.target.value.toUpperCase() || 'YOUR MOTTO';
  const preview = document.getElementById('patchPreview');
  preview.classList.remove('patch-pulse');
  void preview.offsetWidth;
  preview.classList.add('patch-pulse');
  document.getElementById('designFeedback').textContent = event.target.value ? 'Every great mission needs a line people remember.' : 'Give your crew a motto to finish the patch.';
});
const patchFinish = document.createElement('button');
patchFinish.className = 'patch-finish';
patchFinish.type = 'button';
patchFinish.innerHTML = 'Add orbit ring <span>＋</span>';
document.getElementById('designFeedback').before(patchFinish);
patchFinish.addEventListener('click', () => {
  const preview = document.getElementById('patchPreview');
  const added = preview.classList.toggle('orbit-added');
  patchFinish.innerHTML = added ? 'Remove orbit ring <span>−</span>' : 'Add orbit ring <span>＋</span>';
  document.getElementById('designFeedback').textContent = added ? 'Your patch has an orbit. It is ready to travel.' : 'Try an orbit ring to show your mission in motion.';
  if (added) completePlanet('design');
});

// Engineering: a small, deterministic rover command puzzle.
const rover = { x: 0, y: 4, direction: 0 };
const headings = [
  { name: 'east', arrow: '→', dx: 1, dy: 0, rotation: 90 },
  { name: 'north', arrow: '↑', dx: 0, dy: -1, rotation: 0 },
  { name: 'west', arrow: '←', dx: -1, dy: 0, rotation: 270 },
  { name: 'south', arrow: '↓', dx: 0, dy: 1, rotation: 180 }
];
let commands = [];
const roverGrid = document.getElementById('roverGrid');
function drawRover() {
  roverGrid.innerHTML = '';
  const heading = headings[rover.direction];
  document.getElementById('roverDirection').textContent = `Facing ${heading.name} ${heading.arrow}`;
  for (let y = 0; y < 5; y += 1) for (let x = 0; x < 5; x += 1) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    if (x === 0 && y === 4) { cell.classList.add('start'); }
    if (x === 4 && y === 0) { cell.classList.add('sample'); cell.textContent = '◆'; cell.setAttribute('aria-label', 'Sample goal'); }
    if (x === rover.x && y === rover.y) { cell.classList.add('rover'); cell.innerHTML = '<span class="rover-marker" aria-hidden="true">▲</span>'; cell.style.setProperty('--rover-rotation', heading.rotation); cell.setAttribute('aria-label', `${x === 0 && y === 4 ? 'Rover start' : 'Rover'}, facing ${heading.name}`); }
    roverGrid.appendChild(cell);
  }
}
function renderCommands() {
  const queue = document.getElementById('commandQueue');
  document.getElementById('commandCount').textContent = `${commands.length} / 9`;
  queue.innerHTML = commands.length ? commands.map(command => `<span>${command}</span>`).join('') : '<em>empty</em>';
}
document.querySelectorAll('#roverControls button').forEach(button => button.addEventListener('click', () => {
  if (commands.length < 9) commands.push(button.dataset.command);
  renderCommands();
}));
let roverRunning = false;
const clearCommands = document.getElementById('clearCommands');
const runRover = document.getElementById('runRover');
clearCommands.addEventListener('click', () => { if (!roverRunning) { commands = []; renderCommands(); } });
runRover.addEventListener('click', () => {
  if (roverRunning) return;
  roverRunning = true;
  runRover.disabled = true;
  clearCommands.disabled = true;
  rover.x = 0; rover.y = 4; rover.direction = 0; drawRover();
  const queuedCommands = [...commands];
  const commandTiles = [...document.querySelectorAll('#commandQueue span')];
  let step = 0;
  document.getElementById('engineeringFeedback').textContent = 'Running code — watch each command execute.';
  function executeNext() {
    if (step >= queuedCommands.length) {
      roverRunning = false;
      runRover.disabled = false;
      clearCommands.disabled = false;
      document.getElementById('engineeringFeedback').textContent = rover.x === 4 && rover.y === 0 ? 'Sample collected! Your code gave the rover a route.' : 'The rover is safe, but it missed the sample. Change the sequence and test again.';
      if (rover.x === 4 && rover.y === 0) completePlanet('engineering');
      return;
    }
    commandTiles.forEach(tile => tile.classList.remove('command-active'));
    commandTiles[step]?.classList.add('command-active');
    const command = queuedCommands[step];
    if (command === '↺') rover.direction = (rover.direction + 1) % 4;
    else if (command === '↻') rover.direction = (rover.direction + 3) % 4;
    else { const heading = headings[rover.direction]; rover.x = Math.max(0, Math.min(4, rover.x + heading.dx)); rover.y = Math.max(0, Math.min(4, rover.y + heading.dy)); }
    drawRover();
    step += 1;
    window.setTimeout(executeNext, 280);
  }
  executeNext();
});
drawRover();

// History: reveal a different teamwork role in the story.
const teamStories = {
  dream: ['?', 'Dreamers start the mission.', 'Someone has to ask, “What if we could?” That question gives a team a direction.'],
  build: ['✚', 'Builders make the answer real.', 'Engineers, scientists, and technicians test the idea until it can survive the real world.'],
  share: ['↗', 'Communicators make it belong to everyone.', 'Writers, artists, teachers, and storytellers help the whole world understand what happened.']
};
document.querySelectorAll('.team-stop').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.team-stop').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  button.classList.remove('team-pop');
  void button.offsetWidth;
  button.classList.add('team-pop');
  const [icon, title, text] = teamStories[button.dataset.team];
  const teamStory = document.getElementById('teamStory');
  teamStory.innerHTML = `<span class="story-icon">${icon}</span><div><strong>${title}</strong><p>${text}</p></div>`;
  teamStory.classList.remove('story-arrive');
  void teamStory.offsetWidth;
  teamStory.classList.add('story-arrive');
  document.getElementById('historyFeedback').textContent = button.dataset.team === 'share' ? 'You are part of the mission too: pass the story forward.' : 'Keep going — every role moves the mission forward.';
}));

const historyFeedback = document.getElementById('historyFeedback');
const rolePicker = document.createElement('div');
rolePicker.className = 'role-picker';
rolePicker.innerHTML = '<span>Build a crew:</span><button data-role="pilot">Pilot</button><button data-role="scientist">Scientist</button><button data-role="builder">Builder</button><button data-role="storyteller">Storyteller</button>';
historyFeedback.before(rolePicker);
const selectedRoles = new Set();
rolePicker.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
  if (selectedRoles.has(button.dataset.role)) selectedRoles.delete(button.dataset.role);
  else selectedRoles.add(button.dataset.role);
  button.classList.toggle('selected', selectedRoles.has(button.dataset.role));
  historyFeedback.textContent = selectedRoles.size ? `${selectedRoles.size} role${selectedRoles.size === 1 ? '' : 's'} on the crew. Different skills make a mission stronger.` : 'Choose a few roles to build a mission team.';
  if (selectedRoles.size >= 3) completePlanet('history');
}));
