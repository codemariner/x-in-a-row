import React from 'react'

import { connect } from 'react-redux'

import Board from './components/board';
import { AppState } from './store/types';

import './index.scss'

type AppProps = Pick<AppState, 'nextValue' | 'winner'>

const App: React.FC<AppProps> = ({nextValue, winner}:AppProps) => (
	<div className="wrapper">
		Next player: {nextValue}
		<Board/>
		Winner: {winner}
	</div>
)

const mapStateToProps = ({nextValue, winner}: AppState) => {
	return {
		nextValue,
		winner
	}
}

export default connect(
	mapStateToProps
)(App)
