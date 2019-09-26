const express = require('express')
const path = require('path');
const request = require('request')
const bodyParser = require('body-parser')
const cors = require('cors')
const helper = require('./helper.js')


// EXPRESS SETUP
const app = express()
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cors())

// ROUTING
  // SCRIPTS
app.get('/scripts/helper/', function(req, res, next){
  helper.log("Serving Helper Script...", "/scripts/helper/")
  res.setHeader('Content-Type', 'text/javascript;charset=utf-8,')
  res.sendFile(path.join(__dirname, 'helper.js'))
})

  // GRAFANA AUTHENTICATED REDIRECT
app.get('/grafana/getPanel', function(req, res, next){
  helper.log("Requesting Authenticated Panel From Grafana...", "/grafana/getPanel/")
  const now = new Date().getTime()
  options = {
    url: helper.constructUrl(1, now, now - helper.calculateTimeDelta(), 2, 500, 500),
    header: helper.grafanaHeaders()
  }

  request(options, function(grafReq, grafRes, grafNext){
    helper.log("Response Received From Grafana...", "/grafana/getPanel/")
    res.send(grafRes)
  })
})

  // GRAFANA ANONYMOUS REDIRECT
app.get('/grafana/getAnonPanel', function(req, res, next){
  helper.log("Requesting Anonynmous Panel From Grafana...", "/grafana/getAnonPanel/")
  const now = new Date().getTime()
  options = {
    url: helper.constructUrl(1, now, now - helper.calculateTimeDelta(), 2, 500, 500),
    headers:{
      //Accept: 'img/png'
    }
  }
  request(options, function(grafReq, grafRes, grafNext){
    helper.log("Response Received From Grafana...", "/grafana/getAnonPanel/")
    res.send(grafRes)
  })
})

  // HTML PAGES
app.get('/example/panel', function(req, res, next){
    helper.log("Serving grafana_static_panel.html", '/example/static-panel/')
    res.sendFile(path.join(__dirname, 'grafana_component', 'grafana_panel.html'))
});

// SERVER 
  // LISTEN
app.listen(8000, function(){
    helper.log("Listening On Port 8000...", "listen");
});