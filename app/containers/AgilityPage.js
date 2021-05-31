/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
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

let avgAgility1;
let avgAgility2;
let avgAgility3;
let avgAgility4;

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

  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover'
  },

  headings2: {
    color: 'darkblue',
    // borderBottom: '3px solid rgb(244, 0, 0)',
    margin: '15px 0px 15px 0px'
  },

  input: {
    display: 'none'
  }
});

const icons = [...fieldsArray.icons];

const scores = [...fieldsArray.agilityScores];

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
      openSnack: false
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

  handleSnack(value) {
    this.setState({ openSnack: value });
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
          type="number"
          key={index}
          fullWidth
          id="outlined-email-input"
          // label={title}
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
    const { value } = event.target;

    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [newVal]: value
      }
    }));
  };

  handleImageChange = id => event => {
    const { playerInformation } = this.state;
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = e => {
      playerInformation[id] = reader.result;
      this.setState({
        playerInformation
      });
    };
  };

  renderAttackChart = attackNo => {
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
              ? [...scores]
              : [...fieldsArrayJap.agilityScores],
          datasets: [
            {
              label: language === 'Japanese' ? 'アジリティ' : 'Agility',
              backgroundColor: 'rgba(75,192,192,1)',
              data: [
                playerInformation[`AgilityTestStep50sec${attackNo}`]
                  ? parseInt(
                      playerInformation[`AgilityTestStep50sec${attackNo}`]
                    )
                  : 0,
                playerInformation[`AgilityTestForwardRunsec${attackNo}`]
                  ? parseInt(
                      playerInformation[`AgilityTestForwardRunsec${attackNo}`]
                    )
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
      case 'secAgility1': {
        avgAgility1 = average;
        break;
      }
      case 'secAgility2': {
        avgAgility2 = average;
        break;
      }
      case 'secAgility3': {
        avgAgility3 = average;
        break;
      }
      case 'secAgility4': {
        avgAgility4 = average;
        break;
      }
      default: {
        break;
      }
    }
    return language === 'Japanese' ? `平均 ${average}` : `Avg. ${average}`;
  };

  saveData = () => {
    let { playerInformation, playerInfo } = this.state;

    playerInformation = {
      ...playerInformation,
      avgAgility1,
      avgAgility2,
      avgAgility3,
      avgAgility4
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
            {language === 'Japanese' ? 'アジリティ' : 'Agility'}
          </Typography>
          <br />
          <Toolbar>
            <div className={classes.grow}>
              <TextField
                style={{ width: 230 }} // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? '選手' : 'Player'}
                className={classes.textField}
                value={player}
                onChange={this.handlePlayerChange('player')}
                SelectProps={{ MenuProps: { className: classes.menu } }}
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
                style={{ width: 150 }} // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? 'シーズン' : 'Season'}
                className={classes.textField}
                value={season}
                onChange={this.handleSeasonChange('season')}
                SelectProps={{ MenuProps: { className: classes.menu } }}
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
              <ButtonBase disableRipple
                // focusRipple
                // centerRipple
                key={val.title}
                style={{ margin: 5 }}
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

          <div style={{ margin: 20 }}>
            <Grid
              spacing={24}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs container justify="flex-start">
                <Typography noWrap variant="h6">
                  {language === 'English'
                    ? 'Agility Test Step 50/sec'
                    : 'アジリティテストステップ50 /秒'}
                </Typography>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="AgilityStep"
                  multiple
                  type="file"
                  onChange={this.handleImageChange('imageAgilityStep')}
                />
                <label htmlFor="AgilityStep">
                  <ButtonBase
                    component="span"
                    focusRipple
                    className={classes.image}
                    style={{ width: '100%' }}
                  >
                    <img
                      src={
                        playerInformation.imageAgilityStep
                          ? playerInformation.imageAgilityStep
                          : require('../assets/images/step.png')
                      }
                      alt="Add Player"
                      style={{ height: '100%', width: '100%' }}
                      className={classes.media}
                    />
                  </ButtonBase>
                </label>
              </Grid>
              <Grid item xs container justify="flex-start">
                <Typography noWrap variant="h6">
                  {language === 'English'
                    ? 'Agility Test Forward Run/sec'
                    : 'アジリティテストフォワードラン/秒'}
                </Typography>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="AgilityForward"
                  multiple
                  type="file"
                  onChange={this.handleImageChange('imageAgilityForward')}
                />
                <label htmlFor="AgilityForward">
                  <ButtonBase
                    component="span"
                    focusRipple
                    className={classes.image}
                    style={{ width: '100%' }}
                  >
                    <img
                      src={
                        playerInformation.imageAgilityForward
                          ? playerInformation.imageAgilityForward
                          : require('../assets/images/forward.png')
                      }
                      alt="Add Player"
                      style={{ height: '100%', width: '100%' }}
                      className={classes.media}
                    />
                  </ButtonBase>
                </label>
              </Grid>
            </Grid>
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
              <Grid item xs={3} container justify="center">
                <Typography
                  noWrap
                  variant="subtitle1"
                  className={classes.headings2}
                  style={{ paddingTop: 18 }}
                >
                  {language === 'Japanese' ? 'アジリティ測定' : 'AGILITY TEST'}
                </Typography>
                {scores.slice(0, 2).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.agilityScores[index];
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
                  align="center"
                  style={{ width: '100%' }}
                  variant="subtitle2"
                >
                  {this.renderDate('score1Date')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? 'タイム/秒' : 'Time/sec'}
                </Typography>
                {this.renderTextFieldSec2(0, 2, 'Agility1')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('secAgility1')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  align="center"
                  style={{ width: '100%' }}
                  variant="subtitle2"
                >
                  {this.renderDate('score2Date')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? 'タイム/秒' : 'Time/sec'}
                </Typography>
                {this.renderTextFieldSec2(0, 2, 'Agility2')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('secAgility2')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  style={{ width: '100%' }}
                  align="center"
                  variant="subtitle2"
                >
                  {this.renderDate('score3Date')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? 'タイム/秒' : 'Time/sec'}
                </Typography>
                {this.renderTextFieldSec2(0, 2, 'Agility3')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('secAgility3')}
                </Typography>
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  align="center"
                  style={{ width: '100%' }}
                  variant="subtitle2"
                >
                  {this.renderDate('score4Date')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? 'タイム/秒' : 'Time/sec'}
                </Typography>
                {this.renderTextFieldSec2(0, 2, 'Agility4')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('secAgility4')}
                </Typography>
              </Grid>
            </Grid>
          </div>
          <br />
          <br />
          {/* <TacticalSec2 {...this.props} /> */}
          {/* <TacticalSec2 {...this.props} /> */}
          {/* <TacticalSec2 {...this.props} /> */}
          {/* <TacticalSec2 {...this.props} /> */}
          {/* <TacticalSec2 {...this.props} /> */}
          {playerInformation && (
            <div>
              <div style={{ backgroundColor: 'blue' }}>
                <Typography
                  style={{ color: 'white' }} // noWrap
                  align="center"
                  variant="subtitle1"
                >
                  {language === 'Japanese'
                    ? 'アジリティ評価'
                    : 'Agility Evaluation'}
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
                    {this.renderAttackChart('Agility1', 'score1Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderAttackChart('Agility2', 'score2Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderAttackChart('Agility3', 'score3Date')}
                  </Grid>
                  <Grid item xs={6} container justify="center">
                    {this.renderAttackChart('Agility4', 'score4Date')}
                  </Grid>
                </Grid>
              </div>
            </div>
          )}
        </div>
        <SnackBar
          handleSnack={value => this.handleSnack(value)}
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
