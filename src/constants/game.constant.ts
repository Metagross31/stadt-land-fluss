export const DEFAULT_NUMBER_OF_ROUNDS = 3;
export const MIN_NUMBER_OF_ROUNDS = 1;
export const MAX_NUMBER_OF_ROUNDS = 15;
export const MIN_NUMBER_OF_CATEGORIES = 3;
/** Duration of countdown in seconds */
export const DEFAULT_DURATION_OF_COUNTDOWN = 60;
export const MIN_DURATION_OF_COUNTDOWN = 30;

export enum UseCountdownRadioButton {
    countdown = 'countdown',
    player = 'player',
}

export const STANDARD_ALPHABET = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
export const STANDARD_EXCLUDED_LETTERS = ['Q', 'X', 'Y'];

export const STANDARD_CATEGORIES = ['Stadt', 'Land', 'Fluss/Gewässer'];
export const AVAILABLE_CATEGORIES = [
    'Band/Musiker',
    'Berg/Gebirge',
    'Beruf',
    'Berühmte Person',
    'Buchtitel',
    'Chemisches Element',
    'Dinge die man jeden Tag macht',
    'Etwas Eckiges',
    'Etwas Rundes',
    'Fiktiver Charakter',
    'Film/Serie',
    'Getränk',
    'Grund für eine Verspätung',
    'Hobby',
    'In Zeiten des Corona-Lockdowns verboten',
    'Könnte ein Trump-Tweet sein',
    'Körperteil',
    'Krankheit',
    'Laster',
    'Marke',
    'Mordwaffe',
    'Pflanze',
    'Pizzasorte',
    'Porno-Künstlername',
    'Religion',
    'Scheidungsgrund',
    'Schimpfwort',
    'See/Meer',
    'Sehenswürdigkeit',
    'Sex (Stellung, Synonym)',
    'Speise',
    'Tier',
    'Title of your Sex Tape',
    'Unnötige Superkraft',
    'Videospiel',
    'Was bei einer Zoom-Konferenz schiefgehen kann',
    'Werkzeug',
    'Wort in einer Fremdsprache'
];

export enum GamePhase {
    waitingToStart = 'waitingToStart',
    fillOutTextfields = 'fillOutTextfields',
    evaluateRound = 'evaluateRound'
}

export const MIN_NUMBER_OF_PLAYERS = 2;

export const LETTER_ANIMATION_LETTER_COUNT = 5;
export const LETTER_ANIMATION_REDRAW_SPEED = 800;

export const SAME_WORD_POINTS = 5;
export const STANDARD_POINTS = 10;
export const ONLY_ANSWER_POINTS = 20;
/**
 * Extra points for answers that are deemed especially creative or funny by other players.
 * Are only awarded if the corresponding scoring option was selected.
 */
export const EXTRA_POINTS = 5;

export const GAME_OPTION_LABEL = {
    checkForDuplicates: `Wenn zwei oder mehr Spieler einen identischen Begriff in einer Kategorie eintragen,
        so zählt dieser nur ${SAME_WORD_POINTS} statt ${STANDARD_POINTS} Punkte.`,
    creativeAnswersExtraPoints: `Von Mitspielern als besonders kreativ oder lustig ausgezeichnete Begriffe bringen ${EXTRA_POINTS} Extrapunkte.`,
    onlyPlayerWithValidAnswer: `Wenn ein Spieler als einziger einen zulässigen Begriff in einer Kategorie
        einträgt, so zählt dieser Begriff ${ONLY_ANSWER_POINTS} statt ${STANDARD_POINTS} Punkte.`
};
