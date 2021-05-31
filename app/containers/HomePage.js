/* eslint-disable react/destructuring-assignment */
/* eslint-disable array-callback-return */
// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import Home from '../components/Home';

let authInfo;

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { openSnack: false };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const userAvail = JSON.parse(localStorage.getItem('userAvail'));
    authInfo = nextProps.authInfo;

    return {
      userAvail
    };
  }

  componentDidMount() {
    const openSnack = !!this.props.location.state;
    this.setState({
      openSnack
    });
  }

  handleSnack(value) {
    this.setState({ openSnack: value });
  }

  render() {
    const { userAvail, openSnack } = this.state;
    const { classes } = this.props;

    return (
      <div>
        {userAvail ? (
          <Home {...this.props} />
        ) : (
          this.props.history.push('/signIn')
        )}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={openSnack}
          autoHideDuration={5000}
          onClose={() => this.handleSnack(false)}
          message={<span id="message-id">Successfully Login!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="secondary"
              className={classes.close}
              onClick={() => this.handleSnack(false)}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
    authInfo: state.authReducer.authInfo,
    language: state.dropDownReducer.language || 'English'
  });

// const mapDispatchToProps = dispatch => ({
//   getPlayers: (players, playerInfo) => dispatch(getPlayers(players, playerInfo))
// });

/** Updated For V2 */
export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(HomePage));
