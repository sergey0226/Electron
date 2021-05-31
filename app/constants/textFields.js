/* eslint-disable global-require */
/* eslint-disable linebreak-style */

import routes from './routes';

export const agilityScores = [
  'Agility Test Step 50/sec',
  'Agility Test Forward Run/sec'
];

export const bodySizePhysical = [
  'Shoulder/cm',
  'Breast/cm',
  'Arm/cm',
  'Waist/cm',
  'Buttocks/cm',
  'Hamstring/cm',
  'Calf/cm',
  'Ankle/cm'
];

export const dailyProgFields = [
  'Main Theme',

  'Tr. Start Time',
  'Tr. Finish Time',

  'No of Players',
  'Absentese',

  'Physical',
  'Technical',
  'Tactical',

  'Grand',
  'Coach Name',
  'Ph.Coach Name',

  'Season'
];

export const enduranceScores = [
  'Cooper 12min/run',
  'WMA 45/15',
  '1600M Protocol',
  'Yo Yo (Endurance&Int. Rec.)',
  'Shuttle Tempo Test(Anaerobic)'
];

export const gameAnalysisFields = [
  'Team vs Team',
  'Game Video',

  'Watched',
  'Theme',
  'Hyperlink to Video',

  'Tournament/League',

  'Field'
];

export const gameInfoFields = [
  'Field',
  'Weather',
  'Coach Name',
  'Opposition',
  'Season',

  'First Half',
  'Second Half',
  'Full Time',

  'Shoot On target',
  'Goal kick',
  'Corner kick',
  'Free kick direct',
  'Free kick Indirect',
  'Offside',
  'GK fine Save'
];

export const gameReportFields = [
  'Convention Name',
  'Name 1',
  'Position',
  'Starting Member',
  'Played time',
  'Yellow Card',
  'Red Card',

  'Shoot on Target',
  'Middle Shoot on target',
  'Short Pass',
  'Medium Pass',
  'Long Pass',
  'Right Cross',
  'Left Cross',
  'Right Corner Kick',
  'Left Corner Kick',
  'Win The Ball',
  'One v One Duel Success for attacking',
  'Heading Attacking Succsess',
  'Heading Defensive Success',
  'Free Kick',
  'Penalty Kick',
  'Goal (Score)',
  'Fine Save (For Goal Keeper)',
  'Goal Kick (for Goal Keeper)',

  'Shoot off target',
  'Middle Shoot off target',
  'Short Pass Negative',
  'Medium Pass Negative',
  'Long Pass Negative',
  'One v One Defense unsuccess',
  'Lose the ball',
  'Goal Kick unsucces',

  'Goal (Score)',
  'Success Play',
  'Unsuccess Play ',
  "Player's  inolved play"
];

export const gameReportViewFields = [
  'Field',
  'Weather',
  'CoachName',
  'Opposition'
];

export const generalEvalFields = ['Yellow Card', 'Red Card'];
export const generalEvalScores = [
  'TACTICAL',
  'TECHNICAL',
  'MENTAL',
  'PHYSICAL'
];

