// const getUnique = (arr, comp) => {
//   const unique = arr
//     .map(e => e[comp])
//     // store the keys of the unique objects
//     .map((e, i, final) => final.indexOf(e) === i && i)
//     // eliminate the dead keys & store unique objects
//     .filter(e => arr[e])
//     .map(e => arr[e]);

//   return unique;
// };

const dummyObject = {};

export const selectCategory = (object, playerInfo) => dispatch => {
  let conventions = [];
  const dates = [];

  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'GI_GET_CONVENTIONS',
      conventions
    });
    dispatch({
      type: 'GI_GET_DATES',
      dates
    });
    dispatch({
      type: 'GI_GET_DATA',
      playerInformation: dummyObject
    });
  } else {
    playerInfo.find(
      { Category: title, fileName: 'gameReport1' },
      (err, docs) => {
        docs.map(d => {
          conventions.push(d.ConventionName);
        });

        conventions = [...new Set(conventions)];

        dispatch({
          type: 'GI_GET_CONVENTIONS',
          conventions
        });
        dispatch({
          type: 'GI_GET_DATES',
          dates
        });
        dispatch({
          type: 'GI_GET_DATA',
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
      type: 'GI_GET_DATES',
      dates
    });
    dispatch({
      type: 'GI_GET_DATA',
      playerInformation: dummyObject
    });
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
          type: 'GI_GET_DATES',
          dates
        });
        dispatch({
          type: 'GI_GET_DATA',
          playerInformation: dummyObject
        });
      }
    );
  }
};

export const selectDate = (object, playerInfo) => dispatch => {
  let playerInformation = {};

  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'GI_GET_DATA',
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
          if (value.hasOwnProperty('GameDate') && value.GameDate == title) {
            playerInformation = value;
          }
        });
        dispatch({
          type: 'GI_GET_DATA',
          playerInformation
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
      type: 'GI_GET_SEASONS',
      seasons
    });
  });
};
