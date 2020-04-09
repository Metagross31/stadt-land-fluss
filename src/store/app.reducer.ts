import { AppAction, SET_GAME_DATA, SetGameDataAction } from './app.actions';
import { GameConfig } from '../models/game-config.interface';

export interface AppState {
    gameId: string | null;
    gameConfig: GameConfig | null;
    isAdmin: boolean;
    playerName: string | null;
}

const initialState: AppState = {
    gameId: null,
    gameConfig: null,
    isAdmin: false,
    playerName: null
};

export const appReducer = (state: AppState = initialState, action: AppAction): AppState => {
    switch (action.type) {
        case SET_GAME_DATA:
            const payload = (action as SetGameDataAction).payload;
            return {
                ...state,
                ...payload
            };
        default:
            return state
    }
};
