# Historial del portafolio de Cristian David Miranda Garces

Documento de contexto: cómo se construyó el portafolio, qué decisiones de diseño y de lógica se tomaron, qué se hizo en seguridad y qué falta.

- **Artefacto publicado:** https://claude.ai/artifact/8uhq6xTyAUgSP1pnurVJAo (privado, solo el dueño)
- **Versión al cierre de este documento:** 55
- **Fecha:** 6 de noviembre de 2026

---

## 1. Idea general

El proyecto empezó como una réplica de un dashboard llamado "Noticeline" a partir de una captura. Después se transformó paso a paso en un **portafolio personal con temática de fútbol y análisis de datos**.

Regla de trabajo que se mantuvo todo el tiempo: el usuario pasa **imágenes de referencia solo para la estructura y el contenido**, pero el resultado siempre se dibuja **con el estilo propio del dashboard** (tipografía, colores claros, bordes finos, esquinas redondeadas). Nunca se copia el estilo de la imagen de ejemplo.

Cómo se trabajó cada parte:
1. El usuario envía una captura o un boceto dibujado.
2. Se acuerda qué se toma de él (estructura, comportamiento) y qué no (estilo).
3. Se implementa, se publica y el usuario revisa en pantalla.
4. Si no gusta, se revierte o se ajusta. Varias veces se pidió "dame ideas primero, no hagas cambios" antes de tocar nada.

---

## 2. Estructura de la página

Una sola página con una **barra lateral** y un **área principal** que cambia según la vista activa.

### Barra lateral "Portafolio"
- Colapsable (200 px abierta, 64 px cerrada).
- Navegación: **Panel**, **Acerca de mí**, **Currículum**, **Otros proyectos**.
- Tarjeta de perfil abajo: foto, nombre, "Ing de sistemas", "Data Analyst", "Córdoba - Colombia" y tres atajos: GitHub, correo (abre Gmail con el mensaje redactado) y LinkedIn.
- "Otros proyectos" tiene un mensaje emergente que aclara que son proyectos más técnicos, de análisis de datos y big data, no relacionados con el fútbol. Todavía no abre ninguna vista.

### Vistas del área principal
| Vista | Título | Contenido |
|---|---|---|
| `library` | Biblioteca de artículos | Franja de vista previa, columnas de torneos con artículos apilados, leyenda "Otros torneos" y tabla "Recent Activity" |
| `cv` | Currículum | Visor con selector Español/English y dos botones de descarga |
| `about` | Acerca de mí | Texto editorial con iconos de línea y stickers a la derecha |

---

## 3. Lógica de la Biblioteca de artículos

### Modelo de datos
- **Torneos (`T`)**: Champions, LaLiga, Premier League, Bundesliga, Serie A, Mundial, Ligue 1, Europa League, Copa y una etiqueta especial **Jugadores**. Cada uno tiene color, ícono (logo subido) y contador de artículos.
- **Artículos (`ARTICLES`)**: título, introducción, lista de etiquetas (torneos), fecha o periodo, idiomas y tipo.
- **Etiqueta Jugadores**: se refiere a un jugador concreto (por ejemplo "Lamine Yamal", sin años), puede combinarse con una etiqueta de torneo (un artículo de Raphinha puede estar en Jugadores y en LaLiga), y se ve distinta a las de torneo (contorno con ícono de persona, en vez de punto de color).

### Columnas de torneos (tipo Excel)
- Máximo **5 columnas visibles** a la vez.
- Un torneo nuevo entra **al principio** y el último de la derecha sale hacia "Otros torneos".
- Cada columna muestra el ícono, el nombre y el contador, y debajo una pila de artículos.

### Pila de artículos (estilo archivero)
- Cada artículo es una hoja inclinada (`skewY(14deg)`) apilada sobre las demás.
- Al pasar el cursor, **solo la hoja señalada sube**; las de atrás se quedan como referencia y vuelven a su sitio al quitar el cursor.
- Se ve el título, la introducción, la portada y la etiqueta. El título y la descripción asoman por encima del recuadro y la etiqueta por debajo, para que se lean también los artículos de atrás.
- Al hacer clic se abre un **panel lateral** con el artículo.
- Geometría: el sesgo baja el borde derecho cerca del 25 % del ancho, así que las tarjetas tienen ancho máximo de 220 px y la altura del cuerpo se calcula según el número de artículos (separación entre 18 y 26 px).
- La animación de subir se hace solo con CSS (`.bobber:has(.sheet:hover)`), sin JavaScript.

### Recent Activity
- Muestra solo los **5 artículos más recientes con fecha**, ordenados de más nuevo a más viejo.
- Columnas: Nombre, Periodo, Etiqueta, Publicado, Lenguajes, Tipo.
- Regla de contenido: el **nombre no lleva fechas** ("Raphinha balón de oro"); las fechas van en **Periodo** ("2026", "2024 - 2025").
- Tiene buscador en la misma línea que el título, y un punto de color junto a "Recent Activity".
- Todas las etiquetas tienen el mismo tamaño.

---

## 4. Currículum

- El visor muestra el PDF como **imagen de la página** (PNG), porque la plataforma no permite `iframe`, `embed` ni `object`.
- Selector **Español / English** que cambia entre las dos imágenes.
- Dos botones de descarga: uno para el PDF en español y otro para el PDF en inglés.
- El currículum en español viene de Canva (con foto) y el de inglés es un PDF simple.

---

## 5. Acerca de mí

