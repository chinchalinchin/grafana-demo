const express = require('express')
const path = require('path');
const request = require('request')
const bodyParser = require('body-parser')
const cors = require('cors')
const helper = require('./helper.js')

// GRAFANA INFO
const grafanaHost = 'http://localhost:8088'
const apiKey =  "eyJrIjoiZkU1ekF3ckRtVHhKN0xNbWRGQnJJa3FuS005cUd2U3YiLCJuIjoidGVzdF9rZXkiLCJpZCI6MX0="
const grafanaOptions = {
    getSnapshotUrl:`${grafanaHost}/api/snapshots`,
    postSnapshotUrl:`${grafanaHost}/api/snapshots/`,
    getAllSnapshotsUrl: `${grafanaHost}/api/dashboard/snapshots`,
    renderDashboard: `${grafanaHost}/render/d-solo/TwYnCJtWz/test-dashboard`,
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
app.get('/grafana/getPanel', function(req, res, next){
  helper.log("Requesting Panel From Grafana...", "/grafana/getPanel/")
  const now = new Date().getTime()
  options = {
    url: helper.constructUrl(1, now, now - helper.calculateTimeDelta(), 2, 500, 500),
    header: grafanaOptions.headers
  }
  request(options, function(grafReq, grafRes, next){
    helper.log("Response Received From Grafana...", "/grafana/getPanel/")
    res.send(grafRes)
  })
})

app.get('/example/static-panel', function(req, res, next){
    helper.log("Serving grafana_static_panel.html", '/example/static-panel/')
    res.sendFile(path.join(__dirname, 'grafana_component', 'grafana_static_panel.html'))
});

app.get('/example/ajax-panel', function(req, res, next){
  helper.log('Serving grafana_ajax_panel.html', '/example/ajax-panel')
  res.sendFile(path.join(__dirname, 'grafana_component', 'grafana_ajax_panel.html'))
})

app.get('/example/redirect-panel',function(req, res, next){
  helper.log("Serving grafana_redirect_panel.html", 'example/redirect-panel')
  res.sendFile(path.join(__dirname, 'grafana_component', 'grafana_redirect_panel.html'))
})

// SERVER 
app.listen(8000, function(){
    helper.log("Listening On Port 8000...", "listen");
});