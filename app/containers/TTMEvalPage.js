/* eslint-disable arrow-body-style */
/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { connect } from 'react-redux';
import TextFieldNew from '../constants/TextInput';
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

const icons = [...fieldsArray.icons2];

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

      dataImage: require('../assets/images/noData.png')
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
      seasons: nextProps.seasons,
      tacticalData: nextProps.playerInformation.tacticalData || {},
      technicalData: nextProps.playerInformation.technicalData || {},
      mentalData: nextProps.playerInformation.mentalData || {},
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

  

  renderDate(testNo, dataOf) {
    const { tacticalData, technicalData, mentalData } = this.state;
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
      case 'technical': {
        if (technicalData) {
          if (technicalData[testNo] != undefined) {
            date = technicalData[testNo];
          } else {
            date = new Date();
          }
        }
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      }
      case 'mental': {
        if (mentalData) {
          if (mentalData[testNo] != undefined) {
            date = mentalData[testNo];
          } else {
            date = new Date();
          }
        }
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      }
      default: {
        return null;
      }
    }
  }

  createPdf = () => {
    const html = bodyRef.current;
    Doc.createPdf(html,true);
  };

  render() {
    const { classes } = this.props;
    const {
      season,
      seasons,
      players,
      player,
      tacticalData,
      technicalData,
      mentalData,
      language,
      playerImage,
      dummyplayerImage
    } = this.state;
    const func = [/* () => window.print(), */ () => this.createPdf()];
    return (
      <div className={classes.root} id="divToPrint" ref={bodyRef}>
        <div
          className={classes.innerRoot}
          elevation={1}
          style={{ width: '100%' }}
        >
          <Typography variant="h6" color="primary">
            {language === 'Japanese'
              ? '技,戦術,メンタル'
              : 'Technical,Tactical,Mental'}
          </Typography>
          <br />
          <Toolbar>
            <div className={classes.grow}>
              <TextField
                style={{ width: 230 }}
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
                style={{ width: 150 }}
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
                // focusRipple
                disableRipple
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
          <br />

          <div>
            <Grid container spacing={0} direction="row" justify="center">
              {tacticalData.score1Date ? (
                <Grid
                  item
                  xs
                  container
                  justify="center"
                  direction="row"
                  style={{ paddingRight: 30, paddingTop: 50 }}
                >
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      style={{ backgroundColor: 'blue', color: 'white' }}
                      className={classes.tablePadding}
                    >
                      {language === 'English'
                        ? `TACTICAL EVALUATION`
                        : '戦術評価'}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {this.renderDate('score1Date', 'tactical')}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {this.renderDate('score2Date', 'tactical')}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {this.renderDate('score3Date', 'tactical')}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {this.renderDate('score4Date', 'tactical')}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle2"
                      style={{ backgroundColor: 'magenta', color: 'white' }}
                      className={classes.tablePadding}
                    >
                      {language === 'English' ? `ATTACK` : '攻撃'}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {tacticalData.avgAtta1ck ? tacticalData.avgAtta1ck : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {tacticalData.avgAtta2ck ? tacticalData.avgAtta2ck : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {tacticalData.avgAtta3ck ? tacticalData.avgAtta3ck : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {tacticalData.avgAtta4ck ? tacticalData.avgAtta4ck : 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle2"
                      style={{ backgroundColor: 'lightblue', color: 'white' }}
                      className={classes.tablePadding}
                    >
                      {language === 'English' ? `DEFENSE` : '防衛'}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {tacticalData.avgDefe1nd ? tacticalData.avgDefe1nd : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {tacticalData.avgDefe2nd ? tacticalData.avgDefe2nd : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {tacticalData.avgDefe3nd ? tacticalData.avgDefe3nd : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {tacticalData.avgDefe4nd ? tacticalData.avgDefe4nd : 0}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  item
                  xs
                  container
                  justify="center"
                  direction="row"
                  style={{ paddingRight: 30, paddingTop: 40 }}
                >
                  <Typography
                    align="center"
                    variant="subtitle2"
                    style={{ fontSize: 18, width: '100%' }}
                  >
                    {language === 'English'
                      ? `TACTICAL EVALUATION`
                      : '戦術評価'}
                  </Typography>
                  <img src={this.state.dataImage} />
                </Grid>
              )}
              {technicalData.score1Date ? (
                <Grid
                  item
                  xs
                  container
                  justify="center"
                  direction="row"
                  style={{ paddingRight: 30, paddingTop: 50 }}
                >
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      style={{ backgroundColor: 'blue', color: 'white' }}
                      className={classes.tablePadding}
                    >
                      {language === 'English'
                        ? `TECHNICAL EVALUATION`
                        : '技術評価'}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {this.renderDate('score1Date', 'technical')}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {this.renderDate('score2Date', 'technical')}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {this.renderDate('score3Date', 'technical')}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {this.renderDate('score4Date', 'technical')}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle2"
                      style={{ backgroundColor: 'magenta', color: 'white' }}
                      className={classes.tablePadding}
                    >
                      {language === 'English' ? `ATTACK` : '攻撃'}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {technicalData.avgAtta1ck ? technicalData.avgAtta1ck : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {technicalData.avgAtta2ck ? technicalData.avgAtta2ck : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {technicalData.avgAtta3ck ? technicalData.avgAtta2ck : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {technicalData.avgAtta4ck ? technicalData.avgAtta4ck : 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle2"
                      style={{ backgroundColor: 'lightblue', color: 'white' }}
                      className={classes.tablePadding}
                    >
                      {language === 'English' ? `DEFENSE` : '防衛'}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {technicalData.avgDefe1nd ? technicalData.avgDefe1nd : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {technicalData.avgDefe2nd ? technicalData.avgDefe2nd : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {technicalData.avgDefe3nd ? technicalData.avgDefe3nd : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {technicalData.avgDefe4nd ? technicalData.avgDefe4nd : 0}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  item
                  xs
                  container
                  justify="center"
                  direction="row"
                  style={{ paddingRight: 30, paddingTop: 40 }}
                >
                  <Typography
                    align="center"
                    variant="subtitle2"
                    style={{ fontSize: 18, width: '100%' }}
                  >
                    {language === 'English'
                      ? `TECHNICAL EVALUATION`
                      : '技術評価'}
                  </Typography>
                  <img src={this.state.dataImage} />
                </Grid>
              )}
              {mentalData.score1Date ? (
                <Grid
                  item
                  xs={3}
                  container
                  justify="center"
                  direction="row"
                  style={{ paddingRight: 30, paddingTop: 50 }}
                >
                  <Grid item xs={8}>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      style={{ backgroundColor: 'blue', color: 'white' }}
                      className={classes.tablePadding}
                    >
                      {language === 'English'
                        ? `MENTAL EVALUATION`
                        : 'メンタル評価'}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {this.renderDate('score1Date', 'mental')}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {this.renderDate('score2Date', 'mental')}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {this.renderDate('score3Date', 'mental')}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {this.renderDate('score4Date', 'mental')}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle2"
                      style={{ backgroundColor: 'magenta', color: 'white' }}
                      className={classes.tablePadding}
                    >
                      {language === 'English' ? `MENTAL` : 'メンタル'}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {mentalData.avgAtta1ck ? mentalData.avgAtta1ck : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {mentalData.avgAtta2ck ? mentalData.avgAtta2ck : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {mentalData.avgAtta3ck ? mentalData.avgAtta3ck : 0}
                    </Typography>
                    <Typography className={classes.tablePadding}>
                      {mentalData.avgAtta4ck ? mentalData.avgAtta4ck : 0}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  item
                  xs={3}
                  container
                  justify="center"
                  direction="row"
                  style={{ paddingRight: 30, paddingTop: 40 }}
                >
                  <Typography
                    align="center"
                    variant="subtitle2"
                    style={{ fontSize: 18, width: '100%' }}
                  >
                    {language === 'English'
                      ? `MENTAL EVALUATION`
                      : 'メンタル評価'}
                  </Typography>
                  <img src={this.state.dataImage} />
                </Grid>
              )}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

TechnicalPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    players: state.evaluationReducer.players,
    playerInformation: state.evaluationReducer.playerInformation || {},
    seasons: state.evaluationReducer.seasons || [],
    language: state.dropDownReducer.language || 'English'
  };
};

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
