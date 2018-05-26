import { sessionService } from 'redux-react-session';
import * as sessionApi from '../utils/utilsApi';
import md5 from 'md5'
import {
    LOGIN_INIT,
    LOGOUT_USER
} from "./types"


export const login = (user) => {
    return () => {
        try {
            sessionApi.getAllUsers()
        } catch (e) {
            console.log(e)
        }
        return sessionApi.login(user).then(response => {
            const { token } = response;
            sessionService.saveSession({ token })
                .then(() => {
                    sessionService.saveUser(response.data)
                });
        });
    };
};

export const logout = () => {
    return () => {
        return sessionApi.logout().then(() => {
            sessionService.deleteSession();
            sessionService.deleteUser();
        }).catch(err => {
            throw (err);
        });
    };
};


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

export const dispatchLogin = (response) => ({
    type: LOGIN_INIT,
    response
})

export const initLoginApi = (user) => dispatch => {
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
            res.map((reqUser) => {
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
                    console.log(response)
                }
            })
            dispatch(dispatchLogin(response))
        })
    return true
}

export const initLoginPromise = (user) => new Promise((resolve, reject) => {
    resolve(initLoginApi(user));
    reject(false)
})