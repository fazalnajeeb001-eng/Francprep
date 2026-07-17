const { execSync } = require('child_process');
const commands = [
  'cd /home/team/shared/francprep-repo && git add -A',
  'cd /home/team/shared/francprep-repo && git commit -m "feat: interactive grammar drills + self-assessment checkboxes in LessonPage"',
  'cd /home/team/shared/francprep-repo && git push origin main'
];
for (const cmd of commands) {
  try {
    const out = execSync(cmd, { encoding: 'utf8', timeout: 30000 });
    console.log('✓', cmd.slice(0, 60) + '...');
    console.log(out.slice(0, 500));
  } catch (e) {
    console.log('✗', cmd.slice(0, 60) + '...');
    console.log(e.stderr?.slice(0, 500) || e.message);
  }
}
console.log('=== DONE ===');
