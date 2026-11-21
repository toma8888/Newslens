// 뉴스 렌즈 배포용 서버 (Railway 등에서 사용)
// - 외부 패키지 없이 Node 기본 모듈만 쓴다 (설치 단계가 없어 배포가 빠르고 실패할 일이 적다)
// - index.html 한 파일을 내보낸다. API 키는 서버에 두지 않는다 (키는 각 사용자 브라우저에만 저장)
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };
// 내보낼 수 있는 파일만 정해 둔다 (server.js, package.json 같은 파일은 내보내지 않음)
const PUBLIC = new Set(['/index.html', '/manifest.webmanifest', '/icon.svg', '/icon-180.png', '/icon-512.png']);

http.createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p === '/' || p === '') p = '/index.html';
  if (p === '/health') { res.writeHead(200, { 'Content-Type': 'text/plain' }); return res.end('ok'); }
  if (!PUBLIC.has(p)) p = '/index.html'; // 그 밖의 주소는 앱 첫 화면으로
  fs.readFile(path.join(ROOT, p), (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('not found'); }
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(p)] || 'application/octet-stream',
      'Cache-Control': p === '/index.html' ? 'no-cache' : 'public, max-age=86400',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    });
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => console.log('뉴스 렌즈 실행 중: 포트 ' + PORT));
