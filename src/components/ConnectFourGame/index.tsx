import { useState } from "react"
import { gameSettings } from "./helpers/settings"
import { initializeBoard } from "./helpers/initializeBoard"
import { checkForWinner } from "./helpers/checkForWinner"
import styled from "styled-components"


const Game = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  background-color: #007fff;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Cell = styled.div` 
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 50%;
  margin: 5px;
  /* add shadow */
  box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);
`

const RestartButton = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 10px;
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
  background-color: #f0f0f0;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ConnectFourGame = () => {
  const [board, setBoard] = useState<string[][]>(initializeBoard())
  const [currentPlayer, setCurrentPlayer] = useState<string>(gameSettings.player1.color)
  const [winner, setWinner] = useState<string>("")

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    if (winner) return
    const newBoard = [...board]
    for (let i = gameSettings.boardSize.height - 1; i >= 0; i--) {
      if (newBoard[i][columnIndex] === gameSettings.emptyColor) {
        newBoard[i][columnIndex] = currentPlayer
        break
      }
    }
    setBoard(newBoard)
    checkForWinner({ board: newBoard, currentPlayer, setWinner })
    switchPlayer()
  }

  const switchPlayer = () => {
    if (currentPlayer === gameSettings.player1.color) {
      setCurrentPlayer(gameSettings.player2.color)
    } else {
      setCurrentPlayer(gameSettings.player1.color)
    }
  }

  return (
    <Game>
      <h2>Current player: {currentPlayer}</h2>
      <RestartButton onClick={() => {
        setBoard(initializeBoard())
        setWinner("")
      }}>Restart</RestartButton>

      <h2>{winner === "draw" ? "It's a draw!" : `${winner} won!`}</h2>
      <Board>
        {board.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((cell, columnIndex) => (
              <Cell
                key={columnIndex}
                onClick={() => handleCellClick(rowIndex, columnIndex)}
                style={{ backgroundColor: cell }}
              />
            ))}
          </Row>
        ))}
      </Board>
    </Game>
  )

}

export default ConnectFourGame