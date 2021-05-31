const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GR_GET_PLAYERS': {
      return { ...state, players: action.players };
    }
    case 'GR_GET_CONVENTIONS': {
      return { ...state, conventions: action.conventions };
    }
    case 'GR_GET_DATES': {
      return { ...state, dates: action.dates };
    }
    case 'GR_SELECT_PLAYER': {
      return { ...state, playerInformation: action.playerInformation };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
