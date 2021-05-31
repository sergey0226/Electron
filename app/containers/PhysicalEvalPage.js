/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable global-require */
// @flow
import React, { Component } from 'react';

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
  selectCategory,
  selectSeason,
  getPlayers
} from '../actions/physicalActions';

import SnackBar from '../components/SnackBar/SnackBar';
import Doc from '../constants/DocService';

// import * as arrays from '../constants/dropDowns';
// import * as arraysJap from '../constants/dropDownsJap';
import * as fieldsArray from '../constants/textFields';
import * as fieldsArrayJap from '../constants/textFieldsJap';

const bodyRef = React.createRef();

const dummyObject = {
  power: {
    power1: [],
    power2: [],
    power3: [],
    power4: []
  },
  strength: {
    strength1: [],
    strength2: [],
    strength3: [],
    strength4: []
  },
  endurance: {
    endurance1: [],
    endurance2: [],
    endurance3: [],
    endurance4: []
  },
  speed: {
    speed1: [],
    speed2: [],
    speed3: [],
    speed4: []
  },
  agility: {
    agility1: [],
    agility2: [],
    agility3: [],
    agility4: []
  }
};

let avgEvaScore1Eval;
let avgEvaScore2Eval;
let avgEvaScore3Eval;
let avgEvaScore4Eval;

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
    flexDirection:"row",
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