- Un solo recuadro gris dentro de una tarjeta blanca.
- Encabezado "¡Hola! Soy Cristian David." y la frase de bienvenida, sin línea divisoria.
- Tres párrafos del mismo tamaño y fuente (19 px, interlineado 1.75), **todo justificado**.
- **Iconos de línea propios** (SVG) en lugar de emojis: burbuja, laptop, engranaje, balón, escudo, robot, gráfica, destello y cohete. Trazo negro con detalles rojos y el escudo en azul.
- Dos enlaces internos subrayados: "el diplomado de aprendizaje automatizado" (lleva al Currículum) y "mi trabajo" (lleva a la Biblioteca).
- **Stickers a la derecha:** el Barcelona celebrando, la Universidad de Córdoba, y los logos de R, Colombia y Python. Con borde blanco, sombra suave e inclinación para parecer pegatinas. Si la pantalla es angosta, pasan debajo del texto.

---

## 6. Diseño visual (reglas que se mantienen)

- Fondo de página gris claro (`#ececee`), tarjetas blancas con borde `#e2e2e6` y esquinas de 10 a 12 px.
- Texto principal `#18181b`, secundario `#52525b` / `#3f3f46`.
- Acentos rojos (`#e0453a`) y azul (`#3b6fd0`) muy puntuales.
- Estilo sutil: pocas sombras, transiciones suaves, nada recargado.
- Logos de torneo: los que eran blancos (**Premier League** y **Europa League**) se pasaron a gris para que se vean sobre fondo claro.
- El usuario pidió que **no haya que hacer scroll excesivo**: se probó una versión compacta sin barra, el usuario pidió volver atrás, y se dejó la versión anterior con los arreglos de errores incluidos.

---

## 7. Aspectos técnicos y errores que conviene recordar

- **Formato:** artefacto de tipo Design (`Main.dc.html`). Solo permite `{{variables}}` simples (sin expresiones), `<sc-if>` y `<sc-for>`, y no permite red salvo Google Fonts y los archivos subidos (`/_blob/...`).
- **Tabla con `<sc-for>` dentro de `<tbody>`:** el navegador la rompía y las filas salían vacías. Se resolvió con una tabla hecha de `div` (roles `table`, `row`, `cell`).
- **Hojas cortadas abajo:** dependía del ancho de pantalla; se arregló con ancho máximo y más alto de cuerpo.
- **Franja oscura debajo de la página:** se fijó el fondo de `html` y la barra lateral con `min-height:100vh`.
- **Botón de correo:** `mailto:` estaba bloqueado, así que se usa el enlace de redacción de Gmail.
- **Publicación:** si el usuario edita en la página, la publicación se rechaza; hay que leer la versión viva, combinar y volver a publicar.

---

## 8. Seguridad y datos personales

### Qué se hizo
- Se **ocultaron los últimos 4 dígitos de todos los teléfonos**: el del usuario y los de las tres referencias. Quedan visibles solo los 6 primeros.
- Aplica tanto a las **imágenes que se ven en la página** como a los **PDF descargables**.
- PDF en inglés: se modificó el texto directamente (el número real ya no existe en el archivo).
- PDF en español: como viene de Canva y no se puede editar el texto, se convirtió a imagen con los números tapados. Los dígitos ocultos **no existen** en el archivo, pero se pierde la selección de texto y los enlaces.

### Qué NO es seguro todavía
- Los **correos** del usuario y de las referencias siguen visibles.
- Cualquiera que abra la página puede ver y descargar el currículum censurado.
- Una contraseña escrita en la página **no protege de verdad**, porque se puede leer en el código y los archivos son accesibles por dirección.

### Opciones evaluadas para proteger el currículum
1. **Contraseña con cifrado real:** archivos cifrados (AES-GCM) que la página descifra en el navegador solo con la clave correcta.
2. **Versión pública sin datos sensibles:** la página muestra un currículum sin teléfono, correo personal ni datos de referencias; el completo se envía solo a quien lo pida.
3. **Botón "Solicitar currículum completo":** abre un mensaje al correo del usuario, quien decide a quién enviarlo.
4. **Acceso solo por invitación:** compartir la página únicamente con personas concretas desde el menú Compartir.

Recomendación dada: combinar la 2 y la 3 (o la 2 y la 1 si algunos deben ver el completo). Las referencias son datos de terceros, así que conviene quitarlos de la versión pública.

El artefacto está **privado**: solo el dueño puede abrirlo hasta que lo comparta.

---

## 9. Archivos y recursos

- Página principal: `project/Main.dc.html` (índice: `project/canvas.json`).
- Archivos subidos: foto de perfil, logos de torneos (10), imágenes y PDF del currículum (ES/EN), 5 stickers.
- Copias de respaldo locales: versión compacta sin scroll, versión anterior a la vista previa, script de censura de PDF y scripts de procesamiento de logos e imágenes.

---

## 10. Pendientes

1. **Decidir la protección final del currículum** (ver sección 8) y, si se elige una versión pública, pasar PDF nuevos sin correo ni datos de referencias.
2. **"Otros proyectos":** definir qué se muestra al hacer clic.
3. **Artículos reales:** reemplazar las portadas de relleno ("PORTADA"), el contenido del panel lateral ("Aquí irá el contenido del artículo") y los artículos de ejemplo. Evaluar una **base de datos** para guardar artículos y poder añadirlos sin republicar la página.
4. **Texto de Acerca de mí:** confirmar "aprendizaje automatizado" o "Aprendizaje Automático" (como figura en el currículum).
