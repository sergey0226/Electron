/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-syntax */
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
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
  selectSeason,
  selectDate
} from '../actions/teamInfoActions';
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

  // root: {
  //   display: 'flex',
  //   paddingTop: 50
  // },

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
    marginBottom:30,
    overflowX: 'auto'
  }
});

const icons = [...fieldsArray.icons2];

const fields = [...fieldsArray.teamInfoFields];

let Categories = [...arrays.Category];
const rows = [...tableArray.teamInfoCols];

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'Select',

      season: 'Select',
      seasons: [],

      scoreDate: 'Select',
      dates: ['Select'],

      language: '',
      playerInformation: {
        SNo: true,
        Name1: true
      },
      expertExcelImage: require('../assets/images/icons/save.png'),
      generalCounts: 0,
      physicalCounts: 0,

      data: [],
      page: 0,
      rowsPerPage: 5,
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
      language: nextProps.language,
      playerInformation: nextProps.playerInformation,
      data: nextProps.players,
      seasons: nextProps.seasons,
      dates: nextProps.dates
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
    const { playerInformation, dates, category, playerInfo } = this.state;

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
      scoreDate: 'Select'
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
      scoreDate: 'Select'
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

  renderCheckBox = (from, to, section) => {
    const { classes } = this.props;
    const { playerInformation, language } = this.state;
    return fields.slice(from, to).map((title, index) => {
      const label =
        language === 'English'
          ? title
          : fieldsArrayJap.teamInfoFields[from + index];
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
              onChange={this.handleCheckChange(newVal, section)}
              color="secondary"
            />
          }
          label={label}
          key={index}
        />
      );
    });
  };

  handleCheckChange = (name, section) => event => {
    
    event.persist();
    let { generalCounts, physicalCounts } = this.state;

    switch (section) {
      case 'general': {
        if (event.target.checked) {
          generalCounts += 1;
        } else {
          generalCounts -= 1;
        }

        if (generalCounts < 7) {
          this.setState(prevState => ({
            playerInformation: {
              ...prevState.playerInformation,
              [name]: event.target.checked
            },
            generalCounts,

          }));
        }
        break;
      }
      case 'physical': {
        if (event.target.checked) {
          physicalCounts += 1;
        } else {
          physicalCounts -= 1;
        }

        if (physicalCounts < 7) {
          this.setState(prevState => ({
            playerInformation: {
              ...prevState.playerInformation,
              [name]: event.target.checked
            },
            physicalCounts
          }));
        }
        break;
      }
      default: {
        break;
      }
    }
  };

  createPdf = () => {
    const { language,playerInformation, season, category, playerInfo } = this.state;
    const html = bodyRef.current;
    Doc.createPdf(html);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  renderTableHead = () => {
    const { playerInformation, language } = this.state;
    return (
      <TableHead
        style={{ backgroundColor: '#16a085', opacity: '0.9' }}
      >
        <TableRow>
          {rows.map((title, index) => {
            const newVal = title.replace(/[./" "]/g, '');
            const label =
              language === 'English'
                ? title
                : tableArrayJap.teamInfoCols[index];

            return (
              <TableCell
                style={{
                  width: 50,
                  color:"#FFFFFF",
                  display: playerInformation[newVal] === true ? '' : 'none'
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
  };

  render() {
    const { classes } = this.props;
    const {
      category,
      season,
      seasons,
      scoreDate,
      dates,
      playerInformation,
      language,
      data,
      rowsPerPage,
      expertExcelImage,
      page,
    } = this.state;
    const func = [/* () => window.print(), */ () => this.createPdf()];

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    
    //export excel
    const exportCols = [];
    const fields = [];
    const exportData = [];
    
    rows.map((title, index) => {
      let newVal = title.replace(/[./" "]/g, '');
      if(playerInformation[newVal] === true){
        let temp = {title: newVal};
        exportCols.push(temp)
        if(newVal!="SNo")
        fields.push(newVal)
      }            
      // console.log('This is a log from rows.map()');
    })    
    data.map((n, index) => {
      const temp = [];       
      const sno = {value : index + 1};

      temp.push(sno);     

      // Here goes snakeyd code
      let tempDate;
      let tempNo;
      for (const key in n) {
        if (key.includes(`score`)) {
          tempDate = n[key];
          const newDate = `${tempDate.getDate()}/${tempDate.getMonth() +
            1}/${tempDate.getFullYear()}`;
          if (newDate == scoreDate) {
            tempNo = key.charAt(5);
          }
        }
      }
      // Here ends snakeyd code


      fields.map((field, index)=>{

        // Here goes snakeyd code
        let val = '';
        switch(field){
          case 'JUMPCMJWAm':  val = n[`JUMPCMJWAmPower${tempNo}`];  break;
          case 'JUMPSquatJm':  val = n[`JUMPSquatJmPower${tempNo}`];  break;
          case 'JUMP6Jwithoutarmm':  val = n[`JUMP6JmwoarmmPower${tempNo}`];  break;
          case 'JUMP6Jwitharmm':  val = n[`JUMP6JmwitharmmPower${tempNo}`];  break;
          case 'TripleHopm':  val = n[`TripleHopmPower${tempNo}`];  break;
          case 'LandRLegVertJump':  val = ((Number(n[`RVerticalJmPower${tempNo}`]) + Number(n[`LVerticalJmPower${tempNo}`])) / 2).toFixed(2);  break;
          case 'LandRLeglongThrowm':  val = ((Number(n[`RLongThrowmPower${tempNo}`]) + Number(n[`LLongThrowmPower${tempNo}`])) / 2).toFixed(2);  break;
          case 'LandRLeglongkickm':  val = ((Number(n[`RLongKickmPower${tempNo}`]) + Number(n[`LLongKickmPower${tempNo}`])) / 2).toFixed(2);  break;
          case 'Squat1RM':  val = n[`SquatkgStrength${tempNo}`];  break;
          case 'BenchPress1RM':  val = n[`BenchPresskgStrength${tempNo}`];  break;
          case 'Cooper12minRunm':  val = n[`Cooper12minrunDistancemEndurance${tempNo}`];  break;
          case 'WMA4515kmh':  val = n[`WMA4515DistancemEndurance${tempNo}`];  break;
          case 'V02maxmin':  val = n[`V02maxmintest${tempNo}`];  break;
          case '1600mProtocolmin':  val = n[`1600MProtocolTimeminEndurance${tempNo}`];  break;
          case 'ShuttleTempoTestmin':  val = n[`ShuttleTempoTest(Anaerobic)DistancemEndurance${tempNo}`];  break;
          case 'YoYoEnd&intRecovm':  val = n[`YoYo(Endurance&IntRec)DistancemEndurance${tempNo}`];  break;
          case '60msprintsec':  val = n[`60mSprintsecTimeSpeed${tempNo}`];  break;
          case '50msprintsec':  val = n[`50mSprintsecTimeSpeed${tempNo}`];  break;
          case '40msprintsec':  val = n[`40mSprint(each10m)secTimeSpeed${tempNo}`];  break;
          case '30msprintsec':  val = n[`30mSprintsecTimeSpeed${tempNo}`];  break;
          case '20msprintsec':  val = n[`20mSprintsecTimeSpeed${tempNo}`];  break;
          case '10msprintsec':  val = n[`10mSprintsecTimeSpeed${tempNo}`];  break;
          case 'AgilityTestStep50sec':  val = n[`AgilityTestStep50secAgility${tempNo}`];  break;
          case 'AgilityTestForwardRunsec':  val = n[`AgilityTestForwardRunsecAgility${tempNo}`];  break;
          case 'Weight':  val = n[`WeightKg`];  break;
          default: val = n[field]; break;
        }
        console.log(val);
        // Here ends snakeyd code

        if(field=="PlayerBirthday"){
          const birth = val? val: new Date();
          val = birth.toLocaleDateString();
        }
        let dat = {value:val}
        temp.push(dat);
      })      
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
            {language === 'Japanese' ? 'チーム情報' : 'Team Information'}
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
                label={language === 'Japanese' ? 'シーズン' : 'Seasons'}
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
                value={scoreDate}
                onChange={this.handleSelectDate('scoreDate')}
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
                <ExcelFile element={<img src={expertExcelImage} style={{ marginRight:5,cursor:"pointer" }} />}>
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
          <Typography className={classes.commentTypo} variant="subtitle2">
            {language === 'Japanese' ? '一般情報' : 'General Information'}
          </Typography>
          <div>
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item xs container justify="center">
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  {this.renderCheckBox(28, 33, 'general')}
                </FormGroup>
              </Grid>
              <Grid item xs container justify="center">
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  {this.renderCheckBox(33, 38, 'general')}
                </FormGroup>
              </Grid>
              <Grid item xs container justify="center">
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  {this.renderCheckBox(38, 43, 'general')}
                </FormGroup>
              </Grid>
              <Grid item xs container justify="center">
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  {this.renderCheckBox(43, 45, 'general')}
                </FormGroup>
              </Grid>
            </Grid>

            <Typography
              align="right"
              variant="subtitle2"
              style={{ padding: 10 }}
            >
              {language === 'Japanese'
                ? '! 最大６項目まで選択可'
                : '! You can select a maximum of 6 items'}
            </Typography>
          </div>

          <Typography className={classes.commentTypo} variant="subtitle2">
            {language === 'Japanese'
              ? 'フィジカル情報'
              : 'Physical Information'}
          </Typography>
          <div>
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item xs container justify="center">
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  {this.renderCheckBox(0, 7, 'physical')}
                </FormGroup>
              </Grid>
              <Grid item xs container justify="center">
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  {this.renderCheckBox(7, 14, 'physical')}
                </FormGroup>
              </Grid>
              <Grid item xs container justify="center">
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  {this.renderCheckBox(14, 21, 'physical')}
                </FormGroup>
              </Grid>
              <Grid item xs container justify="center">
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  {this.renderCheckBox(21, 28, 'physical')}
                </FormGroup>
              </Grid>
            </Grid>

            <Typography
              align="right"
              variant="subtitle2"
              style={{ padding: 10 }}
            >
              {language === 'Japanese'
                ? '! 最大６項目まで選択可'
                : '! You can select a maximum of 6 items'}
            </Typography>
          </div>

          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              {this.renderTableHead()}

              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((n, index) => {
                    const SelectedDate = n.PlayerBirthday
                      ? n.PlayerBirthday
                      : new Date();
                    let tempDate;
                    let tempNo;
                    for (const key in n) {
                      if (key.includes(`score`)) {
                        tempDate = n[key];
                        const newDate = `${tempDate.getDate()}/${tempDate.getMonth() +
                          1}/${tempDate.getFullYear()}`;
                        if (newDate == scoreDate) {
                          tempNo = key.charAt(5);
                        }
                      }
                    }
                    return (
                      <TableRow hover tabIndex={-1} key={index}>
                        <TableCell
                          style={{
                            maxWidth: 50,
                            display:
                              playerInformation.SNo === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {index + 1}
                        </TableCell>

                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.Name1 === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.Name1}
                        </TableCell>

                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.PlayerBirthday === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {SelectedDate.getDate()}/{SelectedDate.getMonth() + 1}
                          /{SelectedDate.getFullYear()}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.LicenseNo === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.LicenseNo}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.TeamNumber === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.TeamNumber}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.Mail === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.Mail}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.JrYouthClub === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.JrYouthClub}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.Foot === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.Foot}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.Height === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.Heightcm}
                        </TableCell>

                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.Phone === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.Phone}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.ParentPhone === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.ParentPhone}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.BMI === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.BMI}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.BloodType === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.BloodType}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.Address === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {`${n.Line1} ${n.Line2}`}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.PostCode === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.Postcode}
                        </TableCell>

                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.JerseySizeUp === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.JerseySizeUp}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.JerseySize === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.JerseySize}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.ShoesSize === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.ShoesSize}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.ParentName === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.ParentName}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.City === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.City}
                        </TableCell>

                        {/* ///////////////////////////////////////////////////////////// */}
                        {/* ///////////////////////////////////////////////////////////// */}
                        {/* ///////////////////////////////////////////////////////////// */}
                        {/* ///////////////////////////////////////////////////////////// */}

                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.JUMPCMJWAm === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`JUMPCMJWAmPower${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.JUMPSquatJm === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`JUMPSquatJmPower${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.JUMP6Jwithoutarmm === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`JUMP6JmwoarmmPower${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.JUMP6Jwitharmm === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`JUMP6JmwitharmmPower${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.TripleHopm === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`TripleHopmPower${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.LandRLegVertJump === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {(
                            (Number(n[`RVerticalJmPower${tempNo}`]) +
                              Number(n[`LVerticalJmPower${tempNo}`])) /
                            2
                          ).toFixed(2)}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.HbValue === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.HbValue}
                        </TableCell>

                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.LandRLeglongThrowm === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {(
                            (Number(n[`RLongThrowmPower${tempNo}`]) +
                              Number(n[`LLongThrowmPower${tempNo}`])) /
                            2
                          ).toFixed(2)}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.LandRLeglongkickm === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {(
                            (Number(n[`RLongKickmPower${tempNo}`]) +
                              Number(n[`LLongKickmPower${tempNo}`])) /
                            2
                          ).toFixed(2)}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.Squat1RM === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`SquatkgStrength${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.BenchPress1RM === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`BenchPresskgStrength${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.Cooper12minRunm === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`Cooper12minrunDistancemEndurance${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.WMA4515kmh === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`WMA4515DistancemEndurance${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.VO2maxlmin === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {tempNo == 1
                            ? n.V02maxmin
                            : n[`V02maxmintest${tempNo}`]}
                        </TableCell>

                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation['1600mProtocolmin'] === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`1600MProtocolTimeminEndurance${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.ShuttleTempoTestmin === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {
                            n[
                              `ShuttleTempoTest(Anaerobic)DistancemEndurance${tempNo}`
                            ]
                          }
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation['YoYoEnd&intRecovm'] === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {
                            n[
                              `YoYo(Endurance&IntRec)DistancemEndurance${tempNo}`
                            ]
                          }
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation['60msprintsec'] === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`60mSprintsecTimeSpeed${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation['50msprintsec'] === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`50mSprintsecTimeSpeed${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation['40msprintsec'] === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`40mSprint(each10m)secTimeSpeed${tempNo}`]}
                        </TableCell>

                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation['30msprintsec'] === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`30mSprintsecTimeSpeed${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation['20msprintsec'] === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`20mSprintsecTimeSpeed${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation['10msprintsec'] === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`10mSprintsecTimeSpeed${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.AgilityTestStep50sec === true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`AgilityTestStep50secAgility${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.AgilityTestForwardRunsec ===
                              true
                                ? ''
                                : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n[`AgilityTestForwardRunsecAgility${tempNo}`]}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.Position === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.Position}
                        </TableCell>
                        <TableCell
                          style={{
                            width: 50,
                            display:
                              playerInformation.Weight === true ? '' : 'none'
                          }}
                          padding="none"
                          align="center"
                        >
                          {n.WeightKg}
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
  playerInformation: state.teamInfoReducer.playerInformation || {
    SNo: true,
    Name1: true
  },
  seasons: state.teamInfoReducer.seasons || [],
  dates: state.teamInfoReducer.dates || [],
  players: state.teamInfoReducer.players || [],
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
