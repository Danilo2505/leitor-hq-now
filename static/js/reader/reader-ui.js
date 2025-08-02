// Alterna a exibição da barra de ferramentas (expandida ou minimizada)
function toggleToolbarMode(attributeName, mode) {
  document.documentElement.setAttribute(attributeName, mode);

  const toggleButton = document.querySelector("#button-toggle-toolbar-mode");
  const iconExpand = document.querySelector("#svg-expand-toolbar");
  const iconCollapse = document.querySelector("#svg-collapse-toolbar");

  if (!toggleButton) return;

  const isExpanded = mode === "expanded";

  // Alterna visibilidade dos ícones de expandir/recolher
  iconExpand.classList.toggle("hidden-element", !isExpanded);
  iconCollapse.classList.toggle("hidden-element", isExpanded);
}

// Alterna entre visualização em página única ou dupla
function toggleReadMode(attributeName, mode) {
  document.documentElement.setAttribute(attributeName, mode);

  const toggleButton = document.querySelector("#button-read-mode");

  if (!toggleButton) return;

  const isSingle = mode === "single-page";

  // Atualiza tooltip conforme o modo atual
  toggleButton.setAttribute(
    "title",
    isSingle
      ? "Mudar para visualização em página dupla"
      : "Mudar para visualização em página única"
  );
}

// Carrega as imagens da galeria, aplicando estilos baseados na orientação
async function loadPagesImages(showLoading = false) {
  const gallery = document.querySelector("#div-gallery");
  const pageLinks = JSON.parse(localStorage.getItem("pageLinks") || "[]");
  const fragment = document.createDocumentFragment();
  let singlePageCount = 0;

  if (showLoading) showLoadScreen();

  for (let i = 0; i < pageLinks.length; i++) {
    const imageUrl = pageLinks[i];
    const isVertical = await isVerticalImage(imageUrl);

    const img = document.createElement("img");
    img.src = imageUrl;

    if (!isVertical) {
      // Imagem paisagem ocupa espaço de duas páginas
      img.classList.add("double-page");
      if (singlePageCount % 2 === 1) singlePageCount--;
    } else {
      // Alterna entre lado esquerdo e direito para páginas simples
      const className =
        singlePageCount % 2 === 0 ? "left-single-page" : "right-single-page";
      img.classList.add(className);
      singlePageCount++;
    }

    fragment.appendChild(img);

    if (showLoading) {
      setLoadScreenProgressInfo(`${i + 1} / ${pageLinks.length}`);
    }
  }

  activateNextButton();
  gallery.replaceChildren(fragment);

  if (showLoading) hideLoadScreen();
}

// Alterna entre ativar/desativar o modo tela cheia
function toggleFullscreenMode() {
  const btnToggle = document.querySelector("#button-fullscreen-toggle");
  const iconEnter = document.querySelector("#svg-fullscreen");
  const iconExit = document.querySelector("#svg-fullscreen-exit");

  const isFullscreen = !!document.fullscreenElement;

  if (isFullscreen) {
    document.exitFullscreen();
    btnToggle.setAttribute("title", "Entrar no modo de tela cheia");
  } else {
    document.documentElement.requestFullscreen();
    btnToggle.setAttribute("title", "Sair do modo de tela cheia");
  }

  // Troca os ícones conforme o estado atual
  iconEnter.classList.toggle("hidden-element", !isFullscreen);
  iconExit.classList.toggle("hidden-element", isFullscreen);
}

// Abre o modal de carregamento de conteúdo
function openModalLoadContent() {
  document.querySelector("#modal-load-content")?.showModal();
}

// Fecha o modal de carregamento de conteúdo
function closeModalLoadContent() {
  document.querySelector("#modal-load-content")?.close();
}

// Ativa/desativa botões de navegação
function activatePreviousButton() {
  setButtonState("#button-previous", true);
}

function activateNextButton() {
  setButtonState("#button-next", true);
}

function deactivatePreviousButton() {
  setButtonState("#button-previous", false);
}

function deactivateNextButton() {
  setButtonState("#button-next", false);
}

// Altera o estado de um botão (habilita/desabilita + estilo)
function setButtonState(selector, isActive) {
  const button = document.querySelector(selector);
  if (!button) return;
  button.disabled = !isActive;
  button.classList.toggle("inactive-button", !isActive);
}

// Atualiza o estado dos botões de navegação com base no scroll atual
function updateButtonState() {
  const firstPage = document.querySelector("#div-gallery > img:first-child");
  const pageHeight = firstPage?.height || 0;
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight;

  if (scrollY === 0) {
    deactivatePreviousButton();
    activateNextButton();
  } else if (scrollY >= maxScroll - pageHeight) {
    activatePreviousButton();
    deactivateNextButton();
  } else {
    activatePreviousButton();
    activateNextButton();
  }
}

// Navega para a página anterior
function goToPreviousPage() {
  scrollToPage(-1);
}

// Navega para a próxima página
function goToNextPage() {
  scrollToPage(1);
}

// Realiza scroll vertical para outra "página" com base na altura da imagem
function scrollToPage(direction = 1) {
  const firstPage = document.querySelector("#div-gallery > img:first-child");
  const pageHeight = firstPage?.height || 0;

  if (!pageHeight) return;

  const newPosition =
    (Math.round(window.scrollY / pageHeight) + direction) * pageHeight;
  window.scrollTo({ top: newPosition, behavior: "smooth" });

  updateButtonState();
}
