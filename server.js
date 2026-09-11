const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png' };

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const safePath = path.normalize(urlPath === '/' ? '/index.html' : urlPath).replace(/^[/\\]+/, '');
  const file = path.join(root, safePath);
  if (!file.startsWith(root)) return res.writeHead(403).end('Forbidden');
  fs.readFile(file, (error, data) => {
    if (error) return res.writeHead(error.code === 'ENOENT' ? 404 : 500).end('Not found');
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(5173, '127.0.0.1', () => console.log('KTU Jathakam running at http://localhost:5173'));
