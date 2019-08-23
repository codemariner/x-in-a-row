import React from 'react';

import Cell from './cell';

export type BoardProps = {
	rows?: number
	columns?: number
}

const Board: React.FC<BoardProps> = (props) => {
	const {rows, columns} = props;
	const cells = [];
	for (let x = 0; x < rows; x++) {
		for (let y = 0; y < columns; y++) {
			const cell = (<Cell key={`cell-${x}-${y}`} x={x} y={y}/>)
			cells.push(cell);
		}
	}
	return <div className='board'>{cells}</div>;
}

Board.defaultProps = {
	rows: 3,
	columns: 3
}

export default Board;