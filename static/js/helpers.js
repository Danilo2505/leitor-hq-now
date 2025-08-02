// Substitui uma <img> com SVG externo por um SVG inline no DOM
function fetchSvg(image) {
  fetch(image.src)
    .then((response) => response.text())
    .then((svgText) => {
      const container = document.createElement("span");
      container.innerHTML = svgText;

      const inlineSvg = container.querySelector("svg");
      if (!inlineSvg) return;

      // Preserva o id e as classes da <img> original
      inlineSvg.id = image.id;
      inlineSvg.classList = image.classList;

      image.parentNode.replaceChild(inlineSvg, image);
    });
}

// Verifica se uma imagem é vertical (retorna true) ou horizontal (retorna false)
async function isVerticalImage(imageUrl) {
  const image = new Image();
  image.src = imageUrl;

  await image.decode(); // Aguarda o carregamento da imagem

  return image.width / image.height < 1;
}

// Retorna uma promessa que resolve após 'ms' milissegundos (usado com await)
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Executa uma função após 'ms' milissegundos (sem await)
function sleepNoAwait(ms, callback) {
  setTimeout(callback, ms);
}

// Retorna a altura visível da janela (considera zoom e teclado virtual)
function getVisibleHeight() {
  return window.visualViewport?.height ?? window.innerHeight;
}
