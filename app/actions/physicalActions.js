/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
const dummyObject = {
  power: {
    power1: [],
    power2: [],
    power3: [],
    power4: []
  },
  strength: {
    strength1: [],
    strength2: [],
    strength3: [],
    strength4: []
  },
  endurance: {
    endurance1: [],
    endurance2: [],
    endurance3: [],
    endurance4: []
  },
  speed: {
    speed1: [],
    speed2: [],
    speed3: [],
    speed4: []
  },
  agility: {
    agility1: [],
    agility2: [],
    agility3: [],
    agility4: []
  }
};

export const selectPlayer = (object, playerInfo) => dispatch => {
  const seasons = [];
  let categories = [];

  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'SELECT_PLAYER',
      playerInformation: {}
    });
    dispatch({
      type: 'GET_SEASONS',
      seasons
    });
    dispatch({
      type: 'PHY_PLAYERS_DATA',
      playersData: dummyObject
    });
    dispatch({
      type: 'PHY_INJURY_DATA',
      injuryData: {}
    });
    dispatch({
      type: 'PHY_EVAL_CATEGORY',
      category: categories
    });
  } else {
    playerInfo.findOne({ _id: object.value.key }, (err, docs) => {
      categories.push(docs.Category);
      dispatch({
        type: 'PHY_EVAL_CATEGORY',
        category: categories
      });
    });

    playerInfo.find(
      { second_id: object.value.key, fileName: 'physical' },
      (err, docs) => {
        docs.map(d => {
          const season = {
            title: d.seasonName,
            score1Date: d.score1Date,
            score2Date: d.score2Date,
            score3Date: d.score3Date,
            score4Date: d.score4Date,
            avgPow1er: d.avgPow1er,
            avgPow2er: d.avgPow2er,
            avgPow3er: d.avgPow3er,
            avgPow4er: d.avgPow4er,
            avgStreng1th: d.avgStreng1th,
            avgStreng2th: d.avgStreng2th,
            avgStreng3th: d.avgStreng3th,
            avgStreng4th: d.avgStreng4th,
            '1600MProtocolTimeminEndurance1':
              d['1600MProtocolTimeminEndurance1'],
            '1600MProtocolTimeminEndurance2':
              d['1600MProtocolTimeminEndurance2'],
            '1600MProtocolTimeminEndurance3':
              d['1600MProtocolTimeminEndurance3'],
            '1600MProtocolTimeminEndurance4':
              d['1600MProtocolTimeminEndurance4'],
            avgTimeSpe1ed: d.avgTimeSpe1ed,
            avgTimeSpe2ed: d.avgTimeSpe2ed,
            avgTimeSpe3ed: d.avgTimeSpe3ed,
            avgTimeSpe4ed: d.avgTimeSpe4ed,
            avgAgility1: d.avgAgility1,
            avgAgility2: d.avgAgility2,
            avgAgility3: d.avgAgility3,
            avgAgility4: d.avgAgility4,
            _id: d._id
          };
          seasons.push(season);
        });

        dispatch({
          type: 'SELECT_PLAYER',
          playerInformation: {}
        });
        dispatch({
          type: 'GET_SEASONS',
          seasons
        });
        dispatch({
          type: 'PHY_PLAYERS_DATA',
          playersData: dummyObject
        });
        dispatch({
          type: 'PHY_INJURY_DATA',
          injuryData: {}
        });
      }
    );
  }
};

