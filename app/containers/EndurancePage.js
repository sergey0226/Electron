/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable radix */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
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

  textField: {
    marginLeft: 3,
    marginRight: 3,
    marginTop: 2,
    marginBottom: 6
  },
  menu: {
    width: 150
  },

  headings2: {
    color: 'darkblue',
    // borderBottom: '3px solid rgb(244, 0, 0)',
    margin: '15px 0px 15px 0px',
    fontSize: 12
  }
});

const icons = [...fieldsArray.icons];

const scores = [...fieldsArray.enduranceScores];

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

  renderTextFieldSec2 = (from, to, columnOf, test) => {
    const { classes } = this.props;
    const { playerInformation } = this.state;
    return scores.slice(from, to).map((title, index) => {
      const newTitle = title + columnOf + test;
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
    const value = event.target.value;

    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [newVal]: value
      }
    }));
  };

  saveData = () => {
    let { playerInformation, players, playerInfo } = this.state;

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
      const fileName = 'mental';
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

  renderEnduranceChart = (attackNo, scoreDate) => {
    const { playerInformation, language } = this.state;
    return (
      <Bar
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
              ? [...scores]
              : [...fieldsArrayJap.enduranceScores],
          datasets: [
            {
              label: language === 'Japanese' ? '距離' : 'DISTANCE',
              backgroundColor: 'rgba(75,192,192,1)',
              data: [
                playerInformation[`Cooper12minrunDistancem${attackNo}`]
                  ? parseInt(
                      playerInformation[`Cooper12minrunDistancem${attackNo}`]
                    )
                  : 0,
                playerInformation[`WMA4515Distancem${attackNo}`]
                  ? parseInt(playerInformation[`WMA4515Distancem${attackNo}`])
                  : 0,
                playerInformation[`1600MProtocolDistancem${attackNo}`]
                  ? parseInt(
                      playerInformation[`1600MProtocolDistancem${attackNo}`]
                    )
                  : 0,
                playerInformation[`YoYo(Endurance&IntRec)Distancem${attackNo}`]
                  ? parseInt(
                      playerInformation[
                        `YoYo(Endurance&IntRec)Distancem${attackNo}`
                      ]
                    )
                  : 0,
                playerInformation[
                  `ShuttleTempoTest(Anaerobic)Distancem${attackNo}`
                ]
                  ? parseInt(
                      playerInformation[
                        `ShuttleTempoTest(Anaerobic)Distancem${attackNo}`
                      ]
                    )
                  : 0
              ]
            },
            {
              label: language === 'Japanese' ? 'スピード km/時' : 'Speed km/h',
              backgroundColor: 'rgba(75,192,192,1)',
              data: [
                playerInformation[`Cooper12minrunSpeedkmh${attackNo}`]
                  ? parseInt(
                      playerInformation[`Cooper12minrunSpeedkmh${attackNo}`]
                    )
                  : 0,
                playerInformation[`WMA4515Speedkmh${attackNo}`]
                  ? parseInt(playerInformation[`WMA4515Speedkmh${attackNo}`])
                  : 0,
                playerInformation[`1600MProtocolSpeedkmh${attackNo}`]
                  ? parseInt(
                      playerInformation[`1600MProtocolSpeedkmh${attackNo}`]
                    )
                  : 0,
                playerInformation[`YoYo(Endurance&IntRec)Speedkmh${attackNo}`]
                  ? parseInt(
                      playerInformation[
                        `YoYo(Endurance&IntRec)Speedkmh${attackNo}`
                      ]
                    )
                  : 0,
                playerInformation[
                  `ShuttleTempoTest(Anaerobic)Speedkmh${attackNo}`
                ]
                  ? parseInt(
                      playerInformation[
                        `ShuttleTempoTest(Anaerobic)Speedkmh${attackNo}`
                      ]
                    )
                  : 0
              ]
            },
            {
              label: language === 'Japanese' ? 'VO2 max l/分' : 'VO2 max l/min',
              backgroundColor: 'rgba(75,192,192,1)',
              data: [
                playerInformation[`Cooper12minrunVO2maxImin${attackNo}`]
                  ? parseInt(
                      playerInformation[`Cooper12minrunVO2maxImin${attackNo}`]
                    )
                  : 0,
                playerInformation[`WMA4515VO2maxImin${attackNo}`]
                  ? parseInt(playerInformation[`WMA4515VO2maxImin${attackNo}`])
                  : 0,
                playerInformation[`1600MProtocolVO2maxImin${attackNo}`]
                  ? parseInt(
                      playerInformation[`1600MProtocolVO2maxImin${attackNo}`]
                    )
                  : 0,
                playerInformation[`YoYo(Endurance&IntRec)VO2maxImin${attackNo}`]
                  ? parseInt(
                      playerInformation[
                        `YoYo(Endurance&IntRec)VO2maxImin${attackNo}`
                      ]
                    )
                  : 0,
                playerInformation[
                  `ShuttleTempoTest(Anaerobic)VO2maxImin${attackNo}`
                ]
                  ? parseInt(
                      playerInformation[
                        `ShuttleTempoTest(Anaerobic)VO2maxImin${attackNo}`
                      ]
                    )
                  : 0
              ]
            },
            {
              label: language === 'Japanese' ? 'タイム/分' : 'Time/min',
              backgroundColor: 'rgba(75,192,192,1)',
              data: [
                playerInformation[`Cooper12minrunTimemin${attackNo}`]
                  ? parseInt(
                      playerInformation[`Cooper12minrunTimemin${attackNo}`]
                    )
                  : 0,
                playerInformation[`WMA4515Timemin${attackNo}`]
                  ? parseInt(playerInformation[`WMA4515Timemin${attackNo}`])
                  : 0,
                playerInformation[`1600MProtocolTimemin${attackNo}`]
                  ? parseInt(
                      playerInformation[`1600MProtocolTimemin${attackNo}`]
                    )
                  : 0,
                playerInformation[`YoYo(Endurance&IntRec)Timemin${attackNo}`]
                  ? parseInt(
                      playerInformation[
                        `YoYo(Endurance&IntRec)Timemin${attackNo}`
                      ]
                    )
                  : 0,
                playerInformation[
                  `ShuttleTempoTest(Anaerobic)Timemin${attackNo}`
                ]
                  ? parseInt(
                      playerInformation[
                        `ShuttleTempoTest(Anaerobic)Timemin${attackNo}`
                      ]
                    )
                  : 0
              ]
            }
          ]
        }}
      />
    );
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
            {language === 'Japanese' ? '持久力' : 'Endurance'}
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
          <div>
            <Grid container direction="row" justify="center">
              <Grid
                item
                xs
                container
                justify="flex-start"
                style={{
                  borderRight: '3px solid rgba(26, 43, 117, 1)',
                  paddingRight: '0.7%',
                  marginLeft: '17%'
                }}
              >
                <Typography variant="subtitle2">
                  {this.renderDate('score1Date')}
                </Typography>
              </Grid>

              <Grid
                item
                xs
                container
                justify="flex-start"
                style={{ marginLeft: '1%' }}
              >
                <Typography variant="subtitle2">
                  {this.renderDate('score2Date')}
                </Typography>
              </Grid>
            </Grid>

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
                  style={{ fontSize: 14 }}
                >
                  {language === 'Japanese'
                    ? '持久力(有酸素運動)'
                    : 'Endurance(AEROBIC)'}
                </Typography>
                {scores.slice(0, 5).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.enduranceScores[index];
                  return (
                    <div key={index} style={{ width: '100%', margin: 11.5 }}>
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
              </Grid>

              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? '距離/m' : 'Distance/m'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'Distance/m', 'Endurance1')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'スピード km/時' : 'Speed km/h'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'Speed km/h', 'Endurance1')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'VO2 max l/分' : 'VO2 max I/min'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'VO2 max I/min', 'Endurance1')}
              </Grid>
              {/* <Grid item xs container justify="center"> */}
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  borderRight: '3px solid rgba(26, 43, 117, 1)',
                  paddingRight: 5,
                  marginRight: 5
                }}
              >
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'タイム/分' : 'Time/min'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'Time/min', 'Endurance1')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? '距離/m' : 'Distance/m'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'Distance/m', 'Endurance2')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'スピード km/時' : 'Speed km/h'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'Speed km/h', 'Endurance2')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'VO2 max l/分' : 'VO2 max I/min'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'VO2 max I/min', 'Endurance2')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'タイム/分' : 'Time/min'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'Time/min', 'Endurance2')}
              </Grid>
            </Grid>
          </div>

          <br />

          <div>
            <Grid container direction="row" justify="center">
              <Grid
                item
                xs
                container
                justify="flex-start"
                style={{
                  borderRight: '3px solid rgba(26, 43, 117, 1)',
                  paddingRight: '0.7%',
                  marginLeft: '17%'
                }}
              >
                <Typography variant="subtitle2">
                  {this.renderDate('score3Date')}
                </Typography>
              </Grid>

              <Grid
                item
                xs
                container
                justify="flex-start"
                style={{ marginLeft: '1%' }}
              >
                <Typography variant="subtitle2">
                  {this.renderDate('score4Date')}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={0}
              // style={{ backgroundColor: 'yellow' }}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs={2}
                container
                justify="center"
                // alignItems="center"
              >
                <Typography
                  noWrap
                  variant="subtitle1"
                  className={classes.headings2}
                  style={{ fontSize: 14 }}
                >
                  {language === 'Japanese'
                    ? '持久力(有酸素運動)'
                    : 'Endurance(AEROBIC)'}
                </Typography>
                {scores.slice(0, 5).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.enduranceScores[index];
                  return (
                    <div key={index} style={{ width: '100%', margin: 11.5 }}>
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
              </Grid>

              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? '距離/m' : 'Distance/m'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'Distance/m', 'Endurance3')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'スピード km/時' : 'Speed km/h'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'Speed km/h', 'Endurance3')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'VO2 max l/分' : 'VO2 max I/min'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'VO2 max I/min', 'Endurance3')}
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  borderRight: '3px solid rgba(26, 43, 117, 1)',
                  paddingRight: 5,
                  marginRight: 5
                }}
              >
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'タイム/分' : 'Time/min'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'Time/min', 'Endurance3')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? '距離/m' : 'Distance/m'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'Distance/m', 'Endurance4')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'スピード km/時' : 'Speed km/h'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'Speed km/h', 'Endurance4')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'VO2 max l/分' : 'VO2 max I/min'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'VO2 max I/min', 'Endurance4')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'タイム/分' : 'Time/min'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'Time/min', 'Endurance4')}
              </Grid>
            </Grid>
          </div>

          <br />

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
                  {language === 'Japanese'
                    ? '持久力評価'
                    : 'Endurance Evaluation'}
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
                    {this.renderEnduranceChart('Endurance1', 'score1Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderEnduranceChart('Endurance2', 'score2Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderEnduranceChart('Endurance3', 'score3Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderEnduranceChart('Endurance4', 'score4Date')}
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
