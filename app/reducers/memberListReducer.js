const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ML_GET_PLAYERS': {
      return { ...state, players: action.players };
    }
    case 'ML_SELECT_PLAYER': {
      return { ...state, playerInformation: action.playerInformation };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
