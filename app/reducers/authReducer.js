const Datastore = require('nedb');

const authInfo = new Datastore({
  filename: 'authInfo.db',
  autoload: true,
  corruptAlertThreshold: 1
});

const reducer = (state = { authInfo }, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default reducer;
