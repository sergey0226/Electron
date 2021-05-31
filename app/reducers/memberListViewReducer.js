const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'MLV_GET_TEAMS': {
      return { ...state, teams: action.teams };
    }
    case 'MLV_GAME_DATES': {
      return { ...state, dates: action.dates };
    }
    case 'MLV_SELECT_DATE': {
      return { ...state, playerInformation: action.playerInformation };
    }
    case 'MLV_GET_PLAYERS': {
      return { ...state, players: action.players };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
