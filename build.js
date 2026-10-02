// Builds /dist: copies the site, bundles all songs + settings into data.json
const fs = require('fs'), path = require('path');
const out = 'dist';
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
const copy = (a, b) => { if (fs.existsSync(a)) fs.cpSync(a, b, { recursive: true }); };
copy('index.html', path.join(out, 'index.html'));
copy('admin', path.join(out, 'admin'));
copy('uploads', path.join(out, 'uploads'));
copy('_redirects', path.join(out, '_redirects'));
const read = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const settings = fs.existsSync('content/settings.json') ? read('content/settings.json') : {};
const dir = 'content/songs';
const songs = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.json')).map(f => {
  const s = read(path.join(dir, f)); s.id = f.replace(/\.json$/, ''); return s;
}).filter(s => s.published !== false) : [];
songs.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
fs.writeFileSync(path.join(out, 'data.json'), JSON.stringify({ settings, songs }));
console.log(`Built ${songs.length} songs`);
