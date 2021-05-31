/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
// @flow
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import PhoneIcon from '@material-ui/icons/Phone';
import MovieIcon from '@material-ui/icons/VideoLibrary';

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
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 1.5,
    borderRadius: 100
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <div>
            <Typography noWrap variant="h6">
              Need Help?
            </Typography>
            <Button
              href="mailto:soccer@soccer-ikusei.com"
              variant="outlined"
              color="primary"
              className={classes.fab}
            >
              <PhoneIcon className={classes.extendedIcon} />
              Contact Support
            </Button>
          </div>

          <div>
            <Typography noWrap variant="h6">
              Video Help Tutorials
            </Typography>
            <a
              href="https://www.teamsports-innovation.com/team-data-tutorial"
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="outlined"
                color="primary"
                className={classes.fab}
              >
                <MovieIcon className={classes.extendedIcon} />
                View Video Tutorials
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
