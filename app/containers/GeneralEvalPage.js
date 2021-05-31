/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable global-require */
// @flow
import React, { Component } from 'react';

import { Radar } from 'react-chartjs-2';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextFieldMaterial from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { connect } from 'react-redux';
import InlineDatePicker from '../constants/InlineDatePicker';
import TextField from '../constants/TextInput';
import {
  selectPlayer,
  selectSeason,
  getPlayers
} from '../actions/evaluationActions';

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
    display:'flex',
    flexDirection:"row",
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
  card: {
    // maxWidth: 345
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'contain'
  },
  headings: {
    borderBottom: '3px solid rgb(244, 0, 0)',
    margin: '15px 0px 15px 0px'
  },

  input: {
    display: 'none'
  }
});

const icons = [...fieldsArray.icons2];

const fields = [...fieldsArray.generalEvalFields];
const scores = [...fieldsArray.generalEvalScores];

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
      playerImage: {},
      dummyplayerImage: require('../assets/images/showimage.jpg'),
      tacticalData: {},
      technicalData: {},
      mentalData: {},
      physicalData: {},
      gameReportData: {}
    };
  }

  componentWillMount() {
    const { playerInfo } = this.props;
    console.log(playerInfo);
    this.setState({
      playerInfo
    });
    this.props.getPlayers(playerInfo);
  }

  componentWillReceiveProps(nextProps) {
   
    this.setState({
      players: nextProps.players,
      seasons: nextProps.seasons,
      tacticalData: nextProps.playerInformation.tacticalData || {},
      technicalData: nextProps.playerInformation.technicalData || {},
      mentalData: nextProps.playerInformation.mentalData || {},
      physicalData: nextProps.playerInformation.physicalData || {},
      gameReportData: nextProps.playerInformation.gameReportData || {},
      
      playerInformation: {
        Date: nextProps.playerInformation.cardsDate
      },
      language: nextProps.language
    });
  }

  componentWillUnmount() {
    const { playerInfo, seasons } = this.state;

    this.props.selectPlayer(
      { event: { target: { value: 'Select' } } },
      playerInfo,
      seasons
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
    const { playerInformation, playerInfo, playerImage } = this.state;
   
    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      value,
      playerInformation
    };
   
    if (event.target.value === 'Select') {
      this.setState({
        playerImage: {}
      });
    } else {
      playerInfo.findOne({ _id: value.key }, (err, docs) => {
        console.log(docs)
        this.setState({
          playerImage: docs
        });
      });
    }
   
    this.props.selectPlayer(object, playerInfo);
    this.setState({
      [newVal]: event.target.value,
      playerObject: object,
      season: 'Select'
    });
  };

  renderDatePicker = (testNo, cssClass) => {
    const { gameReportData, language } = this.state;
    const { classes } = this.props;

    const newVal = testNo.replace(/[./" "]/g, '');
    const value = gameReportData[newVal];
    const label = language === 'Japanese' ? '日付' : testNo;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="picker">
          <InlineDatePicker
            style={{
              height: 40
            }}
            keyboard
            clearable
            disableFuture
            variant="outlined"
            label={label}
            format="dd/MM/yyyy"
            value={value}
            onChange={this.handleDateChange(newVal)}
            className={classes.textField}
            // className={classes.headings}
            // autoOk={false}
            // views={['year', 'month', 'day']}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
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

  renderTextField = (evalOf, evalNo, from, to) => {
    const { classes } = this.props;
    const {
      tacticalData,
      technicalData,
      mentalData,
      physicalData
    } = this.state;
    let value = 0;
    switch (evalOf) {
      case 'tactical': {
        if (tacticalData) {
          value =
            (tacticalData[`avgAtta${evalNo}ck`] +
              tacticalData[`avgDefe${evalNo}nd`]) /
            2;
        }
        break;
      }
      case 'technical': {
        if (technicalData) {
          value =
            (technicalData[`avgAtta${evalNo}ck`] +
              technicalData[`avgDefe${evalNo}nd`]) /
            2;
        }
        break;
      }
      case 'mental': {
        if (mentalData) {
          value = mentalData[`avgAtta${evalNo}ck`];
        }
        break;
      }
      case 'physical': {
        if (physicalData) {
          value = physicalData[`avgEvaScore${evalNo}Eval`];
        }
        break;
      }
      default: {
        return null;
      }
    }

    if (Number.isNaN(Number(value)) == true || value == undefined) {
      value = 0;
    }

    return (
      <TextFieldMaterial
        style={{
          height: 35
        }}
        fullWidth
        id="outlined-email-input"
        // label={title}
        className={classes.textField}
        // name={val.title}
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
            padding:10
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

  renderTextFieldSided = (evalOf, evalNo, from, to) => {
    const { classes } = this.props;
    const {
      tacticalData,
      technicalData,
      mentalData,
      physicalData
    } = this.state;
    let value = 0;
    switch (evalOf) {
      case 'tactical': {
        if (tacticalData) {
          value =
            (tacticalData[`avgAtta${evalNo}ck`] +
              tacticalData[`avgDefe${evalNo}nd`]) /
            2;
        }
        break;
      }
      case 'technical': {
        if (technicalData) {
          value =
            (technicalData[`avgAtta${evalNo}ck`] +
              technicalData[`avgDefe${evalNo}nd`]) /
            2;
        }
        break;
      }
      case 'mental': {
        if (mentalData) {
          value = mentalData[`avgAtta${evalNo}ck`];
        }
        break;
      }
      case 'physical': {
        if (physicalData) {
          value = physicalData[`avgEvaScore${evalNo}Eval`];
        }
        break;
      }
      default: {
        return null;
      }
    }

    if (isNaN(value) == true || value == undefined) {
      value = 0;
    }

    return (
      <TextField
        style={{
          height: 35
        }}
        fullWidth
        id="outlined-email-input"
        label={title}
        className={classes.textField}
        name={val.title}
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
            padding:10
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

  renderTextField2 = (from, to) => {
    const { classes } = this.props;
    const { gameReportData, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.generalEvalFields[from + index];
      const newVal = title.replace(/[./" "]/g, '');

      let value = '';
      if (gameReportData) {
        if (gameReportData[newVal] != undefined) {
          if (newVal === 'PlayerBirthday') {
            value = this.renderDate('PlayerBirthday');
          } else {
            value = gameReportData[newVal];
          }
        } else {
          value = '';
        }
      }

      return (
        <TextField
          key={index}
          style={{
            height: 40
          }}          
          fullWidth
          id="outlined-email-input"
          label={label}
          // placeholder="0"
          className={classes.textField}
          name={title}
          value={`${value}`}
          onChange={this.handleFieldChange(newVal)}
          margin="dense"
          variant="outlined"
          InputProps={{
            readOnly: true,
            style:{
              fontSize: 14,
            }
          }}

          InputLabelProps={{
            style: {
              fontSize: 14,
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

  renderDate(testNo, dataOf) {
    const { tacticalData } = this.state;
    let date = new Date();
    switch (dataOf) {
      case 'tactical': {
        if (tacticalData) {
          if (tacticalData[testNo] != undefined) {
            date = tacticalData[testNo];
          } else {
            date = new Date();
          }
        }
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      }
      default: {
        break;
      }
    }
  }

  renderGraphValue = (evalOf, evalNo) => {
    const { classes } = this.props;
    const {
      playerInformation,
      tacticalData,
      technicalData,
      mentalData,
      physicalData
    } = this.state;
    let value = 0;
    switch (evalOf) {
      case 'tactical': {
        if (tacticalData) {
          value =
            (tacticalData[`avgAtta${evalNo}ck`] +
              tacticalData[`avgDefe${evalNo}nd`]) /
            2;
        }

        break;
      }
      case 'technical': {
        if (technicalData) {
          value =
            (technicalData[`avgAtta${evalNo}ck`] +
              technicalData[`avgDefe${evalNo}nd`]) /
            2;
        }
        break;
      }
      case 'mental': {
        if (mentalData) {
          value = mentalData[`avgAtta${evalNo}ck`];
        }
        break;
      }
      case 'physical': {
        if (physicalData) {
          value = physicalData[`avgEvaScore${evalNo}Eval`];
        }
        break;
      }
      default: {
        break;
      }
    }

    if (isNaN(value) == true || value == undefined) {
      value = 0;
    }

    return value;
  };

  renderAttackChart = () => (
    <Radar
      data={{
        labels:
          this.state.language === 'Japanese'
            ? fieldsArrayJap.generalEvalScores.slice(0, 4)
            : scores.slice(0, 4),
        datasets: [
          {
            label: `${this.renderDate('score1Date', 'tactical')}`,
            backgroundColor: 'rgba(0, 163, 0, 0.3)',
            borderColor: 'rgba(0, 163, 0, 0.8)',
            fill: false,
            data: [
              this.renderGraphValue('tactical', 1),
              this.renderGraphValue('technical', 1),
              this.renderGraphValue('mental', 1),
              this.renderGraphValue('physical', 1)
            ]
          },
          {
            label: `${this.renderDate('score2Date', 'tactical')}`,
            backgroundColor: 'rgba(255, 0, 0, 0.3)',
            borderColor: 'rgba(255, 0, 0, 0.8)',
            fill: false,
            data: [
              this.renderGraphValue('tactical', 2),
              this.renderGraphValue('technical', 2),
              this.renderGraphValue('mental', 2),
              this.renderGraphValue('physical', 2)
            ]
          },
          {
            label: `${this.renderDate('score3Date', 'tactical')}`,
            backgroundColor: 'rgba(0, 0, 255, 0.3)',
            borderColor: 'rgba(0, 0, 255, 0.8)',
            fill: false,
            data: [
              this.renderGraphValue('tactical', 3),
              this.renderGraphValue('technical', 3),
              this.renderGraphValue('mental', 3),
              this.renderGraphValue('physical', 3)
            ]
          },
          {
            label: `${this.renderDate('score4Date', 'tactical')}`,
            backgroundColor: 'rgba(110, 0, 201, 0.3)',
            borderColor: 'rgba(110, 0, 201, 0.8)',
            fill: false,
            data: [
              this.renderGraphValue('tactical', 4),
              this.renderGraphValue('technical', 4),
              this.renderGraphValue('mental', 4),
              this.renderGraphValue('physical', 4)
            ]
          }
        ]
      }}
    />
  );

  createPdf = () => {
    const html = bodyRef.current;
    Doc.createPdf(html,true);
  };

  render() {
    const { classes } = this.props;
    const { season, seasons, players, player, language, playerImage, dummyplayerImage, playerInformation} = this.state;
    const func = [/* () => window.print(), */ () => this.createPdf()];
    return (
    <div className={classes.root} id="divToPrint" ref={bodyRef} style={{marginBottom:30}}>
        <div className={classes.innerRoot} elevation={1}>
          <Typography variant="h6" color="primary">
            {language === 'Japanese' ? '総合評価' : 'General'}
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
                <MenuItem value="Select">
                  {language === 'Japanese' ? '選択' : 'Select'}
                </MenuItem>
                {seasons &&
                  seasons.map(value => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
              </TextField>

              <Card
                  className={classes.card}
                  style={{
                    maxWidth: 100,
                    marginLeft: 10
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Player Image"
                      className={classes.media}
                      height="100"
                      image={
                        playerImage
                          ? playerImage.image
                            ? playerImage.image
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
                <br />

                {scores.slice(0, 4).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.generalEvalScores[index];
                  return (
                    <div key={index} style={{ width: '100%', margin: 11 }}>
                      <Typography
                        style={{ fontSize: 15 }}
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
                <Typography
                  align="center"
                  style={{ width: '100%', fontSize: 16 }}
                  variant="subtitle2"
                >
                  {this.renderDate('score1Date', 'tactical')}
                </Typography>
                {this.renderTextField('tactical', 1)}
                {this.renderTextField('technical', 1)}
                {this.renderTextField('mental', 1)}
                {this.renderTextField('physical', 1)}
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  align="center"
                  style={{ width: '100%', fontSize: 16 }}
                  variant="subtitle2"
                >
                  {this.renderDate('score2Date', 'tactical')}
                </Typography>
                {this.renderTextField('tactical', 2)}
                {this.renderTextField('technical', 2)}
                {this.renderTextField('mental', 2)}
                {this.renderTextField('physical', 2)}
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  style={{ width: '100%', fontSize: 16 }}
                  align="center"
                  variant="subtitle2"
                >
                  {this.renderDate('score3Date', 'tactical')}
                </Typography>
                {this.renderTextField('tactical', 3)}
                {this.renderTextField('technical', 3)}
                {this.renderTextField('mental', 3)}
                {this.renderTextField('physical', 3)}
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  align="center"
                  style={{ width: '100%', fontSize: 16 }}
                  variant="subtitle2"
                >
                  {this.renderDate('score4Date', 'tactical')}
                </Typography>
                {this.renderTextField('tactical', 4)}
                {this.renderTextField('technical', 4)}
                {this.renderTextField('mental', 4)}
                {this.renderTextField('physical', 4)}
              </Grid>
            </Grid>
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
            <Grid item xs container justify="center">
              {this.renderDatePicker('Game Date')}
              {this.renderDatePicker('Game Date')}
            </Grid>
            <Grid item xs container justify="center">
              {this.renderTextField2(0, 2)}
            </Grid>
            <Grid item xs={8} container justify="center">
              {this.renderAttackChart()}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

TechnicalPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    players: state.evaluationReducer.players,
    playerInformation: state.evaluationReducer.playerInformation || {},
    seasons: state.evaluationReducer.seasons || ['Select'],
    language: state.dropDownReducer.language || 'English'
  });

const mapDispatchToProps = dispatch => ({
  selectSeason: (playerObject, playerInfo, seasonObject) =>
    dispatch(selectSeason(playerObject, playerInfo, seasonObject)),
  selectPlayer: (object, playerInfo, seasons) =>
    dispatch(selectPlayer(object, playerInfo, seasons)),
  getPlayers: playerInfo => dispatch(getPlayers(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
