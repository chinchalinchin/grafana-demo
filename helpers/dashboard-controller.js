const request = require('request')
const key = "eyJrIjoiZkU1ekF3ckRtVHhKN0xNbWRGQnJJa3FuS005cUd2U3YiLCJuIjoidGVzdF9rZXkiLCJpZCI6MX0="

module.exports = function(app) {

  var options = {
    // WORKS, after a fashion
    url:'http://localhost:8088/d/TwYnCJtWz/test-dashboard?orgId=1&from=1537803470946&to=1569339470946',
    headers:{
      'Accept': 'application/json,text/html',
      'Content-Type': 'application/json,text/html',
      'Authorization': `Bearer ${key}`
    }
  }

  app.get('/getSnapshot/', function(req, res, next){
    console.log("dashboard-controller.js: getSnapshot: Incoming Request...")
    console.log("dashboard-controller.js: getSnapshot: Forwarding To Grafana...")
    request(options, function(req2, res2, error2){
      console.log("dashboard-controller.js: getSnapsnot: Response From Grafana...")
      console.log("dashboard-controller.js: getSnapshot: Forwarding To Original Sender...")
      res.send(res2)
    })
  });

}