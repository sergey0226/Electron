/* eslint-disable arrow-body-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable global-require */
// @flow
import React, { Component } from 'react';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonBase from '@material-ui/core/ButtonBase';
// import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
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
import Close from '@material-ui/icons/Close';
import DelIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import InlineDatePicker from '../constants/InlineDatePicker';
import TextField from '../constants/TextInput';
import { selectCategory, selectTeam } from '../actions/memberInfoActions';
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

  headings: {
    borderBottom: '3px solid rgb(244, 0, 0)',
    margin: '15px 0px 15px 0px'
  },

  headings2: {
    // color: 'red',
    // borderBottom: '3px solid rgb(244, 0, 0)',
    margin: '15px 0px 15px 0px'
  },

  fab: {
    width: 35,
    height: 30,
    margin: 5,
    marginTop: 20
  }
});

const icons = [...fieldsArray.icons];

const fields = [...fieldsArray.memberInfoFields];
const eyeFields = [
  'Opposition',
  'Tournament',
  'Game No',

  'ManagerName1',
  'H.CoachName1',
  'A.CoachName1',
  'Ph.CoachName1',
  'Kitt ManagerName1',

  'ManagerName2',
  'H.CoachName2',
  'A.CoachName2',
  'Ph.CoachName2',
  'Kitt ManagerName2',

  'Remarks 1',
  'Remarks 2',
  'Remarks 3',
  'Remarks 4',
  'Remarks 5',

  'Venue'
];

let Categories = [...arrays.Category];

let Opposition = [...arrays.Opposition];
let Tournament = [...arrays.Tournament];
let GameNo = [...arrays.GameNo];
let Venue = [...arrays.Venue];

let ManagerName1 = [...arrays.ManagerName1];
let HCoachName1 = [...arrays.HCoachName1];
let ACoachName1 = [...arrays.ACoachName1];
let PhCoachName1 = [...arrays.PhCoachName1];
let KittManagerName1 = [...arrays.KittManagerName1];

let ManagerName2 = [...arrays.ManagerName2];
let HCoachName2 = [...arrays.HCoachName2];
let ACoachName2 = [...arrays.ACoachName2];
let PhCoachName2 = [...arrays.PhCoachName2];
let KittManagerName2 = [...arrays.KittManagerName2];

let Remarks1 = [...arrays.Remarks1];
let Remarks2 = [...arrays.Remarks2];
let Remarks3 = [...arrays.Remarks3];
let Remarks4 = [...arrays.Remarks4];
let Remarks5 = [...arrays.Remarks5];

