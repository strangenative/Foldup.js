Foldup.js lets you create a "fold up" effect for text on your website, so that users resize their browsers, the text folds up in a 3D effect.

To see it in action and as an example, check out:
http://www.strangenative.com/foldup

TO INSTALL:
1. Add the starter style sheet included in this repository
2. Add Jquery
3. Add Lettering.js (http://www.letteringjs.com)
4. Add foldup.js
5. Add this code:
	<script>
	  	$(document).ready(function() {
	    	$(".foldup").lettering('words').children('span').lettering();
	  	});
	</script>
6. Add a class of "foldup" to any text element you'd like to 
You'll have to use include JQuery, Lettering.js, and then foldup.js in order to put it to use.
7. Be sure to add them all in that order.