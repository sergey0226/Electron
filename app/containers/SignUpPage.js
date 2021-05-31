/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { connect } from 'react-redux';
import TextField from '../constants/TextInput';
import routes from '../constants/routes';

const macaddress = require('macaddress');

const macAddress = macaddress.one(val => val);

let authInfo;

const styles = theme => ({
  root: {
    display: 'flex'
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
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerInformation: {},
      error: true,
      errorMessage: '',
      openDialog: false
    };
  }

  static getDerivedStateFromProps(nextProps) {
    authInfo = nextProps.authInfo;
    return null;
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleChange = name => event => {
    const newVal = name.replace(/[./" "]/g, '');
    const value = event.target.value;
    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [newVal]: value
      }
    }));
  };

  signUp = async () => {
    let { playerInformation } = this.state;

    if (macAddress) {
      playerInformation = {
        ...playerInformation,
        macAddress,
        fileName: 'signUp'
      };

      if (playerInformation.password === playerInformation.confirmPassword) {
        const res = await axios.post(
          `http://teamdata.online/teamdata_software/service.php?email=${
            playerInformation.email
          }&key=${playerInformation.productKey}&mac=${macAddress}`
        );
        const data = res.data;

        switch (data.header.message) {
          case 'Something Went Wrong': {
            this.setState({
              error: false,
              errorMessage: 'Credentials are not valid!'
            });
            break;
          }

          case 'Key Already Registered': {
            this.setState({
              error: false,
              errorMessage: 'You are already Registered!'
            });
            break;
          }

          case 'Key Registerd successfully': {
            authInfo.insert(playerInformation, (err, docs) => {
              this.setState({
                playerInformation: {}
              });
              this.props.history.push({
                pathname: '/signIn',
                state: { openDialog: true }
              });
            });
            break;
          }
          default: {
            break;
          }
        }
      } else {
        this.setState({
          error: false,
          errorMessage: "Password doesn't match!"
        });
      }
    } else {
      this.setState({
        error: false,
        errorMessage: 'Please connect to the Internet!'
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { showPassword, error, errorMessage } = this.state;
    return (
      <div className={classes.root}>
        <div
          style={{
            width: '100%',
            paddingTop: '5%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Paper className={classes.innerRoot} elevation={1}>
            <Typography className={classes.commentTypo} variant="h6">
              SIGN UP
            </Typography>
            <Typography align="center" variant="h5">
              TEAM DATA VER.01
            </Typography>
            {/* <br /> */}
            {/* <Typography variant="subtitle2" color="secondary">
              {' ------- '}
              <br />
              {macAddress}
            </Typography> */}
            <div style={{ paddingTop: 30, paddingBottom: 0 }}>
              <TextField
                fullWidth
                id="outlined-email-input"
                label="Email"
                name="Email"
                margin="dense"
                variant="outlined"
                type="email"
                autoComplete="email"
                onFocus={() => this.setState({ error: true })}
                onChange={this.handleChange('email')}
              />
              <TextField
                fullWidth
                id="outlined-email-input"
                label="Password"
                name="Password"
                margin="dense"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                onFocus={() => this.setState({ error: true })}
                onChange={this.handleChange('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                id="outlined-email-input"
                label="Confirm Password"
                name="Password"
                margin="dense"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                onFocus={() => this.setState({ error: true })}
                onChange={this.handleChange('confirmPassword')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                id="outlined-email-input"
                label="Product Key"
                name="Product Key"
                margin="dense"
                variant="outlined"
                onFocus={() => this.setState({ error: true })}
                onChange={this.handleChange('productKey')}
              />

              {!error ? (
                <Typography variant="subtitle2" color="secondary">
                  {errorMessage}
                </Typography>
              ) : (
                <Typography variant="subtitle2" color="secondary">
                  <br />{' '}
                </Typography>
              )}
            </div>

            <div
              style={{
                display: 'flex',
                direction: 'row',
                justifyContent: 'flex-end',
                paddingBottom: 30
              }}
            >
              <Button
                onClick={() => this.signUp()}
                variant="contained"
                color="secondary"
              >
                Sign up
              </Button>
            </div>
            <Typography align="center" variant="subtitle2">
              Already have an account ? <Link to={routes.SIGNIN}> Sign In</Link>
            </Typography>
          </Paper>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
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
)(withStyles(styles)(SignUp));
