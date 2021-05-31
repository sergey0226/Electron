/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';

import LanguageSec from '../components/Settings/Language';
import AboutSec from '../components/Settings/About';
import Help from '../components/Settings/Help';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },

  innerRoot: {
    // ...theme.mixins.gutters(),
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 1
  }
});

class SimpleTabs extends Component {
  state = {
    value: 0
  };

  componentWillMount() {
    const { language, playerInfo } = this.props;
    this.setState({
      language,
      playerInfo
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      language: nextProps.language
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value, language, playerInfo } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.innerRoot}>
          <Typography variant="h6" color="primary">
            {language === 'Japanese' ? '設定' : 'Settings'}
          </Typography>
          <Paper style={{ margin: '5% 7% 0 7%', maxWidth: 800 }} elevation={5}>
            <AppBar position="static" color="inherit" elevation={1}>
              <Tabs
                value={value}
                onChange={this.handleChange}
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab label={language === 'Japanese' ? '言語' : 'Language'} />
                <Tab label={language === 'Japanese' ? 'ヘルプ' : 'Help'} />
                <Tab label={language === 'Japanese' ? '備考' : 'About'} />
              </Tabs>
            </AppBar>
            {value === 0 && (
              <TabContainer>
                <LanguageSec playerInfo={playerInfo} />
              </TabContainer>
            )}
            {value === 1 && (
              <TabContainer>
                <Help />
              </TabContainer>
            )}
            {value === 2 && (
              <TabContainer>
                <AboutSec />
              </TabContainer>
            )}
          </Paper>
        </div>
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    language: state.dropDownReducer.language || 'English'
  });

/** Updated For V2 */
export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(SimpleTabs));
