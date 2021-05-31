const reducer = (state = {}, action) => {
    switch (action.type) {
      case 'GET_DROPDOWNDATA': {
        return { ...state, DropdownData: action.Dropdowns };
      }
      case 'GET_MAINTITLE': {
        return { ...state, MainTitles: action.MainTitles };
      }
      case 'GET_SUBTITLE': {
        return { ...state, SubTitles: action.SubTitles };
      }
      case 'SELECT_METHODOLOGY': {
        return { ...state, MethodologyInfo: action.MethodologyInfo };
      }
      default: {
        return state;
      }
    }
  };
  
  export default reducer;
  