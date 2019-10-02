module.exports = {
    log: log, 
    constructAnonUrl: constructAnonUrl,
    constructAuthUrl: constructAuthUrl,
    calculateTimeDelta: calculateTimeDelta,
    grafanaOptions: getGrafanaOptions,
    grafanaAuthHost: getGrafanaAuthHost,
    grafanaAnonHost: getGrafanaAnonHost,
    grafanaHeaders: getGrafanaHeaders,
    grafanaApiKey: getGrafanaApiKey,
    queryString: getQueryString
}

// GRAFANA INFO
let grafanaAnonHost = 'http://localhost:8088'
let grafanaAuthHost = 'http://localhost:8080'
let grafanaApiKey =  "eyJrIjoiOVNsWGwxWG1ZSktFN1FtcVJaeFVTczZ5YjBNdFBKNDMiLCJuIjoiZGZhcyIsImlkIjoxfQ=="
let grafanaOptions = {
    getAnonSnapshotUrl:`${grafanaAnonHost}/api/snapshots`,
    postAnonSnapshotUrl:`${grafanaAnonHost}/api/snapshots/`,
    getAllAnonSnapshotsUrl: `${grafanaAnonHost}/api/dashboard/snapshots`,
    renderAnonDashboard: `${grafanaAnonHost}/render/d-solo/TwYnCJtWz/test-dashboard`,
    renderAuthDashboard: `${grafanaAuthHost}/render/d-solo/TwYnCJtWz/test-dashboard`
  }
let grafanaHeaders = {
    Accept: 'application/json',
    Authorization: `Bearer ${grafanaApiKey}`
  }

function getGrafanaOptions(){ return grafanaOptions }

function getGrafanaAuthHost(){ return grafanaAuthHost }

function getGrafanaAnonHost() { return grafanAnonHost }

function getGrafanaHeaders(){ return grafanaHeaders }

function getGrafanaApiKey(){ return grafanaApiKey }

// http://localhost:8088/render/d-solo/TwYnCJtWz/test-dashboard
function constructAnonUrl(orgId, from, to, panelId, width, height){
  const renderDashboard = grafanaOptions.renderAnonDashboard
  // const query = `?orgId=${orgId}&from=${from}&to=${to}&panelId=${panelId}&width=${width}&height=${height}`
  const query = `?orgId=${orgId}&panelId=${panelId}&width=${width}&height=${height}`
  return renderDashboard.concat(query)
};

// http://localhost:8080/render/d-solo/TwYnCJtWz/test-dashboard
function constructAuthUrl(orgId, from, to, panelId, width, height){
  const renderDashboard = grafanaOptions.renderAuthDashboard
  // const query = `?orgId=${orgId}&from=${from}&to=${to}&panelId=${panelId}&width=${width}&height=${height}`
  const query = `?orgId=${orgId}&panelId=${panelId}&width=${width}&height=${height}`
  return renderDashboard.concat(query)
};

function getQueryString(orgId, panelId, width, height){
  return `?orgId=${orgId}&panelId=${panelId}&width=${width}&height=${height}`
}

function calculateTimeDelta(){
  const now = new Date();
  let secsPerYear = 31536000;
  return now.getTime() - secsPerYear
};

function log(msg, route){
  const now = new Date().toLocaleTimeString()
  console.log(`app.js: ${now}: ${route}: ${msg}`)
};
