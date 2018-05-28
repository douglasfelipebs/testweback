const DEFAULT_STATE = {
    loggedIn: false,
    isFetchingLogin: false,
    currentUser: {
        id: '',
        name: '',
        password: ''
    },
    bombeirosVoluntarios: []
};
import {
    LOGIN_INIT,
    LOGOUT_USER,
    NEW_VOLUNTARY
} from "../actions/types"

export const bombeiros = (state = DEFAULT_STATE, action) => {

    switch (action.type) {

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

        case NEW_VOLUNTARY: {
            const { response } = action
            debugger;
            console.log('Redux', JSON.stringify(response))
            return {
                ...state,
                bombeirosVoluntarios: (!state.bombeirosVoluntarios.includes(response))
                    ? state.bombeirosVoluntarios.concat(response)
                    : state.bombeirosVoluntarios
            }
        }

        default:
            return state
    }

}