export const healthFields = [
  'Category',
  'Player Birthday',
  'Team Number',
  'Height/cm',
  'Weight/Kg',
  'Position',
  'Foot',
  'Mail',

  'BMI',
  'Blood Type',
  'Hb Value',
  'V02max/min',
  'Blood Pressure',

  'Injury Date',
  'How Injury',
  'Injured Parts',
  'Disease Name',
  'Injured Degree',
  'Scheduled to return',

  'BMI Stnd',
  'Hb Value Stnd',
  'VO2 max/min Stnd'
];
export const healthPhysical = [
  { title: 'Power/kg', id: 'avgPow1er' },
  { title: 'Strength/m', id: 'avgStreng1th' },
  { title: 'Endurance/min', id: '1600MProtocolTimeminEndurance1' },
  { title: 'Speed/sec', id: 'avgTimeSpe1ed' },
  { title: 'Agility/sec', id: 'avgAgility1' },

  { title: 'Power/kg', id: 'avgPow2er' },
  { title: 'Strength/m', id: 'avgStreng2th' },
  { title: 'Endurance/min', id: '1600MProtocolTimeminEndurance2' },
  { title: 'Speed/sec', id: 'avgTimeSpe2ed' },
  { title: 'Agility/sec', id: 'avgAgility2' },

  { title: 'Power/kg', id: 'avgPow3er' },
  { title: 'Strength/m', id: 'avgStreng3th' },
  { title: 'Endurance/min', id: '1600MProtocolTimeminEndurance3' },
  { title: 'Speed/sec', id: 'avgTimeSpe3ed' },
  { title: 'Agility/sec', id: 'avgAgility3' },

  { title: 'Power/kg', id: 'avgPow4er' },
  { title: 'Strength/m', id: 'avgStreng4th' },
  { title: 'Endurance/min', id: '1600MProtocolTimeminEndurance4' },
  { title: 'Speed/sec', id: 'avgTimeSpe4ed' },
  { title: 'Agility/sec', id: 'avgAgility4' }
];

export const injuryFields = [
  'Injured Parts',
  'Ice',
  'Suture',
  'Destination Hospital',

  'Disease Name',
  'Taping',
  'Medication',
  'Doctor Name',

  'Injury Type',
  'Elastic Bandage',
  'Others',
  'Injured Degree',

  'How Injury',
  'Cast',
  'Ambulance',
  'Scheduled to return',

  'Injury Status',
  'Rehabilitation Staff'
];

export const memberInfoFields = [
  'Opposition',
  'Tournament',
  'Game No',

  'First Half',
  'Second Half',
  'Full Time',

  'Manager',
  'H.Coach',
  'A.Coach',
  'Ph.Coach',
  'Kitt Manager',

  'Remarks 1',
  'Remarks 2',
  'Remarks 3',
  'Remarks 4',
  'Remarks 5',

  'Venue',

  'FP Home',
  'FP Away',
  'GK Home',
  'GK Away'
];

export const memberListFields = [
  'Team Name',

  'Name 1',
  'Name 2',
  'Uniform No',
  'License No',
  'Position',
  'Venue',
  'Cap',
  'Start',
  'Sub'
];

export const memberViewFields = [
  'Opposition',

  'First Half',
  'Second Half',
  'Full Time',

  'Tournament',
  'Game No'
];

export const tacticalFields = [
  'Category',
  'Player Birthday',
  'Team Number',
  'Height/cm',
  'Weight/Kg',
  'Position',
  'Foot',
  'Mail',

  'Shoulder/cm',
  'Breast/cm',
  'Arm/cm',
  'Waist/cm',
  'Buttocks/cm',
  'Hamstring/cm',
  'Calf/cm',
  'Ankle/cm',

  'BMI',
  'Blood Type',
  'Hb Value',
  'V02max/min',
  'Blood Pressure'
];
export const tacticalScores = [
  'Creating Space',
  'Support',
  'Width',
  'Depth',
  'Overlaps',
  'Diagonal Runs',
  'Playing forwards',
  'Speed of play',
  'Build up',
  'Switching Position',
  'Posession',
  'Transition',
  'Combination play',
  'Switching play',
  'Counter Attacking',
  'Playing out from the back',
  'Side attacking',
  'Center attacking',
  'Finishing in the final third',
  'Set Play',

  'Marking',
  'Approaching',
  'Pressing',
  'Delaying',
  'Back Pressing',
  'Covering',
  'Balance',
  'Doubling up',
  'Tracking',
  'Defense with the group',
  'Switching places',
  'Zonal defending',
  'Pressing Zone',
  'Defense for side attacking',
  'Defense for cross',
  'Defense line control',
  'Retreat',
  'Compactness',
  'Counter of the counter',
  'Set Play'
];

