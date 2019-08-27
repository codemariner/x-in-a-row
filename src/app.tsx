import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import Board from './components/board';
import BoardForm from './components/form';
import { AppState } from './store/types';
import { isEmpty } from './lib/utils';

import './index.scss';

type AppProps = Pick<AppState, 'nextValue' | 'winner' | 'cells'>;

const App: React.FC<AppProps> = ({ cells, winner }: AppProps):React.ReactElement => (
    <div>
        <Board />
        {isEmpty(cells) || winner ? (
            <div className="board-form-wrapper">
                <Typography variant="h3">{winner ? 'Start' : 'Create'} a new game</Typography>
                <BoardForm />
            </div>
        ) : null}
    </div>
);

const mapStateToProps = ({ cells, nextValue, winner }: AppState) => {
    return {
        cells,
        nextValue,
        winner
    };
};

export default connect(mapStateToProps)(App);
