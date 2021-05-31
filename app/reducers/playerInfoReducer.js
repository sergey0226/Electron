const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_PLAYERS': {
      return { ...state, players: action.players };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
