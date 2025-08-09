function setLoadScreenProgressInfo(info = "") {
  const spanProgressInfo = document.querySelector(
    "#div-load-screen > .span-progress-info"
  );
  spanProgressInfo.textContent = info;
}

function showLoadScreen(message = "") {
  const divLoadScreen = document.querySelector("#div-load-screen");
  divLoadScreen.setAttribute("style", "display:flex");
  setLoadScreenProgressInfo((info = message));
}

function hideLoadScreen() {
  const divLoadScreen = document.querySelector("#div-load-screen");
  divLoadScreen.setAttribute("style", "display:none");
  setLoadScreenProgressInfo("");
}
