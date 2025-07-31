// Inicializa a barra de ferramentas com base no valor salvo no localStorage
function setToolbarMode() {
  const storedMode = localStorage.getItem("toolbarMode") || "expanded";
  localStorage.setItem("toolbarMode", storedMode);

  const mode = storedMode === "expanded" ? "expanded" : "minimized";
  toggleToolbarMode("toolbar-mode", mode);
}

// Inicializa o modo de leitura (página única ou dupla) com base no localStorage
function setReadMode() {
  const storedMode = localStorage.getItem("readMode") || "single-page";
  localStorage.setItem("readMode", storedMode);

  const mode = storedMode === "single-page" ? "single-page" : "double-page";
  toggleReadMode("read-mode", mode);
}

// Inicializa o estado visual dos ícones de tela cheia
function setFullscreenMode() {
  const btnToggle = document.querySelector("#button-fullscreen-toggle");
  const iconEnter = document.querySelector("#svg-fullscreen");
  const iconExit = document.querySelector("#svg-fullscreen-exit");

  btnToggle.setAttribute("title", "Entrar no modo de tela cheia");
  iconEnter.classList.remove("hidden-element");
  iconExit.classList.add("hidden-element");
}

// Desativa ambos os botões de navegação
function deactivateNavigationButtons() {
  deactivatePreviousButton();
  deactivateNextButton();
}

// Aguarda a substituição das imagens por SVGs antes de executar um callback
async function waitSvgFetching(callback) {
  // Verifica se ainda há <img> com fetchSvg pendente no onload
  while (
    Array.from(document.querySelectorAll("img")).some((img) =>
      String(img.getAttribute("onload")).includes("fetchSvg(this)")
    )
  ) {
    await sleep(100); // Aguarda um pouco antes de checar novamente
  }

  await sleep(100); // Pequeno atraso extra para garantir segurança
  callback();
}

// Executa configurações iniciais da interface
setToolbarMode();
setReadMode();
setFullscreenMode();
deactivateNavigationButtons();
waitSvgFetching(hideLoadScreen);

// Define uma variável CSS com a altura visível da tela (usado em layout responsivo)
document.documentElement.style.setProperty(
  "--real-height",
  `${getVisibleHeight()}px`
);
