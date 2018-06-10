import { sessionService } from 'redux-react-session';
import * as sessionApi from '../utils/utilsApi';
import md5 from 'md5'
import {
    LOGIN_INIT,
    LOGOUT_USER,
    FETCHING_LOGIN,
    ERROR_MESSAGE
} from "./types"


export const dispatchLogout = (response) => ({
    type: LOGOUT_USER,
    response
})

export const logoutApi = () => dispatch => {
    try {
        sessionService.deleteSession()
        sessionService.deleteUser()
        let response = {
            loggedIn: false,
            user: {
                id: '',
                name: '',
                password: ''
            }
        };
        dispatch(dispatchLogout(response))
    } catch (e) {
        console.log(e)
    }
}

export const dispatchFetchLogin = (bVal) => ({
    type: FETCHING_LOGIN,
    val: bVal
})

export const dispatchErrorMessage = (sErrorMessage) => ({
    type: ERROR_MESSAGE,
    errorMessage: sErrorMessage
})

export const actionFetchLogin = (bVal) => dispatch => {
    dispatch(dispatchFetchLogin(bVal))
}
export const actionErrorMessage = (sErrorMessage) => dispatch => {
    dispatch(dispatchErrorMessage(sErrorMessage))
}

export const dispatchLogin = (response) => ({
    type: LOGIN_INIT,
    response
})

export const initLoginApi = (user) => dispatch => {

    dispatch(dispatchFetchLogin(true))
    dispatch(dispatchErrorMessage(''))

    sessionApi
        .initLogin()
        .then(res => {
            console.log(res)
            let response = {
                token: '',
                loggedIn: false,
                user: {
                    id: '',
                    name: '',
                    password: ''
                }
            };
            (res) && res.map((reqUser) => {
                if (reqUser.name === user.user && reqUser.password === user.password){
                    response.token = md5(reqUser.name)
                    response.user = {
                        id: reqUser.id,
                        name: reqUser.name,
                        password: reqUser.password
                    }
                    sessionService.saveSession({ token: response.token })
                        .then(() => {
                            sessionService.saveUser(reqUser).catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    response.loggedIn = true;
                }
            })

            dispatch(dispatchFetchLogin(false))

            if (!response.loggedIn){
                dispatch(dispatchErrorMessage('Algo de errado aconteceu, verifique suas credenciais'))
            }

            dispatch(dispatchLogin(response))
        })
    return true
}
