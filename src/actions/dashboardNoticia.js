import * as utilsApi from '../utils/utilsApi'
import {
    NEW_NEWS,
    GET_NEWS,
    DELETE_NEWS,
    UPDATE_NEWS
} from "./types"



export const dispatchAddNoticia = (response) => ({
    type: NEW_NEWS,
    response
})


export const addNoticiaApi  = (noticia) => dispatch => {
    utilsApi
        .addNoticia(noticia)
        .then((res) => {
            (res) && dispatch(dispatchAddNoticia(noticia))
        })
        .catch((err) => console.log(err))
}

export const dispatchGetNoticia = (noticias) => ({
    type: GET_NEWS,
    noticias: noticias
})


export const getNoticiaApi  = () => dispatch => {
    utilsApi
        .getNoticia()
        .then((res) => {
            (res) && dispatch(dispatchGetNoticia(res))
        })
        .catch((err) => console.log(err))
}

export const dispatchDeleteNoticia = (id) => ({
    type: DELETE_NEWS,
    id
})

export const deleteNoticiaApi  = (id) => dispatch => {
    utilsApi
        .deleteNoticia(id)
        .then((res) => {
            (res) && dispatch(dispatchDeleteNoticia(id))
        })
        .catch((err) => console.log(err))
}

export const dispatchUpdateNoticia = (id, noticia) => ({
    type: UPDATE_NEWS,
    id,
    noticia
})

export const updateNoticiaApi  = (id, noticia) => dispatch => {
    utilsApi
        .alterNoticia(id, noticia)
        .then((res) => {
            (res) && dispatch(dispatchUpdateNoticia(id, noticia))
        })
        .catch((err) => console.log(err))
}
