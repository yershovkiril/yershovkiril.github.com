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

		$('.features .col-lg-4').on('click', function() {
			$(this).addClass("selected");
			var row = $('.features .col-lg-4');
			var sizebox = $('.features').css('width');
			row.each(function(index,element) {
				if (element.className.indexOf('selected') === -1) {
						element.style.display = 'none';
				} else {
					$(this).find('.resume-container').css('display', 'none');
				}
			});
			$(this).find('.main-content').css('opacity', '1').css('padding', '30px').css('display', 'block').addClass('fadeInLeft');
			$('.close-content').css('z-index', '10');
			$(this).css('width', sizebox);
		});
		$('.close-content').on('click', function(event) {
			$('.main-content').css('display', 'none');
			$(this).css('z-index', '0');
			var row = $('.features .col-lg-4');
			row.each(function(index,element) {
				if (element.className.indexOf('selected') === -1) {
						element.style.display = 'block';
				} else {
					$(this).find('.resume-container').css('display', 'block');
					$('.selected').css('width', 'none');
					$(this).removeClass('selected');

				}
			});

		})
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