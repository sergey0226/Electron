const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'MI_GET_TEAMS': {
      return { ...state, teams: action.teams };
    }
    case 'MI_SELECT_TEAM': {
      return { ...state, playerInformation: action.playerInformation };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
