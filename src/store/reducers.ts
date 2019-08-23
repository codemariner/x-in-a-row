import { ActionTypes, BoardState, SELECT_CELL, SelectCellAction, CellValue, CellState } from './types'

function createCells (rows:number, cols:number):{[k:string]:CellState} {
  const cells:{[k:string]:CellState} = {}
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      cells[`${x},${y}`] = { x, y }
    }
  }
  return cells
}

const initialState = {
  board: {
    rows: 3,
    columns: 3,
    cells: createCells(3, 3),
    nextValue: 'X'
  }
}

function selectCell (state:any, x:number, y:number) {
  return state
}

export default function reducer (state = initialState, action: ActionTypes) {
  switch (action.type) {
    case (SELECT_CELL): {
      const { x, y } = action.payload
      return selectCell(state, x, y)
    }
    default:
      return state
  }
}
