'use strict';

var mapDownload = false;
(function() {
	var text;
	var array;
	var textOnScreen = '';
	var clocktimer;
	var i = 0;
	var clickClass;
	var keyupTimeout;

	function portfolio() {
		$(window).on('load', function() {
			var $preloader = $('.preloader'),
				$spinner = $preloader.find('.spinner');
			$spinner.fadeOut();
			$preloader.delay(150).fadeOut('fast');
		});

		validateForm();
		text = "I'm Kiril. Front-end developer from Dnepropetrovsk, Ukraine. While not coding, I love to play basketball and play guitar.";
		array = text.split('');

		//auto type text
		clocktimer = window.setInterval(function() {
			if (array[i + 1] === undefined) {
				clearInterval(clocktimer);
			}
			return typeText();
		}, 70);

		// slider move
		$(function() {
			$('.carousel').carousel({
				interval: 3000
			});
		});
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

		//hover effect for button 
		$('.download').mouseenter(function(event) {
			$(this).css('background-color', '#19A3D9');
			$(this).css('border', '1px solid #19A3D9');
			$(this).css('color', 'white');
			$(this).find('.load-logo').css('color', 'white');
		}).mouseleave(function(event) {
			$(this).css('background-color', 'white');
			$(this).css('border', '1px solid #BBBBBB');
			$(this).css('color', '#BBBBBB');
			$(this).find('.load-logo').css('color', '#BBBBBB');
		});

		$('.features .col-lg-4').on('click', function() {
			$(this).addClass("selected");
			var row = $('.features .col-lg-4');
			var sizebox = $('.features').css('width');
			if ($(this).hasClass('resume')) {
				$(this).find('.main-content').css('opacity', '1').css('padding', '30px').css('display', 'block').addClass('animated fadeInLeft');
				clickClass = '.resume';
			} else if ($(this).hasClass('portfolio')) {
				$(this).find('.main-content').css('opacity', '1').css('padding', '30px').css('display', 'block').addClass('animated bounceIn');
				clickClass = '.portfolio';
			} else {
				$(this).find('.main-content').css('opacity', '1').css('padding', '30px').css('display', 'block').addClass('animated fadeInRight');
				clickClass = '.contact';
			}
			row.each(function(index, element) {
				if (element.className.indexOf('selected') === -1) {
					element.style.display = 'none';
				} else {
					$(this).find(clickClass + '-container').css('display', 'none');
				}
			});
			$('.close-content').css('z-index', '10');
			$(this).css('width', sizebox);
			$(this).find('.main-content').css('height', "100%");
		});

		//close 
		$('.close-content').on('click', function(event) {
			$('.main-content').css('display', 'none');
			$(this).css('z-index', '0');
			var row = $('.features .col-lg-4');
			row.each(function(index, element) {
				if (element.className.indexOf('selected') === -1) {
					element.style.display = 'block';
				} else {
					$(this).find(clickClass + '-container').css('display', 'block');
					$('.selected').css('width', 'none');
					$(this).removeClass('selected');

				}
			});
			mapDownload = false;
		});
		//choose category in portfolio
		$('.switch-category li').each(function(index, element) {
			element.addEventListener('click', function(event) {
				$('.switch-category .active').removeClass('active');
				element.className = 'active';
				if (index === 1) {
					if ($('.javascript-task').css('display') !== 'block') {
						$('.javascript-task').css('display', 'block').addClass('animated zoomIn');
						$('.page-proofs').css('display', 'none');
					} else {
						$('.page-proofs').css('display', 'none');
					}

				} else if (index === 2) {
					if ($('.page-proofs').css('display') !== 'block') {
						$('.javascript-task').css('display', 'none');
						$('.page-proofs').css('display', 'block').addClass('animated zoomIn');
					} else {
						$('.javascript-task').css('display', 'none');
					}

				} else {
					$('.javascript-task').css('display', 'block');
					$('.page-proofs').css('display', 'block');
				}
			});
		});
		//hover effect for task
		$('.portfolio .main-content a').mouseenter(function(event) {
			$(this).find('h1').css('opacity', '1');
			$(this).find('h4').css('opacity', '1').addClass('animated bounceInLeft');
			$(this).next().css('margin-left', '0').addClass('animated flipInX');
		}).mouseleave(function(event) {
			$(this).find('h1').css('opacity', '0');
			$(this).find('h4').css('opacity', '0').removeClass('animated bounceInLeft');
			$(this).next().removeClass('animated flipInX');

		});
	}

	function validateForm() {
		$('input').each(function(index, element) {
			var keyupTimeout;
			element.addEventListener('keyup', function(event) {
				clearTimeout(keyupTimeout);
				keyupTimeout = setTimeout(function() {
					if (event.target.id === 'email') {
						validateMail(event.target.value, element);
					} else {
						validateAll(event.target.value, element);
					}
				}, 700);
			});
		});

		$('#comment').on('keyup', function(event) {
			clearTimeout(keyupTimeout);
			keyupTimeout = setTimeout(function() {
				validateTextArea();
			}, 700);
		});

		$('.send-mes').on('click', function() {
			$('input').each(function(index, element) {
				if (element.id === 'email') {
					validateMail(element.value, element);
				} else {
					validateAll(element.value, element);
				}
				validateTextArea();
			});
			if ($('.error').length === 0) {
				$('.send-mes').text('Sending...').css('background-color', '#19A3D9').css('border', '1px solid #19A3D9').css('color', 'white');
			}

		});
	}

	function validateMail(text, element) {
		if (/\w{1,}\d*\@\w{1,}\.\w{1,}/.test(text) !== true) {
			element.className = 'error';
		} else {
			element.className = '';
		}
	}

	function validateAll(text, element) {
		if (text === '') {
			element.className = 'error';
		} else {
			element.className = '';
		}
	}

	function validateTextArea() {
		if ($('#comment')[0].value === '') {
			$('#comment').addClass('error');
		} else {
			$('#comment').removeClass('error');
		}
	}

	function typeText() {
		textOnScreen = textOnScreen + array[i];
		i += 1;
		$('.else-text').text(textOnScreen);
	}

	window.portfolio = portfolio;
}())