/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prop-types */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable global-require */
// @flow
import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';

import {  MuiPickersUtilsProvider } from 'material-ui-pickers';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
// import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import DelIcon from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import InlineDatePicker from '../constants/InlineDatePicker';
import TextField from '../constants/TextInput';
import { getPlayers } from '../actions/playerInfoActions';
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

  button: {
    margin: -5
  },
  iconSmall: {
    fontSize: 40
  },

  card: {
    // maxWidth: 345
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover'
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 2,
    marginBottom: 6
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

  fab: {
    width: 35,
    height: 30,
    margin: 5,
    marginTop: 20
  },

  input: {
    display: 'none'
  },

  image: {
    position: 'relative',
    height: 340,
    width: 100
    // width: '100%'
  },
  imageSrc: {
    // width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
});

const icons = [...fieldsArray.icons3];

const fields = [...fieldsArray.playerInfoFields];
const eyeFields = [...fieldsArray.playerInfoEyeFields];

let JrClub = [...arrays.JrClub];
let JrYouthClub = [...arrays.JrYouthClub];
let Category = [...arrays.Category];
let Position = [...arrays.Position];
let BloodType = [...arrays.BloodType];
let Foot = [...arrays.Foot];
let JerseySizeUp = [...arrays.JerseySizeUp];
let JerseySize = [...arrays.JerseySize];

let optionTextFields = ['Option'];

const dates = ['Player Birthday', 'Date of Registration'];
const datesJap = ['誕生日', '登録年月日'];

const dummyObject = {
  PlayerBirthday: new Date(),
  DateofRegistration: new Date(),
  RehabilitationStartDate: new Date(),
  ReturnDate: new Date(),
  Scheduledtoreturn: new Date(),
  GameDate: new Date()
};

class PlayerInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dialogValue: '',
      dialogLabel: '',
      optionText: [],
      language: '',

      player: 'Select',
      snackMessage:"Data Saved Successfully!",
      playerInformation: dummyObject
    };
  }

  componentWillMount() {
    const { playerInfo } = this.props;
    this.setState({
      playerInfo
    });
    this.props.getPlayers(playerInfo);
    this.props.getDropDowns(playerInfo);
  }

  componentWillReceiveProps(nextProps) {
    const obj = nextProps.dropDownObj;
    this.setState({
      language: nextProps.language
    });
    if (this.state.language !== nextProps.language) {
      this.changeLang(nextProps.language);
    }
    if (obj) {
      JrClub = obj.JrClub ? obj.JrClub : JrClub;
      JrYouthClub = obj.JrYouthClub ? obj.JrYouthClub : JrYouthClub;
      Category = obj.Category ? obj.Category : Category;
      Position = obj.Position ? obj.Position : Position;
      Foot = obj.Foot ? obj.Foot : Foot;
      JerseySizeUp = obj.JerseySizeUp ? obj.JerseySizeUp : JerseySizeUp;
      JerseySize = obj.JerseySize ? obj.JerseySize : JerseySize;
    }
  }

  handlePlayerChange = name => (event, value) => {
    const { playerInformation, playerInfo } = this.state;
    
    const newVal = name.replace(/[./" "]/g, '');
    if (event.target.value === 'Select') {
      this.setState({
        playerInformation: dummyObject
      });
    } else {
      playerInfo.findOne({ _id: value.props._id }, (err, docs) => {
        this.setState({
          playerInformation: docs
        });
      });
    }
    this.setState({
      [newVal]: event.target.value
    });
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
    if (newVal === 'JrClub') {
      optionTextFields.map((value, index) => JrClub.push(optionText[index]));
    }
    if (newVal === 'JrYouthClub') {
      optionTextFields.map((value, index) =>
        JrYouthClub.push(optionText[index])
      );
    }
    if (newVal === 'Category') {
      optionTextFields.map((value, index) => Category.push(optionText[index]));
    }
    if (newVal === 'Position') {
      optionTextFields.map((value, index) => Position.push(optionText[index]));
    }
    if (newVal === 'Foot') {
      optionTextFields.map((value, index) => Foot.push(optionText[index]));
    }
    if (newVal === 'JerseySizeUp') {
      optionTextFields.map((value, index) =>
        JerseySizeUp.push(optionText[index])
      );
    }
    if (newVal === 'JerseySize') {
      optionTextFields.map((value, index) =>
        JerseySize.push(optionText[index])
      );
    }
    this.setState({ open: false, optionText: [] });
    optionTextFields = optionTextFields.slice(0, 1);
  };

  renderDatePicker = (title, index) => {
    const { playerInformation, language } = this.state;
    const { classes } = this.props;
    const newVal = title.replace(/[./" "]/g, '');
    const value = playerInformation[newVal];
    const label = language === 'Japanese' ? datesJap[index] : title;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="picker">
          <InlineDatePicker
            style={{
              height: 41
            }}
            keyboard
            clearable
            disableFuture
            variant="outlined"
            label={label}
            format="dd/MM/yyyy"
            className={classes.textField}
            value={value}
            onChange={this.handleDateChange(title)}
            // autoOk={false}
            // views={['year', 'month', 'day']}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        </div>
      </MuiPickersUtilsProvider>
    );
  };

  handleDateChange = title => date => {
    const newVal = title.replace(/[./" "]/g, '');
    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [newVal]: date
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
          : fieldsArrayJap.playerInfoFields[from + index];
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
            height: 41
          }}
          key={index}
          fullWidth
          id="outlined-email-input"
          label={label}
          className={classes.textField}
          onChange={this.handleChange(title)}
          value={`${value}`}
          name={title}
          margin="dense"
          variant="outlined"
          inputProps={{
            style: {
              fontSize: 15,
              padding:10,
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
          : fieldsArrayJap.playerInfoFields[from + index];
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
            height: 41
          }}
          key={index}
          select
          fullWidth
          id="outlined-email-input"
          label={label}
          className={classes.textField}
          onChange={this.handleChange(title)}
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

  handleChange = name => event => {
    const newVal = name.replace(/[./" "]/g, '');
    const value = event.target.value;
    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [newVal]: value
      }
    }));
  };

  selectMenu = val => {
    const newVal = val.replace(/[./" "]/g, '');
    if (newVal === 'JrClub') {
      return JrClub.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              size="small"
              aria-label="Toggle password visibility"
              onClick={() => JrClub.splice(index, 1)}
            >
              <DelIcon fontSize="small"/>
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'JrYouthClub') {
      return JrYouthClub.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => JrYouthClub.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Category') {
      return Category.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Category.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Position') {
      return Position.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Position.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'BloodType') {
      return BloodType.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => BloodType.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Foot') {
      return Foot.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Foot.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'JerseySizeUp') {
      return JerseySizeUp.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => JerseySizeUp.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'JerseySize') {
      return JerseySize.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => JerseySize.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
  };

  handleImageChange = e => {
    const { playerInformation } = this.state;
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = e => {
      playerInformation.image = reader.result;
      this.setState({
        playerInformation
      });
    };
  };

 

  saveData = () => {
    let { playerInformation, playerInfo } = this.state;

    playerInformation = {
      ...playerInformation,
      fileName: 'playerInfo'
    };

    let dropDowns = {
      JrClub,
      JrYouthClub,
      Category,
      Position,
      Foot,
      JerseySizeUp,
      JerseySize,
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
          this.props.getPlayers(playerInfo);

          this.setState({
            playerInformation: dummyObject,
            openSnack: true,
            snackMessage:"Data Saved Successfully!"
          });
        });
      } else {
        await playerInfo.update(
          { _id: playerInformation._id },
          playerInformation,
          {},
          (err, numReplaced) => {
            const id = playerInformation._id;
            delete playerInformation._id;
            delete playerInformation.fileName;
            playerInfo.update(
              { second_id: id },
              { $set: { ...playerInformation } },
              { multi: true },
              (err, numReplaced) => {
                this.setState({
                  playerInformation: dummyObject,
                  player: 'Select',
                  openSnack: true,
                  snackMessage:"Data Saved Successfully!"
                });
                this.props.getPlayers(playerInfo);
              }
            );
          }
        );
      }
    });
  };

  delData = () => {
    let { playerInformation, playerInfo } = this.state;
    
    playerInfo.remove({_id: playerInformation._id}, { multi: true }, removeError => {
      if (removeError) {     
       console.log(removeError);
      }  
      else{
        this.props.getPlayers(playerInfo);
        this.setState({
          playerInformation: dummyObject,
          openSnack: true,
          snackMessage:"Deleted successfully!"
        });
      }
     });
     playerInfo.remove({Name1: playerInformation.Name1},  { multi: true }, (removeError,num) => {
      if (removeError) {     
       console.log(removeError);
      }        
      console.log(num,'delete!!!!!!!!!!!!',playerInformation._id)
     });

   
  };

  createPdf = () => {
    const html = bodyRef.current;
    Doc.createPdf(html);
  };

  changeLang = lang => {
    if (lang === 'English') {
      BloodType = [...arrays.BloodType];
    }
    if (lang === 'Japanese') {
      BloodType = [...arraysJap.BloodType];
    }
  };

  render() {
    const { player, playerInformation, language } = this.state;
    const { classes, players } = this.props;
    const func = [
      () => this.saveData(),
      () => this.delData(),
      // () => window.print(),
      () => this.createPdf()
    ];
    return (
      <div className={classes.root} id="divToPrint" ref={bodyRef}>
        <div>
          <div className={classes.innerRoot} elevation={1}>
            <Typography variant="h6" color="primary">
              {language === 'Japanese' ? '選手情報' : 'Player Information'}
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
                  value={player}
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
                    players.map((value, index) => (
                      <MenuItem key={index} _id={value._id} value={value.title}>
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
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item xs={2} container justify="center">
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={this.handleImageChange}
                />

                <label htmlFor="contained-button-file">
                  <ButtonBase
                    component="span"
                    focusRipple
                    className={classes.image}
                    style={{ width: '100%' }}
                  >
                    <img
                      src={
                        playerInformation.image
                          ? playerInformation.image
                          : require('../assets/images/addimage.png')
                      }
                      alt="Add Player"
                      style={{ height: 340, width: '100%' }}
                      className={classes.media}
                    />
                  </ButtonBase>
                </label>
              </Grid>
              <Grid item xs container justify="center">
                {this.renderTextField(0, 3)}
                {this.renderSelectTextField(3, 4)}
                {this.renderSelectTextField(4, 5)}
                {this.renderTextField(5, 7)}
              </Grid>
              <Grid item xs={3} container justify="center">
                {this.renderDatePicker('Player Birthday', 0)}
              </Grid>
              <Grid item xs container justify="center">
                {this.renderTextField(7, 10)}
                <Grid
                  item
                  xs
                  style={{ margin: '6px 0px 6px 10px' }}
                  container
                  justify="flex-start"
                >
                  <Typography align="left" variant="h6">
                    {language === 'Japanese' ? '住所' : 'Address'}
                  </Typography>
                </Grid>
                {this.renderTextField(10, 12)}
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item xs container justify="center">
                    {this.renderTextField(12, 13)}
                  </Grid>
                  <Grid
                    item
                    xs
                    className={classes.gridItem}
                    container
                    justify="center"
                  >
                    {this.renderTextField(13, 14)}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Typography
              className={classes.commentTypo}
              style={{
                borderBottom: '1px solid rgba(26, 43, 117, 0.2)',
                marginBottom: 0
              }}
            />

            <br />
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
              >
                {this.renderTextField(14, 15)}
                {this.renderDatePicker('Date of Registration', 1)}
                {this.renderTextField(16, 19)}
              </Grid>
              <Grid
                item
                xs
                className={classes.gridItem}
                container
                justify="center"
              >
                {this.renderSelectTextField(19, 20)}
                {this.renderTextField(20, 24)}
              </Grid>
              <Grid
                item
                xs
                className={classes.gridItem}
                container
                justify="center"
              >
                {this.renderTextField(24, 29)}
              </Grid>
              <Grid
                item
                xs
                className={classes.gridItem}
                container
                justify="center"
              >
                {this.renderSelectTextField(29, 30)}
                {this.renderSelectTextField(30, 31)}
                {this.renderTextField(31, 34)}
              </Grid>
              <Grid
                item
                xs
                className={classes.gridItem}
                container
                justify="center"
              >
                {this.renderSelectTextField(34, 35)}
                {this.renderSelectTextField(35, 36)}
                {this.renderSelectTextField(36, 37)}
                {this.renderTextField(37, 39)}
              </Grid>
            </Grid>
            <br />
            <Typography className={classes.commentTypo} variant="subtitle2">
              {language === 'English' ? `Player's Comment` : '選手のコメント'}
            </Typography>
            <TextField
                  style={{ margin: '0px 10px 0px -1px' }}
                  value={
                    playerInformation &&
                    (playerInformation.PlayersComment
                      ? playerInformation.PlayersComment
                      : '')
                  }
                  onChange={this.handleChange('PlayersComment')}
                  fullWidth
                  id="outlined-multiline-flexible"
                  label={language === 'Japanese' ? 'コメント' : 'Comment'}
                  multiline
                  rows="4"
                  rowsMax="4"
                  margin="dense"
                  variant="outlined"
                />
            <br />
            <Typography className={classes.commentTypo} variant="subtitle2">
              {language === 'English' ? `Coach's Comment` : '監督のコメント'}
            </Typography>
            <TextField
                  style={{ margin: '0px 10px 0px -1px' }}
                  value={
                    playerInformation &&
                    (playerInformation.CoachComment
                      ? playerInformation.CoachComment
                      : '')
                  }
                  onChange={this.handleChange('CoachComment')}
                  fullWidth
                  id="outlined-multiline-flexible"
                  label={language === 'Japanese' ? 'コメント' : 'Comment'}
                  multiline
                  rows="4"
                  rowsMax="4"
                  margin="dense"
                  variant="outlined"
                />
          </div>
        </div>
        {this.renderDialog()}
        <SnackBar
          handleSnack={value => this.setState({ openSnack: value })}
          message={this.state.snackMessage}
          openSnack={this.state.openSnack}
          classes={this.props.classes}
        />
      </div>
    );
  }
}

PlayerInformation.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    players: state.playerInfoReducer.players,
    dropDownObj: state.dropDownReducer.dropDowns,
    language: state.dropDownReducer.language || 'English'
  });
const mapDispatchToProps = dispatch => ({
  getPlayers: playerInfo => dispatch(getPlayers(playerInfo)),
  getDropDowns: playerInfo => dispatch(getDropDowns(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PlayerInformation));
