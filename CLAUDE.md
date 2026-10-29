# Portafolio de análisis de datos de fútbol

Portafolio de Cristian David Miranda Garcés, Ingeniero de Sistemas, sobre análisis de datos y ciencia de datos aplicados al fútbol.

## Reglas de trabajo

- **Nunca trabajar directamente en `main`.** Todo cambio se hace primero en la rama `test`.
- Cada cambio en `test` genera un enlace de vista previa en Cloudflare. El paso de `test` a `main` solo se hace cuando Cristian lo aprueba.
- Los mensajes de commit se escriben en español y explican qué cambió.
- Cristian está aprendiendo: antes de hacer un cambio grande, explicar brevemente qué se va a hacer y por qué.

## Diseño

- Estética de revista deportiva moderna, con navegación visual fluida.
- Página inicial: perfil profesional, hoja de vida, experiencia y herramientas (Python, SQL, Google Colab).
- Navegación: muro visual de portadas (cuadrícula moderna) donde cada portada es un análisis.
- Filtros interactivos por etiquetas fijas: `Equipo` (ej. PSG), `Torneo` (ej. Champions) y `Jugador` (ej. Luis Enrique).

## Despliegue

- Repositorio privado en GitHub, conectado a Cloudflare Workers.
- `main` es producción y `test` es la rama de pruebas con vista previa.

## Automatización futura

1. Origen: cuadernos de Google Colab con código, texto explicativo y gráficos.
2. Procesamiento: un script en Python que lee los archivos `.ipynb`, extrae imágenes y contenido y asigna etiquetas según el texto.
3. Salida: genera la nueva página de la revista y se despliega en Cloudflare Workers.
