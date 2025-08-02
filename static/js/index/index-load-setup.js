// Executa configurações iniciais da interface
async function setupPage() {
  showLoadScreen();

  await sleep(100);

  try {
    hideLoadScreen();
  } catch (e) {
    console.error(e);
  }
}

setupPage();
