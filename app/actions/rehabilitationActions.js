/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable import/prefer-default-export */
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
      type: 'RH_PLAYERS',
      players
    });
  });
};
