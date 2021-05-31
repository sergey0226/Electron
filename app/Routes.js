/* eslint-disable no-shadow */
import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import PlayerInfoPage from './containers/PlayerInfoPage';
import TacticalPage from './containers/TacticalPage';
import TechnicalPage from './containers/TechnicalPage';
import MentalPage from './containers/MentalPage';

import HealthPage from './containers/HealthPage';
import BodySizePage from './containers/BodySizePage';
import PowerPage from './containers/PowerPage';
import EndurancePage from './containers/EndurancePage';
import SpeedPage from './containers/SpeedPage';
import AgilityPage from './containers/AgilityPage';
import ScoutingPage from './containers/ScoutingPage';
import TestingPage from './containers/TestingPage';
import RehabilitationPage from './containers/RehabilitationPage';
import InjuryPage from './containers/InjuryPage';
import TrainingPage from './containers/TrainingPage';
import TrainingMovPage from './containers/TrainingMovPage';
import GameAnalysisPage from './containers/GameAnalysisPage';
import TeamInfoPage from './containers/TeamInfoPage';
import GameReportPage from './containers/GameReportPage';
import GameInfoPage from './containers/GameInfoPage';
import GameReportViewPage from './containers/GameReportViewPage';
import MemberListPage from './containers/MemberListPage';
import MemberInfoPage from './containers/MemberInfoPage';
import MemberListViewPage from './containers/MemberListViewPage';
import PlayerEvalPage from './containers/PlayerEvalPage';
import BodyEvalPage from './containers/BodyEvalPage';
import PhysicalEvalPage from './containers/PhysicalEvalPage';
import TTMEvalPage from './containers/TTMEvalPage';
import GeneralEvalPage from './containers/GeneralEvalPage';
import SettingsPage from './containers/SettingsPage';
import PlayerListPage from './containers/PlayerListPage';
import PlayerListViewPage from './containers/PlayerListViewPage';
import DailyProgPage from './containers/DailyProgPage';
import MonthlyProgPage from './containers/MonthlyProgPage';
import MonthlyViewPage from './containers/MonthlyViewPage';
import SeasonProgPage from './containers/SeasonProgPage';
import SeasonalViewPage from './containers/SeasonalViewPage';
import AnnualPlanPage from './containers/AnnualPlanPage';
import MethodologyPage from './containers/MethodologyPage';
import DailyTrainingPage from './containers/DailyTrainingPage';

import SignInPage from './containers/SignInPage';
import SignUpPage from './containers/SignUpPage';

import AppBar from './components/AppBar/AppBar';

const Datastore = require('nedb');

const playerInfo = new Datastore({
  filename: 'playerInfo.db',
  autoload: true,
  corruptAlertThreshold: 1
});

const routing = props => (
  <App>
    <AppBar playerInfo={playerInfo} {...props}>
      <Switch>
        <Route
          exact
          path={routes.HOME}
          component={props => <HomePage playerInfo={playerInfo} {...props} />}
        />
        <Route
          exact
          path={routes.COUNTER}
          component={props => (
            <PlayerInfoPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.TACTICAL}
          component={props => (
            <TacticalPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.TECHNICAL}
          component={props => (
            <TechnicalPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.MENTAL}
          component={props => <MentalPage playerInfo={playerInfo} {...props} />}
        />
        <Route
          exact
          path={routes.HEALTH_SITUATION}
          component={props => <HealthPage playerInfo={playerInfo} {...props} />}
        />
        <Route
          exact
          path={routes.BODY_SIZE}
          component={props => (
            <BodySizePage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.POWER_STRENGTH}
          component={props => <PowerPage playerInfo={playerInfo} {...props} />}
        />
        <Route
          exact
          path={routes.ENDURANCE}
          component={props => (
            <EndurancePage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.SPEED}
          component={props => <SpeedPage playerInfo={playerInfo} {...props} />}
        />
        <Route
          exact
          path={routes.AGILITY}
          component={props => (
            <AgilityPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.SCOUTING}
          component={props => (
            <ScoutingPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.TESTING}
          component={props => (
            <TestingPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.TRAINING}
          component={props => (
            <TrainingPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.REHABILITATION}
          component={props => (
            <RehabilitationPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.INJURY}
          component={props => <InjuryPage playerInfo={playerInfo} {...props} />}
        />
        <Route
          exact
          path={routes.TRAININGMOV}
          component={props => (
            <TrainingMovPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.GAMEANALYSIS}
          component={props => (
            <GameAnalysisPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.TEAMINFO}
          component={props => (
            <TeamInfoPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.GAMEREPORT}
          component={props => (
            <GameReportPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.GAMEINFO}
          component={props => (
            <GameInfoPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.GAMEREPORTVIEW}
          component={props => (
            <GameReportViewPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.MEMBERLIST}
          component={props => (
            <MemberListPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.MEMBERINFO}
          component={props => (
            <MemberInfoPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.MEMBERLISTVIEW}
          component={props => (
            <MemberListViewPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.EVALPLAYER}
          component={props => (
            <PlayerEvalPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.EVALBODYSIZE}
          component={props => (
            <BodyEvalPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.EVALPHYSICAL}
          component={props => (
            <PhysicalEvalPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.EVALTTM}
          component={props => (
            <TTMEvalPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.EVALGENERAL}
          component={props => (
            <GeneralEvalPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.PLAYERLIST}
          component={props => (
            <PlayerListPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.PLAYERLISTVIEW}
          component={props => (
            <PlayerListViewPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.DAILYPROGRAM}
          component={props => (
            <DailyProgPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.MONTHLYPROGRAM}
          component={props => (
            <MonthlyProgPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.MONTHLYVIEW}
          component={props => (
            <MonthlyViewPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.SEASONPROGRAM}
          component={props => (
            <SeasonProgPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.SEASONVIEW}
          component={props => (
            <SeasonalViewPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.ANNUALPLAN}
          component={props => (
            <AnnualPlanPage playerInfo={playerInfo} {...props} />
          )}
        />

        <Route
          exact
          path={routes.SETTINGS}
          component={props => (
            <SettingsPage playerInfo={playerInfo} {...props} />
          )}
        />
        <Route
          exact
          path={routes.SIGNIN}
          component={props => <SignInPage playerInfo={playerInfo} {...props} />}
        />
        <Route
          exact
          path={routes.SIGNUP}
          component={props => <SignUpPage playerInfo={playerInfo} {...props} />}
        />
        {/* this is sergey code */}
        <Route
          exact
          path={routes.METHODOLOGY}
          component={props => <MethodologyPage playerInfo={playerInfo} {...props} />}
        />
        <Route
          exact
          path={routes.DAILYTRAINING}
          component={props => <DailyTrainingPage playerInfo={playerInfo} {...props} />}
        />

      </Switch>
    </AppBar>
  </App>
);
export default withRouter(routing);
