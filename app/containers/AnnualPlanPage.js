/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable global-require */
// @flow
import React, { Component } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonBase from '@material-ui/core/ButtonBase';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import NextIcon from '@material-ui/icons/NavigateNext';
import BackIcon from '@material-ui/icons/NavigateBefore';

import { connect } from 'react-redux';
import TextField from '../constants/TextInput';
import { getEvents } from '../actions/annualActions';

import Doc from '../constants/DocService';

import * as fieldsArray from '../constants/textFields';
import * as fieldsArrayJap from '../constants/textFieldsJap';
import * as arraysJap from '../constants/dropDownsJap';

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

const localizer = momentLocalizer(moment);

class TechnicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        title: ''
      },
      events: [],

      dialogTitle: '',
      openDialog: false,

      moreEvents: [],
      moreDate: new Date(),
      openMoreDialog: false,

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
    this.props.getEvents(playerInfo);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      language: nextProps.language,
      events: nextProps.events
    });
  }

  // componentWillUnmount() {
  //   const { playerInfo } = this.state;

  //   this.props.selectSeason(
  //     { event: { target: { value: 'Select' } } },
  //     playerInfo
  //   );
  // }

  createPdf = () => {
    const html = bodyRef.current;
    Doc.createPdf(html,true);
  };

  renderMoreDialog = () => {
    const { moreEvents, moreDate, language } = this.state;

    return (
      <Dialog
        open={this.state.openMoreDialog}
        fullWidth
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
        onClose={() => this.setState({ openMoreDialog: false })}
      >
        <DialogTitle id="form-dialog-title">
          {language === 'Japanese' ? 'イベント' : 'Events of'}{' '}
          {`${moreDate.getDate()}/${moreDate.getMonth() +
            1}/${moreDate.getFullYear()}`}
        </DialogTitle>
        <DialogContent>
          {moreEvents &&
            moreEvents.map((val, index) => (
              <Typography
                key={index}
                variant="subtitle1"
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#3174ad',
                  color: 'white',
                  margin: 5,
                  padding: 3,
                  borderRadius: 5
                }}
                onClick={() => this.openEditDialog2('Edit', val)}
              >
                {index + 1}. {val.title}
              </Typography>
            ))}
        </DialogContent>
      </Dialog>
    );
  };

  openEditDialog2 = (name, { start, end, title, _id }) => {
    this.setState({
      event: {
        start,
        end,
        title,
        _id
      },
      dialogTitle: name,
      openDialog: !this.state.openDialog
    });
  };

  openDialog = name => ({ start, end, title }) => {
    const { event } = this.state;
    this.setState({
      event: {
        start,
        end,
        title
      },
      dialogTitle: name,
      openDialog: !this.state.openDialog
    });
  };

  openEditDialog = name => ({ start, end, title, _id }) => {
    this.setState({
      event: {
        start,
        end,
        title,
        _id
      },
      dialogTitle: name,
      openDialog: !this.state.openDialog
    });
  };

  renderEventDialog = () => {
    const { event, dialogTitle, language } = this.state;
    return (
      <Dialog
        open={this.state.openDialog}
        fullWidth
        maxWidth="sm"
        aria-labelledby="form-dialog-title"
        onClose={() => this.setState({ openDialog: false })}
      >
        <DialogTitle id="form-dialog-title">
          {language === 'Japanese'
            ? this.renderTitle(dialogTitle)
            : `${dialogTitle} Event`}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={language === 'Japanese' ? 'イベント' : 'Event'}
            fullWidth
            value={event.title}
            onChange={e =>
              this.setState({ event: { ...event, title: e.target.value } })
            }
          />
        </DialogContent>
        <DialogActions>
          {dialogTitle === 'Edit' && (
            <Button onClick={this.deleteEvent} color="secondary" align="left">
              {language === 'Japanese' ? '削除' : 'Delete'}
            </Button>
          )}
          <Button onClick={this.closeDialog} color="primary">
            {language === 'Japanese' ? 'キャンセル' : 'Cancel'}
          </Button>
          {dialogTitle !== 'Edit' && (
            <Button onClick={this.saveData} color="primary">
              {language === 'Japanese' ? '追加' : 'Add'}
            </Button>
          )}
          {dialogTitle === 'Edit' && (
            <Button onClick={this.saveData} color="primary" align="left">
              {language === 'Japanese' ? '編集' : 'Edit'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  renderTitle = name => (name === 'Add' ? 'イベントを追加' : 'イベントを編集');

  saveData = () => {
    let { event, playerInfo } = this.state;

    event = {
      ...event,
      fileName: 'annualPlan'
    };

    playerInfo.findOne({ _id: event._id }, async (err, docs) => {
      if (!docs) {
        await playerInfo.insert(event, (err, docs) => {
          this.props.getEvents(playerInfo);
          this.closeDialog();
        });
      } else {
        await playerInfo.update(
          { _id: event._id },
          event,
          {},
          (err, numReplaced) => {
            this.props.getEvents(playerInfo);
            this.closeDialog();
          }
        );
      }
    });
  };

  deleteEvent = () => {
    let { event, playerInfo } = this.state;
    playerInfo.remove({ _id: event._id }, {}, (err, numRemoved) => {
      this.props.getEvents(playerInfo);
      this.closeDialog();
    });
  };

  closeDialog = () => {
    this.setState({
      event: { start: '', end: '', title: '' },
      dialogTitle: '',
      openDialog: false,
      openMoreDialog: false
    });
  };

  formats = () => {
    const { language } = this.props;
    return {
      weekdayFormat: (date, culture, localizer) => {
        return language === 'Japanese'
          ? weekdaysJap[date.getDay()]
          : weekdays[date.getDay()];
      }
    };
  };

  render() {
    const { classes } = this.props;
    const { events, language } = this.state;
    const func = [/* () => window.print(), */ () => this.createPdf()];

    return (
      <div className={classes.root} id="divToPrint" ref={bodyRef}>
        <div className={classes.innerRoot} elevation={1}>
          <Typography variant="h6" color="primary">
            {language === 'Japanese' ? '年間計画' : 'Annual Planning'}
          </Typography>
          <br />
          <Toolbar>
            <div className={classes.grow} />

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

          <div style={{padding:5}}>
            <Calendar
              formats={this.formats()}
              language={language}
              selectable
              onShowMore={(events, date) =>
                this.setState({
                  openMoreDialog: true,
                  moreEvents: events,
                  moreDate: date
                })
              }
              components={{
                toolbar: props => (
                  <CustomToolbar {...props} language={language} />
                )
              }}
              localizer={localizer}
              events={events}
              views={['month']}
              onSelectEvent={this.openEditDialog('Edit')}
              onSelectSlot={this.openDialog('Add')}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 900 }}
            />
          </div>
        </div>
        {this.renderMoreDialog()}
        {this.renderEventDialog()}
      </div>
    );
  }
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weekdaysJap = ['日', '月', '火', '水', '木', '金', '土'];

const CustomToolbar = toolbar => {
  const { language } = toolbar;

  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate('prev');
  };

  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate('next');
  };

  const goToCurrent = () => {
    const now = new Date();
    toolbar.date.setMonth(now.getMonth());
    toolbar.date.setYear(now.getFullYear());
    toolbar.onNavigate('current');
  };

  const label = () => {
    const date = moment(toolbar.date);
    return (
      <span>
        <b>
          {language === 'Japanese'
            ? arraysJap.Months[date.format('M') - 1]
            : date.format('MMMM')}{' '}
        </b>
        <span> {date.format('YYYY')}</span>
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
      <div style={{ flex: 0.5 }}>
        <Button variant="outlined" onClick={goToBack}>
          <BackIcon />
        </Button>
        <Button variant="outlined" onClick={goToCurrent}>
          {language === 'Japanese' ? '今日' : 'Today'}
        </Button>
        <Button variant="outlined" onClick={goToNext}>
          <NextIcon />
        </Button>
      </div>
      <div style={{ flex: 0.5 }}>
        <Typography variant="title">{label()}</Typography>
      </div>
    </div>
  );
};

TechnicalPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    events: state.annualReducer.events || [],
    language: state.dropDownReducer.language || 'English'
  };
};

const mapDispatchToProps = dispatch => ({
  getEvents: playerInfo => dispatch(getEvents(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TechnicalPage));
