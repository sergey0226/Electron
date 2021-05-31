/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
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
// import TextField from '@material-ui/core/TextField';
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
import TextField from '../constants/TextInput';
import {
  getSeasons,
  selectSeason,
  selectYear,
  selectMonth,
  selectDay
} from '../actions/monthlyActions';
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
    display:"flex",
    flexDirection:'row',
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
    // marginLeft: -10
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
    // color: 'red',
    // borderBottom: '3px solid rgb(244, 0, 0)',
    margin: '15px 0px 15px 0px'
  },

  tablePadding: {
    padding: 7,
    borderBottom: '1px solid rgb(215, 226, 244)'
  },

  table: {
    // minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  },

  fab: {
    width: 35,
    height: 30,
    margin: 5,
    marginTop: 20
  }
});

const icons = [...fieldsArray.icons];

const fields = [...fieldsArray.monthlyFields];
const eyeFields = [
  'Main Theme',
  'Physical',
  'Technical',
  'Tactical',
  'Grand',
  'WUP',
  'SSG',
  'Game',
  'Grand'
];

let Intensity = [...arrays.Intensity];
let WUP = [...arrays.WUP];
let Physical = [...arrays.Physical];
let Technical = [...arrays.Technical];
let Tactical = [...arrays.Tactical];
let SSG = [...arrays.SSG];
let Game = [...arrays.Game];
let MainTheme = [...arrays.MainThemes];
let Grand = [...arrays.Grand];

let Months = [...arrays.Months];
const Days = ['Select', ...Array(31).keys()];
let WeekDay = [...arrays.WeekDay];

