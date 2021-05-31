const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'TI_SELECT_CATEGORY': {
      return { ...state, playerInformation: action.playerInformation };
    }
    case 'TI_GET_SEASONS': {
      return { ...state, seasons: action.seasons };
    }
    case 'TI_GET_DATES': {
      return { ...state, dates: action.dates };
    }
    case 'TI_GET_PLAYERS': {
      return { ...state, players: action.players };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
