export default function nitroErrorHandler(error: any, event: any) {
  console.error("[NitroServerError]", error?.message || error);

  const res = event.node ? event.node.res : event.res;
  if (res && !res.headersSent) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FrancPrep — Canada TCF / TEF Platform</title>
  <style>
    body { background-color: #070B17; color: #ffffff; font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; text-align: center; }
    .card { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 24px; padding: 40px; max-width: 440px; width: 100%; box-shadow: 0 25px 60px rgba(0,0,0,0.6); backdrop-filter: blur(12px); }
    .flag { font-size: 52px; margin-bottom: 16px; }
    h1 { font-size: 22px; margin-bottom: 8px; font-weight: 700; background: linear-gradient(135deg, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { font-size: 14px; color: #9ca3af; margin-bottom: 24px; line-height: 1.5; }
    .btn { background: linear-gradient(135deg, #a855f7, #ec4899); border: none; color: white; padding: 14px 32px; border-radius: 14px; font-weight: 600; cursor: pointer; font-size: 15px; box-shadow: 0 10px 25px rgba(168,85,247,0.4); text-decoration: none; display: inline-block; transition: all 0.2s; }
    .btn:hover { opacity: 0.95; transform: translateY(-2px); }
  </style>
</head>
<body>
  <div class="card">
    <div class="flag">🇨🇦</div>
    <h1>FrancPrep Canada</h1>
    <p>Loading Canada's premier TCF / TEF CBT exam simulator platform...</p>
    <a href="/" class="btn" onclick="window.location.reload(); return false;">Open FrancPrep Simulator</a>
  </div>
  <script>
    setTimeout(function() { window.location.href = '/'; }, 1000);
  </script>
</body>
</html>`);
  }
}
