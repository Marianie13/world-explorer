# ACTIVIDAD 4. Taller "creación de una aplicación web"

**Hecho por:** Sergio Andres Silva y Marianie Vasquez

# World Explorer

World Explorer es una Single Page Application (SPA) en JavaScript vanilla que consume la API pública de RestCountries para explorar información de países del mundo con búsqueda, filtros, ordenamiento y vista detallada en modal.

## Enlaces del proyecto

- Repositorio (código fuente): https://github.com/Marianie13/world-explorer
- Despliegue principal (Render): https://world-explorer-fovv.onrender.com
- Despliegue (GitHub Pages): https://Marianie13.github.io/world-explorer/

## Tecnologías usadas

- HTML5
- CSS3
- JavaScript (ES6+, vanilla)
- API pública [RestCountries](https://restcountries.com/)
- Google Fonts (Playfair Display y DM Sans)

## Ejecutar localmente

1. Descarga o clona este proyecto.
2. Abre el archivo `index.html` directamente en tu navegador.

No se requiere Node.js, npm, frameworks ni bundlers.

## Despliegue en Render (recomendado para este proyecto)

Este proyecto es **100% estático**. En Render debes crear un **Static Site** (no un Web Service de Node), para que sirva `index.html` desde la raíz.

1. En Render, crea un servicio **Static Site** y conéctalo al repositorio.
2. **Root Directory**: `.` (raíz del repo).
3. **Build Command**: déjalo vacío o usa `true` (no hay build).
4. **Publish Directory**: `.` (misma raíz; ahí están `index.html`, `styles.css` y `app.js`).
5. Despliega y espera a que termine el deploy.

Si ves **404 Not Found** en la URL de Render, casi siempre es porque el servicio quedó como **Node Web Service** o el **Publish Directory** no apunta a la carpeta donde está `index.html`.

Opcional: este repo incluye `render.yaml` para que Render detecte la configuración como sitio estático.

## Despliegue en GitHub Pages

1. Sube el proyecto a tu repositorio de GitHub.
2. Ve a `Settings` del repositorio.
3. En `Pages`, selecciona:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Guarda los cambios.

Deploy esperado (Render): https://world-explorer-fovv.onrender.com  
Deploy alterno (GitHub Pages): https://Marianie13.github.io/world-explorer/

## Documento PDF solicitado

Escribe un documento en `.pdf` en el que se evidencie el proceso de desarrollo. El documento debe presentar:

- Explicación con las instrucciones usadas en JavaScript para la aplicación (funciones, condicionales, interfaces, ciclos, etc).
- Explicación de la consulta a la API.
- Explicación del proceso de despliegue.
- Dirección URL del despliegue de la aplicación.
- Enlace del código fuente en GitHub o Bitbucket.

## Créditos

- API: [RestCountries](https://restcountries.com/)
- Inspiración de diseño/retos: [Frontend Mentor](https://www.frontendmentor.io/)
