/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable promise/catch-or-return */
/* eslint-disable func-names */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable global-require */
// @flow
import React, { Component } from 'react';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import CameraIcon from '@material-ui/icons/CameraAltOutlined';

import { shell } from 'electron';
import { connect } from 'react-redux';
import Checkbox from '../constants/CheckBox';
import TextField from '../constants/TextInput';
import { getPlayers, getRecords } from '../actions/gameAnalysisActions';
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
    height: 393,
    width: 100
    // width: '100%'
  }
});

const icons = [...fieldsArray.icons];

const fields = [...fieldsArray.gameAnalysisFields];
const eyeFields = ['Theme', 'Tournament/League', 'Field'];

let Theme = [...arrays.Theme];
let TournamentLeague = [...arrays.TournamentLeague];
let Field = [...arrays.Field];

let optionTextFields = ['Option'];

const rows = [...tableArray.gameAnalysisCols];

const dummyObject = {
  SelectedDate: new Date()
};

class PlayerInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dialogLabel: '',
      optionText: [],

      language: 'English',
      players: [],
      player: 'Select',
      playerInformation: dummyObject,

      data: [],
      page: 0,
      rowsPerPage: 5
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
      language: nextProps.language,
      players: nextProps.players,
      data: nextProps.records
    });

    if (obj) {
      Theme = obj.Theme ? obj.Theme : Theme;
      TournamentLeague = obj.TournamentLeague
        ? obj.TournamentLeague
        : TournamentLeague;
      Field = obj.Field ? obj.Field : Field;
    }
  }

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
            // padding: 0
          }}
        >
          <img
            // onClick={() => this.openDialog(n.image)}
            src={tempImage || require('../assets/images/addimage.png')}
            alt="Player"
            style={{ height: '100%', width: '100%' }}
            className={classes.media}
          />
        </DialogContent>
        <DialogActions>
          <Button
            // variant="outlined"
            onClick={this.handlePhotoClose}
            color="secondary"
          >
            {language === 'Japanese' ? '閉じる' : 'Close'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  handlePhotoClose = () => {
    this.setState({ openPhoto: false });
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
                inputProps={{
                  style: {
                    fontSize: 15,
                    padding:10
                  }
                }}                
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
    if (newVal === 'Theme') {
      optionTextFields.map((value, index) => Theme.push(optionText[index]));
    }
    if (newVal === 'TournamentLeague') {
      optionTextFields.map((value, index) =>
        TournamentLeague.push(optionText[index])
      );
    }
    if (newVal === 'Field') {
      optionTextFields.map((value, index) => Field.push(optionText[index]));
    }

    this.setState({ open: false, optionText: [] });
    optionTextFields = optionTextFields.slice(0, 1);
  };

  renderDatePicker = title => {
    const { playerInformation, language } = this.state;
    const { classes } = this.props;
    const newVal = title.replace(/[./" "]/g, '');
    const value = playerInformation[newVal];
    const label = language === 'Japanese' ? '日付' : title;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="picker">
          <InlineDatePicker
            style={{ height: 43 }}
            keyboard
            clearable
            disableFuture
            variant="outlined"
            label={label}
            format="dd/MM/yyyy"
            className={classes.textField}
            value={value}
            onChange={this.handleDateChange(newVal)}
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

  renderCheckBox = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const newVal = title.replace(/[./" "]/g, '');
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.gameAnalysisFields[from + index];
      let value = false;
      if (playerInformation) {
        if (playerInformation[newVal] != undefined) {
          value = playerInformation[newVal];
        } else {
          value = false;
        }
      }

      return (
        <FormControlLabel
          style={{
            width: '100%'
          }}
          control={
            <Checkbox
              checked={value}
              onChange={this.handleCheckChange(newVal)}
              // value={`${value}`}
              color="secondary"
            />
          }
          label={label}
          key={index}
        />
      );
    });
  };

  handleCheckChange = name => event => {
    event.persist();
    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [name]: event.target.checked
      }
    }));
  };

  renderPlayerVideo = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const newVal = title.replace(/[./" "]/g, '');
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.gameAnalysisFields[from + index];
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
          fullWidth
          label={label}
          className={classes.textField}
          name={title}
          value={`${value}`}
          onChange={this.handleFieldChange(newVal)}
          margin="dense"
          variant="outlined"
          InputLabelProps={{
            style: {
              fontSize: 14
            }
          }}          
          InputProps={{
            style: {
              fontSize: 15,
            },
            endAdornment: (
              <InputAdornment
              style={{ marginRight: -15}}
              position="end"
            >
              <IconButton aria-label="Toggle password visibility" 
                onClick={()=>{document.querySelector("#playerVideo-file").click()}}>
                    <CameraIcon />
                </IconButton>
            </InputAdornment>
            )
          }}
        />
      );
    });
  };

  renderTextField = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.gameAnalysisFields[from + index];
      const newVal = title.replace(/[./" "]/g, '');
      let value = null;
      if (playerInformation[newVal] !== undefined) {
        value = playerInformation[newVal];
      } else {
        value = '';
      }

      return (
        <TextField
          style={{
            height: 43
          }}
          key={index}
          fullWidth
          id="outlined-email-input"
          label={label}
          className={classes.textField}
          onChange={this.handleFieldChange(title)}
          value={`${value}`}
          name={title}
          margin="dense"
          variant="outlined"
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
    });
  };

  renderSelectTextField = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.gameAnalysisFields[from + index];
      const newVal = title.replace(/[./" "]/g, '');
      let value = null;
      if (playerInformation[newVal] !== undefined) {
        value = playerInformation[newVal];
      } else {
        value = '';
      }
      return (
        <TextField
          style={{
            height: 43
          }}
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
          // value={selectedVal}
          value={value}
          InputProps={this.renderEye(title, label)}

          InputLabelProps={{
            style: {
              fontSize: 14,
              padding:10
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
    const { value } = event.target;
    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [newVal]: value
      }
    }));
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
              // style={{ marginRight: -25 }}
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
    if (newVal === 'Theme') {
      return Theme.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Theme.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'TournamentLeague') {
      return TournamentLeague.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => TournamentLeague.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Field') {
      return Field.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Field.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
  };

  handleVideoChange = event => {
    const { playerInformation } = this.state;
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = e => {
      playerInformation.GameVideo = file.path;
      this.setState({
        playerInformation
      });
    };
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

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  renderTableHead = () => (
    <TableHead style={{ backgroundColor: 'seaGreen', opacity: '0.7' }}>
      <TableRow>
        {rows.map((title, index) => {
          const label =
            this.state.language === 'English'
              ? title
              : tableArrayJap.gameAnalysisCols[index];

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

  saveData = () => {
    let { playerInformation, players, playerInfo } = this.state;

    playerInformation = {
      ...playerInformation,
      fileName: 'gameAnalysis'
    };

    let dropDowns = {
      Theme,
      TournamentLeague,
      Field,
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
            player: 'Select',
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
    const {
      player,
      playerInformation,
      players,
      data,
      rowsPerPage,
      page,
      language
    } = this.state;
    const { classes } = this.props;
    const func = [
      () => this.saveData(),
      /* () => window.print(), */
      () => this.createPdf()
    ];

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div className={classes.root}>
        <div>
          <div className={classes.innerRoot} elevation={1}>
            <Typography variant="h6" color="primary">
              {language === 'Japanese' ? 'ゲーム分析ビデオ' : 'Game Analysis'}
            </Typography>
            <br />
            <Toolbar>
              <div className={classes.grow}>
                <TextField
                  style={{ width: 200 }}
                  // fullWidth
                  id="outlined-select-currency"
                  select
                  label={
                    language === 'Japanese' ? '対戦チーム' : 'Team vs Team'
                  }
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
                  inputProps={{
                    style: {
                      fontSize: 15,
                      padding:10
                    }
                  }}                  
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
                
                <ButtonBase disableRipple key={val.title} style={{margin: 5,display:val.title == 'Pdf' ? 'none':'block'}} disabled={val.title =='Pdf'}>
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
                spacing={0}
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
              >
                <Grid item xs container justify="flex-start">
                  <Typography noWrap variant="h6">
                    {language === 'Japanese' ? '図１' : 'Diagram 1'}
                  </Typography>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="Diagram1"
                    multiple
                    type="file"
                    onChange={this.handleImageChange('Diagram1')}
                  />
                  <label htmlFor="Diagram1" style={{ margin: 5 }}>
                    <ButtonBase
                      component="span"
                      focusRipple
                      className={classes.image}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <img
                        src={
                          playerInformation.Diagram1
                            ? playerInformation.Diagram1
                            : require('../assets/images/forward.png')
                        }
                        alt="Add Player"
                        style={{ height: '100%', width: '100%' }}
                        className={classes.media}
                      />
                    </ButtonBase>
                  </label>
                </Grid>
                <Grid item xs container justify="flex-start">
                  <Typography noWrap variant="h6">
                    {language === 'Japanese' ? '図 2' : 'Diagram 2'}
                  </Typography>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="Diagram2"
                    multiple
                    type="file"
                    onChange={this.handleImageChange('Diagram2')}
                  />
                  <label htmlFor="Diagram2" style={{ margin: 5 }}>
                    <ButtonBase
                      component="span"
                      focusRipple
                      className={classes.image}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <img
                        src={
                          playerInformation.Diagram2
                            ? playerInformation.Diagram2
                            : require('../assets/images/step.png')
                        }
                        alt="Add Player"
                        style={{ height: '100%', width: '100%' }}
                        className={classes.media}
                      />
                    </ButtonBase>
                  </label>
                </Grid>
                <Grid item xs container justify="flex-start">
                  <Typography noWrap variant="h6">
                    {language === 'Japanese' ? '図 3' : 'Diagram 3'}
                  </Typography>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="Diagram3"
                    multiple
                    type="file"
                    onChange={this.handleImageChange('Diagram3')}
                  />
                  <label htmlFor="Diagram3" style={{ margin: 5 }}>
                    <ButtonBase
                      component="span"
                      focusRipple
                      className={classes.image}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <img
                        src={
                          playerInformation.Diagram3
                            ? playerInformation.Diagram3
                            : require('../assets/images/forward.png')
                        }
                        alt="Add Player"
                        style={{ height: '100%', width: '100%' }}
                        className={classes.media}
                      />
                    </ButtonBase>
                  </label>
                </Grid>
                <Grid item xs container justify="flex-start">
                  <Typography noWrap variant="h6">
                    {language === 'Japanese' ? '図 4' : 'Diagram 4'}
                  </Typography>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="Diagram4"
                    multiple
                    type="file"
                    onChange={this.handleImageChange('Diagram4')}
                  />
                  <label htmlFor="Diagram4" style={{ margin: 5 }}>
                    <ButtonBase
                      component="span"
                      focusRipple
                      className={classes.image}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <img
                        src={
                          playerInformation.Diagram4
                            ? playerInformation.Diagram4
                            : require('../assets/images/step.png')
                        }
                        alt="Add Player"
                        style={{ height: '100%', width: '100%' }}
                        className={classes.media}
                      />
                    </ButtonBase>
                  </label>
                </Grid>
              </Grid>
              <br />

              <Grid
                spacing={0}
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={3} container justify="flex-start">
                  {this.renderDatePicker('Selected Date')}
                </Grid>
                <Grid item xs={3} container justify="flex-start">
                  <FormGroup>{this.renderCheckBox(2, 3)}</FormGroup>
                </Grid>
              </Grid>

              <Grid
                spacing={0}
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
              >
                <Grid item xs container justify="flex-start">
                  {this.renderTextField(0, 1)}
                  <input
                    accept="video/*"
                    className={classes.input}
                    id="playerVideo-file"
                    multiple
                    type="file"
                    onChange={this.handleVideoChange}
                  />
                  {this.renderPlayerVideo(1, 2)}
                </Grid>
                <Grid item xs container justify="flex-start">
                  {this.renderSelectTextField(3, 4)}
                  {this.renderTextField(4, 5)}
                </Grid>
                <Grid item xs container justify="flex-start">
                  {this.renderSelectTextField(5, 6)}
                </Grid>
                <Grid item xs container justify="flex-start">
                  {this.renderSelectTextField(6, 7)}
                </Grid>
              </Grid>
            </div>
            <br />
            <Typography className={classes.commentTypo} variant="subtitle2">
              {language === 'English' ? `REMARKS` : '備考'}
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
                  inputProps={{
                    style: {
                      fontSize: 15,
                      padding:10
                    }
                  }}                      
                  fullWidth
                  id="outlined-multiline-flexible"
                  label={language === 'Japanese' ? 'コメント' : 'Comments'}
                  value={
                    playerInformation &&
                    (playerInformation.Remarks ? playerInformation.Remarks : '')
                  }
                  onChange={this.handleFieldChange('Remarks')}
                  multiline
                  rows="4"
                  rowsMax="4"
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <br />
            <br />
            <div className={classes.tableWrapper} id="divToPrint" ref={bodyRef}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                {this.renderTableHead()}

                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((n, index) => {
                      let SelectedDate = n.SelectedDate
                        ? n.SelectedDate
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
                            <img
                              onClick={() =>
                                this.openPhotoDialog(
                                  n.Diagram1,
                                  n.TournamentLeague
                                )
                              }
                              src={
                                n.Diagram1
                                  ? n.Diagram1
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
                            <img
                              onClick={() =>
                                this.openPhotoDialog(
                                  n.Diagram2,
                                  n.TournamentLeague
                                )
                              }
                              src={
                                n.Diagram2
                                  ? n.Diagram2
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
                            <img
                              onClick={() =>
                                this.openPhotoDialog(
                                  n.Diagram3,
                                  n.TournamentLeague
                                )
                              }
                              src={
                                n.Diagram3
                                  ? n.Diagram3
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
                            <img
                              onClick={() =>
                                this.openPhotoDialog(
                                  n.Diagram4,
                                  n.TournamentLeague
                                )
                              }
                              src={
                                n.Diagram4
                                  ? n.Diagram4
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
                            {SelectedDate.getDate()}/
                            {SelectedDate.getMonth() + 1}/
                            {SelectedDate.getFullYear()}
                          </TableCell>

                          <TableCell
                            style={{ width: 50 }}
                            padding="none"
                            align="center"
                          >
                            {n.TeamvsTeam}
                          </TableCell>

                          <TableCell
                            style={{ width: 50 }}
                            padding="none"
                            align="center"
                          >
                            {n.Theme}
                          </TableCell>
                          <TableCell
                            style={{ width: 50 }}
                            padding="none"
                            align="center"
                          >
                            {n.TournamentLeague}
                          </TableCell>

                          <TableCell
                            style={{ width: 50 }}
                            padding="none"
                            align="center"
                          >
                            {n.Field}
                          </TableCell>
                          <TableCell
                            style={{ maxWidth: 150, wordWrap: 'break-word' }}
                            padding="none"
                            align="center"
                          >
                            {n.Remarks}
                          </TableCell>
                          <TableCell
                            style={{ width: 50 }}
                            padding="none"
                            align="center"
                          >
                            <span
                              style={{ cursor: 'pointer', color: 'blue' }}
                              onClick={() => shell.openItem(n.GameVideo)}
                            >
                              {n.GameVideo}
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
                          <TableCell
                            style={{ width: 50 }}
                            padding="none"
                            align="center"
                          >
                            <Checkbox
                              checked={n.Watched}
                              inputProps={{
                                'aria-label': 'primary checkbox'
                              }}
                            />
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

PlayerInformation.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    players: state.gameAnalysisReducer.players,
    records: state.gameAnalysisReducer.records || [],
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
)(withStyles(styles)(PlayerInformation));
