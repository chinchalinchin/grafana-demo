const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./helpers/dashboard-controller')

const app = express()

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cors())

routes(app)

app.use(express.static(path.join(__dirname, 'grafana_component'), { redirect: false }));

app.listen(8000, function(){
    console.log("app.js: listen: Listening On Port 8000...");
})