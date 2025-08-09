function getCurrentLastChapterPageIndex() {
  const ulLastChapters = document.querySelector("#ul-last-chapters");
  const elementScrollX = ulLastChapters.querySelector("*").scrollWidth;
  const currentScrollX = ulLastChapters.scrollLeft;

  if (currentScrollX != 0) {
    return Math.round(
      currentScrollX / // Largura atual do scroll da ul
        elementScrollX // Largura dos elementos da ul
    );
  } else {
    return 0;
  }
}

function activateNavigationButtons(parentElement) {
  const buttonNext = parentElement.querySelector("button.button-next");
  const buttonPrevious = parentElement.querySelector("button.button-previous");

  buttonNext.classList.remove("inactive-button");
  buttonNext.disabled = false;

  buttonPrevious.classList.remove("inactive-button");
  buttonPrevious.disabled = false;
}

function deactivateNavigationButtons(parentElement) {
  const buttonNext = parentElement.querySelector("button.button-next");
  const buttonPrevious = parentElement.querySelector("button.button-previous");

  buttonNext.classList.add("inactive-button");
  buttonNext.disabled = true;

  buttonPrevious.classList.add("inactive-button");
  buttonPrevious.disabled = true;
}

function updateNavigationButtonsState(parentElement) {
  console.log(parentElement.querySelector(".ul-cards-collection"));
  const element = parentElement.querySelector(".ul-cards-collection");
  const elementWidth = element?.clientWidth || 0;
  const scrollLeft = element.scrollLeft;
  const maxScroll = element.scrollWidth;

  console.log(elementWidth);
  console.log(scrollLeft);
  console.log(maxScroll);

  if (scrollLeft === 0) {
    deactivateNavigationButtons(parentElement);
    const buttonNext = parentElement.querySelector("button.button-next");
    buttonNext.classList.remove("inactive-button");
    buttonNext.disabled = false;
  } else if (scrollLeft >= maxScroll - elementWidth) {
    deactivateNavigationButtons(parentElement);
    const buttonPrevious = parentElement.querySelector(
      "button.button-previous"
    );
    buttonPrevious.classList.remove("inactive-button");
    buttonPrevious.disabled = false;
  } else {
    activateNavigationButtons(parentElement);
  }
}

async function previousCommicsCards(
  element,
  duration = 1.8,
  ease = "sine.out"
) {
  const scrollStep = element.offsetWidth;
  const currentScroll = element.scrollLeft;
  const finalScroll = Math.floor(currentScroll / scrollStep) - scrollStep;

  // Desativa scroll-snap temporariamente para evitar conflitos
  element.style.scrollSnapType = "none";

  // Desativa os botões de navegação apra evitar problemas na animação
  deactivateNavigationButtons(element.parentElement);

  gsap.to(element, {
    scrollLeft: finalScroll,
    duration: duration,
    ease: ease,
    onComplete: () => {
      // Atualiza o estado dos botões de navegação
      updateNavigationButtonsState(element.parentElement);
      // Reativa scroll-snap
      element.style.scrollSnapType = "x mandatory";
      // Atualiza o indicador
      updateLastChaptersIndicators();
    },
  });
}

async function nextCommicsCards(element, duration = 1.8, ease = "sine.out") {
  const scrollStep = element.offsetWidth;
  const currentScroll = element.scrollLeft;
  const finalScroll = Math.floor(currentScroll / scrollStep) + scrollStep;

  // Desativa scroll-snap temporariamente para evitar conflitos
  element.style.scrollSnapType = "none";

  // Desativa os botões de navegação apra evitar problemas na animação
  deactivateNavigationButtons(element.parentElement);

  gsap.to(element, {
    scrollLeft: finalScroll,
    duration: duration,
    ease: ease,
    onComplete: () => {
      // Atualiza o estado dos botões de navegação
      updateNavigationButtonsState(element.parentElement);
      // Reativa scroll-snap
      element.style.scrollSnapType = "x mandatory";
      // Atualiza o indicador
      updateLastChaptersIndicators();
    },
  });
}

function updateLastChaptersIndicators() {
  const currentIndex = getCurrentLastChapterPageIndex();

  const indicators = document.querySelectorAll(
    "#div-last-chapters-indicators > *"
  );

  indicators.forEach((indicator) => {
    indicator.classList.remove("active-pagination-indicator");

    if (indicator.getAttribute("index") == currentIndex) {
      indicator.classList.add("active-pagination-indicator");
    }
  });
}

