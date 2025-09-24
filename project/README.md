Tide Together (Static SPA)

Student swap services marketplace built as a single-page app that runs locally in the browser (no backend). Data persists in localStorage.

Features
- CWID/Crimson email sign-in (demo only)
- Browse providers with search and chip filters
- Profiles with portfolio, licenses, certifications, socials
- Booking requests with 2-week limit
- Reviews and ratings
- Direct messaging (demo threads)
- Contact support form
- Admin dashboard with KPIs and provider ban/remove

How to run
- Open `index.html` in this `project` folder in your browser; or
- Serve statically (PowerShell):
  powershell -c "Start-Process http://localhost:8000; python -m http.server 8000"

Customize
- Colors: edit `styles.css` `:root` variables
- Services: edit `SERVICES` in `app.js`
- Seeded providers: update `seed()` in `app.js`

Notes
- This is a demo: authentication and moderation are client-side only.
- Clear data with `localStorage.clear()` in DevTools.


