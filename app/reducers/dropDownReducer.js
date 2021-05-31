const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_DROPDOWNS': {
      return { ...state, dropDowns: action.docs };
    }
    case 'SET_LANGUAGE': {
      return { ...state, language: action.language };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
