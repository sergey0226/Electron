/* eslint-disable no-restricted-syntax */
const dummyObject = {};

export const selectCategory = (object, playerInfo) => dispatch => {
  let teams = [];
  const dates = [];
  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'MLV_GET_TEAMS',
      teams: []
    });
    dispatch({
      type: 'MLV_GAME_DATES',
      dates
    });
    dispatch({
      type: 'MLV_SELECT_DATE',
      playerInformation: dummyObject
    });
    dispatch({
      type: 'MLV_GET_PLAYERS',
      players: []
    });
  } else {
    playerInfo.find(
      { Category: title, fileName: 'memberList' },
      (err, docs) => {
        docs.map(d => {
          teams.push(d.TeamName);
        });

        teams = [...new Set(teams)];

        dispatch({
          type: 'MLV_GET_TEAMS',
          teams
        });
        dispatch({
          type: 'MLV_GAME_DATES',
          dates
        });
      }
    );
  }
};

export const selectTeam = (playerObject, playerInfo) => dispatch => {
  const players = [];
  let dates = [];
  let date = '';

  const title = playerObject.event.target.value;
  if (title === 'Select') {
  } else {
    playerInfo.find(
      {
        TeamName: title,
        fileName: 'memberInfo'
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
          type: 'MLV_GAME_DATES',
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
        TeamName: dateObject.team,
        fileName: 'memberInfo'
      },
      (err, docs) => {
        docs.map((value, index) => {
          for (const key in value) {
            if (key.includes(`GameDate`)) {
              date = value[key];
              const newDate = `${date.getDate()}/${date.getMonth() +
                1}/${date.getFullYear()}`;
              if (newDate == title) {
                dispatch({
                  type: 'MLV_SELECT_DATE',
                  playerInformation: value
                });
              }
            }
          }
        });
      }
    );

    playerInfo.find(
      {
        Category: dateObject.category,
        TeamName: dateObject.team,
        fileName: 'memberList'
      },
      (err, docs) => {
        docs.map((value, index) => {
          players.push(value);
        });
        players.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        dispatch({
          type: 'MLV_GET_PLAYERS',
          players
        });
      }
    );
  }
};
