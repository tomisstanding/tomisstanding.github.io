'use strict';
console.log('JS connected');

// config new shine object for name in header section
var config = new shinejs.Config({
  numSteps: 8,
  opacity: 5,
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

$(() => {
  // set landing page to height of window
  const windowHeight = $(window).height();
  $('.land').css('height', windowHeight - 50);
  $('#scroll-div').css('padding-top', windowHeight - 140);

  // after name and title come in, header will slide in from top
  const header = $('.header');
  setTimeout(() => {
    header[0].classList.add('slideIn');
  }, 1000);

  // when header is clicked, page will scroll back to the top
  header.click(() => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  const github = $('#github-logo');
  const email = $('#email-logo');
  const linkedIn = $('#linked-in');
  const scroll = $('#scroll-div');
  const scrollIcon = $('#scroll');

  setTimeout(() => {
    email.addClass('animated2 fadeInUp');
  }, 1200);

});
