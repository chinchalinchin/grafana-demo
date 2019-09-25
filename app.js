const express = require('express')
const path = require('path');
const request = require('request')
const bodyParser = require('body-parser')
const cors = require('cors')

// GRAFANA INFO
const grafanaHost = 'http://localhost:8088'
const grafanaOptions = {
    apiKey = "eyJrIjoiZkU1ekF3ckRtVHhKN0xNbWRGQnJJa3FuS005cUd2U3YiLCJuIjoidGVzdF9rZXkiLCJpZCI6MX0=",
    getSnapshotUrl:`${grafanaHost}/api/snapshots`,
    postSnapshotUrl:`${grafanaHost}/api/snapshots/`,
    getAllSnapshotsUrl: `${grafanaHost}/api/dashboard/snapshots`,
    headers:{
      'Accept': 'application/json',
      'Authorization': `Bearer ${key}`
    }
  }

// EXPRESS SETUP
const app = express()
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cors())

// ROUTING
app.get('/redirect/getPanel/', function(req, res, next){ });

app.get('/example/static-panel', function(req,res,next){
    log("Serving grafana_static_panel.html", paths[3])
    res.sendFile(path.join(__dirname, 'grafana_component', 'grafana_static_panel.html'))
});

app.get('/example/ajax-panel', function(req,res,next){
    log("Serving grafana_ajax_panel.html", paths[5])
    res.sendFile(path.join(__dirname, 'grafana_component', 'grafana_ajax_panel.html'))
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