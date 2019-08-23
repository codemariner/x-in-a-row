import React from 'react';

export type CellValue = 'X' | 'O';

type CellProps = {
	x: number
	y: number
	value?: CellValue
}

const Cell: React.FC<CellProps> = (props) => {
	const {x, y, value} = props;
	return (
		<div className='cell'>
			<div>{x},{y}</div>
			<div>{value}</div>
		</div>
	)
}

export default Cell;