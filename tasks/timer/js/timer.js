'use strict';

(function() {
	function stopWatch() {
		this._structureWatch();
	}
	var stopTime;
	var pauseTime;
	var clocktimer;
	var startTime = 0;
	var delta;

	stopWatch.prototype._structureWatch = function() {
		var watch = document.createElement('div');
		watch.className = 'row';
		var container = document.querySelector('.container');
		container.appendChild(watch);
		var colXs4 = document.createElement('div');
		colXs4.className = 'col-xs-4';
		var colXs4Controls = document.createElement('div');
		colXs4Controls.className = 'col-xs-4 stopwatch-controls';
		watch.appendChild(colXs4);
		watch.appendChild(colXs4Controls);
		var stopwatchCurrent = document.createElement('h2');
		stopwatchCurrent.innerText = '00:00:00:000';
		stopwatchCurrent.className = 'stopwatch-current';
		colXs4.appendChild(stopwatchCurrent);
		var stopwatchLaps = document.createElement('div');
		stopwatchLaps.className = 'stopwatch-laps';
		colXs4.appendChild(stopwatchLaps);

		var btnGroup = document.createElement('div');
		btnGroup.className = 'btn-group btn-group-lg';
		colXs4Controls.appendChild(btnGroup);
		var btnStart = document.createElement('button');
		var btnLap = document.createElement('button');
		btnStart.className = 'btn btn-primary start';
		btnStart.innerText = 'Start';
		btnLap.className = 'btn btn-info';
		btnLap.innerText = 'Lap';
		btnGroup.appendChild(btnStart);
		btnGroup.appendChild(btnLap);
		var btnReset = document.createElement('button');
		btnReset.className = 'btn btn-danger btn-sm';
		btnReset.innerText = 'Reset';
		colXs4Controls.appendChild(btnReset);

		btnReset.addEventListener('click', this._reset.bind(this));
		btnStart.addEventListener('click', this._btnBehaviour.bind(this));
		btnLap.addEventListener('click', this._addLap.bind(this));
		document.addEventListener('keyup', this._keyAction.bind(this));

		var description = document.querySelector('.description');
		description.addEventListener('click', function(event){
			var imageVisible = document.querySelector('.pict-description');
			if (imageVisible.style.display === 'block') {
				imageVisible.style.display = 'none';
				var textBox = document.querySelector('.description');
				textBox.text = 'Показать описание задания';
			} else {
				imageVisible.style.display = 'block';
				var textBox = document.querySelector('.description');
				textBox.text = 'Скрыть описание задания';
			}
		});
	}

	stopWatch.prototype._keyAction = function(event) {
		if (event.keyCode === 76) {
			this._addLap();
		} else if (event.keyCode === 83) {
			this._btnBehaviour();
		} else if (event.keyCode === 82) {
			this._reset();
		}
	};

	stopWatch.prototype._btnBehaviour = function(event) {
		var btnStart = document.querySelector('.start');
		if (btnStart.innerText === 'Start') {
			pauseTime = pauseTime + ((new Date().getTime() - stopTime) / 1000) || 0;
			btnStart.innerText = 'Stop ';
			btnStart.style.width = 71.03 + 'px';
			clocktimer = window.setInterval(this._startTime, 50);
		} else {
			btnStart.innerText = 'Start';
			stopTime = new Date().getTime();
			clearInterval(clocktimer);

		}
	}


	stopWatch.prototype._startTime = function(event) {

		if (startTime === 0) {
			startTime = new Date().getTime();
		}
		var h = 0,
			m = 0,
			s = 0,
			ms = 0;
		delta = (((new Date().getTime() - startTime) / 1000) - pauseTime);

		if (delta < 1) {
			ms = delta * 1000;
		}

		if (delta > 1 && delta < 60) {
			s = delta - (delta % 1);
			var a = delta - s;
			ms = a.toString().substr(2, 3);
		}

		if (delta > 60 && delta < 3600) {
			var ps = delta - (delta % 1);
			var a = delta - ps;
			ms = a.toString().substr(2, 3);
			m = (ps / 60) - ((ps / 60) % 1);
			s = (ps - (m * 60));
		}

		var stopwatchCurrent = document.querySelector('.stopwatch-current');
		if (h < 10) {
			h = '0' + h;
		}
		if (m < 10) {
			m = '0' + m;
		}
		if (s < 10 && s.toString().length < 2) {
			s = '0' + s;
		}
		if (ms < 10 && ms.toString().length < 3) {
			ms = '00' + ms;
		}
		if (ms > 10 && ms < 100 && ms.toString().length < 3) {
			ms = '0' + ms;
		}
		stopwatchCurrent.innerText = h + ":" + m + ":" + s + ":" + ms;

	}

	stopWatch.prototype._reset = function(event) {
		var stopwatchCurrent = document.querySelector('.stopwatch-current');
		stopwatchCurrent.innerText = '00:00:00:000';


		var stopwatchLaps = document.querySelector('.stopwatch-laps');
		var btnStart = document.querySelector('.start');
		btnStart.innerText = 'Start';
		var laps = document.querySelectorAll('.alert');
		for (var i = 0; i < laps.length; i++) {
			var lap = laps[i];
			stopwatchLaps.removeChild(lap);
		}
		clearInterval(clocktimer);
		startTime = 0;
		pauseTime = 0;
		stopTime = undefined;
	}



	stopWatch.prototype._addLap = function(event) {
		var whole = document.querySelector('.stopwatch-laps');
		var alert = document.createElement('div');
		var label = document.createElement('span');
		alert.className = 'alert alert-info';
		label.className = 'label label-danger';
		label.innerText = '×';
		var stopwatchCurrent = document.querySelector('.stopwatch-current').innerText;
		alert.innerText = stopwatchCurrent;
		whole.appendChild(alert);
		alert.appendChild(label);
		var buttons = document.querySelectorAll('.label');
		for (var i = 0; i < buttons.length; i++) {
			var button = buttons[i];
			button.addEventListener('click', function(event) {
				event.target.parentNode.style.display = 'none';
			});

		}
	}

	window.stopWatch = stopWatch;
}());