/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */

export const selectCategory = (object, playerInfo) => dispatch => {
  let seasons = [];
  const dates = [];
  const players = [];

  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'PLV_GET_SEASONS',
      seasons
    });
    dispatch({
      type: 'PLV_GET_DATES',
      dates
    });
    dispatch({
      type: 'PLV_GET_PLAYERS',
      players
    });
  } else {
    playerInfo.find(
      { Category: title, fileName: 'playerList' },
      (err, docs) => {
        docs.map(d => {
          if (d.Season) {
            seasons.push(d.Season);
          }
        });
        seasons = [...new Set(seasons)];

        dispatch({
          type: 'PLV_GET_SEASONS',
          seasons
        });
        dispatch({
          type: 'PLV_GET_DATES',
          dates
        });
        dispatch({
          type: 'PLV_GET_PLAYERS',
          players
        });
      }
    );
  }
};

export const selectSeason = (playerInfo, seasonObject) => dispatch => {
  let date = '';
  let dates = [];

  const title = seasonObject.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'PLV_GET_DATES',
      dates
    });
    dispatch({
      type: 'PLV_GET_PLAYERS',
      players: []
    });
  } else {
    playerInfo.find(
      {
        Category: seasonObject.category,
        Season: title,
        fileName: 'playerList'
      },
      (err, docs) => {
        docs.map((value, index) => {
          for (const key in value) {
            if (key.includes(`GameDate`)) {
              date = value[key];
              const newDate = `${date.getDate()}/${date.getMonth() +
                1}/${date.getFullYear()}`;
              dates.push(newDate);
            }
          }
        });
        dates = [...new Set(dates)];

        dispatch({
          type: 'PLV_GET_DATES',
          dates
        });
        dispatch({
          type: 'PLV_GET_PLAYERS',
          players: []
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
    dispatch({
      type: 'PLV_GET_PLAYERS',
      players
    });
  } else {
    playerInfo.find(
      {
        Category: dateObject.category,
        Season: dateObject.season,
        fileName: 'playerList'
      },
      (err, docs) => {
        docs.map((value, index) => {
          for (const key in value) {
            if (key.includes(`GameDate`)) {
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
          type: 'PLV_GET_PLAYERS',
          players
        });
      }
    );
  }
};
