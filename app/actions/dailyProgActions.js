/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
const dummyObject = {
  TrainingDate: new Date()
};

export const getDates = playerInfo => dispatch => {
  let dates = [];

  playerInfo.find({ fileName: 'dailyProgram' }, (err, docs) => {
    docs.map((value, index) => {
      const date = value.TrainingDate;
      const newDate = `${date.getDate()}/${date.getMonth() +
        1}/${date.getFullYear()}`;
      dates.push(newDate);
    });
    dates = [...new Set(dates)];

    dispatch({
      type: 'DP_GET_DATES',
      dates
    });
    dispatch({
      type: 'DB_GET_DATA',
      playerInformation: dummyObject
    });
  });
};

export const selectDate = (object, playerInfo, MainThemes) => dispatch => {
  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'DB_GET_DATA',
      playerInformation: dummyObject
    });
  } else {
    playerInfo.find({ fileName: 'dailyProgram' }, (err, docs) => {
      docs.map((value, index) => {
        for (const key in value) {
          if (key.includes(`TrainingDate`)) {
            const date = value[key];
            const newDate = `${date.getDate()}/${date.getMonth() +
              1}/${date.getFullYear()}`;
            if (newDate == title) {
              MainThemes.push(value.MainTheme);
            }
            MainThemes = [...new Set(MainThemes)];
          }
        }
      });
      dispatch({
        type: 'DB_GET_THEME',
        MainThemes
      });
      dispatch({
        type: 'DB_GET_DATA',
        playerInformation: dummyObject
      });
    });
  }
};

export const selectTheme = (playerInfo, themeObject) => dispatch => {
  const title = themeObject.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'DB_GET_DATA',
      playerInformation: dummyObject
    });
  } else {
    playerInfo.find(
      { MainTheme: title, fileName: 'dailyProgram' },
      (err, docs) => {
        docs.map((value, index) => {
          for (const key in value) {
            if (key.includes(`TrainingDate`)) {
              const date = value[key];
              const newDate = `${date.getDate()}/${date.getMonth() +
                1}/${date.getFullYear()}`;
              if (newDate == themeObject.date) {
                dispatch({
                  type: 'DB_GET_DATA',
                  playerInformation: value
                });
              }
            }
          }
        });
      }
    );
  }
};
