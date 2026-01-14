# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Project Overview

This is a static GitHub Pages blog/portfolio website built with vanilla HTML, CSS, and JavaScript. The project includes:

- Main portfolio site (`index.html`, `main.css`, `main.js`)
- Interactive projects and bookmarklets in subdirectories
- No build system or package manager - pure static files

## Development Commands

Since this is a static site with no build system:

### Local Development

```bash
# Serve the site locally (any static server)
python -m http.server 8000
# or
npx serve .
# or
livereload
```

### Testing

No automated tests are configured. Manual testing required:

- Open `index.html` in browser
- Test interactive features (title change on blur/focus)
- Test bookmarklets by dragging to bookmarks bar

### Deployment

```bash
# Deploy to GitHub Pages (if using gh-pages branch)
git subtree push --prefix . origin gh-pages

# Or push to main branch if GitHub Pages is configured for main
git push origin main
```

## Code Style Guidelines

### HTML

- Use HTML5 doctype: `<!doctype html>`
- Include proper meta tags: charset, viewport
- Use semantic HTML5 elements appropriately
- Self-closing tags for void elements: `<br />`, `<img />`
- Indent with 2 spaces
- Attributes in order: id, class, src, href, alt, etc.

### CSS

- Use nested CSS syntax where appropriate (as seen in main.css)
- Font family: "JetBrains Mono", monospace for consistent branding
- Color scheme: Black background with white text
- Flexbox for layouts
- Mobile-first responsive design
- Use relative units (rem, em, %) over fixed pixels where appropriate
- CSS properties in alphabetical order within selectors

### JavaScript

- Use modern ES6+ syntax (const/let, arrow functions, template literals)
- Wrap bookmarklet code in IIFE: `(function () { ... })()`
- Use proper error handling with try/catch
- Event listeners for DOM interactions
- Use semantic variable names
- No jQuery unless required for external API compatibility
- Use `defer` attribute for script tags when possible

### File Organization

```
/
├── index.html          # Main portfolio page
├── main.css           # Main styles
├── main.js            # Main interactions
├── static/            # Static assets
│   └── assets/
│       └── stickman.png
├── featureUnclickableProject/  # Bookmarklet project
│   ├── index.html
│   ├── style.css
│   └── code.js
├── rot13/             # Other projects
│   └── index.html
└── deface/            # Other projects
    └── index.html
```

## Naming Conventions

### Files

- Use lowercase with hyphens for multi-word files: `main.css`, `code.js`
- Directory names: camelCase for projects (`featureUnclickableProject`)
- Asset files: descriptive lowercase with hyphens

### CSS Classes

- kebab-case: `.text-menu`, `.popup-content`
- BEM-like naming for components: `.popup-header`, `.close-btn`

### JavaScript

- camelCase for variables and functions: `originalTitle`, `getAllProjects`
- UPPER_SNAKE_CASE for constants: `API_ENDPOINT`
- Use descriptive names that indicate purpose

## Interactive Features

### Main Site

- Title changes on window blur/focus events
- Simple navigation menu with placeholder links

### Bookmarklets

- Must be drag-and-drop bookmarklet friendly
- Include domain/host validation for security
- Provide user feedback via alerts or UI
- Handle errors gracefully
- Use jQuery only when necessary for external API compatibility

## Security Considerations

- Validate URLs and hostnames for bookmarklets
- Use proper CSRF headers for API calls
- Sanitize user inputs
- Avoid eval() and other unsafe JavaScript practices
- Use HTTPS for external resources

## Browser Compatibility

- Target modern browsers (ES6+ support)
- Use appropriate polyfills if needed
- Test bookmarklets in target environments (e.g., Scratch.mit.edu)

## Git Workflow

- Main branch: `main`
- Commit messages: concise, descriptive
- Ignore `.ideas/` directory (contains development notes)
- Use GitHub Pages for deployment

## Testing Checklist

Before committing changes:

1. [ ] Open index.html in browser
2. [ ] Test title change on blur/focus
3. [ ] Test all interactive elements
4. [ ] Check responsive design
5. [ ] Test bookmarklets if modified
6. [ ] Validate HTML/CSS if possible
7. [ ] Check console for errors

## External Dependencies

- Google Fonts (JetBrains Mono)
- jQuery (only for bookmarklets requiring external API compatibility)
- No package.json or npm dependencies
