/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
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

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

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
import Close from '@material-ui/icons/Close'; // choose your lib
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DelIcon from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import Checkbox from '../constants/CheckBox';
import TextField from '../constants/TextInput';
import InlineDatePicker from "../constants/InlineDatePicker";
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

  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover'
  },
  media1: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'contain'
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
    height: 393,
    width: 100
    // width: '100%'
  }
});

const icons = [...fieldsArray.icons];

const fields = [...fieldsArray.injuryFields];

const eyeFields = [
  'Injured Parts',
  'Disease Name',
  'Injury Type',
  'How Injury',
  'Destination Hospital',
  'Doctor Name',
  'Injured Degree',

  'Injury Status',
  'Rehabilitation Staff'
];

let InjuredParts = [...arrays.InjuredParts];
let DiseaseName = [...arrays.DiseaseName];
let InjuryType = [...arrays.InjuryType];
let HowInjury = [...arrays.HowInjury];
let DestinationHospital = [...arrays.DestinationHospital];
let DoctorName = [...arrays.DoctorName];
let InjuredDegree = [...arrays.InjuredDegree];
let InjuryStatus = [...arrays.InjuryStatus];
let RehabilitationStaff = [...arrays.RehabilitationStaff];

let optionTextFields = ['Option'];

const dates = [
  'Scheduled to return',
  'Rehabilitation Start Date',
  'Return Date'
];
const datesJap = ['復帰までのスケジュール', 'リハビリ開始日', '復帰日'];

const dummyObject = {
  RehabilitationStartDate: new Date(),
  ReturnDate: new Date(),
  Scheduledtoreturn: new Date()
};

class PlayerInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'English',
      players: [],
      player: 'Select',
      playerInformation: dummyObject,     
      dummyplayerImage: require('../assets/images/showimage.jpg'),
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
    this.props.getPlayers(playerInfo);
    this.props.getDropDowns(playerInfo);
  }

  componentWillReceiveProps(nextProps) {
    const obj = nextProps.dropDownObj;
    this.setState({
      language: nextProps.language
    });

    if (obj) {
      InjuredParts = obj.InjuredParts ? obj.InjuredParts : InjuredParts;
      DiseaseName = obj.DiseaseName ? obj.DiseaseName : DiseaseName;
      InjuryType = obj.InjuryType ? obj.InjuryType : InjuryType;
      HowInjury = obj.HowInjury ? obj.HowInjury : HowInjury;
      DestinationHospital = obj.DestinationHospital
        ? obj.DestinationHospital
        : DestinationHospital;
      DoctorName = obj.DoctorName ? obj.DoctorName : DoctorName;
      InjuredDegree = obj.InjuredDegree ? obj.InjuredDegree : InjuredDegree;
      InjuryStatus = obj.InjuryStatus ? obj.InjuryStatus : InjuryStatus;
      RehabilitationStaff = obj.RehabilitationStaff
        ? obj.RehabilitationStaff
        : RehabilitationStaff;
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
    console.log(playerInformation)
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
    if (newVal === 'InjuredParts') {
      optionTextFields.map((value, index) =>
        InjuredParts.push(optionText[index])
      );
    }
    if (newVal === 'DiseaseName') {
      optionTextFields.map((value, index) =>
        DiseaseName.push(optionText[index])
      );
    }
    if (newVal === 'InjuryType') {
      optionTextFields.map((value, index) =>
        InjuryType.push(optionText[index])
      );
    }
    if (newVal === 'HowInjury') {
      optionTextFields.map((value, index) => HowInjury.push(optionText[index]));
    }
    if (newVal === 'DestinationHospital') {
      optionTextFields.map((value, index) =>
        DestinationHospital.push(optionText[index])
      );
    }
    if (newVal === 'DoctorName') {
      optionTextFields.map((value, index) =>
        DoctorName.push(optionText[index])
      );
    }
    if (newVal === 'InjuredDegree') {
      optionTextFields.map((value, index) =>
        InjuredDegree.push(optionText[index])
      );
    }
    if (newVal === 'InjuryStatus') {
      optionTextFields.map((value, index) =>
        InjuryStatus.push(optionText[index])
      );
    }
    if (newVal === 'RehabilitationStaff') {
      optionTextFields.map((value, index) =>
        RehabilitationStaff.push(optionText[index])
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
            style={{ height: 43 }}
            keyboard
            clearable
            variant="outlined"
            label={label}
            format="dd/MM/yyyy"
            className={classes.textField}
            value={value}
            onChange={this.handleDateChange(title)}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            // disableFuture
            // autoOk={false}
            // views={['year', 'month', 'day']}
          />
        </div>
      </MuiPickersUtilsProvider>
    );
  };

  handleDateChange = title => date => {
    const { playerInformation } = this.state;
    const newVal = title.replace(/[./" "]/g, '');

    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [newVal]: date
      }
    }));
  };

  renderSelectTextField = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.injuryFields[from + index];
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
            height: 43
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
    if (newVal === 'InjuredParts') {
      return InjuredParts.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => InjuredParts.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'DiseaseName') {
      return DiseaseName.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => DiseaseName.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'InjuryType') {
      return InjuryType.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => InjuryType.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'HowInjury') {
      return HowInjury.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => HowInjury.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'DestinationHospital') {
      return DestinationHospital.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => DestinationHospital.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'DoctorName') {
      return DoctorName.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => DoctorName.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'InjuredDegree') {
      return InjuredDegree.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => InjuredDegree.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'InjuryStatus') {
      return InjuryStatus.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => InjuryStatus.splice(index, 1)}
            >
              <DelIcon />
            </IconButton>
          )}
        </MenuItem>
      ));
    }
    if (newVal === 'RehabilitationStaff') {
      return RehabilitationStaff.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => RehabilitationStaff.splice(index, 1)}
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

  renderCheckBox = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.injuryFields[from + index];
      const newVal = title.replace(/[./" "]/g, '');

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
    const { playerInformation } = this.state;
    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [name]: event.target.checked
      }
    }));
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

  saveData = () => {
    let { playerInformation, players, playerInfo } = this.state;

    playerInformation = {
      ...playerInformation,
      fileName: 'playerInfo'
    };

    let dropDowns = {
      InjuredParts,
      DiseaseName,
      InjuryType,
      HowInjury,
      DestinationHospital,
      DoctorName,
      InjuredDegree,
      InjuryStatus,
      RehabilitationStaff,
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
    const { player, playerInformation, language, dummyplayerImage} = this.state;
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
              {language === 'Japanese' ? '受傷情報 2' : 'Injury Information 2'}
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
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
               <Card
                  className={classes.card}
                  style={{
                    maxWidth: 170,
                    marginRight: 10,
                    marginLeft: 35,
                    display: 'inline-flex'
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Player Image"
                      className={classes.media1}
                      height="240"
                      image={
                        playerInformation
                          ? playerInformation.image
                            ? playerInformation.image
                            : dummyplayerImage
                          : dummyplayerImage
                      }
                    />
                  </CardActionArea>
                </Card>
              <Grid
                item
                xs
                className={classes.gridItem}
                container
                justify="center"
              >
                {this.renderSelectTextField(0, 1)}
                <Typography
                  style={{ width: '100%', marginLeft: 10 }}
                  className={classes.commentTypo}
                  variant="subtitle2"
                >
                  {language === 'Japanese' ? '応急処置対応' : 'First Aid'}
                </Typography>

                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  {this.renderCheckBox(1, 3)}
                </FormGroup>
                {this.renderSelectTextField(3, 4)}
              </Grid>
              <Grid
                item
                xs
                className={classes.gridItem}
                container
                justify="center"
              >
                {this.renderSelectTextField(4, 5)}

                <FormGroup
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 54
                  }}
                >
                  {this.renderCheckBox(5, 7)}
                </FormGroup>
                {this.renderSelectTextField(7, 8)}
              </Grid>
              <Grid
                item
                xs
                className={classes.gridItem}
                container
                justify="center"
              >
                {this.renderSelectTextField(8, 9)}
                <FormGroup
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 54
                  }}
                >
                  {this.renderCheckBox(9, 11)}
                </FormGroup>
                {this.renderSelectTextField(11, 12)}
              </Grid>
              <Grid
                item
                xs
                className={classes.gridItem}
                container
                justify="center"
              >
                {this.renderSelectTextField(12, 13)}

                <FormGroup
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 54
                  }}
                >
                  {this.renderCheckBox(13, 15)}
                </FormGroup>
                {this.renderDatePicker('Scheduled to return', 0)}
              </Grid>
            </Grid>

            <br />

            <Typography className={classes.commentTypo} variant="subtitle2">
              {language === 'Japanese' ? '医師のコメント' : "Doctor's Comment"}
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
                  value={
                    playerInformation &&
                    (playerInformation.DoctorComments
                      ? playerInformation.DoctorComments
                      : '')
                  }
                  onChange={this.handleChange('DoctorComments')}
                  id="outlined-multiline-flexible"
                  label={language === 'Japanese' ? 'コメント' : 'Comment'}
                  multiline
                  rows="4"
                  rowsMax="4"
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <br />
            <div style={{ margin: 20 }}>
              <Grid
                spacing={24}
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs container justify="flex-start">
                  <Typography noWrap variant="h6">
                    {language === 'Japanese' ? '図 1' : 'Diagram 1'}
                  </Typography>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="Diagram1"
                    multiple
                    type="file"
                    onChange={this.handleImageChange('Diagram1')}
                  />
                  <label htmlFor="Diagram1">
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
                  <label htmlFor="Diagram2">
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
                  <label htmlFor="Diagram3">
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
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={0}
                direction="row"
                justify="center"
                alignItems="flex-start"
              >
                <Grid item xs container justify="center">
                  {this.renderSelectTextField(16, 17)}
                </Grid>
                <Grid item xs container justify="center">
                  {this.renderSelectTextField(17, 18)}
                </Grid>
                <Grid item xs container justify="center">
                  {this.renderDatePicker('Rehabilitation Start Date', 1)}
                </Grid>
                <Grid item xs container justify="center">
                  {this.renderDatePicker('Return Date', 2)}
                </Grid>
              </Grid>
            </div>
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
