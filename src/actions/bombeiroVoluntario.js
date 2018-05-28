import * as utilsApi from '../utils/utilsApi'
import {
    NEW_VOLUNTARY
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