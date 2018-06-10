import * as utilsApi from '../utils/utilsApi'
import {
    GET_PRIMEIROSSO,
    ADD_PRIMEIROSSO,
    DEL_PRIMEIROSSO,
    PUT_PRIMEIROSSO
} from "./types"


export const dispatchAddPrimeirosSocorros = (response) => ({
    type: ADD_PRIMEIROSSO,
    response
})


export const addPrimeirosSocorrosApi  = (primeirossocorros) => dispatch => {
    utilsApi
        .addPrimeirosSocorros(primeirossocorros)
        .then((res) => {
            (res) && dispatch(dispatchAddPrimeirosSocorros(primeirossocorros))
        })
        .catch((err) => console.log(err))
}

export const dispatchGetPrimeirosSocorros = (primeirossocorros) => ({
    type: GET_PRIMEIROSSO,
    primeirosSocorros: primeirossocorros
})


export const getPrimeirosSocorrosApi  = () => dispatch => {
    utilsApi
        .getPrimeirosSocorros()
        .then((res) => {
            (res) && dispatch(dispatchGetPrimeirosSocorros(res))
        })
        .catch((err) => console.log(err))
}

export const dispatchPrimeirosSocorros = (id) => ({
    type: DEL_PRIMEIROSSO,
    id
})

export const deletePrimeirosSocorrosApi  = (id) => dispatch => {
    utilsApi
        .deletePrimeirosSocorros(id)
        .then((res) => {
            (res) && dispatch(dispatchPrimeirosSocorros(id))
        })
        .catch((err) => console.log(err))
}

export const dispatchUpdatePrimeirosSocorros = (id, primeirosSocorros) => ({
    type: PUT_PRIMEIROSSO,
    id,
    primeirosSocorros
})

export const updatePrimeirosSocorrosApi  = (id, primeirosSocorros) => dispatch => {
    utilsApi
        .putPrimeirosSocorros(id, primeirosSocorros)
        .then((res) => {
            (res) && dispatch(dispatchUpdatePrimeirosSocorros(id, primeirosSocorros))
        })
        .catch((err) => console.log(err))
}