let optionTextFields = ['Option'];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'Select',

      team: 'Select',
      teams: [],

      language: 'English',
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
    this.props.getDropDowns(playerInfo);
  }

  componentWillReceiveProps(nextProps) {
    const obj = nextProps.dropDownObj;
    this.setState({
      playerInformation: nextProps.playerInformation,
      teams: nextProps.teams,
      language: nextProps.language
    });

    if (obj) {
      Opposition = obj.Opposition ? obj.Opposition : Opposition;
      Tournament = obj.Tournament ? obj.Tournament : Tournament;
      GameNo = obj.GameNo ? obj.GameNo : GameNo;
      Venue = obj.Venue ? obj.Venue : Venue;
      ManagerName1 = obj.ManagerName1 ? obj.ManagerName1 : ManagerName1;
      HCoachName1 = obj.HCoachName1 ? obj.HCoachName1 : HCoachName1;
      ACoachName1 = obj.ACoachName1 ? obj.ACoachName1 : ACoachName1;
      PhCoachName1 = obj.PhCoachName1 ? obj.PhCoachName1 : PhCoachName1;
      KittManagerName1 = obj.KittManagerName1
        ? obj.KittManagerName1
        : KittManagerName1;
      ManagerName2 = obj.ManagerName2 ? obj.ManagerName2 : ManagerName2;
      HCoachName2 = obj.HCoachName2 ? obj.HCoachName2 : HCoachName2;
      ACoachName2 = obj.ACoachName2 ? obj.ACoachName2 : ACoachName2;
      PhCoachName2 = obj.PhCoachName2 ? obj.PhCoachName2 : PhCoachName2;
      KittManagerName2 = obj.KittManagerName2
        ? obj.KittManagerName2
        : KittManagerName2;
      Remarks1 = obj.Remarks1 ? obj.Remarks1 : Remarks1;
      Remarks2 = obj.Remarks2 ? obj.Remarks2 : Remarks2;
      Remarks3 = obj.Remarks3 ? obj.Remarks3 : Remarks3;
      Remarks4 = obj.Remarks4 ? obj.Remarks4 : Remarks4;
      Remarks5 = obj.Remarks5 ? obj.Remarks5 : Remarks5;
      Categories = obj.Category ? obj.Category : Categories;
    }
  }

  componentWillUnmount() {
    const { playerInfo } = this.state;

    this.props.selectCategory(
      { event: { target: { value: 'Select' } } },
      playerInfo
    );
  }

  handleSelectTeam = name => (event, value) => {
    const { playerInformation, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      value,
      playerInformation
    };

    this.props.selectTeam(object, playerInfo);
    this.setState({
      [newVal]: event.target.value
    });
  };

  handleCategoryChange = name => (event, value) => {
    const { playerInformation, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      playerInformation
    };

    this.props.selectCategory(object, playerInfo);
    this.setState({
      [newVal]: event.target.value,
      team: 'Select'
    });
  };

  renderDatePicker = (testNo, cssClass) => {
    const { playerInformation, language } = this.state;
    const { classes } = this.props;

    const date = playerInformation[testNo];
    const label = language === 'Japanese' ? '日付' : testNo;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="picker">
          <InlineDatePicker
            style={
              cssClass
                ? { marginTop: -15, marginBottom: -15 }
                : { height: 45, width: 200 }
            }
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

  handleDateChange = testNo => date => {
    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [testNo]: date
      }
    }));
  };

  renderTextField = (from, to, keyWord) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.memberInfoFields[from + index];
      const newVal = (title + keyWord).replace(/[./" "]/g, '');

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
            height: 40
          }}          
          fullWidth
          id="outlined-email-input"
          className={classes.textField}
          name={title}
          value={`${value}`}
          onChange={this.handleFieldChange(newVal)}
          margin="dense"
          variant="outlined"
          InputProps={{
            style:{
              fontSize: 14,
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

  renderSelectTextField = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.memberInfoFields[from + index];
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
            width: 300,
            height: 45
          }}
          key={index}
          select
          id="outlined-email-input"
          label={label}
          className={classes.textField}
          onChange={this.handleFieldChange(title)}
          name={title}
          margin="dense"
          variant="outlined"
          value={value}
          InputProps={this.renderEye(title, label)}
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
        >
          {this.selectMenu(title)}
        </TextField>
      );
    });
  };

  renderSelectTextFieldSided = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.memberInfoFields[from + index];
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
            width: 300,
            height: 45
          }}
          key={index}
          select
          id="outlined-email-input"
          label={label}
          className={classes.textField}
          onChange={this.handleFieldChange(title)}
          name={title}
          margin="dense"
          variant="outlined"
          value={value}
          InputProps={this.renderEye(title, label)}
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
        >
          {this.selectMenu(title)}
        </TextField>
      );
    });
  };

  renderSelectTextField2 = (from, to, selectedVal) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.memberInfoFields[from + index];
      const newVal = (title + selectedVal).replace(/[./" "]/g, '');
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
          className={classes.textField}
          onChange={this.handleFieldChange(newVal)}
          name={title}
          margin="dense"
          variant="outlined"
          value={value}
          InputProps={this.renderEye(title + selectedVal, label)}
          inputProps={{
            style: {
              fontSize: 15
            }
          }}
          InputLabelProps={{
            style: {
              fontSize: 14,
              padding:10
            }
          }}
        >
          {this.selectMenu(newVal)}
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
    if (newVal === 'Opposition') {
      return Opposition.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Opposition.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Tournament') {
      return Tournament.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Tournament.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'GameNo') {
      return GameNo.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => GameNo.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Venue') {
      return Venue.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Venue.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }

    if (newVal === 'ManagerName1') {
      return ManagerName1.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => ManagerName1.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }

    if (newVal === 'HCoachName1') {
      return HCoachName1.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => HCoachName1.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }

    if (newVal === 'ACoachName1') {
      return ACoachName1.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => ACoachName1.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }

    if (newVal === 'PhCoachName1') {
      return PhCoachName1.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => PhCoachName1.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }

    if (newVal === 'KittManagerName1') {
      return KittManagerName1.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => KittManagerName1.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }

    if (newVal === 'ManagerName2') {
      return ManagerName2.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => ManagerName2.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }

    if (newVal === 'HCoachName2') {
      return HCoachName2.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => HCoachName2.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }

    if (newVal === 'ACoachName2') {
      return ACoachName2.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => ACoachName2.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }

    if (newVal === 'PhCoachName2') {
      return PhCoachName2.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => PhCoachName2.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }

    if (newVal === 'KittManagerName2') {
      return KittManagerName2.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => KittManagerName2.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }

    if (newVal === 'Remarks1') {
      return Remarks1.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Remarks1.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Remarks2') {
      return Remarks2.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Remarks2.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Remarks3') {
      return Remarks3.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Remarks3.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Remarks4') {
      return Remarks4.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Remarks4.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Remarks5') {
      return Remarks5.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Remarks5.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
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
                  <Close />
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
    if (newVal === 'Opposition') {
      optionTextFields.map((value, index) =>
        Opposition.push(optionText[index])
      );
    }
    if (newVal === 'Tournament') {
      optionTextFields.map((value, index) =>
        Tournament.push(optionText[index])
      );
    }
    if (newVal === 'GameNo') {
      optionTextFields.map((value, index) => GameNo.push(optionText[index]));
    }
    if (newVal === 'Venue') {
      optionTextFields.map((value, index) => Venue.push(optionText[index]));
    }

    if (newVal === 'ManagerName1') {
      optionTextFields.map((value, index) =>
        ManagerName1.push(optionText[index])
      );
    }
    if (newVal === 'HCoachName1') {
      optionTextFields.map((value, index) =>
        HCoachName1.push(optionText[index])
      );
    }
    if (newVal === 'ACoachName1') {
      optionTextFields.map((value, index) =>
        ACoachName1.push(optionText[index])
      );
    }
    if (newVal === 'PhCoachName1') {
      optionTextFields.map((value, index) =>
        PhCoachName1.push(optionText[index])
      );
    }
    if (newVal === 'KittManagerName1') {
      optionTextFields.map((value, index) =>
        KittManagerName1.push(optionText[index])
      );
    }

    if (newVal === 'ManagerName2') {
      optionTextFields.map((value, index) =>
        ManagerName2.push(optionText[index])
      );
    }
    if (newVal === 'HCoachName2') {
      optionTextFields.map((value, index) =>
        HCoachName2.push(optionText[index])
      );
    }
    if (newVal === 'ACoachName2') {
      optionTextFields.map((value, index) =>
        ACoachName2.push(optionText[index])
      );
    }
    if (newVal === 'PhCoachName2') {
      optionTextFields.map((value, index) =>
        PhCoachName2.push(optionText[index])
      );
    }
    if (newVal === 'KittManagerName2') {
      optionTextFields.map((value, index) =>
        KittManagerName2.push(optionText[index])
      );
    }

    if (newVal === 'Remarks1') {
      optionTextFields.map((value, index) => Remarks1.push(optionText[index]));
    }
    if (newVal === 'Remarks2') {
      optionTextFields.map((value, index) => Remarks2.push(optionText[index]));
    }
    if (newVal === 'Remarks3') {
      optionTextFields.map((value, index) => Remarks3.push(optionText[index]));
    }
    if (newVal === 'Remarks4') {
      optionTextFields.map((value, index) => Remarks4.push(optionText[index]));
    }
    if (newVal === 'Remarks5') {
      optionTextFields.map((value, index) => Remarks5.push(optionText[index]));
    }

    this.setState({ open: false, optionText: [] });
    optionTextFields = optionTextFields.slice(0, 1);
  };

  saveData = () => {
    let { playerInformation, team, playerInfo } = this.state;

    playerInformation = {
      ...playerInformation,
      TeamName: team,
      fileName: 'memberInfo'
    };

    let dropDowns = {
      Opposition,
      Tournament,
      GameNo,
      Venue,
      ManagerName1,
      HCoachName1,
      ACoachName1,
      PhCoachName1,
      KittManagerName1,
      ManagerName2,
      HCoachName2,
      ACoachName2,
      PhCoachName2,
      KittManagerName2,
      Remarks1,
      Remarks2,
      Remarks3,
      Remarks4,
      Remarks5,
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
          this.props.selectCategory(
            { event: { target: { value: 'Select' } } },
            playerInfo
          );
          this.setState({
            category: 'Select',
            team: 'Select',
            openSnack: true
          });
        });
      } else {
        await playerInfo.update(
          { _id: playerInformation._id },
          playerInformation,
          {},
          (err, numReplaced) => {
            this.setState({
              category: 'Select',
              team: 'Select',
              openSnack: true
            });

            this.props.selectCategory(
              { event: { target: { value: 'Select' } } },
              playerInfo
            );
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
    const { category, team, teams, language } = this.state;
    const func = [
      () => this.saveData(),
      /* () => window.print(), */
      () => this.createPdf()
    ];

    return (
      <div className={classes.root} id="divToPrint" ref={bodyRef}>
        <div className={classes.innerRoot} elevation={1}>
          <Typography variant="h6" color="primary">
            {language === 'Japanese' ? '試合情報' : 'General Information'}
          </Typography>
          <br />
          <Toolbar>
            <div className={classes.grow}>
              <TextField
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
              </TextField>

              <TextField
                style={{ width: 150 }}
                // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? 'チーム' : 'Team'}
                className={classes.textField}
                value={team}
                onChange={this.handleSelectTeam('team')}
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
                {teams &&
                  teams.map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  ))}
              </TextField>
              <br />
              {this.renderSelectTextField(0, 1)}
              {this.renderSelectTextField(1, 2)}
              {this.renderSelectTextField(2, 3)}
              {this.renderSelectTextField(16, 17)}
              {this.renderDatePicker('GameDate')}
            </div>

            {
            icons.map((val,index)=>{
              if(val.title !== 'Pdf'){
                return (
                  <ButtonBase 
                    disableRipple 
                    key={val.title}
                    style={{
                      margin: 5
                    }}>
                  <span onClick={func[index]}>
                    <img src={val.image} alt={val.title} />
                    <Typography variant="subtitle2">
                      {val.title}
                    </Typography>
                  </span>
                </ButtonBase>
              )
              }
            })
            }
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
              <Grid item xs container justify="flex-start">
                <Typography
                  noWrap
                  variant="subtitle2"
                  className={classes.headings2}
                  style={{ paddingTop: 22, color: 'red', marginLeft: 14 }}
                >
                  {language === 'Japanese' ? '結果' : 'Result'}
                </Typography>
                {fields.slice(3, 6).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.memberInfoFields[3 + index];
                  return (
                    <div key={index} style={{ width: '100%', margin: 15 }}>
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
                  paddingTop: 80
                }}
              >
                {this.renderTextField(3, 6, 'MEMBERRESULT')}
              </Grid>

              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  paddingRight: 20,
                  marginTop: 80
                }}
              >
                {this.renderTextField(3, 6, 'MEMBERRESULT2')}
              </Grid>

              <Grid
                item
                xs
                container
                justify="flex-start"
                style={{
                  borderLeft: '3px solid rgba(26, 43, 117, 1)'
                }}
              >
                <Typography
                  noWrap
                  variant="subtitle2"
                  className={classes.headings2}
                  style={{ paddingTop: 22, color: 'red', marginLeft: 14 }}
                >
                  {language === 'Japanese' ? 'チームスタッフ' : 'TEAM STAFF'}
                </Typography>
                {fields.slice(6, 11).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.memberInfoFields[6 + index];
                  return (
                    <div key={index} style={{ width: '100%', margin: 15 }}>
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

              <Grid item xs container justify="center">
                <Typography
                  noWrap
                  variant="subtitle2"
                  className={classes.headings2}
                  style={{ paddingTop: 22, paddingBottom: 7 }}
                >
                  {language === 'Japanese' ? '名前 1' : 'Name 1'}
                </Typography>
                {this.renderSelectTextField2(6, 11, 'Name1')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  noWrap
                  variant="subtitle2"
                  className={classes.headings2}
                  style={{ paddingTop: 22, paddingBottom: 7 }}
                >
                  {language === 'Japanese' ? '名前 2' : 'Name 2'}
                </Typography>
                {this.renderSelectTextField2(6, 11, 'Name2')}
              </Grid>
            </Grid>
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
              <Grid item xs={6} container justify="flex-start">
                <Typography
                  noWrap
                  variant="subtitle2"
                  className={classes.headings2}
                  style={{
                    paddingTop: 22,
                    color: 'red',
                    marginLeft: 14,
                    width: '100%'
                  }}
                >
                  {language === 'Japanese' ? '備考' : 'REMARKS'}
                </Typography>

                <span style={{ marginLeft: 14 }}>
                  {this.renderSelectTextField2(11, 16, '')}
                </span>
              </Grid>

              <Grid item xs container justify="flex-start">
                <Typography
                  noWrap
                  variant="subtitle2"
                  className={classes.headings2}
                  style={{ paddingTop: 22, color: 'red', marginLeft: 14 }}
                >
                  {language === 'Japanese'
                    ? 'ユニフォームの色'
                    : 'UNIFORM COLOR'}
                </Typography>
                {fields.slice(17, 21).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.memberInfoFields[17 + index];
                  return (
                    <div key={index} style={{ width: '100%', margin: 15 }}>
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

              <Grid item xs container justify="center">
                <Typography
                  noWrap
                  variant="subtitle2"
                  className={classes.headings2}
                  style={{ paddingTop: 22, paddingBottom: 7 }}
                >
                  {language === 'Japanese' ? 'シャツ' : 'SHIRT'}
                </Typography>
                {this.renderTextField(17, 21, 'SHIRT')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  noWrap
                  variant="subtitle2"
                  className={classes.headings2}
                  style={{ paddingTop: 22, paddingBottom: 7 }}
                >
                  {language === 'Japanese' ? 'パンツ' : 'SHORTS'}
                </Typography>
                {this.renderTextField(17, 21, 'SHORTS')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  noWrap
                  variant="subtitle2"
                  className={classes.headings2}
                  style={{ paddingTop: 22, paddingBottom: 7 }}
                >
                  {language === 'Japanese' ? 'ストッキング' : 'STOCKINGS'}
                </Typography>
                {this.renderTextField(17, 21, 'STOCKINGS')}
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

const mapStateToProps = state => {
  return {
    playerInformation: state.memberInfoReducer.playerInformation || {},
    teams: state.memberInfoReducer.teams || [],
    dropDownObj: state.dropDownReducer.dropDowns,
    language: state.dropDownReducer.language || 'English'
  };
};

const mapDispatchToProps = dispatch => ({
  selectCategory: (object, playerInfo) =>
    dispatch(selectCategory(object, playerInfo)),
  selectTeam: (object, playerInfo) => dispatch(selectTeam(object, playerInfo)),
  getDropDowns: playerInfo => dispatch(getDropDowns(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
