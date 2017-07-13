for (var i=0; i<=9; ++i) {
  makeButtonClickHandler(i);
}

function makeButtonClickHandler(buttonId) {
  var button = document.getElementById(buttonId),
      display = document.getElementById('displayId');
  button.addEventListener("click",
  function (){display.firstChild.data = button.firstChild.data;});
}
