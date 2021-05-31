/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable new-cap */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-param-reassign */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable global-require */
// @flow
import React, { Component } from 'react';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonBase from '@material-ui/core/ButtonBase';
// import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import DelIcon from '@material-ui/icons/DeleteOutline';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import ZoomIcon from '@material-ui/icons/ZoomInOutlined';
import UploadIcon from '@material-ui/icons/CloudUploadOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';

import { connect } from 'react-redux';
import TextField from '../constants/TextInput';
import InlineDatePicker from '../constants/InlineDatePicker';
import { getDates, selectDate, selectTheme } from '../actions/dailyProgActions';
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
    display:'flex',
    flexDirection:"row",
    width:'100%',
    flexWrap:'wrap',
    flexGrow: 1
  },

  button: {
    margin: -5
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
    margin: '10px 0px 0px 0px'
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

const fields = [...fieldsArray.dailyProgFields];
const eyeFields = [
  'Main Theme',
  'Physical',
  'Technical',
  'Tactical',
  'Grand',
  'Coach Name',
  'Ph.Coach Name',
  'Season'
];

let MainThemes = [...arrays.MainThemes];
let Physical = [...arrays.Physical];
let Technical = [...arrays.Technical];
let Tactical = [...arrays.Tactical];
let Grand = [...arrays.Grand];
let CoachName = [...arrays.CoachName];
let PhCoachName = [...arrays.PhCoachName];
let Season = [...arrays.Season];

const Hour = ['Select', ...Array(24).keys()];
const Minute = ['Select', ...Array(60).keys()];

const NoofPlayers = ['Select', ...Array(31).keys()];
const Absentese = ['Select', ...Array(31).keys()];

let optionTextFields = ['Option'];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: 'Select',
      dates: [],

      MainTheme: 'Select',

      language: 'English',
      playerInformation: {},

      open: false,
      openPhoto: false,
      dialogValue: '',
      dialogLabel: '',
      optionText: [],

      openSnack: false
    };
  }

  componentWillMount() {
    const { playerInfo } = this.props;
    this.setState({
      playerInfo
    });
    this.props.getDates(playerInfo);
    this.props.getDropDowns(playerInfo);
  }

  componentWillReceiveProps(nextProps) {
    const obj = nextProps.dropDownObj;
    this.setState({
      dates: nextProps.dates,
      playerInformation: nextProps.playerInformation,
      language: nextProps.language
    });

    if (obj) {
      Physical = obj.Physical ? obj.Physical : Physical;
      Technical = obj.Technical ? obj.Technical : Technical;
      Tactical = obj.Tactical ? obj.Tactical : Tactical;
      Grand = obj.Grand ? obj.Grand : Grand;
      CoachName = obj.CoachName ? obj.CoachName : CoachName;
      PhCoachName = obj.PhCoachName ? obj.PhCoachName : PhCoachName;
      Season = obj.Season ? obj.Season : Season;
    }
    MainThemes = nextProps.MainThemes;
  }

  componentWillUnmount() {
    const { playerInfo } = this.state;

    this.props.selectDate(
      { event: { target: { value: 'Select' } } },
      playerInfo,
      MainThemes
    );
  }

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

  openDialog = (val, label) => {
    this.setState({ open: true, dialogValue: val, dialogLabel: label });
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
      optionTextFields.map((value, index) =>
        MainThemes.push(optionText[index])
      );
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
    if (newVal === 'CoachName') {
      optionTextFields.map((value, index) => CoachName.push(optionText[index]));
    }
    if (newVal === 'PhCoachName') {
      optionTextFields.map((value, index) =>
        PhCoachName.push(optionText[index])
      );
    }
    if (newVal === 'Season') {
      optionTextFields.map((value, index) => Season.push(optionText[index]));
    }

    this.setState({ open: false, optionText: [] });
    optionTextFields = optionTextFields.slice(0, 1);
  };

  selectMenu = val => {
    const newVal = val.replace(/[./" "]/g, '');

    if (newVal === 'MainThemes') {
      return MainThemes.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => MainThemes.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'TrStartTimeHour' || newVal === 'TrFinishTimeHour') {
      return Hour.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
        </MenuItem>
      ));
    }
    if (newVal === 'TrFinishTimeMinute' || newVal === 'TrStartTimeMinute') {
      return Minute.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
        </MenuItem>
      ));
    }
    if (newVal === 'NoofPlayers') {
      return NoofPlayers.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
        </MenuItem>
      ));
    }
    if (newVal === 'Absentese') {
      return Absentese.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
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
    if (newVal === 'CoachName') {
      return CoachName.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => CoachName.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'PhCoachName') {
      return PhCoachName.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => PhCoachName.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Season') {
      return Season.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Season.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
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
                  // size="small"
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
                  // size="small"
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

  handleFieldChange = name => event => {
    const newVal = name.replace(/[./" "]/g, '');
    const { value } = event.target;
    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [newVal]: value
      }
    }));
  };

  handleThemeChange = name => (event, value) => {
    const { playerInformation, date, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const themeObject = {
      event,
      value,
      playerInformation,
      date
    };

    this.props.selectTheme(playerInfo, themeObject);
    this.setState({
      [newVal]: event.target.value
    });
  };

  handleTrainingDateChange = name => (event, value) => {
    const { playerInformation, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      value,
      playerInformation
    };

    this.props.selectDate(object, playerInfo, MainThemes);
    this.setState({
      [newVal]: event.target.value,
      MainTheme: 'Select'
    });
  };

  handleDateChange = testNo => date => {
    testNo = testNo.replace(/[./" "]/g, '');
    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [testNo]: date
      }
    }));
  };

  renderDatePicker = (testNo, cssClass) => {
    const { playerInformation, language } = this.state;
    const { classes } = this.props;

    testNo = testNo.replace(/[./" "]/g, '');
    const date = playerInformation[testNo];
    const label =
      language === 'Japanese' ? 'トレーニング日付' : 'Training Date';

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="picker">
          <InlineDatePicker
            style={{
              margin: 5,
              height: 41
            }}
            keyboard
            clearable
            disableFuture
            variant="outlined"
            label={label}
            format="dd/MM/yyyy"
            value={date}
            onChange={this.handleDateChange(testNo)}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            // className={classes.headings}
            // autoOk={false}
            // views={['year', 'month', 'day']}
          />
        </div>
      </MuiPickersUtilsProvider>
    );
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

  renderSelectTextField = (from, to, fieldName) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.dailyProgFields[from + index];
      const newVal = (title + fieldName).replace(/[./" "]/g, '');

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
          label={label}
          className={classes.textField}
          onChange={this.handleFieldChange2(newVal)}
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
          {this.selectMenu(newVal)}
        </TextField>
      );
    });
  };

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

  handlePhotoClose = () => {
    this.setState({ openPhoto: false });
  };

  openPhotoDialog = (image, name) => {
    this.setState({ openPhoto: true, tempImage: image, tempName: name });
  };

  renderPhotoDialog = () => {
    const { classes } = this.props;
    const { openPhoto, tempImage, tempName, language } = this.state;
    return (
      <Dialog
        open={openPhoto}
        onClose={this.handlePhotoClose}
        // fullWidth
        maxWidth="lg"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{tempName}</DialogTitle>
        <DialogContent
          style={{
            borderTop: `1px solid rgb(207, 211, 228)`,
            paddingTop: 20
          }}
        >
          <img
            src={tempImage || require('../assets/images/step.png')}
            alt="Player"
            style={{ height: '100%', width: '100%' }}
            className={classes.media}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handlePhotoClose} color="secondary">
            {language === 'Japanese' ? '閉じる' : 'Close'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  renderImgDscrpt = title => {
    const { playerInformation } = this.state;
    const { classes } = this.props;

    const newVal = title.replace(/[./" "]/g, '');

    return (
      <Grid
        spacing={24}
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginBottom: 20 }}
      >
        <Grid item xs={4} container justify="flex-start">
          <Typography noWrap variant="h6">
            {title}
          </Typography>
          <input
            accept="image/*"
            className={classes.input}
            id={`${newVal}Image`}
            multiple
            type="file"
            onChange={this.handleImageChange(`${newVal}Image`)}
          />

          <ButtonBase
            component="span"
            focusRipple
            className={classes.image}
            style={{ width: '100%' }}
          >
            <img
              src={
                playerInformation[`${newVal}Image`]
                  ? playerInformation[`${newVal}Image`]
                  : require('../assets/images/step.png')
              }
              alt="Add Player"
              style={{ height: '100%', width: '100%' }}
              className={classes.media}
            />
            <ZoomIcon
              onClick={() =>
                this.openPhotoDialog(playerInformation[`${newVal}Image`], title)
              }
              style={{
                fontSize: 40,
                position: 'absolute',
                right: 0,
                top: 0,
                color: 'white',
                background: 'red'
              }}
            />
            <label htmlFor={`${newVal}Image`}>
              <UploadIcon
                style={{
                  fontSize: 40,
                  padding: 5,
                  position: 'absolute',
                  right: 0,
                  top: 40,
                  color: 'white',
                  background: 'red'
                }}
              />
            </label>
          </ButtonBase>
        </Grid>
        <Grid item xs container justify="center">
          <TextField
            style={{ margin: '0px 0px -30px 0px' }}
            fullWidth
            id="outlined-multiline-flexible"
            label={this.state.language === 'English' ? `Description` : '説明'}
            value={
              playerInformation &&
              (playerInformation[`${newVal}Decript`]
                ? playerInformation[`${newVal}Decript`]
                : '')
            }
            onChange={this.handleFieldChange(`${newVal}Decript`)}
            multiline
            rows="7"
            rowsMax="7"
            variant="outlined"
          />
        </Grid>
      </Grid>
    );
  };

  saveData = () => {
    let { playerInformation, MainTheme, playerInfo } = this.state;

    const date = playerInformation.TrainingDate;
    const newDate = `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()}`;

    playerInformation = {
      ...playerInformation,
      Date: newDate,
      MainTheme,
      fileName: 'dailyProgram'
    };

    let dropDowns = {
      Physical,
      Technical,
      Tactical,
      Grand,
      CoachName,
      PhCoachName,
      Season,
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
          this.props.getDates(playerInfo);

          this.setState({
            date: 'Select',
            MainTheme: 'Select',
            openSnack: true
          });
        });
      } else {
        await playerInfo.update(
          { _id: playerInformation._id },
          playerInformation,
          {},
          (err, numReplaced) => {
            this.props.getDates(playerInfo);
            this.setState({
              date: 'Select',
              MainTheme: 'Select',
              openSnack: true
            });
          }
        );
      }
    });
  };

  createPdf = () => {
    const html = bodyRef.current;
    Doc.createPdf(html);
  };

  render() {
    const { classes } = this.props;
    const { dates, date, playerInformation, MainTheme, language } = this.state;
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
              ? 'トレーニングプランナー'
              : 'Daily Training Program'}
          </Typography>
          <br />
          <Toolbar>
            <div className={classes.grow}>
              <TextField
                style={{ width: 200 }}
                // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? '日付' : 'Date'}
                className={classes.textField}
                value={date}
                onChange={this.handleTrainingDateChange('date')}
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
                {dates &&
                  dates.map(value => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                style={{ width: 300, height: 50 }}
                // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? 'メインテーマ' : 'Main Theme'}
                className={classes.textField}
                value={MainTheme}
                onChange={this.handleThemeChange('MainTheme')}
                InputProps={this.renderEye('Main Theme')}
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
                {this.selectMenu('MainThemes')}
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
              <Grid
                item
                xs={3}
                container
                justify="flex-start"
                style={{ marginTop: 30 }}
              >
                {this.renderDatePicker('Training Date', true)}
                {this.renderSelectTextField(11, 12, '')}
              </Grid>

              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? '時' : 'Hour'}
                </Typography>
                {this.renderSelectTextField(1, 2, 'Hour')}
                {this.renderSelectTextField(2, 3, 'Hour')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography variant="subtitle2" className={classes.headings2}>
                  {language === 'Japanese' ? '分' : 'Minute'}
                </Typography>
                {this.renderSelectTextField(1, 2, 'Minute')}
                {this.renderSelectTextField(2, 3, 'Minute')}
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{ marginTop: 30 }}
              >
                {this.renderSelectTextField(3, 5, '')}
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{ marginTop: 30 }}
              >
                {this.renderSelectTextField(5, 8, '')}
              </Grid>
              <Grid
                item
                xs
                container
                justify="center"
                style={{ marginTop: 30 }}
              >
                {this.renderSelectTextField(8, 11, '')}
              </Grid>
            </Grid>
          </div>

          <Typography className={classes.commentTypo} variant="subtitle2">
            {language === 'English' ? `Explanation` : '説明'}
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
                style={{ margin: '0px 0px 0px -1px' }}
                value={
                  playerInformation &&
                  (playerInformation.Explanation
                    ? playerInformation.Explanation
                    : '')
                }
                onChange={this.handleFieldChange('Explanation')}
                fullWidth
                id="outlined-multiline-flexible"
                label={language === 'Japanese' ? 'コメント' : 'Comments'}
                multiline
                rows="4"
                rowsMax="4"
                margin="dense"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <br />
          <div>
            {this.renderImgDscrpt('WUP')}
            {this.renderImgDscrpt('TR1')}
            {this.renderImgDscrpt('TR2')}
            {this.renderImgDscrpt('TR3 or SSG')}
          </div>
          <Typography className={classes.commentTypo} variant="subtitle2">
            {language === 'English' ? `Key Factors` : 'キーファクタ'}
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
                style={{ margin: '0px 0px 0px -1px' }}
                value={
                  playerInformation &&
                  (playerInformation.KeyFactors
                    ? playerInformation.KeyFactors
                    : '')
                }
                onChange={this.handleFieldChange('KeyFactors')}
                fullWidth
                id="outlined-multiline-flexible"
                label={language === 'Japanese' ? 'コメント' : 'Comments'}
                multiline
                rows="4"
                rowsMax="4"
                margin="dense"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </div>
        {this.renderDialog()}
        {this.renderPhotoDialog()}
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
  dates: state.dailyProgReducer.dates,
  MainThemes: state.dailyProgReducer.MainThemes || MainThemes,
  playerInformation: state.dailyProgReducer.playerInformation || {},
  dropDownObj: state.dropDownReducer.dropDowns,
  language: state.dropDownReducer.language || 'English'
});

const mapDispatchToProps = dispatch => ({
  getDates: playerInfo => dispatch(getDates(playerInfo)),
  selectDate: (object, playerInfo, MainThemes) =>
    dispatch(selectDate(object, playerInfo, MainThemes)),
  selectTheme: (playerInfo, themeObject) =>
    dispatch(selectTheme(playerInfo, themeObject)),
  getDropDowns: playerInfo => dispatch(getDropDowns(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
