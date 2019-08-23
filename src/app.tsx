import React from 'react'

import { connect } from 'react-redux'

import Board from './components/board';
import { AppState } from './store/types';

import './index.scss'

type AppProps = Pick<AppState, 'nextValue'>

const App: React.FC<AppProps> = ({nextValue}:AppProps) => (
	<div className="wrapper">
		Next player: {nextValue}
		<Board/>
	</div>
)


const mapStateToProps = ({nextValue}: AppState) => {
	return {
		nextValue
	}
}

export default connect(
	mapStateToProps
)(App)
