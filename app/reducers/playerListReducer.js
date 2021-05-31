const reducer = (
  state = {
    playerInformation: {
      GameDate: new Date()
    }
  },
  action
) => {
  switch (action.type) {
    case 'PL_GET_PLAYERS': {
      return { ...state, players: action.players };
    }
    case 'PL_GET_DATES': {
      return { ...state, dates: action.dates };
    }
    case 'PL_GET_DATA': {
      return { ...state, playerInformation: action.playerInformation };
    }
    case 'PL_GET_SEASONS': {
      return { ...state, seasons: action.seasons };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
