import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import Cell from './cell'
import { AppState, CellState, CellValue } from '../store/types'
import { selectCell } from '../store/actions'
import PlayerIcon from './player-icon';
import { isEmpty } from '../lib/utils';

export type BoardProps = {
	columns: number
	selectCell: typeof selectCell
	nextValue: CellValue
	winner: CellValue
	cells: {[k:string]: CellState}
}

const Board: React.FC<BoardProps> = ({
	cells,
	columns,
	nextValue,
	selectCell,
	winner
}:BoardProps) => {
	if (isEmpty(cells)) {
		return null
	}
  const children = Object.values(cells).map(({ x, y, value }) => {
	  return (<Cell
	      key={`cell-${x},${y}`}
	      x={x}
	      y={y}
		  value={value}
		  width={(100/columns - 1)}
	      onSelect={() => {
				 if (!value) {
	          		selectCell(x, y)
				 }
	  	  }}
	          />
	   )
  })

  const iconStyle = {
	  width: '1em',
	  height: '1em'
  }
  const playerValue = winner ? winner : nextValue
  const text = winner ? 'Winner! ' : 'Next Player: '
  return (
	<div className='board-wrapper'>
		<Grid container>
			<Grid item style={{padding: '3px 0 0 0'}}>
				{text}
			</Grid>
			<Grid item>
				<PlayerIcon player={playerValue} style={iconStyle} />
			</Grid>
		</Grid>
	  	<div className='board'>
	 		{children}
	 	</div>
	</div>
  );
}

const mapStateToProps = ({ cells, rows, columns, nextValue, winner }:AppState) => {
  return { rows, columns, cells, nextValue, winner }
}

export default connect(
  mapStateToProps,
  { selectCell }
)(Board)
