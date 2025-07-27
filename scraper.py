from playwright.async_api import async_playwright
import json
import asyncio
import nest_asyncio
from flask import abort

# Permite rodar múltiplos loops asyncio no mesmo processo
nest_asyncio.apply()

# Seletor CSS que permite localizar as imagens desejadas
selector = "figure.sc-EHOje.dtyUKu > img"


# Função que processa mensagens do console do navegador
# Se encontrar uma mensagem com dados de imagens, extrai os links e os envia pelo 'pictures_future'
async def filtrar_console(msg, pictures_future):
    if msg.type != "log" or "pictures:" not in msg.text:
        return  # Ignora mensagens que não interessam

    for arg in msg.args:
        if "pictures:" not in str(arg):
            continue

        value = await arg.json_value()  # Tenta converter o argumento em JSON
        if not isinstance(value, dict):
            continue

        if value.get("type") != "LOAD_HQ_CHAPTERS":
            continue

        # Extrai os links das imagens
        pictures = value.get("pictures", [])
        urls = [item["pictureUrl"] for item in pictures]

        # Garante que só envia o resultado uma vez
        if not pictures_future.done():
            pictures_future.set_result(urls)


# Função principal que carrega a página e espera pelos links das imagens
async def main(link):
    pictures_future = asyncio.Future()  # Objeto usado para receber os dados do console
    attempts = 0
    max_attempts = 1  # Número máximo de tentativas

    while attempts < max_attempts:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()

            # Quando algo for logado no console, chama o handler passando o 'pictures_future'
            page.on("console", lambda msg: filtrar_console(msg, pictures_future))
            await page.goto(
                link, wait_until="networkidle"
            )  # Aguarda a página terminar de carregar

            try:
                # Espera até que os dados das imagens sejam recebidos (ou até o timeout)
                urls = await asyncio.wait_for(pictures_future, timeout=5)
                await browser.close()
                return json.dumps(urls)  # Retorna os links como JSON
            except asyncio.TimeoutError:
                # Se não recebeu os dados a tempo, fecha e tenta de novo
                await browser.close()
                attempts += 1

    # Se todas as tentativas falharem, dispara erro 500
    abort(500)


# Função de teste para rodar localmente
async def test(link):
    print(await main(link))


# Executa o teste se o script for chamado diretamente
if __name__ == "__main__":
    link = "https://www.hq-now.com/hq-reader/32676/jovens-tit-s-mutano-2019/chapter/1/page/1"
    asyncio.run(test(link))
