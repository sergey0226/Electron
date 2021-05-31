const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'EVAL_GET_PLAYERS': {
      return { ...state, players: action.players };
    }
    case 'EVAL_SELECT_PLAYER': {
      return { ...state, playerInformation: action.playerInformation };
    }
    case 'EVAL_GET_SEASONS': {
      return { ...state, seasons: action.seasons };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
