function main() {
	const mainBlock = createView();
	document.body.appendChild(mainBlock.container);

	const videoCutter = new VideoCutter(mainBlock.videoCutter.container);
	videoCutter.setDisplay(mainBlock.controls.display);

	mainBlock.input.button.addEventListener("click", () => {
		videoCutter.initialize(mainBlock.input.field.value, {width: 900, height: 600});
	});
}

const createView = () => {
	const mainBlock = document.createElement("div");
	mainBlock.setAttribute("class", "main-block");
	const inputContainer = document.createElement("div");
	inputContainer.setAttribute("class", "input-container");

	const inputField = document.createElement("input");
	inputField.setAttribute("class", "input-field");
	inputContainer.appendChild(inputField);

	const inputFieldButton = document.createElement("button");
	inputFieldButton.setAttribute("class", "input-field-button");
	inputFieldButton.innerText = "getVideo";
	inputContainer.appendChild(inputFieldButton);

	const videoCutterContainer = document.createElement("div");
	videoCutterContainer.setAttribute("class", "video-cutter-container");

	const mainControlsContainer = document.createElement("div");
	mainControlsContainer.setAttribute("class", "main-controls");

	const display = document.createElement("input");
	display.setAttribute("class", "display");
	const completeButton = document.createElement("button");
	completeButton.setAttribute("class", "complete-button");
	completeButton.innerText = "cut";
	mainControlsContainer.appendChild(display);
	mainControlsContainer.appendChild(completeButton);

	mainBlock.appendChild(inputContainer);
	mainBlock.appendChild(videoCutterContainer);
	mainBlock.appendChild(mainControlsContainer);

	return {
		container: mainBlock,
		input: {
			container: inputContainer,
			field: inputField,
			button: inputFieldButton,
		},
		videoCutter: {
			container: videoCutterContainer
		},
		controls: {
			container: mainControlsContainer,
			display: display,
			completeButton: completeButton,
		}

	};
};

function onYouTubeIframeAPIReady() {
}