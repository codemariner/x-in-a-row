import { ActionTypes, Cells, CellValue, SELECT_CELL, SelectCellAction, CellState, AppState } from './types'
import { connect } from 'net';

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
  rows: 4,
  columns: 3,
  winningLength: 3,
  cells: createCells(4, 3),
  nextValue: 'X'
}

interface NextCellFn {
	(cell:CellState): CellState|void
}

function collect(cell:CellState, getNext:NextCellFn, count:number = 0):number {
	const nextCell = getNext(cell)
	if (nextCell && nextCell.value === cell.value) {
		return collect(nextCell, getNext, count + 1)
	}
	return count
}

function evaluateHorizontal(state:AppState, cell:CellState, count:number = 1):CellValue|void {
	const { cells } = state
	count += collect(cell, (c) => cells[`${c.x+1},${c.y}`], count);
	count += collect(cell, (c) => cells[`${c.x-1},${c.y}`], count);
	if (count >= state.winningLength) {
		return cell.value
	}
}

function evaluateVertical(state:AppState, cell:CellState):CellValue|void {
}

function evaluateDiagnol(state:AppState, cell:CellState):CellValue|void {
}

function evaluateWinner(state:AppState, cell:CellState):CellValue|void {
	const {x, y, value} = cell
	let done = false
	return (
		evaluateHorizontal(state, cell) ||
		evaluateVertical(state, cell) ||
		evaluateDiagnol(state, cell)
	)
}

function selectCell (state:AppState, x:number, y:number) {
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
	  winner: evaluateWinner(state, newCellState)
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
