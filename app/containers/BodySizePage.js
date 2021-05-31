/* eslint-disable no-underscore-dangle */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
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
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import TextFieldNew from '../constants/TextInput';
import {
  getPlayers,
  selectPlayer,
  selectSeason
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

  headings: {
    borderBottom: '3px solid rgb(244, 0, 0)',
    margin: '15px 0px 15px 0px'
  },

  headings2: {
    color: 'red',
    // borderBottom: '3px solid rgb(244, 0, 0)',
    margin: '15px 0px 15px 0px'
  }
});

const icons = [...fieldsArray.icons];

const physical = [...fieldsArray.bodySizePhysical];

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
            // disabled
            // variant="outlined"
            // label="Date"
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

  renderTextFieldSec2 = (from, to, test) => {
    const { classes } = this.props;
    const { playerInformation } = this.state;
    return physical.slice(from, to).map((title, index) => {
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
          inputProps={{
            style: {
              fontSize: 15
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

  renderAttackChart = (attackNo, scoreDate) => {
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
              ? [...physical]
              : [...fieldsArrayJap.bodySizePhysical],
          datasets: [
            {
              label: language === 'Japanese' ? '身体のサイズ' : 'Body Size',
              backgroundColor: 'rgba(75,192,192,1)',
              data: [
                playerInformation[`Shouldercm${attackNo}`]
                  ? parseInt(playerInformation[`Shouldercm${attackNo}`])
                  : 0,
                playerInformation[`Breastcm${attackNo}`]
                  ? parseInt(playerInformation[`Breastcm${attackNo}`])
                  : 0,
                playerInformation[`Armcm${attackNo}`]
                  ? parseInt(playerInformation[`Armcm${attackNo}`])
                  : 0,
                playerInformation[`Waistcm${attackNo}`]
                  ? parseInt(playerInformation[`Waistcm${attackNo}`])
                  : 0,
                playerInformation[`Buttockscm${attackNo}`]
                  ? parseInt(playerInformation[`Buttockscm${attackNo}`])
                  : 0,
                playerInformation[`Hamstringcm${attackNo}`]
                  ? parseInt(playerInformation[`Hamstringcm${attackNo}`])
                  : 0,
                playerInformation[`Calfcm${attackNo}`]
                  ? parseInt(playerInformation[`Calfcm${attackNo}`])
                  : 0,
                playerInformation[`Anklecm${attackNo}`]
                  ? parseInt(playerInformation[`Anklecm${attackNo}`])
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
    const { season, seasons, players, player, language } = this.state;
    const func = [
      () => this.saveData(),
      /* () => window.print(), */
      () => this.createPdf()
    ];
    return (
      <div className={classes.root} id="divToPrint" ref={bodyRef}>
        <div className={classes.innerRoot} elevation={1}>
          <Typography variant="h6" color="primary">
            {language === 'Japanese' ? '身体のサイズ' : 'Body Size'}
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
                  {language === 'Japanese' ? '身体のサイズ' : 'Body'}
                </Typography>
                {physical.slice(0, 8).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.bodySizePhysical[index];
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
              </Grid>

              <Grid item xs container justify="center">
                <Typography variant="subtitle2">
                  {this.renderDatePicker('score1Date', 'available')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(0, 8, 'Physical1')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2">
                  {this.renderDatePicker('score2Date', 'available')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(0, 8, 'Physical2')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2">
                  {this.renderDatePicker('score3Date', 'available')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(0, 8, 'Physical3')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2">
                  {this.renderDatePicker('score4Date', 'available')}
                </Typography>
                <Typography variant="subtitle1" className={classes.headings2}>
                  {language === 'Japanese' ? '評価' : 'Score'}
                </Typography>
                {this.renderTextFieldSec2(0, 8, 'Physical4')}
              </Grid>
            </Grid>
            <br />
            <br />
          </div>

          {/* <TacticalSec2 {...this.props} /> */}
          {/* <TacticalSec2 {...this.props} /> */}
          {/* <TacticalSec2 {...this.props} /> */}
          {/* <TacticalSec2 {...this.props} /> */}
          <div>
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item xs={6} container justify="center">
                {this.renderAttackChart('Physical1', 'score1Date')}
              </Grid>
              <Grid item xs={6} container justify="center">
                {this.renderAttackChart('Physical2', 'score2Date')}
              </Grid>
              <Grid item xs={6} container justify="center">
                {this.renderAttackChart('Physical3', 'score3Date')}
              </Grid>
              <Grid item xs={6} container justify="center">
                {this.renderAttackChart('Physical4', 'score4Date')}
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
