$.fn.foldup = function(settings){
  // Reformat default settings as an object
  // Users can override some or all if they want
  settings = $.extend({
    containerWidth: 0.8,
    startColor: [255, 165, 0],
    lowlightColor: [172, 111, 0],
    highlightColor: [255, 194, 83],
    minShadow: 0.3,
    maxShadow: 0.4
  }, settings || {});

  //::::::::::::::::::::::::::::::::::::::::NOT CUSTOM VARIABLES
  var screenWidth = screen.width * .9;
  var flatWidth = screenWidth * settings.containerWidth;
  var evenDiff = [0, 0, 0];
  var oddDiff = [0, 0, 0];
  var evenColor = [0, 0, 0];
  var oddColor = [0, 0, 0];
  for(var i in settings.startColor){
  	evenDiff[i] = settings.highlightColor[i] - settings.startColor[i];
  	oddDiff[i] = settings.lowlightColor[i] - settings.startColor[i];
  	}

  this.each(function(){
    // TODO: Check to see if lettering has already been applied and fail gracefully if it's been done

    // Apply lettering effect here to make sure it gets done
    $(this).lettering('words').children('span').lettering();

    // Set letter box width
    // TODO: Is it okay to re-calculate this on resize?
    var letterBoxWidth = $(this).find('.word1 .char1').width();

    var currWidth = $(window).width(); // Determine the squish percentage
  	var currContainerWidth = currWidth * settings.containerWidth;

  	var flatPercent = currContainerWidth / flatWidth;
  	if (flatPercent > 1){ flatPercent = 1; }

  	var squishPercent = 1 - flatPercent;
  	if (squishPercent < 0){squishPercent = 0;}

  	var skew = squishPercent * 45;		//Set the rotation & skew
  	if ( skew < 0 ){ skew = 0; }

  	var margin = (squishPercent * ( letterBoxWidth / 2 ));	//Set the margin compression
  	margin = Math.ceil( margin );

  	var translateY = Math.sin(skew * (Math.PI / 180)) * (letterBoxWidth / 1.75);	//Set the Yposition offset

    var startColor = settings.startColor;
  	for(var i in evenColor){		//Set the color change
  		evenColor[i] = Math.round(startColor[i] + (evenDiff[i] * squishPercent));
  		oddColor[i] = Math.round(startColor[i] + (oddDiff[i] * squishPercent));
  		};

	  // Set shadow opacity based on squish percent
	  var shadowOpacity = 1 - squishPercent * 3;
  	if(shadowOpacity < settings.minShadow) {
  	  shadowOpacity = settings.minShadow;
  	}
  	else if(shadowOpacity > settings.maxShadow) {
  	  shadowOpacity = settings.maxShadow
  	};

  	var shadowSize = squishPercent * 20;

    // Transform letters
    $(this).children().children().css({
      'margin' : '0 ' + -margin + ' ',
		  '-webkit-transform': 'scaleX( ' + flatPercent + ' ) skewY( ' + skew + 'deg)',
		  '-moz-transform': 'scaleX( ' + flatPercent + ' ) skewY( ' + skew + 'deg)',
		  '-o-transform': 'scaleX( ' + flatPercent + ' ) skew(0deg, ' + skew + 'deg)',
		  '-ms-transform': 'scaleX( ' + flatPercent + ' ) skew(0deg, ' + skew + 'deg)',
		  'top': '-' + translateY + 'px',
		  'background-color': 'rgba(' + evenColor[0] + ', ' + evenColor[1] + ', ' + evenColor[2] + ', 1)'
      });
    // Transform every other letter
    $(this).children().children(':odd').css({
		  '-webkit-transform': 'scaleX( ' + flatPercent + ' ) skewY( -' + skew + 'deg)',
  		'-moz-transform': 'scaleX( ' + flatPercent + ' ) skewY( -' + skew + 'deg)',
  		'-o-transform': 'scaleX( ' + flatPercent + ' ) skew(0deg, -' + skew + 'deg)',
  		'-ms-transform': 'scaleX( ' + flatPercent + ' ) skew(0deg, ' + skew + 'deg)',
  		'background-color': 'rgba(' + oddColor[0] + ', ' + oddColor[1] + ', ' + oddColor[2] + ', 1)'
  		});

    $(this).children().css({
  		'background': 'rgba(0, 0, 0, ' + shadowOpacity + ')',
  		'box-shadow': 'inset 0px -' + shadowSize + 'px ' + shadowSize + 'px rgba(255, 165, 0, 1)'
  		});
  });
};
