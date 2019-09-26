module.exports = {
    log: log, 
    constructUrl: constructUrl,
    calculateTimeDelta: calculateTimeDelta,
    grafanaOptions: getGrafanaOptions,
    grafanaHost: getGrafanaHost,
    grafanaHeaders: getGrafanaHeaders,
    grafanaApiKey: getGrafanaApiKey
}

// GRAFANA INFO
let grafanaHost = 'http://localhost:8088'
let grafanaApiKey =  "eyJrIjoiZkU1ekF3ckRtVHhKN0xNbWRGQnJJa3FuS005cUd2U3YiLCJuIjoidGVzdF9rZXkiLCJpZCI6MX0="
let grafanaOptions = {
    getSnapshotUrl:`${grafanaHost}/api/snapshots`,
    postSnapshotUrl:`${grafanaHost}/api/snapshots/`,
    getAllSnapshotsUrl: `${grafanaHost}/api/dashboard/snapshots`,
    renderDashboard: `${grafanaHost}/render/d-solo/TwYnCJtWz/test-dashboard`,
  }
let grafanaHeaders = {
    Accept: 'application/json',
    Authorization: `Bearer ${grafanaApiKey}`
  }

function getGrafanaOptions(){ return grafanaOptions }

function getGrafanaHost(){ return grafanaHost }

function getGrafanaHeaders(){ return grafanaHeaders }

function getGrafanaApiKey(){ return grafanaApiKey }

// http://localhost:8088/render/d-solo/TwYnCJtWz/test-dashboard
function constructUrl(orgId, from, to, panelId, width, height){
  const renderDashboard = grafanaOptions.renderDashboard
  // const query = `?orgId=${orgId}&from=${from}&to=${to}&panelId=${panelId}&width=${width}&height=${height}`
  const query = `?orgId=${orgId}&panelId=${panelId}&width=${width}&height=${height}`
  return renderDashboard.concat(query)
};

function calculateTimeDelta(){
  const now = new Date();
  let secsPerYear = 31536000;
  return now.getTime() - secsPerYear
};

function log(msg, route){
  const now = new Date().toLocaleTimeString()
  console.log(`app.js: ${now}: ${route}: ${msg}`)
};
