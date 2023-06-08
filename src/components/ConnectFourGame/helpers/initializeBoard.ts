import { gameSettings } from "./settings"

export const initializeBoard = (): string[][] => {
  const board: string[][] = []
  for (let i = 0; i < gameSettings.boardSize.height; i++) {
    const row: string[] = []
    for (let j = 0; j < gameSettings.boardSize.width; j++) {
      row.push(gameSettings.emptyColor)
    }
    board.push(row)
  }
  return board
}