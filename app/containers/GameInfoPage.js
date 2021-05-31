/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
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
import {
  selectCategory,
  selectConvention,
  selectDate,
  getSeasons
} from '../actions/gameInfoActions';
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

  commentTypo: {
    borderBottom: '3px solid rgba(26, 43, 117, 1)',
    paddingTop: 10,
    paddingBottom: 5,
    marginRight: 10,
    marginBottom: 15
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

const fields = [...fieldsArray.gameInfoFields];
const eyeFields = ['Field', 'Weather', 'Coach Name', 'Opposition'];

let Categories = [...arrays.Category];

let Field = [...arrays.Field];
let Weather = [...arrays.Weather];
let CoachName = [...arrays.CoachName];
let Opposition = [...arrays.Opposition];
let Seasons = [...arrays.Seasons];

let optionTextFields = ['Option'];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'Select',

      convention: 'Select',
      conventions: [],
      date: 'Select',
      dates: [],

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
    Seasons = nextProps.seasons;
    this.setState({
      playerInformation: nextProps.playerInformation,
      conventions: nextProps.conventions,
      dates: nextProps.dates,
      language: nextProps.language
    });

    if (obj) {
      Field = obj.Field ? obj.Field : Field;
      Weather = obj.Weather ? obj.Weather : Weather;
      CoachName = obj.CoachName ? obj.CoachName : CoachName;
      Opposition = obj.Opposition ? obj.Opposition : Opposition;
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

  handleGameDateChange = name => (event, value) => {
    const { playerInformation, category, convention, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      value,
      playerInformation,
      category,
      convention
    };

    this.props.selectDate(object, playerInfo);
    this.setState({
      [newVal]: event.target.value
    });
  };

  handleSelectConvention = name => (event, value) => {
    const { playerInformation, category, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      value,
      playerInformation,
      category
    };

    this.props.selectConvention(object, playerInfo);
    this.setState({
      [newVal]: event.target.value,
      date: 'Select'
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
      convention: 'Select',
      date: 'Select'
    });
  };

  renderTextField = (from, to, keyWord) => {
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
            height:38
          }}
          fullWidth
          id="outlined-email-input"
          // label={title}
          placeholder="0"
          className={classes.textField}
          name={title}
          value={`${value}`}
          onChange={this.handleFieldChange(newVal)}
          margin="dense"
          variant="outlined"
          inputProps={{
            style:{
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
          : fieldsArrayJap.gameInfoFields[from + index];
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
          // placeholder="0"
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
    if (newVal === 'Season') {
      return Seasons.map((value, index) => (
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

    if (newVal === 'Field') {
      optionTextFields.map((value, index) => Field.push(optionText[index]));
    }
    if (newVal === 'Weather') {
      optionTextFields.map((value, index) => Weather.push(optionText[index]));
    }
    if (newVal === 'CoachName') {
      optionTextFields.map((value, index) => CoachName.push(optionText[index]));
    }
    if (newVal === 'Opposition') {
      optionTextFields.map((value, index) =>
        Opposition.push(optionText[index])
      );
    }

    this.setState({ open: false, optionText: [] });
    optionTextFields = optionTextFields.slice(0, 1);
  };

  saveData = () => {
    let {
      playerInformation,
      category,
      convention,
      date,
      playerInfo
    } = this.state;

    playerInformation = {
      ...playerInformation,
      Category: category,
      ConventionName: convention,
      GameDate: date,
      fileName: 'gameInfo'
    };

    let dropDowns = {
      Field,
      Weather,
      CoachName,
      Opposition,
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
            convention: 'Select',
            date: 'Select',
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
      category,
      convention,
      conventions,
      date,
      dates,
      playerInformation,
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
            {language === 'Japanese' ? 'ゲームスタツ' : 'Game Statistic'}
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
                {conventions &&
                  conventions.map((value, index) => (
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
              </TextField>
              <br />
              {this.renderSelectTextField(0, 1)}
              {this.renderSelectTextField(1, 2)}
              {this.renderSelectTextField(2, 3)}
              {this.renderSelectTextField(3, 4)}
              {this.renderSelectTextField(4, 5)}
            </div>

            {icons.map((val, index) => {
              if(val.title !== "Pdf"){
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
                  style={{ paddingTop: 22, color: 'red', marginLeft: 14 }}
                >
                  {language === 'Japanese' ? '結果' : 'Result'}
                </Typography>
                {fields.slice(5, 8).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.gameInfoFields[5 + index];
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
                {this.renderTextField(5, 8, 'RESULT')}
              </Grid>

              <Grid
                item
                xs
                container
                justify="center"
                style={{
                  paddingRight: 20
                }}
              >
                <Typography
                  noWrap
                  variant="subtitle2"
                  className={classes.headings2}
                  style={{ paddingTop: 22, paddingBottom: 7 }}
                >
                  {language === 'Japanese' ? '相手チーム' : 'Opposition'}
                </Typography>
                {this.renderTextField(5, 8, 'RESULTOPP')}
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
                  {language === 'Japanese' ? 'ゲームスタッツ' : 'Statistics'}
                </Typography>
                {fields.slice(8, 15).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.gameInfoFields[8 + index];
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
                style={{ paddingTop: 80 }}
              >
                {this.renderTextField(8, 15, 'STATISTICS')}
              </Grid>
              <Grid item xs container justify="center">
                <Typography
                  noWrap
                  variant="subtitle2"
                  className={classes.headings2}
                  style={{ paddingTop: 22, paddingBottom: 7 }}
                >
                  {language === 'Japanese' ? '相手チーム' : 'Opposition'}
                </Typography>
                {this.renderTextField(8, 15, 'STATOPP')}
              </Grid>
            </Grid>
          </div>
          <br />
          <Typography className={classes.commentTypo} variant="subtitle2">
            {language === 'English' ? `Game Note` : 'ゲームノート'}
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
                  (playerInformation.GameNote ? playerInformation.GameNote : '')
                }
                onChange={this.handleFieldChange('GameNote')}
                multiline
                rows="4"
                rowsMax="4"
                margin="dense"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Typography className={classes.commentTypo} variant="subtitle2">
            {language === 'English' ? `Problem` : '問題'}
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
                style={{ margin: '0px 10px 0px -1px',height:40 }}
                inputProps={{
                  style:{
                    padding:10
                  }
                }}
                fullWidth
                id="outlined-multiline-flexible"
                label={language === 'Japanese' ? 'コメント' : 'Comments'}
                value={
                  playerInformation &&
                  (playerInformation.Problem ? playerInformation.Problem : '')
                }
                onChange={this.handleFieldChange('Problem')}
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
    conventions: state.gameInfoReducer.conventions || [],
    dates: state.gameInfoReducer.dates || [],
    playerInformation: state.gameInfoReducer.playerInformation || {},
    seasons: state.gameInfoReducer.seasons || ['Select'],
    dropDownObj: state.dropDownReducer.dropDowns,
    language: state.dropDownReducer.language || 'English'
  });

const mapDispatchToProps = dispatch => ({
  selectCategory: (object, playerInfo) =>
    dispatch(selectCategory(object, playerInfo)),
  selectConvention: (object, playerInfo) =>
    dispatch(selectConvention(object, playerInfo)),
  selectDate: (object, playerInfo) => dispatch(selectDate(object, playerInfo)),
  getSeasons: playerInfo => dispatch(getSeasons(playerInfo)),
  getDropDowns: playerInfo => dispatch(getDropDowns(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
