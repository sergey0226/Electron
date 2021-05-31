const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'PLV_GET_SEASONS': {
      return { ...state, seasons: action.seasons };
    }
    case 'PLV_GET_DATES': {
      return { ...state, dates: action.dates };
    }
    case 'PLV_GET_PLAYERS': {
      return { ...state, players: action.players };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
