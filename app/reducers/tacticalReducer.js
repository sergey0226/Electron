const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_PLAYERS': {
      return { ...state, players: action.players };
    }
    case 'SELECT_PLAYER': {
      // console.log('this is message from tactical Reducer.\n'+action.playerInformation['score1Date'])
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
