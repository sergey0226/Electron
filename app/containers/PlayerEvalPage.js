/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-duplicate-props */
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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
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

const fields = [...fieldsArray.healthFields];

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
    console.log(nextProps)
    this.setState({
      players: nextProps.players,
      seasons: nextProps.seasons,
      playerInformation: nextProps.playerInformation,
      injuryData: nextProps.injuryData,
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

  renderTextField = (from, to, testNo,labled=false) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.healthFields[from + index];
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
      if(labled)
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
              padding: 10
            }
          }}
          InputProps={{
            readOnly: true
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
          className={classes.textField}
          name={title}
          value={`${value}`}
          onChange={this.handleFieldChange(newVal)}
          margin="dense"
          variant="outlined"
          inputProps={{
            style: {
              fontSize: 15,
              padding: 10
            }
          }}
          InputProps={{
            readOnly: true
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

  renderTextField2 = (from, to,labled=false) => {
    const { classes } = this.props;
    const { playerInformation, injuryData, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.healthFields[from + index];
      const newVal = title.replace(/[./" "]/g, '');

      let value = '';
      if (injuryData) {
        if (injuryData[newVal] != undefined) {
          if (newVal === 'Scheduledtoreturn' || newVal === 'InjuryDate') {
            value = this.renderDate2(newVal);
          } else {
            value = injuryData[newVal];
          }
        } else {
          value = '';
        }
      }
      if(labled)
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
      return (
        <TextField
          key={index}
          fullWidth
          id="outlined-email-input"
          className={classes.textField}
          name={title}
          value={`${value}`}
          onChange={this.handleFieldChange(newVal)}
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

  renderDate2(testNo) {
    const { injuryData } = this.state;
    let date = new Date();
    if (injuryData) {
      if (injuryData[testNo] != undefined) {
        date = injuryData[testNo];
      } else {
        date = new Date();
      }
    }
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  saveData = () => {
    let { playerInformation, playerInfo } = this.state;

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
            {language === 'Japanese' ? '選手' : 'Player'}
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
                  {language === 'Japanese' ? '健康状態' : 'HEALTH'}
                </Typography>
                {fields.slice(8, 13).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.healthFields[index + 8];
                  return (
                    <div key={index} style={{ width: '100%', margin: 13 }}>
                      <Typography variant="subtitle2">{label}</Typography>
                    </div>
                  );
                })}
                <span
                  style={{
                    paddingTop: 35,
                    marginTop: 30,
                    borderTop: '3px solid rgb(244, 0, 0)',
                    width: '100%'
                  }}
                />
                <Typography
                  variant="subtitle2"
                  noWrap
                  className={classes.commentTypo}
                >
                  {language === 'Japanese' ? '受傷記録' : 'INJURY RECORD'}
                </Typography>
                {fields.slice(13, 19).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.healthFields[index + 13];
                  return (
                    <div key={index} style={{ width: '100%', margin: 13 }}>
                      <Typography variant="subtitle2" noWrap>
                        {label}
                      </Typography>
                    </div>
                  );
                })}
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  variant="subtitle2"
                  style={{ fontSize: 18, marginBottom: 17, marginTop: 20 }}
                >
                  {this.renderDate('DateofRegistration')}
                </Typography>
                {this.renderTextField(8, 13, '')}
                <span
                  style={{
                    paddingTop: 30,
                    marginTop: 29,
                    marginBottom: 60,
                    borderTop: '3px solid rgb(244, 0, 0)',
                    width: '100%'
                  }}
                />
                {this.renderTextField2(13, 19)}
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  variant="subtitle2"
                  style={{ fontSize: 18, marginBottom: 17, marginTop: 20 }}
                >
                  {this.renderDate('test2Date')}
                </Typography>
                {this.renderTextField(8, 13, 'test2')}
                <span
                  style={{
                    paddingTop: 30,
                    marginTop: 29,
                    borderTop: '3px solid rgb(244, 0, 0)',
                    width: '100%'
                  }}
                />
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  variant="subtitle2"
                  style={{ fontSize: 18, marginBottom: 17, marginTop: 20 }}
                >
                  {this.renderDate('test3Date')}
                </Typography>
                {this.renderTextField(8, 13, 'test3')}
                <span
                  style={{
                    paddingTop: 30,
                    marginTop: 29,
                    borderTop: '3px solid rgb(244, 0, 0)',
                    width: '100%'
                  }}
                />
                {fields.slice(19, 22).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.healthFields[index + 19];
                  return (
                    <div key={index} style={{ width: '100%', margin: 13 }}>
                      <Typography variant="subtitle2" noWrap>
                        {label}
                      </Typography>
                    </div>
                  );
                })}
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  variant="subtitle2"
                  style={{ fontSize: 18, marginBottom: 17, marginTop: 20 }}
                >
                  {this.renderDate('test4Date')}
                </Typography>
                {this.renderTextField(8, 13, 'test4')}
                <span
                  style={{
                    paddingTop: 30,
                    marginTop: 29,
                    borderTop: '3px solid rgb(244, 0, 0)',
                    width: '100%'
                  }}
                />
                {this.renderTextField(19, 22, '')}
              </Grid>
            </Grid>

            <br />
            <Typography className={classes.commentTypo} variant="subtitle2">
              {language === 'Japanese' ? '健康状態' : 'HEALTH SITUATION'}
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
                  label={language === 'Japanese' ? 'コメント' : 'Comments'}
                  value={
                    playerInformation &&
                    (playerInformation.HealthSituation
                      ? playerInformation.HealthSituation
                      : '')
                  }
                  InputProps={{
                    readOnly: true
                  }}
                  onChange={this.handleFieldChange('Health Situation')}
                  multiline
                  rows="4"
                  rowsMax="4"
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <br />
            <Typography className={classes.commentTypo} variant="subtitle2">
              {language === 'Japanese'
                ? '選手の評価レポート'
                : "Player's Evaluation Report"}
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
                  label={language === 'Japanese' ? 'コメント' : 'Comments'}
                  value={
                    playerInformation &&
                    (playerInformation["Player'sEvaluationReport"]
                      ? playerInformation["Player'sEvaluationReport"]
                      : '')
                  }
                  onChange={this.handleFieldChange(
                    "Player's Evaluation Report"
                  )}
                  multiline
                  rows="4"
                  rowsMax="4"
                  margin="dense"
                  variant="outlined"
                />
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
    injuryData: state.physicalReducer.injuryData || {},
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
