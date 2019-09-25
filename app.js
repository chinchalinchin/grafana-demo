const express = require('express')
const path = require('path');
const request = require('request')
const bodyParser = require('body-parser')
const cors = require('cors')

// GRAFANA INFO
const grafanaHost = 'http://localhost:8088'
const apiKey =  "eyJrIjoiZkU1ekF3ckRtVHhKN0xNbWRGQnJJa3FuS005cUd2U3YiLCJuIjoidGVzdF9rZXkiLCJpZCI6MX0="
const grafanaOptions = {
    getSnapshotUrl:`${grafanaHost}/api/snapshots`,
    postSnapshotUrl:`${grafanaHost}/api/snapshots/`,
    getAllSnapshotsUrl: `${grafanaHost}/api/dashboard/snapshots`,
    headers:{
      'Accept': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  }

// EXPRESS SETUP
const app = express()
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cors())

// ROUTING
app.get('/example/panel', function(req,res,next){
    log("Serving grafana_static_panel.html", '/example/static-panel/')
    res.sendFile(path.join(__dirname, 'grafana_component', 'grafana_static_panel.html'))
});


// SERVER 
app.listen(8000, function(){
    log("Listening On Port 8000...", "listen");
});

// LOGGER
function log(msg, route){
    const now = new Date().toLocaleTimeString()
    console.log(`app.js: ${now}: Route ${route}: ${msg}`)
};