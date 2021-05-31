/* eslint-disable no-useless-concat */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
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
// import TextField from '../constants/TextInput';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
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

let avgTimeSpe1ed;
let avgTimeSpe2ed;
let avgTimeSpe3ed;
let avgTimeSpe4ed;

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
    color: 'darkblue',
    // borderBottom: '3px solid rgb(244, 0, 0)',
    margin: '15px 0px 15px 0px',
    fontSize: 12
  },

  tablePadding: {
    padding: 7,
    borderBottom: '1px solid rgb(215, 226, 244)'
  }
});

const icons = [...fieldsArray.icons];

const scores = [...fieldsArray.speedScores];

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
      playerImage: require('../assets/images/salah.png')
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
          inputProps={{
            style: {
              fontSize: 15
            },
            step: '0.01'
          }}
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
      case 'TimeSpeed1': {
        avgTimeSpe1ed = average;
        break;
      }
      case 'TimeSpeed2': {
        avgTimeSpe2ed = average;
        break;
      }
      case 'TimeSpeed3': {
        avgTimeSpe3ed = average;
        break;
      }
      case 'TimeSpeed4': {
        avgTimeSpe4ed = average;
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
      avgTimeSpe1ed,
      avgTimeSpe2ed,
      avgTimeSpe3ed,
      avgTimeSpe4ed
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

  renderEnduranceChart = (attackNo, scoreDate) => {
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
              ? [...scores]
              : [...fieldsArrayJap.speedScores],
          datasets: [
            {
              label: language === 'Japanese' ? 'スピード' : 'Speed',
              backgroundColor: 'rgba(75,192,192,1)',
              data: [
                playerInformation['60mSprintsecTime' + `${attackNo}`]
                  ? parseInt(
                      playerInformation['60mSprintsecTime' + `${attackNo}`]
                    )
                  : 0,
                playerInformation['50mSprintsecTime' + `${attackNo}`]
                  ? parseInt(
                      playerInformation['50mSprintsecTime' + `${attackNo}`]
                    )
                  : 0,
                playerInformation['40mSprint(each10m)secTime' + `${attackNo}`]
                  ? parseInt(
                      playerInformation[
                        '40mSprint(each10m)secTime' + `${attackNo}`
                      ]
                    )
                  : 0,
                playerInformation['30mSprintsecTime' + `${attackNo}`]
                  ? parseInt(
                      playerInformation['30mSprintsecTime' + `${attackNo}`]
                    )
                  : 0,
                playerInformation['20mSprintsecTime' + `${attackNo}`]
                  ? parseInt(
                      playerInformation['20mSprintsecTime' + `${attackNo}`]
                    )
                  : 0,
                playerInformation['10mSprintsecTime' + `${attackNo}`]
                  ? parseInt(
                      playerInformation['10mSprintsecTime' + `${attackNo}`]
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
            {language === 'Japanese' ? 'スピード' : 'Speed'}
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
                  {language === 'Japanese' ? '距離' : 'Distance'}
                </Typography>
                {scores.slice(0, 6).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.speedScores[index];
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

                <Typography style={{ fontSize: 20 }} noWrap variant="subtitle2">
                  {language === 'Japanese' ? '合計' : 'Total Score'}
                </Typography>
              </Grid>

              <Grid item xs container justify="center">
                <Typography
                  variant="subtitle2"
                  style={{ fontWeight: 'bolder' }}
                  className={classes.headings2}
                >
                  {language === 'Japanese' ? 'タイム' : 'Time'}
                </Typography>
                {this.renderTextFieldSec2(0, 6, 'Time', 'Speed1')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('TimeSpeed1')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  10m
                </Typography>
                {this.renderTextFieldSec2(0, 6, '10m', 'Speed1')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  20m
                </Typography>
                {this.renderTextFieldSec2(0, 6, '20m', 'Speed1')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  30m
                </Typography>
                {this.renderTextFieldSec2(0, 6, '30m', 'Speed1')}
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
                  40m
                </Typography>
                {this.renderTextFieldSec2(0, 6, '40m', 'Speed1')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  variant="subtitle2"
                  style={{ fontWeight: 'bolder' }}
                  className={classes.headings2}
                >
                  {language === 'Japanese' ? 'タイム' : 'Time'}
                </Typography>
                {this.renderTextFieldSec2(0, 6, 'Time', 'Speed2')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('TimeSpeed2')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  10m
                </Typography>
                {this.renderTextFieldSec2(0, 6, '10m', 'Speed2')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  20m
                </Typography>
                {this.renderTextFieldSec2(0, 6, '20m', 'Speed2')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  30m
                </Typography>
                {this.renderTextFieldSec2(0, 6, '30m', 'Speed2')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  40m
                </Typography>
                {this.renderTextFieldSec2(0, 6, '40m', 'Speed2')}
              </Grid>
            </Grid>
          </div>
          <br />
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
                  {language === 'Japanese' ? '距離' : 'Distance'}
                </Typography>
                {scores.slice(0, 6).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.speedScores[index];
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
                <Typography style={{ fontSize: 20 }} noWrap variant="subtitle2">
                  {language === 'Japanese' ? '合計' : 'Total Score'}
                </Typography>
              </Grid>

              <Grid item xs container justify="center">
                <Typography
                  variant="subtitle2"
                  style={{ fontWeight: 'bolder' }}
                  className={classes.headings2}
                >
                  {language === 'Japanese' ? 'タイム' : 'Time'}
                </Typography>
                {this.renderTextFieldSec2(0, 6, 'Time', 'Speed3')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('TimeSpeed3')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  10m
                </Typography>
                {this.renderTextFieldSec2(0, 6, '10m', 'Speed3')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  20m
                </Typography>
                {this.renderTextFieldSec2(0, 6, '20m', 'Speed3')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  30m
                </Typography>
                {this.renderTextFieldSec2(0, 6, '30m', 'Speed3')}
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
                  40m
                </Typography>
                {this.renderTextFieldSec2(0, 6, '40m', 'Speed3')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  variant="subtitle2"
                  style={{ fontWeight: 'bolder' }}
                  className={classes.headings2}
                >
                  {language === 'Japanese' ? 'タイム' : 'Time'}
                </Typography>
                {this.renderTextFieldSec2(0, 6, 'Time', 'Speed4')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('TimeSpeed4')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  10m
                </Typography>
                {this.renderTextFieldSec2(0, 6, '10m', 'Speed4')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  20m
                </Typography>
                {this.renderTextFieldSec2(0, 6, '20m', 'Speed4')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  30m
                </Typography>
                {this.renderTextFieldSec2(0, 6, '30m', 'Speed4')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  40m
                </Typography>
                {this.renderTextFieldSec2(0, 6, '40m', 'Speed4')}
              </Grid>
            </Grid>
          </div>
          <br />
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
                    ? 'スピード評価'
                    : 'Speed Evaluation'}
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
                    {this.renderEnduranceChart('Speed1', 'score1Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderEnduranceChart('Speed2', 'score2Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderEnduranceChart('Speed3', 'score3Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderEnduranceChart('Speed4', 'score4Date')}
                  </Grid>
                </Grid>
              </div>
              <br />
              <br />
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
