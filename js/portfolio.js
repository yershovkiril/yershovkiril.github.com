'use strict';

(function() {
	var text;
	var array;
	var textOnScreen = '';
	var clocktimer;
	var i = 0;

	function portfolio() {
		text = "I'm Kiril. Front-end developer from Dnepropetrovsk, Ukraine. While not coding, I love to play basketball and play guitar.";
		array = text.split('');
		clocktimer = window.setInterval(function() {
			if (array[i+1] === undefined) {
				clearInterval(clocktimer);
			}
			return typeText(); 
		}, 70);

		$('.features .col-lg-4').mouseenter(function(event) {
			$(this).find('.detail').animate({
				opacity: '1',
				'margin-top': '-3px'

			}, 200);
			$(event.target).find('.icon').css('color', 'rgba(255,255,255, 1)');
		}).mouseleave(function() {
			$(this).find('.detail').animate({
				opacity: '0',
				'margin-top': '-10px'

			}, 200);
			$(event.target).find('.icon').css('color', 'rgba(255,255,255,.5)');
		});

		$('.download').mouseenter(function(event){
			$(this).css('background-color', '#19A3D9');
			$(this).css('border', '1px solid #19A3D9');
			$(this).css('color', 'white');
			$(this).find('.load-logo').css('color', 'white');
		}).mouseleave(function(event){
			$(this).css('background-color', 'white');
			$(this).css('border', '1px solid #BBBBBB');
			$(this).css('color', '#BBBBBB');
			$(this).find('.load-logo').css('color', '#BBBBBB');
		});
	}

	function typeText() {
		textOnScreen = textOnScreen + array[i];
		i+=1;
		$('.else-text').text(textOnScreen);
		// array.forEach(function (element) {
		// 	$('.else-text').text(textOnScreen);
		// 	textOnScreen = textOnScreen + element;
			
		// })
	}

	window.portfolio = portfolio;
}())