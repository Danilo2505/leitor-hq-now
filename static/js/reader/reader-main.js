/*
async function updateDebugInfo(updateRateMs = 1000) {
  while (true) {
    const spanDebugInfo = document.querySelector("#span-debug-info");

    spanDebugInfo.innerHTML = `${window.innerHeight} <br />
    ${window.outerHeight} <br />
    ${visualViewport.height}
    `;

    await sleep(updateRateMs);
  }
}

updateDebugInfo(1000);
*/

let oldScrollHeight = document.documentElement.scrollHeight;
let oldScrollY = window.scrollY;

// Guarda as Informações Antigas do Scroll
function storeScrollSnapshot() {
  oldScrollHeight = document.documentElement.scrollHeight;
  oldScrollY = window.scrollY;
}

// Ajusta a Posição do Scroll
function restoreScrollPosition() {
  const currentScrollHeight = document.documentElement.scrollHeight;
  const newScrollY = (oldScrollY * currentScrollHeight) / oldScrollHeight;

  window.scrollTo(0, newScrollY);

  storeScrollSnapshot();
}

// Atualiza o estado dos Botões de Navegação quando o scroll termina
window.addEventListener("scrollend", updateButtonState);

// Atualiza o estado dos Botões de Navegação quando o touch termina
window.addEventListener("touchend", updateButtonState);

// Muda o modo da barra de ferramentas entre expandida e minimizada
const buttonToggleToolbarMode = document.querySelector(
  "#button-toggle-toolbar-mode"
);
buttonToggleToolbarMode.addEventListener("click", async () => {
  let currentToolbarMode = localStorage.getItem("toolbarMode");

  if (currentToolbarMode == "expanded") {
    toggleToolbarMode("toolbar-mode", "minimized");
    localStorage.setItem("toolbarMode", "minimized");
  } else {
    toggleToolbarMode("toolbar-mode", "expanded");
    localStorage.setItem("toolbarMode", "expanded");
  }
});

// Muda o modo de leitura entre página única ou página dupla
const buttonReadMode = document.querySelector("#button-read-mode");
buttonReadMode.addEventListener("click", async () => {
  let currentReadMode = localStorage.getItem("readMode");

  if (currentReadMode == "single-page") {
    toggleReadMode("read-mode", "double-page");
    localStorage.setItem("readMode", "double-page");
  } else {
    toggleReadMode("read-mode", "single-page");
    localStorage.setItem("readMode", "single-page");
  }

  updateButtonState();
});

// Abre o modal que recebe o conteúdo
const buttonOpenModalLoadContent = document.querySelector(
  "#button-open-modal-load-content"
);
buttonOpenModalLoadContent.addEventListener("click", openModalLoadContent);

// Fecha o modal que recebe o conteúdo
const buttonCloseModalLoadContent = document.querySelector(
  "#button-close-modal-load-content"
);
buttonCloseModalLoadContent.addEventListener("click", closeModalLoadContent);

// Botões de Navegação
const buttonPrevious = document.querySelector("#button-previous");
const buttonNext = document.querySelector("#button-next");

buttonPrevious.addEventListener("click", () => {
  goToPreviousPage();
  storeScrollSnapshot();
});
buttonNext.addEventListener("click", () => {
  goToNextPage();
  storeScrollSnapshot();
});

// Carrega as imagens das páginas
const buttonLoadPages = document.querySelector("#button-load-pages");
buttonLoadPages.addEventListener("click", async () => {
  await loadPagesImages((loadScreen = true));
  storeScrollSnapshot();
});

// Sai ou entra em tela cheia
const buttonFullscreenToggle = document.querySelector(
  "#button-fullscreen-toggle"
);
buttonFullscreenToggle.addEventListener("click", toggleFullscreenMode);

// Salva o conteúdo no localStorage e depois carrega as imagens
const formConteudo = document.querySelector("#modal-load-content form");
formConteudo.addEventListener("submit", async (event) => {
  const linkHqNow = "hq-now.com";
  const modalLoadContent = document.querySelector("#modal-load-content");
  const inputContent = document.querySelector("#modal-load-content form input");

  event.preventDefault();

  let link = inputContent.value;

  // Valida o link, alertando se não for válido
  if (!link.includes(linkHqNow)) {
    alert(`O link precisa ser do HQ Now (${linkHqNow})`);
    return;
  }

  // Mostra a tela de carregamento e fecha o modal
  showLoadScreen((message = "Extraindo conteúdo..."));
  modalLoadContent.close();

  // Ajusta o link caso o link não leve para algum capítulo ou página
  if (!link.includes("/chapter")) {
    if (link.endsWith("/")) {
      link = `${link}chapter/1/page/1`;
    } else {
      link = `${link}/chapter/1/page/1`;
    }
  } else if (!link.includes("/page/")) {
    if (link.endsWith("/")) {
      link = `${link}page/1`;
    } else {
      link = `${link}/page/1`;
    }
  }

  // Salva o conteúdo no localStorage e depois o carrega na página
  loadContent(link)
    .then(async () => {
      loadPagesImages((loadScreen = true));
    })
    .catch((error) => {
      hideLoadScreen();
      alert("Falha ao carregar o conteúdo");
    });
});

// Salva o conteúdo no localStorage
async function loadContent(link) {
  return new Promise((resolve, reject) => {
    const apiLink = "/api";

    fetch(`${apiLink}?link=${link}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP! Status: ${response.status}`);
        }
        return response.json(); // Transforma a resposta JSON do Flask
      })
      .then((data) => {
        // Carrega o conteúdo no localStorage
        localStorage.setItem("pageLinks", JSON.parse(JSON.stringify(data)));
        resolve("Conteúdo carregado com sucesso!");
      })
      .catch((error) => {
        // Falha ao carregar o conteúdo
        console.error("Error:", error);
        reject("Falha ao carregar o conteúdo.");
      });
  });
}
