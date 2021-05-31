/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import * as fieldsArray from '../constants/textFields';
import * as fieldsArrayJap from '../constants/textFieldsJap';

const styles = theme => ({
  root: {
    display: 'flex'
  },

  innerRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 3
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

  card: {
    maxWidth: 345
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover'
  }
});

const cards = [...fieldsArray.cards];
const cards2 = [...fieldsArray.cards2];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { language: '' };
  }

  componentWillMount() {
    const { playerInfo } = this.props;
    this.setState({
      playerInfo
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      language: nextProps.language
    });
  }

  render() {
    const { language } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div style={{ width: '100%', paddingTop: '5%' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'noWrap',
              justifyContent: 'space-around'
            }}
          >
            {cards.map((val, index) => (
              <Card
                key={index}
                className={classes.card}
                style={{
                  maxWidth: 160,
                  display: 'inline-block',
                  margin: '1%',
                  borderRadius: 10
                }}
              >
                <Link
                  style={{ textDecoration: 'none' }}
                  to={{
                    pathname: val.routeTo
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={
                        language === 'Japanese'
                          ? fieldsArrayJap.cards[index].title
                          : val.title
                      }
                      className={classes.media}
                      height="195"
                      image={
                        language === 'Japanese'
                          ? fieldsArrayJap.cards[index].image
                          : val.image
                      }
                      title={
                        language === 'Japanese'
                          ? fieldsArrayJap.cards[index].title
                          : val.title
                      }
                    />
                  </CardActionArea>
                </Link>
              </Card>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'noWrap',
              justifyContent: 'space-around'
            }}
          >
            {cards2.map((val, index) => (
              <Card
                key={index}
                className={classes.card}
                style={{
                  maxWidth: 160,
                  display: 'inline-block',
                  margin: '1%',
                  borderRadius: 10
                }}
              >
                <Link
                  key={index}
                  style={{ textDecoration: 'none' }}
                  to={{
                    pathname: val.routeTo
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={
                        language === 'Japanese'
                          ? fieldsArrayJap.cards2[index].title
                          : val.title
                      }
                      className={classes.media}
                      height="195"
                      image={
                        language === 'Japanese'
                          ? fieldsArrayJap.cards2[index].image
                          : val.image
                      }
                      title={
                        language === 'Japanese'
                          ? fieldsArrayJap.cards2[index].title
                          : val.title
                      }
                    />
                  </CardActionArea>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
