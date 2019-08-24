import { ActionTypes, Cells, CellValue, INITIALIZE_BOARD, SELECT_CELL, SelectCellAction, CellState, AppState, UNDO } from './types'
import initialState from './initial-state'

function createCells (rows:number, cols:number):{[k:string]:CellState} {
  const cells:{[k:string]:CellState} = {}
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      cells[`${x},${y}`] = { x, y }
    }
  }
  return cells
}

interface NextCellFn {
	(cell:CellState): CellState|void
}

function collect (cell:CellState, getNext:NextCellFn, count:number = 0):number {
  const nextCell = getNext(cell)
  if (nextCell && (nextCell.value === cell.value)) {
    return collect(nextCell, getNext, count + 1)
  }
  return count
}

function evaluateHorizontal (state:AppState, cell:CellState, count:number = 1):CellValue|void {
  const { cells } = state
  count += collect(cell, (c) => cells[`${c.x + 1},${c.y}`])
  count += collect(cell, (c) => cells[`${c.x - 1},${c.y}`])
  if (count >= state.winningLength) {
    return cell.value
  }
}

function evaluateVertical (state:AppState, cell:CellState, count:number = 1):CellValue|void {
  const { cells } = state
  count += collect(cell, (c) => cells[`${c.x},${c.y + 1}`])
  count += collect(cell, (c) => cells[`${c.x},${c.y - 1}`])
  if (count >= state.winningLength) {
    return cell.value
  }
}

function evaluateDiagnol (state:AppState, cell:CellState, count:number = 1):CellValue|void {
  const { cells } = state
  count += collect(cell, (c) => cells[`${c.x + 1},${c.y + 1}`])
  count += collect(cell, (c) => cells[`${c.x - 1},${c.y - 1}`])
  count += collect(cell, (c) => cells[`${c.x - 1},${c.y + 1}`])
  count += collect(cell, (c) => cells[`${c.x + 1},${c.y - 1}`])
  if (count >= state.winningLength) {
    return cell.value
  }
}

function evaluateWinner (state:AppState, cell:CellState):CellValue|void {
  const { x, y, value } = cell
  const done = false
  return (
    evaluateHorizontal(state, cell) ||
		evaluateVertical(state, cell) ||
		evaluateDiagnol(state, cell)
  )
}

function selectCell (state:AppState, x:number, y:number) {
  if (state.winner) {
    return state
  }
  const newValue = state.nextValue
  const nextValue = newValue === 'X' ? 'O' : 'X'
  const newCellState = { x, y, value: newValue }

  return {
	  ...state,
	  cells: {
		  ...state.cells,
		  [`${x},${y}`]: newCellState
	  },
	  nextValue,
	  winner: evaluateWinner(state, newCellState),
	  history: state.history.concat([state])
  }
}

export default function reducer (state = initialState, action: ActionTypes) {
  switch (action.type) {
    case (SELECT_CELL): {
	  const { x, y } = action.payload
      return selectCell(state, x, y)
	}
	case (UNDO): {
		const previousState = state.history.pop();
		if (!previousState) {
			return state
		}
		return previousState
	}
    case (INITIALIZE_BOARD): {
	  const { rows, columns, winningLength } = action.payload
	  return {
		  ...state,
		  rows,
		  columns,
		  winningLength,
		  cells: createCells(rows, columns),
		  winner: undefined
	  }
    }
    default:
      return state
  }
}
