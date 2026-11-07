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
- **Sí se muestra:** nombre, rol, ciudad (Cereté, Córdoba), correo y enlaces a perfiles profesionales.
- **Nunca se publica:** número de teléfono completo, WhatsApp, dirección de casa, número de documento ni fecha de nacimiento completa.
- **Currículum:** el PDF original contiene el teléfono de Cristian y los datos de contacto de tres referencias personales (terceros, incluida su madre). Esos datos no deben quedar expuestos.
- **Por decidir:** según el historial, el boceto actual deja visibles los primeros 6 dígitos de los teléfonos y los correos, tanto de Cristian como de sus referencias, y el currículum censurado es descargable por cualquiera. Esto contradice la regla anterior y falta decidirlo (ver las opciones en `Historial_Portafolio.md`, sección 8).
- Los currículums originales no se guardan en este repositorio.

## Flujo de trabajo

- Todo cambio se hace primero en `test`, se revisa en la vista previa de Cloudflare y luego pasa a `main` con un pull request que Cristian aprueba.
- Vista previa de `test`: `test-portafolio.cmirandagarces33.workers.dev`.
- Producción (`main`): `portafolio.cmirandagarces33.workers.dev`.
- `wrangler.jsonc` necesita el bloque `"previews": {}`. Sin él, la compilación de vistas previas falla.
- El contenido de `public/` es lo que se publica. Todo lo demás del repositorio no se sirve.

## Estado del repositorio

- `public/index.html`, `public/styles.css` y `public/app.js` son una **maqueta provisional** de estructura, con contenido de ejemplo. Será reemplazada por el boceto que Cristian entregará en un `.zip`.
- El boceto se construyó como un artefacto de Claude Design (formato propio de esa plataforma). Al recibir el `.zip` hay que definir cómo se convierte en un sitio estático normal que Cloudflare pueda servir.

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
