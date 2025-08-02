from main import app
from flask import render_template, request, jsonify

to_scrape_true_or_false = False

if to_scrape_true_or_false:
    import scraper


# Tratamento de erros
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({"error": "Not Found", "message": str(error)}), 404


@app.errorhandler(500)
def internal_server_error(error):
    return (
        jsonify(
            {
                "error": "Internal Server Error",
                "message": "Something went wrong on the server.",
            }
        ),
        500,
    )


# Rotas
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/reader")
def reader():
    return render_template("reader.html")


@app.route("/ola-mundo")
def ola_mundo():
    return "Olá, Mundo!"


if to_scrape_true_or_false:

    @app.route("/api")
    async def api():
        link = str(request.args.get("link", type=str, default=1))
        if link.startswith("http"):
            resposta = jsonify(f"{await scraper.scrape_chapter_image_links(link)}")
            return resposta
        else:
            return jsonify("[]")

    @app.route("/api/hq-now-image-links")
    async def api_hq_now_chapter_image_links():
        link = str(request.args.get("link", type=str, default=1))
        if not link.startswith("http"):
            return jsonify("[]")

        resposta = jsonify(
            f"{await scraper.scrape_hq_now(content_to_scrape='hq_now_chapter_image_links',  link=link)}"
        )
        return resposta

    @app.route("/api/hq-now-image-links")
    async def api_hq_now_chapter_info():
        link = str(request.args.get("link", type=str, default=1))
        if not link.startswith("http"):
            return jsonify("[]")

        resposta = jsonify(
            f"{await scraper.scrape_hq_now(content_to_scrape='hq_now_chapter_info',     link=link)}"
        )
        return resposta

    @app.route("/api/hq-now-comics-info")
    async def api_hq_now_comics_info():
        link = str(request.args.get("link", type=str, default=1))
        if not link.startswith("http"):
            return jsonify("[]")

        resposta = jsonify(
            f"{await scraper.scrape_hq_now(content_to_scrape='hq_now_comics_info',  link=link)}"
        )
        return resposta
