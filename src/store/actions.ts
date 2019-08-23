import { SELECT_CELL, SelectCellAction } from './types'

export function selectCell (x:number, y:number):SelectCellAction {
  return {
    type: SELECT_CELL,
    payload: { x, y }
  }
}
