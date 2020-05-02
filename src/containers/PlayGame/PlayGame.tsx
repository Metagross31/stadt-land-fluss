import { cloneDeep } from 'lodash';
import Pubnub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { RouterProps } from 'react-router';
import AdminPanel from '../../components/AdminPanel/AdminPanel';
import { LetterAnimation } from '../../components/LetterAnimation/LetterAnimation';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import PhaseEvaluateRound from '../../components/PhaseEvaluateRound/PhaseEvaluateRound';
import PhaseFillOutTextfields from '../../components/PhaseFillOutTextfields/PhaseFillOutTextfields';
import PhaseWaitingToStart from '../../components/PhaseWaitingToStart/PhaseWaitingToStart';
import PubNubEventHandler from '../../components/PubNubEventHandler/PubNubEventHandler';
import { PUBNUB_CONFIG } from '../../config/pubnub.config';
import { GamePhase } from '../../constants/game.constant';
import {
    EvaluationOfPlayerInput,
    GameConfig,
    GameRound,
    GameRoundEvaluation,
    PlayerInput,
    PlayerInputEvaluation,
} from '../../models/game.interface';
import { PlayerInfo } from '../../models/player.interface';
import {
    PubNubCurrentRoundInputsMessage,
    PubNubEvaluationOfPlayerInputMessage,
    PubNubKickPlayerMessage,
    PubNubMessage,
    PubNubMessageType,
    PubNubUserState,
} from '../../models/pub-nub-data.model';
import { AppAction, resetAppState, setDataOfFinishedGame, SetDataOfFinishedGamePayload } from '../../store/app.actions';
import { AppState } from '../../store/app.reducer';
import {
    createGameRoundEvaluation,
    getMinNumberOfMarkedAsInvalid,
    markEmptyPlayerInputsAsInvalid,
    processPlayerInputEvaluations,
} from '../../utils/game.utils';
import { createAndFillArray } from '../../utils/general.utils';

interface PlayGamePropsFromStore {
    gameConfig: GameConfig | null;
    gameId: string | null;
    playerInfo: PlayerInfo;
}
interface PlayGameDispatchProps {
    onSetDataOfFinishedGame: (payload: SetDataOfFinishedGamePayload) => void;
    onResetAppState: () => void;
}
interface PlayGameProps extends PlayGamePropsFromStore, PlayGameDispatchProps, RouterProps { }
interface PlayGameState {
    allPlayers: Map<string, PlayerInfo>;
    currentPhase: GamePhase;
    currentRoundEvaluation: GameRoundEvaluation;
    currentRoundInputs: PlayerInput[];
    currentRound: number;
    gameConfig: GameConfig | null;
    gameRounds: GameRound[];
    loadingScreenMessage: string | null;
    playersThatFinishedEvaluation: Map<string, boolean>;
    showLetterAnimation: boolean;
    showLoadingScreen: boolean;
}

class PlayGame extends Component<PlayGameProps, PlayGameState> {
    public state: PlayGameState = {
        allPlayers: new Map<string, PlayerInfo>(),
        currentPhase: GamePhase.waitingToStart,
        currentRoundEvaluation: new Map<string, PlayerInputEvaluation[]>(),
        currentRoundInputs: [],
        currentRound: 1,
        gameConfig: null,
        gameRounds: [],
        loadingScreenMessage: null,
        playersThatFinishedEvaluation: new Map<string, boolean>(),
        showLetterAnimation: false,
        showLoadingScreen: true
    };
    private pubNubClient: any;