const physical = [...fieldsArray.physicalEval];
let Categories = ['Select'];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: 'Select',
      players: [],
      category: 'Select',
      season: 'Select',
      seasons: [],

      language: 'English',
      playersData: dummyObject,
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
    Categories = nextProps.categories;
    this.setState({
      players: nextProps.players,
      seasons: nextProps.seasons,
      playerInformation: nextProps.playerInformation,
      playersData: nextProps.playersData,
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
    const {
      playerInformation,
      playerObject,
      category,
      playerInfo
    } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const playerObjKey = playerObject.value.key;
    const seasonObject = {
      event,
      value,
      category,
      playerInformation
    };

    this.props.selectSeason(playerObjKey, playerInfo, seasonObject);
    this.setState({
      [newVal]: event.target.value
    });
  };

  handleCategoryChange = name => (event, value) => {
    const { playerInformation, seasons, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      seasons,
      playerInformation
    };

    this.props.selectCategory(object, playerInfo);
    this.setState({
      [newVal]: event.target.value,
      season: 'Select'
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
      category: 'Select',
      season: 'Select'
    });
  };

  renderTextField = (from, to) => {
    const { classes } = this.props;
    const { playerInformation } = this.state;
    return physical.slice(from, to).map((val, index) => {
      const newId = val.id;
      const newVal = newId.replace(/[./" "]/g, '');
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
          className={classes.textField}
          name={val.title}
          placeholder="0"
          value={Number(value).toFixed(2)}
          margin="dense"
          variant="outlined"
          inputProps={{
            readOnly: true,
            style: {
              fontSize: 15,
              padding: 10
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

  renderTextField2 = (from, to, fieldOf, num, scoreOf) => {
    const { classes } = this.props;
    const { playerInformation, playersData } = this.state;

    const arr = playersData[fieldOf][fieldOf + num];
    let value = 0;

    switch (scoreOf) {
      case 'min': {
        value = Math.min(...arr);
        break;
      }
      case 'max': {
        value = Math.max(...arr);
        break;
      }
      case 'avg': {
        arr.map(val => {
          value += Number(val);
        });
        value /= arr.length;

        break;
      }
      default: {
        break;
      }
    }

    if (value == -Infinity || value == Infinity || isNaN(value) == true) {
      value = 0;
    }

    return (
      <TextField
        style={{
          height: 35
        }}
        fullWidth
        id="outlined-email-input"
        className={classes.textField}
        placeholder="0"
        value={Number(value).toFixed(2)}
        margin="dense"
        variant="outlined"
        InputProps={{
          readOnly: true
        }}
        inputProps={{
          style: {
            fontSize: 15,
            padding: 10
          }
        }}
        InputLabelProps={{
          style: {
            fontSize: 14
          }
        }}
      />
    );
  };

  renderTextFieldSec2 = (from, to, columnOf, test) => {
    const { classes } = this.props;
    const { playerInformation } = this.state;
    return physical.slice(from, to).map((val, index) => {
      const newTitle = val.title + columnOf + test;
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
          className={classes.textField}
          name={val.title}
          placeholder="0"
          value={`${value}`}
          onChange={this.handleFieldChange2(newVal)}
          margin="dense"
          variant="outlined"
          inputProps={{
            style: {
              fontSize: 15,
              padding: 10
            }
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

  renderAverge = averageOf => {
    const { playerInformation, language } = this.state;

    let totalKeys = 0;
    let sum = 0;
    for (const key in playerInformation) {
      if (key.includes(averageOf) && playerInformation[key] != 0) {
        totalKeys += 1;
        sum += parseFloat(playerInformation[key]);
      }
    }

    let average = sum / totalKeys;

    if (isNaN(average)) {
      return language === 'Japanese' ? `平均 ${0}` : `Avg. ${0}`;
    }

    average = Number(average).toFixed(2);

    switch (averageOf) {
      case 'EvaScoreEval1': {
        avgEvaScore1Eval = average;
        break;
      }
      case 'EvaScoreEval2': {
        avgEvaScore2Eval = average;
        break;
      }
      case 'EvaScoreEval3': {
        avgEvaScore3Eval = average;
        break;
      }
      case 'EvaScoreEval4': {
        avgEvaScore4Eval = average;
        break;
      }
      default: {
        break;
      }
    }

    return language === 'Japanese' ? `平均 ${average}` : `Avg. ${average}`;
  };

  saveData = () => {
    let { playerInformation, players, playerInfo } = this.state;

    playerInformation = {
      ...playerInformation,
      avgEvaScore1Eval,
      avgEvaScore2Eval,
      avgEvaScore3Eval,
      avgEvaScore4Eval
    };
    if (playerInformation.second_id) {
      playerInfo.update(
        { _id: playerInformation._id },
        playerInformation,
        {},
        (err, numReplaced) => {
          this.setState({
            playerInformation: {},
            player: 'Select',
            category: 'Select',
            season: 'Select',
            openSnack: true
          });

          this.props.selectPlayer(
            { event: { target: { value: 'Select' } } },
            playerInfo
          );
        }
      );
    }
  };

  createPdf = () => {
    const html = bodyRef.current;
    Doc.createPdf(html,true);
  };

  render() {
    const { classes } = this.props;
    const { season, seasons, category, players, player, language } = this.state;
    const func = [
      () => this.saveData(),
   // () => window.print(),
      () => this.createPdf()
    ];
    return (
      <div className={classes.root} id="divToPrint" ref={bodyRef}>
        <div className={classes.innerRoot} elevation={1}>
          <Typography variant="h6" color="primary">
            {language === 'Japanese' ? 'フィジカル' : 'Physical'}
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
                label={language === 'Japanese' ? 'カテゴリー' : 'Category'}
                className={classes.textField}
                value={category}
                onChange={this.handleCategoryChange('category')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="dense"
                variant="outlined"
              >
                <MenuItem value="Select">
                  {language === 'Japanese' ? '選択' : 'Select'}
                </MenuItem>
                {Categories &&
                  Categories.map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
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
                <MenuItem _id="none2" value="New">
                  {language === 'Japanese' ? '新規' : 'New'}
                </MenuItem>
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
                    ? 'フィジカル評価'
                    : 'Physical Evaluation'}
                </Typography>
                {physical.slice(0, 5).map((val, index) => {
                  const label =
                    language === 'English'
                      ? val.title
                      : fieldsArrayJap.physicalEval[index].title;
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
                  {language === 'Japanese' ? '総合評価' : 'General'}
                </Typography>
                {this.renderTextField(0, 5)}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'チーム最低' : 'Team worst'}
                </Typography>
                {this.renderTextField2(0, 1, 'power', 1, 'min')}
                {this.renderTextField2(0, 1, 'strength', 1, 'min')}
                {this.renderTextField2(0, 1, 'endurance', 1, 'max')}
                {this.renderTextField2(0, 1, 'speed', 1, 'max')}
                {this.renderTextField2(0, 1, 'agility', 1, 'max')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'チーム平均' : 'Team Avg'}
                </Typography>
                {this.renderTextField2(0, 1, 'power', 1, 'avg')}
                {this.renderTextField2(0, 1, 'strength', 1, 'avg')}
                {this.renderTextField2(0, 1, 'endurance', 1, 'avg')}
                {this.renderTextField2(0, 1, 'speed', 1, 'avg')}
                {this.renderTextField2(0, 1, 'agility', 1, 'avg')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'チーム最高' : 'Team Best'}
                </Typography>
                {this.renderTextField2(0, 1, 'power', 1, 'max')}
                {this.renderTextField2(0, 1, 'strength', 1, 'max')}
                {this.renderTextField2(0, 1, 'endurance', 1, 'min')}
                {this.renderTextField2(0, 1, 'speed', 1, 'min')}
                {this.renderTextField2(0, 1, 'agility', 1, 'min')}
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
                  {language === 'Japanese' ? '評点' : 'Eva Score'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'Eva Score', 'Eval1')}
                <Typography variant="subtitle2" color="secondary">
                  {this.renderAverge('EvaScoreEval1')}
                </Typography>
              </Grid>

              {/* ////////////////////////// */}

              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? '総合評価' : 'General'}
                </Typography>
                {this.renderTextField(5, 10)}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'チーム最低' : 'Team worst'}
                </Typography>
                {this.renderTextField2(0, 1, 'power', 2, 'min')}
                {this.renderTextField2(0, 1, 'strength', 2, 'min')}
                {this.renderTextField2(0, 1, 'endurance', 2, 'max')}
                {this.renderTextField2(0, 1, 'speed', 2, 'max')}
                {this.renderTextField2(0, 1, 'agility', 2, 'max')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'チーム平均' : 'Team Avg'}
                </Typography>
                {this.renderTextField2(0, 1, 'power', 2, 'avg')}
                {this.renderTextField2(0, 1, 'strength', 2, 'avg')}
                {this.renderTextField2(0, 1, 'endurance', 2, 'avg')}
                {this.renderTextField2(0, 1, 'speed', 2, 'avg')}
                {this.renderTextField2(0, 1, 'agility', 2, 'avg')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'チーム最高' : 'Team Best'}
                </Typography>
                {this.renderTextField2(0, 1, 'power', 2, 'max')}
                {this.renderTextField2(0, 1, 'strength', 2, 'max')}
                {this.renderTextField2(0, 1, 'endurance', 2, 'min')}
                {this.renderTextField2(0, 1, 'speed', 2, 'min')}
                {this.renderTextField2(0, 1, 'agility', 2, 'min')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? '評点' : 'Eva Score'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'Eva Score', 'Eval2')}
                <Typography variant="subtitle2" color="secondary">
                  {this.renderAverge('EvaScoreEval2')}
                </Typography>
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
                    ? 'フィジカル評価'
                    : 'Physical Evaluation'}
                </Typography>
                {physical.slice(0, 5).map((val, index) => {
                  const label =
                    language === 'English'
                      ? val.title
                      : fieldsArrayJap.physicalEval[index].title;
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
                  {language === 'Japanese' ? '総合評価' : 'General'}
                </Typography>
                {this.renderTextField(10, 15)}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'チーム最低' : 'Team worst'}
                </Typography>
                {this.renderTextField2(0, 1, 'power', 3, 'min')}
                {this.renderTextField2(0, 1, 'strength', 3, 'min')}
                {this.renderTextField2(0, 1, 'endurance', 3, 'max')}
                {this.renderTextField2(0, 1, 'speed', 3, 'max')}
                {this.renderTextField2(0, 1, 'agility', 3, 'max')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'チーム平均' : 'Team Avg'}
                </Typography>
                {this.renderTextField2(0, 1, 'power', 3, 'avg')}
                {this.renderTextField2(0, 1, 'strength', 3, 'avg')}
                {this.renderTextField2(0, 1, 'endurance', 3, 'avg')}
                {this.renderTextField2(0, 1, 'speed', 3, 'avg')}
                {this.renderTextField2(0, 1, 'agility', 3, 'avg')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'チーム最高' : 'Team Best'}
                </Typography>
                {this.renderTextField2(0, 1, 'power', 3, 'max')}
                {this.renderTextField2(0, 1, 'strength', 3, 'max')}
                {this.renderTextField2(0, 1, 'endurance', 3, 'min')}
                {this.renderTextField2(0, 1, 'speed', 3, 'min')}
                {this.renderTextField2(0, 1, 'agility', 3, 'min')}
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
                  {language === 'Japanese' ? '評点' : 'Eva Score'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'Eva Score', 'Eval3')}
                <Typography variant="subtitle2" color="secondary">
                  {this.renderAverge('EvaScoreEval3')}
                </Typography>
              </Grid>

              {/* ////////////////////////// */}

              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? '総合評価' : 'General'}
                </Typography>
                {this.renderTextField(15, 20)}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'チーム最低' : 'Team worst'}
                </Typography>
                {this.renderTextField2(0, 1, 'power', 4, 'min')}
                {this.renderTextField2(0, 1, 'strength', 4, 'min')}
                {this.renderTextField2(0, 1, 'endurance', 4, 'max')}
                {this.renderTextField2(0, 1, 'speed', 4, 'max')}
                {this.renderTextField2(0, 1, 'agility', 4, 'max')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'チーム平均' : 'Team Avg'}
                </Typography>
                {this.renderTextField2(0, 1, 'power', 4, 'avg')}
                {this.renderTextField2(0, 1, 'strength', 4, 'avg')}
                {this.renderTextField2(0, 1, 'endurance', 4, 'avg')}
                {this.renderTextField2(0, 1, 'speed', 4, 'avg')}
                {this.renderTextField2(0, 1, 'agility', 4, 'avg')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? 'チーム最高' : 'Team Best'}
                </Typography>
                {this.renderTextField2(0, 1, 'power', 4, 'max')}
                {this.renderTextField2(0, 1, 'strength', 4, 'max')}
                {this.renderTextField2(0, 1, 'endurance', 4, 'min')}
                {this.renderTextField2(0, 1, 'speed', 4, 'min')}
                {this.renderTextField2(0, 1, 'agility', 4, 'min')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? '評点' : 'Eva Score'}
                </Typography>
                {this.renderTextFieldSec2(0, 5, 'Eva Score', 'Eval4')}
                <Typography variant="subtitle2" color="secondary">
                  {this.renderAverge('EvaScoreEval4')}
                </Typography>
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
    players: state.physicalReducer.players,
    seasons: state.physicalReducer.seasons || [],
    playerInformation: state.physicalReducer.playerInformation || {},
    playersData: state.physicalReducer.playersData || dummyObject,
    categories: state.physicalReducer.category || [],
    language: state.dropDownReducer.language || 'English'
  });

const mapDispatchToProps = dispatch => ({
  selectSeason: (playerObject, playerInfo, seasonObject) =>
    dispatch(selectSeason(playerObject, playerInfo, seasonObject)),
  selectCategory: (object, playerInfo) =>
    dispatch(selectCategory(object, playerInfo)),
  selectPlayer: (object, playerInfo) =>
    dispatch(selectPlayer(object, playerInfo)),
  getPlayers: playerInfo => dispatch(getPlayers(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