async function previousLastChapter(duration = 1.5, ease = "sine.out") {
  const ul = document.querySelector("#ul-last-chapters");
  const firstItem = ul.children[0];
  const lastItem = ul.children[ul.children.length - 1];
  if (!firstItem || !lastItem) return;

  const scrollStep = firstItem.offsetWidth;
  const currentScroll = ul.scrollLeft;

  // Desativa scroll-snap temporariamente para evitar conflitos
  ul.style.scrollSnapType = "none";

  // Desativa os botões de navegação apra evitar problemas na animação
  deactivateNavigationButtons(
    ul.parentElement.querySelector("#div-last-navigators")
  );

  if (currentScroll === 0) {
    // Clona o último item e coloca no início
    const clone = lastItem.cloneNode(true);
    ul.insertBefore(clone, firstItem);
    // Scrolla instantaneamente para a posição do clone (1 item à frente do zero)
    ul.scrollLeft = scrollStep;
    // Anima de scrollStep até 0 (onde está o clone)
    gsap.to(ul, {
      scrollLeft: 0,
      duration: duration,
      ease: ease,
      onComplete: () => {
        // Após a animação, scrolla instantaneamente para o último item real
        ul.removeChild(clone);
        ul.scrollLeft = ul.scrollWidth - ul.clientWidth;
        ul.style.scrollSnapType = "x mandatory"; // Reativa scroll-snap
        updateLastChaptersIndicators(); // Atualiza o indicador
        // Ativa os botões de navegação
        activateNavigationButtons(
          ul.parentElement.querySelector("#div-last-navigators")
        );
      },
    });
  } else {
    // Scroll normal para trás
    const finalScroll = currentScroll - scrollStep;

    gsap.to(ul, {
      scrollLeft: finalScroll,
      duration: duration,
      ease: ease,
      onComplete: () => {
        ul.style.scrollSnapType = "x mandatory"; // Reativa scroll-snap
        updateLastChaptersIndicators(); // Atualiza o indicador
        // Ativa os botões de navegação
        activateNavigationButtons(
          ul.parentElement.querySelector("#div-last-navigators")
        );
      },
    });
  }
}

async function nextLastChapter(duration = 1.5, ease = "sine.out") {
  const ul = document.querySelector("#ul-last-chapters");
  const firstItem = ul.children[0];
  if (!firstItem) return;

  const scrollStep = firstItem.offsetWidth;
  const currentScroll = ul.scrollLeft;
  const maxScroll = ul.scrollWidth - ul.clientWidth;
  const nextScroll = currentScroll + scrollStep;

  // Desativa scroll-snap temporariamente para evitar conflitos
  ul.style.scrollSnapType = "none";

  // Desativa os botões de navegação apra evitar problemas na animação
  deactivateNavigationButtons(
    ul.parentElement.querySelector("#div-last-navigators")
  );

  // Se for o último item (ou passou dele)
  if (nextScroll > maxScroll) {
    const clone = firstItem.cloneNode(true);
    ul.appendChild(clone);

    const newMaxScroll = ul.scrollWidth - ul.clientWidth;

    // Anima até o clone
    gsap.to(ul, {
      scrollLeft: newMaxScroll,
      duration: duration,
      ease: ease,
      onComplete: () => {
        // Volta instantaneamente para o primeiro item real
        ul.scrollLeft = 0;
        // Remove o clone
        ul.removeChild(clone);
        ul.style.scrollSnapType = "x mandatory"; // Reativa scroll-snap
        updateLastChaptersIndicators(); // Atualiza o indicador
        // Ativa os botões de navegação
        activateNavigationButtons(
          ul.parentElement.querySelector("#div-last-navigators")
        );
      },
    });
  } else {
    // Apenas avança normalmente
    gsap.to(ul, {
      scrollLeft: nextScroll,
      duration: duration,
      ease: ease,
      onComplete: () => {
        ul.style.scrollSnapType = "x mandatory"; // Reativa scroll-snap
        updateLastChaptersIndicators(); // Atualiza o indicador
        // Ativa os botões de navegação
        activateNavigationButtons(
          ul.parentElement.querySelector("#div-last-navigators")
        );
      },
    });
  }
}

async function lastChaptersAutoScrolling(waitTimeMS = 10000) {
  let timeoutId = null;

  function startTimer() {
    // console.log("Iniciando o Timer...");
    if (timeoutId) return; // se já está rodando, não faz nada
    timeoutId = setTimeout(() => {
      nextLastChapter();
      timeoutId = null;
      startTimer(); // reinicia o timer para continuar o loop
    }, waitTimeMS);
  }

  function pauseTimer() {
    // console.log("Pausando o Timer...");
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  function resetTimer() {
    // console.log("Reiniciando o Timer...");
    pauseTimer();
    startTimer();
  }

  const ul = document.querySelector("#ul-last-chapters");
  // Pausa quando o mouse entra no elemento
  ul.addEventListener("mouseenter", pauseTimer);
  // Retoma quando o mouse sai do elemento
  ul.addEventListener("mouseleave", startTimer);
  // Reinicia o timer quando houver click em algum botão de navegação
  ul.parentElement
    .querySelectorAll("#div-last-navigators > button")
    .forEach((element) => {
      element.addEventListener("click", resetTimer);
    });

  // Começa o timer
  startTimer();

  // Retorna funções para controle externo, se quiser
  return { startTimer, pauseTimer, resetTimer };
}
