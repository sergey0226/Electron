/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
export const getPlayers = playerInfo => dispatch => {
  const players = [];

  playerInfo.find({ fileName: 'scouting' }, (err, docs) => {
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

export const getRecords = playerInfo => dispatch => {
  playerInfo.find({ fileName: 'scouting' }, (err, docs) => {
    dispatch({
      type: 'GET_RECORDS',
      records: docs
    });
  });
};
