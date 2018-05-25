import { combineReducers } from 'redux'
import { bombeiros } from './bombeiros'
import { sessionReducer } from 'redux-react-session'

export default combineReducers({
    bombeiros,
    session: sessionReducer
})
