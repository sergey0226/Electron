const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'MP_GET_YEARS': {
      return { ...state, years: action.years };
    }
    case 'MP_GET_MONTHS': {
      return { ...state, months: action.months };
    }
    case 'MP_GET_DAYS': {
      return { ...state, days: action.days };
    }
    case 'MP_GET_DATA': {
      return { ...state, playerInformation: action.playerInformation };
    }
    case 'MP_GET_SEASONS': {
      return { ...state, seasons: action.seasons };
    }
    case 'MPV_GET_DAYS_ARRAY': {
      return { ...state, data: action.data };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
