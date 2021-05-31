const dummyObject = {};

export const selectSeason = (object, playerInfo) => dispatch => {
  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'SP_GET_DATA',
      playerInformation: dummyObject
    });
    dispatch({
      type: 'SPV_GET_MONTHS_ARRAY',
      data: []
    });
  } else if (object.screenName === 'View Seasonal Program') {
    playerInfo.find(
      {
        Season: title,
        fileName: 'seasonalProg'
      },
      (err, docs) => {
        dispatch({
          type: 'SPV_GET_MONTHS_ARRAY',
          data: docs
        });
      }
    );
  } else {
    dispatch({
      type: 'SP_GET_DATA',
      playerInformation: dummyObject
    });
  }
};

export const selectMonth = (object, playerInfo) => dispatch => {
  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'SP_GET_DATA',
      playerInformation: dummyObject
    });
  } else {
    playerInfo.findOne(
      {
        Season: object.season,
        Month: title,
        fileName: 'seasonalProg'
      },
      (err, docs) => {
        dispatch({
          type: 'SP_GET_DATA',
          playerInformation: docs
        });
      }
    );
  }
};

export const getSeasons = playerInfo => dispatch => {
  let seasons = [];

  playerInfo.find({ fileName: 'seasonalProg' }, (err, docs) => {
    docs.map(d => seasons.push(d.Season));
    seasons = [...new Set(seasons)];

    dispatch({
      type: 'SP_GET_SEASONS',
      seasons
    });
    dispatch({
      type: 'SP_GET_DATA',
      playerInformation: dummyObject
    });
  });
};
