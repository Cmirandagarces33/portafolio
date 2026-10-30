# Contexto del proyecto

Documento de referencia para cualquier chat o agente que trabaje en este proyecto. Resume lo que Cristian ha decidido. Si algo cambia, se actualiza aquí.

## Qué es y para qué sirve

- Portafolio web de **Cristian David Miranda Garcés**, Ingeniero de Sistemas (Universidad de Córdoba, 2024), con enfoque en análisis de datos y ciencia de datos aplicados al fútbol.
- **Objetivo:** conseguir trabajo. Debe mostrar cómo piensa y trabaja, más que adornos. Cristian no tiene experiencia laboral formal en datos y su nivel es básico-intermedio: lo aprendido en la universidad y un diplomado en aprendizaje automático.
- Los **artículos** son la prueba central. Cada uno nace de un cuaderno de Google Colab que Cristian hace él mismo.
- El proyecto usa IA como apoyo y eso se asume abiertamente. Lo que se publica debe seguir siendo trabajo y criterio de Cristian.
- Idioma: **español**. El inglés se verá más adelante.

## Vocabulario

- Se dice **artículo** (no "estudio" ni "revista"). El sitio no es una revista: es una página limpia y sencilla, en la línea de un portal de noticias deportivas.
- **Etiqueta:** categoría con color. Las etiquetas iniciales son Champions (azul), Liga española (rojo), Liga francesa (morado), Jugadores (negro) y Mundial (verde). Cada artículo puede tener una o varias.
- **Portada:** imagen vertical de cada artículo, en proporción **3:4**. Las hace Cristian con Gemini.

## Estructura del sitio

**Barra lateral**
- Arriba dice "Portafolio". Abajo van el nombre de Cristian y sus datos de contacto públicos.
- Menú: Overview, Acerca de mí y Currículum.
- Leyenda de etiquetas como árbol desplegable: cada etiqueta con su color y un contador. Al pulsarla se muestran debajo sus artículos, y al pulsarla otra vez se recogen. **Se pueden abrir varias a la vez.**
- Iconos con enlaces a sus redes (correo, GitHub, LinkedIn y otras por definir).

**Inicio (Overview)**
- **Muro de portadas** al centro, con disposición tipo burbuja (portadas repartidas de forma orgánica, no en cuadrícula rígida). Cada portada lleva un marco del color de su etiqueta. En pantallas pequeñas se reacomoda en columna o cuadrícula.
- Al empezar se ven **todos** los artículos. Al abrir etiquetas en la leyenda, el muro cambia y resalta solo las de esas etiquetas.
- Debajo, una **tabla de artículos recientes**, más lineal, con buscador por palabras. Columnas: nombre, etiqueta, fecha de publicación, lenguajes y tipo (análisis de datos, limpieza de datos, modelo predictivo, etc.).
- Más abajo, Acerca de mí y el currículum.

**Página de un artículo**
- Lectura en escalera: texto arriba, gráfico y código al lado, y así hacia abajo, planteando preguntas y resolviéndolas.
- Navegación para saltar entre partes (preguntas) y volver al inicio.
- Botón para **descargar el cuaderno `.ipynb`**. No se descarga el diseño del artículo.
- La limpieza de datos y la descripción de variables **no se muestran en la página**: viven solo en el cuaderno descargable.

## Diseño

- El boceto define solo la **composición y estructura**. El diseño visual (colores, tipografías, tema claro u oscuro) **todavía no está definido** y será distinto al de las referencias.
- Los gráficos serán **estáticos al inicio**. El movimiento y los gráficos interactivos vienen después, página por página.

## Privacidad

El sitio es público. El repositorio es privado, pero eso no protege lo que se publica.
- **Sí se muestra:** nombre, rol, correo y enlaces a perfiles profesionales.
- **Nunca se publica:** número de teléfono, WhatsApp, dirección de casa, número de documento ni fecha de nacimiento completa.
- **Currículum:** el PDF original contiene teléfono y los datos de contacto de tres referencias personales (terceros, incluida su madre). **No se sube ni se enlaza tal cual.** La versión pública debe quitar el teléfono y reemplazar las referencias por "Disponibles bajo solicitud". El original no se guarda en este repositorio.
- La ciudad que aparece en el currículum está **por confirmar** si se muestra o no.

## Flujo de trabajo

- Todo cambio se hace primero en `test`, se revisa en la vista previa de Cloudflare y luego pasa a `main` con un pull request que Cristian aprueba.
- Vista previa de `test`: `test-portafolio.cmirandagarces33.workers.dev`.
- `wrangler.jsonc` necesita el bloque `"previews": {}`. Sin él, la compilación de vistas previas falla.

## Primer artículo: Predicción del Mundial 2026

- Cuaderno de Colab con 72 celdas (43 de texto, 29 de código). Lee `train.csv` y `test.csv`.
- Secciones: introducción, preguntas de investigación, dataset, limpieza, ingeniería de variables, sistema de puntuación (Composite Team Score), resolución de las preguntas y predicción final.
- Predicción del modelo: campeón España, subcampeón Argentina, semifinalistas Francia e Inglaterra. Se hizo antes del torneo y se terminó después. **Pendiente:** contrastarla con el resultado real, lo que sería una buena parte del artículo.
- Los gráficos del cuaderno son sobre todo interactivos (Plotly, 8 salidas), con algo de matplotlib y seaborn. Para el artículo estático hacen falta imágenes: o se exportan desde Colab, o se vuelve a ejecutar el cuaderno con los CSV.

## Ideas para después

- **Agente redactor:** no como agente aparte, sino como un cuaderno de Proyecto para armar guiones. Cada texto debe sonar a Cristian, no a plantilla.
- **Agente revisor:** solo cuando el proceso a mano esté probado de principio a fin.
- **Lector de cuadernos:** script en Python que convierta un `.ipynb` en página de artículo. Primero se hace el primer artículo a mano.
- **Biblioteca de adquisición y trabajo con datos:** proyecto aparte, fuera de este portafolio.
- **Caveman** (plugin para respuestas cortas): descartado por ahora.
- Sin dominio propio por ahora (`workers.dev`).
