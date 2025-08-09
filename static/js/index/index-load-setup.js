// Executa configurações iniciais da interface
async function setupPage() {
  showLoadScreen();

  const ulCardsCollections = document.querySelectorAll(
    ".section-commics-cards .ul-cards-collection"
  );

  ulCardsCollections.forEach((element) => {
    updateNavigationButtonsState(element.parentElement);
  });

  await sleep(100);

  try {
    hideLoadScreen();
  } catch (e) {
    console.error(e);
  }
}

setupPage();
