// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import playerInfoReducer from './playerInfoReducer';
import tacticalReducer from './tacticalReducer';
import technicalReducer from './technicalReducer';
import physicalReducer from './physicalReducer';
import scoutingReducer from './scoutingReducer';
import trainingMovReducer from './trainingMovReducer';
import gameAnalysisReducer from './gameAnalysisReducer';
import rehabilitationReducer from './rehabilitationReducer';
import testingReducer from './testingReducer';
import teamInfoReducer from './teamInfoReducer';
import gameReportReducer from './gameReportReducer';
import gameInfoReducer from './gameInfoReducer';
import gameReportViewReducer from './gameReportViewReducer';
import memberListReducer from './memberListReducer';
import memberInfoReducer from './memberInfoReducer';
import memberListViewReducer from './memberListViewReducer';
import evaluationReducer from './evaluationReducer';
import playerListReducer from './playerListReducer';
import playerListViewReducer from './playerListViewReducer';
import dailyProgReducer from './dailyProgReducer';
import monthlyReducer from './monthlyReducer';
import seasonalReducer from './seasonalReducer';
import annualReducer from './annualReducer';
import authReducer from './authReducer';
import dropDownReducer from './dropDownReducer';
import methodologyReducer from './methodologyReducer';//pavel

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    playerInfoReducer,
    tacticalReducer,
    technicalReducer,
    physicalReducer,
    scoutingReducer,
    trainingMovReducer,
    gameAnalysisReducer,
    rehabilitationReducer,
    testingReducer,
    teamInfoReducer,
    gameReportReducer,
    gameInfoReducer,
    gameReportViewReducer,
    memberListReducer,
    memberInfoReducer,
    memberListViewReducer,
    evaluationReducer,
    playerListReducer,
    playerListViewReducer,
    dailyProgReducer,
    monthlyReducer,
    seasonalReducer,
    annualReducer,
    authReducer,
    dropDownReducer,
    methodologyReducer//pavel
  });
}