export const mentalScores = [
  'Motivation',
  'Perseverance',
  'Fighting Spirit',
  'Self control',
  'Relaxability',
  'Concentration',
  'Self confidence',
  'Determination',
  'Predictive power',
  'Self Realization',
  'Judgement',
  'Cooperativenes',
  'Loves to challenge',
  'Responsibility',
  'Character',
  'Competitivenes',
  'Commitment',
  'Communication',
  'Respect',
  'Motivation for Victory'
];

export const technicalScores = [
  'Short Passing',
  'Long Passing',
  'Dribbling',
  'Turning',
  'Shooting',
  'Ball Control',
  'First Touch',
  'Heading',
  'One v One',
  'Keeping the ball',
  'Receiving',
  'Crossing',
  'Finishing',
  'Support',
  'Side change passing',
  'Vole',
  'Feint',
  'Third man',
  'Pass and go',
  'Through pass',

  'One v One',
  'Body Shape',
  'Anticipation',
  'Intercepting',
  'Tackling',
  'Aproaching',
  'Covering',
  'Back step',
  'Side step',
  'Postioning',
  'Back press',
  'Retreat',
  'Marking',
  'Delaying',
  'Heading',
  'Clearing',
  'Body Contact',
  'Diagonal back running',
  'Shielding',
  'Timing'
];

export const physicalEval = [
  { title: 'Power/kg', id: 'avgPow1er' },
  { title: 'Strength/m', id: 'avgStreng1th' },
  { title: 'Endurance/min', id: '1600MProtocolTimeminEndurance1' },
  { title: 'Speed/sec', id: 'avgTimeSpe1ed' },
  { title: 'Agility/sec', id: 'avgAgility1' },

  { title: 'Power/kg', id: 'avgPow2er' },
  { title: 'Strength/m', id: 'avgStreng2th' },
  { title: 'Endurance/min', id: '1600MProtocolTimeminEndurance2' },
  { title: 'Speed/sec', id: 'avgTimeSpe2ed' },
  { title: 'Agility/sec', id: 'avgAgility2' },

  { title: 'Power/kg', id: 'avgPow3er' },
  { title: 'Strength/m', id: 'avgStreng3th' },
  { title: 'Endurance/min', id: '1600MProtocolTimeminEndurance3' },
  { title: 'Speed/sec', id: 'avgTimeSpe3ed' },
  { title: 'Agility/sec', id: 'avgAgility3' },

  { title: 'Power/kg', id: 'avgPow4er' },
  { title: 'Strength/m', id: 'avgStreng4th' },
  { title: 'Endurance/min', id: '1600MProtocolTimeminEndurance4' },
  { title: 'Speed/sec', id: 'avgTimeSpe4ed' },
  { title: 'Agility/sec', id: 'avgAgility4' }
];

export const playerInfoFields = [
  'Name 1',
  'Name 2',
  'Name 3',
  'Jr. Club',
  'Jr. Youth Club',
  'Phone',
  'Mail',

  'Parent Name',
  'Parent Phone',
  'Parent Email',
  'Line1',
  'Line2',
  'City',
  'Postcode',

  'License No',
  'Date of Registration',
  'Height/cm',
  'Weight/Kg',
  'BMI',

  'Category',
  'Shoulder/cm',
  'Breast/cm',
  'Arm/cm',
  'Waist/cm',

  'Team Number',
  'Buttocks/cm',
  'Hamstring/cm',
  'Calf/cm',
  'Ankle/cm',

  'Position',
  'Blood Type',
  'Hb Value',
  'V02max/min',
  'Blood Pressure',

  'Foot',
  'Jersey Size/Up',
  'Jersey Size',
  'Shoes Size',
  'Nationality'
];
export const playerInfoEyeFields = [
  'Jr. Club',
  'Jr. Youth Club',
  'Category',
  'Position',
  'Foot',
  'Jersey Size/Up',
  'Jersey Size'
];

