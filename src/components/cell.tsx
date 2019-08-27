/* eslint react/prop-types: 0 */
import React from 'react';

import PlayerIcon from './player-icon';

export type CellValue = 'X' | 'O';

interface CellProps {
    x: number;
    y: number;
    width: number;
    value?: CellValue;
    onSelect: any;
    isWinner: boolean;
}

const Cell: React.FC<CellProps> = props => {
    const { value, isWinner, onSelect, width } = props;
    return (
        <div className={`cell ${isWinner ? 'winner' : ''}`} style={{ width: `${width}%` }}>
            <a className="cell-value" onClick={onSelect}>
                <PlayerIcon player={value} />
            </a>
        </div>
    );
};

export default Cell;
