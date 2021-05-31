/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux';
import TextField from '../constants/TextInput';
import routes from '../constants/routes';

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

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerInformation: {},
      showPassword: false,
      correct: true,
      openDialog: false,
      openPassDialog: false,
      errorMessage: ''
    };
  }

  static getDerivedStateFromProps(nextProps) {
    authInfo = nextProps.authInfo;
    return null;
  }

  componentDidMount() {
    const openDialog = !!this.props.location.state;
    this.setState({
      openDialog
    });
  }

  renderDialog() {
    return (
      <Dialog
        open={this.state.openDialog}
        onClose={() => this.handleDialog(false)}
      >
        <DialogTitle>Registration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are successfully registered, Please SignIn to continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleDialog(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  handleDialog = value => {
    this.setState({ openDialog: value });
  };

  renderPassDialog() {
    return (
      <div>
        <Dialog
          open={this.state.openPassDialog}
          onClose={() => this.handlePassDialog(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
          <DialogContent>
            <div style={{ width: 400, margin: '5px 30px' }}>
              {this.EmailField()}
              {this.PassField()}
              {this.ConfirmPassField()}
              {this.ErrorMessage()}
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handlePassDialog(false)}
              color="secondary"
            >
              Cancel
            </Button>
            <Button onClick={() => this.resetPass()} color="primary">
              Reset
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  handlePassDialog = value => {
    this.setState({
      openPassDialog: value,
      showPassword: false,
      errorMessage: '',
      playerInformation: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    });
  };

  resetPass = () => {
    const { playerInformation } = this.state;

    if (playerInformation.password === playerInformation.confirmPassword) {
      authInfo.update(
        {
          email: playerInformation.email,
          fileName: 'signUp'
        },
        {
          $set: {
            password: playerInformation.password,
            confirmPassword: playerInformation.confirmPassword
          }
        },
        (err, numReplaced) => {
          switch (numReplaced) {
            case 0: {
              this.setState({
                correct: false,
                errorMessage: 'Email not found!'
              });
              break;
            }
            case 1: {
              alert('Password Changed');
              this.setState({
                playerInformation: {
                  email: '',
                  password: '',
                  confirmPassword: ''
                },
                openPassDialog: false,
                showPassword: false
              });
              break;
            }
            default: {
              break;
            }
          }
        }
      );
    } else {
      this.setState({
        correct: false,
        errorMessage: "Password doesn't match!"
      });
    }
  };

  EmailField = () => {
    const { playerInformation } = this.state;
    return (
      <TextField
        fullWidth
        id="outlined-email-input"
        label="Email"
        name="Email"
        value={playerInformation.email}
        margin="dense"
        variant="outlined"
        type="email"
        autoComplete="email"
        onFocus={() => this.setState({ correct: true })}
        onChange={this.handleChange('email')}
      />
    );
  };

  PassField = () => {
    const { showPassword, playerInformation } = this.state;
    return (
      <TextField
        fullWidth
        id="outlined-email-input"
        label="Password"
        name="Password"
        value={playerInformation.password}
        margin="dense"
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        onFocus={() => this.setState({ correct: true })}
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
    );
  };

  ConfirmPassField = () => {
    const { showPassword, playerInformation } = this.state;
    return (
      <TextField
        fullWidth
        id="outlined-email-input"
        label="Confirm Password"
        name="Password"
        margin="dense"
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        onFocus={() => this.setState({ correct: true })}
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
    );
  };

  ErrorMessage = () => {
    const { correct, errorMessage } = this.state;
    return !correct ? (
      <Typography variant="subtitle2" color="secondary">
        {errorMessage}
      </Typography>
    ) : (
      <Typography variant="subtitle2" color="secondary">
        <br />{' '}
      </Typography>
    );
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

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  signIn = () => {
    let { playerInformation } = this.state;

    playerInformation = {
      ...playerInformation,
      fileName: 'signUp'
    };

    authInfo.findOne(
      {
        email: playerInformation.email,
        password: playerInformation.password,
        fileName: 'signUp'
      },
      async (err, docs) => {
        if (docs) {
          delete docs._id;
          authInfo.insert(
            {
              ...docs,
              fileName: 'signIn'
            },
            (error, data) => {
              localStorage.setItem(
                'userAvail',
                JSON.stringify(playerInformation.email)
              );
              this.props.history.push({
                pathname: '/',
                state: { openSnack: true }
              });
            }
          );
        } else {
          this.setState({
            playerInformation: { email: '', password: '' },
            correct: false,
            errorMessage: 'Incorrect Email or Password!'
          });
        }
      }
    );
  };

  render() {
    const { classes } = this.props;
    const { playerInformation } = this.state;

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
              SIGN IN
            </Typography>
            <Typography align="center" variant="h5">
              TEAM DATA VER.01
            </Typography>
            <div style={{ paddingTop: 30, paddingBottom: 5 }}>
              {this.EmailField()}
              {this.PassField()}
              {this.ErrorMessage()}
            </div>
            <div
              style={{
                display: 'flex',
                direction: 'row',
                justifyContent: 'flex-end'
              }}
            >
              <Button
                onClick={() => {
                  this.handlePassDialog(true);
                }}
                color="primary"
              >
                Forgot Password ?
              </Button>
            </div>

            <Button
              onClick={() => this.signIn()}
              variant="contained"
              color="secondary"
            >
              Login
            </Button>
            <br />
            <br />
            <br />
            <Typography align="center" variant="subtitle2">
              {`Don't have an account ?`}{' '}
              <Link to={routes.SIGNUP}> Sign Up</Link>
            </Typography>
          </Paper>
        </div>
        {this.renderDialog()}
        {this.renderPassDialog()}
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
