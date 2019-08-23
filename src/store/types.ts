
export type CellValue = 'X' | 'O';

export interface CellState {
	x: number
	y: number
	value?: CellValue
}

export interface BoardState {
	rows: number
	columns: number
	cells: {[k:string]: CellState}
	nextValue: CellValue
}

export interface CellSelection {
	x: number
	y: number
}

// actions

export const SELECT_CELL = 'SELECT_CELL'

export interface SelectCellAction {
	type: typeof SELECT_CELL
	payload: CellSelection
}

export type ActionTypes = SelectCellAction;
