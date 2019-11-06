
	//requires: barba.umd.js
	//requires: jquery.stackpage.js

	(function($) {
		$(document).ready(function(){
			barba.init({
			  prefetchIgnore: false,
			});
			$(".page").stackpage({
				parent: '.wrap'
			});
		});
 	})( jQuery );