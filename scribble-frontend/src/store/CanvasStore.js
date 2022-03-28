// ACTION TYPES
const CANVAS_DRAW = "canvas/draw";
const CANVAS_ERASE = "canvas/erase";
const START_POS_X = "canvas/start/x";
const START_POS_Y = "canvas/start/y";
const PEN_COLOR = "pen/color";
const BACKGROUND_COLOR = "background/color";

// ACTIONS
export const setDrawing = (value) => {
  return {
    type: CANVAS_DRAW,
    payload: value,
  };
};

export const setErasing = (value) => {
  return {
    type: CANVAS_ERASE,
    payload: value,
  };
};

export const setStartX = (value) => {
  return {
    type: START_POS_X,
    payload: value,
  };
};

export const setStartY = (value) => {
  return {
    type: START_POS_Y,
    payload: value,
  };
};

export const setPenColor = (color) => {
  return {
    type: PEN_COLOR,
    payload: color,
  };
};

export const setBackgroundColor = (color) => {
  return {
    type: BACKGROUND_COLOR,
    payload: color,
  };
};

// REDUCER
export default function reducer(
  state = {
    drawing: false,
    erasing: false,
    startX: 0,
    startY: 0,
    penColor: "rgb(0, 0, 0)",
    backgroundColor: "rgb(255, 255, 255)",
  },
  action
) {
  switch (action.type) {
    case CANVAS_DRAW: {
      return {
        ...state,
        drawing: action.payload,
      };
    }
    case CANVAS_ERASE: {
      return {
        ...state,
        erasing: action.payload,
      };
    }
    case START_POS_X: {
      return {
        ...state,
        startX: action.payload,
      };
    }
    case START_POS_Y: {
      return {
        ...state,
        startY: action.payload,
      };
    }
    case PEN_COLOR: {
      return {
        ...state,
        penColor: action.payload,
      };
    }
    case BACKGROUND_COLOR: {
      return {
        ...state,
        backgroundColor: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
