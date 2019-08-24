import { AppState, CellState } from './types'

const initialState:AppState = {
  rows: 3,
  columns: 3,
  winningLength: 3,
  cells: {},
  nextValue: 'X'
}

export default initialState