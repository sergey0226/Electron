/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import Logout from '@material-ui/icons/PowerSettingsNew';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MainIcon from '@material-ui/icons/ViewList';
import ProfileIcon from '@material-ui/icons/Face';
import TacticalIcon from '@material-ui/icons/AccessibleForward';
import TechnicalIcon from '@material-ui/icons/Build';
import PhysicalIcon from '@material-ui/icons/TrendingUp';
import HealthIcon from '@material-ui/icons/LocalHospital';
import BodyIcon from '@material-ui/icons/AccessibilityNew';
import SpeedIcon from '@material-ui/icons/ShutterSpeed';
import AgilityIcon from '@material-ui/icons/DirectionsRun';
import PowerIcon from '@material-ui/icons/FitnessCenter';
import EnduranceIcon from '@material-ui/icons/Security';
import SettingsIcon from '@material-ui/icons/Settings';
import TeamIcon from '@material-ui/icons/SupervisedUserCircle';
import ScoutingIcon from '@material-ui/icons/Flag';
import TestingIcon from '@material-ui/icons/Ballot';
import RehabilitionIcon from '@material-ui/icons/Opacity';
import Injury1Icon from '@material-ui/icons/Healing';
import PlanningIcon from '@material-ui/icons/EventNote';
import TrainingIcon from '@material-ui/icons/LocalMovies';
import AnalysisIcon from '@material-ui/icons/Assessment';
import EvaluationIcon from '@material-ui/icons/Timeline';
import TTMIcon from '@material-ui/icons/BubbleChart';
import GeneralIcon from '@material-ui/icons/Tune';
import ReportIcon from '@material-ui/icons/ListAlt';
import PlayerIcon from '@material-ui/icons/PersonPin';
import GeneralReportIcon from '@material-ui/icons/Toll';
import ViewReportIcon from '@material-ui/icons/TableChart';
import MemberIcon from '@material-ui/icons/Group';
import MemberInfoIcon from '@material-ui/icons/PersonAdd';
import GeneralMemberIcon from '@material-ui/icons/GroupWork';
import ViewMemberIcon from '@material-ui/icons/DeviceHub';
import PlayerListIcon from '@material-ui/icons/FormatListNumberedRtl';
import AddPlayerIcon from '@material-ui/icons/GroupAdd';
import ViewPlayerIcon from '@material-ui/icons/Assignment';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DailyTrainingIcon from '@material-ui/icons/SportsSoccer';
import MonthlyTrainingIcon from '@material-ui/icons/SportsKabaddi';
import AddMonthlyIcon from '@material-ui/icons/PostAdd';
import ViewMonthlyIcon from '@material-ui/icons/DataUsage';
import SeasonalProgIcon from '@material-ui/icons/SportsHandball';
import AddSeasonalIcon from '@material-ui/icons/LibraryAdd';
import ViewSeasonalIcon from '@material-ui/icons/ViewWeek';
import MethodologyIcon from '@material-ui/icons/AllInclusive';
import AnnualPlanIcon from '@material-ui/icons/Event';

import routes from '../../constants/routes';
import { getLanguage } from '../../actions/dropDownActions';

import * as fieldsArray from '../../constants/textFields';
import * as fieldsArrayJap from '../../constants/textFieldsJap';

const listItemsArray = [...fieldsArray.appbarListItems];
const listItemsJapArray = [...fieldsArrayJap.appbarListItems];

