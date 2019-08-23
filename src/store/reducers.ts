import { ActionTypes, SELECT_CELL, SelectCellAction, CellState } from './types'

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
  rows: 3,
  columns: 3,
  cells: createCells(3, 3),
  nextValue: 'X'
}

function selectCell (state:any, x:number, y:number) {
  const newValue = state.nextValue
  const nextValue = newValue === 'X' ? 'O' : 'X'

  return {
	  ...state,
	  cells: {
		  ...state.cells,
		  [`${x},${y}`]: { x, y, value: newValue }
	  },
	  nextValue
  }
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
