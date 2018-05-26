const DEFAULT_STATE = {
    loggedIn: false,
    isFetchingLogin: false,
    currentUser: {
        id: '',
        name: '',
        password: ''
    }
};
import {
    LOGIN_ACCOUNT,
    LOGIN_INIT,
    LOGOUT_USER
} from "../actions/types"

export const bombeiros = (state = DEFAULT_STATE, action) => {

    switch (action.type) {

        case LOGIN_ACCOUNT: {
            return {
                ...state,
                logged: action.bLoggedIn
            }
        }

        case LOGIN_INIT: {
            const { response } = action
            console.log(response)
            return {
                ...state,
                loggedIn: response.loggedIn,
                isFetchingLogin: false,
                currentUser: {
                    id: response.user.id,
                    name: response.user.name,
                    password: response.user.password
                }
            }
        }

        case LOGOUT_USER: {
            const { response } = action
            return {
                ...state,
                isFetchingLogin: false,
                loggedIn: response.loggedIn,
                currentUser: {
                    id: response.user.id,
                    name: response.user.name,
                    password: response.user.password
                }
            }
        }

        default:
            return state
    }

}
