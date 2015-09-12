'use strict';

(function() {
	function slider() {
		var clocktimer;
		var obj = 0;
		var time;
		$('body').append('<div class="carusel-container">');
		$('.carusel-container').append('<div class="carusel-control">');

		$('.carusel-container').append('<div class="carusel-clip">');
		$('.carusel-clip').append('<ul class="slider-pic">');
		$('.slider-pic').append('<li class="picture slide1"><img src="./image1.jpg">');
		$('.slider-pic').append('<li class="picture slide2"><img src="./image2.jpg">');
		$('.slider-pic').append('<li class="picture slide3"><img src="./image3.jpg">');
		$('.slider-pic').append('<li class="picture slide4"><img src="./image4.jpg">');
		$('.carusel-control').append('<ul class="buttons">');
		$('.buttons').append('<li class="btn-all btn1 active">');
		$('.buttons').append('<li class="btn-all btn2">');
		$('.buttons').append('<li class="btn-all btn3">');
		$('.buttons').append('<li class="btn-all btn4">');
		clocktimer = window.setInterval(function() {
			return autoSlider();
		}, 2500);
		$(document).on("click", '.btn-all', function() { // slider click navigate
			clearInterval(clocktimer);
			clearTimeout(time);
			$('.active').removeClass("active");
			$(this).addClass("active"); // делаем активным текущий
			obj = $(this).context.className.substr(11, 1) - 1; // узнаем его номер
			sliderJS(obj); // слайдим
			slidePause();
			return;
		});

		$('a.description').on('click', function(element) {
			if ($('.pict-description').find('img').css('display') === 'none') {
				$('.pict-description').find('img').css('display', 'block');
				$('a.description').text('Скрыть описание задания');
			} else {
				$('.pict-description').find('img').css('display', 'none');
				$('a.description').text('Показать описание задания');
			}
		});

		function sliderJS(obj) {
			var step = $('.slider-pic').find('img')[0].width; // ширина объекта
			$('.slider-pic').stop().animate({
				marginLeft: "-" + step * obj
			}, 500); // 500 это скорость перемотки
		}

		function autoSlider() {
			if (obj >= 3) {
				obj = 0;
			} else {
				obj += 1;
			}
			$('.active').removeClass("active");
			$('.btn' + (obj + 1)).addClass('active');
			return sliderJS(obj);
		}

		function slidePause() {
			clearInterval(clocktimer);
			clearTimeout(time);
			time = setTimeout(function() {
				clocktimer = window.setInterval(function() {
					return autoSlider();
				}, 2500);
			}, 5000);
		}
	}


	window.slider = slider;
}())