export const playerListFields = [
  'Name 1',
  'Name 2',
  'Position',
  'Age',
  'School Year',
  'Absent',

  'Attendance',
  'Absence Reason',
  'Jr. Club',
  'Jr.Youth Club',
  'Category',
  'Where to Transfer',
  'Season'
];

export const powerScores = [
  'JUMP CMJWA/m',
  'JUMP Squat J/m',
  'JUMP 6J/m with arm/m',
  'JUMP 6J/m w/o arm/m',
  'L Vertical J/m',
  'R Vertical J/m',
  'Triple Hop/m',
  'L Long Throw/m',
  'R Long Throw/m',
  'L Long Kick/m',
  'R Long Kick/m',

  'Bench Press/kg',
  'Squat/kg',
  'Dead Lift/kg',
  'Leg Extension/kg',
  'LEG Curl/kg',
  'Chest Fly/kg',
  'Machine Rowing/kg',
  'Back Extension'
];

export const rehabilitationFields = [
  'Name 1',
  'Name 2',
  'Player No',
  'Jr. Club',
  'Jr. Youth Club',

  'Player Birthday',
  'Category',
  'Position',
  'Field Condition',
  'Injured Convention',
  'Field',

  'Phone',
  'Parent Phone',
  'Weather',
  'Coach Name',
  'Injured Time',
  'Medical Staff'
];

export const scoutingFields = [
  'Name 1',
  'Name 2',
  'Player Birthday',
  'Height',
  'Foot',
  'Jr Club',

  'Mail',
  'Phone',
  'Weight',
  'Position',
  'Jr Youth Club',
  'Youth Club',

  'Player Video',
  'Hyperlink to Video',
  'Country',
  'Region',
  'Line1',
  'Line2',
  'City',
  'Postcode'
];

export const speedScores = [
  '60m Sprint/sec',
  '50m Sprint/sec',
  '40m Sprint(each 10m)/sec',
  '30m Sprint/sec',
  '20m Sprint/sec',
  '10m Sprint/sec'
];

export const teamInfoFields = [
  'JUMP CMJWA/m',
  'JUMP Squat J/m',
  'JUMP 6J without arm/m',
  'JUMP 6J with arm/m',
  'Triple Hop/m',
  'L and R Leg Vert Jump',
  'Hb Value',

  'L and R Leg long Throw/m',
  'L and R Leg long kick/m',
  'Squat 1 RM',
  'Bench Press 1RM',
  'Cooper 12min/Run/m',
  'WMA 45/15 km/h',
  'VO2max l/min',

  '1600m Protocol/min',
  'Shuttle Tempo Test/min',
  'Yo Yo End & int Recov/m',
  '60m sprint/sec',
  '50m sprint/sec',
  '40m sprint/sec',
  'Height',

  '30m sprint/sec',
  '20m sprint/sec',
  '10m sprint/sec',
  'Agility TestStep 50/sec',
  'Agility Test Forward Run/sec',
  'Position',
  'Weight',

  // ////////////

  'Player Birthday',
  'License No',
  'Team Number',
  'Mail',
  'Jr. Youth Club',

  'Foot',
  'Phone',
  'Parent Phone',
  'BMI',
  'Blood Type',

  'Address',
  'Post Code',
  'Jersey Size/Up',
  'Jersey Size',
  'Shoes Size',

  'Parent Name',
  'City'
];

