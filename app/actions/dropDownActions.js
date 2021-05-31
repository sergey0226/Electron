export const getDropDowns = playerInfo => dispatch => {
  playerInfo.findOne({ fileName: 'dropDowns' }, (err, docs) => {
    dispatch({
      type: 'GET_DROPDOWNS',
      docs
    });
  });
};

export const setLanguage = (playerInfo, obj) => dispatch => {
  playerInfo.findOne({ fileName: 'language' }, (err, docs) => {
    if (docs) {
      playerInfo.update(
        { fileName: 'language' },
        obj,
        {},
        (err, numReplaced) => {
          dispatch({
            type: 'SET_LANGUAGE',
            language: obj.language
          });
        }
      );
    } else {
      playerInfo.insert(obj, (err, docs) => {
        dispatch({
          type: 'SET_LANGUAGE',
          language: obj.language
        });
      });
    }
  });
};

export const getLanguage = playerInfo => dispatch => {
  playerInfo.findOne({ fileName: 'language' }, (err, docs) => {
    if (docs) {
      dispatch({
        type: 'SET_LANGUAGE',
        language: docs.language
      });
    }
  });
};
