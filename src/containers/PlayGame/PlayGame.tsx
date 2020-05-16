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
    PubNubDataForCurrentGameMessage,
    PubNubDataForCurrentGameMessagePayload,
    PubNubEvaluationOfPlayerInputMessage,
    PubNubKickPlayerMessage,
    PubNubMessage,
    PubNubMessageType,
    PubNubUserState,
} from '../../models/pub-nub-data.model';
import { AppAction, resetAppState, setDataOfFinishedGame, SetDataOfFinishedGamePayload } from '../../store/app.actions';
import { AppState } from '../../store/app.reducer';
import {
    calculatePointsForCategory,
    calculatePointsForRound,
    compressGameRoundEvaluation,
    createGameRoundEvaluation,
    decompressGameRoundEvaluation,
    getEmptyRoundInputs,
    getMinNumberOfInvalids,
    getNumberOfInvalids,
    getPlayersInAlphabeticalOrder,
    markEmptyPlayerInputsAsInvalid,
    restoreGameRoundsOfRunningGameFromLocalStorage,
    shouldUserRespondToRequestGameDataMessage,
    setPointsAndValidityOfPlayerInputs,
} from '../../utils/game.utils';
import { convertCollectionToMap, convertMapToCollection } from '../../utils/general.utils';
import {
    getRunningGameConfigFromLocalStorage,
    removeAllDataOfRunningGameFromLocalStorage,
    setRunningGameConfigInLocalStorage,
    setRunningGameRoundInLocalStorage,
} from '../../utils/local-storage.utils';

interface PlayGamePropsFromStore {
    gameConfig: GameConfig | null;
    gameId: string | null;
    isRejoiningGame: boolean;
    /** Player info for the user of this instance of the "Stadt-Land-Fluss" app. */
    playerInfo: PlayerInfo;
}
interface PlayGameDispatchProps {
    onSetDataOfFinishedGame: (payload: SetDataOfFinishedGamePayload) => void;
    onResetAppState: () => void;
}
interface PlayGameProps extends PlayGamePropsFromStore, PlayGameDispatchProps, RouterProps { }
export interface PlayGameState {
    allPlayers: Map<string, PlayerInfo>;
    currentPhase: GamePhase;
    currentRound: number;
    currentRoundEvaluation: GameRoundEvaluation;
    currentRoundInputs: PlayerInput[];
    gameConfig: GameConfig | null;
    gameRounds: GameRound[];
    playersThatFinishedEvaluation: Map<string, boolean>;
    showLetterAnimation: boolean;
    showLoadingScreen: boolean;
}

