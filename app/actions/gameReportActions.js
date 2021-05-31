/* eslint-disable no-prototype-builtins */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
const dummyObject = {
  'Goal(Score)SUCCCESS': 0,
  Playedtime: 0,
  RedCard: 0,
  StartingMember: 0,
  YellowCard: 0
};

export const selectCategory = (object, playerInfo) => dispatch => {
  let players = [];
  let conventions = [];
  let dates = [];

  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'GR_GET_PLAYERS',
      players
    });
    dispatch({
      type: 'GR_GET_CONVENTIONS',
      conventions
    });
    dispatch({
      type: 'GR_GET_DATES',
      dates
    });
    dispatch({
      type: 'GR_SELECT_PLAYER',
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
          type: 'GR_GET_PLAYERS',
          players
        });
        dispatch({
          type: 'GR_GET_CONVENTIONS',
          conventions
        });
        dispatch({
          type: 'GR_GET_DATES',
          dates
        });
        dispatch({
          type: 'GR_SELECT_PLAYER',
          playerInformation: dummyObject
        });
      }
    );
  }
};

export const selectPlayer = (playerObject, playerInfo) => dispatch => {
  let conventions = [];
  let dates = [];
  const title = playerObject.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'GR_GET_CONVENTIONS',
      conventions
    });
    dispatch({
      type: 'GR_GET_DATES',
      dates
    });
    dispatch({
      type: 'GR_SELECT_PLAYER',
      playerInformation: dummyObject
    });
  } else {
    playerInfo.find(
      { second_id: playerObject.value.key, fileName: 'gameReport1' },
      (err, docs) => {
        docs.map((d, index) => {
          conventions.push(d.ConventionName);
        });
        conventions = [...new Set(conventions)];
        dispatch({
          type: 'GR_GET_CONVENTIONS',
          conventions
        });
        dispatch({
          type: 'GR_GET_DATES',
          dates
        });
        dispatch({
          type: 'GR_SELECT_PLAYER',
          playerInformation: dummyObject
        });
      }
    );
  }
};

export const selectConvention = (playerObject, playerInfo) => dispatch => {
  let dates = [];

  const title = playerObject.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'GR_GET_DATES',
      dates
    });
    dispatch({
      type: 'GR_SELECT_PLAYER',
      playerInformation: dummyObject
    });
  }
  if (title === 'New') {
    playerInfo.findOne(
      { _id: playerObject.playerKey, fileName: 'playerInfo' },
      (err, docs) => {
        dispatch({
          type: 'GR_GET_DATES',
          dates
        });
        dispatch({
          type: 'GR_SELECT_PLAYER',
          playerInformation: { ...docs, ...dummyObject }
        });
      }
    );
  } else {
    playerInfo.find(
      {
        second_id: playerObject.playerKey,
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
          type: 'GR_GET_DATES',
          dates
        });
        dispatch({
          type: 'GR_SELECT_PLAYER',
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
      type: 'GR_SELECT_PLAYER',
      playerInformation: dummyObject
    });
  } else {
    playerInfo.find(
      {
        second_id: object.playerKey,
        ConventionName: object.convention,
        fileName: 'gameReport1'
      },
      (err, docs) => {
        docs.map((value, index) => {
          if (value.hasOwnProperty('GameDate')) {
            const date = value.GameDate;
            const newDate = `${date.getDate()}/${date.getMonth() +
              1}/${date.getFullYear()}`;
            if (newDate == title) {
              dispatch({
                type: 'GR_SELECT_PLAYER',
                playerInformation: value
              });
            }
          }
        });
      }
    );
  }
};
