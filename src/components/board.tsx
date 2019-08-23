import React from 'react'
import { connect } from 'react-redux'

import Cell from './cell'
import { AppState, CellState } from '../store/types'
import { selectCell } from '../store/actions'

export type BoardProps = {
	selectCell: typeof selectCell
	cells: {[k:string]: CellState}
}

const Board: React.FC<BoardProps> = (props:BoardProps) => {
  const { cells, selectCell } = props
  const children = Object.values(cells).map(({ x, y, value }) => {
	  return (<Cell
      key={`cell-${x},${y}`}
      x={x}
      y={y}
      onSelect={() => {
			 if (!value) {
          selectCell(x, y)
			 }
  }}
	          />
	   )
  })
  return <div className='board'>{children}</div>
}

const mapStateToProps = ({ cells, rows, columns }:AppState) => {
  console.log('cells', cells)
  return { rows, columns, cells }
}

export default connect(
  mapStateToProps,
  { selectCell }
)(Board)
