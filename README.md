# Dhaivakrupa Ujjeevakeerthanalu – Telugu Christian Songs

## Deploy
1. Push this folder to a GitHub repo (branch `main`).
2. Netlify → Add new site → Import from Git. Build command `node build.js`, publish dir `dist` (already in netlify.toml).
3. Site settings → Identity → Enable Identity. Registration: Invite only. Services → Git Gateway → Enable.
4. Identity → Invite users (your email). Accept the invite email.
5. Open `https://YOUR-SITE.netlify.app/admin/` and log in.
6. In `admin/config.yml` replace `YOUR-SITE` with your real Netlify URL.

## Adding songs
Admin → Songs → New Song. Type/paste lyrics in the Text box, upload a Photo of the song, or both.
Each save commits to Git and Netlify rebuilds in about a minute.

## Site settings
Admin → Site Settings → General Settings: name, tagline, logo, verse, colours, contact links, footer.

## Local testing
`npx decap-server` in one terminal, `node build.js && npx serve dist` in another, then open /admin/.
