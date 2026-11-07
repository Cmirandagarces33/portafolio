# Portafolio de análisis de datos de fútbol

Portafolio de Cristian David Miranda Garcés, Ingeniero de Sistemas, sobre análisis de datos y ciencia de datos aplicados al fútbol. Su objetivo es conseguir trabajo.

**Antes de proponer o cambiar algo, leer `CONTEXTO.md`** (objetivo, privacidad, flujo y estado) **y `Historial_Portafolio.md`** (cómo se construyó el boceto: estructura, lógica y reglas de diseño de la página).

## Reglas de trabajo

- **Nunca trabajar directamente en `main`.** Todo cambio se hace primero en la rama `test`.
- Cada cambio en `test` genera una vista previa en Cloudflare (`test-portafolio.cmirandagarces33.workers.dev`). El paso de `test` a `main` solo se hace cuando Cristian lo aprueba, con un pull request.
- Los mensajes de commit se escriben en español y explican qué cambió.
- Cristian está aprendiendo: antes de un cambio grande, explicar brevemente qué se va a hacer y por qué.
- Los cuadernos de Colab los hace Cristian. No escribir análisis ni conclusiones por él sin que lo pida.

## Privacidad (el sitio es público)

- No publicar teléfono completo (solo los 6 primeros dígitos, como en el boceto), WhatsApp, dirección de casa, documento de identidad ni fecha de nacimiento completa.
- El currículum del boceto se publica tal cual (teléfonos parciales y correos de referencias visibles): es decisión de Cristian. Ver `CONTEXTO.md`.
- No subir al repositorio el currículum original sin censurar.

## Diseño

- El diseño y la estructura de la página salen del boceto de Cristian, descrito en `Historial_Portafolio.md`. No inventar colores, tipografías ni estructura que no estén ahí, y consultar ante cualquier duda.
- Se dice **artículo**, no "estudio" ni "revista".
- Gráficos estáticos al inicio. El movimiento se añade después.

## Despliegue

- Repositorio privado en GitHub, conectado a Cloudflare Workers.
- `main` es producción y `test` es la rama de pruebas con vista previa.
- `wrangler.jsonc` debe mantener el bloque `"previews": {}`.
- Solo el contenido de `public/` se publica.

## Automatización futura

Primero se hace el primer artículo a mano. Después se podrá escribir un script en Python que lea los `.ipynb` y genere las páginas. Los agentes (redactor, revisor) vienen después, y nunca publican solos: preparan borradores en `test`.
