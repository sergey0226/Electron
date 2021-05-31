/* eslint-disable no-prototype-builtins */
const dummyObject = {};

export const selectCategory = (object, playerInfo) => dispatch => {
  let conventions = [];
  const dates = [];
  const players = [];

  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'GRV_GET_CONVENTIONS',
      conventions
    });
    dispatch({
      type: 'GRV_GET_DATES',
      dates
    });
    dispatch({
      type: 'GRV_GET_DATA',
      playerInformation: dummyObject
    });
    dispatch({
      type: 'GRV_GET_PLAYERS',
      players
    });
  } else {
    playerInfo.find(
      { Category: title, fileName: 'gameReport1' },
      (err, docs) => {
        docs.map(d => {
          conventions.push(d.ConventionName);
          players.push(d);
        });
        players.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        conventions = [...new Set(conventions)];

        dispatch({
          type: 'GRV_GET_CONVENTIONS',
          conventions
        });
        dispatch({
          type: 'GRV_GET_DATES',
          dates
        });
        dispatch({
          type: 'GRV_GET_DATA',
          playerInformation: dummyObject
        });
        dispatch({
          type: 'GRV_GET_PLAYERS',
          players
        });
      }
    );
  }
};

export const selectConvention = (playerObject, playerInfo) => dispatch => {
  let dates = [];
  const players = [];
  const title = playerObject.event.target.value;
  if (title === 'Select') {
    playerInfo.find(
      { Category: playerObject.category, fileName: 'gameReport1' },
      (err, players) => {
        dispatch({
          type: 'GRV_GET_DATES',
          dates
        });
        dispatch({
          type: 'GRV_GET_DATA',
          playerInformation: dummyObject
        });
        dispatch({
          type: 'GRV_GET_PLAYERS',
          players
        });
      }
    );
  } else {
    playerInfo.find(
      {
        Category: playerObject.category,
        ConventionName: title,
        fileName: 'gameReport1'
      },
      (err, docs) => {
        docs.map((value, index) => {
          if (value.hasOwnProperty('GameDate')) {
            const date = value.GameDate;
            const newDate = `${date.getDate()}/${date.getMonth() +
              1}/${date.getFullYear()}`;
            dates.push(newDate);
          }
        });
        dates = [...new Set(dates)];

        dispatch({
          type: 'GRV_GET_DATES',
          dates
        });
        dispatch({
          type: 'GRV_GET_DATA',
          playerInformation: dummyObject
        });
      }
    );

    playerInfo.find(
      {
        Category: playerObject.category,
        ConventionName: title,
        fileName: 'gameReport1'
      },
      (err, docs) => {
        docs.map((value, index) => {
          players.push(value);
        });

        dispatch({
          type: 'GRV_GET_PLAYERS',
          players
        });
      }
    );
  }
};

export const selectDate = (object, playerInfo) => dispatch => {
  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'GRV_GET_DATA',
      playerInformation: dummyObject
    });
  } else {
    playerInfo.find(
      {
        Category: object.category,
        ConventionName: object.convention,
        fileName: 'gameInfo'
      },
      (err, docs) => {
        docs.map((value, index) => {
          if (value.hasOwnProperty('GameDate')) {
            if (value.GameDate == title) {
              dispatch({
                type: 'GRV_GET_DATA',
                playerInformation: value
              });
            }
          }
        });
      }
    );
  }
};
