// Short showers arrive at irregular intervals, with longer clear spells between them.
const rainLayer = document.querySelector('.pencil-rain');
const rain = document.createDocumentFragment();
for (let i = 0; i < 44; i++) {
  const stroke = document.createElement('span');
  stroke.className = 'rain-stroke';
  stroke.style.setProperty('--rain-x', `${(i * 61.8034) % 100}%`);
  stroke.style.setProperty('--rain-length', `${12 + i % 9}px`);
  stroke.style.setProperty('--rain-ink', `${.22 + (i % 4) * .06}`);
  stroke.style.setProperty('--rain-speed', `${2 + (i % 7) * .17}s`);
  stroke.style.setProperty('--rain-delay', `${-i * .37}s`);
  rain.append(stroke);
}
rainLayer.append(rain);
const weatherMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const randomWeatherDelay = (min, max) => (min + Math.random() * (max - min)) * 1000;
let weatherTimer = null;
let weatherRemaining = randomWeatherDelay(12, 25);
let weatherDeadline = 0;

function scheduleWeather() {
  if (document.hidden || weatherMotion.matches || weatherTimer !== null) return;
  weatherDeadline = performance.now() + weatherRemaining;
  weatherTimer = window.setTimeout(() => {
    weatherTimer = null;
    const isRaining = document.body.dataset.weather !== 'rain';
    document.body.dataset.weather = isRaining ? 'rain' : 'clear';
    weatherRemaining = isRaining ? randomWeatherDelay(14, 24) : randomWeatherDelay(30, 65);
    scheduleWeather();
  }, weatherRemaining);
}

function syncWeatherVisibility() {
  const paused = document.hidden || weatherMotion.matches;
  document.body.classList.toggle('weather-paused', paused);
  if (paused && weatherTimer !== null) {
    window.clearTimeout(weatherTimer);
    weatherTimer = null;
    weatherRemaining = Math.max(0, weatherDeadline - performance.now());
  }
  if (weatherMotion.matches) {
    document.body.dataset.weather = 'clear';
    weatherRemaining = randomWeatherDelay(12, 25);
  }
  if (!paused) scheduleWeather();
}
document.addEventListener('visibilitychange', syncWeatherVisibility);
weatherMotion.addEventListener('change', syncWeatherVisibility);
syncWeatherVisibility();

// A handful of graphite leaves makes an occasional gust visible without moving the scene.
const leafLayer = document.createElement('div');
leafLayer.className = 'falling-leaves';
const leafDrawings = [
  '<path d="M6 29C3 23 3 16 9 10C13 6 19 5 22 2C23 10 23 17 18 23C14 28 10 29 6 29Z"/><path class="leaf-veins" d="M3 33Q10 20 20 5M8 25L7 17M11 20L18 17M14 15L13 10M16 12L21 10"/>',
  '<path d="M7 28L3 22L6 20L3 15L8 15L8 9L12 11L16 4L18 9L23 6L22 14L25 16L20 20L21 23L14 26L7 28Z"/><path class="leaf-veins" d="M4 33Q12 20 19 10M9 25L6 20M12 21L20 18M15 16L11 12"/>'
];
for (let i = 0; i < 5; i++) {
  const leaf = document.createElement('span');
  leaf.className = 'falling-leaf';
  leaf.style.setProperty('--leaf-delay', `${i * .36}s`);
  leaf.style.setProperty('--leaf-size', `${17 + i % 3 * 3}px`);
  leaf.innerHTML = `<svg viewBox="0 0 28 36" focusable="false">${leafDrawings[i % 2]}</svg>`;
  leafLayer.append(leaf);
}
document.querySelector('.ambient-life').append(leafLayer);
let windTimer = null;
let windRemaining = randomWeatherDelay(8, 16);
let windDeadline = 0;
document.body.dataset.wind = 'calm';

function scheduleWind() {
  if (document.hidden || weatherMotion.matches || windTimer !== null) return;
  windDeadline = performance.now() + windRemaining;
  windTimer = window.setTimeout(() => {
    windTimer = null;
    const gust = document.body.dataset.wind !== 'gust';
    if (gust) [...leafLayer.children].forEach((leaf, i) => {
      leaf.style.setProperty('--leaf-x', `${-8 + i * 14 + Math.random() * 8}vw`);
      leaf.style.setProperty('--leaf-y', `${8 + Math.random() * 18}svh`);
      leaf.style.setProperty('--leaf-turn', `${-35 + Math.random() * 70}deg`);
    });
    document.body.dataset.wind = gust ? 'gust' : 'calm';
    windRemaining = gust ? 12000 : randomWeatherDelay(24, 50);
    scheduleWind();
  }, windRemaining);
}
function syncWindVisibility() {
  const paused = document.hidden || weatherMotion.matches;
  if (paused && windTimer !== null) {
    window.clearTimeout(windTimer);
    windTimer = null;
    windRemaining = Math.max(0, windDeadline - performance.now());
  }
  if (weatherMotion.matches) {
    document.body.dataset.wind = 'calm';
    windRemaining = randomWeatherDelay(8, 16);
  }
  if (!paused) scheduleWind();
}
document.addEventListener('visibilitychange', syncWindVisibility);
weatherMotion.addEventListener('change', syncWindVisibility);
syncWindVisibility();
