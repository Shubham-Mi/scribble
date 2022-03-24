// ACTION TYPES
const CONNECT_SOCKET = "socket/connect";
const PLAYER_NAME = "player/name";
const PLAYER_AVATAR = "player/avatar";

// ACTIONS
export const connectSocket = (socket) => {
  return {
    type: CONNECT_SOCKET,
    payload: socket,
  };
};

export const setPlayerName = (name) => {
  return {
    type: PLAYER_NAME,
    payload: name,
  };
};

export const setPlayerAvatar = (avatar) => {
  return {
    type: PLAYER_AVATAR,
    payload: avatar,
  };
};

// REDUCER
export default function reducer(
  state = { socket: null, playerName: "user", avatar: "avatar1" },
  action
) {
  switch (action.type) {
    case CONNECT_SOCKET: {
      return {
        ...state,
        socket: action.payload,
      };
    }
    case PLAYER_NAME: {
      return {
        ...state,
        playerName: action.payload,
      };
    }
    case PLAYER_AVATAR: {
      return {
        ...state,
        avatar: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