let optionTextFields = ['Option'];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      season: 'Select',
      seasons: [],
      year: 'Select',
      years: [],
      month: 'Select',
      months: [],
      day: 'Select',
      days: [],

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

  componentWillReceiveProps(nextProps) {
    const obj = nextProps.dropDownObj;

    this.setState({
      seasons: nextProps.seasons,
      years: nextProps.years,
      months: nextProps.months,
      days: nextProps.days,
      playerInformation: nextProps.playerInformation,
      language: nextProps.language
    });
    if (this.state.language !== nextProps.language) {
      this.changeLang(nextProps.language);
    }
    if (obj) {
      WUP = obj.WUP ? obj.WUP : WUP;
      Physical = obj.Physical ? obj.Physical : Physical;
      Technical = obj.Technical ? obj.Technical : Technical;
      Tactical = obj.Tactical ? obj.Tactical : Tactical;
      SSG = obj.SSG ? obj.SSG : SSG;
      Game = obj.Game ? obj.Game : Game;
      Grand = obj.Grand ? obj.Grand : Grand;
      MainTheme = obj.MainTheme ? obj.MainTheme : MainTheme;
    }
  }

  componentWillUnmount() {
    const { playerInfo } = this.state;

    this.props.selectSeason(
      { event: { target: { value: 'Select' } } },
      playerInfo
    );
  }

  handleDayChange = name => (event, value) => {
    const { playerInformation, season, year, month, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      season,
      year,
      month,
      playerInformation
    };

    this.props.selectDay(object, playerInfo);
    this.setState({
      [newVal]: event.target.value
    });
  };

  handleMonthChange = name => (event, value) => {
    const { playerInformation, season, year, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const screenName = 'Add Daily Program';
    const object = {
      event,
      season,
      year,
      screenName,
      playerInformation
    };

    this.props.selectMonth(object, playerInfo);
    this.setState({
      [newVal]: event.target.value,
      day: 'Select'
    });
  };

  handleYearChange = name => (event, value) => {
    const { playerInformation, season, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      season,
      playerInformation
    };

    this.props.selectYear(object, playerInfo);
    this.setState({
      [newVal]: event.target.value,
      month: 'Select',
      day: 'Select'
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
      year: 'Select',
      month: 'Select',
      day: 'Select'
    });
  };

  handleDateChange = testNo => date => {
    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [testNo]: date
      }
    }));
  };

  renderTextField = (from, to,showLabel=false) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.monthlyFields[from + index];
      const newVal = title.replace(/[./" "]/g, '');

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
          style={{
            height:35
          }}
          fullWidth
          id="outlined-email-input"
          label={showLabel?label:false}
          className={classes.textField}
          name={title}
          value={`${value}`}
          onChange={this.handleFieldChange(newVal)}
          margin="dense"
          variant="outlined"
          inputProps={{
            style:{
              fontSize:14,
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
    });
  };

  renderTextFieldSided = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.monthlyFields[from + index];
      const newVal = title.replace(/[./" "]/g, '');

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
          style={{
            height:35
          }}          
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
            style:{
              fontSize:14,
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
    });
  };

  renderSelectTextField = (from, to,showLabel = false) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.monthlyFields[from + index];
      const newVal = title.replace(/[./" "]/g, '');
      let value = null;
      if (playerInformation[newVal] != undefined) {
        value = playerInformation[newVal];
      } else {
        value = '';
      }
      return (
        <TextField
          style={{
            height: 35
          }}
          key={index}
          select
          fullWidth
          id="outlined-email-input"
          className={classes.textField}
          onChange={this.handleFieldChange(title)}
          name={title}
          label={showLabel?label:null}
          margin="dense"
          variant="outlined"
          value={value}
          InputProps={this.renderEye(title, label)}
          inputProps={{
            style: {
              fontSize: 14,
              padding:10
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
    if (newVal === 'Intensity') {
      return Intensity.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
        </MenuItem>
      ));
    }
    if (newVal === 'WUP') {
      return WUP.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => WUP.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'MainTheme') {
      return MainTheme.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => MainTheme.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Physical') {
      return Physical.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Physical.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Technical') {
      return Technical.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Technical.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Tactical') {
      return Tactical.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Tactical.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Grand') {
      return Grand.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Grand.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'SSG') {
      return SSG.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => SSG.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Game') {
      return Game.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Game.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Month') {
      return Months.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
        </MenuItem>
      ));
    }
    if (newVal === 'Day') {
      return Days.map((value, index) => (
        <MenuItem
          key={index}
          value={typeof value === 'number' ? value + 1 : value}
        >
          {typeof value === 'number' ? value + 1 : value}
        </MenuItem>
      ));
    }
    if (newVal === 'WeekDay') {
      return WeekDay.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
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
    if (newVal === 'MainTheme') {
      optionTextFields.map((value, index) => MainTheme.push(optionText[index]));
    }
    if (newVal === 'Physical') {
      optionTextFields.map((value, index) => Physical.push(optionText[index]));
    }
    if (newVal === 'Technical') {
      optionTextFields.map((value, index) => Technical.push(optionText[index]));
    }
    if (newVal === 'Tactical') {
      optionTextFields.map((value, index) => Tactical.push(optionText[index]));
    }
    if (newVal === 'Grand') {
      optionTextFields.map((value, index) => Grand.push(optionText[index]));
    }
    if (newVal === 'WUP') {
      optionTextFields.map((value, index) => WUP.push(optionText[index]));
    }
    if (newVal === 'SSG') {
      optionTextFields.map((value, index) => SSG.push(optionText[index]));
    }
    if (newVal === 'Game') {
      optionTextFields.map((value, index) => Game.push(optionText[index]));
    }

    this.setState({ open: false, optionText: [] });
    optionTextFields = optionTextFields.slice(0, 1);
  };

  saveData = () => {
    let { playerInformation, playerInfo } = this.state;

    playerInformation = {
      ...playerInformation,
      fileName: 'monthlyProg'
    };

    let dropDowns = {
      WUP,
      Physical,
      Technical,
      Tactical,
      SSG,
      Game,
      MainTheme,
      Grand,
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
            year: 'Select',
            month: 'Select',
            day: 'Select',
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
              year: 'Select',
              month: 'Select',
              day: 'Select',
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
      Intensity = [...arrays.Intensity];
      WeekDay = [...arrays.WeekDay];
      Months = [...arrays.Months];
    }
    if (lang === 'Japanese') {
      Intensity = [...arraysJap.Intensity];
      WeekDay = [...arraysJap.WeekDay];
      Months = [...arraysJap.Months];
    }
  };

  render() {
    const { classes } = this.props;
    const {
      season,
      seasons,
      year,
      years,
      month,
      months,
      day,
      days,
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
              ? 'トレーニング計画追加'
              : 'Add Daily Program'}
          </Typography>
          <br />
          <Toolbar>
            <div className={classes.grow}>
              <TextField
                style={{ width: 150,height: 35 }}
                // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? 'シーズン' : 'Season'}
                className={classes.textField}
                value={season}
                onChange={this.handleSeasonChange('season')}
                inputProps={{
                  style: {
                    fontSize: 14,
                    padding:10
                  }
                }}                
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
                  seasons.map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                style={{ width: 150,height: 35 }}
                // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? '年' : 'Year'}
                className={classes.textField}
                value={year}
                onChange={this.handleYearChange('year')}
                inputProps={{
                  style: {
                    fontSize: 14,
                    padding:10
                  }
                }}    
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
                {years &&
                  years.map((value, index) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                style={{ width: 150,height: 35 }}
                // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? '月' : 'Month'}
                className={classes.textField}
                value={month}
                onChange={this.handleMonthChange('month')}
                inputProps={{
                  style: {
                    fontSize: 14,
                    padding:10
                  }
                }} 
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
                {months &&
                  months.map(value => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                style={{ width: 150,height: 35 }}
                // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? '日' : 'Day'}
                className={classes.textField}
                value={day}
                onChange={this.handleDayChange('day')}
                inputProps={{
                  style: {
                    fontSize: 14,
                    padding:10
                  }
                }} 
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
                {days &&
                  days.map(value => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
              </TextField>
              <br />
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
              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  paddingTop: 30
                }}
              >
                {this.renderTextFieldSided(12, 14)}
                {this.renderSelectTextField(14, 17,true)}
              </Grid>
              <Grid
                item
                xs={2}
                container
                justify="flex-start"
                style={{
                  paddingTop: 30
                }}
              >
                {fields.slice(0, 6).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.monthlyFields[index];
                  return (
                    <div key={index} style={{ width: '100%', margin: 14 }}>
                      <Typography
                        style={{ fontSize: 14 }}
                        noWrap
                        variant="subtitle2"
                      >
                        {label}
                      </Typography>
                    </div>
                  );
                })}
              </Grid>

              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  paddingTop: 30
                }}
              >
                {this.renderSelectTextField(0, 4)}
                {this.renderTextField(4, 6)}
              </Grid>

              <Grid
                item
                xs={2}
                container
                justify="flex-start"
                style={{
                  paddingTop: 30
                }}
              >
                {fields.slice(6, 12).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.monthlyFields[6 + index];
                  return (
                    <div key={index} style={{ width: '100%', margin: 14 }}>
                      <Typography
                        style={{ fontSize: 14 }}
                        noWrap
                        variant="subtitle2"
                      >
                        {label}
                      </Typography>
                    </div>
                  );
                })}
              </Grid>

              <Grid
                item
                xs
                container
                justify="center"
                style={{ paddingTop: 30 }}
              >
                {this.renderSelectTextField(6, 7)}
                {this.renderTextField(7, 8)}
                {this.renderSelectTextField(8, 12)}
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
    seasons: state.monthlyReducer.seasons || [],
    years: state.monthlyReducer.years || [],
    months: state.monthlyReducer.months || [],
    days: state.monthlyReducer.days || [],
    playerInformation: state.monthlyReducer.playerInformation || {},
    dropDownObj: state.dropDownReducer.dropDowns,
    language: state.dropDownReducer.language || 'English'
  });

const mapDispatchToProps = dispatch => ({
  getSeasons: playerInfo => dispatch(getSeasons(playerInfo)),
  selectSeason: (object, playerInfo) =>
    dispatch(selectSeason(object, playerInfo)),
  selectYear: (object, playerInfo) => dispatch(selectYear(object, playerInfo)),
  selectMonth: (object, playerInfo) =>
    dispatch(selectMonth(object, playerInfo)),
  selectDay: (object, playerInfo) => dispatch(selectDay(object, playerInfo)),
  getDropDowns: playerInfo => dispatch(getDropDowns(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
