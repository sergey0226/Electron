/* eslint-disable prefer-const */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-destructuring */
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

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
// import TextField from '../constants/TextInput';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DelIcon from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import {
  getSeasons,
  selectSeason,
  selectMonth
} from '../actions/seasonalActions';
import { getDropDowns } from '../actions/dropDownActions';

import SnackBar from '../components/SnackBar/SnackBar';
import Doc from '../constants/DocService';

import * as arrays from '../constants/dropDowns';
import * as arraysJap from '../constants/dropDownsJap';
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

  input: {
    display: 'none'
  },

  fab: {
    width: 35,
    height: 30,
    margin: 5,
    marginTop: 20
  }
});

const icons = [...fieldsArray.icons];

const fields = [...fieldsArray.seasonalFields];
const eyeFields = [
  'TECHNICAL',
  'TACTICAL',
  'POWER',
  'STAMINA',
  'PERIOD',
  'Season'
];

let TECHNICALTr = [...arrays.TechnicalTraining];
let TACTICALTr = [...arrays.TacticalTraining];
let POWERTr = [...arrays.PowerTraining];
let STAMINATr = [...arrays.StaminaTraining];
let PERIODTr = [...arrays.Period];

let Seasons = [...arrays.Seasons];
let Months = [...arrays.Months];

