import './PhaseEvaluateRound.css';
import {
    Badge,
    Chip,
    createStyles,
    IconButton,
    InputAdornment,
    TextField,
    Theme,
    Tooltip,
    withStyles,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import SearchIcon from '@material-ui/icons/Search';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import React, { useState } from 'react';
import { EXTRA_POINTS } from '../../constants/game.constant';
import {
    EvaluationOfPlayerInput,
    GameConfig,
    GameRound,
    GameRoundEvaluation,
    IsPlayerInputVeryCreativeStatus,
    PlayerInput,
    PlayerInputEvaluation,
} from '../../models/game.interface';
import { PlayerInfo } from '../../models/player.interface';
import { getPlayersInAlphabeticalOrder, getRejectingPlayers } from '../../utils/game.utils';
import GameRoundChip from '../GameRoundChip/GameRoundChip';
import { SectionHeader } from '../SectionHeader/SectionHeader';

const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            right: -3,
            top: '100%',
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }),
)(Badge);

interface PhaseEvaluateRoundProps {
    allPlayers: Map<string, PlayerInfo>;
    currentRound: number;
    currentRoundEvaluation: GameRoundEvaluation;
    gameConfig: GameConfig;
    gameRounds: GameRound[];
    /** Player info for the user of this instance of the "Stadt-Land-Fluss" app. */
    playerInfo: PlayerInfo;
    playersThatFinishedEvaluation: Map<string, boolean>;
    sendEvaluationFinishedMessage: () => void;
    updateEvaluationOfPlayerInput: (newEvaluation: EvaluationOfPlayerInput) => void;
    updateIsPlayerInputVeryCreativeStatus: (newStatus: IsPlayerInputVeryCreativeStatus) => void;
}
const PhaseEvaluateRound: React.FunctionComponent<PhaseEvaluateRoundProps> = props => {
    const [hasFinishedEvaluation, setHasFinishedEvaluation] = useState(props.playersThatFinishedEvaluation.has(props.playerInfo.id));
    const { allPlayers, currentRound, currentRoundEvaluation, gameConfig, playerInfo, playersThatFinishedEvaluation } = props;
    // Retrieve data for finished round; e.g. if current round is 1, then data is at index 0.
    const finishedRound = props.gameRounds[currentRound - 1];
    const currentLetter = gameConfig.letters[currentRound - 1];
    const sortedPlayers = getPlayersInAlphabeticalOrder(allPlayers);
    const notFinishedPlayers: string[] = [];
    sortedPlayers.forEach(player => {
        if (!playersThatFinishedEvaluation.has(player.id)) { notFinishedPlayers.push(player.name); }
    });

    /**
      * Toggles the user's evaluation of a player's input for a category,
      * but only if the user hasn't accepted the round evaluation yet.
      */
    const handleEvaluationButtonClick = (
        categoryIndex: number, evaluatedPlayerId: string, currentEvaluation: boolean
    ) => {
        if (!hasFinishedEvaluation) {
            props.updateEvaluationOfPlayerInput({ categoryIndex, evaluatedPlayerId, markedAsValid: !currentEvaluation });
        }
    }
    /**
     * Displays a button that allows the user to reject a player's input for a category.
     * A badge attached to the button shows the total number of rejections. If the player
     * didn't type any text, then a not clickable thumb down icon is shown instead,
     * which indicates that the input was automatically rejected by the application.
     */
    const createEvaluationButton = (categoryIndex: number, indexInSortedPlayers: number): JSX.Element => {
        const evaluatedPlayer = sortedPlayers[indexInSortedPlayers];
        const allEvaluationsForPlayer = currentRoundEvaluation.get(evaluatedPlayer.id) as PlayerInputEvaluation[];
        const evaluationForCategory = allEvaluationsForPlayer[categoryIndex];
        const isInputAcceptedByUser = evaluationForCategory.get(playerInfo.id) as boolean;
        const rejectingPlayers = getRejectingPlayers(evaluationForCategory, allPlayers);
        const tooltipText = rejectingPlayers.length === 0 ? 'Keine Ablehnungen' :
            'Abgelehnt von ' + rejectingPlayers.map(p => p.name).join(', ');
        const hasPlayerTypedText = !!(finishedRound.get(evaluatedPlayer.id) as PlayerInput[])[categoryIndex].text;

        const evaluationButtonForTypedText = (
            <Tooltip
                key={`slf-evaluation-tooltip-${categoryIndex}-${indexInSortedPlayers}`}
                title={tooltipText}
            >
                <IconButton
                    className="slf-evaluation-button"
                    color={isInputAcceptedByUser ? 'default' : 'secondary'}
                    onClick={() => handleEvaluationButtonClick(categoryIndex, evaluatedPlayer.id, isInputAcceptedByUser)}
                >
                    <StyledBadge badgeContent={rejectingPlayers.length} color="secondary">
                        <ThumbDownRoundedIcon />
                    </StyledBadge>
                </IconButton>
            </Tooltip>
        );
        const autoRejectIconForMissingText = (
            <Tooltip
                key={`slf-evaluation-tooltip-${categoryIndex}-${indexInSortedPlayers}`}
                title="Automatisch abgelehnt"
            >
                <ThumbDownRoundedIcon color="secondary" className="slf-auto-reject-icon" />
            </Tooltip>
        );

        return (
            <div
                key={`slf-evaluation-button-wrapper-${categoryIndex}-${indexInSortedPlayers}`}
                className="slf-evaluation-button-wrapper"
            >
                {hasPlayerTypedText ? evaluationButtonForTypedText : autoRejectIconForMissingText}
            </div>
        );
    }
    /**
     * Creates a search link for a specific category and player input.
     */
    const createSearchLink = (categoryIndex: number, indexInSortedPlayers: number): JSX.Element => {
        const category = gameConfig.categories[categoryIndex];
        const evaluatedPlayer = sortedPlayers[indexInSortedPlayers];
        const playerInput = (finishedRound.get(evaluatedPlayer.id) as PlayerInput[])[categoryIndex].text;
        const searchLink = `https://www.ecosia.org/search?q=${encodeURIComponent(category)}+${encodeURIComponent(playerInput)}`
        return (
            <a
                className="slf-evaluation-search-link"
                href={searchLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Begriff nachschlagen"
            >
                <Tooltip
                    title="Begriff nachschlagen"
                    placement="bottom"
                >
                    <SearchIcon color="primary" fontSize="small" />
                </Tooltip>
            </a>
        );
    }
    /**
      * Toggles the "marked as very creative" status of a player's input for a category,
      * but only if the user hasn't accepted the round evaluation yet and isn't trying to mark their own answer as "very creative".
      */
    const handleMarkAsCreativeAnswerToggleClick = (
        categoryIndex: number, evaluatedPlayerId: string, isMarkedAsCreative: boolean
    ) => {
        if (!hasFinishedEvaluation && props.playerInfo.id !== evaluatedPlayerId) {
            props.updateIsPlayerInputVeryCreativeStatus({ categoryIndex, evaluatedPlayerId, markedAsCreative: !isMarkedAsCreative });
        }
    }
    /**
     * Creates a "mark as creative answer" toggle button for a specific category and player input.
     */
    const createMarkAsCreativeAnswerToggle = (categoryIndex: number, indexInSortedPlayers: number): JSX.Element => {
        const evaluatedPlayer = sortedPlayers[indexInSortedPlayers];
        const playerInput = (finishedRound.get(evaluatedPlayer.id) as PlayerInput[])[categoryIndex];
        return (
            <Tooltip
                title={playerInput.star ? 'Besonders kreativ? Nope!' : 'Als besonders kreativ markieren'}
                placement="bottom"
            >
                <IconButton
                    className="slf-mark-as-creative-button"
                    color="primary"
                    size="small"
                    onClick={() => handleMarkAsCreativeAnswerToggleClick(categoryIndex, evaluatedPlayer.id, playerInput.star)}
                >
                    {playerInput.star ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
            </Tooltip>
        );
    }
    const createPointsChip = (evaluatedPlayerInput: PlayerInput): JSX.Element => {
        const points = gameConfig.scoringOptions.creativeAnswersExtraPoints && evaluatedPlayerInput.star
            ? evaluatedPlayerInput.points + EXTRA_POINTS : evaluatedPlayerInput.points;
        return <Chip label={`+${points}`} color="primary" />;
    }
    /**
     * Creates a text input showing the player's input for a category. If the player input isn't an empty string,
     * then on the right side of the textfield a search link and clickable evaluation button are displayed.
     */
    const playerEvaluationElements = (categoryIndex: number, indexInSortedPlayers: number): JSX.Element => {
        const evaluatedPlayer = sortedPlayers[indexInSortedPlayers];
        const evaluatedPlayerInput = (finishedRound.get(evaluatedPlayer.id) as PlayerInput[])[categoryIndex];
        const hasPlayerTypedText = !!evaluatedPlayerInput.text;
        const isInputValid = evaluatedPlayerInput.valid;
        const inputCssClass = isInputValid ? (evaluatedPlayerInput.star ? 'very-creative-player-input' : '') : 'invalid-player-input';
        return (
            <div
                key={`slf-evaluation-textfield-wrapper-${categoryIndex}-${indexInSortedPlayers}`}
                className="slf-evaluation-textfield-wrapper"
            >
                <TextField
                    key={'slf-textfield-category-no-' + categoryIndex + '-player-' + indexInSortedPlayers}
                    value={evaluatedPlayerInput.text}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        className: inputCssClass,
                        startAdornment: <InputAdornment position="start">{evaluatedPlayer.name}:</InputAdornment>,
                        endAdornment: <InputAdornment position="end">
                            <div className="slf-evaluation-textfield-end-adornment">
                                {hasPlayerTypedText ? createSearchLink(categoryIndex, indexInSortedPlayers) : null}
                                {isInputValid ? createMarkAsCreativeAnswerToggle(categoryIndex, indexInSortedPlayers) : null}
                                {isInputValid ? createPointsChip(evaluatedPlayerInput) : null}
                            </div>
                        </InputAdornment>
                    }}
                />
                {createEvaluationButton(categoryIndex, indexInSortedPlayers)}
            </div>
        );
    }
    /**
     * Creates a section for each category of the current game. It displays the category in the header,
     * followed by one textfield for each player showing their input for the finished round.
     * If the input isn't empty, a search link and clickable evaluation button are displayed.
     */
    const createCategorySection = (category: string, categoryIndex: number): JSX.Element => (
        <div
            key={'slf-evaluation-for-category-no-' + categoryIndex}
            className="material-card-style"
        >
            <SectionHeader showDivider={false} text={category}></SectionHeader>
            {sortedPlayers.map((_, indexInSortedPlayers) => playerEvaluationElements(categoryIndex, indexInSortedPlayers))}
        </div>
    );
    const onAcceptEvaluationButtonClick = () => {
        if (!hasFinishedEvaluation) {
            setHasFinishedEvaluation(true);
            props.sendEvaluationFinishedMessage();
        }
    }

    return (
        <React.Fragment>
            <GameRoundChip
                currentLetter={currentLetter}
                currentRound={currentRound}
                numberOfRounds={gameConfig.numberOfRounds}
            />
            <form className="app-form" noValidate autoComplete="off">
                {gameConfig.categories.map(createCategorySection)}
                <div className="material-card-style">
                    Bestätigung ausstehend: <span className="bold-text">{notFinishedPlayers.join(', ')}</span>
                </div>
                <IconButton
                    type="button"
                    className="fixed-bottom-right-button"
                    color="secondary"
                    title="Bestätigen"
                    aria-label="Bestätigen"
                    onClick={onAcceptEvaluationButtonClick}
                >
                    {hasFinishedEvaluation ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                </IconButton>
            </form>
        </React.Fragment>
    );
}

export default PhaseEvaluateRound;
