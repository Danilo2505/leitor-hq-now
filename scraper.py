from playwright.async_api import async_playwright
import json
import asyncio
import nest_asyncio
from flask import abort
from scraper_utils.chapter_scraper import *
from scraper_utils.comics_scraper import *
from pprint import pprint

# Permite rodar múltiplos loops asyncio no mesmo processo
nest_asyncio.apply()


TIMEOUT_TIME_SECONDS = 8


# Função que tenta obter um determinado conteúdo (content_to_scrape) da página (pelo link)
async def scrape_hq_now(content_to_scrape, link, timeout=TIMEOUT_TIME_SECONDS):
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
                response = []

                if content_to_scrape == "hq_now_chapter_info":
                    response = await hq_now_chapter_info(pictures_future, timeout)
                elif content_to_scrape == "hq_now_comics_info":
                    response = await hq_now_comics_info(page, timeout)
                elif content_to_scrape == "hq_now_chapter_image_links":
                    response = await hq_now_chapter_image_links(
                        pictures_future, timeout
                    )
                elif content_to_scrape == "hq_now_comics_cover_link":
                    response = await hq_now_comics_cover_link(page, timeout)

                await browser.close()

                return json.dumps(response)  # Retorna os links como JSON
            except asyncio.TimeoutError:
                # Se não recebeu os dados a tempo, fecha e tenta de novo
                await browser.close()
                attempts += 1

    # Se todas as tentativas falharem, dispara erro 500
    abort(500)


# Funçõe de teste para rodar localmente
async def test_chapter_scraping(link):
    pprint(await scrape_hq_now("hq_now_chapter_info", link))


async def test_comics_scraping(link):
    pprint(await scrape_hq_now("hq_now_comics_info", link))


# Executa o teste se o script for chamado diretamente
if __name__ == "__main__":
    import time

    a = time.time()
    chapter_link = "https://www.hq-now.com/hq-reader/32676/jovens-tit-s-mutano-2019/chapter/1/page/1"
    asyncio.run(test_chapter_scraping(chapter_link))
    b = time.time()

    comics_link = (
        "https://www.hq-now.com/hq/2969/Jovens%20Tit%C3%A3s%20-%20Mutano%20(2019)"
    )
    asyncio.run(test_comics_scraping(comics_link))
    c = time.time()

    print(f"b - a = {b - a}s")
    print(f"c - b = {c - b}s")
