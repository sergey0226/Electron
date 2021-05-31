/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable global-require */
// @flow
import React, { Component } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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
import { getPlayers } from '../actions/rehabilitationActions';
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
    marginLeft: 3,
    marginRight: 3,
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

const icons = [...fieldsArray.icons];

const fields = [...fieldsArray.rehabilitationFields];
const eyeFields = [
  'Position',
  'Field Condition',
  'Injured Convention',
  'Field',

  'Weather',
  'Coach Name',
  'Medical Staff'
];

let Position = [...arrays.Position];
let FieldCondition = [...arrays.FieldCondition];
let InjuredConvention = [...arrays.InjuredConvention];
let Field = [...arrays.Field];
let Weather = [...arrays.Weather];
let CoachName = [...arrays.CoachName];
let MedicalStaff = [...arrays.MedicalStaff];

let optionTextFields = ['Option'];

const dummyObject = {
  InjuryDate: new Date()
};

class PlayerInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      player: 'Select',
      playerInformation: dummyObject,

      language: 'English',
      open: false,
      dialogLabel: '',
      optionText: []
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

    if (obj) {
      Position = obj.Position ? obj.Position : Position;
      FieldCondition = obj.FieldCondition ? obj.FieldCondition : FieldCondition;
      InjuredConvention = obj.InjuredConvention
        ? obj.InjuredConvention
        : InjuredConvention;
      Field = obj.Field ? obj.Field : Field;
      Weather = obj.Weather ? obj.Weather : Weather;
      CoachName = obj.CoachName ? obj.CoachName : CoachName;
      MedicalStaff = obj.MedicalStaff ? obj.MedicalStaff : MedicalStaff;
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

  handleClose = () => {
    this.setState({ open: false, optionText: [] });
    optionTextFields = optionTextFields.slice(0, 1);
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
    if (newVal === 'Position') {
      optionTextFields.map((value, index) => Position.push(optionText[index]));
    }
    if (newVal === 'InjuredConvention') {
      optionTextFields.map((value, index) =>
        InjuredConvention.push(optionText[index])
      );
    }
    if (newVal === 'FieldCondition') {
      optionTextFields.map((value, index) =>
        FieldCondition.push(optionText[index])
      );
    }
    if (newVal === 'Weather') {
      optionTextFields.map((value, index) => Weather.push(optionText[index]));
    }
    if (newVal === 'Field') {
      optionTextFields.map((value, index) => Field.push(optionText[index]));
    }
    if (newVal === 'CoachName') {
      optionTextFields.map((value, index) => CoachName.push(optionText[index]));
    }
    if (newVal === 'MedicalStaff') {
      optionTextFields.map((value, index) =>
        MedicalStaff.push(optionText[index])
      );
    }
    this.setState({ open: false, optionText: [] });
    optionTextFields = optionTextFields.slice(0, 1);
  };

  renderDatePicker = title => {
    const { playerInformation, language } = this.state;
    const { classes } = this.props;
    const newVal = title.replace(/[./" "]/g, '');
    const value = playerInformation[newVal];
    const label = language === 'Japanese' ? '受傷日' : title;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="picker">
          <InlineDatePicker
            style={{
              height: 41,
              marginRight: -30
            }}
            // fullWidth
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
    this.setState({ [newVal]: date });

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
          : fieldsArrayJap.rehabilitationFields[from + index];
      const newVal = title.replace(/[./" "]/g, '');
      let value = null;
      if (playerInformation[newVal] != undefined) {
        if (newVal === 'PlayerBirthday') {
          value = this.renderDate('PlayerBirthday');
        } else {
          value = playerInformation[newVal];
        }
      } else {
        value = '';
      }

      return (
        <TextField
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
          inputProps={{ style: { fontSize: 15,padding:10 } }}
          InputLabelProps={{ style: { fontSize: 14 } }}
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
          : fieldsArrayJap.rehabilitationFields[from + index];
      const newVal = title.replace(/[./" "]/g, '');
      let value = null;
      if (playerInformation[newVal] != undefined) {
        value = playerInformation[newVal];
      } else {
        value = '';
      }
      return (
        <TextField
          style={{ height: 43 }}
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
          inputProps={{ style: { fontSize: 15 } }}
          InputLabelProps={{ style: { fontSize: 14 } }}
        >
          {this.selectMenu(title)}
        </TextField>
      );
    });
  };

  handleChange = name => event => {
    const newVal = name.replace(/[./" "]/g, '');
    const {value} = event.target;

    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [newVal]: value
      }
    }));
  };

  selectMenu = val => {
    const newVal = val.replace(/[./" "]/g, '');
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
    if (newVal === 'InjuredConvention') {
      return InjuredConvention.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => InjuredConvention.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'FieldCondition') {
      return FieldCondition.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => FieldCondition.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'Weather') {
      return Weather.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => Weather.splice(index, 1)}
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
    if (newVal === 'MedicalStaff') {
      return MedicalStaff.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => MedicalStaff.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
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

  openDialog = (val, label) => {
    this.setState({ open: true, dialogValue: val, dialogLabel: label });
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
      fileName: 'playerInfo'
    };

    let dropDowns = {
      Position,
      FieldCondition,
      InjuredConvention,
      Field,
      Weather,
      CoachName,
      MedicalStaff,
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
          }
        );
      }
    });
  };

  createPdf = () => {
    const html = bodyRef.current;
    Doc.createPdf(html,true);
  };

  render() {
    const { player, playerInformation, language } = this.state;
    const { classes, players } = this.props;
    const func = [
      () => this.saveData(),
      /* () => window.print(), */
      () => this.createPdf()
    ];
    return (
      <div className={classes.root} id="divToPrint" ref={bodyRef}>
        <div>
          <div className={classes.innerRoot} elevation={1}>
            <Typography variant="h6" color="primary">
              {language === 'Japanese' ? '受傷情報 1' : 'Injury Information 1'}
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
            <br />
            <Grid
              container
              spacing={0}
              // style={{ backgroundColor: 'yellow' }}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                xs={2}
                container
                justify="center"
                // alignItems="center"
              >
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
                    {/* <span> */}
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
                    {/* </span> */}
                  </ButtonBase>
                </label>
              </Grid>
              <Grid item xs container justify="center">
                {this.renderTextField(0, 5)}
              </Grid>
              <Grid item xs={4} container justify="flex-start">
                {this.renderDatePicker('Injury Date')}
                {this.renderTextField(5, 7)}
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item xs container justify="center">
                    {this.renderSelectTextField(7, 8)}
                    {this.renderSelectTextField(8, 9)}
                  </Grid>
                  <Grid item xs container justify="center">
                    {this.renderSelectTextField(9, 10)}
                    {this.renderSelectTextField(10, 11)}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} container justify="center">
                {this.renderTextField(11, 13)}
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item xs container justify="center">
                    {this.renderSelectTextField(13, 14)}
                    {this.renderSelectTextField(14, 15)}
                  </Grid>
                  <Grid item xs container justify="center">
                    {this.renderTextField(15, 16)}
                    {this.renderSelectTextField(16, 17)}
                  </Grid>
                </Grid>
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

PlayerInformation.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  players: state.rehabilitationReducer.players,
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
