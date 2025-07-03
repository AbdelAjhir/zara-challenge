# Zara Challenge

El objetivo de esta prueba es la creación de una aplicación web enfocada en la visualización, búsqueda y gestión de un catálogo de teléfonos móviles. La aplicación debe permitir a los usuarios consultar detalles específicos de cada dispositivo, así como gestionar un carrito de compras de manera eficiente.

---

## Demo en producción

Puedes probar la aplicación desplegada aquí:  
[https://zara-challenge.ajhir.com](https://zara-challenge.ajhir.com)

---

## Requisitos previos

- **Node.js** >= 18.x
- **npm** >= 9.x

Asegúrate de tener instaladas estas versiones o superiores antes de instalar las dependencias.

## Instrucciones para ejecutar la aplicación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/AbdelAjhir/zara-challenge.git
   cd zara-challenge
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   Copia el archivo `.env.example` como `.env` en la raíz del proyecto:

   ```bash
   cp .env.example .env
   ```

   El archivo `.env` debe contener:

   ```
   VITE_API_KEY=87909682e6cd74208f41a6ef39fe4191
   VITE_API_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
   ```

   - Los valores incluidos en `.env.example` son los mismos que utiliza la aplicación y **no contienen información sensible**.
   - La clave `x-api-key` utilizada en este proyecto es pública y proporcionada por la organización del reto Zara Challenge.

4. **Ejecuta la aplicación en modo desarrollo:**

   ```bash
   npm run dev
   ```

   Accede a [http://localhost:5173](http://localhost:5173) en tu navegador.

5. **Ejecuta los tests:**
   - **Unitarios (Vitest):**
     ```bash
     npm run test
     ```
   - **End-to-End (Playwright):**
     Asegúrate de tener la app corriendo (`npm run dev`) y luego:
     ```bash
     npm run test:e2e
     ```

---

## Arquitectura y estructura del proyecto

La aplicación está desarrollada con **React** y utiliza **Vite** como bundler. La estructura principal es la siguiente:

```
src/
  api/           # Lógica de comunicación con la API
  assets/        # Imágenes y recursos estáticos
  components/    # Componentes reutilizables (Catálogo, Carrito, UI, etc.)
  context/       # Contextos de React (ej: carrito)
  hooks/         # Custom hooks
  layouts/       # Layouts generales
  lib/           # Utilidades y helpers
  pages/         # Vistas principales (Catálogo, Detalle, Carrito, 404)
  schemas/       # Validaciones y tipados con Zod
  scss/          # Estilos globales y variables
  types/         # Tipos TypeScript
  test/          # Configuración y mocks para testing
e2e/             # Tests end-to-end (Playwright)
public/          # Archivos públicos (favicon, imágenes, etc.)
scripts/         # Scripts utilitarios para tareas del proyecto
                  # Incluye checkEnv.mjs, que verifica que exista el archivo .env antes de iniciar la app y muestra un mensaje de ayuda si falta.
.husky/          # Hooks de Git para automatizar tareas antes de commits/push
                  # pre-commit: formatea, revisa y chequea el código antes de cada commit (lint-staged + npm run check:all)
                  # pre-push: ejecuta una validación completa antes de hacer push (npm run validate)

# Archivos de configuración principales
eslint.config.js   # Configuración de ESLint
tsconfig.json      # Configuración principal de TypeScript
vite.config.ts     # Configuración de Vite
package.json       # Dependencias y scripts del proyecto
.env.example       # Variables de entorno de ejemplo
```

---

## Información relevante

- **Gestión de estado:** Usar **React Context API** para el carrito y **TanStack Query (React Query)** para el manejo eficiente de datos asíncronos y cacheo.
- **Estilos:** Usar **SCSS** para organizar los estilos.
- **Accesibilidad:** Se han añadido atributos ARIA y roles.
- **Persistencia:** El carrito se guarda en **localStorage**.
- **Peticiones HTTP:** Se utiliza **Axios** para la comunicación con la API, incluyendo siempre el header `x-api-key` requerido.
- **Animaciones:** Se emplean animaciones en el catálogo, carrito y otros componentes, principalmente mediante **Framer Motion** y animaciones CSS.
- **Responsive:** La aplicación se adapta completamente a dispositivos móviles y escritorio.
- **Linter y formateo:** Configuración de **ESLint** y **Prettier** para mantener la calidad del código.
- **Testing:** Se emplean **Vitest** para tests unitarios y **Playwright** para tests E2E.
- **Modo desarrollo/producción:** Vite gestiona ambos modos automáticamente.

---

## Carrito de compras

- Puedes añadir productos al carrito desde el catálogo o la página de detalle.
- El carrito muestra la lista de productos seleccionados, agrupados por variante (color, almacenamiento).
- Si añades varias veces la misma variante, se agrupan en una sola línea y se muestra la cantidad total (por ejemplo: "× 3").
- **Al pulsar el botón de eliminar, se elimina toda la variante del producto, sin importar la cantidad.**
- El número total de productos se muestra en el header y se actualiza automáticamente.

---

## Explicación de los scripts (`package.json`)

- **npm run dev**  
  Inicia la aplicación en modo desarrollo. Abre un servidor local con recarga automática.

- **npm run build**  
  Genera una versión optimizada y lista para producción en la carpeta `dist/`.

- **npm run preview**  
  Sirve la versión de producción localmente para comprobar cómo se verá tras el despliegue.

- **npm run test**  
  Ejecuta los tests unitarios usando Vitest. Solo prueba la lógica y componentes de React.

- **npm run test:e2e**  
  Ejecuta los tests end-to-end (E2E) usando Playwright. Simula la experiencia real de usuario.

- **npm run lint**  
  Analiza el código con ESLint para detectar errores de estilo o posibles bugs.

- **npm run lint:fix**  
  Intenta corregir automáticamente los problemas detectados por ESLint.

- **npm run format**  
  Verifica que el código esté formateado correctamente según las reglas de Prettier.

- **npm run format:fix**  
  Formatea automáticamente el código usando Prettier.

- **npm run typecheck**  
  Verifica los tipos de TypeScript en todo el proyecto, sin generar archivos.

- **npm run test:coverage**  
  Ejecuta los tests unitarios y muestra un reporte de cobertura de código.

- **npm run test:ui**  
  Abre la interfaz visual de Vitest para ejecutar y depurar tests unitarios.

- **npm run clean**  
  Elimina archivos temporales y de construcción para dejar el proyecto "limpio".

- **npm run check:all**  
  Ejecuta formato, lint y typecheck para asegurar la calidad antes de un commit o build.

- **npm run fix:all**  
  Aplica todas las correcciones automáticas posibles de formato y lint.

- **npm run validate**  
  Ejecuta todos los chequeos y luego construye el proyecto, útil antes de desplegar.

---

## Contacto

- **Nombre Completo:** Abdelbari Ajhir
- **Email:** abdeelajhir@gmail.com
- **LinkedIn:** [linkedin.com/in/abdelbariajhir](https://linkedin.com/in/abdelbariajhir)
