/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Done';

import { connect } from 'react-redux';

const SnackBar = props => {
  const { handleSnack, openSnack, language,message } = props;
  let snackMessage=message==undefined?"Data Saved Successfully!":message;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      open={openSnack}
      autoHideDuration={5000}
      onClose={() => handleSnack(false)}
      message={
        <span id="message-id">
          {language === 'English'
            ? snackMessage
            : 'データが正常に保存されました'}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="secondary"
          style={{ padding: 0 }}
          // className={classes.close}
          onClick={() => handleSnack(false)}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
};

const mapStateToProps = state => ({
  language: state.dropDownReducer.language || 'English'
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  null
)(SnackBar);
