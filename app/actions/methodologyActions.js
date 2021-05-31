  export const getDropdownData = playerInfo => dispatch => {
    playerInfo.findOne({fileName: 'methodology', type: 'dropdown'},(err, docs)=>{
      dispatch({
        type: 'GET_DROPDOWNDATA',
        Dropdowns: docs
      })
    });
  };

  export const getMethodologyInfo = ( playerInfo, object) => dispatch => {  
    playerInfo.findOne({ fileName: 'methodology', mainT: object.MainTitle, subT: object.SubTitle }, (err, docs) => {
      dispatch({
        type: 'SELECT_METHODOLOGY',
        MethodologyInfo: docs
      });
    });
  };
  
  export const getMainTitles = playerInfo => dispatch => {
    const MainTitles = [];
  
    playerInfo.find({ fileName: 'methodology', type: 'mainTitle' }, (err, docs) => {
      docs.map(d => {
        MainTitles.push(d.title);
      });
      MainTitles.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0))
      dispatch({
        type: 'GET_MAINTITLE',
        MainTitles
      });
    });
  };
  
  export const getSubTitles = (playerInfo, mainTitle) => dispatch => {
    const SubTitles = [];
  
    playerInfo.find({ fileName: 'methodology', main_title: mainTitle }, (err, docs) => {
      docs.map(d => {
        SubTitles.push(d.subTitle);
      });
      SubTitles.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0))
      dispatch({
        type: 'GET_SUBTITLE',
        SubTitles
      });
    });
  };
  // export const getDate = playerInfo => {
  
  // }