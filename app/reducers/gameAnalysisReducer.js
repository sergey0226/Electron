const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GA_TEAMS': {
      return { ...state, players: action.players };
    }
    case 'GA_RECORDS': {
      return { ...state, records: action.records };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
