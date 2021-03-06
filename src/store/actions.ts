import { INITIALIZE_BOARD, InitializeBoardAction, SELECT_CELL, SelectCellAction, UNDO, UndoAction } from './types';

export function initializeBoard(rows: number, columns: number, winningLength: number, gravityEnabled: boolean): InitializeBoardAction {
    return {
        type: INITIALIZE_BOARD,
        payload: {
            rows,
            columns,
			winningLength,
			gravityEnabled
        }
    };
}

export function selectCell(x: number, y: number): SelectCellAction {
    return {
        type: SELECT_CELL,
        payload: { x, y }
    };
}

export function undo(): UndoAction {
    return {
        type: UNDO
    };
}
