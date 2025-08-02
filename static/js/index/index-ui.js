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

function previousLastChapter(duration = 1.5, ease = "sine.out") {
  const ul = document.querySelector("#ul-last-chapters");
  const firstItem = ul.children[0];
  const lastItem = ul.children[ul.children.length - 1];
  if (!firstItem || !lastItem) return;

  const scrollStep = firstItem.offsetWidth;
  const currentScroll = ul.scrollLeft;

  // Desativa scroll-snap temporariamente para evitar conflitos
  ul.style.scrollSnapType = "none";

  if (currentScroll === 0) {
    // 1. Clonar o último item e colocar no início
    const clone = lastItem.cloneNode(true);
    ul.insertBefore(clone, firstItem);

    // 2. Scrollar instantaneamente para a posição do clone (1 item à frente do zero)
    ul.scrollLeft = scrollStep;

    // 3. Animar de scrollStep até 0 (onde está o clone)
    gsap.to(ul, {
      scrollLeft: 0,
      duration: duration,
      ease: ease,
      onComplete: () => {
        // 4. Após a animação, scrolla instantaneamente para o último item real
        ul.removeChild(clone);
        ul.scrollLeft = ul.scrollWidth - ul.clientWidth;

        // 5. Reativa scroll-snap
        ul.style.scrollSnapType = "x mandatory";

        // 6. Atualiza indicador
        updateLastChaptersIndicators();
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
        ul.style.scrollSnapType = "x mandatory";
        updateLastChaptersIndicators();
      },
    });
  }
}

function nextLastChapter(duration = 1.5, ease = "sine.out") {
  const ul = document.querySelector("#ul-last-chapters");
  const firstItem = ul.children[0];
  if (!firstItem) return;

  const scrollStep = firstItem.offsetWidth;
  const currentScroll = ul.scrollLeft;
  const maxScroll = ul.scrollWidth - ul.clientWidth;
  const nextScroll = currentScroll + scrollStep;

  // Desativa scroll-snap temporariamente para evitar conflitos
  ul.style.scrollSnapType = "none";

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
        // Reativa scroll-snap
        ul.style.scrollSnapType = "x mandatory";
        updateLastChaptersIndicators();
      },
    });
  } else {
    // Apenas avança normalmente
    gsap.to(ul, {
      scrollLeft: nextScroll,
      duration: duration,
      ease: ease,
      onComplete: () => {
        ul.style.scrollSnapType = "x mandatory";
        updateLastChaptersIndicators();
      },
    });
  }
}

async function lastChaptersAutoScrolling(waitTimeMS = 5000) {
  await sleep(waitTimeMS);

  while (true) {
    nextLastChapter();
    await sleep(waitTimeMS);
  }
}

function previousCommicsCards(element, duration = 1.5, ease = "sine.out") {
  const scrollStep = element.offsetWidth;
  const currentScroll = element.scrollLeft;
  const finalScroll = Math.floor(currentScroll / scrollStep) - scrollStep;

  // Desativa scroll-snap temporariamente para evitar conflitos
  element.style.scrollSnapType = "none";

  gsap.to(element, {
    scrollLeft: finalScroll,
    duration: duration,
    ease: ease,
    onComplete: () => {
      // Reativa scroll-snap
      element.style.scrollSnapType = "x mandatory";
      // Atualiza o indicador
      updateLastChaptersIndicators();
    },
  });
}

function nextCommicsCards(element, duration = 1.5, ease = "sine.out") {
  const scrollStep = element.offsetWidth;
  const currentScroll = element.scrollLeft;
  const finalScroll = Math.floor(currentScroll / scrollStep) + scrollStep;

  // Desativa scroll-snap temporariamente para evitar conflitos
  element.style.scrollSnapType = "none";

  gsap.to(element, {
    scrollLeft: finalScroll,
    duration: duration,
    ease: ease,
    onComplete: () => {
      // Reativa scroll-snap
      element.style.scrollSnapType = "x mandatory";
      // Atualiza o indicador
      updateLastChaptersIndicators();
    },
  });
}
