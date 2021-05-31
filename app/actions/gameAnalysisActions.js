export const getPlayers = playerInfo => dispatch => {
  const players = [];

  playerInfo.find({ fileName: 'gameAnalysis' }, (err, docs) => {
    docs.map(d => {
      const player = {
        title: d.TeamvsTeam,
        _id: d._id
      };
      players.push(player);
    });
    players.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    dispatch({
      type: 'GA_TEAMS',
      players
    });
  });
};

export const getRecords = playerInfo => dispatch => {
  const records = [];

  playerInfo.find({ fileName: 'gameAnalysis' }, (err, docs) => {
    dispatch({
      type: 'GA_RECORDS',
      records: docs
    });
  });
};
