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
