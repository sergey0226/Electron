const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GRV_GET_CONVENTIONS': {
      return { ...state, conventions: action.conventions };
    }
    case 'GRV_GET_DATES': {
      return { ...state, dates: action.dates };
    }
    case 'GRV_GET_DATA': {
      return { ...state, playerInformation: action.playerInformation };
    }
    case 'GRV_GET_PLAYERS': {
      return { ...state, players: action.players };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
