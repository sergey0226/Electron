const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GI_GET_SEASONS': {
      return { ...state, seasons: action.seasons };
    }
    case 'GI_GET_CONVENTIONS': {
      return { ...state, conventions: action.conventions };
    }
    case 'GI_GET_DATES': {
      return { ...state, dates: action.dates };
    }
    case 'GI_GET_DATA': {
      return { ...state, playerInformation: action.playerInformation };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