class PlayGame extends Component<PlayGameProps, PlayGameState> {
    public state: PlayGameState = {
        allPlayers: new Map<string, PlayerInfo>(),
        currentPhase: GamePhase.waitingToStart,
        currentRound: 1,
        currentRoundEvaluation: new Map<string, PlayerInputEvaluation[]>(),
        currentRoundInputs: [],
        gameConfig: null,
        gameRounds: [],
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
        const { showLetterAnimation, showLoadingScreen } = this.state;
        if (!this.pubNubClient) {
            this.pubNubClient = new Pubnub({ ...PUBNUB_CONFIG, uuid: playerInfo.id });
        }

        let currentPhaseElement: JSX.Element | null = null;
        switch (this.state.currentPhase) {
            case GamePhase.waitingToStart:
                currentPhaseElement = (
                    <PhaseWaitingToStart
                        allPlayers={this.state.allPlayers}
                        gameConfig={this.state.gameConfig}
                        gameId={gameId}
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
                        allPlayers={this.state.allPlayers}
                        currentRound={this.state.currentRound}
                        currentRoundEvaluation={this.state.currentRoundEvaluation}
                        gameConfig={this.state.gameConfig as GameConfig}
                        gameRounds={this.state.gameRounds}
                        playerInfo={playerInfo}
                        playersThatFinishedEvaluation={this.state.playersThatFinishedEvaluation}
                        updateEvaluationOfPlayerInput={this.updateEvaluationOfPlayerInput}
                        sendEvaluationFinishedMessage={this.sendEvaluationFinishedMessage}
                    />
                );
                break;
            default:
        }
        const letterAnimationElement = (
            <LetterAnimation
                letterToUnveil={this.state.gameConfig ? this.state.gameConfig.letters[this.state.currentRound - 1] : ''}
                callbackWhenAnimationDone={this.callbackWhenAnimationDone}
            />
        );
        const adminPanel = <AdminPanel allPlayers={this.state.allPlayers} kickPlayer={this.sendKickPlayerMessage} />;

        return (
            <PubNubProvider client={this.pubNubClient}>
                {/* The props passed to PubNubEventHandler must never be changed,
                    in order to ensure that the component is not rerendered!
                    (PubNubEventHandler is wrapped in React.memo) */}
                <PubNubEventHandler
                    gameChannel={this.props.gameId}
                    gameConfig={this.props.gameConfig}
                    isRejoiningGame={this.props.isRejoiningGame}
                    playerInfo={this.props.playerInfo}
                    navigateToDashboard={this.navigateToDashboard}
                    addPlayers={this.addPlayers}
                    processPubNubMessage={this.processPubNubMessage}
                />
                {showLetterAnimation ? letterAnimationElement : null}
                {showLoadingScreen ? <LoadingScreen /> : null}
                {!showLoadingScreen && !showLetterAnimation ? (
                    <div className="main-content-wrapper">
                        {currentPhaseElement}
                    </div>
                ) : null}
                {playerInfo.isAdmin && this.state.allPlayers.size > 1 ? adminPanel : null}
            </PubNubProvider>
        );
    }

