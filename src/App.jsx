import { useEffect, useState } from 'react'
import './App.css'

const BOARD_SIZE = 20

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
}

const INITIAL_SNAKE = [
  { x: 8, y: 10 },
  { x: 7, y: 10 },
  { x: 6, y: 10 },
]

function getRandomFoodPosition(snake) {
  while (true) {
    const x = Math.floor(Math.random() * BOARD_SIZE)
    const y = Math.floor(Math.random() * BOARD_SIZE)

    const onSnake = snake.some((segment) => segment.x === x && segment.y === y)
    if (!onSnake) {
      return { x, y }
    }
  }
}

function wrapCoordinate(value) {
  if (value < 0) return BOARD_SIZE - 1
  if (value >= BOARD_SIZE) return 0
  return value
}

function getWrappedHeadPosition(head, direction) {
  return {
    x: wrapCoordinate(head.x + direction.x),
    y: wrapCoordinate(head.y + direction.y),
  }
}

function willCollideWithSelf(newHead, snake, willGrow) {
  const bodyToCheck = willGrow ? snake : snake.slice(0, -1)

  return bodyToCheck.some(
    (segment) => segment.x === newHead.x && segment.y === newHead.y,
  )
}

function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [direction, setDirection] = useState(DIRECTIONS.ArrowRight)
  const [food, setFood] = useState(() => getRandomFoodPosition(INITIAL_SNAKE))
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  function resetGame() {
    setSnake(INITIAL_SNAKE)
    setDirection(DIRECTIONS.ArrowRight)
    setFood(getRandomFoodPosition(INITIAL_SNAKE))
    setScore(0)
    setIsGameOver(false)
  }

  function handleDirectionChange(key) {
    const newDirection = DIRECTIONS[key]
    if (!newDirection) return

    setDirection((current) => {
      // Evitar girar 180° directamente
      if (current.x + newDirection.x === 0 && current.y + newDirection.y === 0) {
        return current
      }
      return newDirection
    })
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === ' ' && isGameOver) {
        resetGame()
        return
      }

      handleDirectionChange(event.key)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isGameOver])

  useEffect(() => {
    if (isGameOver) return

    const intervalId = setInterval(() => {
      setSnake((previousSnake) => {
        const head = previousSnake[0]
        const wrappedHead = getWrappedHeadPosition(head, direction)

        const hasEatenFood =
          wrappedHead.x === food.x && wrappedHead.y === food.y

        const hitSelf = willCollideWithSelf(
          wrappedHead,
          previousSnake,
          hasEatenFood,
        )

        if (hitSelf) {
          setIsGameOver(true)
          return previousSnake
        }

        const newSnake = hasEatenFood
          ? [wrappedHead, ...previousSnake]
          : [wrappedHead, ...previousSnake.slice(0, -1)]

        if (hasEatenFood) {
          setScore((current) => current + 1)
          setFood(getRandomFoodPosition(newSnake))
        }

        return newSnake
      })
    }, 150)

    return () => clearInterval(intervalId)
  }, [direction, food, isGameOver])

  const cells = []

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      const isSnake = snake.some((segment) => segment.x === x && segment.y === y)
      const isHead = snake[0].x === x && snake[0].y === y
      const isFood = food.x === x && food.y === y

      let className = 'cell'

      if (isSnake) className += ' cell-snake'
      if (isHead) className += ' cell-head'
      if (isFood) className += ' cell-food'

      cells.push(<div key={`${x}-${y}`} className={className} />)
    }
  }

  return (
    <div className="app">
      <h1>Snake</h1>
      <div className="hud">
        <span>Puntaje: {score}</span>
        <span>Usa las flechas o WASD para moverte</span>
        <span>Barra espaciadora para reiniciar</span>
      </div>
      <div className="board">{cells}</div>

      {isGameOver && (
        <div className="overlay">
          <div className="game-over">
            <h2>Game Over</h2>
            <p>Puntaje: {score}</p>
            <button type="button" onClick={resetGame}>
              Reiniciar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
