const DEFAULT_STATE = {
    loggedIn: false,
    isFetchingLogin: false,
    currentUser: {
        id: '',
        name: '',
        password: ''
    },
    errorMessage: '',
    bombeirosVoluntarios: [],
    dashboardNoticias: [],
    dashboardPrimeirosSocorros: [],
    app: {
        _id: '',
        diasSemAcidentes: 1,
    }
};
import {
    FETCHING_LOGIN,
    LOGIN_INIT,
    LOGOUT_USER,
    ERROR_MESSAGE,
    GET_VOLUNTARYS,
    NEW_VOLUNTARY,
    DEL_VOLUNTARYS,
    GET_NEWS,
    NEW_NEWS,
    DELETE_NEWS,
    UPDATE_NEWS,
    GET_APP,
    PUT_APP,
    GET_PRIMEIROSSO,
    DEL_PRIMEIROSSO, ADD_PRIMEIROSSO, PUT_PRIMEIROSSO
} from "../actions/types"

export const bombeiros = (state = DEFAULT_STATE, action) => {

    switch (action.type) {

        case FETCHING_LOGIN: {
            return {
                ...state,
                isFetchingLogin: action.val
            }
        }

        case ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        }

        case LOGIN_INIT: {
            const { response } = action
            return {
                ...state,
                loggedIn: response.loggedIn,
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
            return {
                ...state,
                bombeirosVoluntarios: (!state.bombeirosVoluntarios.includes(response))
                    ? state.bombeirosVoluntarios.concat(response)
                    : state.bombeirosVoluntarios
            }
        }

        case GET_VOLUNTARYS: {
            return {
                ...state,
                bombeirosVoluntarios: action.bombeirosVoluntarios
            }
        }

        case DEL_VOLUNTARYS: {
            return {
                ...state,
                bombeirosVoluntarios: state.bombeirosVoluntarios.filter((voluntario) => {
                    return voluntario._id !== action.id
                })
            }
        }

        case NEW_NEWS: {
            const { response } = action
            return {
                ...state,
                dashboardNoticias: (!state.dashboardNoticias.includes(response))
                    ? state.dashboardNoticias.concat(response)
                    : state.dashboardNoticias
            }
        }

        case GET_NEWS: {
            return {
                ...state,
                dashboardNoticias:  state.dashboardNoticias.concat(action.noticias.map((noticia) => {
                    if (!state.dashboardNoticias.includes(noticia)){
                        return noticia
                    }
                }))
            }
        }

        case DELETE_NEWS: {
            return {
                ...state,
                dashboardNoticias: state.dashboardNoticias.filter((noticia) => {
                    return noticia._id !== action.id
                })
            }
        }

        case UPDATE_NEWS: {
            return {
                ...state,
                dashboardNoticias: state.dashboardNoticias.map((noticia) => {
                    if (noticia._id === action.id){
                        noticia.imgUrl       = action.noticia.imgUrl
                        noticia.imgDescricao = action.noticia.imgDescricao
                        noticia.titulo       = action.noticia.titulo
                        noticia.corpoTexto   = action.noticia.corpoTexto
                        noticia.favorito     = action.noticia.favorito
                    }
                    return noticia
                })
            }
        }

        case GET_APP: {
            return {
                ...state,
                app: {
                  _id             : action.app[0]._id,
                  diasSemAcidentes: action.app[0].diasSemAcidentes
                }
            }
        }

        case PUT_APP: {
            return {
                ...state,
                app: {
                    ...state.app,
                    diasSemAcidentes: action.app.diasSemAcidentes
                }
            }
        }

        case GET_PRIMEIROSSO: {
            return {
                ...state,
                dashboardPrimeirosSocorros: action.primeirosSocorros
            }
        }

        case DEL_PRIMEIROSSO: {
            return {
                ...state,
                dashboardPrimeirosSocorros: state.dashboardPrimeirosSocorros.filter((primeirosSocorros) => {
                    return primeirosSocorros._id !== action.id
                })
            }
        }

        case ADD_PRIMEIROSSO: {
            return {
                ...state,
                dashboardPrimeirosSocorros: (!state.dashboardPrimeirosSocorros.includes(action.response))
                    ? state.dashboardPrimeirosSocorros.concat(action.response)
                    : state.dashboardPrimeirosSocorros
            }
        }

        case PUT_PRIMEIROSSO: {
            return {
                ...state,
                dashboardPrimeirosSocorros: state.dashboardPrimeirosSocorros.map((primeirosSocorros) => {
                    if (primeirosSocorros._id === action.primeirosSocorros._id) {
                        primeirosSocorros.titulo   = action.primeirosSocorros.titulo
                        primeirosSocorros.sintomas = action.primeirosSocorros.sintomas
                        primeirosSocorros.reagir   = action.primeirosSocorros.reagir
                    }
                    return primeirosSocorros
                })
            }
        }

        default:
            return state
    }

}
