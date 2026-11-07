# Portafolio de Cristian David Miranda Garcés

Portafolio de Cristian David Miranda Garcés, Ingeniero de Sistemas, con enfoque en análisis de datos y ciencia de datos aplicados al fútbol. Está formado por una biblioteca de artículos por torneo, el currículum (español e inglés) y una sección "Acerca de mí".

## Estructura

```
boceto/
  Main.dc.html          Diseño de la página (HTML, CSS y lógica en un solo archivo)
  assets_manifest.json  Relación entre los ids /_blob/... del diseño y los archivos de public/assets/
public/                 Lo único que se publica
  index.html            Generado, no se edita a mano
  support.js            Runtime mínimo que pinta la plantilla en un navegador normal
  assets/               Logos, foto, stickers y currículum (PNG y PDF, ya censurados)
scripts/
  generar_index.py      Genera public/index.html desde boceto/Main.dc.html
wrangler.jsonc          Configuración de Cloudflare Workers
```

## Cómo cambiar el diseño

1. Editar `boceto/Main.dc.html`.
2. Ejecutar `python scripts/generar_index.py`.
3. Revisar el resultado en la vista previa de la rama `test`.

## Ramas y despliegue

- `main` es producción y `test` es la rama de pruebas con vista previa en Cloudflare.
- Todo cambio se hace primero en `test`. El paso a `main` es con un pull request que aprueba Cristian.

Más detalle en `CONTEXTO.md` y `Historial_Portafolio.md`.
