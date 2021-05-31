/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-duplicate-props */
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import CameraIcon from '@material-ui/icons/CameraAltOutlined';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import DelIcon from '@material-ui/icons/DeleteOutline';
import Visibility from '@material-ui/icons/Visibility';

import { shell } from 'electron';
import { connect } from 'react-redux';
import InlineDatePicker from '../constants/InlineDatePicker';
import TextField from '../constants/TextInput';
import { getPlayers, getRecords } from '../actions/scoutingActions';
import { getDropDowns } from '../actions/dropDownActions';

import SnackBar from '../components/SnackBar/SnackBar';
import Doc from '../constants/DocService';

import * as arrays from '../constants/dropDowns';
import * as arraysJap from '../constants/dropDownsJap';
import * as fieldsArray from '../constants/textFields';
import * as fieldsArrayJap from '../constants/textFieldsJap';
import * as tableArray from '../constants/tableCols';
import * as tableArrayJap from '../constants/tableColsJap';

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
    color: 'red',
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
  },

  fab: {
    width: 35,
    height: 30,
    margin: 5,
    marginTop: 20
  }
});

const icons = [...fieldsArray.icons];

const fields = [...fieldsArray.scoutingFields];
const eyeFields = ['Jr Club', 'Jr Youth Club'];

let JrClub = [...arrays.JrClub];
let JrYouthClub = [...arrays.JrYouthClub];

let optionTextFields = ['Option'];

const rows = [...tableArray.scoutingCols];