export const testingFields = [
  'JUMP CMJWA/m',
  'JUMP Squat J/m',
  'JUMP 6J without arm/m',
  'JUMP 6J with arm/m',
  'Triple Hop/m',
  'L and R Leg Vert Jump',
  'Hb Value',

  'L and R Leg long Throw/m',
  'L and R Leg long kick/m',
  'Squat 1 RM',
  'Bench Press 1RM',
  'Cooper 12min/Run/m',
  'WMA 45/15 km/h',
  'VO2max l/min',

  '1600m Protocol/min',
  'Shuttle Tempo Test/min',
  'Yo Yo End & int Recov/m',
  '60m sprint/sec',
  '50m sprint/sec',
  '40m sprint/sec',
  'Height',

  '30m sprint/sec',
  '20m sprint/sec',
  '10m sprint/sec',
  'Agility TestStep 50/sec',
  'Agility Test Forward Run/sec',
  'Position',
  'Weight'
];

export const trainingMovFields = [
  'Training Name',
  'Training Theme',
  'Category',
  'Training Load',

  'Coach Name',
  'Run Time/min',
  'Watched',

  'Training Video',
  'Hyperlink to Video',

  'Description',
  'Key Factors'
];

export const trainingFields = [
  'Weight Training Upper Body',
  'Aerobike/UBE',
  'Weight Training Core Training',
  'Stairmaster',
  'Weight Training Lower Body',
  'Body Balance',
  'Aerobike/ UBE',
  'Body Balance / Single Leg',

  'Walking',
  'Zig Zag Running',
  'Walking & Jogging',
  'One v One',
  'Jogging',
  'Jump',
  'Jogging 12min around fier',
  'Volley Kick',
  'Acceleration',
  'Dribble',
  '40m 6 sec + 30m 15sec',
  'Short Pass',
  'Half Court Running 26 Sec',
  'Middle Pass',
  'Random Running',
  'Long Pass',
  'Sprint',
  'Shooting',
  'Text',
  'Crossing',
  'Back&Front Step work',
  'Possession',
  'Right&Left Step work',
  'SSG',
  'Agility Drill',
  'Game'
];
export const trainingCheckBoxes = [
  'Aerobic',
  'Anaerobic',
  'Balance Disk',
  'Balance Board',
  'Open Eye',
  'Close Eye',
  'Aerobic',
  'Anaerobic',
  'Balance Disk',
  'Balance Board',
  'Open Eye',
  'Close Eye',

  'm',
  'm',
  'min',
  'min',
  'W m',
  'J m',
  'W m',
  'J m',
  'Without Ball',
  'With Ball',
  'W m',
  'J m',
  'W m',
  'J m',
  'Both Foot',
  'Jump Head',
  'Left',
  'Bounding',
  'Right',
  '5 Round',
  '7 Round',
  'L inside',
  'R inside',
  'L instep',
  'R instep',
  '20mx4x2',
  'Balance Board',
  '40mx2x2',
  '20+60x2',
  '10 Round x 3 set',
  '10 Round x 7 set',
  'L inside',
  'R inside',
  'L instep',
  'R instep',
  'L infront',
  'R infront',
  '5 Round',
  '7 Round',
  '10 Round',
  '12 Round',
  'L inside',
  'R inside',
  'L instep',
  'R instep',
  'L infront',
  'R infront',
  'L inside',
  'R inside',
  'L instep',
  'R instep',
  'L infront',
  'R infront',
  '5 m',
  '20 m',
  '10 m',
  '30 m',
  '15 m',
  '40 m',
  'L inside',
  'R inside',
  'L instep',
  'R instep',
  'L infront',
  'R infront',
  'L inside',
  'R instep',
  '4 Step x5',
  '8 Step x10',
  'LDP',
  'LR Slide Step',
  'LR Cross over%',
  'LR Carioca'
];

export const monthlyFields = [
  'Intensity',
  'WUP',
  'Physical',
  'Technical',
  'Tr1',
  'Tr2',
  'Tactical',
  'Tr',
  'SSG',
  'Game',
  'Main Theme',
  'Grand',
  'Season',
  'Year',
  'Month',
  'Day',
  'Week Day'
];

export const seasonalFields = [
  'TECHNICAL',
  'TACTICAL',
  'POWER',
  'STAMINA',
  'PERIOD',
  'Season'
];

