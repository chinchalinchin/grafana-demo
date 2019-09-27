const express = require('express')
const path = require('path');
const request = require('request')
const bodyParser = require('body-parser')
const cors = require('cors')
const helper = require('./helper.js')


// EXPRESS SETUP
const app = express()
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
// ENABLE CORS
app.use(cors())

// ROUTING
  // SCRIPTS
app.get('/scripts/helper/', function(req, res, next){
  helper.log("Serving Helper Script...", "/scripts/helper/")
  res.setHeader('Content-Type', 'text/javascript;charset=utf-8,')
  res.sendFile(path.join(__dirname, 'helper.js'))
})

  // GRAFANA ANONYNMOUS REDIRECT
app.get('/redirect/grafana/getAnonPanel', function(req, res, next){
  helper.log("Redirecting to Grafana", "/redirect/grafana/getAnonPanel")
  const now = new Date().getTime()
  url =  helper.constructAnonUrl(1, now, now - helper.calculateTimeDelta(), 2, 500, 500)
  res.redirect(url)
})

  // GRAFANA AUTHENTICATED REDIRECT
app.get('/redirect/grafana/getAuthPanel', function(req, res, next){
  helper.log("Redirecting to Grafana", "/redirect/grafana/getAnonPanel")
  res.setHeader("Authorization", `Bearer ${helper.grafanaApiKey()}`)
  const now = new Date().getTime()
  url =  helper.constructAuthUrl(1, now, now - helper.calculateTimeDelta(), 2, 500, 500)
  res.redirect(url)
})



  // GRAFANA AUTHENTICATED REQUEST
app.get('/grafana/getAuthPanel', function(req, res, next){
  helper.log("Requesting Authenticated Panel From Grafana...", "/grafana/getAuthPanel/")
  const now = new Date().getTime()
  urlAndHeaders = {
    url: helper.constructAuthUrl(1, now, now - helper.calculateTimeDelta(), 2, 500, 500),
    header: helper.grafanaHeaders()
  }
  helper.log(`Grafana Auth Url: ${urlAndHeaders.url}`, "/grafana/getAuthPanel/")
  request(urlAndHeaders, function(grafReq, grafRes){
    helper.log("Response Received From Grafana...", "/grafana/getAuthPanel/")
    console.log(grafRes.headers)
    res.send(grafRes)
  })
})

  // GRAFANA ANONYMOUS REQUEST
app.get('/grafana/getAnonPanel', function(req, res, next){
  helper.log("Requesting Anonynmous Panel From Grafana...", "/grafana/getAnonPanel/")
  const now = new Date().getTime()
  urlAndHeaders = {
    url: helper.constructAnonUrl(1, now, now - helper.calculateTimeDelta(), 2, 500, 500),
    headers:{
       Accept: 'img/png'
    }
  }
  helper.log(`Grafana Anon Url: ${urlAndHeaders.url}`, "/grafana/getAnonPanel")
  request(urlAndHeaders, function(grafReq, grafRes){
    helper.log("Response Received From Grafana...", "/grafana/getAnonPanel/")
    res.send(grafRes)
  })
})

  // HTML PAGES
app.get('/example/anon-panels', function(req, res, next){
    helper.log("Serving grafana_anon_panel.html", '/example/anon-panels/')
    res.sendFile(path.join(__dirname, 'grafana_component', 'grafana_anon_panel.html'))
});

app.get('/example/auth-panels', function(req, res, next){
  helper.log("Serving grafana_auth_panel.html", "/example/auth-panels/")
  res.sendFile(path.join(__dirname, 'grafana_component', 'grafana_auth_panel.html'))
})

// SERVER 
  // LISTEN
app.listen(8000, function(){
    helper.log("Listening On Port 8000...", "listen");
});