# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Stack y comandos básicos

Proyecto creado con Vite + React (JavaScript, sin TypeScript) usando configuración estándar de Vite.

Scripts de `package.json` (usar `npm run <script>` u otro gestor equivalente):

- `dev`: arranca el servidor de desarrollo de Vite.
  - Ejemplo: `npm run dev`
- `build`: genera el build de producción con Vite.
  - Ejemplo: `npm run build`
- `preview`: sirve el build de producción generado en `dist`.
  - Ejemplo: `npm run preview`
- `lint`: ejecuta ESLint sobre todo el proyecto.
  - Ejemplo: `npm run lint`

Notas de uso:
- Antes de cualquier comando, instalar dependencias: `npm install` (o el gestor que prefiera el usuario).
- No hay script de tests configurado actualmente: no asumas framework de pruebas ni comando `test` hasta que se añadan explícitamente.

## Arquitectura de alto nivel

### Entrypoint y renderizado React

- `index.html`
  - Punto de entrada de Vite; contiene el `div#root` donde React monta la aplicación.
- `src/main.jsx`
  - Importa `StrictMode` de React y `createRoot` de `react-dom/client`.
  - Importa estilos globales desde `src/index.css`.
  - Importa el componente raíz `App` desde `src/App.jsx`.
  - Crea el root de React sobre `document.getElementById('root')` y renderiza:
    - `<StrictMode>` envolviendo a `<App />` (útil para detectar efectos secundarios problemáticos en desarrollo).

Este flujo (HTML estático → `main.jsx` → `App.jsx`) es el pipeline estándar de Vite + React y es el lugar natural para enganchar cualquier router o provider global en el futuro (por ejemplo, React Router o contextos globales).

### Componente raíz de la UI

- `src/App.jsx`
  - Es actualmente el componente de ejemplo de Vite/React: logos de Vite y React, un contador local (`useState`) y texto de ejemplo.
  - Importa estilos de `src/App.css` para el layout básico.

En el futuro, la implementación del juego de Snake debería vivir aquí o en componentes que cuelguen de `App`. Si introduces nuevas vistas o páginas, este archivo será el punto de ensamblaje principal.

### Estilos

- `src/index.css`
  - Define estilos globales (tipografía base, color-scheme claro/oscuro, estilos de `body`, `h1`, `button`, enlaces, etc.).
  - Es el lugar apropiado para variables CSS o resets globales.
- `src/App.css`
  - Estilos específicos del componente raíz actual (centrado del contenido, animación de logos, etc.).
  - Ideal para estilos ligados a la estructura principal de la UI.

### Configuración de herramienta

- `vite.config.js`
  - Configuración mínima de Vite usando `@vitejs/plugin-react`.
  - Cualquier cambio en el bundling (plugins adicionales, alias de rutas, etc.) debe hacerse aquí.
- `eslint.config.js`
  - Configuración "flat" de ESLint.
  - Se aplica a `**/*.{js,jsx}` e incluye:
    - `@eslint/js` (reglas recomendadas de JavaScript).
    - `eslint-plugin-react-hooks` (en modo recomendado).
    - `eslint-plugin-react-refresh` en modo Vite.
  - Ignora la carpeta `dist` mediante `globalIgnores(['dist'])`.
  - Regla específica: `no-unused-vars` permite variables cuyo nombre cumpla el patrón `^[A-Z_]` (útil para constantes globales o pseudo-enums).

## Tests

- No hay configuración de pruebas ni ficheros `*.test.*`/`*.spec.*` en el repositorio.
- Cuando se añada un framework de tests (por ejemplo Vitest o Jest) y un script `test` en `package.json`, actualiza esta sección indicando:
  - Cómo ejecutar todos los tests.
  - Cómo ejecutar un único test o archivo de tests (por ejemplo, `npm test -- --runTestsByPath src/foo.test.jsx` o `npx vitest src/foo.test.jsx`).

## Recomendaciones para futuras instancias de Warp

- Antes de asumir nuevas herramientas (router, gestor de estado, framework de tests), inspecciona siempre `package.json`, `vite.config.js` y `eslint.config.js` y actualiza este `WARP.md` si cambian las decisiones de arquitectura.
- Si se introduce una estructura de carpetas más compleja (por ejemplo, `src/components/`, `src/game/`, etc.), documenta aquí solo los módulos de más alto nivel y cómo se relacionan entre sí, sin listar todos los archivos.