const dummyObject = {};

export const selectSeason = (object, playerInfo) => dispatch => {
  let years = [];
  const months = [];
  const days = [];
  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'MP_GET_YEARS',
      years
    });
    dispatch({
      type: 'MP_GET_MONTHS',
      months
    });
    dispatch({
      type: 'MP_GET_DAYS',
      days
    });
    dispatch({
      type: 'MP_GET_DATA',
      playerInformation: dummyObject
    });
    dispatch({
      type: 'MPV_GET_DAYS_ARRAY',
      data: []
    });
  } else {
    playerInfo.find({ Season: title, fileName: 'monthlyProg' }, (err, docs) => {
      docs.map(d => years.push(d.Year));
      years = [...new Set(years)];

      dispatch({
        type: 'MP_GET_YEARS',
        years
      });
      dispatch({
        type: 'MP_GET_MONTHS',
        months
      });
      dispatch({
        type: 'MP_GET_DAYS',
        days
      });
      dispatch({
        type: 'MP_GET_DATA',
        playerInformation: dummyObject
      });
      dispatch({
        type: 'MPV_GET_DAYS_ARRAY',
        data: []
      });
    });
  }
};

export const selectYear = (playerObject, playerInfo) => dispatch => {
  let months = [];
  const days = [];
  const title = playerObject.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'MP_GET_MONTHS',
      months
    });
    dispatch({
      type: 'MP_GET_DAYS',
      days
    });
    dispatch({
      type: 'MP_GET_DATA',
      playerInformation: dummyObject
    });
    dispatch({
      type: 'MPV_GET_DAYS_ARRAY',
      data: []
    });
  } else {
    playerInfo.find(
      {
        Season: playerObject.season,
        Year: title,
        fileName: 'monthlyProg'
      },
      (err, docs) => {
        docs.map(d => months.push(d.Month));
        months = [...new Set(months)];
        dispatch({
          type: 'MP_GET_MONTHS',
          months
        });
        dispatch({
          type: 'MP_GET_DAYS',
          days
        });
        dispatch({
          type: 'MP_GET_DATA',
          playerInformation: dummyObject
        });
        dispatch({
          type: 'MPV_GET_DAYS_ARRAY',
          data: []
        });
      }
    );
  }
};

export const selectMonth = (object, playerInfo) => dispatch => {
  let days = [];

  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'MP_GET_DAYS',
      days
    });
    dispatch({
      type: 'MP_GET_DATA',
      playerInformation: dummyObject
    });
    dispatch({
      type: 'MPV_GET_DAYS_ARRAY',
      data: []
    });
  } else {
    playerInfo.find(
      {
        Season: object.season,
        Year: object.year,
        Month: title,
        fileName: 'monthlyProg'
      },
      (err, docs) => {
        if (object.screenName === 'View Monthly Program') {
          dispatch({
            type: 'MPV_GET_DAYS_ARRAY',
            data: docs
          });
        } else {
          docs.map(d => days.push(d.Day));
          days = [...new Set(days)];

          dispatch({
            type: 'MP_GET_DAYS',
            days
          });
          dispatch({
            type: 'MP_GET_DATA',
            playerInformation: dummyObject
          });
        }
      }
    );
  }
};

export const selectDay = (object, playerInfo) => dispatch => {
  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'MP_GET_DATA',
      playerInformation: dummyObject
    });
  } else {
    playerInfo.findOne(
      {
        Season: object.season,
        Year: object.year,
        Month: object.month,
        Day: title,
        fileName: 'monthlyProg'
      },
      (err, docs) => {
        dispatch({
          type: 'MP_GET_DATA',
          playerInformation: docs
        });
      }
    );
  }
};

export const getSeasons = playerInfo => dispatch => {
  let seasons = [];

  playerInfo.find({ fileName: 'monthlyProg' }, (err, docs) => {
    docs.map(d => seasons.push(d.Season));
    seasons = [...new Set(seasons)];

    dispatch({
      type: 'MP_GET_SEASONS',
      seasons
    });
    dispatch({
      type: 'MP_GET_DATA',
      playerInformation: dummyObject
    });
  });
};
