const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'TP_SELECT_CATEGORY': {
      return { ...state, playerInformation: action.playerInformation };
    }
    case 'TP_GET_SEASONS': {
      return { ...state, seasons: action.seasons };
    }
    case 'TP_GET_DATES': {
      return { ...state, dates: action.dates };
    }
    case 'TP_GET_PLAYERS': {
      return { ...state, players: action.players };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
