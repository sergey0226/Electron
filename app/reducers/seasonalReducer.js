const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SP_GET_DATA': {
      return { ...state, playerInformation: action.playerInformation };
    }
    case 'SP_GET_SEASONS': {
      return { ...state, seasons: action.seasons };
    }
    case 'SPV_GET_MONTHS_ARRAY': {
      return { ...state, data: action.data };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
