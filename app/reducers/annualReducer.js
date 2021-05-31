const reducer = (state = {}, action) => {
  switch (action.type) {
    // case 'SP_GET_DATA': {
    //   return { ...state, playerInformation: action.playerInformation };
    // }
    case 'AP_GET_EVENTS': {
      return { ...state, events: action.events };
    }
    // case 'SPV_GET_MONTHS_ARRAY': {
    //   return { ...state, data: action.data };
    // }
    default: {
      return state;
    }
  }
};

export default reducer;
