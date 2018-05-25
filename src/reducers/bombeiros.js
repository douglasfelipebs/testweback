const DEFAULT_STATE = {kodksaodka: 'taoo'};
import {
    LOGIN_ACCOUNT
} from "../actions/types"

export const bombeiros = (state = DEFAULT_STATE, action) => {

    switch (action.type) {

        case LOGIN_ACCOUNT: {
            return {
                ...state,
                logged: action.bLoggedIn
            }
        }

        default:
            return state
    }

}
