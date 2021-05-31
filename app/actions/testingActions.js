/* eslint-disable no-restricted-syntax */
const dummyObject = {
  SNo: true,
  Name1: true
};

export const selectCategory = (object, playerInfo) => dispatch => {
  let seasons = [];
  const dates = [];

  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'TP_SELECT_CATEGORY',
      playerInformation: dummyObject
    });
    dispatch({
      type: 'TP_GET_SEASONS',
      seasons
    });
    dispatch({
      type: 'TP_GET_DATES',
      dates
    });
    dispatch({
      type: 'TP_GET_PLAYERS',
      players: []
    });
  } else {
    playerInfo.find({ Category: title, fileName: 'physical' }, (err, docs) => {
      docs.map(d => {
        seasons.push(d.seasonName);
      });
      seasons = [...new Set(seasons)];

      dispatch({
        type: 'TP_GET_SEASONS',
        seasons
      });
      dispatch({
        type: 'TP_GET_PLAYERS',
        players: []
      });
    });
  }
};

export const selectSeason = (playerInfo, seasonObject) => dispatch => {
  let date = '';
  let dates = [];

  const title = seasonObject.event.target.value;
  if (title === 'Select') {
  } else {
    playerInfo.find(
      {
        Category: seasonObject.category,
        seasonName: title,
        fileName: 'physical'
      },
      (err, docs) => {
        docs.map((value, index) => {
          for (const key in value) {
            if (key.includes(`score`)) {
              date = value[key];
              const newDate = `${date.getDate()}/${date.getMonth() +
                1}/${date.getFullYear()}`;
              dates.push(newDate);
            }
          }
        });
        dates = [...new Set(dates)];

        dispatch({
          type: 'TP_GET_DATES',
          dates
        });
      }
    );
  }
};

export const selectDate = (playerInfo, dateObject) => dispatch => {
  let date = '';
  const players = [];

  const title = dateObject.event.target.value;
  if (title === 'Select') {
  } else {
    playerInfo.find(
      {
        Category: dateObject.category,
        seasonName: dateObject.season,
        fileName: 'physical'
      },
      (err, docs) => {
        docs.map((value, index) => {
          for (const key in value) {
            if (key.includes(`score`)) {
              date = value[key];
              const newDate = `${date.getDate()}/${date.getMonth() +
                1}/${date.getFullYear()}`;
              if (newDate == title) {
                players.push(value);
              }
            }
          }
        });
        players.sort((a,b) => (a.Name1 > b.Name1) ? 1 : ((b.Name1 > a.Name1) ? -1 : 0))
        dispatch({
          type: 'TP_GET_PLAYERS',
          players
        });
      }
    );
  }
};
