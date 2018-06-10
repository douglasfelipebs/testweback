import * as utilsApi from '../utils/utilsApi'
import {
    GET_APP,
    PUT_APP
} from "./types"


export const dispatchGetApp = (response) => ({
    type: GET_APP,
    app: response
})


export const getAppApi  = () => dispatch => {
    utilsApi
        .getApp()
        .then((res) => {
            (res) && dispatch(dispatchGetApp(res))
        })
        .catch((err) => console.log(err))
}

export const dispatchPutApp = (id, app) => ({
    type: PUT_APP,
    app,
    id
})


export const putAppApi  = (id, app) => dispatch => {
    utilsApi
        .alterApp(id, app)
        .then((res) => {
            (res) && dispatch(dispatchPutApp(id, app))
        })
        .catch((err) => console.log(err))
}