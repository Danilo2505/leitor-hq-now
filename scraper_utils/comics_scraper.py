async def hq_now_comics_cover_link(page, timeout):
    # Seletor CSS que permite localizar as imagens desejadas
    selector = "figure.sc-EHOje.fyTHWq > img"
    # Espera a imagem
    await page.wait_for_selector(selector, timeout=timeout * 1000)
    # Obtém a imagem e seu link
    img = page.locator(selector)
    response = await img.get_attribute("src", timeout=timeout * 1000)

    return response


async def hq_now_comics_title(page, timeout):
    # Seletor CSS que permite localizar as imagens desejadas
    selector = "article.sc-cSHVUG.efbTw > section > h1"
    # Espera a imagem
    await page.wait_for_selector(selector, timeout=timeout * 1000)
    # Obtém a imagem e seu link
    h1 = page.locator(selector)
    response = await h1.text_content()
    response = response.replace(r"\r", "")

    return response


async def hq_now_comics_description(page, timeout):
    # Seletor CSS que permite localizar as imagens desejadas
    selector = "article.sc-cSHVUG.efbTw > section > p"
    # Espera a imagem
    await page.wait_for_selector(selector, timeout=timeout * 1000)
    # Obtém a imagem e seu link
    p = page.locator(selector)
    response = await p.text_content()

    return response


async def hq_now_comics_publisher(page, timeout):
    # Seletor CSS que permite localizar as imagens desejadas
    selector = "div.publisher > a"
    # Espera a imagem
    await page.wait_for_selector(selector, timeout=timeout * 1000)
    # Obtém a imagem e seu link
    a = page.locator(selector)
    response = await a.text_content()

    return response


async def hq_now_comics_status(page, timeout):
    # Seletor CSS que permite localizar as imagens desejadas
    selector = "div.status"
    # Espera a imagem
    await page.wait_for_selector(selector, timeout=timeout * 1000)
    # Obtém a imagem e seu link
    a = page.locator(selector)
    response = await a.text_content()

    return response


async def hq_now_comics_views(page, timeout):
    # Seletor CSS que permite localizar as imagens desejadas
    selector = "div.views"
    # Espera a imagem
    await page.wait_for_selector(selector, timeout=timeout * 1000)
    # Obtém a imagem e seu link
    a = page.locator(selector)
    response = await a.text_content()

    return response


async def hq_now_comics_info(page, timeout):
    response = {}

    response.update(
        {
            "cover_link": await hq_now_comics_cover_link(page, timeout),
            "description": await hq_now_comics_description(page, timeout),
            "publisher": await hq_now_comics_publisher(page, timeout),
            "status": await hq_now_comics_status(page, timeout),
            "title": await hq_now_comics_title(page, timeout),
            "views": await hq_now_comics_views(page, timeout),
        }
    )

    return response
