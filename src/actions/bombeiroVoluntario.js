import * as utilsApi from '../utils/utilsApi'
import {
    NEW_VOLUNTARY,
    GET_VOLUNTARYS,
    DEL_VOLUNTARYS
} from "./types"


export const dispatchAddVoluntario = (response) => ({
    type: NEW_VOLUNTARY,
    response
})


export const addVoluntarioApi  = (voluntario) => dispatch => {
    utilsApi
        .addBombeiroVoluntario(voluntario)
        .then((res) => {
            (res) && dispatch(dispatchAddVoluntario(voluntario))
        })
        .catch((err) => console.log(err))
}

export const dispatchGetVoluntario = (voluntarios) => ({
    type: GET_VOLUNTARYS,
    bombeirosVoluntarios: voluntarios
})


export const getVoluntarioApi = () => dispatch => {
    utilsApi
        .getBombeiroVoluntario()
        .then((res) => {
            (res) && dispatch(dispatchGetVoluntario(res))
        })
        .catch((err) => console.log(err))
}

export const dispatchDeleteVoluntario = (id) => ({
    type: DEL_VOLUNTARYS,
    id
})

export const deleteVoluntarioApi  = (id) => dispatch => {
    utilsApi
        .deleteBombeiro(id)
        .then((res) => {
            (res) && dispatch(dispatchDeleteVoluntario(id))
        })
        .catch((err) => console.log(err))
}