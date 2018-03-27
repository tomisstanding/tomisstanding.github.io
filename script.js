'use strict';

  //loader
 $(function(){
    $('#loader').imgPreload();
  })

 $(document).ready(function() {
    $('#loader').fadeOut();
 });

 ;(function(){
  function id(v){ return document.getElementById(v); }
  function loadbar() {
    var ovrl = id("overlay"),
        prog = id("progress"),
        stat = id("progstat"),
        img = document.images,
        c = 0,
        tot = img.length;
    if(tot == 0) return doneLoading();

    function imgLoaded(){
      c += 1;
      var perc = ((100/tot*c) << 0) +"%";
      prog.style.width = perc;
      stat.innerHTML = "Loading "+ perc;
      if(c===tot) return doneLoading();
    }
    function doneLoading(){
      ovrl.style.opacity = 0;
      setTimeout(function(){
        ovrl.style.display = "none";
      }, 1200);
    }
    for(var i=0; i<tot; i++) {
      var tImg     = new Image();
      tImg.onload  = imgLoaded;
      tImg.onerror = imgLoaded;
      tImg.src     = img[i].src;
    }
  }
  document.addEventListener('DOMContentLoaded', loadbar, false);
}());

  // config new shine object for name in header section
  var config = new shinejs.Config({
    numSteps: 8,
    opacity: 5,
    shadowRGB: new shinejs.Color(220, 222, 226)
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

    // after name and title come in, header will slide in from top
    let header = $('.fsd');
    setTimeout(() => {
      header.addClass('animated flip');
    }, 1000);

    const github = $('#github-logo');
    const email = $('#email-logo');
    const linkedIn = $('#linked-in');
    const scroll = $('#scroll-div');
    const arrow = $('#arrow');

    // Icons in header fade in one by one
    setTimeout(() => {
      linkedIn.addClass('animated2 fadeInUp');
    }, 1500);
    setTimeout(() => {
      email.addClass('animated2 fadeInUp');
    }, 1700);
    setTimeout(() => {
      github.addClass('animated2 fadeInUp');
    }, 1900);
    setTimeout(() => {
      scroll.addClass('animated fadeInUpScroll');
    }, 2100);
    setTimeout(() => {
      arrow.addClass('animated infinite bounce')
    }, 3000);

  // add animations to icons on mouseenter
    email.on('mouseenter', function() {
      email.css({
        'opacity': '0.9',
        'transform': 'none'
      });
      email.removeClass('animated2 fadeInUp');
      email.addClass('animated tada')
    })
    email.on('mouseout', function() {
      email.removeClass('animated');
      email.removeClass('tada')
    })

    github.on('mouseenter', function() {
      github.css({
        'opacity': '0.9',
        'transform': 'none'
      });
      github.removeClass('animated2 fadeInUp');
      github.addClass('animated tada');
    })
    github.on('mouseout', function() {
      github.removeClass('animated');
      github.removeClass('tada')
    })

    linkedIn.on('mouseenter', function() {
      linkedIn.css({
        'opacity': '0.9',
        'transform': 'none'
      });
      linkedIn.removeClass('animated2 fadeInUp');
      linkedIn.addClass('animated tada')
    })
    linkedIn.on('mouseout', function() {
      linkedIn.removeClass('animated');
      linkedIn.removeClass('tada')
    })

    // Code help from ScrollMagic101 at https://ihatetomatoes.net
    // Init ScrollMagic
    const controller = new ScrollMagic.Controller();

    // build a new scence to fade out landing info
    const landingFadeOut =  new ScrollMagic.Scene({
      triggerElement: '.icons',
      triggerHook: 0.2
    })
    .setClassToggle('.land', 'fade-out')
    .addTo(controller);

    // build a new scene to fade in about me
    const aboutMeFade = new ScrollMagic.Scene({
      triggerElement: '.aboutme p',
      duration: '60%',
      triggerHook: 0.8
    })
    .setClassToggle('.aboutme', 'fade-in')
    .addTo(controller);

    // parallax effect
    $('.parallax').each(function() {
      const slideParallaxScence = new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 1,
        duration: '100%'
      })
      .setTween(TweenMax.from(this.children[1], 2, {y: '-50%', ease: Power0.easeNone}, 0))
      .addTo(controller);
    })

    // Upick intro will slide up since there is not parallax effect here
    $('.slide-up').each(function() {
      const fadeContentIn = new ScrollMagic.Scene({
        triggerElement: '#project3',
        triggerHook: 0.7
      })
      .setClassToggle(this, 'fade-in')
      .addTo(controller);
    })

    // loop from each project-info element and create a scene for each container
    $('.project-info').each(function() {
      const projectsFadeIn = new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 0.7
      })
      .setClassToggle(this, 'fade-in')
      .addTo(controller);
    });

  });
