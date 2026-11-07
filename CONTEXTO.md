# Contexto del proyecto

Documento de referencia para cualquier chat o agente que trabaje en este proyecto. Resume lo que Cristian ha decidido. Si algo cambia, se actualiza aquí.

**Diseño y estructura de la página:** están en `Historial_Portafolio.md`, que cuenta cómo se construyó el boceto. Este documento no repite el diseño.

## Qué es y para qué sirve

- Portafolio web de **Cristian David Miranda Garcés**, Ingeniero de Sistemas (Universidad de Córdoba, 2024), con enfoque en análisis de datos y ciencia de datos aplicados al fútbol.
- **Objetivo:** conseguir trabajo. Debe mostrar cómo piensa y trabaja, más que adornos. Cristian no tiene experiencia laboral formal en datos y su nivel es básico-intermedio: lo aprendido en la universidad y un diplomado en aprendizaje automático.
- Los **artículos** son la prueba central. Cada uno nace de un cuaderno de Google Colab que Cristian hace él mismo.
- El proyecto usa IA como apoyo y eso se asume abiertamente. Lo que se publica debe seguir siendo trabajo y criterio de Cristian.
- Idioma de la página: **español**. El currículum existe en español y en inglés.
- Se dice **artículo**, no "estudio" ni "revista".

## Privacidad

El sitio es público. El repositorio es privado, pero eso no protege lo que se publica.
- **Sí se muestra:** nombre, foto, rol, ciudad, correo y enlaces a perfiles profesionales (GitHub, LinkedIn).
- **Nunca se publica:** número de teléfono completo (solo se ven los 6 primeros dígitos, como en el boceto), WhatsApp, dirección de casa, número de documento ni fecha de nacimiento completa.
- **Currículum (decisión de Cristian, 6 de noviembre de 2026):** se publica el currículum del boceto tal cual: teléfonos con los últimos 4 dígitos tapados y correos de las referencias visibles. Cristian asume esta decisión. Las referencias son terceras personas: si alguna pide que se retire su dato, se quita.
- El currículum original sin censurar nunca se guarda en este repositorio. Solo se usan los archivos ya censurados del boceto.

## Flujo de trabajo

- Todo cambio se hace primero en `test`, se revisa en la vista previa de Cloudflare y luego pasa a `main` con un pull request que Cristian aprueba.
- Vista previa de `test`: `test-portafolio.cmirandagarces33.workers.dev`.
- Producción (`main`): `portafolio.cmirandagarces33.workers.dev`.
- `wrangler.jsonc` necesita el bloque `"previews": {}`. Sin él, la compilación de vistas previas falla.
- El contenido de `public/` es lo que se publica. Todo lo demás del repositorio no se sirve.

## Estado del repositorio

- **El boceto ya está reconstruido** y funciona en un navegador normal (rama `test`). Lo que hay:
  - `boceto/Main.dc.html`: el original del boceto, sin cambios (formato Design Component de Claude).
  - `boceto/assets_manifest.json`: relaciona los ids `/_blob/...` del artefacto con los archivos de `public/assets/`.
  - `public/support.js`: runtime mínimo que reemplaza al de la plataforma (no venía en el zip). Pinta la plantilla (`sc-if`, `sc-for`, `{{variables}}`) y actualiza solo lo que cambia.
  - `scripts/generar_index.py`: genera `public/index.html` desde `boceto/Main.dc.html`. **`public/index.html` no se edita a mano.**
  - `public/assets/`: logos, foto, stickers y currículum (PNG y PDF, ya censurados).
- **Cómo cambiar el diseño:** se edita `boceto/Main.dc.html` (o se reemplaza por una nueva exportación del artefacto) y se corre `python scripts/generar_index.py`.
- Detalle heredado del boceto: la barra lateral declara `flex:0 0 {{sideFlex}}` con un valor que ya trae `0 0 200px`, lo que resulta en CSS inválido. Por eso su ancho depende del contenido (unos 223 px abierta y 61 px recogida) y no es 200/64 como dice el historial. Se dejó igual para que quede idéntico. Si se quiere 200/64, se corrige en `boceto/Main.dc.html`.
- El boceto no está optimizado para celular (hay desplazamiento horizontal en pantallas angostas).
- Los datos de artículos y etiquetas están dentro de `boceto/Main.dc.html` (listas `T` y `ARTICLES`). Más adelante se pasarán a un JSON aparte, que podrá escribir el lector de cuadernos.
- El `.zip` original no se guarda en el repositorio.

## Primer artículo: Predicción del Mundial 2026

- Cuaderno de Colab con 72 celdas (43 de texto, 29 de código). Lee `train.csv` y `test.csv`.
- Secciones: introducción, preguntas de investigación, dataset, limpieza, ingeniería de variables, sistema de puntuación (Composite Team Score), resolución de las preguntas y predicción final.
- Predicción del modelo: campeón España, subcampeón Argentina, semifinalistas Francia e Inglaterra. Se hizo antes del torneo y se terminó después. **Pendiente:** contrastarla con el resultado real, lo que sería una buena parte del artículo.
- Los gráficos del cuaderno son sobre todo interactivos (Plotly, 8 salidas), con algo de matplotlib y seaborn. Para el artículo estático hacen falta imágenes: o se exportan desde Colab, o se vuelve a ejecutar el cuaderno con los CSV.
- En la página, la limpieza de datos y la descripción de variables no se muestran. Viven en el cuaderno `.ipynb` descargable.

## Ideas para después

- **Agente redactor:** no como agente aparte, sino como un cuaderno de Proyecto para armar guiones. Cada texto debe sonar a Cristian, no a plantilla.
- **Agente revisor:** solo cuando el proceso a mano esté probado de principio a fin.
- **Lector de cuadernos:** script en Python que convierta un `.ipynb` en página de artículo. Primero se hace el primer artículo a mano.
- **Biblioteca de adquisición y trabajo con datos:** proyecto aparte, fuera de este portafolio.
- **Caveman** (plugin para respuestas cortas): descartado por ahora.
- Sin dominio propio por ahora (`workers.dev`).
