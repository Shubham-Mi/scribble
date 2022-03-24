import { createStore, combineReducers } from "redux";
import PlayerReducer from "./PlayerStore";
import RoomReducer from "./RoomStore";
import CanvasReducer from "./CanvasStore";

const reducer = combineReducers({
  PlayerStore: PlayerReducer,
  RoomStore: RoomReducer,
  CanvasStore: CanvasReducer,
});

const store = createStore(reducer);
export default store;
