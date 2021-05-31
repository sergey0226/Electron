/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prefer-destructuring */
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
import TextField from '@material-ui/core/TextField';
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
import TextFieldNew from '../constants/TextInput';
import {
  selectCategory,
  selectPlayer,
  selectConvention,
  selectDate
} from '../actions/gameReportActions';
import { getDropDowns } from '../actions/dropDownActions';

import SnackBar from '../components/SnackBar/SnackBar';
import Doc from '../constants/DocService';

import * as arrays from '../constants/dropDowns';
import * as arraysJap from '../constants/dropDownsJap';
import * as fieldsArray from '../constants/textFields';
import * as fieldsArrayJap from '../constants/textFieldsJap';

const bodyRef = React.createRef();

let totalSUC = 0;
let totalUNSUC = 0;

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

const fields = [...fieldsArray.gameReportFields];
const eyeFields = ['Convention Name'];

let Categories = [...arrays.Category];
let ConventionName = [...arrays.ConventionName];

let optionTextFields = ['Option'];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'Select',

      player: 'Select',
      players: [],
      convention: 'Select',
      conventions: [],
      date: 'Select',
      dates: [],

      playerInformation: {
        'Goal(Score)SUCCCESS': 0,
        Playedtime: 0,
        RedCard: 0,
        StartingMember: 0,
        YellowCard: 0
      },
      language: 'English',

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

  componentDidMount() {
    this.setState({
      language: this.props.language
    });
  }

  componentWillReceiveProps(nextProps) {
    const obj = nextProps.dropDownObj;
    this.setState({
      players: nextProps.players,
      conventions: nextProps.conventions,
      dates: nextProps.dates,
      playerInformation: nextProps.playerInformation,
      language: nextProps.language
    });
    if (this.state.language !== nextProps.language) {
      this.changeLang(nextProps.language);
    }
    if (obj) {
      Categories = obj.Category ? obj.Category : Categories;
      ConventionName = obj.ConventionName ? obj.ConventionName : ConventionName;
    }
  }

  componentWillUnmount() {
    const { playerInfo } = this.state;

    this.props.selectCategory(
      { event: { target: { value: 'Select' } } },
      playerInfo
    );
  }

  handleGameDateChange = name => (event, value) => {
    const { playerInformation, playerKey, convention, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      value,
      playerInformation,
      playerKey,
      convention
    };

    this.props.selectDate(object, playerInfo);
    this.setState({
      [newVal]: event.target.value
    });
  };

  handleSelectConvention = name => (event, value) => {
    const { playerInformation, category, playerKey, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      value,
      playerInformation,
      category,
      playerKey
    };

    this.props.selectConvention(object, playerInfo);
    this.setState({
      [newVal]: event.target.value,
      date: 'Select'
    });
  };

  handleSelectPlayer = name => (event, value) => {
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
      convention: 'Select',
      date: 'Select',
      playerKey: value.key
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
      player: 'Select',
      convention: 'Select',
      date: 'Select'
    });
  };

  renderDatePicker = (testNo, cssClass) => {
    const { playerInformation, language } = this.state;
    const { classes } = this.props;
    testNo = testNo.replace(/[./" "]/g, '');
    const date = playerInformation[testNo];
    const label = language === 'Japanese' ? '日付' : testNo;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="picker">
          <InlineDatePicker
            style={
              cssClass
                ? { marginTop: -15, marginBottom: -15 }
                : { height: 45, width: 200, marginTop: 3, marginLeft: 3 }
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

  renderTextField = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.gameReportFields[from + index];
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
            height:40
          }}
          fullWidth
          id="outlined-email-input"
          // label={label}
          className={classes.textField}
          name={title}
          value={`${value}`}
          onChange={this.handleFieldChange(newVal)}
          margin="dense"
          variant="outlined"
          inputProps={{
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

  renderTextField2 = (from, to, keyWord) => {
    const { classes } = this.props;
    const { playerInformation } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const newVal = (title + keyWord).replace(/[./" "]/g, '');

      let value = '';
      if (playerInformation) {
        if (playerInformation[newVal] !== undefined) {
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
            height:41
          }}          
          fullWidth
          type="number"
          id="outlined-email-input"
          // label={title}
          placeholder="0"
          className={classes.textField}
          name={title}
          value={`${value}`}
          onChange={this.handleFieldChange2(newVal)}
          margin="dense"
          variant="outlined"
          inputProps={{
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

  renderTextField3 = scoreOf => {
    const { classes } = this.props;
    const { playerInformation } = this.state;

    let value = 0;

    switch (scoreOf) {
      case 'GOAL': {
        value = playerInformation['Goal(Score)SUCCCESS'];
        break;
      }
      case 'SUCCCESS': {
        value = totalSUC;
        break;
      }
      case 'UNSUCCESS': {
        value = totalUNSUC;
        break;
      }
      case 'INVPLAY': {
        value = totalSUC + totalUNSUC;
        break;
      }
      default: {
        return;
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
        type="number"
        fullWidth
        id="outlined-email-input"
        // label={title}
        // name={val.title}
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

  renderSelectTextField = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return eyeFields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.gameReportFields[from + index];
      const newVal = title.replace(/[./" "]/g, '');
      let value = null;
      if (playerInformation[newVal] != undefined) {
        value = playerInformation[newVal];
      } else {
        value = '';
      }
      return (
        <TextFieldNew
          style={{
            width: 250,
            height: 45
          }}
          key={index}
          select
          // fullWidth
          // placeholder="0"
          id="outlined-email-input"
          label={label}
          className={classes.textField}
          onChange={this.handleFieldChange(title)}
          name={title}
          margin="dense"
          variant="outlined"
          value={value}
          InputProps={this.renderEye(title)}
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
        </TextFieldNew>
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
    const { playerInformation } = this.state;

    let sum = 0;
    for (const key in playerInformation) {
      if (key.includes(averageOf)) {
        sum += Number(playerInformation[key]);
      }
    }

    if (isNaN(sum)) {
      return `${0.0}`;
    }

    sum = Number(sum.toFixed(2));

    switch (averageOf) {
      case 'SUCCCESS': {
        totalSUC = sum;
        break;
      }
      case 'UNSUCCESS': {
        totalUNSUC = sum;
        break;
      }
      default: {
        break;
      }
    }

    return `${sum.toFixed(2)}`;
  };

  saveChanges = val => {
    const { optionText } = this.state;
    const newVal = val.replace(/[./" "]/g, '');
    if (newVal === 'ConventionName') {
      optionTextFields.map((value, index) =>
        ConventionName.push(optionText[index])
      );
    }

    this.setState({ open: false, optionText: [] });
    optionTextFields = optionTextFields.slice(0, 1);
  };

  selectMenu = val => {
    const newVal = val.replace(/[./" "]/g, '');
    if (newVal === 'ConventionName') {
      return ConventionName.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => ConventionName.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
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

  saveData = () => {
    let { playerInformation, players, playerInfo } = this.state;

    playerInformation = {
      ...playerInformation,
      totalSUC,
      totalUNSUC
    };

    let dropDowns = {
      ConventionName,
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

    if (playerInformation.second_id) {
      playerInfo.update(
        { _id: playerInformation._id },
        playerInformation,
        {},
        (err, numReplaced) => {
          this.setState({
            category: 'Select',
            player: 'Select',
            convention: 'Select',
            date: 'Select',
            openSnack: true
          });

          this.props.selectCategory(
            { event: { target: { value: 'Select' } } },
            playerInfo
          );
        }
      );
    } else {
      const fileName = 'gameReport1';
      const second_id = playerInformation._id;
      delete playerInformation._id;
      playerInformation = {
        ...playerInformation,
        second_id,
        fileName
      };
      playerInfo.insert(playerInformation, (err, docs) => {
        this.props.selectCategory(
          { event: { target: { value: 'Select' } } },
          playerInfo
        );

        this.setState({
          category: 'Select',
          player: 'Select',
          convention: 'Select',
          date: 'Select',
          openSnack: true
        });
      });
    }
  };

  createPdf = () => {
    const html = bodyRef.current;
    Doc.createPdf(html);
  };

  changeLang = lang => {
    if (lang === 'English') {
      ConventionName = [...arrays.ConventionName];
    }
    if (lang === 'Japanese') {
      ConventionName = [...arraysJap.ConventionName];
    }
  };

  render() {
    const { classes } = this.props;
    const {
      category,
      player,
      players,
      convention,
      conventions,
      date,
      dates,
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
            {language === 'Japanese' ? '選手情報' : 'Player Information'}
          </Typography>
          <br />
          <Toolbar>
            <div className={classes.grow}>
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
                style={{ width: 230 }}
                // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? '選手' : 'Player'}
                className={classes.textField}
                value={player}
                onChange={this.handleSelectPlayer('player')}
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
                  players.map((value, index) => (
                    <MenuItem key={value._id} value={value.title}>
                      {value.title}
                    </MenuItem>
                  ))}
              </TextFieldNew>
              <TextFieldNew
                style={{ width: 200 }}
                // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? '大会名' : 'Convention'}
                className={classes.textField}
                value={convention}
                onChange={this.handleSelectConvention('convention')}
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
                <MenuItem value="New">
                  {language === 'Japanese' ? '新規' : 'New'}
                </MenuItem>
                {conventions &&
                  conventions.map((value, index) => (
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
                label={language === 'Japanese' ? '日付' : 'Date'}
                className={classes.textField}
                value={date}
                onChange={this.handleGameDateChange('date')}
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
              </TextFieldNew>
              <br />
              {this.renderSelectTextField(0, 1)}
              {this.renderDatePicker('Game Date')}
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
                justify="flex-start"
                style={{
                  paddingTop: 30
                }}
              >
                {fields.slice(1, 4).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.gameReportFields[1 + index];
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
                {this.renderTextField(1, 3)}
                {this.renderTextField2(3, 4, '')}
              </Grid>

              <Grid
                item
                xs
                container
                justify="flex-start"
                style={{
                  paddingTop: 30
                }}
              >
                {fields.slice(4, 7).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.gameReportFields[4 + index];
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
                {this.renderTextField2(4, 7, '')}
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
              <Grid item xs container justify="flex-start">
                <Typography
                  noWrap
                  variant="subtitle2"
                  className={classes.headings2}
                  style={{ paddingTop: 22, color: 'blue', marginLeft: 14 }}
                >
                  {language === 'Japanese' ? '成功したプレイ' : 'SUCCESS PLAY'}
                </Typography>
                {fields.slice(7, 25).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.gameReportFields[7 + index];
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
                <Typography
                  style={{ fontSize: 14, marginLeft: 14 }}
                  noWrap
                  variant="subtitle2"
                >
                  {language === 'Japanese' ? '合計' : 'Total'}
                </Typography>
              </Grid>

              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  borderRight: '3px solid rgba(26, 43, 117, 1)',
                  paddingTop: 80,
                  paddingRight: 20
                }}
              >
                {this.renderTextField2(7, 25, 'SUCCCESS')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('SUCCCESS')}
                </Typography>
              </Grid>

              <Grid item xs container justify="flex-start">
                <Typography
                  noWrap
                  variant="subtitle2"
                  className={classes.headings2}
                  style={{ paddingTop: 22, color: 'red', marginLeft: 14 }}
                >
                  {language === 'Japanese'
                    ? '失敗したプレイ'
                    : 'UNSUCCESS PLAY'}
                </Typography>
                {fields.slice(25, 33).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.gameReportFields[25 + index];
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
                <Typography
                  style={{ fontSize: 14, marginLeft: 14 }}
                  noWrap
                  variant="subtitle2"
                >
                  {language === 'Japanese' ? '合計' : 'Total'}
                </Typography>
              </Grid>

              <Grid
                item
                xs
                container
                justify="center"
                style={{ paddingTop: 80 }}
              >
                {this.renderTextField2(25, 33, 'UNSUCCESS')}
                <Typography style={{ color: 'red' }} noWrap variant="subtitle2">
                  {this.renderAverge('UNSUCCESS')}
                </Typography>
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
              <Grid item xs container justify="flex-start">
                <Typography
                  noWrap
                  variant="subtitle2"
                  className={classes.headings2}
                  style={{ paddingTop: 22, color: 'green', marginLeft: 14 }}
                >
                  {language === 'Japanese' ? 'シーズン合計' : 'SEASON TOTAL'}
                </Typography>
                {fields.slice(33, 35).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.gameReportFields[33 + index];
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
                  paddingTop: 80
                }}
              >
                {this.renderTextField3('GOAL')}
                {this.renderTextField3('SUCCCESS')}
              </Grid>

              <Grid
                item
                xs
                container
                justify="flex-start"
                style={{
                  paddingTop: 80
                }}
              >
                {fields.slice(35, 37).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.gameReportFields[35 + index];
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
                style={{ paddingTop: 80 }}
              >
                {this.renderTextField3('UNSUCCESS')}
                {this.renderTextField3('INVPLAY')}
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
    players: state.gameReportReducer.players || [],
    conventions: state.gameReportReducer.conventions || [],
    dates: state.gameReportReducer.dates || [],
    playerInformation: state.gameReportReducer.playerInformation || {
      'Goal(Score)SUCCCESS': 0,
      Playedtime: 0,
      RedCard: 0,
      StartingMember: 0,
      YellowCard: 0
    },
    dropDownObj: state.dropDownReducer.dropDowns,
    language: state.dropDownReducer.language || 'English'
  });

const mapDispatchToProps = dispatch => ({
  selectCategory: (object, playerInfo) =>
    dispatch(selectCategory(object, playerInfo)),
  selectPlayer: (object, playerInfo) =>
    dispatch(selectPlayer(object, playerInfo)),
  selectConvention: (object, playerInfo) =>
    dispatch(selectConvention(object, playerInfo)),
  selectDate: (object, playerInfo) => dispatch(selectDate(object, playerInfo)),
  getDropDowns: playerInfo => dispatch(getDropDowns(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
