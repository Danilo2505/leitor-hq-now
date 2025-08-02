import asyncio


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


async def hq_now_chapter_image_links(pictures_future, timeout):
    # Espera até que os dados das imagens sejam recebidos (ou até o     timeout)
    response = await asyncio.wait_for(pictures_future, timeout=timeout * 1000)

    return response


async def hq_now_chapter_info(pictures_future, timeout):
    response = {}

    response.update(
        {"links": await hq_now_chapter_image_links(pictures_future, timeout)}
    )

    return response
