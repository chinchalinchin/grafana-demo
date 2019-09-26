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

  // GRAFANA REDIRECT
app.get('/grafana/getPanel', function(req, res, next){
  helper.log("Requesting Panel From Grafana...", "/grafana/getPanel/")
  const now = new Date().getTime()
  options = {
    url: helper.constructUrl(1, now, now - helper.calculateTimeDelta(), 2, 500, 500),
    header: helper.grafanaHeaders()
  }
  request(options, function(grafReq, grafRes, next){
    helper.log("Response Received From Grafana...", "/grafana/getPanel/")
    //console.log(grafRes.body)
    res.send(grafRes)
  })
})

  // HTML PAGES
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
  // LISTEN
app.listen(8000, function(){
    helper.log("Listening On Port 8000...", "listen");
});