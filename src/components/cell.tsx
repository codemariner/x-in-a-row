import React from 'react'

import PlayerIcon from './player-icon'

export type CellValue = 'X' | 'O';

type CellProps = {
	x: number
	y: number
	width: number
	value?: CellValue
	onSelect: any
}

const Cell: React.FC<CellProps> = (props) => {
  const { value, onSelect, width } = props
  return (
    <div className='cell' style={{width: `${width}%`}}>
      <a className='cell-value' onClick={onSelect}><PlayerIcon player={value}/></a>
    </div>
  )
}

export default Cell
