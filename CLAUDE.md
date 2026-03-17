# Portfolio Site Rules

## Adding Projects
- When adding a new project to projects.json, always generate a lowercase hyphenated slug from the project name
- Always create a redirect folder at /projects/{slug}/index.html that redirects to the project's GitHub repo link
- Update project cards on index.html and projects.html to link to /projects/{slug}/ not the external URL
- Only mark a project as featured: true if I specifically say so

## Adding Write-ups
- When adding a new write-up to site-data.js, always generate a lowercase hyphenated slug from the write-up title
- Always create a redirect folder at /writeups/{slug}/index.html that redirects to the write-up's external URL
- Update write-up cards on writeups.html to link to /writeups/{slug}/ not the external URL
