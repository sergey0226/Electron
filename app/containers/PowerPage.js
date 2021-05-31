/* eslint-disable no-useless-concat */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable radix */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable global-require */
// @flow
import React, { Component } from 'react';

import { Bar } from 'react-chartjs-2';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import TextFieldNew from '../constants/TextInput';
import {
  selectPlayer,
  selectSeason,
  getPlayers
} from '../actions/physicalActions';

import SnackBar from '../components/SnackBar/SnackBar';
import Doc from '../constants/DocService';

import * as fieldsArray from '../constants/textFields';
import * as fieldsArrayJap from '../constants/textFieldsJap';

const bodyRef = React.createRef();

let avgPow1er;
let avgPow2er;
let avgPow3er;
let avgPow4er;

let avgStreng1th;
let avgStreng2th;
let avgStreng3th;
let avgStreng4th;

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

const scores = [...fieldsArray.powerScores];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: 'Select',
      players: [],
      season: 'Select',
      seasons: [],

      language: 'English',
      playerInformation: {}
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

  handleSeasonChange = name => (event, value) => {
    const { playerInformation, seasons, playerObject, playerInfo } = this.state;

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

  renderTextFieldSided = (from, to, testNo) => {
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

      return (
        <TextFieldNew
          key={index}
          fullWidth
          id="outlined-email-input"
          className={classes.textField}
          name={title}
          label={label}
          value={`${value}`}
          onChange={this.handleFieldChange(newVal)}
          margin="dense"
          variant="outlined"

          InputLabelProps={{
            style: {
              fontSize: 14
            }
          }}
        />
      );
    });
  };

  renderTextFieldSec2 = (from, to, test) => {
    const { classes } = this.props;
    const { playerInformation } = this.state;
    return scores.slice(from, to).map((title, index) => {
      const newTitle = title + test;
      const newVal = newTitle.replace(/[./" "]/g, '');
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
          type="number"
          key={index}
          fullWidth
          id="outlined-email-input"
          // label={title}
          // select
          className={classes.textField}
          name={title}
          placeholder="0"
          value={`${value}`}
          onChange={this.handleFieldChange2(newVal)}
          margin="dense"
          variant="outlined"

        />
      );
    });
  };

  handleFieldChange2 = name => event => {
    const newVal = name.replace(/[./" "]/g, '');
    const {value} = event.target;

    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [newVal]: value
      }
    }));
  };

  renderPowerChart = (attackNo, scoreDate) => {
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
              ? [...scores].slice(0, 11)
              : [...fieldsArrayJap.powerScores].slice(0, 11),
          datasets: [
            {
              label: language === 'Japanese' ? 'パワー' : 'Power',
              backgroundColor: 'rgba(75,192,192,1)',

              data: [
                playerInformation[`JUMPCMJWAm${attackNo}`]
                  ? parseInt(playerInformation[`JUMPCMJWAm${attackNo}`])
                  : 0,
                playerInformation['JUMPSquatJm' + `${attackNo}`]
                  ? parseInt(playerInformation['JUMPSquatJm' + `${attackNo}`])
                  : 0,
                playerInformation['JUMP6Jmwitharmm' + `${attackNo}`]
                  ? parseInt(
                      playerInformation['JUMP6Jmwitharmm' + `${attackNo}`]
                    )
                  : 0,
                playerInformation['JUMP6Jmwoarmm' + `${attackNo}`]
                  ? parseInt(playerInformation['JUMP6Jmwoarmm' + `${attackNo}`])
                  : 0,
                playerInformation['LVerticalJm' + `${attackNo}`]
                  ? parseInt(playerInformation['LVerticalJm' + `${attackNo}`])
                  : 0,
                playerInformation['RVerticalJm' + `${attackNo}`]
                  ? parseInt(playerInformation['RVerticalJm' + `${attackNo}`])
                  : 0,
                playerInformation['TripleHopm' + `${attackNo}`]
                  ? parseInt(playerInformation['TripleHopm' + `${attackNo}`])
                  : 0,
                playerInformation['LLongThrowm' + `${attackNo}`]
                  ? parseInt(playerInformation['LLongThrowm' + `${attackNo}`])
                  : 0,
                playerInformation['RLongThrowm' + `${attackNo}`]
                  ? parseInt(playerInformation['RLongThrowm' + `${attackNo}`])
                  : 0,
                playerInformation['LLongKickm' + `${attackNo}`]
                  ? parseInt(playerInformation['LLongKickm' + `${attackNo}`])
                  : 0,
                playerInformation['RLongKickm' + `${attackNo}`]
                  ? parseInt(playerInformation['RLongKickm' + `${attackNo}`])
                  : 0
              ]
            }
          ]
        }}
      />
    );
  };

  renderStrengthChart = (attackNo, scoreDate) => {
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
              ? [...scores].slice(11, 19)
              : [...fieldsArrayJap.powerScores].slice(11, 19),
          datasets: [
            {
              label: language === 'Japanese' ? 'ストレングス' : 'Strength',
              backgroundColor: 'rgba(75,192,192,1)',
              data: [
                playerInformation[`BenchPresskg${attackNo}`]
                  ? parseInt(playerInformation[`BenchPresskg${attackNo}`])
                  : 0,
                playerInformation[`Squatkg${attackNo}`]
                  ? parseInt(playerInformation[`Squatkg${attackNo}`])
                  : 0,
                playerInformation[`DeadLiftkg${attackNo}`]
                  ? parseInt(playerInformation[`DeadLiftkg${attackNo}`])
                  : 0,
                playerInformation[`LegExtensionkg${attackNo}`]
                  ? parseInt(playerInformation[`LegExtensionkg${attackNo}`])
                  : 0,
                playerInformation[`LEGCurlkg${attackNo}`]
                  ? parseInt(playerInformation[`LEGCurlkg${attackNo}`])
                  : 0,
                playerInformation[`ChestFlykg${attackNo}`]
                  ? parseInt(playerInformation[`ChestFlykg${attackNo}`])
                  : 0,
                playerInformation[`MachineRowingkg${attackNo}`]
                  ? parseInt(playerInformation[`MachineRowingkg${attackNo}`])
                  : 0,
                playerInformation[`BackExtension${attackNo}`]
                  ? parseInt(playerInformation[`BackExtension${attackNo}`])
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
      if (key.includes(averageOf) && playerInformation[key] != 0) {
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
      case 'Power1': {
        avgPow1er = average;
        break;
      }
      case 'Power2': {
        avgPow2er = average;
        break;
      }
      case 'Power3': {
        avgPow3er = average;
        break;
      }
      case 'Power4': {
        avgPow4er = average;
        break;
      }

      case 'Strength1': {
        avgStreng1th = average;
        break;
      }
      case 'Strength2': {
        avgStreng2th = average;
        break;
      }
      case 'Strength3': {
        avgStreng3th = average;
        break;
      }
      case 'Strength4': {
        avgStreng4th = average;
        break;
      }
      default: {
        break;
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
      avgPow1er,
      avgPow2er,
      avgPow3er,
      avgPow4er,
      avgStreng1th,
      avgStreng2th,
      avgStreng3th,
      avgStreng4th
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
      const fileName = 'physical';
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
    Doc.createPdf(html);
  };

  render() {
    const { classes } = this.props;
    const {
      season,
      seasons,
      players,
      player,
      playerInformation,
      language
    } = this.state;
    const func = [
      () => this.saveData(),
      /* () => window.print(), */
      () => this.createPdf()
    ];
    return (
      <div className={classes.root} id="divToPrint" ref={bodyRef}>
        <div className={classes.innerRoot} elevation={1}>
          <Typography variant="h6" color="primary">
            {language === 'Japanese'
              ? 'パワー/ストレングス'
              : 'Power / Strength'}
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
                  players.map(value => (
                    <MenuItem key={value._id} value={value.title}>
                      {value.title}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
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
                <MenuItem _id="none2" value="New">
                  {language === 'Japanese' ? '新規' : 'New'}
                </MenuItem>
                {seasons &&
                  seasons.map(value => (
                    <MenuItem key={value._id} value={value.title}>
                      {value.title}
                    </MenuItem>
                  ))}
              </TextField>
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
          <br />
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
                  noWrap
                  variant="subtitle1"
                  className={classes.headings2}
                  style={{ paddingTop: 18 }}
                >
                  {language === 'Japanese' ? 'パワー' : 'POWER'}
                </Typography>
                {scores.slice(0, 11).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.powerScores[index];
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
                {this.renderTextFieldSec2(0, 11, 'Power1')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('Power1')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2">
                  {this.renderDate('score2Date')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(0, 11, 'Power2')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('Power2')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2">
                  {this.renderDate('score3Date')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(0, 11, 'Power3')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('Power3')}
                </Typography>
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  borderRight: '3px solid rgba(26, 43, 117, 1)',
                  paddingRight: 20
                }}
              >
                <Typography variant="subtitle2">
                  {this.renderDate('score4Date')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(0, 11, 'Power4')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('Power4')}
                </Typography>
              </Grid>

              <Grid item xs container justify="center">
                <Typography
                  noWrap
                  variant="subtitle1"
                  className={classes.headings2}
                  style={{ paddingTop: 18 }}
                >
                  RM
                </Typography>
                {scores.slice(11, 19).map((val, index) => (
                  <div key={index} style={{ width: '100%', margin: 12.5 }}>
                    <Typography
                      style={{ fontSize: 12 }}
                      noWrap
                      variant="subtitle2"
                    >
                      1 RM
                    </Typography>
                  </div>
                ))}
              </Grid>
              <Grid item xs={2} container justify="center">
                <Typography
                  noWrap
                  variant="subtitle1"
                  className={classes.headings2}
                  style={{ paddingTop: 18 }}
                >
                  {language === 'Japanese' ? 'ストレングス' : 'STRENGTH'}
                </Typography>
                {scores.slice(11, 19).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.powerScores[index + 11];
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
                {this.renderTextFieldSec2(11, 19, 'Strength1')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('Strength1')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2">
                  {this.renderDate('score2Date')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(11, 19, 'Strength2')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('Strength2')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2">
                  {this.renderDate('score3Date')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(11, 19, 'Strength3')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('Strength3')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2">
                  {this.renderDate('score4Date')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(11, 19, 'Strength4')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('Strength4')}
                </Typography>
              </Grid>
            </Grid>
            <br />
            <br />
          </div>
          {playerInformation && (
            <div>
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
                  {language === 'Japanese' ? 'パワー評価' : 'Power Evaluation'}
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
                    {this.renderPowerChart('Power1', 'score1Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderPowerChart('Power2', 'score2Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderPowerChart('Power3', 'score3Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderPowerChart('Power4', 'score4Date')}
                  </Grid>
                </Grid>
              </div>
              <br />
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
                  {language === 'Japanese'
                    ? 'ストレングス評価'
                    : 'Strength Evaluation'}
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
                    {this.renderStrengthChart('Strength1', 'score1Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderStrengthChart('Strength2', 'score2Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderStrengthChart('Strength3', 'score3Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderStrengthChart('Strength4', 'score4Date')}
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
