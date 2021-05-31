/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prefer-destructuring */
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { connect } from 'react-redux';
import Checkbox from '../constants/CheckBox';
import TextField from '../constants/TextInput';
import {
  selectCategory,
  selectTeam,
  selectDate
} from '../actions/memberListViewActions';
import { getDropDowns } from '../actions/dropDownActions';

import Doc from '../constants/DocService';

import * as arrays from '../constants/dropDowns';
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
    width: '100%',
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
  }
});

const icons = [...fieldsArray.icons2];

const fields = [...fieldsArray.memberViewFields];

let Categories = [...arrays.Category];

const rows = [...tableArray.memberListViewCols];
const texts = [
  'Date',
  'Venue',
  'Opposition',
  "Director's Sign",
  'TEAM STAFF',
  'Manager',
  'H.Coach',
  'A.Coach',
  'Ph.Coach',
  'Kitt Manager',
  'NAME 1',
  'NAME 2',
  'UNIFORM COLOR',
  'FP Home',
  'FP Away',
  'GK Home',
  'GK Away',
  'SHIRT',
  'SHORTS',
  'STOCKING',
  'S.No',
  'REMARKS'
];

const textsJap = [
  '日付',
  '会場',
  '相手チーム',
  '監督のサイン',
  'チームスタッフ',
  'マネージャー',
  'H.コーチ',
  'A.コーチ',
  'Ph.コーチ',
  'キットマネージャー',
  '名前1',
  '名前2',
  'ユニフォームカラー',
  'FPホーム',
  'FPアウェイ',
  'GKホーム',
  'GKアウェイ',
  'シャツ',
  'ショーツ',
  'ストック',
  'S.No',
  '備考'
];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'Select',

      team: 'Select',
      teams: [],
      gameDate: 'Select',
      dates: [],

      data: [],

      language: 'English',
      playerInformation: {},

      page: 0,
      rowsPerPage: 5
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
      teams: nextProps.teams,
      dates: nextProps.dates,
      playerInformation: nextProps.playerInformation,
      data: nextProps.players,
      language: nextProps.language
    });
    if (obj) {
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

  handleSelectDate = name => (event, value) => {
    const { playerInformation, team, category, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const dateObject = {
      event,
      value,
      category,
      team,
      playerInformation
    };

    this.props.selectDate(playerInfo, dateObject);
    this.setState({
      [newVal]: event.target.value
    });
  };

  handleSelectTeam = name => (event, value) => {
    const { playerInformation, category, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      value,
      category,
      playerInformation
    };

    this.props.selectTeam(object, playerInfo);
    this.setState({
      [newVal]: event.target.value,
      gameDate: 'Select'
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
      team: 'Select',
      gameDate: 'Select'
    });
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

  renderTextField = (from, to, keyWord, shortWidth) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.memberViewFields[from + index];
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
          style={shortWidth ? { width: 150, height: 41 } : { height: 41 }}
          fullWidth={!shortWidth}
          id="outlined-email-input"
          // label={label}
          className={classes.textField}
          name={title}
          value={`${value}`}
          onChange={this.handleFieldChange(newVal)}
          margin="dense"
          variant="outlined"
          InputProps={{
            readOnly: true
          }}
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
        />
      );
    });
  };

  createPdf = () => {
    const html = bodyRef.current;
    Doc.createPdf(html);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  renderTableHead = () => (
    <TableHead style={{ backgroundColor: 'blue'}}>
      <TableRow>
        {rows.map((title, index) => {
          const label =
            this.state.language === 'English'
              ? title
              : tableArrayJap.memberListViewCols[index];
          return (
            <TableCell
              style={{
                width: 60,
                color: 'white'
              }}
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

  renderText = index => {
    const label =
      this.state.language === 'English' ? texts[index] : textsJap[index];
    return label;
  };

  render() {
    const { classes } = this.props;
    const {
      category,
      team,
      teams,
      gameDate,
      dates,
      playerInformation,
      data,
      rowsPerPage,
      page,
      language
    } = this.state;
    const func = [/* () => window.print(), */ () => this.createPdf()];

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div className={classes.root} id="divToPrint" ref={bodyRef}>
        <div className={classes.innerRoot} elevation={1}>
          <Typography variant="h6" color="primary">
            {language === 'Japanese'
              ? 'メンバー表を見る'
              : 'View Member List for Game'}
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
              <TextField
                style={{ width: 150 }}
                // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? '日付' : 'Date'}
                className={classes.textField}
                value={gameDate}
                onChange={this.handleSelectDate('gameDate')}
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
                  dates.map((value, index) => (
                    <MenuItem key={value} value={value}>
                      {value}
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
          <br />

          <Grid
            container
            spacing={0}
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item xs={7} container justify="flex-start">
              <div style={{ width: '100%', marginRight: 10 }}>
                <div className={classes.tableWrapper}>
                  <Table className={classes.table} aria-labelledby="tableTitle">
                    {this.renderTableHead()}

                    <TableBody>
                      {data
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((n, index) => (
                          <TableRow hover tabIndex={-1} key={index}>
                            <TableCell
                              style={{
                                width: 50
                              }}
                              padding="none"
                              align="center"
                            >
                              {index + 1}
                            </TableCell>

                            <TableCell
                              style={{
                                width: 50
                              }}
                              padding="none"
                              align="center"
                            >
                              {n.LicenseNo}
                            </TableCell>
                            <TableCell
                              style={{
                                width: 50
                              }}
                              padding="none"
                              align="center"
                            >
                              <Checkbox
                                checked={n.Cap}
                                inputProps={{
                                  'aria-label': 'primary checkbox'
                                }}
                              />
                            </TableCell>
                            <TableCell
                              style={{
                                width: 50
                              }}
                              padding="none"
                              align="center"
                            >
                              {n.Position}
                            </TableCell>
                            <TableCell
                              style={{
                                width: 50
                              }}
                              padding="none"
                              align="center"
                            >
                              {n.Name1}
                            </TableCell>
                            <TableCell
                              style={{
                                width: 50
                              }}
                              padding="none"
                              align="center"
                            >
                              {n.Name2}
                            </TableCell>
                            <TableCell
                              style={{
                                width: 50
                              }}
                              padding="none"
                              align="center"
                            >
                              {n.UniformNo}
                            </TableCell>
                            <TableCell
                              style={{
                                width: 50
                              }}
                              padding="none"
                              align="center"
                            >
                              <Checkbox
                                checked={n.Start}
                                inputProps={{
                                  'aria-label': 'primary checkbox'
                                }}
                              />
                            </TableCell>
                            <TableCell
                              style={{
                                width: 50
                              }}
                              padding="none"
                              align="center"
                            >
                              <Checkbox
                                checked={n.Sub}
                                inputProps={{
                                  'aria-label': 'primary checkbox'
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
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
            </Grid>

            <Grid item xs={5} container justify="center" direction="column">
              <Grid container direction="row">
                <Grid item xs container justify="flex-start">
                  {fields.slice(4, 6).map((title, index) => {
                    const label =
                      language === 'English'
                        ? title
                        : fieldsArrayJap.memberViewFields[4 + index];
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

                <Grid item xs>
                  {this.renderTextField(4, 6, '')}
                </Grid>
              </Grid>
              <br />
              <Grid container direction="row">
                <Grid item xs={4}>
                  <Typography noWrap className={classes.tablePadding}>
                    {this.renderText(0)}
                  </Typography>
                  <Typography noWrap className={classes.tablePadding}>
                    {this.renderText(1)}
                  </Typography>
                  <Typography noWrap className={classes.tablePadding}>
                    {this.renderText(2)}
                  </Typography>
                  <Typography noWrap className={classes.tablePadding}>
                    {this.renderText(3)}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.GameDate
                      ? this.renderDate('GameDate')
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.Venue ? playerInformation.Venue : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.Opposition
                      ? playerInformation.Opposition
                      : '-'}
                  </Typography>
                </Grid>
              </Grid>
              <br />
              <Grid container direction="row">
                <Grid item xs={4}>
                  <Typography
                    noWrap
                    variant="subtitle2"
                    style={{ backgroundColor: 'blue', color: 'white' }}
                    className={classes.tablePadding}
                  >
                    {this.renderText(4)}
                  </Typography>
                  <Typography noWrap className={classes.tablePadding}>
                    {this.renderText(5)}
                  </Typography>
                  <Typography noWrap className={classes.tablePadding}>
                    {this.renderText(6)}
                  </Typography>
                  <Typography noWrap className={classes.tablePadding}>
                    {this.renderText(7)}
                  </Typography>
                  <Typography noWrap className={classes.tablePadding}>
                    {this.renderText(8)}
                  </Typography>
                  <Typography noWrap className={classes.tablePadding}>
                    {this.renderText(9)}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    noWrap
                    variant="subtitle2"
                    style={{ backgroundColor: 'green', color: 'white' }}
                    className={classes.tablePadding}
                  >
                    {this.renderText(10)}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.ManagerName1
                      ? playerInformation.ManagerName1
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.HCoachName1
                      ? playerInformation.HCoachName1
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.ACoachName1
                      ? playerInformation.ACoachName1
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.PhCoachName1
                      ? playerInformation.PhCoachName1
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.KittManagerName1
                      ? playerInformation.KittManagerName1
                      : '-'}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    noWrap
                    variant="subtitle2"
                    style={{ backgroundColor: 'green', color: 'white' }}
                    className={classes.tablePadding}
                  >
                    {this.renderText(11)}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.ManagerName2
                      ? playerInformation.ManagerName2
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.HCoachName2
                      ? playerInformation.HCoachName2
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.ACoachName2
                      ? playerInformation.ACoachName2
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.PhCoachName2
                      ? playerInformation.PhCoachName2
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.KittManagerName2
                      ? playerInformation.KittManagerName2
                      : '-'}
                  </Typography>
                </Grid>
              </Grid>
              <br />
              <Grid container direction="row">
                <Grid item xs={6}>
                  <Typography
                    noWrap
                    variant="subtitle2"
                    style={{ backgroundColor: 'blue', color: 'white' }}
                    className={classes.tablePadding}
                  >
                    {this.renderText(12)}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {this.renderText(13)}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {this.renderText(14)}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {this.renderText(15)}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {this.renderText(16)}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    noWrap
                    variant="subtitle2"
                    style={{ backgroundColor: 'green', color: 'white' }}
                    className={classes.tablePadding}
                  >
                    {this.renderText(17)}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.FPHomeSHIRT
                      ? playerInformation.FPHomeSHIRT
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.FPAwaySHIRT
                      ? playerInformation.FPAwaySHIRT
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.GKHomeSHIRT
                      ? playerInformation.GKHomeSHIRT
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.GKAwaySHIRT
                      ? playerInformation.GKAwaySHIRT
                      : '-'}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    noWrap
                    variant="subtitle2"
                    style={{ backgroundColor: 'green', color: 'white' }}
                    className={classes.tablePadding}
                  >
                    {this.renderText(18)}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.FPHomeSHORTS
                      ? playerInformation.FPHomeSHORTS
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.FPAwaySHORTS
                      ? playerInformation.FPAwaySHORTS
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.GKHomeSHORTS
                      ? playerInformation.GKHomeSHORTS
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.GKAwaySHORTS
                      ? playerInformation.GKAwaySHORTS
                      : '-'}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    noWrap
                    variant="subtitle2"
                    style={{ backgroundColor: 'green', color: 'white' }}
                    className={classes.tablePadding}
                  >
                    {this.renderText(19)}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.FPHomeSTOCKINGS
                      ? playerInformation.FPHomeSTOCKINGS
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.FPAwaySTOCKINGS
                      ? playerInformation.FPAwaySTOCKINGS
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.GKHomeSTOCKINGS
                      ? playerInformation.GKHomeSTOCKINGS
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.GKAwaySTOCKINGS
                      ? playerInformation.GKAwaySTOCKINGS
                      : '-'}
                  </Typography>
                </Grid>
              </Grid>
              <br />
              <Grid container direction="row">
                <Grid item xs={2}>
                  <Typography
                    variant="subtitle2"
                    style={{ backgroundColor: 'blue', color: 'white' }}
                    className={classes.tablePadding}
                  >
                    {this.renderText(20)}
                  </Typography>
                  <Typography className={classes.tablePadding}>1</Typography>
                  <Typography className={classes.tablePadding}>2</Typography>
                  <Typography className={classes.tablePadding}>3</Typography>
                  <Typography className={classes.tablePadding}>4</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    variant="subtitle2"
                    style={{ backgroundColor: 'green', color: 'white' }}
                    className={classes.tablePadding}
                  >
                    {this.renderText(21)}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.Remarks1
                      ? playerInformation.Remarks1
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.Remarks2
                      ? playerInformation.Remarks2
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.Remarks3
                      ? playerInformation.Remarks3
                      : '-'}
                  </Typography>
                  <Typography className={classes.tablePadding}>
                    {playerInformation.Remarks4
                      ? playerInformation.Remarks4
                      : '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

TechnicalPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    teams: state.memberListViewReducer.teams || [],
    dates: state.memberListViewReducer.dates || [],
    playerInformation: state.memberListViewReducer.playerInformation || {},
    players: state.memberListViewReducer.players || [],
    dropDownObj: state.dropDownReducer.dropDowns,
    language: state.dropDownReducer.language || 'English'
  });

const mapDispatchToProps = dispatch => ({
  selectCategory: (object, playerInfo) =>
    dispatch(selectCategory(object, playerInfo)),
  selectTeam: (object, playerInfo) => dispatch(selectTeam(object, playerInfo)),
  selectDate: (object, playerInfo) => dispatch(selectDate(object, playerInfo)),
  getDropDowns: playerInfo => dispatch(getDropDowns(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
