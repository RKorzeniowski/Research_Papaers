jQuery(document).ready(function($) {

	$( "#expand-transcript" ).click(function( event ) {
		event.preventDefault();
		event.stopPropagation();
		$('.transcript-data').toggleClass("expand");
	});

});