let optionTextFields = ['Option'];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      season: 'Select',
      month: 'Select',

      language: '',
      playerInformation: {},

      open: false,
      dialogValue: '',
      dialogLabel: '',
      optionText: []
    };
  }

  componentWillMount() {
    const { playerInfo } = this.props;

    this.setState({
      playerInfo
    });
    this.props.getSeasons(playerInfo);
    this.props.getDropDowns(playerInfo);
  }

  // componentDidMount() {
  //   this.setState({
  //     language: this.props.language
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    const obj = nextProps.dropDownObj;
    this.setState({
      language: nextProps.language,
      playerInformation: nextProps.playerInformation
    });
    Seasons = nextProps.seasons;
    if (this.state.language !== nextProps.language) {
      this.changeLang(nextProps.language);
    }
    if (obj) {
      TECHNICALTr = obj.TECHNICALTr ? obj.TECHNICALTr : TECHNICALTr;
      TACTICALTr = obj.TACTICALTr ? obj.TACTICALTr : TACTICALTr;
      POWERTr = obj.POWERTr ? obj.POWERTr : POWERTr;
      STAMINATr = obj.STAMINATr ? obj.STAMINATr : STAMINATr;
      PERIODTr = obj.PERIODTr ? obj.PERIODTr : PERIODTr;
    }
  }

  // componentWillUnmount() {
  //   const { playerInfo } = this.state;

  //   this.props.selectPlayer(
  //     { event: { target: { value: 'Select' } } },
  //     playerInfo
  //   );
  // }

  handleMonthChange = name => (event, value) => {
    const { playerInformation, season, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const screenName = 'Add Seasonal Program';
    const object = {
      event: { target: { value: arrays.Months[value.key] } },
      season,
      screenName,
      playerInformation
    };

    this.props.selectMonth(object, playerInfo);
    this.setState({
      [newVal]: event.target.value,
      monthIndex: value.key
    });
  };

  handleSeasonChange = name => (event, value) => {
    const { playerInformation, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      playerInformation
    };

    this.props.selectSeason(object, playerInfo);
    this.setState({
      [newVal]: event.target.value,
      month: 'Select'
    });
  };

  renderTextField = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const newVal = `${title}text`.replace(/[./" "]/g, '');

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
        <TextField
          key={index}
          fullWidth
          style={{
            height: 41
          }}
          id="outlined-email-input"
          // label={title}
          placeholder={language === 'Japanese' ? 'テキスト' : 'text'}
          className={classes.textField}
          name={title}
          value={`${value}`}
          onChange={this.handleFieldChange(newVal)}
          margin="dense"
          variant="outlined"
          inputProps={{
            maxLength: 100,
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

  renderSelectTextField = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.seasonalFields[from + index];
      const newVal = `${title}Tr`.replace(/[./" "]/g, '');
      let value = null;
      if (playerInformation[newVal] != undefined) {
        value = playerInformation[newVal];
      } else {
        value = '';
      }
      return (
        <TextField
          style={{
            height: 41
          }}
          key={index}
          select
          fullWidth
          id="outlined-email-input"
          // label={label}
          className={classes.textField}
          onChange={this.handleFieldChange(newVal)}
          name={title}
          margin="dense"
          variant="outlined"
          value={value}
          InputProps={this.renderEye(title, label)}
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
        >
          {this.selectMenu(title)}
        </TextField>
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

  renderEye = (val, label) => {
    if (eyeFields.includes(val)) {
      return {
        endAdornment: (
          <InputAdornment
            style={{ marginRight: -15, marginLeft: -10 }}
            position="end"
          >
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => this.openDialog(val, label)}
            >
              <Visibility />
            </IconButton>
          </InputAdornment>
        )
      };
    }
    return null;
  };

  selectMenu = val => {
    const newVal = val.replace(/[./" "]/g, '');
    if (newVal === 'TECHNICAL') {
      return TECHNICALTr.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => TECHNICALTr.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'TACTICAL') {
      return TACTICALTr.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => TACTICALTr.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'POWER') {
      return POWERTr.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => POWERTr.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'STAMINA') {
      return STAMINATr.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => STAMINATr.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'PERIOD') {
      return PERIODTr.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => PERIODTr.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Season') {
      return Seasons.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          <IconButton
            aria-label="Toggle password visibility"
            onClick={() => Seasons.splice(index, 1)}
          >
            <DelIcon />
          </IconButton>
        </MenuItem>
      ));
    }
  };

  openDialog = (val, label) => {
    this.setState({ open: true, dialogValue: val, dialogLabel: label });
  };

  renderDialog = () => {
    const { classes } = this.props;
    const { open, dialogLabel, dialogValue, optionText, language } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{dialogLabel}</DialogTitle>
        <DialogContent
          style={{
            borderTop: `1px solid rgb(207, 211, 228)`,
            paddingTop: 20
          }}
        >
          <DialogContentText>
            {language === 'Japanese' ? 'オプション追加' : 'Add Options'}:
          </DialogContentText>
          {optionTextFields.map((val, index) => (
            <div key={index} style={{ width: '100%' }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={optionText[index]}
                label={language === 'Japanese' ? 'オプション' : val}
                onChange={this.handleOptionChange(index)}
                // fullWidth
              />
              {index === 0 && (
                <Fab
                  color="primary"
                  aria-label="Add"
                  className={classes.fab}
                  onClick={() => this.addOptionTextField()}
                >
                  <Add />
                </Fab>
              )}
              {index !== 0 && (
                <Fab
                  color="secondary"
                  aria-label="Add"
                  className={classes.fab}
                  onClick={() => this.removeOptionTextField(index)}
                >
                  <CloseIcon />
                </Fab>
              )}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={this.handleClose}
            color="secondary"
          >
            {language === 'Japanese' ? '閉じる' : 'Close'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => this.saveChanges(dialogValue)}
            color="primary"
          >
            {language === 'Japanese' ? '変更内容を保存' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  addOptionTextField() {
    optionTextFields.push(`Option`);
    this.setState({
      open: true
    });
  }

  removeOptionTextField(index) {
    const { optionText } = this.state;
    optionTextFields.splice(index, 1);
    optionText.splice(index, 1);
    this.setState({
      optionText
    });
  }

  handleClose = () => {
    this.setState({ open: false, optionText: [] });
    optionTextFields = optionTextFields.slice(0, 1);
  };

  handleOptionChange = index => event => {
    const { optionText } = this.state;
    optionText[index] = event.target.value;
    this.setState({
      optionText
    });
  };

  saveChanges = val => {
    const { optionText } = this.state;
    const newVal = val.replace(/[./" "]/g, '');
    if (newVal === 'TECHNICAL') {
      optionTextFields.map((value, index) =>
        TECHNICALTr.push(optionText[index])
      );
    }
    if (newVal === 'TACTICAL') {
      optionTextFields.map((value, index) =>
        TACTICALTr.push(optionText[index])
      );
    }
    if (newVal === 'POWER') {
      optionTextFields.map((value, index) => POWERTr.push(optionText[index]));
    }
    if (newVal === 'STAMINA') {
      optionTextFields.map((value, index) => STAMINATr.push(optionText[index]));
    }
    if (newVal === 'PERIOD') {
      optionTextFields.map((value, index) => PERIODTr.push(optionText[index]));
    }
    if (newVal === 'Season') {
      optionTextFields.map((value, index) => Seasons.push(optionText[index]));
    }

    this.setState({ open: false, optionText: [] });
    optionTextFields = optionTextFields.slice(0, 1);
  };

  saveData = () => {
    let {
      playerInformation,
      season,
      // month,
      monthIndex,
      playerInfo
    } = this.state;

    playerInformation = {
      ...playerInformation,
      Season: season,
      Month: arrays.Months[monthIndex],
      fileName: 'seasonalProg'
    };

    let dropDowns = {
      TECHNICALTr,
      TACTICALTr,
      POWERTr,
      STAMINATr,
      PERIODTr,
      fileName: 'dropDowns'
    };

    playerInfo.findOne({ fileName: 'dropDowns' }, async (err, docs) => {
      if (docs) {
        dropDowns = {
          ...docs,
          ...dropDowns
        };
        await playerInfo.update(
          { fileName: 'dropDowns' },
          dropDowns,
          {},
          (err, numReplaced) => {}
        );
      } else {
        await playerInfo.insert(dropDowns, (err, docs) => {});
      }
    });

    playerInfo.findOne({ _id: playerInformation._id }, async (err, docs) => {
      if (!docs) {
        await playerInfo.insert(playerInformation, (err, docs) => {
          this.setState({
            season: 'Select',
            month: 'Select',
            openSnack: true
          });
          this.props.getSeasons(playerInfo);
        });
      } else {
        await playerInfo.update(
          { _id: playerInformation._id },
          playerInformation,
          {},
          (err, numReplaced) => {
            this.setState({
              season: 'Select',
              month: 'Select',
              openSnack: true
            });
            this.props.getSeasons(playerInfo);
          }
        );
      }
    });
  };

  createPdf = () => {
    const html = bodyRef.current;
    Doc.createPdf(html,true);
  };

  changeLang = lang => {
    if (lang === 'English') {
      Months = [...arrays.Months];
    }
    if (lang === 'Japanese') {
      Months = [...arraysJap.Months];
    }
  };

  render() {
    const { classes } = this.props;
    const { season, month, language } = this.state;
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
              ? 'シーズン計画を追加'
              : 'Add Seasonal Program'}
          </Typography>
          <br />
          <Toolbar>
            <div className={classes.grow}>
              <TextField
                style={{ width: 250, height: 50 }}
                // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? 'シーズン' : 'Season'}
                className={classes.textField}
                value={season}
                onChange={this.handleSeasonChange('season')}
                InputProps={this.renderEye('Season', 'Season')}
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
                {this.selectMenu('Season')}
              </TextField>
              <TextField
                style={{ width: 150 }}
                // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? '月' : 'Month'}
                className={classes.textField}
                value={month}
                onChange={this.handleMonthChange('month')}
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
                {Months &&
                  Months.map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
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
                <br />

                {fields.slice(0, 5).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.seasonalFields[index];
                  return (
                    <div key={index} style={{ width: '100%', margin: 14 }}>
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
                  {language === 'English' ? `Training` : 'トレーニング'}
                </Typography>
                {this.renderSelectTextField(0, 5)}
              </Grid>
              <Grid item xs={7} container justify="center">
                <Typography
                  align="center"
                  style={{ width: '100%', fontSize: 16 }}
                  variant="subtitle2"
                >
                  {language === 'English' ? `TEXT` : 'テキスト'}
                </Typography>
                {this.renderTextField(0, 4)}
              </Grid>
            </Grid>
          </div>
        </div>
        {this.renderDialog()}
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
    seasons: state.seasonalReducer.seasons || [],
    playerInformation: state.seasonalReducer.playerInformation || {},
    dropDownObj: state.dropDownReducer.dropDowns,
    language: state.dropDownReducer.language || 'English'
  });

const mapDispatchToProps = dispatch => ({
  getSeasons: playerInfo => dispatch(getSeasons(playerInfo)),
  selectSeason: (object, playerInfo) =>
    dispatch(selectSeason(object, playerInfo)),
  selectMonth: (object, playerInfo) =>
    dispatch(selectMonth(object, playerInfo)),
  getDropDowns: playerInfo => dispatch(getDropDowns(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
