export const getEvents = playerInfo => dispatch => {
  playerInfo.find({ fileName: 'annualPlan' }, (err, docs) => {
    dispatch({
      type: 'AP_GET_EVENTS',
      events: docs
    });
  });
};

export default getEvents;
