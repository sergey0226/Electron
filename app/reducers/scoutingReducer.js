const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_PLAYERS': {
      return { ...state, players: action.players };
    }
    case 'GET_RECORDS': {
      return { ...state, records: action.records };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
