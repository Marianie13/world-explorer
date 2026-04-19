# ACTIVIDAD 4. Taller "creación de una aplicación web"

**Proyecto:** World Explorer  
**Integrantes:** Sergio Andres Silva y Marianie Vasquez  
**Fecha:** 19 de abril de 2026

---

## 1. Introducción

El presente documento evidencia el proceso de desarrollo de la aplicación web **World Explorer**, una SPA (Single Page Application) desarrollada con **HTML, CSS y JavaScript vanilla**.  
La aplicación permite consultar información de países mediante una API pública y visualizar los datos en una interfaz interactiva, moderna y responsiva.

---

## 2. Tecnologías utilizadas

- **HTML5** para la estructura de la aplicación.
- **CSS3** para el diseño visual, estilos responsivos y animaciones.
- **JavaScript (ES6+)** para la lógica de negocio y consumo de API.
- **API RestCountries** para obtener información de países.
- **Google Fonts** (Playfair Display y DM Sans) para tipografía editorial.

---

## 3. Explicación del desarrollo en JavaScript

La lógica principal está implementada en el archivo `app.js` y se organiza en funciones para mantener el código modular y fácil de mantener.

### 3.1 Variables y estado de la aplicación

Se define un objeto `state` para almacenar:

- Lista de países (`countries`).
- Texto de búsqueda (`searchTerm`).
- Región seleccionada (`region`).
- Criterio de ordenamiento (`sortBy`).

Esto permite actualizar la interfaz de forma dinámica sin recargar la página.

### 3.2 Funciones principales

- `fetchCountries()`: realiza la consulta a la API con `fetch`, `async/await` y `try/catch`.
- `debounce()`: evita ejecutar búsquedas en cada pulsación inmediata del teclado.
- `getProcessedCountries()`: aplica filtrado y ordenamiento sobre los datos.
- `renderCountries()`: dibuja las tarjetas de países con `.map()` y template literals.
- `openModal(country)`: muestra el detalle completo del país seleccionado.
- `closeModal()`: cierra el modal.
- `setupEventListeners()`: configura todos los eventos de interacción.
- `init()`: inicializa la aplicación al cargar.

### 3.3 Condicionales

Se usan estructuras condicionales para:

- Validar respuestas de la API (`if (!response.ok)`).
- Mostrar estado vacío cuando no hay resultados.
- Verificar selección de tarjeta antes de abrir modal.
- Cerrar modal al detectar tecla `Escape` o clic fuera del contenido.

### 3.4 Ciclos e iteraciones

- `.map()` para construir las tarjetas HTML de cada país.
- `.filter()` para aplicar búsqueda por nombre y filtro por región.
- `.sort()` para ordenar por nombre, población o área.
- `Object.values()` para recorrer monedas e idiomas en el modal.

### 3.5 Interfaces e interacción con usuario

La aplicación incluye:

- Campo de búsqueda en tiempo real.
- Select de región.
- Select de ordenamiento.
- Tarjetas con animación de entrada escalonada.
- Modal con información detallada y enlace a Google Maps.

Se utiliza **delegación de eventos** para manejar clics en tarjetas de forma eficiente.

### 3.6 Formateo de datos

Para mostrar números grandes se usa:

`Intl.NumberFormat("es-CO")`

Con esto se formatean población y área con separadores adecuados para español de Colombia.

---

## 4. Explicación de la consulta a la API

La aplicación consume el siguiente endpoint:

`https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,subregion,area,currencies,languages,maps,cca3`

### Proceso:

1. Al iniciar la app, se ejecuta `init()`.
2. `init()` llama a `fetchCountries()`.
3. Se muestra un spinner mientras llegan los datos.
4. Se realiza la petición HTTP con `await fetch(API_URL)`.
5. Si la respuesta es correcta, se convierte a JSON y se guarda en `state.countries`.
6. Si falla la consulta, se captura el error con `catch` y se muestra un mensaje de estado.

Este flujo asegura una carga controlada de datos y manejo adecuado de errores de red o disponibilidad.

---

## 5. Explicación del proceso de despliegue

El despliegue se realizó con **GitHub Pages** siguiendo estos pasos:

1. Inicialización del repositorio local con `git init`.
2. Agregado de archivos con `git add .`.
3. Commit del proyecto con mensaje descriptivo.
4. Configuración de rama principal `main`.
5. Asociación del repositorio remoto en GitHub.
6. Envío del código con `git push -u origin main`.
7. Activación de GitHub Pages en:
   - `Settings` -> `Pages`
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`

---

## 6. Dirección URL del despliegue

**URL de la aplicación desplegada:**  
https://Marianie13.github.io/world-explorer/

---

## 7. Enlace del código fuente

**Repositorio del código fuente en GitHub:**  
https://github.com/Marianie13/world-explorer

---

## 8. Conclusión

La actividad permitió aplicar conceptos fundamentales de desarrollo web frontend: manipulación del DOM, consumo de APIs REST, programación asíncrona con `async/await`, filtros y ordenamientos de datos, diseño responsivo y despliegue en la nube con GitHub Pages.  
El resultado es una aplicación funcional, escalable y adecuada como evidencia de aprendizaje en desarrollo web.
