// Clear on every fresh visit. Weather is a visitor-selected atmosphere, not a forecast.
const rainLayer = document.querySelector('.pencil-rain');
const weatherButtons = [...document.querySelectorAll('[data-weather-choice]')];
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
weatherButtons.forEach(button => button.addEventListener('click', () => {
  const weather = button.dataset.weatherChoice;
  document.body.dataset.weather = weather;
  weatherButtons.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
}));
function syncWeatherVisibility() {
  document.body.classList.toggle('weather-paused', document.hidden);
}
document.addEventListener('visibilitychange', syncWeatherVisibility);
syncWeatherVisibility();
