//Some important variables for you to set
containerWidth = .8; 										//What fraction of the browser window is the text's container?
var startColor = [255, 165, 0];
var lowlightColor = [172, 111, 0];
var highlightColor = [255, 194, 83];
minShadow = .3; 						//Set at 0 if you want no shadow
maxShadow = .4;

//Don't touch anything below this
screenWidth = screen.width * .9;

flatWidth = screenWidth*containerWidth;
var evenDiff = [0, 0, 0];
var oddDiff = [0, 0, 0];
var evenColor = [0, 0, 0];
var oddColor = [0, 0, 0];
for(var i in startColor){
	evenDiff[i] = highlightColor[i] - startColor[i];
	oddDiff[i] = lowlightColor[i] - startColor[i];
	}
$(document).ready(function() {
	letterBoxWidth = $('.word1 .char1').width();
	foldup();
	});
$(window).resize(function(){
	foldup();
	});

function foldup(){
	currWidth = $(window).width();		//Determine the squish percentage
	currContainerWidth = currWidth*containerWidth;
	flatPercent = currContainerWidth/flatWidth;
	squishPercent = 1 - flatPercent;
	if (squishPercent < 0){squishPercent = 0;}
	
	skew = squishPercent * 45;		//Set the rotation & skew
	if ( skew < 0 ){ skew = 0; }
	
	margin = (squishPercent * ( letterBoxWidth / 2 ));	//Set the margin compression
	margin = Math.ceil( margin );
	
	translateY = Math.sin(skew * (Math.PI / 180)) * (letterBoxWidth / 1.75);	//Set the Yposition offset
	
	for(var i in evenColor){		//Set the color change
		evenColor[i] = Math.round(startColor[i] + (evenDiff[i] * squishPercent));
		oddColor[i] = Math.round(startColor[i] + (oddDiff[i] * squishPercent));
		};
	
	$('.foldup').children().children().css({	//Transform the letter
		'margin' : '0 ' + -margin + ' ', 
		'-webkit-transform': 'scaleX( ' + flatPercent + ' ) skewY( ' + skew + 'deg)',
		'-moz-transform': 'scaleX( ' + flatPercent + ' ) skewY( ' + skew + 'deg)',
		'-o-transform': 'scaleX( ' + flatPercent + ' ) skew(0deg, ' + skew + 'deg)',
		'top': '-' + translateY + 'px',
		'background-color': 'rgba(' + evenColor[0] + ', ' + evenColor[1] + ', ' + evenColor[2] + ', 1)'
		//, 'box-shadow': 'inset 0 1px 0 rgba(255, 255, 255,' + squishPercent + '), inset 0 -1px 0 rgba(0, 0, 0,' + squishPercent + ')'
		});
	$('.foldup').children().children(':odd').css({
		'-webkit-transform': 'scaleX( ' + flatPercent + ' ) skewY( -' + skew + 'deg)',
		'-moz-transform': 'scaleX( ' + flatPercent + ' ) skewY( -' + skew + 'deg)',
		'-o-transform': 'scaleX( ' + flatPercent + ' ) skew(0deg, -' + skew + 'deg)',
		'background-color': 'rgba(' + oddColor[0] + ', ' + oddColor[1] + ', ' + oddColor[2] + ', 1)'
		});
	
	shadowOpacity = 1 - squishPercent * 3;		//All the dropshadow stuff
	if(shadowOpacity < minShadow){shadowOpacity = minShadow}
		else if(shadowOpacity > maxShadow){shadowOpacity = maxShadow};
	shadowSize = squishPercent * 20;
	$('.foldup').children().css({
		'background': 'rgba(0, 0, 0, ' + shadowOpacity + ')',
		'box-shadow': 'inset 0px -' + shadowSize + 'px ' + shadowSize + 'px rgba(255, 165, 0, 1)'
		});
    
};