import subprocess, sys
cmds = [
  "git -C /home/team/shared/francprep-repo add -A",
  "git -C /home/team/shared/francprep-repo commit -m 'feat: interactive grammar drills + self-assessment checkboxes'",
  "git -C /home/team/shared/francprep-repo push origin main"
]
for cmd in cmds:
    try:
        r = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=30)
        print(f"OK: {r.stdout[-200:] if r.stdout else 'no output'}")
        if r.stderr:
            print(f"ERR: {r.stderr[-200:]}")
    except Exception as e:
        print(f"FAIL: {e}")
print("=== DONE ===")