    public render() {
        // This check serves as a route guard. If gameId and playerInfo aren't present in state,
        // then user wasn't redirected here from NewGame or JoinGame component.
        if (this.props.gameId === null || this.props.playerInfo === null) { return null; }

        const { gameId, playerInfo } = this.props;
        const { allPlayers, loadingScreenMessage, showLetterAnimation, showLoadingScreen } = this.state;
        if (!this.pubNubClient) {
            this.pubNubClient = new Pubnub({ ...PUBNUB_CONFIG, uuid: playerInfo.id });
        }

        let currentPhaseElement: JSX.Element | null = null;
        switch (this.state.currentPhase) {
            case GamePhase.waitingToStart:
                currentPhaseElement = (
                    <PhaseWaitingToStart
                        gameConfig={this.state.gameConfig}
                        gameId={gameId}
                        allPlayers={allPlayers}
                        playerInfo={playerInfo}
                        sendMessage={this.sendMessage}
                    />
                );
                break;
            case GamePhase.fillOutTextfields:
                currentPhaseElement = (
                    <PhaseFillOutTextfields
                        currentRound={this.state.currentRound}
                        gameConfig={this.state.gameConfig as GameConfig}
                        gameRoundInputs={this.state.currentRoundInputs}
                        updateCurrentRoundInputs={this.updateCurrentRoundInputs}
                        sendRoundFinishedMessage={this.sendRoundFinishedMessage}
                    />
                );
                break;
            case GamePhase.evaluateRound:
                currentPhaseElement = (
                    <PhaseEvaluateRound
                        allPlayers={allPlayers}
                        currentRound={this.state.currentRound}
                        currentRoundEvaluation={this.state.currentRoundEvaluation}
                        gameConfig={this.state.gameConfig as GameConfig}
                        gameRounds={this.state.gameRounds}
                        playerInfo={playerInfo}
                        updateEvaluationOfPlayerInput={this.updateEvaluationOfPlayerInput}
                        sendEvaluationFinishedMessage={this.sendEvaluationFinishedMessage}
                    />
                );
                break;
            default:
        }
        const letterAnimationElement = this.state.gameConfig && showLetterAnimation ? (
            <LetterAnimation
                letterToUnveil={this.state.gameConfig.letters[this.state.currentRound - 1]}
                callbackWhenAnimationDone={this.callbackWhenAnimationDone}
            />
        ) : null;
        const loadingScreenElement = showLoadingScreen ? <LoadingScreen message={loadingScreenMessage} /> : null;
        return (
            <PubNubProvider client={this.pubNubClient}>
                {/* The props passed to PubNubEventHandler must never be changed,
                    in order to ensure that the component is not rerendered!
                    (PubNubEventHandler is wrapped in React.memo) */}
                <PubNubEventHandler
                    gameChannel={this.props.gameId}
                    gameConfig={this.props.gameConfig}
                    playerInfo={this.props.playerInfo}
                    navigateToDashboard={this.navigateToDashboard}
                    addPlayers={this.addPlayers}
                    processPubNubMessage={this.processPubNubMessage}
                />
                {letterAnimationElement}
                {loadingScreenElement}
                {!showLoadingScreen && !showLetterAnimation ? (
                    <div className="main-content-wrapper">
                        {currentPhaseElement}
                    </div>
                ) : null}
                {playerInfo.isAdmin && allPlayers.size > 1 ?
                    <AdminPanel allPlayers={allPlayers} kickPlayer={this.sendKickPlayerMessage} />
                    : null}
            </PubNubProvider>
        );
    }

    public componentDidMount() {
        // If gameId and playerInfo aren't present in application state, then reroute user to dashboard.
        if (this.props.gameId === null || this.props.playerInfo === null) {
            this.props.history.push('/');
            return;
        }
        const allPlayers = cloneDeep(this.state.allPlayers);
        allPlayers.set(this.props.playerInfo.id, this.props.playerInfo);
        // If player is the game admin, the gameConfig can be taken from application state
        // and we can hide the loading screen and show PhaseWaitingToStart component right away.
        if (this.props.playerInfo.isAdmin) {
            this.setState({ allPlayers, gameConfig: this.props.gameConfig, showLoadingScreen: false });
        } else {
            this.setState({ allPlayers });
        }
    }

    private sendMessage = (message: PubNubMessage) => {
        this.pubNubClient.publish(
            {
                channel: this.props.gameId as string,
                message,
                storeInHistory: true,
                ttl: 1 // time to live (in hours)
            },
            (status: any, response: any) => console.log('PubNub Publish:', status, response)
        );
    };

    private callbackWhenAnimationDone = () => {
        this.setState({ showLetterAnimation: false });
    }

    private navigateToDashboard = () => {
        this.props.history.push('/');
        this.props.onResetAppState();
    }

    /**
     * Called by PubNubEventHandler when it receives a PubNub presence event with action 'state-change'.
     * It processes information about players that had already joined the game before this user
     * joined (hereNow result) or about a player that joins the game after this user joined.
     */
    private addPlayers = (...newPlayers: PubNubUserState[]) => {
        // Ignore information about players that try to join after the game has already started.
        if (this.state.currentPhase !== GamePhase.waitingToStart) { return; }
        let gameConfig: GameConfig | null = null;
        const allPlayers = cloneDeep(this.state.allPlayers);
        newPlayers.forEach(newPlayer => {
            allPlayers.set(newPlayer.playerInfo.id, newPlayer.playerInfo);
            // If we are not the game admin, we obtain the game config from the admin's PubNubUserState.
            if (newPlayer.gameConfig && !this.state.gameConfig) {
                gameConfig = newPlayer.gameConfig;
            }
        });
        // Only after we received the gameConfig from the admin, we hide the loading screen
        // and render the PhaseWaitingToStart component instead.
        if (gameConfig) {
            this.setState({ allPlayers, gameConfig, showLoadingScreen: false });
        } else {
            this.setState({ allPlayers });
        }
    }