    public componentDidMount() {
        const { gameConfig, gameId, isRejoiningGame, playerInfo } = this.props;
        // If gameId and playerInfo aren't present in application state, then reroute user to dashboard.
        if (gameId === null || playerInfo === null) {
            this.props.history.push('/');
            return;
        }
        // If player is rejoining the game, we need to request the game data from the other players.
        if (isRejoiningGame) {
            this.sendMessage({ type: PubNubMessageType.requestGameData });
        } else {
            const allPlayers = new Map<string, PlayerInfo>();
            allPlayers.set(playerInfo.id, playerInfo);
            // If user is the game admin, the gameConfig can be taken from application state
            // and we can hide the loading screen and show PhaseWaitingToStart component right away.
            if (playerInfo.isAdmin) {
                setRunningGameConfigInLocalStorage(gameConfig as GameConfig);
                this.setState({ allPlayers, gameConfig, showLoadingScreen: false });
            } else {
                this.setState({ allPlayers });
            }
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
        removeAllDataOfRunningGameFromLocalStorage();
        this.props.onResetAppState();
        this.props.history.push('/');
    }

    /**
     * Called by PubNubEventHandler when it receives a PubNub presence event with action 'state-change'.
     * It processes information about players that had already joined the game before this user joined
     * (hereNow result) or about a player that joins the game after this user joined.
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
            setRunningGameConfigInLocalStorage(gameConfig);
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
            case PubNubMessageType.requestGameData:
                if (shouldUserRespondToRequestGameDataMessage(this.props.playerInfo, this.state.allPlayers, event.publisher)) {
                    if (this.state.allPlayers.has(event.publisher)) {
                        // Only send data to a rejoining player who hasn't been kicked out by the admin.
                        this.sendDataForCurrentGame(event.publisher);
                    } else {
                        // Send kickPlayer message again for kicked out player that tried to rejoin game.
                        this.sendKickPlayerMessage(event.publisher);
                    }
                }
                break;
            case PubNubMessageType.dataForCurrentGame:
                this.processDataForCurrentGame(message.payload);
                break;
            default:
        }
    }

    /**
    * This method is called when the PubNub message 'startGame' is received.
    */
    private startGame = () => {
        const gameConfig = this.state.gameConfig as GameConfig;
        const currentRoundEvaluation = createGameRoundEvaluation(this.state.allPlayers, gameConfig.categories);
        this.setState({
            currentPhase: GamePhase.fillOutTextfields,
            currentRoundEvaluation,
            currentRoundInputs: getEmptyRoundInputs(gameConfig.categories.length),
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
        this.setState({ gameRounds, showLoadingScreen: true });
        // Send this player's text inputs of current round to other players (and herself/himself).
        const message = new PubNubCurrentRoundInputsMessage(markEmptyPlayerInputsAsInvalid(this.state.currentRoundInputs));
        this.sendMessage(message.toPubNubMessage());
    }

    /**
     * This method is called when the PubNub message 'currentRoundInputs' is received.
     */
    private addPlayerInputForFinishedRound = (playerId: string, playerInputsForFinishedRound: PlayerInput[]) => {
        const gameRounds = cloneDeep(this.state.gameRounds);
        const roundIndex = this.state.currentRound - 1;
        gameRounds[roundIndex].set(playerId, playerInputsForFinishedRound);
        // Did we collect the inputs from all players?
        if (gameRounds[roundIndex].size === this.state.allPlayers.size) {
            // If yes, then calculate points and start the evaluation of the finished round.
            calculatePointsForRound((this.state.gameConfig as GameConfig).scoringOptions, gameRounds[roundIndex]);
            setRunningGameRoundInLocalStorage(this.state.currentRound, gameRounds[roundIndex]);
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
     * It processes the new evaluation and changes data in currentRoundEvaluation and gameRounds accordingly.
     */
    private processEvaluationOfPlayerInput = (evaluatingPlayerId: string, newEvaluation: EvaluationOfPlayerInput) => {
        if (!this.state.allPlayers.has(evaluatingPlayerId)) { return; }
        const { categoryIndex, evaluatedPlayerId, markedAsValid } = newEvaluation;
        const currentRoundEvaluation = cloneDeep(this.state.currentRoundEvaluation);
        const playerInputEvaluations = currentRoundEvaluation.get(evaluatedPlayerId) as PlayerInputEvaluation[];
        playerInputEvaluations[categoryIndex].set(evaluatingPlayerId, markedAsValid);
        const gameRounds = cloneDeep(this.state.gameRounds);
        const isInputValid = getNumberOfInvalids(playerInputEvaluations[categoryIndex]) < getMinNumberOfInvalids(this.state.allPlayers.size);
        const finishedRound = gameRounds[this.state.currentRound - 1];
        (finishedRound.get(evaluatedPlayerId) as PlayerInput[])[categoryIndex].valid = isInputValid;
        calculatePointsForCategory((this.state.gameConfig as GameConfig).scoringOptions, finishedRound, categoryIndex);
        this.setState({ currentRoundEvaluation, gameRounds });
    }

    /**
     * Is called by PhaseEvaluateRound component in order to communicate to all players
     * that the user of this instance of the game has finished evaluating the current round.
     */
    private sendEvaluationFinishedMessage = () => this.sendMessage({ type: PubNubMessageType.evaluationFinished });

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
        const { allPlayers, currentRound, gameRounds } = this.state;
        const gameConfig = this.state.gameConfig as GameConfig;
        if (currentRound === gameConfig.numberOfRounds) {
            // Finish game and show results.
            removeAllDataOfRunningGameFromLocalStorage();
            this.props.onSetDataOfFinishedGame({ allPlayers, gameConfig, gameRounds });
            this.props.history.push('/results');
        } else {
            // Save finished game round in local storage and start next round of the game.
            setRunningGameRoundInLocalStorage(this.state.currentRound, gameRounds[currentRound - 1]);
            this.setState({
                currentPhase: GamePhase.fillOutTextfields,
                currentRoundEvaluation: createGameRoundEvaluation(allPlayers, gameConfig.categories),
                currentRoundInputs: getEmptyRoundInputs(gameConfig.categories.length),
                currentRound: currentRound + 1,
                gameRounds,
                playersThatFinishedEvaluation: new Map<string, boolean>(),
                showLetterAnimation: true
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
            removeAllDataOfRunningGameFromLocalStorage();
            this.props.onResetAppState();
            this.props.history.push('/');
            return;
        }
        if (this.state.allPlayers.has(playerId)) {
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

    private sendDataForCurrentGame = (requestingPlayerId: string) => {
        const sortedPlayers = getPlayersInAlphabeticalOrder(this.state.allPlayers);
        const compressedGameRoundEvaluation = this.state.currentPhase === GamePhase.evaluateRound
            ? compressGameRoundEvaluation(this.state.currentRoundEvaluation, sortedPlayers) : [];
        const message = new PubNubDataForCurrentGameMessage({
            compressedGameRoundEvaluation,
            currentPhase: this.state.currentPhase,
            currentRound: this.state.currentRound,
            playersThatFinishedEvaluation: convertMapToCollection<boolean>(this.state.playersThatFinishedEvaluation),
            requestingPlayerId,
            sortedPlayers
        });
        this.sendMessage(message.toPubNubMessage());
    }

    /**
     * This method is called when the PubNub message 'dataForCurrentGame' is received.
     */
    private processDataForCurrentGame = (payload: PubNubDataForCurrentGameMessagePayload) => {
        // Only process the information and update state if the message was meant for this user.
        if (this.props.playerInfo.id !== payload.requestingPlayerId) { return; }

        const gameConfig = getRunningGameConfigFromLocalStorage();
        // If we're in the evaluation phase, then we also need to restore the data for the current round.
        // Otherwise we only need to restore the data of the finished rounds.
        const numberOfRoundsToRestore = payload.currentPhase === GamePhase.evaluateRound ? payload.currentRound : payload.currentRound - 1;
        const gameRounds = restoreGameRoundsOfRunningGameFromLocalStorage(numberOfRoundsToRestore);
        if (gameConfig && gameRounds.length === numberOfRoundsToRestore) {
            const allPlayers = new Map<string, PlayerInfo>();
            payload.sortedPlayers.forEach(player => allPlayers.set(player.id, player));
            let currentRoundEvaluation: GameRoundEvaluation;
            // If we are in evaluation phase, then we received the current evaluations and need to apply them to the player inputs.
            if (payload.currentPhase === GamePhase.evaluateRound) {
                currentRoundEvaluation = decompressGameRoundEvaluation(payload.compressedGameRoundEvaluation, payload.sortedPlayers);
                setPointsAndValidityOfPlayerInputs(
                    gameConfig.scoringOptions, currentRoundEvaluation, getMinNumberOfInvalids(allPlayers.size), gameRounds[payload.currentRound - 1]
                );
            } else {
                currentRoundEvaluation = createGameRoundEvaluation(allPlayers, gameConfig.categories);
            }
            this.setState({
                allPlayers,
                currentPhase: payload.currentPhase,
                currentRound: payload.currentRound,
                currentRoundEvaluation,
                currentRoundInputs: getEmptyRoundInputs(gameConfig.categories.length),
                gameConfig,
                gameRounds,
                playersThatFinishedEvaluation: convertCollectionToMap<boolean>(payload.playersThatFinishedEvaluation),
                showLoadingScreen: false
            });
        } else {
            console.log('Error: Can\'t restore game session because data is missing in local storage!');
            this.navigateToDashboard();
        }
    }
}

const mapStateToProps = (state: AppState): PlayGamePropsFromStore => {
    return {
        gameConfig: state.gameConfig,
        gameId: state.gameId,
        isRejoiningGame: state.isRejoiningGame,
        playerInfo: state.playerInfo as PlayerInfo
    };
}
const mapDispatchToProps = (dispatch: Dispatch<AppAction>): PlayGameDispatchProps => {
    return {
        onSetDataOfFinishedGame: (payload: SetDataOfFinishedGamePayload) => dispatch(setDataOfFinishedGame(payload)),
        onResetAppState: () => dispatch(resetAppState())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);
