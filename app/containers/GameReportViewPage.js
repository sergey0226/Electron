/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { connect } from 'react-redux';
import TextField from '../constants/TextInput';
import {
  selectCategory,
  selectConvention,
  selectDate
} from '../actions/gameReportViewActions';
import { getDropDowns } from '../actions/dropDownActions';

import Doc from '../constants/DocService';

import * as arrays from '../constants/dropDowns';
import * as fieldsArray from '../constants/textFields';
import * as fieldsArrayJap from '../constants/textFieldsJap';
import * as tableArray from '../constants/tableCols';

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

  table: {
    // minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

const icons = [...fieldsArray.icons2];

const rows = [...tableArray.gameReportViewCols1];
const rows2 = [...tableArray.gameReportViewCols2];
const rows3 = [...tableArray.gameReportViewCols3];

const fields = [...fieldsArray.gameReportViewFields];

let Categories = [...arrays.Category];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'Select',

      convention: 'Select',
      conventions: [],
      date: 'Select',
      dates: [],

      data: [],
      seasonArray: [],
      seasonFlag: false,

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

  componentDidMount() {
    this.setState({
      language: this.props.language
    });
  }

  componentWillReceiveProps(nextProps) {
    const obj = nextProps.dropDownObj;
    this.setState({
      conventions: nextProps.conventions,
      dates: nextProps.dates,
      data: nextProps.players,
      playerInformation: nextProps.playerInformation,
      language: nextProps.language
    });
    if (obj) {
      Categories = obj.Category ? obj.Category : Categories;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data != this.state.data) {
      this.filterArray();
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
      [newVal]: event.target.value,
      seasonFlag: false
    });
  };

  handleSelectConvention = name => (event, value) => {
    const { playerInformation, category, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      value,
      category,
      playerInformation
    };

    this.props.selectConvention(object, playerInfo);
    this.setState({
      [newVal]: event.target.value,
      date: 'Select',
      seasonFlag: false
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
      date: 'Select',
      seasonArray: [],
      seasonFlag: true
    });
  };

  renderTextField = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.gameReportViewFields[from + index];
      const newVal = title.replace(/[./" "]/g, '');

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
          style={{ width: 150, height: 41 }}
          // fullWidth
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

  renderTextFieldSided = (from, to) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.gameReportViewFields[from + index];
      const newVal = title.replace(/[./" "]/g, '');

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
            style={{ width: 150, height: 41,padding:0,margin:0}}
            // fullWidth
            label={title}
            id="outlined-email-input"
            className={classes.textField}
            name={title}
            value={`${value}`}
            onChange={this.handleFieldChange(newVal)}
            margin="dense"
            variant="outlined"
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
    <TableHead style={{ backgroundColor: 'blue' }}>
      <TableRow>
        {rows.map((val, index) => (
          <TableCell
            style={{
              width: 50,
              color: 'white'
            }}
            padding="none"
            align="center"
            key={index}
          >
            {val}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  renderTableHead2 = () => (
    <TableHead style={{ backgroundColor: 'red', }}>
      <TableRow>
        {rows2.map((val, index) => (
          <TableCell
            style={{
              width: 50,
              color: 'white'
            }}
            padding="none"
            align="center"
            key={index}
          >
            {val}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  renderTableHead3 = () => (
    <TableHead style={{ backgroundColor: 'darkgreen'}}>
      <TableRow>
        {rows3.map((val, index) => (
          <TableCell
            style={{
              width: 50,
              color: 'white'
            }}
            padding="none"
            align="center"
            key={index}
          >
            {val}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  filterArray = () => {
    const { data, seasonArray, seasonFlag } = this.state;

    if (seasonFlag) {
      data.map(item => {
        const existing = seasonArray.filter(v => v.second_id == item.second_id);
        if (existing.length) {
          const existingIndex = seasonArray.indexOf(existing[0]);
          [
            'StartingMember',
            'Playedtime',
            'YellowCard',
            'RedCard',
            'Goal(Score)SUCCCESS',
            'totalSUC',
            'totalUNSUC'
          ].map(key => {
            seasonArray[existingIndex][key] += item[key];
          });
        } else {
          seasonArray.push({ ...item });
        }
        this.setState({ seasonArray });
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      category,
      convention,
      conventions,
      date,
      dates,
      data,
      seasonArray,
      language,
      rowsPerPage,
      page
    } = this.state;
    const func = [/* () => window.print(), */ () => this.createPdf()];

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div className={classes.root} id="divToPrint" ref={bodyRef}>
        <div className={classes.innerRoot} elevation={1}>
          <Typography variant="h6" color="primary">
            {language === 'Japanese' ? 'レポートを見る' : 'View Report'}
          </Typography>
          <br />
          <Toolbar>
            <div className={classes.grow}>
              <TextField
                style={{ width: 150 }}
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? 'カテゴリー' : 'Category'}
                className={classes.textField}
                value={category}
                onChange={this.handleCategoryChange('category')}
                SelectProps={{ MenuProps: { className: classes.menu } }}
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
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? '大会名' : 'Convention'}
                className={classes.textField}
                value={convention}
                onChange={this.handleSelectConvention('convention')}
                SelectProps={{ MenuProps: { className: classes.menu } }}
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
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? '日付' : 'Date'}
                className={classes.textField}
                value={date}
                onChange={this.handleGameDateChange('date')}
                SelectProps={{ MenuProps: { className: classes.menu } }}
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
              <div style={{display:'flex',flexDirection:'row'}}>
                {this.renderTextFieldSided(0, 5)}
              </div>
            </div>

            {icons.map((val, index) => (
              <ButtonBase
                disableRipple
                // focusRipple
                // centerRipple
                key={val.title}
                style={{ margin: 5 }}
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

          <Typography className={classes.commentTypo} variant="subtitle2">
            {language === 'Japanese' ? '成功したプレイ' : 'SUCCESS PLAY'}
          </Typography>
          <div>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              {this.renderTableHead()}

              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                        {n.Name1}
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
                        {n.StartingMember}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.Playedtime}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.YellowCard}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.RedCard}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.ShootonTargetSUCCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.MiddleShootontargetSUCCCESS}
                      </TableCell>

                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.ShortPassSUCCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.MediumPassSUCCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.LongPassSUCCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.RightCrossSUCCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.LeftCrossSUCCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.RightCornerKickSUCCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.LeftCornerKickSUCCCESS}
                      </TableCell>

                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.WinTheBallSUCCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.OnevOneDuelSuccessforattackingSUCCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.HeadingAttackingSuccsessSUCCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.HeadingDefensiveSuccessSUCCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.FreeKickSUCCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.PenaltyKickSUCCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n['Goal(Score)SUCCCESS']}
                      </TableCell>

                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n['FineSave(ForGoalKeeper)SUCCCESS']}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n['GoalKick(forGoalKeeper)SUCCCESS']}
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
            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />

          {/* /////////////////////////////////////////// */}
          {/* /////////////////////////////////////////// */}
          {/* /////////////////////////////////////////// */}
          {/* /////////////////////////////////////////// */}

          <Typography className={classes.commentTypo} variant="subtitle2">
            {language === 'Japanese' ? '失敗したプレイ' : 'UNSUCCESS PLAY'}
          </Typography>

          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              {this.renderTableHead2()}

              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                        {n.Name1}
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
                        {n.StartingMember}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.Playedtime}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.YellowCard}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.RedCard}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.ShootofftargetUNSUCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.MiddleShootofftargetUNSUCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.ShortPassNegativeUNSUCCESS}
                      </TableCell>

                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.MediumPassNegativeUNSUCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.LongPassNegativeUNSUCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.OnevOneDefenseunsuccessUNSUCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.LosetheballUNSUCCESS}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.GoalKickunsuccesUNSUCCESS}
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
            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />

          {/* ////////////////////////////////////// */}
          {/* ////////////////////////////////////// */}
          {/* ////////////////////////////////////// */}
          {/* ////////////////////////////////////// */}

          <Typography className={classes.commentTypo} variant="subtitle2">
            {language === 'Japanese' ? 'シーズン合計' : 'SEASON TOTAL'}
          </Typography>

          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              {this.renderTableHead3()}

              <TableBody>
                {seasonArray
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                        {n.Name1}
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
                        {n.StartingMember ? n.StartingMember : 0}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.Playedtime ? n.Playedtime : 0}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.YellowCard ? n.YellowCard : 0}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.RedCard ? n.RedCard : 0}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n['Goal(Score)SUCCCESS']
                          ? n['Goal(Score)SUCCCESS']
                          : 0}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.totalSUC}
                      </TableCell>

                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.totalUNSUC}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 50
                        }}
                        padding="none"
                        align="center"
                      >
                        {n.totalSUC + n.totalUNSUC}
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
            count={seasonArray.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
        </div>
      </div>
    );
  }
}

TechnicalPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    conventions: state.gameReportViewReducer.conventions || [],
    dates: state.gameReportViewReducer.dates || [],
    playerInformation: state.gameReportViewReducer.playerInformation || {},
    players: state.gameReportViewReducer.players || [],
    dropDownObj: state.dropDownReducer.dropDowns,
    language: state.dropDownReducer.language || 'English'
  });

const mapDispatchToProps = dispatch => ({
  selectCategory: (object, playerInfo) =>
    dispatch(selectCategory(object, playerInfo)),
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
