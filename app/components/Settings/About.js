/* eslint-disable prefer-destructuring */
/* eslint-disable global-require */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },

  innerRoot: {
    // ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 4,
    width: 500
  },

  commentTypo: {
    borderBottom: '3px solid rgba(26, 43, 117, 1)',
    paddingTop: 10,
    paddingBottom: 5,
    marginRight: 10,
    marginBottom: 15
  },

  menu: {
    width: 150
  },
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

let authInfo;

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    authInfo = nextProps.authInfo;
    return null;
  }

  componentDidMount() {
    authInfo.findOne(
      {
        fileName: 'signIn'
      },
      async (err, docs) => {
        this.setState({
          productKey: docs.productKey
        });
      }
    );
  }

  render() {
    const { classes } = this.props;
    const { productKey } = this.state;

    return (
      <div className={classes.root}>
        <div style={{ display: 'flex' }}>
          <img
            src={require('../../assets/images/logo.png')}
            alt="logo"
            width="50%"
            height="80%"
          />
          <div>
            <Typography noWrap variant="h5">
              TEAM DATA
            </Typography>
            <Typography noWrap variant="h6" color="textSecondary">
              VER .01
            </Typography>
          </div>
        </div>
        <br />
        <br />
        <br />
        <Typography noWrap variant="subtitle2" style={{ fontSize: 18 }}>
          Developed by:
          <span style={{ color: 'red' }}>
            {' '}
            http://www.teamdatasports-innovation.com/
          </span>
        </Typography>
        <br />
        <br />
        <Typography variant="subtitle1" style={{ fontSize: 18 }}>
          Product Key:
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            fontSize: 18,
            border: '1px solid red',
            borderRadius: 50,
            paddingLeft: 10
          }}
        >
          {productKey}
        </Typography>
        <br />
        <br />
        <Typography variant="subtitle1" align="center">
          Copyright &copy; 2018 Merhaba Japan Co. Ltd. All Rights Reserved.
        </Typography>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ authInfo: state.authReducer.authInfo });

// const mapDispatchToProps = dispatch => ({
//   getPlayers: (playerInfo) => dispatch(getPlayers(playerInfo))
// });

/** Updated For V2 */
export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(SignIn));
