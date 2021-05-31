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
// import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { orange, yellow, blue, pink } from '@material-ui/core/colors';

import { connect } from 'react-redux';
import TextField from '../constants/TextInput';
import { getSeasons, selectSeason } from '../actions/seasonalActions';

import Doc from '../constants/DocService';

import * as arrays from '../constants/dropDowns';
import * as arraysJap from '../constants/dropDownsJap';
import * as tableArray from '../constants/tableCols';
import * as tableArrayJap from '../constants/tableColsJap';
import * as fieldsArray from '../constants/textFields';
import * as fieldsArrayJap from '../constants/textFieldsJap';

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

const fields = [...fieldsArray.seasonalFields];

const rows = [...tableArray.seasonalViewCols];
const Months = [...arrays.Months];
const MonthsJap = [...arraysJap.Months];

const monthNames = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12
};

const colors = [orange[200], yellow[400], pink[100], blue[300]];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      season: 'Select',
      seasons: [],

      data: [],

      language: 'English',
      playerInformation: {},

      page: 0,
      rowsPerPage: 6
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

  sortData = data =>
    data.sort((a, b) => monthNames[a.Month] - monthNames[b.Month]);

  handleSeasonChange = name => (event, value) => {
    const { playerInformation, playerInfo } = this.state;

    const newVal = name.replace(/[./" "]/g, '');
    const screenName = 'View Seasonal Program';
    const object = {
      event,
      screenName,
      playerInformation
    };

    this.props.selectSeason(object, playerInfo);
    this.setState({
      [newVal]: event.target.value
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
              : tableArrayJap.seasonalViewCols[index];
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

  renderMonth = month => MonthsJap[monthNames[month] - 1];

  render() {
    const { classes } = this.props;
    const { season, seasons, data, rowsPerPage, page, language } = this.state;
    const func = [/* () => window.print(), */ () => this.createPdf()];

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    let count = 0;

    return (
      <div className={classes.root} id="divToPrint" ref={bodyRef}>
        <div className={classes.innerRoot} elevation={1}>
          <Typography variant="h6" color="primary">
            {language === 'Japanese'
              ? 'シーズン計画の表示'
              : 'View Seasonal Program'}
          </Typography>
          <br />
          <Toolbar>
            <div className={classes.grow}>
              <TextField
                style={{ width: 200 }}
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
                  Months.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  ).map((val, index) => {
                    let n = {};
                    if (data[count] && data[count].Month === val) {
                      n = data[count];
                      count += 1;
                    } else {
                      n = { Month: val };
                    }
                    return (
                      <TableRow hover tabIndex={-1} key={index}>
                        <TableCell
                          padding="none"
                          align="center"
                          style={{
                            width: 80,
                            fontSize: 16,
                            fontWeight: 500
                          }}
                        >
                          {language === 'Japanese'
                            ? this.renderMonth(n.Month)
                            : n.Month}
                        </TableCell>
                        <TableCell
                          padding="none"
                          align="center"
                          style={{ width: 80, fontSize: 16 }}
                        >
                          {n.PERIODTr}
                        </TableCell>
                        <TableCell padding="none" align="left">
                          {fields.slice(0, 4).map((title, index) => {
                            const label =
                              language === 'English'
                                ? title
                                : fieldsArrayJap.seasonalFields[index];
                            return (
                              <Typography
                                key={index}
                                noWrap
                                variant="body2"
                                style={{
                                  padding: 9,
                                  backgroundColor: colors[index]
                                }}
                              >
                                {label}
                              </Typography>
                            );
                          })}
                        </TableCell>
                        <TableCell style={{}} padding="none" align="center">
                          {fields.slice(0, 4).map((title, index) => (
                            <Typography
                              key={index}
                              noWrap
                              variant="body1"
                              style={{
                                padding: 11,
                                backgroundColor: colors[index]
                              }}
                            >
                              {n[`${title}Tr`] ? n[`${title}Tr`] : '-'}
                            </Typography>
                          ))}
                        </TableCell>
                        <TableCell padding="none" align="left">
                          {fields.slice(0, 4).map((title, index) => (
                            <Typography
                              key={index}
                              noWrap
                              variant="body1"
                              style={{
                                padding: 11,
                                backgroundColor: colors[index]
                              }}
                            >
                              {n[`${title}text`] ? n[`${title}text`] : '-'}
                            </Typography>
                          ))}
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
            rowsPerPageOptions={[6, 12]}
            component="div"
            count={Months.length}
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
    seasons: state.seasonalReducer.seasons || [],
    data: state.seasonalReducer.data || [],
    language: state.dropDownReducer.language || 'English'
  });

const mapDispatchToProps = dispatch => ({
  getSeasons: playerInfo => dispatch(getSeasons(playerInfo)),
  selectSeason: (object, playerInfo) =>
    dispatch(selectSeason(object, playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
