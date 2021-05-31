const axios = require('axios');

const id = "mQ-iiBzM5_eiA7H4mE9x";
const projectID = 18142130;

const instance = axios.create({
  headers:{
      'PRIVATE-TOKEN':id,
      'Content-Type': 'application/json'
  },
})

instance.post(`https://gitlab.com/api/v4/projects/${projectID}/releases/`,
{
  "name": "Release 0.17.3",
  "tag_name": "master",
  "ref":'master',
  "description": "Release",
  "assets": { 
      "links": [
          { "name": "Windows MSI", 
            "url": "https://gitlab.com/teamdata/desktop/-/raw/master/release/teamdata-desktop.0.17.3.msi",
            "filepath": "release/Team Data 0.17.3.msi"
          },
          { "name": "Windows x64", 
            "url": "https://gitlab.com/teamdata/desktop/-/raw/master/release/teamdata-desktop.0.17.3.exe",
            "filepath": "release/Team Data Setup 0.17.3.exe"
          }
          ] 
      }
  })
  .then(res=>{
      console.log(res.data)
  })
  .catch(error=>{
      if(error.response.status)
          if(error.response.status == 400 ||error.response.status == 422)
              console.error(error.response.data)
          else
              console.error(error.response.data)
  })
  .then(()=>{
      console.log('Completed.')
  })