    /**
     * PubNubEventHandler calls this method when it receives a PubNub message with attribute 'type'.
     */
    private processPubNubMessage = (event: Pubnub.MessageEvent) => {
        const message = event.message as PubNubMessage;
        switch (message.type) {
            case PubNubMessageType.startGame:
                this.startGame();
                break;
            case PubNubMessageType.roundFinished:
                this.stopRoundAndSendInputs();
                break;
            case PubNubMessageType.currentRoundInputs:
                this.addPlayerInputForFinishedRound(event.publisher, message.payload);
                break;
            case PubNubMessageType.evaluationOfPlayerInput:
                this.processEvaluationOfPlayerInput(event.publisher, message.payload);
                break;
            case PubNubMessageType.evaluationFinished:
                this.countPlayerAsEvaluationFinished(event.publisher);
                break;
            case PubNubMessageType.kickPlayer:
                this.removePlayerFromGame(message.payload)
                break;
            default:
        }
    }

    /**
    * This method is called when the PubNub message 'startGame' is received.
    */
    private startGame = () => {
        const gameConfig = this.state.gameConfig as GameConfig;
        const roundInputs = createAndFillArray<PlayerInput>(gameConfig.categories.length, { text: '', valid: true });
        this.setState({
            currentPhase: GamePhase.fillOutTextfields,
            currentRoundInputs: roundInputs,
            showLetterAnimation: true
        });
    }

    private updateCurrentRoundInputs = (newCurrentRoundInputs: PlayerInput[]) => {
        this.setState({ currentRoundInputs: newCurrentRoundInputs });
    }

    private sendRoundFinishedMessage = () => {
        this.setState({ showLoadingScreen: true });
        this.sendMessage({ type: PubNubMessageType.roundFinished });
    }

    /**
     * This method is called when the PubNub message 'roundFinished' is received.
     */
    private stopRoundAndSendInputs = () => {
        // Prepare new GameRound object for addPlayerInputForFinishedRound method
        // as well as new currentRoundEvaluation object for evaluation phase.
        const gameRounds: GameRound[] = [...this.state.gameRounds, new Map<string, PlayerInput[]>()];
        const currentRoundEvaluation = createGameRoundEvaluation(
            this.state.allPlayers, (this.state.gameConfig as GameConfig).categories
        );
        this.setState({ currentRoundEvaluation, gameRounds, showLoadingScreen: true });
        // Send this player's text inputs of current round to other players (and herself/himself).
        const message = new PubNubCurrentRoundInputsMessage(markEmptyPlayerInputsAsInvalid(this.state.currentRoundInputs));
        this.sendMessage(message.toPubNubMessage());
    }

    /**
     * This method is called when the PubNub message 'currentRoundInputs' is received.
     */
    private addPlayerInputForFinishedRound = (playerId: string, playerInputsForFinishedRound: PlayerInput[]) => {
        const gameRounds = cloneDeep(this.state.gameRounds);
        gameRounds[this.state.currentRound - 1].set(playerId, playerInputsForFinishedRound);
        // Did we collect the inputs from all players?
        if (gameRounds[this.state.currentRound - 1].size === this.state.allPlayers.size) {
            // If yes, then start the evaluation of the finished round.
            this.setState({ currentPhase: GamePhase.evaluateRound, gameRounds, showLoadingScreen: false });
        } else {
            // If no, then only store the updated gameRounds object in state.
            this.setState({ gameRounds });
        }
    }

    /**
     * Is called by PhaseEvaluateRound component in order to communicate a player input evaluation via a
     * PubNub message. This message is then processed by all players in the game (including the user who sent it).
     */
    private updateEvaluationOfPlayerInput = (newEvaluation: EvaluationOfPlayerInput) => {
        const message = new PubNubEvaluationOfPlayerInputMessage(newEvaluation);
        this.sendMessage(message.toPubNubMessage());
    }

    /**
     * This method is called when the PubNub message 'evaluationOfPlayerInput' is received.
     */
    private processEvaluationOfPlayerInput = (evaluatingPlayerId: string, newEvaluation: EvaluationOfPlayerInput) => {
        const currentRoundEvaluation = cloneDeep(this.state.currentRoundEvaluation);
        const playerInputEvaluations = currentRoundEvaluation.get(newEvaluation.evaluatedPlayerId);
        if (playerInputEvaluations) {
            playerInputEvaluations[newEvaluation.categoryIndex].set(evaluatingPlayerId, newEvaluation.markedAsValid);
        }
        this.setState({ currentRoundEvaluation });
    }

