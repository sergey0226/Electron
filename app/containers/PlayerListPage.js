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

import { connect } from 'react-redux';
import InlineDatePicker from '../constants/InlineDatePicker';
import TextField from '../constants/TextInput';
import {
  selectCategory,
  selectPlayer,
  selectDate,
  getSeasons
} from '../actions/playerListActions';
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
    // color: 'red',
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

  fab: {
    width: 35,
    height: 30,
    margin: 5,
    marginTop: 20
  }
});

const icons = [...fieldsArray.icons];

const fields = [...fieldsArray.playerListFields];

let Categories = [...arrays.Category];
const Attendance = [...arrays.Attendance];
const Absent = [...arrays.Absent];
let Seasons = [...arrays.Seasons];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'Select',

      player: 'Select',
      players: [],
      date: 'Select',
      dates: [],

      language: 'English',
      playerInformation: {}
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

    this.setState({
      players: nextProps.players,
      dates: nextProps.dates,
      playerInformation: nextProps.playerInformation,
      language: nextProps.language
    });
    if (obj) {
      Categories = obj.Category ? obj.Category : Categories;
    }
    Seasons = nextProps.seasons;
  }

  componentWillUnmount() {
    const { playerInfo } = this.state;

    this.props.selectCategory(
      { event: { target: { value: 'Select' } } },
      playerInfo
    );
  }

  handleDateChange = testNo => date => {
    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [testNo]: date
      }
    }));
  };

  handleGameDateChange = name => (event, value) => {
    const { playerInformation, category, playerKey, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');

    const object = {
      event,
      value,
      playerInformation,
      category,
      playerKey
    };

    this.props.selectDate(object, playerInfo);

    this.setState({
      [newVal]: event.target.value
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
      date: 'Select',
      playerKey: value.key
    });
  };

  handleCategoryChange = name => (event, value) => {
    const { playerInformation, players, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      playerInformation
    };

    this.props.selectCategory(object, playerInfo);

    this.setState({
      [newVal]: event.target.value,
      player: 'Select',
      date: 'Select'
    });
  };

  renderDatePicker = (title, cssClass) => {
    const { playerInformation, language } = this.state;
    const { classes } = this.props;
    const newVal = title.replace(/[./" "]/g, '');
    const value = playerInformation[newVal];
    const label = language === 'Japanese' ? '日付' : title;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="picker">
          <InlineDatePicker
            style={
              cssClass
                ? { marginTop: -15, marginBottom: -15 }
                : { height: 45, width: 180, marginTop: 3, marginLeft: 3 }
            }
            keyboard
            clearable
            disableFuture
            variant="outlined"
            label={label}
            format="dd/MM/yyyy"
            value={value}
            onChange={this.handleDateChange(newVal)}
            // className={classes.textField}
            // autoOk={false}
            // views={['year', 'month', 'day']}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        </div>
      </MuiPickersUtilsProvider>
    );
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

  handleFieldChange = name => event => {
    const newVal = name.replace(/[./" "]/g, '');
    const {value} = event.target;

    this.setState(prevState => ({
      playerInformation: {
        ...prevState.playerInformation,
        [newVal]: value
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
          : fieldsArrayJap.playerListFields[from + index];
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
            height:36
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
          InputProps={
            {
              style:{
                fontSize:14,
                padding:10
              }
            }
          }
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
          : fieldsArrayJap.playerListFields[from + index];
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
            height: 36
          }}
          key={index}
          select
          fullWidth
          id="outlined-email-input"
          className={classes.textField}
          onChange={this.handleFieldChange(title)}
          name={title}
          margin="dense"
          variant="outlined"
          value={value}
          inputProps={{
            style: {
              padding:10,
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

  renderSelectTextField2 = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.playerListFields[from + index];
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
            width: 180,
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
          value={value}
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

  selectMenu = val => {
    const newVal = val.replace(/[./" "]/g, '');
    if (newVal === 'Attendance') {
      return Attendance.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
        </MenuItem>
      ));
    }
    if (newVal === 'Absent') {
      return Absent.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
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

  saveData = () => {
    let { playerInformation, players, playerInfo } = this.state;

    if (playerInformation.second_id) {
      playerInfo.update(
        { _id: playerInformation._id },
        playerInformation,
        {},
        (err, numReplaced) => {
          playerInformation = {};
          this.setState({
            category: 'Select',
            player: 'Select',
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
      const fileName = 'playerList';
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

  render() {
    const { classes } = this.props;
    const { category, player, players, date, dates, language } = this.state;
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
              ? 'プレイヤーリストを追加'
              : 'Add Player List'}
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
              <TextField
                style={{ width: 200 }}
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
                <MenuItem value="New">
                  {language === 'Japanese' ? '新規' : 'New'}
                </MenuItem>
                {dates &&
                  dates.map(value => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
              </TextField>
              <br />
              {this.renderSelectTextField2(12, 13)}
              {this.renderDatePicker('Game Date')}
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
              <Grid
                item
                xs
                container
                justify="flex-start"
                style={{
                  paddingTop: 30
                }}
              >
                {fields.slice(0, 8).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.playerListFields[index];
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
                {this.renderTextField(0, 5)}
                {this.renderSelectTextField(5, 6)}
                {this.renderSelectTextField(6, 7)}
                {this.renderTextField(7, 8)}
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
                {fields.slice(8, 12).map((title, index) => {
                  const label =
                    language === 'English'
                      ? title
                      : fieldsArrayJap.playerListFields[8 + index];
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
                {this.renderTextField(8, 12)}
              </Grid>
            </Grid>
          </div>
        </div>
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
    playerInformation: state.playerListReducer.playerInformation,
    players: state.playerListReducer.players || [],
    dates: state.playerListReducer.dates || [],
    seasons: state.playerListReducer.seasons || [],
    dropDownObj: state.dropDownReducer.dropDowns,
    language: state.dropDownReducer.language || 'English'
  });

const mapDispatchToProps = dispatch => ({
  selectCategory: (object, playerInfo) =>
    dispatch(selectCategory(object, playerInfo)),
  selectPlayer: (object, playerInfo) =>
    dispatch(selectPlayer(object, playerInfo)),
  selectDate: (object, playerInfo) => dispatch(selectDate(object, playerInfo)),
  getSeasons: playerInfo => dispatch(getSeasons(playerInfo)),
  getDropDowns: playerInfo => dispatch(getDropDowns(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
