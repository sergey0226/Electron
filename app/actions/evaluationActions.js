/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-param-reassign */

export const selectPlayer = (object, playerInfo) => dispatch => {
  let seasons = [];

  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'EVAL_SELECT_PLAYER',
      playerInformation: {}
    });
    dispatch({
      type: 'EVAL_GET_SEASONS',
      seasons
    });
  } else {
    
    playerInfo.find(
      { second_id: object.value.key, fileName: 'tactical' },
      (err, docs) => {
        docs.map(d => {
          seasons.push(d.seasonName);
        });
      }
    );

    playerInfo.find(
      { second_id: object.value.key, fileName: 'technical' },
      (err, docs) => {
        docs.map(d => {
          seasons.push(d.seasonName);
        });
      }
    );

    playerInfo.find(
      { second_id: object.value.key, fileName: 'mental' },
      (err, docs) => {
        docs.map(d => {
          seasons.push(d.seasonName);
        });

        seasons = [...new Set(seasons)];
        dispatch({
          type: 'EVAL_SELECT_PLAYER',
          playerInformation: {}
        });
        dispatch({
          type: 'EVAL_GET_SEASONS',
          seasons
        });
      }
    );
  }
};

export const selectSeason = (
  playerObjKey,
  playerInfo,
  seasonObject
) => dispatch => {
  const title = seasonObject.event.target.value;
  if (title === 'Select') {
  } else {
    let tacticalData;
    let technicalData;
    let mentalData;
    let physicalData;
    let gameReportData;

    playerInfo.findOne(
      {
        second_id: playerObjKey,
        seasonName: title,
        fileName: 'tactical'
      },
      (err, tactical) => {
        tacticalData = tactical;
      }
    );

    playerInfo.findOne(
      {
        second_id: playerObjKey,
        seasonName: title,
        fileName: 'technical'
      },
      (err, technical) => {
        technicalData = technical;
      }
    );

    playerInfo.findOne(
      {
        second_id: playerObjKey,
        seasonName: title,
        fileName: 'mental'
      },
      (err, mental) => {
        mentalData = mental;
      }
    );

    playerInfo.findOne(
      {
        second_id: playerObjKey,
        seasonName: title,
        fileName: 'physical'
      },
      (err, physical) => {
        physicalData = physical;
      }
    );

    playerInfo.find(
      {
        second_id: playerObjKey,
        fileName: 'gameReport1'
      },
      (err, gameReport) => {
        var mostRecentDate = Math.max.apply(
          null,
          gameReport.map(e => e.GameDate)
        );
        gameReportData = gameReport.filter(e => {
          var d = e.GameDate;
          return d.getTime() == mostRecentDate;
        })[0];

        dispatch({
          type: 'EVAL_SELECT_PLAYER',
          playerInformation: {
            tacticalData,
            technicalData,
            mentalData,
            physicalData,
            gameReportData
          }
        });
      }
    );
  }
};

export const getPlayers = playerInfo => dispatch => {
  const players = [];

  playerInfo.find({ fileName: 'playerInfo' }, (err, docs) => {
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
      type: 'EVAL_GET_PLAYERS',
      players
    });
  });
};
