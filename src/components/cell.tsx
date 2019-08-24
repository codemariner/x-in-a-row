import React from 'react'
import { connect } from 'react-redux'

import PlayerIcon from './player-icon'
import { AppState } from '../store/types'

export type CellValue = 'X' | 'O';

type CellProps = {
	x: number
	y: number
	width: number
	value?: CellValue
	onSelect: any
	isWinner: boolean
}

const Cell: React.FC<CellProps> = (props) => {
  const { value, isWinner, onSelect, width } = props
  return (
    <div className={`cell ${isWinner ? 'winner' : ''}`} style={{ width: `${width}%` }}>
      <a className='cell-value' onClick={onSelect}><PlayerIcon player={value} /></a>
    </div>
  )
}

export default Cell
