#!/bin/bash
cd /home/team/shared/francprep-repo
git add -A
git commit -m "feat: interactive grammar drills + self-assessment checkboxes in LessonPage"
git push origin main 2>&1
echo "===DONE==="
