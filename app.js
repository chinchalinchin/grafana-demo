const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')
const helper = require('./helper.js')
const proxy = require('express-http-proxy');


// EXPRESS SETUP
const app = express()
app.use(bodyParser.json())
// ENABLE CORS
app.use(cors())

app.use("/grafana/api/tsdb/query/", function(req, res, next){
  console.log(req.body)
  return next()
})
  // GRAFANA AUTHENTICATED PROXY
app.use('/grafana/', proxy("localhost:8080/", {
  proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
    helper.log("Setting Proxy Headers...", "/grafana/")
    proxyReqOpts.headers['Authorization'] = `Bearer ${helper.grafanaApiKey()}`;
    proxyReqOpts.headers['Connection'] = 'keep-alive';
    console.log(proxyReqOpts.body)
    console.log(srcReq.body)
    return proxyReqOpts;
  },
  proxyReqPathResolver: function (req) {
      helper.log(`Proxy Path: ${req.url}`, '/grafana/')
      return req.url;
  },
  userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
    if(userReq.url.includes('query')){
      helper.log("Query Request Headers:", "/grafana/");
      helper.log(userReq.headers.host, "/grafana/");
      helper.log(userReq.headers["content-type"], "/grafana/");
      helper.log(userReq.headers.connection, "/grafana/")
      helper.log("Query Response:", "/grafana/");
      helper.log(proxyResData, "/grafana/");
    }
    return proxyResData;
  }
}))

app.get('/example/', function(req, res, next){
  helper.log("Serving grafana_auth_panel.html...", "/example/")
  res.sendFile(path.join(__dirname, 'grafana_component', 'grafana_panel.html'))
})

// SERVER 
  // LISTEN
app.listen(8000, function(){
    helper.log("Listening On Port 8000...", "listen");
});