export const selectCategory = (object, playerInfo) => dispatch => {
  let seasonsArray = [...object.seasons];

  let mostRecentDate = 0;
  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'SELECT_PLAYER',
      playerInformation: {}
    });
    dispatch({
      type: 'PHY_PLAYERS_DATA',
      playersData: dummyObject
    });
    dispatch({
      type: 'PHY_INJURY_DATA',
      injuryData: {}
    });
  } else {
    mostRecentDate = Math.max.apply(null, seasonsArray.map(e => e.score1Date));

    let playerInformation = seasonsArray.filter(e => {
      let d = e.score1Date;
      return d.getTime() == mostRecentDate;
    })[0];

    dispatch({
      type: 'SELECT_PLAYER',
      playerInformation
    });

    const power = {
      power1: [],
      power2: [],
      power3: [],
      power4: []
    };
    const strength = {
      strength1: [],
      strength2: [],
      strength3: [],
      strength4: []
    };
    const endurance = {
      endurance1: [],
      endurance2: [],
      endurance3: [],
      endurance4: []
    };
    const speed = { speed1: [], speed2: [], speed3: [], speed4: [] };
    const agility = { agility1: [], agility2: [], agility3: [], agility4: [] };

    playerInfo.find(
      {
        seasonName: playerInformation.title,
        Category: title,
        fileName: 'physical'
      },
      (err, docs) => {
        docs.map((players, index) => {
          power.power1.push(players.avgPow1er ? players.avgPow1er : 0);
          power.power2.push(players.avgPow2er ? players.avgPow2er : 0);
          power.power3.push(players.avgPow3er ? players.avgPow3er : 0);
          power.power4.push(players.avgPow4er ? players.avgPow4er : 0);

          strength.strength1.push(
            players.avgStreng1th ? players.avgStreng1th : 0
          );
          strength.strength2.push(
            players.avgStreng2th ? players.avgStreng2th : 0
          );
          strength.strength3.push(
            players.avgStreng3th ? players.avgStreng3th : 0
          );
          strength.strength4.push(
            players.avgStreng4th ? players.avgStreng4th : 0
          );

          endurance.endurance1.push(
            players['1600MProtocolTimeminEndurance1']
              ? players['1600MProtocolTimeminEndurance1']
              : 0
          );
          endurance.endurance2.push(
            players['1600MProtocolTimeminEndurance2']
              ? players['1600MProtocolTimeminEndurance2']
              : 0
          );
          endurance.endurance3.push(
            players['1600MProtocolTimeminEndurance3']
              ? players['1600MProtocolTimeminEndurance3']
              : 0
          );
          endurance.endurance4.push(
            players['1600MProtocolTimeminEndurance4']
              ? players['1600MProtocolTimeminEndurance4']
              : 0
          );

          speed.speed1.push(players.avgTimeSpe1ed ? players.avgTimeSpe1ed : 0);
          speed.speed2.push(players.avgTimeSpe2ed ? players.avgTimeSpe2ed : 0);
          speed.speed3.push(players.avgTimeSpe3ed ? players.avgTimeSpe3ed : 0);
          speed.speed4.push(players.avgTimeSpe4ed ? players.avgTimeSpe4ed : 0);

          agility.agility1.push(players.avgAgility1 ? players.avgAgility1 : 0);
          agility.agility2.push(players.avgAgility2 ? players.avgAgility2 : 0);
          agility.agility3.push(players.avgAgility3 ? players.avgAgility3 : 0);
          agility.agility4.push(players.avgAgility4 ? players.avgAgility4 : 0);
        });

        dispatch({
          type: 'PHY_PLAYERS_DATA',
          playersData: {
            power,
            strength,
            endurance,
            speed,
            agility
          }
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
    dispatch({
      type: 'SELECT_PLAYER',
      playerInformation: {}
    });
    dispatch({
      type: 'PHY_PLAYERS_DATA',
      playersData: dummyObject
    });
    dispatch({
      type: 'PHY_INJURY_DATA',
      injuryData: {}
    });
    return;
  }
  if (title === 'New') {
    playerInfo.findOne({ _id: playerObjKey }, (err, docs) => {
      dispatch({
        type: 'SELECT_PLAYER',
        playerInformation: docs
      });
      dispatch({
        type: 'PHY_PLAYERS_DATA',
        playersData: dummyObject
      });
      dispatch({
        type: 'PHY_INJURY_DATA',
        injuryData: {}
      });
    });
  } else {
    playerInfo.findOne({ _id: seasonObject.value.key }, (err, docs) => {
      dispatch({
        type: 'SELECT_PLAYER',
        playerInformation: docs
      });
    });

    playerInfo.findOne({ _id: playerObjKey }, (err, docs) => {
      dispatch({
        type: 'PHY_INJURY_DATA',
        injuryData: docs
      });
    });

    const power = {
      power1: [],
      power2: [],
      power3: [],
      power4: []
    };
    const strength = {
      strength1: [],
      strength2: [],
      strength3: [],
      strength4: []
    };
    const endurance = {
      endurance1: [],
      endurance2: [],
      endurance3: [],
      endurance4: []
    };
    const speed = { speed1: [], speed2: [], speed3: [], speed4: [] };
    const agility = { agility1: [], agility2: [], agility3: [], agility4: [] };

    playerInfo.find(
      {
        seasonName: title,
        Category: seasonObject.category,
        fileName: 'physical'
      },
      (err, docs) => {
        docs.map((players, index) => {
          power.power1.push(players.avgPow1er ? players.avgPow1er : 0);
          power.power2.push(players.avgPow2er ? players.avgPow2er : 0);
          power.power3.push(players.avgPow3er ? players.avgPow3er : 0);
          power.power4.push(players.avgPow4er ? players.avgPow4er : 0);

          strength.strength1.push(
            players.avgStreng1th ? players.avgStreng1th : 0
          );
          strength.strength2.push(
            players.avgStreng2th ? players.avgStreng2th : 0
          );
          strength.strength3.push(
            players.avgStreng3th ? players.avgStreng3th : 0
          );
          strength.strength4.push(
            players.avgStreng4th ? players.avgStreng4th : 0
          );

          endurance.endurance1.push(
            players['1600MProtocolTimeminEndurance1']
              ? players['1600MProtocolTimeminEndurance1']
              : 0
          );
          endurance.endurance2.push(
            players['1600MProtocolTimeminEndurance2']
              ? players['1600MProtocolTimeminEndurance2']
              : 0
          );
          endurance.endurance3.push(
            players['1600MProtocolTimeminEndurance3']
              ? players['1600MProtocolTimeminEndurance3']
              : 0
          );
          endurance.endurance4.push(
            players['1600MProtocolTimeminEndurance4']
              ? players['1600MProtocolTimeminEndurance4']
              : 0
          );

          speed.speed1.push(players.avgTimeSpe1ed ? players.avgTimeSpe1ed : 0);
          speed.speed2.push(players.avgTimeSpe2ed ? players.avgTimeSpe2ed : 0);
          speed.speed3.push(players.avgTimeSpe3ed ? players.avgTimeSpe3ed : 0);
          speed.speed4.push(players.avgTimeSpe4ed ? players.avgTimeSpe4ed : 0);

          agility.agility1.push(players.avgAgility1 ? players.avgAgility1 : 0);
          agility.agility2.push(players.avgAgility2 ? players.avgAgility2 : 0);
          agility.agility3.push(players.avgAgility3 ? players.avgAgility3 : 0);
          agility.agility4.push(players.avgAgility4 ? players.avgAgility4 : 0);
        });

        dispatch({
          type: 'PHY_PLAYERS_DATA',
          playersData: {
            power,
            strength,
            endurance,
            speed,
            agility
          }
        });
      }
    );
  }
};

export const getPlayers = playerInfo => dispatch => {
  let players = [];

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
      type: 'GET_PLAYERS',
      players
    });
  });
};
