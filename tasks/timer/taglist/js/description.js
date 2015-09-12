$(document).ready(function() {
			$('a.description').on('click', function(element) {
			if ($('.pict-description img').css('display') !== 'block') {
				$('.pict-description img').css('display', 'block');
				$('a.description').text('Скрыть описание задания');
			} else {
				$('.pict-description').find('img').css('display', 'none');
				$('a.description').text('Просмотреть описание задания');
			}
			});
		})