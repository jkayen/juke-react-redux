import { createStore } from 'redux';
import { applyMiddleware } from "redux";
import { createLogger } from "redux-logger"
import thunkMiddleware  from "redux-thunk"
import playerReducer from "./reducers/player-reducer"
import lyricsReducer from "./reducers/lyrics-reducer"
import {combineReducers} from "redux"
export default createStore(combineReducers({
    lyrics: lyricsReducer,
    player: playerReducer
}) , applyMiddleware(createLogger(),thunkMiddleware));
