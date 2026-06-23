const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const report = {
  repo: 'the-hairstylista-site',
  complexity: 'LEVEL 1 — Static landing page / simple marketing content',
  env_vars_required: false,
  auth_required: false,
  database_required: false,
  routes: ['/'],
  validation_profile: 'container structural/static only',
  local_browser_visual_proof: 'NOT_EXECUTED',
  generated_at: new Date().toISOString()
};
fs.writeFileSync(path.join(root, 'release-report.json'), JSON.stringify(report, null, 2));
console.log('REPORT_OK release-report.json');
