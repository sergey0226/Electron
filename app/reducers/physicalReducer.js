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
    case 'PHY_PLAYERS_DATA': {
      return { ...state, playersData: action.playersData };
    }
    case 'PHY_INJURY_DATA': {
      return { ...state, injuryData: action.injuryData };
    }
    case 'PHY_EVAL_CATEGORY': {
      return { ...state, category: action.category };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
