import configureStore from '../../src/store'
import { initializeBoard, selectCell } from '../../src/store/actions'
import { Store } from 'redux';

describe('reducers', () => {

	let store:Store

	beforeEach(() => {
		store = configureStore()
	})

	describe('selectCell', () => {
		beforeEach(() => {
			store.dispatch(initializeBoard(5, 5, 3, false))
		})

		it('should assign a winner for horizontal', () => {
			expect(store.getState().winner).toBe(undefined)

			store.getState().nextValue = 'X'
			store.dispatch(selectCell(0,0));

			store.getState().nextValue = 'X'
			store.dispatch(selectCell(1,0));

			store.getState().nextValue = 'X'
			store.dispatch(selectCell(2,0));

			expect(store.getState().winner).toBe('X')
		})
	})

})