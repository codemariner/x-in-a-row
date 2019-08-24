import React from 'react'

import { connect } from 'react-redux'
import { AppState } from '../store/types'

export type CellValue = 'X' | 'O';

type CellProps = {
	x: number
	y: number
	value?: CellValue
	onSelect: any
}

const Cell: React.FC<CellProps> = (props) => {
  const { value, onSelect } = props
  return (
    <div className='cell'>
      <a className='cell-value' onClick={onSelect}>{value}</a>
    </div>
  )
}

export default Cell
