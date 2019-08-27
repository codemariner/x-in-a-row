import storeCreator, {MockStore} from 'redux-mock-store'
import { Store } from 'redux';

import { initializeBoard, selectCell } from '../../src/store/actions'
import initialState from '../../src/store/initial-state'


describe('actions', () => {

	let store:MockStore

	beforeEach(() => {
		store = storeCreator([])(initialState)
	})

	describe('initializeBoard', () => {
		it('should dispatch an action that provide information for creating a new board', () => {
			store.dispatch(initializeBoard(5, 5, 4));
			expect(store.getActions()).toEqual([{ type: 'INITIALIZE_BOARD', payload: { rows: 5, columns: 5, winningLength: 4 }}])
		})
	})

	describe('selectCell', () => {
		it('should dispatch an action that indicates the x and y coordinate of the cell being selected', () => {
			store.dispatch(selectCell(1, 1))
			expect(store.getActions()).toEqual([{ type: 'SELECT_CELL', payload: { x: 1, y: 1 } }])
		})
	})
});