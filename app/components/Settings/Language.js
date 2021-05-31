/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
// @flow
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux';
import TextField from '../../constants/TextInput';
import { setLanguage } from '../../actions/dropDownActions';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },

  innerRoot: {
    // ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 4,
    width: 500
  },

  commentTypo: {
    borderBottom: '3px solid rgba(26, 43, 117, 1)',
    paddingTop: 10,
    paddingBottom: 5,
    marginRight: 10,
    marginBottom: 15
  },

  menu: {
    width: 150
  },
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const languages = [
  { title: 'English', flag: require('../../assets/images/flag1.gif') },
  { title: 'Japanese', flag: require('../../assets/images/flag2.png') }
];

class Language extends Component {
  constructor(props) {
    super(props);
    this.state = {
      langDialog: false,
      language: ''
    };
  }

  componentWillMount() {
    const { language, playerInfo } = this.props;
    this.setState({
      language,
      playerInfo
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      language: nextProps.language,
      langDialog: true
    });
  }

  handleLanguageChange = name => (event, value) => {
    const newVal = name.replace(/[./" "]/g, '');

    this.setState({
      [newVal]: event.target.value
    });
  };

  renderLangDialog = () => {
    const { langDialog, language } = this.state;
    return (
      <Dialog
        open={langDialog}
        onClose={() => this.setState({ langDialog: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {language === 'Japanese'
            ? '言語が変更されました'
            : 'Language Changed!'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {language === 'Japanese'
              ? 'ユーザーの言語が正常に日本語に設定されています.'
              : `User language is successfully set to ${language}.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.setState({ langDialog: false })}
            color="primary"
            autoFocus
          >
            {language === 'Japanese' ? '閉じる' : 'Close'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  render() {
    const { classes } = this.props;
    const { language, playerInfo } = this.state;

    return (
      <div className={classes.root}>
        <div>
          <Typography noWrap variant="h6">
            {language === 'Japanese' ? '言語を選択する' : 'Select Language'}
          </Typography>

          <TextField
            style={{ width: 250, height: 50 }}
            // fullWidth
            id="outlined-select-currency"
            select
            // label="Language"
            className={classes.textField}
            value={language}
            onChange={this.handleLanguageChange('language')}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            margin="dense"
            variant="outlined"
          >
            {languages &&
              languages.map((value, index) => (
                <MenuItem
                  key={value.title}
                  value={value.title}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span>{value.title}</span>
                  <span>
                    <img
                      src={value.flag}
                      alt="AltImage"
                      width="50"
                      height="30"
                      style={{ boxShadow: '0px 0px 1px' }}
                    />
                  </span>
                </MenuItem>
              ))}
          </TextField>
          <Fab
            variant="extended"
            color="primary"
            aria-label="Save"
            className={classes.fab}
            onClick={() =>
              this.props.setLanguage(playerInfo, {
                fileName: 'language',
                language
              })
            }
          >
            <SaveIcon className={classes.extendedIcon} />
            {language === 'Japanese' ? '保存' : 'Save'}
          </Fab>
        </div>
        {this.renderLangDialog()}
      </div>
    );
  }
}

Language.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    language: state.dropDownReducer.language || 'English'
  });
const mapDispatchToProps = dispatch => ({
  setLanguage: (playerInfo, obj) => dispatch(setLanguage(playerInfo, obj))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Language));
