<p align="center"><img src="assets/logo.svg" width="96" alt="Mac Block Builder"></p>

<h1 align="center">Mac Block Builder</h1>

<p align="center">Constructor visual de bloques estilo ventana macOS.<br>Edita contenido, colores y bloques anidados, y exporta HTML con <b>estilos en línea</b>.</p>

<p align="center"><a href="https://annthoq.github.io/NOMBRE-DEL-REPO/">Ver demo</a> · <a href="https://github.com/AnnthoQ">Perfil del autor</a></p>

## Características

- **Ventanas:** añadir, duplicar, eliminar y reordenar.
- **Texto enriquecido:** negrita, cursiva, subrayado, tachado, alineación, tamaño, fuente, color, resaltado, listas, enlaces, imágenes y tablas.
- **Bloques internos:** cajas anidadas con su propio fondo, borde, color de texto, relleno y sombra.
- **Panel de propiedades:** fondo, borde, redondeo, relleno, ancho, alto, sombra, barra y color de cada punto.
- **Temas rápidos:** Lavanda, Noche, Menta, Atardecer, Océano y Mono.
- **Animación de los puntos:** parpadeo en bucle por ventana, con duración y desfase ajustables.
- **Historial del lienzo** (deshacer y rehacer) y **guardado automático** en el navegador.
- **Vista responsive:** completa, tablet (768 px) y móvil (390 px).
- **Exportar e importar:** copia o descarga el código, y guarda o abre proyectos en `.json`.
- **Tema claro y oscuro** de la interfaz.

## Estructura

```
mac-block-builder/
├── index.html        # Estructura de la interfaz
├── css/styles.css    # Estilos
├── js/app.js         # Lógica del editor
├── assets/logo.svg   # Logo y favicon
├── LICENSE
└── README.md
```

## Uso local

Abre `index.html` en tu navegador. No requiere instalación ni dependencias.

## Publicar en GitHub Pages

1. Sube el contenido de la carpeta a tu repositorio.
2. Ve a **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
4. Guarda y espera un minuto. Tu sitio quedará en `https://annthoq.github.io/NOMBRE-DEL-REPO/`.

## Código exportado

El código exportado no usa `<style>`: todo va en estilos en línea, y el parpadeo de los puntos se inicia con un pequeño `<img onload>`. Así funciona en editores que eliminan etiquetas `<style>`. Si tu editor también elimina los atributos `on…`, la animación no se verá, pero el diseño se mantiene.

## Autor

Hecho por [@AnnthoQ](https://github.com/AnnthoQ).

## Licencia

[MIT](LICENSE)
