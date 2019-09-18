import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import UndoIcon from '@material-ui/icons/Undo';
import RestartIcon from '@material-ui/icons/Autorenew';

import Cell from './cell';
import { AppState, CellState, CellValue } from '../store/types';
import { selectCell, undo, initializeBoard } from '../store/actions';
import PlayerIcon from './player-icon';
import { isEmpty } from '../lib/utils';

export type BoardProps = {
	columns: number;
	gravityEnabled: boolean;
    history: any[];
    initializeBoard: typeof initializeBoard;
    selectCell: typeof selectCell;
    nextValue: CellValue;
    rows: number;
    winner: CellValue;
    winningLength: number;
    winningCells: CellState[];
    cells: { [k: string]: CellState };
    undo: typeof undo;
};

type HeaderProps = {
	column: number
	width: number
	nextValue: CellValue
};

export const Header: React.FC<HeaderProps> = ({
	column,
	width,
	nextValue
}: HeaderProps) => {
    return (
        <div className={`header`} style={{ textAlign: 'center', height: '50px', width: `${width}%` }}>
            <PlayerIcon style={{height: '20px'}} player={nextValue} />
        </div>
    );
};

const Board: React.FC<BoardProps> = ({
    cells,
	columns,
	gravityEnabled,
    history,
    nextValue,
    rows,
    initializeBoard,
    selectCell,
    undo,
    winner,
    winningCells = [],
    winningLength
}: BoardProps) => {
    if (isEmpty(cells)) {
        return null;
	}
	const headers = gravityEnabled ? new Array(columns).fill(1).map((val, index) => (
		<Header key={`header-${index}`} column={index} nextValue={nextValue} width={100 / columns}/>
	)) : [];

    const children = Object.values(cells).map(cell => {
        const { x, y, value } = cell;
        return (
            <Cell
                key={`cell-${x},${y}`}
                x={x}
                y={y}
                isWinner={winningCells.includes(cell)}
                value={value}
                width={100 / columns - 1}
                onSelect={() => {
                    if (!value) {
                        selectCell(x, y);
                    }
                }}
            />
        );
    });

    const iconStyle = {
        width: '1em',
        height: '1em'
    };
    const playerValue = winner || nextValue;
    const text = winner ? 'Winner! ' : 'Next Player: ';
    return (
        <Grid container className="board-wrapper">
            <Grid container>
                <Grid item style={{ padding: '3px 0 0 0' }}>
                    {text}
                </Grid>
                <Grid item>
                    <PlayerIcon player={playerValue} style={iconStyle} />
                </Grid>
            </Grid>
            <Grid container className="board">
                {headers.concat(children)}
            </Grid>
            <Grid container justify="space-between" style={{ margin: '10px 0' }}>
                <Grid item>
                    <Button
                        variant="contained"
                        disabled={isEmpty(history)}
                        onClick={() => initializeBoard(rows, columns, winningLength, gravityEnabled)}
                    >
                        Restart <RestartIcon />
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" disabled={isEmpty(history)} onClick={undo}>
                        Undo <UndoIcon />
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = ({
    cells,
    rows,
	columns,
	gravityEnabled,
    history,
    nextValue,
    winner,
    winningCells,
    winningLength
}: AppState) => {
    return { rows, columns, cells, gravityEnabled, history, nextValue, winner, winningCells, winningLength };
};

export default connect(
    mapStateToProps,
    { selectCell, undo, initializeBoard }
)(Board);
