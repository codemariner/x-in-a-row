import React from 'react'

import { connect } from 'react-redux'

import Board from './components/board';
import BoardForm from './components/form';
import { AppState } from './store/types';
import { isEmpty } from './lib/utils';

import './index.scss'

type AppProps = Pick<AppState, 'nextValue' | 'winner' | 'cells'>

const App: React.FC<AppProps> = ({cells, nextValue, winner}:AppProps) => (
	<div className="wrapper">
		{isEmpty(cells) ?
			(
				<div>
					<h2>Create a new board</h2>
					<BoardForm/>
				</div>
			) :
			<Board/>}
	</div>
)

const mapStateToProps = ({cells, nextValue, winner}: AppState) => {
	return {
		cells,
		nextValue,
		winner
	}
}

export default connect(
	mapStateToProps
)(App)
