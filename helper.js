module.exports = {
    log: log, 
    constructUrl: constructUrl,
    calculateTimeDelta: calculateTimeDelta
}
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

function log(msg, route){
    const now = new Date().toLocaleTimeString()
    console.log(`app.js: ${now}: ${route}: ${msg}`)
};

function constructUrl(orgId, from, to, panelId, width, height){
  let base = grafanaOptions.renderDashboard
  query = `?orgId=${orgId}&from=${from}&to=${to}&panelId=${panelId}&width=${width}&height=${height}`
  return grafanaPanelUrl = base.concat(query)
};

function calculateTimeDelta(){
  const now = new Date();
  let secsPerYear = 31536000;
  return now - secsPerYear
};
