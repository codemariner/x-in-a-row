
export type CellValue = 'X' | 'O';

export interface CellState {
	x: number
	y: number
	value?: CellValue
}

export type Cells = {[k:string]:CellState}

export interface AppState {
	rows: number
	columns: number
	cells: Cells
	history: any[]
	nextValue: CellValue,
	winningLength: number,
	winner?: CellValue
}

export interface CellSelection {
	x: number
	y: number
}

// actions

export const SELECT_CELL = 'SELECT_CELL'
export const UNDO = 'UNDO'
export const INITIALIZE_BOARD = 'INITIALIZE_BOARD'

export interface SelectCellAction {
	type: typeof SELECT_CELL
	payload: CellSelection
}

export interface InitializeBoardAction {
	type: typeof INITIALIZE_BOARD
	payload: {
		rows: number
		columns: number
		winningLength: number
	}
}

export interface UndoAction {
	type: typeof UNDO
}

export type ActionTypes = SelectCellAction | InitializeBoardAction | UndoAction;
