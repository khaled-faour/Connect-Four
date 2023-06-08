import { gameSettings } from "./settings"

interface ICheckForWinner {
  board: string[][]
  setWinner: (winner: string) => void
  currentPlayer: string
}
export const checkForWinner = ({ board, currentPlayer, setWinner }: ICheckForWinner) => {
  const winningLength = gameSettings.winningLength
  const winningColor = gameSettings.winningColor
  const emptyColor = gameSettings.emptyColor
  const boardWidth = gameSettings.boardSize.width
  const boardHeight = gameSettings.boardSize.height
  const tempBoard = [...board]

  // Check for horizontal win
  for (let i = 0; i < boardHeight; i++) {
    let count = 0
    for (let j = 0; j < boardWidth; j++) {
      if (tempBoard[i][j] === currentPlayer) {
        count++
        if (count === winningLength) {
          setWinner(currentPlayer)
          return
        }
      } else {
        count = 0
      }
    }
  }

  // Check for vertical win
  for (let i = 0; i < boardWidth; i++) {
    let count = 0
    for (let j = 0; j < boardHeight; j++) {
      if (board[j][i] === currentPlayer) {
        count++
        if (count === winningLength) {
          setWinner(currentPlayer)
          return
        }
      } else {
        count = 0
      }
    }
  }

  // Check for diagonal win
  for (let i = 0; i < boardHeight; i++) {
    for (let j = 0; j < boardWidth; j++) {
      if (board[i][j] === currentPlayer) {
        // Check for diagonal win to the right
        let count = 0
        for (let k = 0; k < winningLength; k++) {
          if (i + k < boardHeight && j + k < boardWidth) {
            if (board[i + k][j + k] === currentPlayer) {
              count++
              if (count === winningLength) {
                setWinner(currentPlayer)
                return
              }
            } else {
              count = 0
            }
          }
        }

        // Check for diagonal win to the left
        count = 0
        for (let k = 0; k < winningLength; k++) {
          if (i + k < boardHeight && j - k >= 0) {
            if (board[i + k][j - k] === currentPlayer) {
              count++
              if (count === winningLength) {
                setWinner(currentPlayer)
                return
              }
            } else {
              count = 0
            }
          }
        }
      }
    }
  }

  // Check for draw
  let isDraw = true
  for (let i = 0; i < boardHeight; i++) {
    for (let j = 0; j < boardWidth; j++) {
      if (board[i][j] === emptyColor) {
        isDraw = false
        break
      }
    }
  }
  if (isDraw) {
    setWinner("draw")
  }
}