const routeTo = [
  routes.COUNTER,
  routes.TEAMINFO,
  routes.TACTICAL,
  routes.TECHNICAL,
  routes.MENTAL,
  // /////
  routes.HEALTH_SITUATION,
  routes.BODY_SIZE,
  routes.POWER_STRENGTH,
  routes.ENDURANCE,
  routes.SPEED,
  routes.AGILITY,
  // /////
  routes.SCOUTING,
  routes.TESTING,
  // /////
  routes.REHABILITATION,
  routes.INJURY,
  routes.TRAINING,
  // /////
  routes.TRAININGMOV,
  routes.GAMEANALYSIS,
  // /////
  routes.EVALPLAYER,
  routes.EVALBODYSIZE,
  routes.EVALPHYSICAL,
  routes.EVALTTM,
  routes.EVALGENERAL,
  // /////
  routes.GAMEREPORT,
  routes.GAMEINFO,
  routes.GAMEREPORTVIEW,
  // /////
  routes.MEMBERLIST,
  routes.MEMBERINFO,
  routes.MEMBERLISTVIEW,
  // /////
  routes.PLAYERLIST,
  routes.PLAYERLISTVIEW,
  // /////
  routes.DAILYPROGRAM,
  // /////
  routes.MONTHLYPROGRAM,
  routes.MONTHLYVIEW,
  // /////
  routes.SEASONPROGRAM,
  routes.SEASONVIEW,
  // /////
  // add by sergey.
  routes.METHODOLOGY,
  routes.DAILYTRAINING,

  routes.ANNUALPLAN,
  // /////
  routes.SETTINGS,
  // routes.SIGNIN,
  // routes.SIGNUP
  // /////
];
const icons = [
  <ProfileIcon color="primary" />,
  <TeamIcon color="primary" />,
  <TacticalIcon color="primary" />,
  <TechnicalIcon color="primary" />,
  <Injury1Icon color="primary" />,
  // ///////
  <HealthIcon color="primary" />,
  <BodyIcon color="primary" />,
  <PowerIcon color="primary" />,
  <EnduranceIcon color="primary" />,
  <SpeedIcon color="primary" />,
  <AgilityIcon color="primary" />,
  // ///////
  <ScoutingIcon color="primary" />,
  <TestingIcon color="primary" />,
  // //////
  <Injury1Icon color="primary" />,
  <HealthIcon color="primary" />,
  <PlanningIcon color="primary" />,
  // //////
  <TrainingIcon color="primary" />,
  <AnalysisIcon color="primary" />,
  // //////
  <HealthIcon color="primary" />,
  <BodyIcon color="primary" />,
  <AgilityIcon color="primary" />,
  <TTMIcon color="primary" />,
  <GeneralIcon color="primary" />,
  // //////
  <PlayerIcon color="primary" />,
  <GeneralReportIcon color="primary" />,
  <ViewReportIcon color="primary" />,
  // //////
  <MemberInfoIcon color="primary" />,
  <GeneralMemberIcon color="primary" />,
  <ViewMemberIcon color="primary" />,
  // //////
  <AddPlayerIcon color="primary" />,
  <ViewPlayerIcon color="primary" />,
  // //////
  <DailyTrainingIcon color="primary" />,
  // //////
  <AddMonthlyIcon color="primary" />,
  <ViewMonthlyIcon color="primary" />,
  // //////
  <AddSeasonalIcon color="primary" />,
  <ViewSeasonalIcon color="primary" />,
  // //////
  <MethodologyIcon color="primary" />,
  <DailyTrainingIcon color="primary" />,
  // //////
  <AnnualPlanIcon color="primary" />,
  // //////
  <SettingsIcon color="primary" />
];

