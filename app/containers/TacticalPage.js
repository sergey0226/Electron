/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-concat */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable radix */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable global-require */
// @flow
import React, { Component } from 'react';

import { Bar } from 'react-chartjs-2';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import TextFieldNew from '../constants/TextInput';

import {
  selectPlayer,
  selectSeason,
  getPlayers
} from '../actions/tacticalActions';

import SnackBar from '../components/SnackBar/SnackBar';
import Doc from '../constants/DocService';

import * as fieldsArray from '../constants/textFields';
import * as fieldsArrayJap from '../constants/textFieldsJap';

const bodyRef = React.createRef();

let avgAtta1ck;
let avgAtta2ck;
let avgAtta3ck;
let avgAtta4ck;

let avgDefe1nd;
let avgDefe2nd;
let avgDefe3nd;
let avgDefe4nd;

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
    display:'flex',
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

  gridItem: {
    marginLeft: -10
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
  }
});

const icons = [...fieldsArray.icons];

const fields = [...fieldsArray.tacticalFields];
const scores = [...fieldsArray.tacticalScores];

const scoreDropdown = [...Array(11).keys()];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: 'Select',
      players: [],
      season: 'Select',
      seasons: [],

      language: 'English',
      playerInformation: {},
      playerImage: require('../assets/images/addimage.png')
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
      playerInformation: nextProps.playerInformation,
      players: nextProps.players,
      seasons: nextProps.seasons,
      language: nextProps.language
    });
  }

  componentWillUnmount() {
    const { playerInfo } = this.state;
    this.props.selectPlayer(
      { event: { target: { value: 'Select' } } },
      playerInfo
    );
  }

  handleDateChange = testNo => date => {
    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [testNo]: date
      }
    }));
  };

  handleSeasonChange = name => (event, value) => {
    const { playerInformation, playerObject, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const playerObjKey = playerObject.value.key;

    const seasonObject = {
      event,
      value,
      playerInformation
    };

    this.props.selectSeason(playerObjKey, playerInfo, seasonObject);

    this.setState({
      [newVal]: event.target.value
    });
  };

  handlePlayerChange = name => (event, value) => {
    const { playerInformation, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');

    const object = {
      event,
      value,
      playerInformation
    };

    this.props.selectPlayer(object, playerInfo);

    this.setState({
      [newVal]: event.target.value,
      playerObject: object,
      season: 'Select'
    });
  };

  renderDatePicker = (testNo, cssClass) => {
    const { playerInformation } = this.state;
    const { classes } = this.props;

    const date = playerInformation[testNo];
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="picker">
          <InlineDatePicker
            style={cssClass ? { marginTop: -15, marginBottom: -15 } : {}}
            keyboard
            clearable
            disableFuture
            format="dd/MM/yyyy"
            value={date}
            onChange={this.handleDateChange(testNo)}
            className={classes.headings}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            // variant="outlined"
            // label="Date"
            // autoOk={false}
            // views={['year', 'month', 'day']}
          />
        </div>
      </MuiPickersUtilsProvider>
    );
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

  renderTextField = (from, to, testNo,elite=false) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.tacticalFields[from + index];
      const newVal = (title + testNo).replace(/[./" "]/g, '');

      let value = '';
      if (playerInformation) {
        if (playerInformation[newVal] != undefined) {
          if (newVal === 'PlayerBirthday') {
            value = this.renderDate('PlayerBirthday');
          } else {
            value = playerInformation[newVal];
          }
        } else {
          value = '';
        }
      }
      if(elite == true)
      return (
        <TextFieldNew
          key={index}
          fullWidth
          id="outlined-email-input"
          label={label}
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
            }
          }}
          InputLabelProps={{
            style: {
              fontSize: 14
            }
          }}
        />
      );
      return (
        <TextField
          key={index}
          fullWidth
          id="outlined-email-input"
          // label={label}
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
    const {value} = event.target;
    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [newVal]: value
      }
    }));
  };

  renderTextFieldSec2 = (from, to, test) => {
    const { classes } = this.props;
    const { playerInformation } = this.state;
    return scores.slice(from, to).map((title, index) => {
      const newVal = (title + test).replace(/[./" "]/g, '');
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
          style={{
            height: 35
          }}
          key={index}
          fullWidth
          id="outlined-email-input"
          // type="number"
          // label={title}
          select
          className={classes.textField}
          name={title}
          placeholder="0"
          value={`${value}`}
          onChange={this.handleFieldChange2(newVal)}
          margin="dense"
          variant="outlined"
          inputProps={{
            style: {
              fontSize: 15,
              height: 10
            }
          }}
        >
          {scoreDropdown.map(value => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
      );
    });
  };

  handleFieldChange2 = name => event => {
    const newVal = name.replace(/[./" "]/g, '');
    const {value} = event.target;

    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [newVal]: Number(value)
      }
    }));
  };

  renderAttackChart = (attackNo, scoreDate) => {
    const { playerInformation, language } = this.state;
    return (
      <Bar
        ref="chart"
        options={{
          // barValueSpacing: 20,
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0
                }
              }
            ]
          }
        }}
        data={{
          labels:
            language === 'English'
              ? [...scores].slice(0, 20)
              : [...fieldsArrayJap.tacticalScores].slice(0, 20),
          datasets: [
            {
              label: language === 'Japanese' ? '攻撃' : 'Attacking',
              backgroundColor: 'rgba(75,192,192,1)',
              data: [
                playerInformation['CreatingSpace' + `${attackNo}`]
                  ? parseInt(playerInformation['CreatingSpace' + `${attackNo}`])
                  : 0,
                playerInformation['Support' + `${attackNo}`]
                  ? parseInt(playerInformation['Support' + `${attackNo}`])
                  : 0,
                playerInformation['Width' + `${attackNo}`]
                  ? parseInt(playerInformation['Width' + `${attackNo}`])
                  : 0,
                playerInformation['Depth' + `${attackNo}`]
                  ? parseInt(playerInformation['Depth' + `${attackNo}`])
                  : 0,
                playerInformation['Overlaps' + `${attackNo}`]
                  ? parseInt(playerInformation['Overlaps' + `${attackNo}`])
                  : 0,
                playerInformation['DiagonalRuns' + `${attackNo}`]
                  ? parseInt(playerInformation['DiagonalRuns' + `${attackNo}`])
                  : 0,
                playerInformation['Playingforwards' + `${attackNo}`]
                  ? parseInt(
                      playerInformation['Playingforwards' + `${attackNo}`]
                    )
                  : 0,
                playerInformation['Speedofplay' + `${attackNo}`]
                  ? parseInt(playerInformation['Speedofplay' + `${attackNo}`])
                  : 0,
                playerInformation['Buildup' + `${attackNo}`]
                  ? parseInt(playerInformation['Buildup' + `${attackNo}`])
                  : 0,
                playerInformation['SwitchingPosition' + `${attackNo}`]
                  ? parseInt(
                      playerInformation['SwitchingPosition' + `${attackNo}`]
                    )
                  : 0,
                playerInformation['Posession' + `${attackNo}`]
                  ? parseInt(playerInformation['Posession' + `${attackNo}`])
                  : 0,
                playerInformation['Transition' + `${attackNo}`]
                  ? parseInt(playerInformation['Transition' + `${attackNo}`])
                  : 0,
                playerInformation['Combinationplay' + `${attackNo}`]
                  ? parseInt(
                      playerInformation['Combinationplay' + `${attackNo}`]
                    )
                  : 0,
                playerInformation['Switchingplay' + `${attackNo}`]
                  ? parseInt(playerInformation['Switchingplay' + `${attackNo}`])
                  : 0,
                playerInformation['CounterAttacking' + `${attackNo}`]
                  ? parseInt(
                      playerInformation['CounterAttacking' + `${attackNo}`]
                    )
                  : 0,
                playerInformation['Playingoutfromtheback' + `${attackNo}`]
                  ? parseInt(
                      playerInformation['Playingoutfromtheback' + `${attackNo}`]
                    )
                  : 0,
                playerInformation['Sideattacking' + `${attackNo}`]
                  ? parseInt(playerInformation['Sideattacking' + `${attackNo}`])
                  : 0,
                playerInformation['Centerattacking' + `${attackNo}`]
                  ? parseInt(
                      playerInformation['Centerattacking' + `${attackNo}`]
                    )
                  : 0,
                playerInformation['Finishinginthefinalthird' + `${attackNo}`]
                  ? parseInt(
                      playerInformation[
                        'Finishinginthefinalthird' + `${attackNo}`
                      ]
                    )
                  : 0,
                playerInformation['SetPlay' + `${attackNo}`]
                  ? parseInt(playerInformation['SetPlay' + `${attackNo}`])
                  : 0
              ]
            }
          ]
        }}
      />
    );
  };

  renderDefendChart = (attackNo, scoreDate) => {
    const { playerInformation, language } = this.state;
    return (
      <Bar
        options={{
          // barValueSpacing: 20,
          scales: { yAxes: [{ ticks: { min: 0 } }] }
        }}
        data={{
          labels:
            language === 'English'
              ? [...scores].slice(20, 40)
              : [...fieldsArrayJap.tacticalScores].slice(20, 40),
          datasets: [
            {
              label: language === 'Japanese' ? '守備' : 'Defending',
              backgroundColor: 'rgba(75,192,192,1)',
              data: [
                playerInformation[`Marking${attackNo}`]
                  ? parseInt(playerInformation[`Marking${attackNo}`])
                  : 0,
                playerInformation[`Approaching${attackNo}`]
                  ? parseInt(playerInformation[`Approaching${attackNo}`])
                  : 0,
                playerInformation[`Pressing${attackNo}`]
                  ? parseInt(playerInformation[`Pressing${attackNo}`])
                  : 0,
                playerInformation[`Delaying${attackNo}`]
                  ? parseInt(playerInformation[`Delaying${attackNo}`])
                  : 0,
                playerInformation[`BackPressing${attackNo}`]
                  ? parseInt(playerInformation[`BackPressing${attackNo}`])
                  : 0,
                playerInformation[`Covering${attackNo}`]
                  ? parseInt(playerInformation[`Covering${attackNo}`])
                  : 0,
                playerInformation[`Balance${attackNo}`]
                  ? parseInt(playerInformation[`Balance${attackNo}`])
                  : 0,
                playerInformation[`Doublingup${attackNo}`]
                  ? parseInt(playerInformation[`Doublingup${attackNo}`])
                  : 0,
                playerInformation[`Tracking${attackNo}`]
                  ? parseInt(playerInformation[`Tracking${attackNo}`])
                  : 0,
                playerInformation[`Defensewiththegroup${attackNo}`]
                  ? parseInt(
                      playerInformation[`Defensewiththegroup${attackNo}`]
                    )
                  : 0,
                playerInformation[`Switchingplaces${attackNo}`]
                  ? parseInt(playerInformation[`Switchingplaces${attackNo}`])
                  : 0,
                playerInformation[`Zonaldefending${attackNo}`]
                  ? parseInt(playerInformation[`Zonaldefending${attackNo}`])
                  : 0,
                playerInformation[`PressingZone${attackNo}`]
                  ? parseInt(playerInformation[`PressingZone${attackNo}`])
                  : 0,
                playerInformation[`Defenseforsideattacking${attackNo}`]
                  ? parseInt(
                      playerInformation[`Defenseforsideattacking${attackNo}`]
                    )
                  : 0,
                playerInformation[`Defenseforcross${attackNo}`]
                  ? parseInt(playerInformation[`Defenseforcross${attackNo}`])
                  : 0,
                playerInformation[`Defenselinecontrol${attackNo}`]
                  ? parseInt(playerInformation[`Defenselinecontrol${attackNo}`])
                  : 0,
                playerInformation[`Retreat${attackNo}`]
                  ? parseInt(playerInformation[`Retreat${attackNo}`])
                  : 0,
                playerInformation[`Compactness${attackNo}`]
                  ? parseInt(playerInformation[`Compactness${attackNo}`])
                  : 0,
                playerInformation[`Counterofthecounter${attackNo}`]
                  ? parseInt(
                      playerInformation[`Counterofthecounter${attackNo}`]
                    )
                  : 0,
                playerInformation[`SetPlay${attackNo}`]
                  ? parseInt(playerInformation[`SetPlay${attackNo}`])
                  : 0
              ]
            }
          ]
        }}
      />
    );
  };

  renderAverge = averageOf => {
    const { playerInformation, language } = this.state;

    let totalKeys = 0;
    let sum = 0;
    for (const key in playerInformation) {
      if (key.includes(averageOf) && playerInformation[key] !== 0) {
        totalKeys += 1;
        sum += Number(playerInformation[key]);
      }
    }

    let average = sum / totalKeys;

    if (isNaN(average)) {
      return language === 'Japanese' ? `平均 ${0}` : `Avg. ${0}`;
    }

    average = Number(average.toFixed(2));

    switch (averageOf) {
      case 'Attack1': {
        avgAtta1ck = average;
        break;
      }
      case 'Attack2': {
        avgAtta2ck = average;
        break;
      }
      case 'Attack3': {
        avgAtta3ck = average;
        break;
      }
      case 'Attack4': {
        avgAtta4ck = average;
        break;
      }

      case 'Defend1': {
        avgDefe1nd = average;
        break;
      }
      case 'Defend2': {
        avgDefe2nd = average;
        break;
      }
      case 'Defend3': {
        avgDefe3nd = average;
        break;
      }
      case 'Defend4': {
        avgDefe4nd = average;
        break;
      }
      default: {
        return null;
      }
    }

    return language === 'Japanese'
      ? `平均 ${average.toFixed(2)}`
      : `Avg. ${average.toFixed(2)}`;
  };

  saveData = () => {
    let { playerInformation, players, playerInfo } = this.state;

    playerInformation = {
      ...playerInformation,
      avgAtta1ck,
      avgAtta2ck,
      avgAtta3ck,
      avgAtta4ck,
      avgDefe1nd,
      avgDefe2nd,
      avgDefe3nd,
      avgDefe4nd
    };
    if (playerInformation.second_id) {
      playerInfo.update(
        { _id: playerInformation._id },
        playerInformation,
        {},
        (err, numReplaced) => {
          playerInformation = {};
          this.setState({
            playerInformation,
            player: 'Select',
            season: 'Select',
            openSnack: true
          });
          this.props.selectPlayer(
            { event: { target: { value: 'Select' } } },
            playerInfo
          );
        }
      );
    } else {
      const fileName = 'tactical';
      const date = playerInformation.score1Date;
      const seasonName = `Season - ${date.getFullYear()}`;
      const second_id = playerInformation._id;
      delete playerInformation._id;
      playerInformation = {
        ...playerInformation,
        second_id,
        seasonName,
        fileName
      };
      playerInfo.insert(playerInformation, (err, docs) => {
        this.props.selectPlayer(
          { event: { target: { value: 'Select' } } },
          playerInfo
        );
        playerInformation = {};
        this.setState({
          playerInformation,
          player: 'Select',
          season: 'Select',
          openSnack: true
        });
      });
    }
  };

  createPdf = () => {
    const html = bodyRef.current;
    Doc.createPdf(html,false,'a3');
  };

  render() {
    const { classes } = this.props;
    const {
      season,
      seasons,
      players,
      player,
      playerInformation,
      playerImage,
      language
    } = this.state;
    const func = [
      () => this.saveData(),
      // () => window.print(),
      () => this.createPdf()
    ];
    return (
      <div className={classes.root} id="divToPrint" ref={bodyRef}>
        <div className={classes.innerRoot} elevation={1}>
          <Typography variant="h6" color="primary">
            {language === 'Japanese' ? '戦術' : 'Tactical'}
          </Typography>
          <br />
          <Toolbar>
            <div className={classes.grow}>
              <TextFieldNew
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
                  players.map(value => (
                    <MenuItem key={value._id} value={value.title}>
                      {value.title}
                    </MenuItem>
                  ))}
              </TextFieldNew>
              <TextFieldNew
                style={{ width: 150 }}
                // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? 'シーズン' : 'Season'}
                className={classes.textField}
                value={season}
                onChange={this.handleSeasonChange('season')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="dense"
                variant="outlined"
              >
                <MenuItem _id="none1" value="Select">
                  {language === 'Japanese' ? '選択' : 'Select'}
                </MenuItem>
                {/* <MenuItem _id="none2" value="New">
                  {language === 'Japanese' ? '新規' : 'New'}
                </MenuItem> */}
                {seasons &&
                  seasons.map(value => (
                    <MenuItem key={value._id} value={value.title}>
                      {value.title}
                    </MenuItem>
                  ))}
              </TextFieldNew>
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
          <div>
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item xs={2} container justify="center">
                <Typography
                  variant="subtitle1"
                  align="center"
                  style={{ width: '100%' }}
                >
                  {playerInformation.Name1
                    ? playerInformation.Name1
                    : language === 'Japanese'
                    ? '選手名前'
                    : 'Player Name'}
                </Typography>
                <Card
                  className={classes.card}
                  style={{
                    maxWidth: 220,
                    marginBottom: 10
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Player Image"
                      className={classes.media}
                      height="340"
                      image={
                        playerInformation
                          ? playerInformation.image
                            ? playerInformation.image
                            : playerImage
                          : playerImage
                      }
                    />
                  </CardActionArea>
                </Card>
                {this.renderTextField(0, 8, '',true)}
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  variant="subtitle1"
                  className={classes.headings}
                  style={{ paddingTop: 3 }}
                >
                  {language === 'Japanese' ? '身体のサイズ' : 'BODY SIZE'}
                </Typography>
                {fields.slice(8, 16).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.tacticalFields[8 + index];
                  return (
                    <div key={index} style={{ width: '100%', margin: 13 }}>
                      <Typography variant="subtitle2">{label}</Typography>
                    </div>
                  );
                })}
                <Typography
                  variant="subtitle1"
                  className={classes.headings}
                  style={{ paddingTop: 2 }}
                >
                  {language === 'Japanese' ? '健康状態' : 'HEALTH'}
                </Typography>
                {fields.slice(16, 21).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.tacticalFields[16 + index];
                  return (
                    <div key={index} style={{ width: '100%', margin: 13 }}>
                      <Typography variant="subtitle2">{label}</Typography>
                    </div>
                  );
                })}
              </Grid>
              <Grid item xs container justify="center">
                {this.renderDatePicker('DateofRegistration')}
                {this.renderTextField(8, 16, '')}
                <Typography className={classes.headings} variant="subtitle2">
                  {this.renderDate('DateofRegistration')}
                </Typography>
                {this.renderTextField(16, 21, '')}
              </Grid>
              <Grid item xs container justify="center">
                {this.renderDatePicker('test2Date')}
                {this.renderTextField(8, 16, 'test2')}
                <Typography className={classes.headings} variant="subtitle2">
                  {this.renderDate('test2Date')}
                </Typography>
                {this.renderTextField(16, 21, 'test2')}
              </Grid>
              <Grid item xs container justify="center">
                {this.renderDatePicker('test3Date')}
                {this.renderTextField(8, 16, 'test3')}
                <Typography className={classes.headings} variant="subtitle2">
                  {this.renderDate('test3Date')}
                </Typography>
                {this.renderTextField(16, 21, 'test3')}
              </Grid>
              <Grid item xs container justify="center">
                {this.renderDatePicker('test4Date')}
                {this.renderTextField(8, 16, 'test4')}
                <Typography className={classes.headings} variant="subtitle2">
                  {this.renderDate('test4Date')}
                </Typography>
                {this.renderTextField(16, 21, 'test4')}
              </Grid>
            </Grid>

            <br />
            <Typography className={classes.commentTypo} variant="subtitle2">
              {language === 'Japanese'
                ? '戦術状況について'
                : 'INFORMATION ABOUT TACTICAL STATUS'}
            </Typography>
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs container justify="center">
                <TextField
                  style={{ margin: '0px 10px 0px -1px' }}
                  fullWidth
                  id="outlined-multiline-flexible"
                  value={
                    playerInformation &&
                    (playerInformation.TacticalStatus
                      ? playerInformation.TacticalStatus
                      : '')
                  }
                  onChange={this.handleFieldChange('Tactical Status')}
                  multiline
                  rows="4"
                  rowsMax="4"
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </div>
          {/* <TacticalSec1 {...this.props} /> */}
          {/* <TacticalSec1 {...this.props} /> */}
          {/* <TacticalSec1 {...this.props} /> */}
          {/* <TacticalSec1 {...this.props} /> */}
          {/* <TacticalSec1 {...this.props} /> */}
          {/* <TacticalSec1 {...this.props} /> */}

          <div>
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
                  xs={6}
                  container
                  justify="center"
                  direction="row"
                  style={{ paddingRight: 30, paddingTop: 40 }}
                >
                  <Grid item xs={8}>
                    <Typography
                      variant="subtitle2"
                      style={{ backgroundColor: 'blue', color: 'white' }}
                      className={classes.tablePadding}
                    >
                      {language === 'Japanese'
                        ? '戦術評価'
                        : 'TACTICAL EVALUATION'}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {this.renderDate('score1Date')}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {this.renderDate('score2Date')}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {this.renderDate('score3Date')}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {this.renderDate('score4Date')}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      variant="subtitle2"
                      style={{ backgroundColor: 'magenta', color: 'white' }}
                      className={classes.tablePadding}
                    >
                      {language === 'Japanese' ? '攻撃' : 'ATTACK'}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {playerInformation.avgAtta1ck
                        ? playerInformation.avgAtta1ck
                        : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {playerInformation.avgAtta2ck
                        ? playerInformation.avgAtta2ck
                        : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {playerInformation.avgAtta3ck
                        ? playerInformation.avgAtta3ck
                        : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {playerInformation.avgAtta4ck
                        ? playerInformation.avgAtta4ck
                        : 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      variant="subtitle2"
                      style={{ backgroundColor: 'lightblue', color: 'white' }}
                      className={classes.tablePadding}
                    >
                      {language === 'Japanese' ? '守備' : 'DEFENSE'}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {playerInformation.avgDefe1nd
                        ? playerInformation.avgDefe1nd
                        : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {playerInformation.avgDefe2nd
                        ? playerInformation.avgDefe2nd
                        : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {playerInformation.avgDefe3nd
                        ? playerInformation.avgDefe3nd
                        : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {playerInformation.avgDefe4nd
                        ? playerInformation.avgDefe4nd
                        : 0}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6} container justify="center">
                  <Bar
                    ref="chart"
                    options={{
                      // barValueSpacing: 20,
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              min: 0
                            }
                          }
                        ]
                      }
                    }}
                    data={{
                      labels: [
                        `${this.renderDate('score1Date')}`,
                        `${this.renderDate('score2Date')}`,
                        `${this.renderDate('score3Date')}`,
                        `${this.renderDate('score4Date')}`
                      ],
                      datasets: [
                        {
                          label: language === 'Japanese' ? '攻撃' : 'ATTACK',
                          backgroundColor: 'magenta',
                          data: [
                            playerInformation.avgAtta1ck
                              ? parseInt(playerInformation.avgAtta1ck)
                              : 0,
                            playerInformation.avgAtta2ck
                              ? parseInt(playerInformation.avgAtta2ck)
                              : 0,
                            playerInformation.avgAtta3ck
                              ? parseInt(playerInformation.avgAtta3ck)
                              : 0,
                            playerInformation.avgAtta4ck
                              ? parseInt(playerInformation.avgAtta4ck)
                              : 0
                          ]
                        },
                        {
                          label: language === 'Japanese' ? '守備' : 'DEFENSE',
                          backgroundColor: 'lightblue',
                          data: [
                            playerInformation.avgDefe1nd
                              ? parseInt(playerInformation.avgDefe1nd)
                              : 0,
                            playerInformation.avgDefe2nd
                              ? parseInt(playerInformation.avgDefe2nd)
                              : 0,
                            playerInformation.avgDefe3nd
                              ? parseInt(playerInformation.avgDefe3nd)
                              : 0,
                            playerInformation.avgDefe4nd
                              ? parseInt(playerInformation.avgDefe4nd)
                              : 0
                          ]
                        }
                      ]
                    }}
                  />
                </Grid>
              </Grid>
              <Typography className={classes.commentTypo} variant="subtitle2" />
            </div>
            <br />
            <br />
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item xs={2} container justify="center">
                <Typography
                  noWrap
                  variant="subtitle1"
                  className={classes.headings2}
                  style={{ paddingTop: 18 }}
                >
                  {language === 'Japanese' ? '攻撃' : 'Attacking'}
                </Typography>
                {scores.slice(0, 20).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.tacticalScores[index];
                  return (
                    <div key={index} style={{ width: '100%', margin: 12.5 }}>
                      <Typography
                        style={{ fontSize: 12 }}
                        noWrap
                        variant="subtitle2"
                      >
                        {label}
                      </Typography>
                    </div>
                  );
                })}
                <Typography style={{ fontSize: 20 }} noWrap variant="subtitle2">
                  {language === 'Japanese' ? '合計' : 'Total Score'}
                </Typography>
              </Grid>

              <Grid item xs container justify="center">
                <Typography variant="subtitle2">
                  {this.renderDate('score1Date', 'available')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(0, 20, 'Attack1')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('Attack1')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2">
                  {this.renderDate('score2Date', 'available')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(0, 20, 'Attack2')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('Attack2')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2">
                  {this.renderDate('score3Date', 'available')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(0, 20, 'Attack3')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('Attack3')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center"
                style={{
                  borderRight: '3px solid rgba(26, 43, 117, 1)',
                  paddingRight: 20
                }}
              >
                <Typography variant="subtitle2">
                  {this.renderDate('score4Date', 'available')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(0, 20, 'Attack4')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('Attack4')}
                </Typography>
              </Grid>

              <Grid item xs={2} container justify="center">
                <Typography
                  noWrap
                  variant="subtitle1"
                  className={classes.headings2}
                  style={{ paddingTop: 18 }}
                >
                  {language === 'Japanese' ? '守備' : 'Defending'}
                </Typography>
                {scores.slice(20, 40).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.tacticalScores[index + 20];
                  return (
                    <div key={index} style={{ width: '100%', margin: 12.5 }}>
                      <Typography
                        style={{ fontSize: 12 }}
                        noWrap
                        variant="subtitle2"
                      >
                        {label}
                      </Typography>
                    </div>
                  );
                })}
                <Typography style={{ fontSize: 20 }} noWrap variant="subtitle2">
                  {language === 'Japanese' ? '合計' : 'Total Score'}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2">
                  {this.renderDate('score1Date')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(20, 40, 'Defend1')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('Defend1')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2">
                  {this.renderDate('score2Date')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(20, 40, 'Defend2')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('Defend2')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2">
                  {this.renderDate('score3Date')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(20, 40, 'Defend3')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('Defend3')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2">
                  {this.renderDate('score4Date')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(20, 40, 'Defend4')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('Defend4')}
                </Typography>
              </Grid>
            </Grid>
            <br />
            <br />
          </div>
          {/* <TacticalSec2 {...this.props} /> */}
          {/* <TacticalSec2 {...this.props} /> */}
          {/* <TacticalSec2 {...this.props} /> */}
          {/* <TacticalSec2 {...this.props} /> */}
          {/* <TacticalSec2 {...this.props} /> */}
          {/* <TacticalSec2 {...this.props} /> */}

          {playerInformation && (
            <div>
              <div
                style={{
                  backgroundColor: 'blue'
                }}
              >
                <Typography
                  style={{ color: 'white' }}
                  align="center"
                  variant="subtitle1"
                >
                  {language === 'Japanese'
                    ? '戦術/攻撃'
                    : 'Tactical Attacking '}
                </Typography>
              </div>
              <br />
              <div>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item xs={6} container justify="center">
                    {this.renderAttackChart('Attack1', 'score1Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderAttackChart('Attack2', 'score2Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderAttackChart('Attack3', 'score3Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderAttackChart('Attack4', 'score4Date')}
                  </Grid>
                </Grid>
              </div>
              <br />
              <br />
              <div
                style={{
                  backgroundColor: 'red'
                }}
              >
                <Typography
                  style={{ color: 'white' }}
                  align="center"
                  variant="subtitle1"
                >
                  {language === 'Japanese' ? '戦術/守備' : 'Tactical Defending'}
                </Typography>
              </div>
              <br />
              <div>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item xs={6} container justify="center">
                    {this.renderDefendChart('Defend1', 'score1Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderDefendChart('Defend2', 'score2Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderDefendChart('Defend3', 'score3Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderDefendChart('Defend4', 'score4Date')}
                  </Grid>
                </Grid>
              </div>
            </div>
          )}
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
  players: state.tacticalReducer.players,
  playerInformation: state.tacticalReducer.playerInformation || {},
  seasons: state.tacticalReducer.seasons || [],
  language: state.dropDownReducer.language || 'English'
});
const mapDispatchToProps = dispatch => ({
  selectSeason: (playerObject, playerInfo, seasonObject) =>
    dispatch(selectSeason(playerObject, playerInfo, seasonObject)),
  selectPlayer: (object, playerInfo) =>
    dispatch(selectPlayer(object, playerInfo)),
  getPlayers: playerInfo => dispatch(getPlayers(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
