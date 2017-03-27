'use strict';
console.log('JS connected');

// config new shine object for name in header section
var config = new shinejs.Config({
  numSteps: 8,
  opacity: 1,
  shadowRGB: new shinejs.Color(225, 229, 237)
});

var shine = new shinejs.Shine(document.getElementById('headline'), config);

function handleMouseMove(event) {
  shine.light.position.x = event.clientX;
  shine.light.position.y = event.clientY;
  shine.draw();
}

window.addEventListener('mousemove', handleMouseMove, false);
// end shine object
