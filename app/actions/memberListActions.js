const dummyObject = {};

export const selectCategory = (object, playerInfo) => dispatch => {
  const players = [];
  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'ML_SELECT_PLAYER',
      playerInformation: dummyObject
    });
    dispatch({
      type: 'ML_GET_PLAYERS',
      players: []
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
          type: 'ML_GET_PLAYERS',
          players
        });
      }
    );
  }
};

export const selectPlayer = (playerObject, playerInfo) => dispatch => {
  const title = playerObject.event.target.value;
  if (title === 'Select') {
  } else {
    playerInfo.findOne(
      { second_id: playerObject.value.key, fileName: 'memberList' },
      (err, docs) => {
        if (docs) {
          dispatch({
            type: 'ML_SELECT_PLAYER',
            playerInformation: docs
          });
        } else {
          playerInfo.findOne(
            { _id: playerObject.value.key, fileName: 'playerInfo' },
            (err, docs) => {
              dispatch({
                type: 'ML_SELECT_PLAYER',
                playerInformation: docs
              });
            }
          );
        }
      }
    );
  }
};
