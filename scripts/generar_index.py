"""Genera public/index.html a partir de boceto/Main.dc.html.

- Cambia las rutas /_blob/<id> del artefacto por las rutas locales de public/assets/
  (según boceto/assets_manifest.json).
- Apunta a support.js, el runtime mínimo que hace funcionar el boceto en un navegador.

Uso (desde la raíz del repositorio):
    python scripts/generar_index.py
"""
import json
import pathlib
import re

raiz = pathlib.Path(__file__).resolve().parent.parent
manifiesto = json.loads((raiz / "boceto/assets_manifest.json").read_text(encoding="utf-8"))
html = (raiz / "boceto/Main.dc.html").read_text(encoding="utf-8")

for blob_id, ruta in manifiesto.items():
    html = html.replace(f"/_blob/{blob_id}", ruta)

restos = re.findall(r"/_blob/[0-9a-f]+", html)
if restos:
    raise SystemExit(f"Quedan rutas sin traducir: {sorted(set(restos))}")

# Las imágenes cuyo src es una variable ({{c.logo}}) se marcan con data-dc-src para que
# el navegador no pida un archivo inexistente antes de que support.js las rellene.
html = html.replace('<img src="{{', '<img data-dc-src="{{')

html = html.replace('src="./support.js"', 'src="support.js"')
html = html.replace('<html lang="en">', '<html lang="es">', 1)
html = html.replace("<title>Portafolio Panel</title>",
                    "<title>Portafolio · Cristian David Miranda Garces</title>", 1)

(raiz / "public/index.html").write_text(html, encoding="utf-8")
print("Listo: public/index.html")
