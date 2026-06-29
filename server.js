import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3000);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon'
};

function resolveFile(requestUrl) {
  const url = new URL(requestUrl || '/', 'http://localhost');
  const requestedPath = decodeURIComponent(url.pathname);
  const rawPath = requestedPath === '/' ? '/index.html' : requestedPath;
  const normalized = path.normalize(rawPath).replace(/^([/\\])+/, '');
  const resolvedPath = path.resolve(__dirname, normalized);

  if (!resolvedPath.startsWith(__dirname + path.sep)) {
    return null;
  }

  return resolvedPath;
}

const server = http.createServer((req, res) => {
  const filePath = resolveFile(req.url || '/');

  if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`QASkillsMap disponible en http://localhost:${PORT}`);
});
