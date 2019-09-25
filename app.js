const express = require('express')
const path = require('path');
const request = require('request')
const bodyParser = require('body-parser')
const cors = require('cors')

// ROUTING INFO
const paths = ['/redirect/getSnapshot', '/example/ajax-snapshot', '/example/static-snapshot', '/example/static-panel',
                '/redirect/getPanel', '/example/ajax-panel']
// GRAFANA INFO
const key = "eyJrIjoiZkU1ekF3ckRtVHhKN0xNbWRGQnJJa3FuS005cUd2U3YiLCJuIjoidGVzdF9rZXkiLCJpZCI6MX0="
const redirectSnapshotOptions = {
    url:'http://localhost:8088/d/TwYnCJtWz/test-dashboard?orgId=1&from=1537803470946&to=1569339470946',
    headers:{
      'Accept': 'application/json,text/html',
      'Content-Type': 'application/json,text/html',
      'Authorization': `Bearer ${key}`
    }
  }
const redirectPanelOptions = {
    url: 'http://localhost:8088/render/d-solo/TwYnCJtWz/test-dashboard?orgId=1&from=1537870339632&to=1569406339632&panelId=2&width=1000&height=500&tz=America%2FNew_York',
    headers:{
        'Accept': 'application/json,text/html',
        'Content-Type': 'application/json,text/html',
        'Authorization': `Bearer ${key}`
    }
}
// EXPRESS SETUP
const app = express()
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cors())

// ROUTE /redirect/getSnapshot
app.get(paths[0], function(req, res, next){
    log("Incoming Request...", paths[0])
    log("Forwarding To Grafana...", paths[0])

    request(redirectSnapshotOptions, function(req2, res2, error2){
      log("Response From Grafana...", paths[0])
      log("Forwarding To Original Sender...", paths[0])
      res.send(res2)
    })
});

// ROUTE /redirect/getPanel
app.get(paths[4], function(req, res, next){
    log("Incoming Request...", paths[0])
    log("Forwarding To Grafana...", paths[0])

    request(redirectPanelOptions, function(req2, res2, error2){
      log("Response From Grafana...", paths[0])
      log("Forwarding To Original Sender...", paths[0])
      res.send(res2)
    })
});

// ROUTE /example/ajax-snapshot
app.get(paths[1], function(req, res, next){
    log("Serving grafana_ajax_snapshot.html", paths[1])
    res.sendFile(path.join(__dirname, 'grafana_component', 'grafana_ajax_snapshot.html'))
})

// ROUTE /example/static-snapshot
app.get(paths[2], function(req,res,next){
    log("Serving grafana_static_snapshot.html", paths[2])
    res.sendFile(path.join(__dirname, 'grafana_component', 'grafana_static_snapshot.html'))
})

// ROUTE /example/static-dashboard
app.get(paths[3], function(req,res,next){
    log("Serving grafana_static_panel.html", paths[3])
    res.sendFile(path.join(__dirname, 'grafana_component', 'grafana_static_panel.html'))
})

// ROUTE /example/static-dashboard
app.get(paths[5], function(req,res,next){
    log("Serving grafana_ajax_panel.html", paths[5])
    res.sendFile(path.join(__dirname, 'grafana_component', 'grafana_ajax_panel.html'))
})

app.listen(8000, function(){
    log("Listening On Port 8000...", "listen");
})

function log(msg, route){
    const now = new Date().toLocaleTimeString()
    console.log(`app.js: ${now}: Route ${route}: ${msg}`)
}