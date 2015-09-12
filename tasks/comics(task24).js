/*

Реализовать скрипт динамической подгрузки комиксов для сайта http://explosm.net . При прокрутке страницы к нижнему краю последнего видимого комикса, подгружаются новые изображения следующих комиксов (2 штуки) и добавляются с обязательной анимацией (на ваш вкус можно проявлять, можно выезжать) под последним видимым комиксом. В итоге должен получиться эффект "бесконечной страницы". Иногда среди комиксов встречаются видео, они не должны добавляться в общий поток.
Скрипт положить отдельным файлов в папку с домашками. Реализовать через jQuery, синхронные запросы использовать нельзя.
*/

'use strict';

(function() {
	var $nextComicNode;
	var nextComicUrl;
	var newPictToUse;
	var imageRow;
	var imageRowOnPage;
	var sizeVisiblePage;
	var isLoading = false;
	var nextComicUrl = $('.next-comic').prop('href');
	var comicContainer = $('#comic-container');

	function decision() {
		imageRow = $('#comic-container .row').last();
		imageRowOnPage = imageRow[0].getBoundingClientRect().bottom;
		sizeVisiblePage = document.documentElement.clientHeight;
		if (imageRowOnPage < (sizeVisiblePage - 50)) {
			return true;
		} else {
			return false;
		}
	}

	function isValidToInsert($nextComicNode) {
		return !$nextComicNode.find('a').get(0);
	}

	function insertComics($comicNode) {
		$comicNode.css('opacity', 0);
		$comicNode.find('img').on('load', function() {
			$comicNode.animate({
				opacity: 1
			})
		})
		comicContainer.append($comicNode);
	}

	function addTwoComics() {
		var comicsLoaded = 0;
		isLoading = true;

		function loadingNextComic() {
			$.get(nextComicUrl).then(function(result) {
				newPictToUse = $(result);
				nextComicUrl = newPictToUse.find('.previous-comic').prop('href');
				$nextComicNode = newPictToUse.find(".row:has(#main-comic):last");
				console.log($nextComicNode);

				if (isValidToInsert($nextComicNode)) {
					comicsLoaded += 1;
					insertComics($nextComicNode);
				}
				if (comicsLoaded < 2) {
					loadingNextComic();
				} else {
					isLoading = false;
				}
			})
		}
		loadingNextComic();
	}

	$(window).on('scroll', function() {
		if (!isLoading && decision()) {
			addTwoComics();
		}
	})

}());