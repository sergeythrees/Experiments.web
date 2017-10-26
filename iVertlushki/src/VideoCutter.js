class VideoCutter {
	constructor(parentContainer) {
		this._ytVideoID = null;
		this._size = null;
		this._ytPlayer = null;
		this._display = null;
		this._initalized = false;
		this._duration = null;
		this._measure = null;

		this._initializeView();
		parentContainer.appendChild(this._container);
	}

	setDisplay(display) {
		this._display = display;
	}

	updateDisplay() {
		if (this._display && this._initalized)
		{
			this._display.value =
				String((this._leftSpinner.offsetLeft / this._measure).toFixed(0)) + " - "
				+ String((this._rightSpinner.offsetLeft / this._measure).toFixed(0));
		}
	}

	initialize(src, size) {
		this._ytVideoID = src;
		this._size = size;

		this._ytPlayer = new YT.Player('youtube-frame', {
			height: this._size.height,
			width: this._size.width,
			playerVars: {
				'autoplay': 0,
				'controls': 0,
				'showinfo': 0,
				'rel': 0,
				'iv_load_policy': 3,
			},
			videoId: this._ytVideoID,
			events: {
				'onReady': () => {
					this._duration = this._ytPlayer.getDuration();
					this._measure = this._container.clientWidth / this._duration;
				}
			}
		});
		this._initalized = true;
		this._initializeMouseEvents();
	}

	_initializeView() {
		this._container = document.createElement("div");
		this._container.setAttribute("class", "video-cutter");
		this._ytFrame = document.createElement("div");

		this._ytFrame.setAttribute("class", "youtube-frame");
		this._ytFrame.setAttribute("id", "youtube-frame");
		this._ytFrame.setAttribute("frameborder", "0");

		this._timelineContainer = document.createElement("div");
		this._timelineContainer.setAttribute("class", "timeline-container");
		this._leftSpinner = document.createElement("button");
		this._leftSpinner.setAttribute("class", "spinner left-spinner");
		this._leftSpinner.position = null;
		this._rightSpinner = document.createElement("button");
		this._rightSpinner.position = null;
		this._rightSpinner.setAttribute("class", "spinner right-spinner");
		this._timelineContainer.appendChild(this._leftSpinner);
		this._timelineContainer.appendChild(this._rightSpinner);

		this._container.appendChild(this._ytFrame);
		this._container.appendChild(this._timelineContainer);
	}

	_initializeMouseEvents() {
		this._leftSpinner.addEventListener("mousedown", () => {
			this._createSpinnerMouseMoveListener(this._leftSpinner, this._rightSpinner, true);
		});

		this._rightSpinner.addEventListener("mousedown", () => {
			this._createSpinnerMouseMoveListener(this._rightSpinner, this._leftSpinner, false);
		});
	}

	_createSpinnerMouseMoveListener(activeSpinner, secondSpinner, isForLeft) {
		const containerCoord = this._container.getBoundingClientRect();
		const secondSpinnerCoord = secondSpinner.getBoundingClientRect();
		const mousemoveListener = (e) => {
			if (isForLeft ? (e.clientX < secondSpinnerCoord.x) : (e.clientX > secondSpinnerCoord.x))
			{
				if (e.clientX < (containerCoord.x + containerCoord.width))
				{
					this._ytPlayer.seekTo(activeSpinner.offsetLeft / this._measure, true);
					activeSpinner.style.left = String(e.clientX - containerCoord.x) + "px";
				}
			}

			this.updateDisplay();
		};
		this._timelineContainer.addEventListener("mousemove", mousemoveListener);
		activeSpinner.addEventListener("mouseup", () => {
			this._timelineContainer.removeEventListener("mousemove", mousemoveListener);
		});

	}
}