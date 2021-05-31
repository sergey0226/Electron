const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_PLAYERS': {
      return { ...state, players: action.players };
    }
    case 'SELECT_PLAYER': {
      return { ...state, playerInformation: action.playerInformation };
    }
    case 'GET_SEASONS': {
      return { ...state, seasons: action.seasons };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
