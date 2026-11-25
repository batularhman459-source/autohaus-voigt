# Autohaus Voigt – Website (Konzept)

Statische Website: reines HTML, CSS und JavaScript, ohne Build-Schritt.

## Lokal starten

Im Projektordner einen der Befehle ausführen und dann **http://localhost:8000** öffnen.

Mit Node (funktioniert auch in Windows PowerShell):

```bash
npm install
npm run dev
```

Mit Python:

```bash
python3 -m http.server 8000
```

Mit Node:

```bash
npx serve -l 8000
```

(Die `index.html` per Doppelklick zu öffnen geht auch, ein lokaler Server ist aber näher am echten Hosting.)

## Struktur

```
index.html            Startseite (Intro-Animation, Video-Hero, Highlights, Kontakt)
fahrzeuge.html        Fahrzeugbestand mit Filter
assets/css/style.css  Alle Styles (Farben als CSS-Variablen in :root)
assets/js/main.js     Intro, Scroll-Animationen, Menü, Filter
assets/img/           Logo (Vektor-Pferd + Original)
assets/video/         hero.mp4 hier ablegen (Loop, stumm, ca. 10–15 s)
```

## Noch offen

- Hero-Video unter `assets/video/hero.mp4` ablegen
- Platzhalter in eckigen Klammern ersetzen: `[TELEFON]`, `[STRASSE NR.]`, `[ZEITEN]`, `[PREIS]` …
- Echte Fotos statt der grauen Bildflächen
- Fahrzeugbestand an mobile.de anbinden
- Impressum und Datenschutz
