import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DelIcon from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import {
  getDropdownData,
  getMethodologyInfo,
  getMainTitles,
  getSubTitles,
} from '../actions/MethodologyActions';
import { DetailFields } from '../constants/textFields';
import SnackBar from '../components/SnackBar/SnackBar';

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
    width:'100%',
    // ...theme.mixins.gutters(),
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 1
  },

  grow: {
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

  headings: {
    borderBottom: '3px solid rgb(244, 0, 0)',
    margin: '15px 0px 15px 0px'
  },

  input: {
    display: 'none'
  },

  fab: {
    width: 35,
    height: 30,
    margin: 5,
    marginTop: 20
  }
});

let Physicals = [];
let Technicals = [];
let Tacticals = [];
let Mentals = [];
let WarmingUps = [];
let SSGs = [];
let Teams = [];
let Fields = [];

class MethodologyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MainTitle:'SELECT',
      MainTitles: [],

      SubTitle: 'SELECT',
      SubTitles: [],

      MethodologyInfo: {
        Physical:'SELECT',
      },
      
      language: 'English',

      open: false,
      dialogValue: '',
      dialogLabel: ''
    }
  }
  
  componentWillMount() {
    const { playerInfo } = this.props;
    this.setState({
      playerInfo
    });
    this.props.getMainTitles(playerInfo);
    this.props.getDropdownData(playerInfo);
  }

  componentWillReceiveProps(nextProps) {
    const obj = nextProps.dropDownObj;
    this.setState({
      // MainTitle: nextProps.MainTitle,
      // SubTitle: nextProps.SubTitle,
      MainTitles: nextProps.MainTitles,
      MethodologyInfo: nextProps.MethodologyInfo,
      SubTitles: nextProps.SubTitles,
      language: nextProps.language
    });
    if (obj) {
      Physicals = obj.Physicals ? obj.Physicals : Physicals;
      Technicals = obj.Technicals ? obj.Technicals : Technicals;
      Tacticals = obj.Tacticals ? obj.Tacticals : Tacticals;
      Mentals = obj.Mentals ? obj.Mentals : Mentals;
      WarmingUps = obj.WarmingUps ? obj.WarmingUps : WarmingUps;
      SSGs = obj.SSGs ? obj.SSGs : SSGs;
      Teams = obj.Teams ? obj.Teams : Teams;
      Fields = obj.Fields ? obj.Fields : Fields;
      // console.log('refresh', Physicals)
    }
  }

  handleTitleChange = title => (event,value) => {
    const { playerInfo, MainTitle, SubTitle, MethodologyInfo } = this.props;
    switch(title) {
      case 'MainTitle':
        this.props.getSubTitles(playerInfo, event.target.value);
        this.setState({
          MainTitle: event.target.value,
          SubTitle: 'SELECT'
        });
        break;
      case 'SubTitle':
        let object = {
          MainTitle: MainTitle,
          SubTitle: SubTitle
        };
        this.props.getMethodologyInfo(playerInfo, object);
        this.setState({
          SubTitle: event.target.value
        });
        break;
      // case 'Technical':
      //   console.log(event.target.value);
      //   break;
      // case 'Physical':
        // Physicals.push(event.target.value);
        // this.setState({
        //   MethodologyInfo: {
        //     Physical: event.target.value
        //   }
        // });
        // console.log('select physicals', MethodologyInfo.Physical);
        // break;
      default:
        console.log(event.target.value);
        this.setState({
          MethodologyInfo: {
            // ...MethodologyInfo,
            [title]:event.target.value
          }
        })
    }
  }

  deleteItem(pos, value) {
    const { playerInfo, MainTitle, MethodologyInfo } = this.state;
    switch(pos) {
      case 'mTitle': 
        playerInfo.remove({subTitle: value, fileName:'methodology', main_title: MainTitle});
        console.log('successfully removed');
        this.props.getSubTitles(playerInfo, MainTitle);
        break;
      case 'sTitle':
        playerInfo.remove({title: value, fileName:'methodology', type: 'mainTitle'});
        console.log('successfully removed');
        this.props.getMainTitles(playerInfo);
        break;
      default: console.log('delete item function.');
    }
  }
  
  saveMaintitle(saveData) {
    const { playerInfo } = this.state;
    let data = {
      _id: Math.floor(Date.now()),
      type: 'mainTitle',
      fileName: 'methodology',
      title: saveData
    }
    playerInfo.insert(data, (err, docs) => {
    });
    this.props.getMainTitles(playerInfo);
  }
  
  // deleteSubTitle(deleteData) {
  //   const { playerInfo, MainTitle } = this.state;
  //   playerInfo.remove({subTitle: deleteData, fileName:'methodology', main_title: MainTitle});
  //   console.log('successfully removed');
  //   this.props.getSubTitles(playerInfo, MainTitle);
  // }
  
  saveSubtitle(saveData) {
    const { playerInfo, MainTitle } = this.state;
    if(MainTitle!=='SELECT') {
      let data = {
        _id: Math.floor(Date.now()),
        main_title: MainTitle,
        fileName: 'methodology',
        subTitle: saveData
      }
      playerInfo.insert(data, (err, docs) => {
      });
      this.props.getSubTitles(playerInfo, MainTitle);
    }
    else {
      console.log('Please Select Main Title first.');
    }
  }


  // deleteMainTitle(deleteData) {
  //   const { playerInfo } = this.state;
  //   playerInfo.remove({title: deleteData, fileName:'methodology', type: 'mainTitle'});
  //   console.log('successfully removed');
  //   this.props.getMainTitles(playerInfo);
  // }

  saveChanges = val => {    
    const newVal = val.replace(/[./" "]/g, '');
    const { MainTitles, SubTitles, dialogValue, MethodologyInfo } = this.state;
    switch(newVal) {
      case "MainTitle": 
        this.setState({
          MainTitles:[...MainTitles,dialogValue], open: false, optionText: ''
        });
        this.saveMaintitle(dialogValue);
        break;
      case "SubTitle":
        this.setState({
          SubTitles:[...SubTitles,dialogValue], open: false, optionText: ''
        });
        this.saveSubtitle(dialogValue);
        break;
      case "Physical":

        break;
      default: console.log(newVal+dialogValue);
    }
  }

  handleOptionChange = () => event => {
    this.setState({
      dialogValue: event.target.value
    });
  };
  
  handleClose = () => {
    this.setState({ open: false, optionText: '' });
  };  

  openDialog = (label) => {
    this.setState({ open: true, dialogValue: '', dialogLabel: label });
  };

  renderDialog = () => {
    const { classes } = this.props;
    const { open, dialogLabel, dialogValue, language } = this.state;
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
            {language === 'Japanese' ? 'オプション追加' : 'Add Item'}:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={dialogValue}
            label={language === 'Japanese' ? 'オプション' : 'Option'}
            onChange={this.handleOptionChange()}
            fullWidth
          />
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
            onClick={() => {if(this.state.dialogValue.length>0) {this.saveChanges(dialogLabel)}}}
            color="primary"
          >
            {language === 'Japanese' ? '変更内容を保存' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  renderAddButton(item) {
    return {
      endAdornment: (
        <InputAdornment
          style={{ marginRight: -15, marginLeft: -10 }}
          position="end"
        >
          <IconButton
            aria-label="Toggle password visibility"
            onClick={() => this.openDialog(item)}
          >
            <Visibility />
          </IconButton>
        </InputAdornment>
      )
    }
  }
  renderDetailsField() {
    const { classes } = this.props;
    const { MethodologyInfo, language } = this.state;
    return DetailFields.map((title, index) => {
      return (
        <Grid container spacing={8} direction="row" alignItems="flex-start">
          <Grid item xs={2} container justify="center">
            <Typography variant="h6" align="center">{title}</Typography>
          </Grid>
          
          <Grid item xs container justify="center">
              <TextField style={{ height: 41 }}
                  // key="MAINTITLE"
                  label={title} select fullWidth margin="dense"
                  variant="outlined" className={classes.textField}
                  value={MethodologyInfo[title]}
                  onChange={this.handleTitleChange(title)}
                  InputProps={this.renderAddButton(title)}
                  inputProps={{ style: { fontSize: 15 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  >
                    
                <MenuItem id="none" value="SELECT">
                      {language === 'Japanese' ? '選択' : 'Select'}
                </MenuItem>
                {/* {MainTitles &&
                  MainTitles.map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={() => {this.deleteItem('mTitle',MainTitles[index])}}
                      >
                        <DelIcon />
                      </IconButton>
                    </MenuItem>
                ))} */}

              </TextField>
          </Grid>
        </Grid>
      );
    });
  }

  render() {
    const { classes } = this.props;
    const { language, MainTitles, MainTitle, SubTitles, SubTitle, MethodologyInfo }  = this.state;
    return (
      <div className={classes.root} id="divToPrint" ref={bodyRef}>
        <div className={classes.innerRoot} elevation={1}>
          {/* top page title */}
          <Typography variant="h5" color="primary" align="center">
            {language === 'Japanese'
              ? 'シーズン計画を追加'
              : 'Methodology/Education Program'}
          </Typography>
          <br />

          {/* main title selection component. */}
          <Grid container spacing={8} direction="row" alignItems="flex-start">
            <Grid item xs={2} container justify="center">
              <Typography variant="h6" align="center">Main Title</Typography>
            </Grid>
            <Grid item xs container justify="center">
              <TextField style={{ height: 41 }}
                  // key="MAINTITLE"
                  label="Main Title" select fullWidth margin="dense"
                  variant="outlined" className={classes.textField}
                  value={MainTitle}
                  onChange={this.handleTitleChange('MainTitle')}
                  InputProps={this.renderAddButton('MainTitle')}
                  inputProps={{ style: { fontSize: 15 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  >
                    
                <MenuItem id="none" value="SELECT">
                      {language === 'Japanese' ? '選択' : 'Select'}
                </MenuItem>
                {MainTitles &&
                  MainTitles.map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={() => {this.deleteItem('mTitle',MainTitles[index])}}
                      >
                        <DelIcon />
                      </IconButton>
                    </MenuItem>
                ))}

              </TextField>
            </Grid>
          </Grid>
          <br />

          {/* sub title selcetion component. */}
          <Grid container spacing={8} direction="row" alignItems="flex-start">
            <Grid container item xs={2} justify="center">
              <Typography variant="h6" align="center">Sub Title</Typography>
            </Grid>
            <Grid container item xs justify="center">
              <TextField style={{ height: 41 }}
                  // key="MAINTITLE"
                  label="Sub Title" select fullWidth margin="dense"
                  variant="outlined" className={classes.textField}
                  value={SubTitle}
                  onChange={this.handleTitleChange('SubTitle')}
                  InputProps={this.renderAddButton('SubTitle')}
                  inputProps={{ style: { fontSize: 15 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  >
                    
                <MenuItem id="none" value="SELECT">
                      {language === 'Japanese' ? '選択' : 'Select'}
                </MenuItem>
                {SubTitles &&
                  SubTitles.map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={() => {this.deleteItem('sTitle',SubTitles[index])}}
                      >
                        <DelIcon />
                      </IconButton>
                    </MenuItem>
                ))}

              </TextField>
            </Grid>
          </Grid>
          <br />

          {/* Action buttons */}
          {/* <Grid container spacing={8} direction="row" justify="flex-end" style={{ borderBottom:'solid' }}>
            <Grid xs alignItems="flex-end">
              <Typography className={classes.commentTypo} variant="h6" >
                {language==='Japanese'?'ディテール':'Detail'}
              </Typography>
            </Grid>
            <Grid>
              <ButtonBase
                disableRipple
                // focusRipple
                // centerRipple
                // key={val.title}
                style={{
                  marginRight: 30
                }}
              >
                <span onClick={console.log('save button clicked.')}>
                  <img src={require('../assets/images/icons/save.png')} alt={'save Data'} />
                  <Typography variant="subtitle2">
                    {'Save'}
                  </Typography>
                </span>
              </ButtonBase>
            </Grid>

          </Grid>
          <br/> */}
          {/* Details for Title */}
          {this.renderDetailsField()}


        </div>
        {this.renderDialog()}
      </div>
    );
  }
}

MethodologyPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    dropDownObj: state.methodologyReducer.Dropdowns || {},
    MethodologyInfo: state.methodologyReducer.MethodologyInfo || {},
    MainTitles: state.methodologyReducer.MainTitles || [],
    SubTitles: state.methodologyReducer.SubTitles || [],
    MethodologyInfo: state.methodologyReducer.MethodologyInfo || {},
    language: state.dropDownReducer.language || 'English'
  });

const mapDispatchToProps = dispatch => ({
  getDropdownData: playerInfo => dispatch(getDropdownData(playerInfo)),
  getMainTitles: playerInfo => dispatch(getMainTitles(playerInfo)),
  getSubTitles: (object, playerInfo) =>
      dispatch(getSubTitles(object, playerInfo)),
  getMethodologyInfo: (playerInfo, object) =>
      dispatch(getMethodologyInfo(playerInfo, object)),
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MethodologyPage));
