// Busca um arquivo SVG e substitui a imagem <img> por ele inline no HTML
function fetchSvg(image) {
  fetch(image.src)
    .then((response) => response.text())
    .then((svgText) => {
      const container = document.createElement("span");
      container.innerHTML = svgText;

      const inlineSvg = container.getElementsByTagName("svg")[0];
      if (!inlineSvg) return;

      inlineSvg.setAttribute("id", image.id);
      inlineSvg.setAttribute("class", image.className);

      image.parentNode.replaceChild(inlineSvg, image);
    });
}

// Obtém a orientação da imagem (vertical ou horizontal) com base em sua largura e altura
async function getImageOrientation(imageUrl) {
  const image = new Image();
  image.src = imageUrl;
  await image.decode();

  if (image.width / image.height < 1) {
    return "vertical";
  } else {
    return "horizontal";
  }
}

// Espera assíncrona
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Espera assíncrona com callback
function sleepNoAwait(ms, callback) {
  setTimeout(callback, ms);
}
