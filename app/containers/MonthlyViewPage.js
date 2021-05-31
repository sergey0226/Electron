/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable global-require */
// @flow
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
// import TextField from '../constants/TextInput';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { connect } from 'react-redux';
import {
  getSeasons,
  selectSeason,
  selectYear,
  selectMonth
} from '../actions/monthlyActions';

import Doc from '../constants/DocService';

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

const rows = [...tableArray.monthlyViewCols];
const daysArray = [...Array(31).keys()];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      season: 'Select',
      seasons: [],
      year: 'Select',
      years: [],
      month: 'Select',
      months: [],

      data: [],

      language: 'English',
      playerInformation: {},

      page: 0,
      rowsPerPage: 7
    };
  }

  componentWillMount() {
    const { playerInfo } = this.props;

    this.setState({
      playerInfo
    });
    this.props.getSeasons(playerInfo);
  }

  componentDidMount() {
    this.setState({
      language: this.props.language
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      language: nextProps.language,
      seasons: nextProps.seasons,
      years: nextProps.years,
      months: nextProps.months,
      data: this.sortData(nextProps.data)
    });
  }

  componentWillUnmount() {
    const { playerInfo } = this.state;

    this.props.selectSeason(
      { event: { target: { value: 'Select' } } },
      playerInfo
    );
  }

  sortData = data => data.sort((a, b) => parseFloat(a.Day) - parseFloat(b.Day));

  handleMonthChange = name => (event, value) => {
    const { playerInformation, season, year, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const screenName = 'View Monthly Program';
    const object = {
      event,
      season,
      year,
      screenName,
      playerInformation
    };

    this.props.selectMonth(object, playerInfo);
    this.setState({
      [newVal]: event.target.value
    });
  };

  handleYearChange = name => (event, value) => {
    const { playerInformation, season, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      season,
      playerInformation
    };

    this.props.selectYear(object, playerInfo);
    this.setState({
      [newVal]: event.target.value,
      month: 'Select'
    });
  };

  handleSeasonChange = name => (event, value) => {
    const { playerInformation, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const object = {
      event,
      playerInformation
    };

    this.props.selectSeason(object, playerInfo);
    this.setState({
      [newVal]: event.target.value,
      year: 'Select',
      month: 'Select'
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
    <TableHead style={{ backgroundColor: 'green'}}>
      <TableRow>
        {rows.map((title, index) => {
          const label =
            this.state.language === 'English'
              ? title
              : tableArrayJap.monthlyViewCols[index];
          return (
            <TableCell
              style={{
                width: 50,
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

  render() {
    const { classes } = this.props;
    const {
      season,
      seasons,
      year,
      years,
      month,
      months,
      data,
      language,
      rowsPerPage,
      page
    } = this.state;
    const func = [/* () => window.print(), */ () => this.createPdf()];

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    let count = 0;
    return (
      <div className={classes.root} id="divToPrint" ref={bodyRef}>
        <div className={classes.innerRoot} elevation={1}>
          <Typography variant="h6" color="primary">
            {language === 'Japanese'
              ? '月間計画を表示'
              : 'View Monthly Program'}
          </Typography>
          <br />
          <Toolbar>
            <div className={classes.grow}>
              <TextField
                style={{ width: 150 }}
                // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? 'シーズン' : 'Season'}
                className={classes.textField}
                value={season}
                onChange={this.handleSeasonChange('season')}
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
                {seasons &&
                  seasons.map((value, index) => (
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
                label={language === 'Japanese' ? '年' : 'Year'}
                className={classes.textField}
                value={year}
                onChange={this.handleYearChange('year')}
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
                {years &&
                  years.map((value, index) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                style={{ width: 150 }}
                // fullWidth
                id="outlined-select-currency"
                select
                label={language === 'Japanese' ? '月' : 'Month'}
                className={classes.textField}
                value={month}
                onChange={this.handleMonthChange('month')}
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
                {months &&
                  months.map(value => (
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

          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              {this.renderTableHead()}

              <TableBody>
                {data.length !== 0 ? (
                  daysArray
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((val, index) => {
                      let n = {};
                      if (data[count] && data[count].Day === index + 1) {
                        n = data[count];
                        count += 1;
                      } else {
                        n = { Day: index + 1 };
                      }
                      return (
                        <TableRow hover tabIndex={-1} key={index}>
                          <TableCell
                            style={{
                              width: 50
                            }}
                            padding="none"
                            align="center"
                          >
                            {n.Day}
                          </TableCell>
                          <TableCell
                            style={{
                              width: 50
                            }}
                            padding="none"
                            align="center"
                          >
                            {n.WeekDay}
                          </TableCell>
                          <TableCell
                            style={{
                              width: 50
                            }}
                            padding="none"
                            align="center"
                          >
                            {n.Intensity}
                          </TableCell>
                          <TableCell
                            style={{
                              width: 50
                            }}
                            padding="none"
                            align="center"
                          >
                            {n.WUP}
                          </TableCell>
                          <TableCell
                            style={{
                              width: 50
                            }}
                            padding="none"
                            align="center"
                          >
                            {n.Physical}
                          </TableCell>
                          <TableCell
                            style={{
                              width: 50
                            }}
                            padding="none"
                            align="center"
                          >
                            {n.Technical}
                          </TableCell>
                          <TableCell
                            style={{
                              width: 50
                            }}
                            padding="none"
                            align="center"
                          >
                            {n.Tr1}
                          </TableCell>
                          <TableCell
                            style={{
                              width: 50
                            }}
                            padding="none"
                            align="center"
                          >
                            {n.Tr2}
                          </TableCell>
                          <TableCell
                            style={{
                              width: 50
                            }}
                            padding="none"
                            align="center"
                          >
                            {n.Tactical}
                          </TableCell>
                          <TableCell
                            style={{
                              width: 50
                            }}
                            padding="none"
                            align="center"
                          >
                            {n.Tr}
                          </TableCell>
                          <TableCell
                            style={{
                              width: 50
                            }}
                            padding="none"
                            align="center"
                          >
                            {n.SSG}
                          </TableCell>
                          <TableCell
                            style={{
                              width: 50
                            }}
                            padding="none"
                            align="center"
                          >
                            {n.Game}
                          </TableCell>
                          <TableCell
                            style={{
                              width: 50
                            }}
                            padding="none"
                            align="center"
                          >
                            {n.MainTheme}
                          </TableCell>
                          <TableCell
                            style={{
                              width: 50
                            }}
                            padding="none"
                            align="center"
                          >
                            {n.Grand}
                          </TableCell>
                        </TableRow>
                      );
                    })
                ) : (
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
            rowsPerPageOptions={[7, 15, 31]}
            component="div"
            count={daysArray.length}
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
    );
  }
}

TechnicalPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    seasons: state.monthlyReducer.seasons || [],
    years: state.monthlyReducer.years || [],
    months: state.monthlyReducer.months || [],
    data: state.monthlyReducer.data || [],
    language: state.dropDownReducer.language || 'English'
  });

const mapDispatchToProps = dispatch => ({
  getSeasons: playerInfo => dispatch(getSeasons(playerInfo)),
  selectSeason: (object, playerInfo) =>
    dispatch(selectSeason(object, playerInfo)),
  selectYear: (object, playerInfo) => dispatch(selectYear(object, playerInfo)),
  selectMonth: (object, playerInfo) => dispatch(selectMonth(object, playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
