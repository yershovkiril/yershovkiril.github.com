(function() {
	'use strict';
	var status1 = "Редактировать теги";
	var status2 = "Завершить редактирование";
	
	function tagList(node, tagArray) {
		this.node = node;
		this.tagArray = tagArray;
		$(node).append('<div class="statusCaontainer"><span class="status">' + status1 + '</span></div>');
		$(node).append('<div class="tagContainer"></div>');
		tagArray.forEach(function(element) {
			tagList.prototype.addTag(element, node);
		});
		$(node).append('<input type="text"><button class="add">добавить</button>');
		$(node.selector + ' .status').on('click', function(event) {
			tagList.prototype.changeStatus(event, node);
		});
		tagList.prototype.removeBtn();
		$(node.selector + ' .add').on('click', function() {
			var textTag = $(node.selector + ' input').val();
			tagList.prototype.addTag(textTag, node);
			tagList.prototype.removeBtn();
			$(node.selector + ' .close').addClass('visible');
		})
		document.addEventListener('keyup', function(event) {
			if (event.keyCode === 13 && ($(node.selector + ' input').css('display') === 'inline-block')) {
				var textTag = $(node.selector + ' input').val();
				textTag = $.trim(textTag);
				tagList.prototype.addTag(textTag, node);
				tagList.prototype.removeBtn();
				$(node.selector + ' .close').addClass('visible');
			}
		});
	}
	
	tagList.prototype.addTag = function(element, node) {
		var tags = $(node.selector + ' .tag');
		for (var i = 0; i < tags.length; i += 1) {
			var tagName = tags[i].textContent;
			tagName = $.trim(tagName);
			if (element === tagName) {
				return
			}
		}
		if (element !== '') {
			$(node.selector + ' .tagContainer').append('<div class="tagButtonNode"><div class="tag active">' + element + '</div><button class="close">x</button></div>');
			$('input').val('');
		}
	};

	tagList.prototype.changeStatus = function(event, node) {
		if ($(node.selector + ' .status').text() === status1) {
			$(node.selector + ' .status').text(status2);
			$(node.selector + ' input').css('display', 'inline-block');
			$(node.selector + ' .add').css('display', 'inline-block');
			$(node.selector + ' .tag').addClass('active');
			$(node.selector + ' .close').addClass('visible');

		} else {
			$(node.selector + ' .status').text(status1);
			$(node.selector + ' input').css('display', 'none');
			$(node.selector + ' .add').css('display', 'none');
			$(node.selector + ' .tag').removeClass('active');
			$(node.selector + ' .close').removeClass('visible');
		}
	};

	tagList.prototype.removeBtn = function() {
		var buttonsClose = $('.close');
		for (var i = 0; i < buttonsClose.length; i += 1) {
			var buttonClose = buttonsClose[i];
			buttonClose.addEventListener('click', function(event) {
				event.target.parentNode.remove();
			})
		}
	};

	window.tagList = tagList;
}())