const dummyObject = {
  PlayerBirthday: new Date()
};

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: 'Select',
      players: [],

      language: 'English',
      playerInformation: dummyObject,
      data: [],
      page: 0,
      rowsPerPage: 5,

      open: false,
      dialogValue: '',
      dialogLabel: '',
      optionText: [],

      openPhoto: false
    };
  }

  componentWillMount() {
    const { playerInfo } = this.props;
    this.setState({
      playerInfo
    });
    this.props.getPlayers(playerInfo);
    this.props.getRecords(playerInfo);
    this.props.getDropDowns(playerInfo);
  }

  componentWillReceiveProps(nextProps) {
    const obj = nextProps.dropDownObj;

    this.setState({
      players: nextProps.players,
      data: nextProps.records,
      language: nextProps.language
    });
    if (obj) {
      JrClub = obj.JrClub ? obj.JrClub : JrClub;
      JrYouthClub = obj.JrYouthClub ? obj.JrYouthClub : JrYouthClub;
    }
  }

  // componentWillUnmount() {
  //   // const { playerInfo } = this.state;
  //   this.props.selectPlayer(
  //     { event: { target: { value: 'Select' } } },
  //     playerInfo,
  //   );
  // }

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
            src={tempImage || require('../assets/images/addimage.png')}
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

  handlePhotoClose = () => {
    this.setState({ openPhoto: false });
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

    this.setState({ open: false, optionText: [] });
    optionTextFields = optionTextFields.slice(0, 1);
  };

  selectMenu = val => {
    const newVal = val.replace(/[./" "]/g, '');
    if (newVal === 'JrClub') {
      return JrClub.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => JrClub.splice(index, 1)}
            >
              <DelIcon />
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

  renderDatePicker = testNo => {
    const { playerInformation, language } = this.state;
    const { classes } = this.props;
    const newVal = testNo.replace(/[./" "]/g, '');
    const value = playerInformation[newVal];
    const label = language === 'Japanese' ? '誕生日' : testNo;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="picker">
          <InlineDatePicker
            style={{ height: 40 }}
            keyboard
            clearable
            disableFuture
            variant="outlined"
            label={label}
            format="dd/MM/yyyy"
            value={value}
            onChange={this.handleDateChange(newVal)}
            className={classes.textField}
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

  renderTextField = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.scoutingFields[from + index];
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
              height: 10
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
          : fieldsArrayJap.scoutingFields[from + index];
      const newVal = title.replace(/[./" "]/g, '');
      let value = null;
      if (playerInformation[newVal] != undefined) {
        value = playerInformation[newVal];
      } else {
        value = '';
      }
      return (
        <TextField
          style={{ height: 40 }}
          key={index}
          select
          fullWidth
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
              height: 10
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

  handleVideoChange = e => {
    const { playerInformation } = this.state;
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = e => {
      playerInformation.PlayerVideo = file.path;
      this.setState({
        playerInformation
      });
    };
  };

  renderPlayerVideo = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const newVal = title.replace(/[./" "]/g, '');
      const label =
        language === 'Japanese'
          ? fieldsArrayJap.scoutingFields[from + index]
          : title;
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
          key={index}
          // disabled
          fullWidth
          label={label}
          className={classes.textField}
          name={title}
          value={`${value}`}
          onChange={this.handleFieldChange(newVal)}
          margin="dense"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment
                style={{ marginRight: -15, marginLeft: -10 }}
                position="end"
              >
                <IconButton aria-label="Toggle password visibility">
                  <label htmlFor="playerVideo-file">
                    <CameraIcon />
                  </label>
                </IconButton>
              </InputAdornment>
            )
          }}
          inputProps={{
            style: {
              fontSize: 15,
              height: 10
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

  renderTableHead = () => (
    <TableHead style={{ backgroundColor: 'seaGreen', opacity: '0.7' }}>
      <TableRow>
        {rows.map((title, index) => {
          const label =
            this.state.language === 'English'
              ? title
              : tableArrayJap.scoutingCols[index];
          return (
            <TableCell
              style={{ width: 50, color: 'white' }}
              padding="none"
              align="center"
              key={index}
            >
              {label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
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
    let { playerInformation, players, playerInfo } = this.state;

    playerInformation = {
      ...playerInformation,
      fileName: 'scouting'
    };

    let dropDowns = {
      JrClub,
      JrYouthClub,
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
          this.props.getRecords(playerInfo);

          this.setState({
            playerInformation: dummyObject,
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
              playerInformation: dummyObject,
              player: 'Select',
              openSnack: true
            });

            this.props.getPlayers(playerInfo);
            this.props.getRecords(playerInfo);
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
    const {
      players,
      player,
      playerInformation,
      language,
      data,
      rowsPerPage,
      page
    } = this.state;
    const func = [
      () => this.saveData(),
      // () => window.print(),
      () => this.createPdf()
    ];

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div className={classes.root}>
        <div className={classes.innerRoot} elevation={1}>
          <Typography variant="h6" color="primary">
            {language === 'Japanese' ? 'スカウティング' : 'Scouting'}
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
                    <MenuItem
                      key={value._id}
                      _id={value._id}
                      value={value.title}
                    >
                      {value.title}
                    </MenuItem>
                  ))}
              </TextField>
            </div>

            {icons.map((val, index) => (val.title !== "Pdf") ? 
                  (
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
                  )
                :''            
            )}
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
                {this.renderTextField(0, 2)}
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item xs container justify="center">
                    {this.renderDatePicker('Player BirthDay')}
                  </Grid>
                  <Grid item xs container justify="center">
                    {this.renderTextField(3, 4)}
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item xs container justify="center">
                    {this.renderTextField(4, 5)}
                  </Grid>
                  <Grid item xs container justify="center">
                    {this.renderSelectTextField(5, 6)}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs container justify="center">
                {this.renderTextField(6, 8)}
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item xs container justify="center">
                    {this.renderTextField(8, 9)}
                  </Grid>
                  <Grid item xs container justify="center">
                    {this.renderTextField(9, 10)}
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item xs container justify="center">
                    {this.renderSelectTextField(10, 11)}
                  </Grid>
                  <Grid item xs container justify="center">
                    {this.renderTextField(11, 12)}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                container
                justify="flex-start"
                style={{
                  borderLeft: '3px solid rgb(224, 224, 224)',
                  marginLeft: 20,
                  paddingLeft: 20
                }}
              >
                <input
                  accept="video/*"
                  className={classes.input}
                  id="playerVideo-file"
                  multiple
                  type="file"
                  onChange={this.handleVideoChange}
                />
                {this.renderPlayerVideo(12, 13)}
                {this.renderTextField(13, 14)}
                <Typography
                  align="left"
                  variant="h6"
                  style={{ marginLeft: 3, padding: 8 }}
                >
                  {language === 'Japanese' ? '住所' : 'Address'}
                </Typography>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item xs container justify="center">
                    {this.renderTextField(14, 15)}
                  </Grid>
                  <Grid item xs container justify="center">
                    {this.renderTextField(15, 16)}
                  </Grid>
                </Grid>
                {this.renderTextField(16, 18)}
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item xs container justify="center">
                    {this.renderTextField(18, 19)}
                  </Grid>
                  <Grid item xs container justify="center">
                    {this.renderTextField(19, 20)}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Typography className={classes.commentTypo} variant="subtitle2">
              {language === 'Japanese' ? '備考' : 'ABOUT'}
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
                    (playerInformation.ScoutingComments
                      ? playerInformation.ScoutingComments
                      : '')
                  }
                  onChange={this.handleFieldChange('ScoutingComments')}
                  multiline
                  rows="4"
                  rowsMax="4"
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </div>
          <br />
          <br />
          <div className={classes.tableWrapper} id="divToPrint" ref={bodyRef}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              {this.renderTableHead()}

              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((n, index) => {
                    const SelectedDate = n.PlayerBirthDay
                      ? n.PlayerBirthDay
                      : new Date();
                    return (
                      <TableRow hover tabIndex={-1} key={index}>
                        <TableCell
                          style={{ width: 50 }}
                          padding="none"
                          align="center"
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          style={{ width: 50 }}
                          padding="none"
                          align="center"
                        >
                          {n.Name1}
                        </TableCell>
                        <TableCell
                          style={{ width: 50 }}
                          padding="none"
                          align="center"
                        >
                          <img
                            onClick={() =>
                              this.openPhotoDialog(n.image, n.Name1)
                            }
                            src={
                              n.image
                                ? n.image
                                : require('../assets/images/addimage.png')
                            }
                            alt="Player"
                            style={{ height: 60, width: 60 }}
                            className={classes.media}
                          />
                        </TableCell>
                        <TableCell
                          style={{ width: 50 }}
                          padding="none"
                          align="center"
                        >
                          {SelectedDate.getDate()}/{SelectedDate.getMonth() + 1}
                          /{SelectedDate.getFullYear()}
                        </TableCell>
                        <TableCell
                          style={{ width: 50 }}
                          padding="none"
                          align="center"
                        >
                          {n.Phone}
                        </TableCell>
                        <TableCell
                          style={{ maxWidth: 150, wordWrap: 'break-word' }}
                          padding="none"
                          align="center"
                        >
                          {n.ScoutingComments}
                        </TableCell>
                        <TableCell
                          style={{ width: 50 }}
                          padding="none"
                          align="center"
                        >
                          {n.JrClub}
                        </TableCell>
                        <TableCell
                          style={{ width: 50 }}
                          padding="none"
                          align="center"
                        >
                          {n.YouthClub}
                        </TableCell>
                        <TableCell
                          style={{ width: 50 }}
                          padding="none"
                          align="center"
                        >
                          {n.Position}
                        </TableCell>
                        <TableCell
                          style={{ width: 50 }}
                          padding="none"
                          align="center"
                        >
                          {n.Foot}
                        </TableCell>
                        <TableCell
                          style={{ width: 50 }}
                          padding="none"
                          align="center"
                        >
                          {n.Height}
                        </TableCell>
                        <TableCell
                          style={{ width: 50 }}
                          padding="none"
                          align="center"
                        >
                          {n.Weight}
                        </TableCell>
                        <TableCell
                          style={{ width: 50 }}
                          padding="none"
                          align="center"
                        >
                          {n.Country}, {n.Region}
                        </TableCell>
                        <TableCell
                          style={{ width: 50 }}
                          padding="none"
                          align="center"
                        >
                          <span
                            style={{ cursor: 'pointer', color: 'blue' }}
                            onClick={() => shell.openItem(n.PlayerVideo)}
                          >
                            {n.PlayerVideo}
                          </span>
                        </TableCell>
                        <TableCell
                          style={{ width: 50 }}
                          padding="none"
                          align="center"
                        >
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={n.HyperlinktoVideo}
                          >
                            {n.HyperlinktoVideo}
                          </a>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              labelRowsPerPage={
                language === 'Japanese' ? '行数選択' : 'Rows per page'
              }
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page'
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page'
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </div>
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
  players: state.scoutingReducer.players,
  records: state.scoutingReducer.records || [],
  dropDownObj: state.dropDownReducer.dropDowns,
  language: state.dropDownReducer.language || 'English'
});
const mapDispatchToProps = dispatch => ({
  getPlayers: playerInfo => dispatch(getPlayers(playerInfo)),
  getRecords: playerInfo => dispatch(getRecords(playerInfo)),
  getDropDowns: playerInfo => dispatch(getDropDowns(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