    /**
     * Is called by PhaseEvaluateRound component in order to communicate to all players
     * that the user of this instance of the game has finished evaluating the current round.
     */
    private sendEvaluationFinishedMessage = () => {
        this.setState({ loadingScreenMessage: 'Warte auf Mitspieler', showLoadingScreen: true });
        this.sendMessage({ type: PubNubMessageType.evaluationFinished });
    }

    /**
     * This method is called when the PubNub message 'evaluationFinished' is received.
     */
    private countPlayerAsEvaluationFinished = (evaluatingPlayerId: string) => {
        const playersThatFinishedEvaluation = cloneDeep(this.state.playersThatFinishedEvaluation);
        playersThatFinishedEvaluation.set(evaluatingPlayerId, true);
        if (playersThatFinishedEvaluation.size === this.state.allPlayers.size) {
            this.processEvaluationsAndStartNextRoundOrFinishGame();
        } else {
            this.setState({ playersThatFinishedEvaluation });
        }
    }

    private processEvaluationsAndStartNextRoundOrFinishGame = () => {
        const { allPlayers, currentRound, currentRoundEvaluation, gameRounds } = this.state;
        const gameConfig = this.state.gameConfig as GameConfig;
        const newGameRounds = cloneDeep(gameRounds);
        newGameRounds[currentRound - 1] = processPlayerInputEvaluations(
            gameRounds[currentRound - 1], currentRoundEvaluation, getMinNumberOfMarkedAsInvalid(allPlayers.size)
        );
        if (currentRound === gameConfig.numberOfRounds) {
            // Finish game and show results.
            this.props.onSetDataOfFinishedGame({ allPlayers, gameConfig, gameRounds: newGameRounds });
            this.props.history.push('/results');
        } else {
            // Start next round of the game.
            this.setState({
                currentPhase: GamePhase.fillOutTextfields,
                currentRoundEvaluation: createGameRoundEvaluation(allPlayers, gameConfig.categories),
                currentRoundInputs: createAndFillArray<PlayerInput>(gameConfig.categories.length, { text: '', valid: true }),
                currentRound: currentRound + 1,
                gameRounds: newGameRounds,
                loadingScreenMessage: null,
                playersThatFinishedEvaluation: new Map<string, boolean>(),
                showLetterAnimation: true,
                showLoadingScreen: false
            });
        }
    }

    private sendKickPlayerMessage = (playerId: string) => {
        const message = new PubNubKickPlayerMessage(playerId);
        this.sendMessage(message.toPubNubMessage());
    }

    /**
     * This method is called when the PubNub message 'kickPlayer' is received.
     */
    private removePlayerFromGame = (playerId: string) => {
        // If the player to be removed is the user of this game instance, then navigate to dashboard.
        if (this.props.playerInfo.id === playerId) {
            // TODO: delete current game data in local storage
            this.props.history.push('/');
            return;
        }
        // Remove player's data from component's state.
        const allPlayers = cloneDeep(this.state.allPlayers);
        allPlayers.delete(playerId);
        const currentRoundEvaluation = cloneDeep(this.state.currentRoundEvaluation);
        currentRoundEvaluation.delete(playerId);
        const gameRounds = cloneDeep(this.state.gameRounds);
        gameRounds.forEach(round => round.delete(playerId));
        const playersThatFinishedEvaluation = cloneDeep(this.state.playersThatFinishedEvaluation);
        playersThatFinishedEvaluation.delete(playerId);
        this.setState({ allPlayers, currentRoundEvaluation, gameRounds, playersThatFinishedEvaluation });
        // If we're currently in evaluation phase, check if remaining players have finished evaluation.
        if (this.state.currentPhase === GamePhase.evaluateRound && playersThatFinishedEvaluation.size === allPlayers.size) {
            this.processEvaluationsAndStartNextRoundOrFinishGame();
        }
    }
}

const mapStateToProps = (state: AppState): PlayGamePropsFromStore => {
    return {
        gameConfig: state.gameConfig,
        gameId: state.gameId,
        playerInfo: state.playerInfo as PlayerInfo
    };
}
const mapDispatchToProps = (dispatch: Dispatch<AppAction>): PlayGameDispatchProps => {
    return {
        onSetDataOfFinishedGame: (payload: SetDataOfFinishedGamePayload) => {
            dispatch(setDataOfFinishedGame(payload))
        },
        onResetAppState: () => {
            dispatch(resetAppState())
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);
