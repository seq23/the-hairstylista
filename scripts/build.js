const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const include = ['index.html', 'assets', '_headers', '_redirects'];

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
    return;
  }
  fs.copyFileSync(src, dest);
}

for (const item of include) {
  const src = path.join(root, item);
  if (fs.existsSync(src)) copyRecursive(src, path.join(dist, item));
}

console.log(`BUILD_OK dist=${dist}`);
