// Expande ou minimiza a barra de ferramentas
function toggleToolbarMode(cssAttributeName, value) {
  document.documentElement.setAttribute(cssAttributeName, value);

  const buttonToggleToolbarMode = document.querySelector(
    "#button-toggle-toolbar-mode"
  );
  const svgExpandToolbar = document.querySelector("#svg-expand-toolbar");
  const svgCollapseToolbar = document.querySelector("#svg-collapse-toolbar");

  if (!buttonToggleToolbarMode) return;

  if (value === "expanded") {
    svgExpandToolbar.classList.remove("hidden-element");
    svgCollapseToolbar.classList.add("hidden-element");
  } else if (value === "minimized") {
    svgExpandToolbar.classList.add("hidden-element");
    svgCollapseToolbar.classList.remove("hidden-element");
  }
}

// Muda o Modo de Leitura (página única ou página dupla)
function toggleReadMode(cssAttributeName, value) {
  document.documentElement.setAttribute(cssAttributeName, value);

  const readModeButton = document.querySelector("#button-read-mode");
  const svgSinglePage = document.querySelector("#svg-single-page");
  const svgDoublePage = document.querySelector("#svg-double-page");

  if (!readModeButton) return;

  if (value === "single-page") {
    readModeButton.setAttribute(
      "title",
      "Mudar para visualização em página dupla"
    );
    svgSinglePage.classList.remove("hidden-element");
    svgDoublePage.classList.add("hidden-element");
  } else if (value === "double-page") {
    readModeButton.setAttribute(
      "title",
      "Mudar para visualização em página única"
    );
    svgSinglePage.classList.add("hidden-element");
    svgDoublePage.classList.remove("hidden-element");
  }
}

// Carrega as imagens das páginas
async function loadPagesImages(loadScreen = false) {
  const fragment = document.createDocumentFragment();
  const divGallery = document.querySelector("#div-gallery");
  const pageLinks = localStorage.getItem("pageLinks") || JSON.stringify([]);
  let singlePageCount = 0;

  localStorage.setItem("pageLinks", pageLinks);

  if (loadScreen) {
    showLoadScreen();
  }

  const links = JSON.parse(pageLinks);
  for (let index = 0; index < links.length; index++) {
    const imageUrl = links[index];

    const orientation = await getImageOrientation(imageUrl);
    const img = document.createElement("img");
    img.src = imageUrl;

    // Estiliza conforme a orientação da imagem
    if (orientation === "horizontal") {
      img.classList.add("double-page"); // Imagem em paisagem ocupa duas páginas
      if (singlePageCount % 2 === 1) {
        singlePageCount -= 1;
      }
    } else if (
      index <= links.length &&
      orientation === "vertical" &&
      singlePageCount % 2 === 0
    ) {
      singlePageCount += 1;
      img.classList.add("left-single-page");
    } else if (
      index <= links.length &&
      orientation === "vertical" &&
      singlePageCount % 2 === 1
    ) {
      singlePageCount += 1;
      img.classList.add("right-single-page");
    }

    fragment.appendChild(img);

    if (loadScreen) {
      setLoadScreenProgressInfo(`${index + 1} / ${links.length}`);
    }
  }

  activateNextButton();

  // Substitui os elementos-filho da div-gallery pelas imagens do fragmento
  divGallery.replaceChildren(fragment);

  if (loadScreen) {
    hideLoadScreen();
  }
}

// Sai ou entra em tela cheia
function toggleFullscreenMode() {
  const buttonFullscreenToggle = document.querySelector(
    "#button-fullscreen-toggle"
  );
  const svgFullscreen = document.querySelector("#svg-fullscreen");
  const svgFullscreenExit = document.querySelector("#svg-fullscreen-exit");

  if (document.fullscreenElement) {
    document.exitFullscreen();
    buttonFullscreenToggle.setAttribute(
      "title",
      "Entrar no modo de tela cheia"
    );
    svgFullscreen.classList.remove("hidden-element");
    svgFullscreenExit.classList.add("hidden-element");
  } else {
    document.documentElement.requestFullscreen();
    buttonFullscreenToggle.setAttribute("title", "Sair do modo de tela cheia");
    svgFullscreen.classList.add("hidden-element");
    svgFullscreenExit.classList.remove("hidden-element");
  }
}

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

function openModalLoadContent() {
  const modalLoadContent = document.querySelector("#modal-load-content");
  modalLoadContent.showModal();
}

function closeModalLoadContent() {
  const modalLoadContent = document.querySelector("#modal-load-content");
  modalLoadContent.close();
}

function activatePreviousButton() {
  const buttonPrevious = document.querySelector("#button-previous");
  buttonPrevious.classList.remove("inactive-button");
  buttonPrevious.disabled = false;
}
function activateNextButton() {
  const buttonNext = document.querySelector("#button-next");
  buttonNext.classList.remove("inactive-button");
  buttonNext.disabled = false;
}

function deactivatePreviousButton() {
  const buttonPrevious = document.querySelector("#button-previous");
  buttonPrevious.classList.add("inactive-button");
  buttonPrevious.disabled = true;
}
function deactivateNextButton() {
  const buttonNext = document.querySelector("#button-next");
  buttonNext.classList.add("inactive-button");
  buttonNext.disabled = true;
}

// Aplica ou remove o filtro de brilho nos botões de navegação
function updateButtonState() {
  const firstPage = document.querySelector("#div-gallery > img:nth-child(1)");
  const currentPagesHeight = firstPage?.height || 0;
  const maxScrollHeight = document.documentElement.scrollHeight;

  if (window.scrollY === 0) {
    deactivatePreviousButton();
    activateNextButton();
  } else if (window.scrollY >= maxScrollHeight - currentPagesHeight) {
    activatePreviousButton();
    deactivateNextButton();
  } else {
    activatePreviousButton();
    activateNextButton();
  }
}

// Navega para a página anterior
function goToPreviousPage() {
  const firstPage = document.querySelector("#div-gallery > img:nth-child(1)");
  const currentPagesHeight = firstPage?.height || 0;
  const novaPosicao =
    (Math.round(window.scrollY / currentPagesHeight) - 1) * currentPagesHeight;
  window.scrollTo(0, novaPosicao);

  updateButtonState();
}

// Navega para a próxima página
function goToNextPage() {
  const firstPage = document.querySelector("#div-gallery > img:nth-child(1)");
  const currentPagesHeight = firstPage?.height || 0;
  const novaPosicao =
    (Math.round(window.scrollY / currentPagesHeight) + 1) * currentPagesHeight;
  window.scrollTo(0, novaPosicao);

  updateButtonState();
}
