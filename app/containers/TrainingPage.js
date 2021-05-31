/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable global-require */
// @flow
import React, { Component } from 'react';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonBase from '@material-ui/core/ButtonBase';
// import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from 'react-redux';
import Checkbox from '../constants/CheckBox';

import TextField from '../constants/TextInput';
import { getPlayers } from '../actions/rehabilitationActions';

import SnackBar from '../components/SnackBar/SnackBar';
import Doc from '../constants/DocService';

import * as arrays from '../constants/dropDowns';
import * as arraysJap from '../constants/dropDownsJap';
import * as fieldsArray from '../constants/textFields';
import * as fieldsArrayJap from '../constants/textFieldsJap';

const bodyRef = React.createRef();

const styles = theme => ({
  root: {
    display: 'flex'
  },

  innerRoot: {
    // ...theme.mixins.gutters(),
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 1
  },

  grow: {
    display:"flex",
    flexDirection:'row',
    flexGrow: 1
  },
  button: {
    margin: -5
  },
  iconSmall: {
    fontSize: 40
  },

  textField: {
    marginLeft: 3,
    marginRight: 3,
    marginTop: 2,
    marginBottom: 6
  },
  menu: {
    width: 150
  },

  card: {
    // maxWidth: 345
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover'
  },
  media1: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'contain'
  },
  gridItem: {
    // marginLeft: -10
  },

  commentTypo: {
    borderBottom: '3px solid rgba(26, 43, 117, 1)',
    paddingTop: 10,
    paddingBottom: 5,
    marginRight: 10,
    marginBottom: 15
  },

  headings: {
    borderBottom: '3px solid rgb(244, 0, 0)',
    margin: '15px 0px 15px 0px'
  },

  // root: {
  //   display: 'flex',
  //   paddingTop: 50
  // },

  headings2: {
    color: 'red',
    // borderBottom: '3px solid rgb(244, 0, 0)',
    margin: '15px 0px 15px 0px'
  },

  tablePadding: {
    padding: 7,
    borderBottom: '1px solid rgb(215, 226, 244)'
  },

  table: {
    // minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  },

  title2Margin: {
    marginBottom: 27,
    minWidth: 50
  },
  title2Margin2: {
    paddingTop: 47
  }
});

const icons = [...fieldsArray.icons];

const fields = [...fieldsArray.trainingFields];

