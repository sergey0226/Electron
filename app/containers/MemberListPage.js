/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-no-duplicate-props */
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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import TextField from '../constants/TextInput';
import Checkbox from '../constants/CheckBox';
import { selectCategory, selectPlayer } from '../actions/memberListActions';
import { getDropDowns } from '../actions/dropDownActions';

import SnackBar from '../components/SnackBar/SnackBar';
import Doc from '../constants/DocService';

import * as arrays from '../constants/dropDowns';
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

const fields = [...fieldsArray.memberListFields];
const eyeFields = ['Team Name'];

let Categories = [...arrays.Category];
let TeamName = [...arrays.TeamName];

let optionTextFields = ['Option'];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'Select',

      player: 'Select',
      players: [],

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

  componentDidMount() {
    this.setState({
      language: this.props.language
    });
  }

  componentWillReceiveProps(nextProps) {
    const obj = nextProps.dropDownObj;
    this.setState({
      playerInformation: nextProps.playerInformation,
      players: nextProps.players,
      language: nextProps.language
    });
    if (obj) {
      Categories = obj.Category ? obj.Category : Categories;
      TeamName = obj.TeamName ? obj.TeamName : TeamName;
    }
  }

  componentWillUnmount() {
    const { playerInfo } = this.state;

    this.props.selectCategory(
      { event: { target: { value: 'Select' } } },
      playerInfo
    );
  }

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
      player: 'Select'
    });
  };

  renderTextField = (from, to, keyWord) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.memberListFields[from + index];
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
          fullWidth
          id="outlined-email-input"
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
        />
      );
    });
  };

  renderTextFieldSided = (from, to, keyWord) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.memberListFields[from + index];
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
          fullWidth
          id="outlined-email-input"
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
          : fieldsArrayJap.memberListFields[from + index];
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
            width: 200,
            height: 45
          }}
          key={index}
          select
          // fullWidth
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

  selectMenu = val => {
    const newVal = val.replace(/[./" "]/g, '');

    if (newVal === 'TeamName') {
      return TeamName.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
          {index !== 0 && (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => TeamName.splice(index, 1)}
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

    if (newVal === 'TeamName') {
      optionTextFields.map((value, index) => TeamName.push(optionText[index]));
    }

    this.setState({ open: false, optionText: [] });
    optionTextFields = optionTextFields.slice(0, 1);
  };

  renderCheckBox = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.memberListFields[from + index];
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
            width: '100%',
            paddingLeft: 20
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

    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [name]: event.target.checked
      }
    }));
  };

  saveData = () => {
    let { playerInformation, players, playerInfo } = this.state;

    let dropDowns = {
      TeamName,
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
            openSnack: true
          });
          this.props.selectCategory(
            { event: { target: { value: 'Select' } } },
            playerInfo
          );
        }
      );  
    } else {
      const fileName = 'memberList';
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
          openSnack: true
        });
      });
    }
  };

  createPdf = () => {
    const html = bodyRef.current;
    Doc.createPdf(html);
  };

  render() {
    const { classes } = this.props;
    const { category, player, players, language } = this.state;
    const func = [
      () => this.saveData(),
      /* () => window.print(), */
      () => this.createPdf()
    ];

    return (
      <div className={classes.root} id="divToPrint" ref={bodyRef}>
        <div className={classes.innerRoot} elevation={1}>
          <Typography variant="h6" color="primary">
            {language === 'Japanese' ? 'メンバー情報' : 'Member Information'}
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
              </TextField>
              <br />
              {this.renderSelectTextField(0, 1)}
            </div>

            {icons.map((val, index) => {
              if(val.title !== 'Pdf'){
                return (
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
              }
            })}
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
                  style={{ paddingTop: 22, color: 'blue', marginLeft: 14 }}
                >
                  {language === 'Japanese' ? '選手' : 'Player'}
                </Typography>
                {this.renderTextFieldSided(1, 6, '')}
              </Grid>

              <Grid
                item
                xs={4}
                container
                justify="center"
                style={{
                  paddingTop: 70
                }}
              >
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  {this.renderCheckBox(7, 10)}
                </FormGroup>
              </Grid>

              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  paddingTop: 70
                }}
              />
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
    playerInformation: state.memberListReducer.playerInformation || {},
    players: state.memberListReducer.players || [],
    dropDownObj: state.dropDownReducer.dropDowns,
    language: state.dropDownReducer.language || 'English'
  });

const mapDispatchToProps = dispatch => ({
  selectCategory: (object, playerInfo) =>
    dispatch(selectCategory(object, playerInfo)),
  selectPlayer: (object, playerInfo) =>
    dispatch(selectPlayer(object, playerInfo)),
  getDropDowns: playerInfo => dispatch(getDropDowns(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
