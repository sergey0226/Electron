export const getPlayers = playerInfo => dispatch => {
  const players = [];

  playerInfo.find({ fileName: 'trainingMov' }, (err, docs) => {
    docs.map(d => {
      const player = {
        title: d.TrainingName,
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
  const records = [];

  playerInfo.find({ fileName: 'trainingMov' }, (err, docs) => {
    dispatch({
      type: 'GET_RECORDS',
      records: docs
    });
  });
};
