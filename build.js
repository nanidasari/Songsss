// Builds /dist: copies the site, bundles songs (+ XML uploads) and settings into data.json
const fs = require('fs'), path = require('path');
const out = 'dist';
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
['index.html','admin','uploads','bible','manifest.webmanifest','sw.js','icon.svg']
  .forEach(f => fs.existsSync(f) && fs.cpSync(f, path.join(out, f), { recursive: true }));
const read = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const settings = fs.existsSync('content/settings.json') ? read('content/settings.json') : {};

const dec = s => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&amp;/g,'&').trim();
const tag = (b, t) => { const m = b.match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`, 'i')); return m ? dec(m[1]) : ''; };
function parseXml(txt) {
  const blocks = txt.match(/<song[\s>][\s\S]*?<\/song>/gi) || [];
  return blocks.map(b => ({
    title: tag(b,'title'), title_en: tag(b,'title_en'), category: tag(b,'category'),
    writer: tag(b,'writer'), scale: tag(b,'scale'), lyrics: tag(b,'lyrics'), youtube: tag(b,'youtube')
  })).filter(s => s.title || s.lyrics);
}

const dir = 'content/songs', songs = [];
(fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.json')) : []).forEach(f => {
  const s = read(path.join(dir, f)); s.id = f.replace(/\.json$/, '');
  if (s.published === false) return;
  let xml = [];
  if (s.xml_file) {
    const p = s.xml_file.replace(/^\//, '');
    try { xml = parseXml(fs.readFileSync(p, 'utf8')); } catch (e) { console.warn('XML not readable:', p); }
  }
  if (!xml.length) { if (s.title) songs.push(s); return; }
  xml.forEach((x, i) => {
    const o = { ...s, id: `${s.id}-${i + 1}` };
    Object.keys(x).forEach(k => { if (x[k]) o[k] = x[k]; });
    if (!x.title && xml.length === 1 && s.title) o.title = s.title;
    if (!o.title) return;
    delete o.xml_file; o.featured = !!s.featured && xml.length === 1;
    songs.push(o);
  });
});
songs.sort((a, b) => a.title.localeCompare(b.title, 'te'));
fs.writeFileSync(path.join(out, 'data.json'), JSON.stringify({ settings, songs }));
console.log(`Built ${songs.length} songs`);
