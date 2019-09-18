import { AppState } from './types';

const initialState: AppState = {
	animating: false,
	gravityEnabled: false,
    rows: 3,
    columns: 3,
    history: [],
    winningLength: 3,
    cells: {},
    nextValue: 'X'
};

export default initialState;