export const appbarListItems = [
  'Player Information',
  'Team Information',
  'Tactical',
  'Technical',
  'Mental',
  // 'Physical Performance',
  'Physical Evaluation',
  'Body Size',
  'Power / Strength',
  'Endurance',
  'Speed',
  'Agility',
  // ///////
  'Scouting',
  'Testing Program',
  // 'Rehabilitation',
  'Injury Information 1',
  'Injury Information 2',
  'Rehabilitation Planning',
  // ///////
  'Training Movies',
  'Game Analysis',
  // 'Evaluation',
  'Player',
  'Body Size',
  'Physical',
  'Technical,Tactical,Mental',
  'General',
  // Game Report
  'Player Information',
  'Game Statistic',
  'View Report',
  // Member List
  'Member Information',
  'General Information',
  'View Member List for Game',
  // ////////
  // Player List
  'Add Player List',
  'View Player List',
  // //////
  'Daily Training Program',
  // //////
  // 'Monthly Training Program',
  'Add Daily Program',
  'View Monthly Program',
  // /////
  'Add Seasonal Program',
  'View Seasonal Program',
  // /////
  // add by sergey.
  'Methodology',
  'Daily Training',
  // /////
  'Annual Planning',
  'Settings',

];

export const cards = [
  {
    image: require('../assets/images/mainmenu/1.png'),
    title: 'Daily Training Planner',
    routeTo: routes.DAILYPROGRAM
  },
  {
    image: require('../assets/images/mainmenu/2.png'),
    title: 'Monthly Program',
    routeTo: routes.MONTHLYPROGRAM
  },
  {
    image: require('../assets/images/mainmenu/3.png'),
    title: 'Seasonal Program',
    routeTo: routes.SEASONPROGRAM
  },
  {
    image: require('../assets/images/mainmenu/4.png'),
    title: 'Rehabilitation',
    routeTo: routes.REHABILITATION
  },
  {
    image: require('../assets/images/mainmenu/5.png'),
    title: 'Evaluation',
    routeTo: routes.EVALPLAYER
  }
];

export const cards2 = [
  {
    image: require('../assets/images/mainmenu/6.png'),
    title: 'Member List for Game',
    routeTo: routes.MEMBERLIST
  },
  {
    image: require('../assets/images/mainmenu/7.png'),
    title: 'Game Report',
    routeTo: routes.GAMEREPORT
  },
  {
    image: require('../assets/images/mainmenu/8.png'),
    title: 'Scouting & Video',
    routeTo: routes.SCOUTING
  },
  {
    image: require('../assets/images/mainmenu/9.png'),
    title: 'Training Video',
    routeTo: routes.TRAININGMOV
  },
  {
    image: require('../assets/images/mainmenu/10.png'),
    title: 'Game Analysis Video',
    routeTo: routes.GAMEANALYSIS
  }
];

export const icons = [
  {
    image: require('../assets/images/icons/save.png'),
    title: 'Save'
  },
  // {
  //   image: require('../assets/images/icons/printer.png'),
  //   title: 'Print'
  // },
  {
    image: require('../assets/images/icons/save.png'),
    title: 'Pdf'
  }
];
export const icons3 = [
  {
    image: require('../assets/images/icons/save.png'),
    title: 'Save'
  },
  {
    image: require('../assets/images/icons/remove.png'),
    title: 'Delete'
  },
  {
    image: require('../assets/images/icons/save.png'),
    title: 'Pdf'
  }
];

export const icons2 = [
  // {
  //   image: require('../assets/images/icons/printer.png'),
  //   title: 'Print'
  // },
  {
    image: require('../assets/images/icons/save.png'),
    title: 'Pdf'
  }
];

export const DetailFields = [
  'Technical',
  'Tactical',
  'Physical',
  'Mental',
  'Warming Up',
  'SSG',
  'Team',
  'Field'
];