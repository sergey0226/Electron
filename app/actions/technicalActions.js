/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
export const selectPlayer = (object, playerInfo) => dispatch => {
  const seasons = [];

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
  } else {
    playerInfo.find(
      { second_id: object.value.key, fileName: 'technical' },
      (err, docs) => {
        docs.map(d => {
          const season = {
            title: d.seasonName,
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
  if (title === 'New') {
    playerInfo.findOne({ _id: playerObjKey }, (err, docs) => {
      dispatch({
        type: 'SELECT_PLAYER',
        playerInformation: docs
      });
    });
  } else {
    playerInfo.findOne({ _id: seasonObject.value.key }, (err, docs) => {    
      playerInfo.findOne({ second_id: docs['second_id'], fileName: 'physical'}, (err, docs1) =>{
        // if(docs1['score1Date']){
        //   // console.log('Date has been changed from technical time \n'+docs['score1Date']);
        //   if(docs['score1Date'])delete docs['score1Date'];
        //   docs = {
        //     ...docs,
        //     score1Date:docs1['score1Date']
        //   };
        //   // console.log('Date has been changed to physical time \n'+docs['score1Date']+'!\n');
        // }
        // else{
        //   if(docs['score1Date'])delete docs['score1Date'];
        //   docs = {
        //     ...docs,
        //     score1Date:new Date()
        //   };
        // }
        // if(docs1['score2Date']){
        //   // console.log('Date has been changed from technical time \n'+docs['score2Date']);
        //   if(docs['score2Date'])delete docs['score2Date'];
        //   docs = {
        //     ...docs,
        //     score2Date:docs1['score2Date']
        //   };
        //   // console.log('Date has been changed to physical time \n'+docs['score2Date']+'!\n');
        // }
        // else{
        //   if(docs['score2Date'])delete docs['score2Date'];
        //   docs = {
        //     ...docs,
        //     score2Date:new Date()
        //   };
        // }
        // if(docs1['score3Date']){
        //   // console.log('Date has been changed from technical time \n'+docs['score3Date']);
        //   if(docs['score3Date'])delete docs['score3Date'];
        //   docs = {
        //     ...docs,
        //     score3Date:docs1['score3Date']
        //   };
        //   // console.log('Date has been changed to physical time \n'+docs['score3Date']+'!\n');
        // }
        // else{
        //   if(docs['score3Date'])delete docs['score3Date'];
        //   docs = {
        //     ...docs,
        //     score3Date:new Date()
        //   };
        // }
        // if(docs1['score4Date']){
        //   // console.log('Date has been changed from technical time \n'+docs['score4Date']);
        //   if(docs['score4Date'])delete docs['score4Date'];
        //   docs = {
        //     ...docs,
        //     score4Date:docs1['score4Date']
        //   };
        //   // console.log('Date has been changed to physical time \n'+docs['score4Date']+'!\n');
        // }
        // else{
        //   if(docs['score4Date'])delete docs['score4Date'];
        //   docs = {
        //     ...docs,
        //     score4Date:new Date()
        //   };
        // }
        // console.log('this is message from Select player in technical actions\n'+docs['score4Date']+'\n');
        dispatch({
          type: 'SELECT_PLAYER',
          playerInformation: docs
        });
      });
      // dispatch({
      //   type: 'SELECT_PLAYER',
      //   playerInformation: docs
      // });
    });
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
      type: 'GET_PLAYERS',
      players
    });
  });
};

// export const getDate = playerInfo => {

// }