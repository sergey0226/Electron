/* eslint-disable no-restricted-syntax */
const dummyObject = {
  GameDate: new Date()
};

export const selectCategory = (object, playerInfo) => dispatch => {
  const players = [];
  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'PL_GET_PLAYERS',
      players
    });
    dispatch({
      type: 'PL_GET_DATES',
      dates: []
    });
    dispatch({
      type: 'PL_GET_DATA',
      playerInformation: dummyObject
    });
  } else {
    playerInfo.find(
      { Category: title, fileName: 'playerInfo' },
      (err, docs) => {
        docs.map(d => {
          let Name = '';
          if (d.Name1) {
            Name = d.Name1;
          }
          if (d.Name2) {
            Name = `${Name} ${d.Name2}`;
          }
          if (d.Name3) {
            Name = `${Name} ${d.Name3}`;
          }
          const player = {
            title: Name,
            _id: d._id
          };
          players.push(player);
        });

        players.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        
        dispatch({
          type: 'PL_GET_PLAYERS',
          players
        });
        dispatch({
          type: 'PL_GET_DATES',
          dates: []
        });
        dispatch({
          type: 'PL_GET_DATA',
          playerInformation: dummyObject
        });
      }
    );
  }
};

export const selectPlayer = (playerObject, playerInfo) => dispatch => {
  let dates = [];
  const title = playerObject.event.target.value;
  
  if (title === 'Select') {
    dispatch({
      type: 'PL_GET_DATES',
      dates
    });
    dispatch({
      type: 'PL_GET_DATA',
      playerInformation: dummyObject
    });
  } else {
    playerInfo.find(
      { second_id: playerObject.value.key, fileName: 'playerList' },
      (err, docs) => {
        docs.map((value, index) => {
          for (const key in value) {
            if (key.includes(`GameDate`)) {
              const date = value[key];
              const newDate = `${date.getDate()}/${date.getMonth() +
                1}/${date.getFullYear()}`;
              dates.push(newDate);
            }
          }
        });
        dates = [...new Set(dates)];

        dispatch({
          type: 'PL_GET_DATES',
          dates
        });
        dispatch({
          type: 'PL_GET_DATA',
          playerInformation: dummyObject
        });
      }
    );
  }
};

export const selectDate = (object, playerInfo) => dispatch => {
  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'PL_GET_DATA',
      playerInformation: {}
    });
  }
  if (title === 'New') {
    playerInfo.findOne(
      { _id: object.playerKey, fileName: 'playerInfo' },
      (err, docs) => {
        dispatch({
          type: 'PL_GET_DATA',
          playerInformation: docs
        });
      }
    );
  } else {
    playerInfo.find(
      { second_id: object.playerKey, fileName: 'playerList' },
      (err, docs) => {
        docs.map((value, index) => {
          for (const key in value) {
            if (key.includes(`GameDate`)) {
              const date = value[key];
              const newDate = `${date.getDate()}/${date.getMonth() +
                1}/${date.getFullYear()}`;
              if (newDate == title) {
                dispatch({
                  type: 'PL_GET_DATA',
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

export const getSeasons = playerInfo => dispatch => {
  let seasons = [];

  playerInfo.find({ fileName: 'physical' }, (err, docs) => {
    docs.map(d => {
      seasons.push(d.seasonName);
    });
    seasons = [...new Set(seasons)];

    dispatch({
      type: 'PL_GET_SEASONS',
      seasons
    });
  });
};
