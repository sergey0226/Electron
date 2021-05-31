const reducer = (
  state = {
    playerInformation: {
      TrainingDate: new Date()
    }
  },
  action
) => {
  switch (action.type) {
    case 'DP_GET_DATES': {
      return { ...state, dates: action.dates };
    }
    case 'DB_GET_THEME': {
      return { ...state, MainThemes: action.MainThemes };
    }
    case 'DB_GET_DATA': {
      return { ...state, playerInformation: action.playerInformation };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