const checkBoxes = [...fieldsArray.trainingCheckBoxes];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: 'Select',
      players: [],

      language: 'English',
      playerInformation: {},      
      dummyplayerImage: require('../assets/images/showimage.jpg'),
    };
  }

  componentWillMount() {
    const { playerInfo } = this.props;
    this.setState({
      playerInfo
    });
    this.props.getPlayers(playerInfo);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      players: nextProps.players,
      language: nextProps.language
    });
  }

  // componentWillUnmount() {
  //   const { playerInfo, seasons } = this.state;
  //   // const { seasons } = this.state;
  //   this.props.selectPlayer(
  //     { event: { target: { value: 'Select' } } },
  //     playerInfo,
  //     seasons
  //   );
  // }

  renderCheckBox = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.trainingFields[from + index];
      const newVal = `${title}check${from}`.replace(/[./" "]/g, '');

      let value = false;
      if (playerInformation) {
        if (playerInformation[newVal] != undefined) {
          value = playerInformation[newVal];
        } else {
          value = false;
        }
      }

      return (
        <FormControlLabel
          style={{
            marginTop: -10,
            width: '100%'
          }}
          control={
            <Checkbox
              checked={value}
              onChange={this.handleCheckChange(newVal)}
              color="secondary"
            />
          }
          label={label}
          key={index}
        />
      );
    });
  };

  renderCheckBox2 = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return checkBoxes.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.trainingCheckBoxes[from + index];

      const newVal = `${title}OPTION${from}`.replace(/[./" "]/g, '');
      let value = false;
      if (playerInformation) {
        if (playerInformation[newVal] != undefined) {
          value = playerInformation[newVal];
        } else {
          value = false;
        }
      }

      return (
        <FormControlLabel
          style={{
            width: '100%',
            padding:5
          }}
          control={
            <Checkbox
              checked={value}
              onChange={this.handleCheckChange(newVal)}
              color="secondary"
            />
          }
          label={label}
          key={index}
        />
      );
    });
  };

  handleCheckChange = name => event => {
    event.persist();

    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [name]: event.target.checked
      }
    }));
  };

  handlePlayerChange = name => (event, value) => {
    const { playerInformation, playerInfo } = this.state;
    const newVal = name.replace(/[./" "]/g, '');
   
    if (event.target.value === 'Select') {
      this.setState({
        playerInformation: {}
      });
    } else {
      playerInfo.find({ _id: value.props._id }, (err, docs) => {
        this.setState({
          playerInformation: docs[0]
        });
      });
     
    }

    this.setState({
      [newVal]: event.target.value
    });
  };

  renderDatePicker = title => {
    const { playerInformation } = this.state;
    const { classes } = this.props;

    const newVal = title.replace(/[.+/" "]/g, '');
    const value = playerInformation[newVal];
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="picker">
          <InlineDatePicker
            style={{ height: 43 }}
            keyboard
            clearable
            disableFuture
            variant="outlined"
            format="dd/MM/yyyy"
            className={classes.textField}
            value={value}
            onChange={this.handleDateChange(newVal)}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            // label={title}
            // autoOk={false}
            // views={['year', 'month', 'day']}
          />
        </div>
      </MuiPickersUtilsProvider>
    );
  };

  handleDateChange = testNo => date => {
    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [testNo]: date
      }
    }));
  };

  renderTextField = (from, to) => {
    const { classes } = this.props;
    const { playerInformation } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const newVal = `${title}RE%${from}`.replace(/[./" "]/g, '');

      let value = '';
      if (playerInformation) {
        if (playerInformation[newVal] != undefined) {
          value = playerInformation[newVal];
        } else {
          value = '';
        }
      }

      return (
        <TextField
          key={index}
          style={{
            height:40,
            margin:0
          }}
          fullWidth
          id="outlined-email-input"
          // label={title}
          placeholder="0"
          className={classes.textField}
          name={title}
          value={`${value}`}
          onChange={this.handleFieldChange(newVal)}
          margin="dense"
          variant="outlined"
          inputProps={{
            style: {
              fontSize: 15,
              padding: 10,
              margin:0
            }
          }}
          InputLabelProps={{
            style: {
              fontSize: 14
            }
          }}
        />
      );
    });
  };

  renderTextField2 = (from, to, fieldOf, label) => {
    const { classes } = this.props;
    const { playerInformation } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const newVal = (title + fieldOf + from).replace(/[./" "]/g, '');

      let value = '';
      if (playerInformation) {
        if (playerInformation[newVal] != undefined) {
          value = playerInformation[newVal];
        } else {
          value = '';
        }
      }

      return (
        <TextField
          key={index}
          fullWidth
          style={{ paddingRight: 10 }}
          id="outlined-email-input"
          label={label ? fieldOf : ''}
          // placeholder="0"
          className={classes.textField}
          name={title}
          value={`${value}`}
          onChange={this.handleFieldChange(newVal)}
          margin="dense"
          variant="outlined"
          inputProps={{
            style: {
              fontSize: 15,
              height: 10
            }
          }}
          InputLabelProps={{
            style: {
              fontSize: 14
            }
          }}
        />
      );
    });
  };

  handleFieldChange = name => event => {
    const newVal = name.replace(/[./" "]/g, '');
    const value = event.target.value;
    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [newVal]: value
      }
    }));
  };

  renderDate(testNo) {
    const { playerInformation } = this.state;
    let date = new Date();
    if (playerInformation) {
      if (playerInformation[testNo] != undefined) {
        date = playerInformation[testNo];
      } else {
        date = new Date();
      }
    }
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  saveData = () => {
    let { playerInformation, players, playerInfo } = this.state;

    playerInformation = {
      ...playerInformation,
      fileName: 'playerInfo'
    };
    playerInfo.findOne({ _id: playerInformation._id }, async (err, docs) => {
      if (!docs) {
        await playerInfo.insert(playerInformation, (err, docs) => {
          this.props.getPlayers(playerInfo);
          playerInformation = {};
          this.setState({
            playerInformation,
            openSnack: true
          });
        });
      } else {
        await playerInfo.update(
          { _id: playerInformation._id },
          playerInformation,
          {},
          (err, numReplaced) => {
            playerInformation = {};
            this.setState({
              playerInformation,
              player: 'Select',
              openSnack: true
            });

            this.props.getPlayers(playerInfo);
          }
        );
      }
    });
  };

  createPdf = () => {
    const html = bodyRef.current;
    Doc.createPdf(html);
  };

  render() {
    const { classes } = this.props;
    const { playerInformation, players, player, language, dummyplayerImage } = this.state;
    const func = [
      () => this.saveData(),
      // () => window.print(),
      () => this.createPdf()
    ];

    return (
      <div className={classes.root} id="divToPrint" ref={bodyRef}>
        <div className={classes.innerRoot} elevation={1}>
          <Typography variant="h6" color="primary">
            {language === 'Japanese'
              ? 'リハビリ計画'
              : 'Rehabilitation Planning'}
          </Typography>
          <br />
          <Toolbar>
            <div className={classes.grow}>
              <TextField
                style={{ width: 230 }}
                // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? '選手' : 'Player'}
                className={classes.textField}
                value={player}
                onChange={this.handlePlayerChange('player')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="dense"
                variant="outlined"
              >
                <MenuItem _id="none" value="Select">
                  {language === 'Japanese' ? '選択' : 'Select'}
                </MenuItem>
                {players &&
                  players.map((value, index) => (
                    <MenuItem key={index} _id={value._id} value={value.title}>
                      {value.title}
                    </MenuItem>
                  ))}
              </TextField>

              <Card
                  className={classes.card}
                  style={{
                    maxWidth: 100,
                    marginLeft: 10,
                    display: 'inline-flex'
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Player Image"
                      className={classes.media1}
                      height="100"
                      image={
                        playerInformation
                          ? playerInformation.image
                            ? playerInformation.image
                            : dummyplayerImage
                          : dummyplayerImage
                      }
                    />
                  </CardActionArea>
                </Card>

            </div>

            {icons.map((val, index) => (
              <ButtonBase
                disableRipple
                // focusRipple
                // centerRipple
                key={val.title}
                style={{
                  margin: 5
                }}
              >
                <span onClick={func[index]}>
                  <img src={val.image} alt={val.title} />
                  <Typography variant="subtitle2">
                    {val.title}
                  </Typography>
                </span>
              </ButtonBase>
            ))}
          </Toolbar>
          <br />
          <div
            style={{
              backgroundColor: 'blue'
            }}
          >
            <Typography
              style={{ color: 'white' }}
              // noWrap
              align="center"
              variant="subtitle1"
            >
              {language === 'Japanese' ? '屋内トレーニング' : 'Indoor Training'}
            </Typography>
          </div>

          <br />
          <br />

          <div>
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginRight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(0, 1)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[0]}Date`)}
                </Grid>
                <Grid item xs={4}>
                  {this.renderTextField2(0, 1, 'Min', true)}
                  <br />
                  {this.renderTextField2(0, 1, 'FIELD3')}
                </Grid>
                <Grid item xs={4}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(0, 1)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(1, 2)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[1]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(1, 2, 'Min', true)}
                  <br />
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(0, 1)}
                  </FormGroup>
                </Grid>
                <Grid item xs={3}>
                  <FormGroup
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: 48
                    }}
                  >
                    {this.renderCheckBox2(1, 2)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(1, 2)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginRight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(2, 3)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[2]}Date`)}
                </Grid>
                <Grid item xs={4}>
                  {this.renderTextField2(2, 3, 'Min', true)}
                  <br />
                  {this.renderTextField2(2, 3, 'FIELD3')}
                </Grid>
                <Grid item xs={4}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(2, 3)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(3, 4)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[3]}Date`)}
                </Grid>
                <Grid item xs={4}>
                  {this.renderTextField2(3, 4, 'Min', true)}
                  <br />
                  {this.renderTextField2(3, 4, 'FIELD3')}
                </Grid>
                <Grid item xs={4}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(3, 4)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginRight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(4, 5)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[4]}Date`)}
                </Grid>
                <Grid item xs={4}>
                  {this.renderTextField2(4, 5, 'Min', true)}
                  <br />
                  {this.renderTextField2(4, 5, 'FIELD3')}
                </Grid>
                <Grid item xs={4}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(4, 5)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(5, 6)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[5]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(5, 6, 'Min', true)}
                  <br />
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(2, 4)}
                  </FormGroup>
                </Grid>
                <Grid item xs={3}>
                  <FormGroup
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: 48
                    }}
                  >
                    {this.renderCheckBox2(4, 5)}
                    {this.renderCheckBox2(5, 6)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(5, 6)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginRight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(6, 7)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[6]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(6, 7, 'Min', true)}
                  <br />
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(6, 7)}
                  </FormGroup>
                </Grid>
                <Grid item xs={3}>
                  <FormGroup
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: 48
                    }}
                  >
                    {this.renderCheckBox2(7, 8)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(6, 7)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(7, 8)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[7]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(7, 8, 'Min', true)}
                  <br />
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(8, 10)}
                  </FormGroup>
                </Grid>
                <Grid item xs={3}>
                  <FormGroup
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: 48
                    }}
                  >
                    {this.renderCheckBox2(10, 11)}
                    {this.renderCheckBox2(11, 12)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(7, 8)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <br />
          <br />

          {/* ///////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////// */}

          <div
            style={{
              backgroundColor: 'darkgreen'
            }}
          >
            <Typography
              style={{ color: 'white' }}
              // noWrap
              align="center"
              variant="subtitle1"
            >
              {language === 'Japanese'
                ? '屋外トレーニング'
                : 'Outdoor Training'}
            </Typography>
          </div>

          <br />
          <br />

          <div>
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(8, 9)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[8]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(8, 9, 'Min', true)}

                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(12, 13)}
                    {this.renderCheckBox2(13, 14)}
                  </FormGroup>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese'
                      ? 'ジョギング＆ランニング'
                      : 'Jogging & Running'}
                  </Typography>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(14, 15)}
                    {this.renderCheckBox2(15, 16)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(8, 9)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(9, 10)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[9]}Date`)}
                </Grid>
                <Grid item xs={4}>
                  <div style={{ display: 'flex' }}>
                    {this.renderTextField2(8, 9, 'Min', true)}
                    <Typography variant="subtitle2">
                      {language === 'Japanese'
                        ? '方向転換'
                        : 'Changing Direction'}
                    </Typography>
                  </div>
                  {this.renderTextField2(9, 10, 'FIELD3')}
                </Grid>
                <Grid item xs={4}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(9, 10)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginRight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(10, 11)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[10]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(10, 11, 'Min', true)}
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(16, 18)}
                  </FormGroup>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese'
                      ? 'ウオーキング＆ジョギング'
                      : 'Walking & Jogging'}
                  </Typography>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(18, 20)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(10, 11)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(11, 12)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[11]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(11, 12, 'Min', true)}
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(20, 21)}
                  </FormGroup>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese'
                      ? '方向転換'
                      : 'Changing Direction'}
                  </Typography>

                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(21, 22)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(11, 12)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginRight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(12, 13)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[12]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(12, 13, 'Min', true)}
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(22, 24)}
                  </FormGroup>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese'
                      ? 'ウオーキング&ランニング'
                      : 'Walking & Running'}
                  </Typography>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(24, 26)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(12, 13)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(13, 14)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[13]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(13, 14, 'Min', true)}
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(26, 28)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese' ? 'ジャンプ' : 'Jump'}
                  </Typography>

                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(28, 30)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <FormGroup
                    style={{ display: 'flex', flexDirection: 'row' }}
                    className={classes.title2Margin2}
                  >
                    {this.renderCheckBox2(30, 31)}
                  </FormGroup>
                </Grid>
                <Grid item xs={1}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(13, 14)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginRight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(14, 15)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[14]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(14, 15, 'Min', true)}
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(31, 32)}
                  </FormGroup>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese'
                      ? 'ジョギング＆ランニング'
                      : 'Jogging & Running'}
                  </Typography>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(32, 33)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(14, 15)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(15, 16)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[15]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(15, 16, 'Min', true)}
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(33, 35)}
                  </FormGroup>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese'
                      ? 'ランニング＆スプリント'
                      : 'Running & Sprint'}
                  </Typography>

                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(35, 37)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(15, 16)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginRight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(16, 17)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[16]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(16, 17, 'Min', true)}
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(37, 39)}
                  </FormGroup>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese'
                      ? 'ランニング＆スプリント'
                      : 'Running & Sprint'}
                  </Typography>

                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(39, 41)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(16, 17)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(17, 18)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[17]}Date`)}
                </Grid>
                <Grid item xs={4}>
                  <div style={{ display: 'flex' }}>
                    {this.renderTextField2(17, 18, 'Min', true)}
                    <Typography variant="subtitle2">
                      {language === 'Japanese'
                        ? '方向転換'
                        : 'Changing Direction'}
                    </Typography>
                  </div>
                  {this.renderTextField2(17, 18, 'FIELD3')}
                </Grid>
                <Grid item xs={4}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(17, 18)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginRight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(18, 19)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[18]}Date`)}
                </Grid>
                <Grid item xs={4}>
                  <div style={{ display: 'flex' }}>
                    {this.renderTextField2(18, 19, 'Min', true)}
                    <Typography variant="subtitle2">
                      {language === 'Japanese'
                        ? 'ランニング＆スピード'
                        : 'Running & Speed'}
                    </Typography>
                  </div>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(41, 43)}
                  </FormGroup>
                </Grid>
                <Grid item xs={4}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(18, 19)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(19, 20)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[19]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(19, 20, 'Min', true)}
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(43, 45)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese' ? 'キック' : 'Kick'}
                  </Typography>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(45, 47)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <FormGroup
                    style={{ display: 'flex', flexDirection: 'row' }}
                    className={classes.title2Margin2}
                  >
                    {this.renderCheckBox2(47, 49)}
                  </FormGroup>
                </Grid>
                <Grid item xs={1}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(19, 20)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginRight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(20, 21)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[20]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(20, 21, 'Min', true)}
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(49, 51)}
                  </FormGroup>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese' ? 'ランニング' : 'Running'}
                  </Typography>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(51, 53)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(20, 21)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(21, 22)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[21]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(21, 22, 'Min', true)}
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(53, 55)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese' ? 'キック' : 'Kick'}
                  </Typography>

                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(55, 57)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <FormGroup
                    style={{ display: 'flex', flexDirection: 'row' }}
                    className={classes.title2Margin2}
                  >
                    {this.renderCheckBox2(57, 59)}
                  </FormGroup>
                </Grid>
                <Grid item xs={1}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(21, 22)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginRight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(22, 23)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[22]}Date`)}
                </Grid>
                <Grid item xs={4}>
                  {this.renderTextField2(22, 23, 'Min', true)}
                  <br />
                  {this.renderTextField2(22, 23, 'FIELD3')}
                </Grid>
                <Grid item xs={4}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(22, 23)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(23, 24)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[23]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(8, 9, 'Min', true)}
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(59, 61)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese' ? 'キック' : 'Kick'}
                  </Typography>

                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(61, 63)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <FormGroup
                    style={{ display: 'flex', flexDirection: 'row' }}
                    className={classes.title2Margin2}
                  >
                    {this.renderCheckBox2(63, 65)}
                  </FormGroup>
                </Grid>
                <Grid item xs={1}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(23, 24)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginRight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(24, 25)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[24]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(24, 25, 'Min', true)}
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(65, 67)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese' ? 'スプリント' : 'Sprint'}
                  </Typography>

                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(67, 69)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <FormGroup
                    style={{ display: 'flex', flexDirection: 'row' }}
                    className={classes.title2Margin2}
                  >
                    {this.renderCheckBox2(69, 71)}
                  </FormGroup>
                </Grid>
                <Grid item xs={1}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(24, 25)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(25, 26)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[25]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(25, 26, 'Min', true)}
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(71, 73)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese' ? 'キック' : 'Kick'}
                  </Typography>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(73, 75)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <FormGroup
                    style={{ display: 'flex', flexDirection: 'row' }}
                    className={classes.title2Margin2}
                  >
                    {this.renderCheckBox2(75, 77)}
                  </FormGroup>
                </Grid>
                <Grid item xs={1}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(25, 26)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginRight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(26, 27)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[26]}Date`)}
                </Grid>
                <Grid item xs={5}>
                  <div style={{ display: 'flex' }}>
                    {this.renderTextField2(26, 27, 'Min', true)}
                    <Typography
                      // className={classes.title2Margin}
                      variant="subtitle2"
                    >
                      {language === 'Japanese'
                        ? 'スパイク着用許可'
                        : 'Spike OK'}
                    </Typography>
                  </div>
                  <Typography variant="subtitle2">
                    {language === 'Japanese'
                      ? '患部側荷重'
                      : 'Load the damaged parts'}
                  </Typography>
                  {this.renderTextField2(26, 27, 'FIELD3')}
                </Grid>
                <Grid item xs={3}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(26, 27)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(27, 28)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[27]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(27, 28, 'Min', true)}

                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(77, 78)}
                    {this.renderTextField2(27, 28, 'FIELD3')}
                  </FormGroup>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese' ? 'キック' : 'Kick'}
                  </Typography>

                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(78, 79)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(27, 28)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginRight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(28, 29)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[28]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(28, 29, 'Min', true)}
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(79, 80)}
                  </FormGroup>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese'
                      ? '方向転換'
                      : 'Changing Direction'}
                  </Typography>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(80, 81)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(28, 29)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(29, 30)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[29]}Date`)}
                </Grid>
                <Grid item xs={4}>
                  <div style={{ display: 'flex' }}>
                    {this.renderTextField2(29, 30, 'Min', true)}
                    <Typography
                      className={classes.title2Margin}
                      variant="subtitle2"
                    >
                      {language === 'Japanese' ? 'プレイ' : 'Play'}
                    </Typography>
                  </div>
                  {this.renderTextField2(29, 30, 'FIELD3')}
                </Grid>
                <Grid item xs={4}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(29, 30)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginRight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(30, 31)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[30]}Date`)}
                </Grid>
                <Grid item xs={3}>
                  {this.renderTextField2(30, 31, 'Min', true)}
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(81, 83)}
                  </FormGroup>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    className={classes.title2Margin}
                    variant="subtitle2"
                  >
                    {language === 'Japanese'
                      ? '方向転換'
                      : 'Changing Direction'}
                  </Typography>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox2(83, 85)}
                  </FormGroup>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(30, 31)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(31, 32)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[31]}Date`)}
                </Grid>
                <Grid item xs={4}>
                  <div style={{ display: 'flex' }}>
                    {this.renderTextField2(31, 32, 'Min', true)}
                    <Typography
                      className={classes.title2Margin}
                      variant="subtitle2"
                    >
                      {language === 'Japanese' ? 'プレイ' : 'Play'}
                    </Typography>
                  </div>
                  {this.renderTextField2(31, 32, 'FIELD3')}
                </Grid>
                <Grid item xs={4}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(31, 32)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs
                container
                justify="center"
                direction="row"
                style={{
                  marginRight: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(32, 33)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[32]}Date`)}
                </Grid>
                <Grid item xs={4}>
                  <div style={{ display: 'flex' }}>
                    {this.renderTextField2(32, 33, 'Min', true)}
                    <Typography variant="subtitle2">
                      {language === 'Japanese'
                        ? '方向転換'
                        : 'Changing Direction'}
                    </Typography>
                  </div>
                  {this.renderTextField2(32, 33, 'FIELD3')}
                </Grid>
                <Grid item xs={4}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(32, 33)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  marginLeft: 10,
                  padding: 5,
                  backgroundColor: 'rgb(242, 242, 242)'
                }}
              >
                <Grid item xs={4}>
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.renderCheckBox(33, 34)}
                  </FormGroup>
                  {this.renderDatePicker(`${fields[33]}Date`)}
                </Grid>
                <Grid item xs={4}>
                  <div style={{ display: 'flex' }}>
                    {this.renderTextField2(33, 34, 'Min', true)}
                    <Typography
                      className={classes.title2Margin}
                      variant="subtitle2"
                    >
                      {language === 'Japanese' ? 'プレイ' : 'Play'}
                    </Typography>
                  </div>
                  {this.renderTextField2(33, 34, 'FIELD3')}
                </Grid>
                <Grid item xs={4}>
                  <Typography align="center" variant="subtitle2">
                    R.E%
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {this.renderTextField(33, 34)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
        <SnackBar
          handleSnack={value => this.setState({ openSnack: value })}
          openSnack={this.state.openSnack}
          classes={this.props.classes}
        />
      </div>
    );
  }
}

TechnicalPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    players: state.rehabilitationReducer.players,
    language: state.dropDownReducer.language || 'English'
  });

const mapDispatchToProps = dispatch => ({
  getPlayers: playerInfo => dispatch(getPlayers(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
