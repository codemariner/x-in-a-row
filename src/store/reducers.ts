import { ActionTypes, INITIALIZE_BOARD, SELECT_CELL, CellState, AppState, UNDO } from './types';
import initialState from './initial-state';

function createCells(rows: number, cols: number): { [k: string]: CellState } {
    const cells: { [k: string]: CellState } = {};
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            cells[`${x},${y}`] = { x, y };
        }
    }
    return cells;
}

interface NextCellFn {
    (cell: CellState): CellState | void;
}

function collect(cell: CellState, getNext: NextCellFn, winningCells: CellState[] = []): CellState[] {
    const nextCell = getNext(cell);
    if (nextCell && nextCell.value === cell.value) {
        winningCells.push(nextCell);
        return collect(nextCell, getNext, winningCells);
    }
    return winningCells;
}

function evaluateHorizontal(state: AppState, cell: CellState): CellState[] | void {
    const { cells, winningLength } = state;
    let winners = [cell];
    winners = winners.concat(collect(cell, c => cells[`${c.x + 1},${c.y}`]));
    winners = winners.concat(collect(cell, c => cells[`${c.x - 1},${c.y}`]));
    if (winners.length >= winningLength) {
        return winners;
    }
}

function evaluateVertical(state: AppState, cell: CellState): CellState[] | void {
    const { cells, winningLength } = state;
    let winners = [cell];
    winners = winners.concat(collect(cell, c => cells[`${c.x},${c.y + 1}`]));
    winners = winners.concat(collect(cell, c => cells[`${c.x},${c.y - 1}`]));
    if (winners.length >= winningLength) {
        return winners;
    }
}

function evaluateDiagnol(state: AppState, cell: CellState): CellState[] | void {
    const { cells, winningLength } = state;
    let winners = [cell];
    winners = winners.concat(collect(cell, c => cells[`${c.x + 1},${c.y + 1}`]));
    winners = winners.concat(collect(cell, c => cells[`${c.x - 1},${c.y - 1}`]));
    if (winners.length >= winningLength) {
        return winners;
    }

    winners = [cell];
    winners = winners.concat(collect(cell, c => cells[`${c.x - 1},${c.y + 1}`]));
    winners = winners.concat(collect(cell, c => cells[`${c.x + 1},${c.y - 1}`]));
    if (winners.length >= winningLength) {
        return winners;
    }
}

function evaluateWinner(state: AppState, cell: CellState): CellState[] | void {
    return evaluateHorizontal(state, cell) || evaluateVertical(state, cell) || evaluateDiagnol(state, cell);
}

function selectCell(state: AppState, x: number, y: number) {
    if (state.winner) {
        return state;
    }
    const newValue = state.nextValue;
    const nextValue = newValue === 'X' ? 'O' : 'X';
    const newCellState = { x, y, value: newValue };

    const winningCells = evaluateWinner(state, newCellState);

    return {
        ...state,
        cells: {
            ...state.cells,
            [`${x},${y}`]: newCellState
        },
        nextValue,
        winner: winningCells ? newValue : undefined,
        winningCells,
        history: state.history.concat([state])
    };
}

export default function reducer(state = initialState, action: ActionTypes) {
    switch (action.type) {
        case SELECT_CELL: {
            const { x, y } = action.payload;
            return selectCell(state, x, y);
        }
        case UNDO: {
            const previousState = state.history.pop();
            if (!previousState) {
                return state;
            }
            return previousState;
        }
        case INITIALIZE_BOARD: {
            const { rows, columns, winningLength } = action.payload;
            return {
                ...state,
                rows,
                columns,
                winningLength,
                history: [],
                cells: createCells(rows, columns),
                winner: undefined,
                winningCells: undefined
            };
        }
        default:
            return state;
    }
}
