function setReadMode() {
  const storedReadMode = localStorage.getItem("readMode") || "single-page";
  localStorage.setItem("readMode", storedReadMode);

  const mode = storedReadMode === "single-page" ? "single-page" : "double-page";
  toggleReadMode("read-mode", mode);
}

function setFullscreenMode() {
  const buttonFullscreenToggle = document.querySelector(
    "#button-fullscreen-toggle"
  );
  const svgFullscreen = document.querySelector("#svg-fullscreen");
  const svgFullscreenExit = document.querySelector("#svg-fullscreen-exit");

  buttonFullscreenToggle.setAttribute("title", "Entrar no modo de tela cheia");
  svgFullscreen.classList.remove("hidden-element");
  svgFullscreenExit.classList.add("hidden-element");
}

function deactivateNavigationButtons() {
  deactivatePreviousButton();
  deactivateNextButton();
}

// Espera todos os fetchSvg terminarem
async function waitSvgFetching(callback) {
  while (
    // Verifica se alguma imagem tem "fetchSvg(this)" no atributo "onload"
    Array.from(document.querySelectorAll("img")).some((img) => {
      String(img.getAttribute("onload")).includes("fetchSvg(this)");
    })
  ) {
    await sleep(100);
  }
  await sleep(100);
  callback();
}

setReadMode();
setFullscreenMode();
deactivateNavigationButtons();
waitSvgFetching(hideLoadScreen);
