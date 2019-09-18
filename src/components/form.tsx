import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store/types';
import { initializeBoard } from '../store/actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface BoardFormProps {
    rows: number;
    columns: number;
    winningLength: number;
    initializeBoard?: typeof initializeBoard;
    gravityEnabled: boolean;
}

const BoardForm = ({ rows, columns, gravityEnabled, winningLength, initializeBoard }: BoardFormProps) => {
    const onSubmit = () => {
        const form = document.getElementById('newBoardForm');
        const inputs: HTMLCollection = form.getElementsByTagName('input');
        const values: any = {};
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i] as HTMLInputElement;
			values[input.name] = input.value ? parseInt(input.value) : input.checked;
        }
        initializeBoard(values.rows, values.columns, values.winningLength, values.gravityEnabled);
    };

    return (
        <div className="board-form">
            <form id="newBoardForm">
                <div className="row">
                    <TextField type="number" label="rows" name="rows" defaultValue={`${rows}`} variant="outlined" />
                </div>
                <div className="row">
                    <TextField
                        type="number"
                        label="columns"
                        name="columns"
                        defaultValue={`${columns}`}
                        variant="outlined"
                    />
                </div>
                <div className="row">
                    <TextField
                        type="number"
                        label="How many in a row"
                        name="winningLength"
                        defaultValue={`${winningLength}`}
                        variant="outlined"
                    />
                </div>
                <div className="row">
					<FormControlLabel
						control={ <Switch name="gravityEnabled" /> }
						label="Use Gravity"
						labelPlacement="start"
                    />
                </div>
                <div className="row">
                    <Button type="button" name="submit" value="create" onClick={onSubmit} variant="contained">
                        Create
                    </Button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = ({ rows, columns, gravityEnabled, winningLength }: AppState): BoardFormProps => ({
    rows,
    columns,
	winningLength,
	gravityEnabled
});

export default connect(
    mapStateToProps,
    { initializeBoard }
)(BoardForm);
