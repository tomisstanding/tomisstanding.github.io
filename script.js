    var config = new shinejs.Config({
      numSteps: 8,
      opacity: 1,
      shadowRGB: new shinejs.Color(98, 98, 98)
    });

    var shine = new shinejs.Shine(document.getElementById('thomas'), config);

    function handleMouseMove(event) {
      shine.light.position.x = event.clientX;
      shine.light.position.y = event.clientY;
      shine.draw();
    }

    window.addEventListener('mousemove', handleMouseMove, false);
