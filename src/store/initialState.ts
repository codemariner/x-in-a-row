import { AppState, CellState } from './types'

function createCells (rows:number, cols:number):{[k:string]:CellState} {
  const cells:{[k:string]:CellState} = {}
  for (let y = 0; y < rows; y++) {
	  for (let x = 0; x < cols; x++) {
      cells[`${x},${y}`] = { x, y }
	  }
  }
  return cells
}

const initialState:AppState = {
  rows: 3,
  columns: 3,
  winningLength: 3,
  cells: createCells(3, 3),
  nextValue: 'X'
}

export default initialState
