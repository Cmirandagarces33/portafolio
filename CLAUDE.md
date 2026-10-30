# Portafolio de análisis de datos de fútbol

Portafolio de Cristian David Miranda Garcés, Ingeniero de Sistemas, sobre análisis de datos y ciencia de datos aplicados al fútbol. Su objetivo es conseguir trabajo.

**Antes de proponer o cambiar algo, leer `CONTEXTO.md`**: ahí están las decisiones de estructura, diseño, privacidad y vocabulario.

## Reglas de trabajo

- **Nunca trabajar directamente en `main`.** Todo cambio se hace primero en la rama `test`.
- Cada cambio en `test` genera una vista previa en Cloudflare (`test-portafolio.cmirandagarces33.workers.dev`). El paso de `test` a `main` solo se hace cuando Cristian lo aprueba, con un pull request.
- Los mensajes de commit se escriben en español y explican qué cambió.
- Cristian está aprendiendo: antes de un cambio grande, explicar brevemente qué se va a hacer y por qué.
- Los cuadernos de Colab los hace Cristian. No escribir análisis ni conclusiones por él sin que lo pida.

## Privacidad (el sitio es público)

- No publicar teléfono, WhatsApp, dirección de casa, documento de identidad ni fecha de nacimiento completa.
- No subir al repositorio el currículum original: contiene teléfono y datos de terceros (referencias). Solo se publica una versión sin esos datos.

## Vocabulario y diseño

- Se dice **artículo**, no "estudio" ni "revista".
- Estructura: barra lateral con "Portafolio" arriba y el nombre abajo, leyenda de etiquetas desplegable (varias a la vez), muro de portadas 3:4 tipo burbuja, tabla de artículos recientes con buscador, y páginas de artículo en escalera (texto, gráfico y código).
- Etiquetas con color: Champions (azul), Liga española (rojo), Liga francesa (morado), Jugadores (negro), Mundial (verde).
- El diseño visual (colores, tipografías, tema) aún no está definido. No inventarlo sin consultar.
- Gráficos estáticos al inicio. El movimiento se añade después.

## Despliegue

- Repositorio privado en GitHub, conectado a Cloudflare Workers.
- `main` es producción y `test` es la rama de pruebas con vista previa.
- `wrangler.jsonc` debe mantener el bloque `"previews": {}`.

## Automatización futura

Primero se hace el primer artículo a mano. Después se podrá escribir un script en Python que lea los `.ipynb` y genere las páginas. Los agentes (redactor, revisor) vienen después, y nunca publican solos: preparan borradores en `test`.
