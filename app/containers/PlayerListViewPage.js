/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable global-require */
// @flow
import React, { Component } from 'react';
import ReactExport from 'react-data-export';
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
selectSeason,
selectDate
} from '../actions/playerListViewActions';
import { getDropDowns } from '../actions/dropDownActions';

import Doc from '../constants/DocService';

import * as arrays from '../constants/dropDowns';
import * as fieldsArray from '../constants/textFields';
import * as fieldsArrayJap from '../constants/textFieldsJap';
import * as tableArray from '../constants/tableCols';
import * as tableArrayJap from '../constants/tableColsJap';

const bodyRef = React.createRef();
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


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

let Categories = [...arrays.Category];

const rows = [...tableArray.playerListViewCols];
const exportCols = [...tableArray.playerListViewColsForExportExcel];

class TechnicalPage extends Component {
constructor(props) {
  super(props);
  this.state = {
    category: 'Select',
    season: 'Select',
    seasons: [],
    date: 'Select',
    dates: [],
    data: [],
    language: 'English',
    playerInformation: {},
    expertExcelImage: require('../assets/images/icons/save.png'),
    page: 0,
    rowsPerPage: 5,
    exportCols
    
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
    seasons: nextProps.seasons,
    dates: nextProps.dates,
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

handleSelectDate = name => (event, value) => {
  const { playerInformation, season, category, playerInfo } = this.state;
  const newVal = name.replace(/[./" "]/g, '');
  const dateObject = {
    event,
    value,
    category,
    season,
    playerInformation
  };

  this.props.selectDate(playerInfo, dateObject);

  this.setState({
    [newVal]: event.target.value
  });
};

handleSeasonChange = name => (event, value) => {
  const { playerInformation, category, playerInfo } = this.state;
  const newVal = name.replace(/[./" "]/g, '');
  const seasonObject = {
    event,
    value,
    category,
    playerInformation
  };

  this.props.selectSeason(playerInfo, seasonObject);

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
    season: 'Select',
    date: 'Select'
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
            : tableArrayJap.playerListViewCols[index];
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
    category,
    language,
    seasons,
    season,
    dates,
    date,
    data,    
    rowsPerPage,
    page, 
    expertExcelImage,
    exportCols,
   
  } = this.state;
  const func = [/* () => window.print(), */ () => this.createPdf()];

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const exportData = [];
  data.map((n, index) => {
       const temp = [];       
       const sno = {value : index + 1};
       const Name1 = {value : n.Name1};
       const Name2 = {value : n.Name2};
       const Position = {value : n.Position};
       const Age = {value : n.Age};
       const SchoolYear = {value : n.SchoolYear};
       const Absent = {value : n.Absent};
       const Attendance = {value : n.Attendance};
       const AbsenceReason = {value : n.AbsenceReason};
       const JrClub = {value : n.JrClub};
       const JrYouthClub = {value : n.JrYouthClub};
       const Category = {value : n.Category};
       const WheretoTransfer = {value : n.WheretoTransfer};
       temp.push(sno);
       temp.push(Name1);
       temp.push(Name2);
       temp.push(Position);
       temp.push(Age);
       temp.push(SchoolYear);
       temp.push(Absent);
       temp.push(Attendance);
       temp.push(AbsenceReason);
       temp.push(JrClub);
       temp.push(JrYouthClub);
       temp.push(Category);
       temp.push(WheretoTransfer);
      
       exportData.push(temp);
    });
    
  const multiDataSet = [
      {
          columns: exportCols,
          data: exportData
      }
  ];

  return (
    <div className={classes.root} id="divToPrint" ref={bodyRef}>
      <div className={classes.innerRoot} elevation={1}>
        <Typography variant="h6" color="primary">
          {language === 'Japanese'
            ? 'プレーヤーリストの表示'
            : 'View Player List'}
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
              label={language === 'Japanese' ? '日付' : 'Date'}
              className={classes.textField}
              value={date}
              onChange={this.handleSelectDate('date')}
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
          <div>
                <ExcelFile element={<img src={expertExcelImage} style={{ marginRight:5,cursor:"pointer" }}/>}>
                    <ExcelSheet dataSet={multiDataSet} name="Organization"/>
                </ExcelFile>
                 <Typography variant="subtitle2" style={{marginBottom:"2px"}}>
                    Excel
                  </Typography>
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
                      {n.Name2}
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
                      {n.Age}
                    </TableCell>
                    <TableCell
                      style={{
                        width: 50
                      }}
                      padding="none"
                      align="center"
                    >
                      {n.SchoolYear}
                    </TableCell>
                    <TableCell
                      style={{
                        width: 50
                      }}
                      padding="none"
                      align="center"
                    >
                      {n.Absent}
                    </TableCell>
                    <TableCell
                      style={{
                        width: 50
                      }}
                      padding="none"
                      align="center"
                    >
                      {n.Attendance}
                    </TableCell>
                    <TableCell
                      style={{
                        width: 50
                      }}
                      padding="none"
                      align="center"
                    >
                      {n.AbsenceReason}
                    </TableCell>
                    <TableCell
                      style={{
                        width: 50
                      }}
                      padding="none"
                      align="center"
                    >
                      {n.JrClub}
                    </TableCell>
                    <TableCell
                      style={{
                        width: 50
                      }}
                      padding="none"
                      align="center"
                    >
                      {n.JrYouthClub}
                    </TableCell>
                    <TableCell
                      style={{
                        width: 50
                      }}
                      padding="none"
                      align="center"
                    >
                      {n.Category}
                    </TableCell>
                    <TableCell
                      style={{
                        width: 50
                      }}
                      padding="none"
                      align="center"
                    >
                      {n.WheretoTransfer}
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
    </div>
  );
}
}

TechnicalPage.propTypes = {
classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  seasons: state.playerListViewReducer.seasons || [],
  dates: state.playerListViewReducer.dates || [],
  players: state.playerListViewReducer.players || [],
  dropDownObj: state.dropDownReducer.dropDowns,
  language: state.dropDownReducer.language || 'English'
});

const mapDispatchToProps = dispatch => ({
selectCategory: (object, playerInfo) =>
  dispatch(selectCategory(object, playerInfo)),
selectSeason: (playerInfo, seasonObject) =>
  dispatch(selectSeason(playerInfo, seasonObject)),
selectDate: (playerInfo, dateObject) =>
  dispatch(selectDate(playerInfo, dateObject)),
getDropDowns: playerInfo => dispatch(getDropDowns(playerInfo))
});

/** Updated For V2 */
export default connect(
mapStateToProps,
mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
