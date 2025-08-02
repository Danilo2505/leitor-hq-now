// Botão para adicionar uma HQ
const buttonAddComics = document.querySelector("#button-add-comics");
buttonAddComics.addEventListener("click", () => {});

// Botão Card Anterior dos Últimos Capítulos
const previousLastChapterButton = document.querySelector(
  "#div-last-navigators > .button-previous"
);
previousLastChapterButton.addEventListener("click", () => {
  previousLastChapter();
});

// Botão Card Seguinte dos Últimos Capítulos
const nextLastChapterButton = document.querySelector(
  "#div-last-navigators > .button-next"
);
nextLastChapterButton.addEventListener("click", () => {
  nextLastChapter();
});

const previousCommicsCardsButtons = document.querySelectorAll(
  ".section-commics-cards .button-previous"
);
previousCommicsCardsButtons.forEach((element) => {
  element.addEventListener("click", () => {
    previousCommicsCards(
      element.parentElement.querySelector(".ul-cards-collection")
    );
  });
});

const nextCommicsCardsButtons = document.querySelectorAll(
  ".section-commics-cards .button-next"
);
nextCommicsCardsButtons.forEach((element) => {
  element.addEventListener("click", () => {
    nextCommicsCards(
      element.parentElement.querySelector(".ul-cards-collection")
    );
  });
});

//lastChaptersAutoScrolling(2000);
lastChaptersAutoScrolling(10000);
