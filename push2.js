const { execSync } = require('child_process');
try {
  const out = execSync('git -C /home/team/shared/francprep-repo add -A && git -C /home/team/shared/francprep-repo status --short', { encoding: 'utf8', timeout: 15000 });
  console.log('STATUS:', out);
} catch(e) {
  console.log('ERR:', e.message);
}
try {
  const out = execSync('git -C /home/team/shared/francprep-repo commit -m "feat: interactive grammar drills + self-assessment checkboxes" 2>&1', { encoding: 'utf8', timeout: 15000 });
  console.log('COMMIT:', out);
} catch(e) {
  console.log('COMMIT_ERR:', e.message);
  // Might fail if nothing to commit, that's OK
}
try {
  const out = execSync('git -C /home/team/shared/francprep-repo push origin main 2>&1', { encoding: 'utf8', timeout: 30000 });
  console.log('PUSH:', out);
} catch(e) {
  console.log('PUSH_ERR:', e.stderr || e.message);
}
console.log('=== ALL DONE ===');
