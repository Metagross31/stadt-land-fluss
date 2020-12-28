import { Divider } from '@material-ui/core';
import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { RouterProps } from 'react-router';

import GameResultsList from '../../components/GameResultsList/GameResultsList';
import GameRoundsOverviewButton from '../../components/GameRoundsOverviewButton/GameRoundsOverviewButton';
import HallOfFameButton from '../../components/HallOfFameButton/HallOfFameButton';
import ScoringOptionsList from '../../components/ScoringOptionsList/ScoringOptionsList';
import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import ToDashboardButton from '../../components/ToDashboardButton/ToDashboardButton';
import { GameConfig, GameResultsGroup, GameRound, HallOfFameEntry } from '../../models/game.interface';
import { PlayerInfo } from '../../models/player.interface';
import { AppAction, resetAppState } from '../../store/app.actions';
import { AppState } from '../../store/app.reducer';
import { calculateGameResults, createHallOfFameData, getPlayersInAlphabeticalOrder } from '../../utils/game.utils';
import styles from './GameResults.module.css';

interface GameResultsDispatchProps {
    onResetAppState: () => void;
}
interface GameResultsProps extends AppState, GameResultsDispatchProps, RouterProps { }
interface GameResultsState {
    gameConfig: GameConfig | null;
    gameResults: GameResultsGroup[];
    gameRounds: GameRound[];
    hallOfFameData: HallOfFameEntry[];
    sortedPlayers: PlayerInfo[];
}

class GameResults extends Component<GameResultsProps, GameResultsState> {
    public state: GameResultsState = {
        gameConfig: null,
        gameResults: [],
        gameRounds: [],
        hallOfFameData: [],
        sortedPlayers: []
    };

    public render() {
        const { gameConfig, gameResults, gameRounds, hallOfFameData, sortedPlayers } = this.state;
        if (gameConfig === null) { return null; }
        return (
            <div className="main-content-wrapper">
                <div className="material-card-style">
                    <SectionHeader text="Ergebnis"></SectionHeader>
                    <p className="sr-only" role="alert">
                        Das Spiel ist zu Ende. Die Ergebnisse werden angezeigt.
                    </p>
                    <GameResultsList gameResults={gameResults} />
                    <Divider />
                    <div className={styles.button_wrapper}>
                        <GameRoundsOverviewButton
                            gameConfig={gameConfig}
                            rounds={gameRounds}
                            sortedPlayers={sortedPlayers}
                        />
                        <HallOfFameButton hallOfFameData={hallOfFameData} />
                    </div>
                </div>
                <div className="material-card-style">
                    <SectionHeader text="Spieleinstellungen"></SectionHeader>
                    <div className="game-settings">
                        <h4>Runden</h4>
                        <p>{gameConfig.numberOfRounds}</p>
                        <h4>Buchstaben</h4>
                        <p>{gameConfig.letters.join(', ')}</p>
                        <h4>Kategorien</h4>
                        <p>{gameConfig.categories.join(', ')}</p>
                    </div>
                    <ScoringOptionsList isForGameResultsPage={true} rules={gameConfig.scoringOptions} />
                </div>
                <ToDashboardButton onReturnToDashboard={() => this.props.history.push('/')} />
            </div>
        );
    }

    public componentDidMount() {
        const { allPlayers, gameConfig, gameRounds } = this.props;
        // If there is no data present in application state, then reroute user to dashboard.
        if (allPlayers === null || gameConfig === null || gameRounds === null) {
            this.props.history.push('/');
        } else {
            this.setState({
                gameConfig,
                gameResults: calculateGameResults(allPlayers, gameRounds),
                gameRounds,
                hallOfFameData: createHallOfFameData(allPlayers, gameConfig, gameRounds),
                sortedPlayers: getPlayersInAlphabeticalOrder(allPlayers)
            });
            this.props.onResetAppState();
        }
    }
}

const mapStateToProps = (state: AppState): AppState => state;
const mapDispatchToProps = (dispatch: Dispatch<AppAction>): GameResultsDispatchProps => {
    return {
        onResetAppState: () => dispatch(resetAppState())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(GameResults);
