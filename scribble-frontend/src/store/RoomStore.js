// ACTION TYPES
const JOIN_GAME = "room/join";
const GAME_STATE = "room/state";
const ROUNDS = "room/settings/rounds";
const TIME = "room/settings/time";

// ACTIONS
export const joinGame = (id) => {
  return {
    type: JOIN_GAME,
    payload: id,
  };
};

export const changeGameState = (state) => {
  return {
    type: GAME_STATE,
    payload: state,
  };
};

export const setRounds = (number) => {
  return {
    type: ROUNDS,
    payload: number,
  };
};

export const setTime = (time) => {
  return {
    type: TIME,
    payload: time,
  };
};

// REDUCER
export default function reducer(
  state = { roomId: null, gameState: "none", rounds: 1, time: 60 },
  action
) {
  switch (action.type) {
    case GAME_STATE: {
      return {
        ...state,
        gameState: action.payload,
      };
    }
    case JOIN_GAME: {
      return {
        ...state,
        roomId: action.payload,
      };
    }
    case ROUNDS: {
      return {
        ...state,
        rounds: action.payload,
      };
    }
    case TIME: {
      return {
        ...state,
        time: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}