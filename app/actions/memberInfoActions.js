const dummyObject = {};

export const selectCategory = (object, playerInfo) => dispatch => {
  let teams = [];
  const title = object.event.target.value;
  if (title === 'Select') {
    dispatch({
      type: 'MI_SELECT_TEAM',
      playerInformation: dummyObject
    });
    dispatch({
      type: 'MI_GET_TEAMS',
      conventions: ['Select']
    });
  } else {
    playerInfo.find(
      { Category: title, fileName: 'memberList' },
      (err, docs) => {
        docs.map(d => {
          teams.push(d.TeamName);
        });

        teams = [...new Set(teams)];

        dispatch({
          type: 'MI_GET_TEAMS',
          teams
        });
      }
    );
  }
};

export const selectTeam = (playerObject, playerInfo) => dispatch => {
  const title = playerObject.event.target.value;
  if (title === 'Select') {
  } else {
    playerInfo.findOne(
      { TeamName: title, fileName: 'memberInfo' },
      (err, docs) => {
        dispatch({
          type: 'MI_SELECT_TEAM',
          playerInformation: docs
        });
      }
    );
  }
};
