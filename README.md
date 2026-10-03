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

## Upload songs via XML
Admin → Songs → New Song → **XML file upload**. Use the format in `sample-songs.xml` (one or many `<song>` blocks with title, title_en, category, writer, scale, lyrics, youtube). Every song in the file is added to the site on the next build. Save the entry with a category and it is used for songs that don't specify one.

## Song order
Songs are shown in Telugu alphabetical order, grouped by first letter, with a letter jump bar.

## Bible
Telugu and English (KJV) Bible text lives in `bible/` (one JSON file per book, loaded on demand and cached for offline reading). Source: aruljohn/Bible-telugu and aruljohn/Bible-kjv (MIT licence code; please confirm the Telugu translation's copyright status for your use).

## Install as an app
Open the site on a phone and choose "Add to Home Screen".