let authInfo;
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawerPaper: {
    width: drawerWidth
  },

  appBar: {
    backgroundColor: 'white',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
    //   background:
    //       'linear-gradient(0deg, rgba(178, 0, 0, 1), rgba(26, 43, 117, 1) 50%)'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    background:
      'linear-gradient(0deg, rgba(178, 0, 0, 1), rgba(26, 43, 117, 1) 50%)'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing.unit * 9 + 1,
    // },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 1
  },

  grow: {
    flexGrow: 1
  },
  listItem: {
    fontSize: 13,
    marginTop: -5,
    marginBottom: -5,
    color: 'white'
  },
  nestedListItem: {
    fontSize: 12,
    marginTop: -5,
    marginBottom: -5,
    color: 'white',
    paddingLeft: 15
  },
  mainMenu: {
    fontSize: 20,
    marginTop: -10,
    marginBottom: -10,
    color: 'white'
  },

  listItemIcon: {
    fontSize: 13,
    marginTop: -5,
    marginBottom: -5
  },
  mainMenuIcon: {
    fontSize: 20,
    marginTop: -10,
    marginBottom: -10
  },

  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  iconSmall: {
    // fontSize: 20
  },

  logoArea: {
    // width: '200px',
    height: '100px'
    // backgroundImage: `url(${require('../../assets/images/logo.png')})`,
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover'
  },

  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  expandIcon: {
    color: 'white',
    margin: -10
  }
});

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listItems: [...fieldsArray.appbarListItems],
      language: 'English',
      open: false,

      openNested1: false,
      openNested2: false,
      openNested3: false,
      openNested4: false,
      openNested5: false,
      openNested6: false,
      openNested7: false,
      openNested8: false,
      openNested9: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const userAvail = JSON.parse(localStorage.getItem('userAvail'));
    authInfo = nextProps.authInfo;

    return {
      userAvail,
      playerInfo: nextProps.playerInfo,
      language: nextProps.language
    };
  }

  componentDidMount() {
    const { playerInfo } = this.state;
    this.props.getLanguage(playerInfo);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.language !== prevState.language) {
      this.changeLang(this.state.language);
    }
  }

  changeLang = lang => {
    if (lang === 'English') {
      this.setState({
        listItems: listItemsArray
      });
    }
    if (lang === 'Japanese') {
      this.setState({
        listItems: listItemsJapArray
      });
    }
  };

  signOut() {
    authInfo.remove(
      { fileName: 'signIn' },
      { multi: true },
      (err, numRemoved) => {
        localStorage.setItem('userAvail', null);
        this.props.history.push('/signIn');
      }
    );
    this.setState({
      userAvail: null,
      open: false,
      openNested1: false,
      openNested2: false,
      openNested3: false,
      openNested4: false,
      openNested5: false,
      openNested6: false
    });
  }

  handleDrawerOpen = () => {
    const { userAvail } = this.state;
    if (userAvail != null) {
      this.setState({ open: true });
    }
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClick = no => {
    this.setState(state => ({
      [`openNested${no}`]: !state[`openNested${no}`]
    }));
  };

  render() {
    const { userAvail, open, listItems, language } = this.state;
    const { classes, theme, children } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            {!open ? (
              <IconButton
                // color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: open
                })}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={this.handleDrawerClose}
                className={styles.menuButton}
              >
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            )}
            <Typography variant="h6" className={classes.grow} noWrap>
              {!open && 'TEAMDATA VER.01'}
            </Typography>
            {userAvail != null && (
              <span>
                <Button className={classes.button}>
                  <AccountCircle
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  {userAvail}
                </Button>
                <Button
                  onClick={() => this.signOut()}
                  className={classes.button}
                >
                  <Logout
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  {language === 'Japanese' ? 'ログアウト' : 'Logout'}
                </Button>
              </span>
            )}
          </Toolbar>
        </AppBar>
        {userAvail != null && (
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })}
            classes={{
              paper: classNames({
                [classes.drawerPaper]: true,
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
              })
            }}
            open={open}
          >
            <div
              style={{ padding: 0, margin: 0 }}
              className={classNames(classes.toolbar, {
                [classes.logoArea]: open
              })}
            >
              <img
                // style={{ padding: 0, margin: 0 }}
                src={require('../../assets/images/logo.png')}
                alt="logo"
                width="100%"
                height="100%"
              />
            </div>
            <List>
              <Link style={{ textDecoration: 'none' }} to={routes.HOME}>
                <ListItem button>
                  {!open ? (
                    <Tooltip
                      title={
                        language === 'English' ? `MAIN MENU` : 'メインメニュー'
                      }
                    >
                      <ListItemIcon className={classes.mainMenuIcon}>
                        <MainIcon color="primary" />
                      </ListItemIcon>
                    </Tooltip>
                  ) : null}
                  <ListItemText
                    primary={
                      language === 'English' ? `MAIN MENU` : 'メインメニュー'
                    }
                    classes={{ primary: classes.mainMenu }}
                  />
                </ListItem>
              </Link>
              {listItems.slice(0, 5).map((text, index) => (
                <Link
                  key={text}
                  style={{ textDecoration: 'none' }}
                  to={{
                    pathname: routeTo[index]
                  }}
                >
                  <ListItem button>
                    {!open ? (
                      <Tooltip title={text}>
                        <ListItemIcon className={classes.listItemIcon}>
                          {icons[index]}
                        </ListItemIcon>
                      </Tooltip>
                    ) : null}
                    <ListItemText
                      primary={text}
                      classes={{ primary: classes.listItem }}
                    />
                  </ListItem>
                </Link>
              ))}
              <ListItem button onClick={() => this.handleClick(1)}>
                {!open ? (
                  <Tooltip
                    title={
                      language === 'English'
                        ? `Physical Performance`
                        : 'フィジカルパーフォーマンス'
                    }
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <PhysicalIcon color="secondary" />
                    </ListItemIcon>
                  </Tooltip>
                ) : null}
                <ListItemText
                  primary={
                    language === 'English'
                      ? `Physical Performance`
                      : 'フィジカルパーフォーマンス'
                  }
                  classes={{ primary: classes.listItem }}
                />
                {this.state.openNested1 ? (
                  <ExpandLess className={classes.expandIcon} />
                ) : (
                  <ExpandMore className={classes.expandIcon} />
                )}
              </ListItem>
              <Collapse
                in={this.state.openNested1}
                timeout="auto"
                unmountOnExit
              >
                {listItems.slice(5, 11).map((text, index) => (
                  <Link
                    key={text}
                    style={{ textDecoration: 'none' }}
                    to={{
                      pathname: routeTo[index + 5]
                    }}
                  >
                    <ListItem button>
                      {!open ? (
                        <Tooltip title={text}>
                          <ListItemIcon className={classes.listItemIcon}>
                            {icons[index + 5]}
                          </ListItemIcon>
                        </Tooltip>
                      ) : null}
                      <ListItemText
                        primary={text}
                        classes={{ primary: classes.nestedListItem }}
                      />
                    </ListItem>
                  </Link>
                ))}
              </Collapse>
              {listItems.slice(11, 13).map((text, index) => (
                <Link
                  key={text}
                  style={{ textDecoration: 'none' }}
                  to={{
                    pathname: routeTo[index + 11]
                  }}
                >
                  <ListItem button>
                    {!open ? (
                      <Tooltip title={text}>
                        <ListItemIcon className={classes.listItemIcon}>
                          {icons[index + 11]}
                        </ListItemIcon>
                      </Tooltip>
                    ) : null}
                    <ListItemText
                      primary={text}
                      classes={{ primary: classes.listItem }}
                    />
                  </ListItem>
                </Link>
              ))}
              <ListItem button onClick={() => this.handleClick(2)}>
                {!open ? (
                  <Tooltip
                    title={
                      language === 'English'
                        ? `Rehabilitation`
                        : 'リハビリテーション'
                    }
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <RehabilitionIcon color="secondary" />
                    </ListItemIcon>
                  </Tooltip>
                ) : null}
                <ListItemText
                  primary={
                    language === 'English'
                      ? `Rehabilitation`
                      : 'リハビリテーション'
                  }
                  classes={{ primary: classes.listItem }}
                />
                {this.state.openNested2 ? (
                  <ExpandLess className={classes.expandIcon} />
                ) : (
                  <ExpandMore className={classes.expandIcon} />
                )}
              </ListItem>
              <Collapse
                in={this.state.openNested2}
                timeout="auto"
                unmountOnExit
              >
                {listItems.slice(13, 16).map((text, index) => (
                  <Link
                    key={text}
                    style={{ textDecoration: 'none' }}
                    to={{
                      pathname: routeTo[index + 13]
                    }}
                  >
                    <ListItem button>
                      {!open ? (
                        <Tooltip title={text}>
                          <ListItemIcon className={classes.listItemIcon}>
                            {icons[index + 13]}
                          </ListItemIcon>
                        </Tooltip>
                      ) : null}
                      <ListItemText
                        primary={text}
                        classes={{ primary: classes.nestedListItem }}
                      />
                    </ListItem>
                  </Link>
                ))}
              </Collapse>
              {listItems.slice(16, 18).map((text, index) => (
                <Link
                  key={text}
                  style={{ textDecoration: 'none' }}
                  to={{
                    pathname: routeTo[index + 16]
                  }}
                >
                  <ListItem button>
                    {!open ? (
                      <Tooltip title={text}>
                        <ListItemIcon className={classes.listItemIcon}>
                          {icons[index + 16]}
                        </ListItemIcon>
                      </Tooltip>
                    ) : null}
                    <ListItemText
                      primary={text}
                      classes={{ primary: classes.listItem }}
                    />
                  </ListItem>
                </Link>
              ))}
              <ListItem button onClick={() => this.handleClick(3)}>
                {!open ? (
                  <Tooltip
                    title={language === 'English' ? `Evaluation` : '評価'}
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <EvaluationIcon color="secondary" />
                    </ListItemIcon>
                  </Tooltip>
                ) : null}
                <ListItemText
                  primary={language === 'English' ? `Evaluation` : '評価'}
                  classes={{ primary: classes.listItem }}
                />
                {this.state.openNested3 ? (
                  <ExpandLess className={classes.expandIcon} />
                ) : (
                  <ExpandMore className={classes.expandIcon} />
                )}
              </ListItem>
              <Collapse
                in={this.state.openNested3}
                timeout="auto"
                unmountOnExit
              >
                {listItems.slice(18, 23).map((text, index) => (
                  <Link
                    key={text}
                    style={{ textDecoration: 'none' }}
                    to={{
                      pathname: routeTo[index + 18]
                    }}
                  >
                    <ListItem button>
                      {!open ? (
                        <Tooltip title={text}>
                          <ListItemIcon className={classes.listItemIcon}>
                            {icons[index + 18]}
                          </ListItemIcon>
                        </Tooltip>
                      ) : null}
                      <ListItemText
                        primary={text}
                        classes={{ primary: classes.nestedListItem }}
                      />
                    </ListItem>
                  </Link>
                ))}
              </Collapse>
              <ListItem button onClick={() => this.handleClick(4)}>
                {!open ? (
                  <Tooltip
                    title={
                      language === 'English' ? `Game Report` : 'ゲームレポート'
                    }
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <ReportIcon color="secondary" />
                    </ListItemIcon>
                  </Tooltip>
                ) : null}
                <ListItemText
                  primary={
                    language === 'English' ? `Game Report` : 'ゲームレポート'
                  }
                  classes={{ primary: classes.listItem }}
                />
                {this.state.openNested4 ? (
                  <ExpandLess className={classes.expandIcon} />
                ) : (
                  <ExpandMore className={classes.expandIcon} />
                )}
              </ListItem>
              <Collapse
                in={this.state.openNested4}
                timeout="auto"
                unmountOnExit
              >
                {listItems.slice(23, 26).map((text, index) => (
                  <Link
                    key={text}
                    style={{ textDecoration: 'none' }}
                    to={{
                      pathname: routeTo[index + 23]
                    }}
                  >
                    <ListItem button>
                      {!open ? (
                        <Tooltip title={text}>
                          <ListItemIcon className={classes.listItemIcon}>
                            {icons[index + 23]}
                          </ListItemIcon>
                        </Tooltip>
                      ) : null}
                      <ListItemText
                        primary={text}
                        classes={{ primary: classes.nestedListItem }}
                      />
                    </ListItem>
                  </Link>
                ))}
              </Collapse>
              <ListItem button onClick={() => this.handleClick(5)}>
                {!open ? (
                  <Tooltip
                    title={
                      language === 'English'
                        ? `Member List for Game`
                        : 'ゲームのメンバーリスト'
                    }
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <MemberIcon color="secondary" />
                    </ListItemIcon>
                  </Tooltip>
                ) : null}
                <ListItemText
                  primary={
                    language === 'English'
                      ? `Member List for Game`
                      : 'ゲームのメンバーリスト'
                  }
                  classes={{ primary: classes.listItem }}
                />
                {this.state.openNested5 ? (
                  <ExpandLess className={classes.expandIcon} />
                ) : (
                  <ExpandMore className={classes.expandIcon} />
                )}
              </ListItem>
              <Collapse
                in={this.state.openNested5}
                timeout="auto"
                unmountOnExit
              >
                {listItems.slice(26, 29).map((text, index) => (
                  <Link
                    key={text}
                    style={{ textDecoration: 'none' }}
                    to={{
                      pathname: routeTo[index + 26]
                    }}
                  >
                    <ListItem button>
                      {!open ? (
                        <Tooltip title={text}>
                          <ListItemIcon className={classes.listItemIcon}>
                            {icons[index + 26]}
                          </ListItemIcon>
                        </Tooltip>
                      ) : null}
                      <ListItemText
                        primary={text}
                        classes={{ primary: classes.nestedListItem }}
                      />
                    </ListItem>
                  </Link>
                ))}
              </Collapse>
              <ListItem button onClick={() => this.handleClick(6)}>
                {!open ? (
                  <Tooltip
                    title={
                      language === 'English'
                        ? `Player List`
                        : 'プレイヤーリスト'
                    }
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <PlayerListIcon color="secondary" />
                    </ListItemIcon>
                  </Tooltip>
                ) : null}
                <ListItemText
                  primary={
                    language === 'English' ? `Player List` : 'プレイヤーリスト'
                  }
                  classes={{ primary: classes.listItem }}
                />
                {this.state.openNested6 ? (
                  <ExpandLess className={classes.expandIcon} />
                ) : (
                  <ExpandMore className={classes.expandIcon} />
                )}
              </ListItem>
              <Collapse
                in={this.state.openNested6}
                timeout="auto"
                unmountOnExit
              >
                {listItems.slice(29, 31).map((text, index) => (
                  <Link
                    key={text}
                    style={{ textDecoration: 'none' }}
                    to={{
                      pathname: routeTo[index + 29]
                    }}
                  >
                    <ListItem button>
                      {!open ? (
                        <Tooltip title={text}>
                          <ListItemIcon className={classes.listItemIcon}>
                            {icons[index + 29]}
                          </ListItemIcon>
                        </Tooltip>
                      ) : null}
                      <ListItemText
                        primary={text}
                        classes={{ primary: classes.nestedListItem }}
                      />
                    </ListItem>
                  </Link>
                ))}
              </Collapse>
              {listItems.slice(31, 32).map((text, index) => (
                <Link
                  key={text}
                  style={{ textDecoration: 'none' }}
                  to={{
                    pathname: routeTo[index + 31]
                  }}
                >
                  <ListItem button>
                    {!open ? (
                      <Tooltip title={text}>
                        <ListItemIcon className={classes.listItemIcon}>
                          {icons[index + 31]}
                        </ListItemIcon>
                      </Tooltip>
                    ) : null}
                    <ListItemText
                      primary={text}
                      classes={{ primary: classes.listItem }}
                    />
                  </ListItem>
                </Link>
              ))}
              <ListItem button onClick={() => this.handleClick(7)}>
                {!open ? (
                  <Tooltip
                    title={
                      language === 'English'
                        ? `Monthly Training Program`
                        : '月間トレーニングプランナー'
                    }
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <MonthlyTrainingIcon color="secondary" />
                    </ListItemIcon>
                  </Tooltip>
                ) : null}
                <ListItemText
                  primary={
                    language === 'English'
                      ? `Monthly Training Program`
                      : '月間トレーニングプランナー'
                  }
                  classes={{ primary: classes.listItem }}
                />
                {this.state.openNested6 ? (
                  <ExpandLess className={classes.expandIcon} />
                ) : (
                  <ExpandMore className={classes.expandIcon} />
                )}
              </ListItem>
              <Collapse
                in={this.state.openNested7}
                timeout="auto"
                unmountOnExit
              >
                {listItems.slice(32, 34).map((text, index) => (
                  <Link
                    key={text}
                    style={{ textDecoration: 'none' }}
                    to={{
                      pathname: routeTo[index + 32]
                    }}
                  >
                    <ListItem button>
                      {!open ? (
                        <Tooltip title={text}>
                          <ListItemIcon className={classes.listItemIcon}>
                            {icons[index + 32]}
                          </ListItemIcon>
                        </Tooltip>
                      ) : null}
                      <ListItemText
                        primary={text}
                        classes={{ primary: classes.nestedListItem }}
                      />
                    </ListItem>
                  </Link>
                ))}
              </Collapse>
              
              <ListItem button onClick={() => this.handleClick(8)}>
                {!open ? (
                  <Tooltip
                    title={
                      language === 'English'
                        ? `Seasonal Program`
                        : 'シーズン計画'
                    }
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <SeasonalProgIcon color="secondary" />
                    </ListItemIcon>
                  </Tooltip>
                ) : null}
                <ListItemText
                  primary={
                    language === 'English' ? `Seasonal Program` : 'シーズン計画'
                  }
                  classes={{ primary: classes.listItem }}
                />
                {this.state.openNested6 ? (
                  <ExpandLess className={classes.expandIcon} />
                ) : (
                  <ExpandMore className={classes.expandIcon} />
                )}
              </ListItem>
              <Collapse
                in={this.state.openNested8}
                timeout="auto"
                unmountOnExit
              >
                {listItems.slice(34, 36).map((text, index) => (
                  <Link
                    key={text}
                    style={{ textDecoration: 'none' }}
                    to={{
                      pathname: routeTo[index + 34]
                    }}
                  >
                    <ListItem button>
                      {!open ? (
                        <Tooltip title={text}>
                          <ListItemIcon className={classes.listItemIcon}>
                            {icons[index + 34]}
                          </ListItemIcon>
                        </Tooltip>
                      ) : null}
                      <ListItemText
                        primary={text}
                        classes={{ primary: classes.nestedListItem }}
                      />
                    </ListItem>
                  </Link>
                ))}
              </Collapse>

              {listItems.slice(36, 40).map((text, index) => (
                <Link
                  key={text}
                  style={{ textDecoration: 'none' }}
                  to={{
                    pathname: routeTo[index + 36]
                  }}
                >
                  <ListItem button>
                    {!open ? (
                      <Tooltip title={text}>
                        <ListItemIcon className={classes.listItemIcon}>
                          {icons[index + 36]}
                        </ListItemIcon>
                      </Tooltip>
                    ) : null}
                    <ListItemText
                      primary={text}
                      classes={{ primary: classes.listItem }}
                    />
                  </ListItem>
                </Link>
              ))}
            </List>

            {/* <Typography
              align="center"
              variant="body2"
              style={{
                paddingTop: 20,
                textDecoration: 'underline',
                color: 'white',
                position: 'absolute',
                top: 'auto',
                bottom: 20,
                left: 0,
                right: 0
              }}
            >
              Team Data Ver.01
            </Typography> */}
          </Drawer>
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authInfo: state.authReducer.authInfo,
  language: state.dropDownReducer.language || 'English'
});

const mapDispatchToProps = dispatch => ({
  getLanguage: playerInfo => dispatch(getLanguage(playerInfo))
});

/** Updated For V2 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(NavBar));
