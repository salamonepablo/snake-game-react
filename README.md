# Snake Game React

Juego clásico de **Snake** implementado con **React** y **Vite**.

La aplicación se ejecuta en el navegador y muestra un tablero de 20x20 celdas donde controlas una serpiente que va creciendo al comer comida.

## Reglas del juego

- El tablero es una grilla de **20 x 20**.
- Controlas la dirección de la serpiente.
- Cada vez que comes comida:
  - La serpiente crece una unidad.
  - Aumenta el puntaje.
- **Las paredes no causan colisión**:
  - Si sales por un lado del tablero, **apareces por el lado opuesto** (wrap-around).
- **Pierdes solo si chocas contra tu propio cuerpo**:
  - Si la cabeza de la serpiente entra en una celda ocupada por otra parte de la serpiente, el juego termina.

## Controles

- Moverse:
  - Flechas del teclado: `↑`, `↓`, `←`, `→`
  - o bien: `W`, `A`, `S`, `D`
- Reiniciar cuando hay *Game Over*:
  - Barra espaciadora (`Space`)
  - o botón **Reiniciar** en el overlay.

## Scripts disponibles

En la raíz del proyecto:

```bash
npm install       # instala dependencias
npm run dev       # arranca el servidor de desarrollo (Vite)
npm run build     # genera el build de producción
npm run preview   # sirve el build generado en dist
npm run lint      # ejecuta ESLint sobre el proyecto
```

## Stack

- [React](https://react.dev/) (con `useState` y `useEffect` para manejar el estado del juego).
- [Vite](https://vite.dev/) como bundler y servidor de desarrollo.
- [ESLint](https://eslint.org/) con configuración flat y reglas para React Hooks y React Refresh.
