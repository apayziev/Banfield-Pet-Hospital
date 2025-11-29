# Banfield Pet Hospital Website

A professional veterinary clinic website for Banfield Pet Hospital, built with [11ty (Eleventy)](https://www.11ty.dev/).

## Tech Stack

- **Static Site Generator**: 11ty (Eleventy) v2.0
- **Templating**: Nunjucks
- **CSS**: Custom CSS with CSS Variables
- **JavaScript**: Vanilla JS (IIFE pattern)
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Clean build folder
npm run clean
```

### Development

The development server runs at `http://localhost:8080` with hot reload.

## Project Structure

```
├── src/
│   ├── _data/           # Site-wide data (site.json)
│   ├── _includes/       # Templates and partials
│   │   ├── layouts/     # Page layouts
│   │   ├── header.njk   # Header partial
│   │   ├── footer.njk   # Footer partial
│   │   ├── modal.njk    # Modal partial
│   │   └── mega-menu.njk # Mega menu partial
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript
│   ├── images/          # Images
│   ├── font/            # Custom fonts
│   └── *.njk            # Page templates
├── _site/               # Built output (gitignored)
├── .eleventy.js         # 11ty configuration
└── package.json
```

## Features

- **Home**: Overview of services and clinic information
- **About**: Learn about our clinic and team
- **Services**: Detailed veterinary services including diagnostics, surgery, vaccination, and more
- **Blog**: Pet care articles and health tips
- **FAQ**: Common questions answered (accordion)
- **Contact**: Location and contact information

## Services Offered

- Preliminary Inspection
- Surgical Intervention
- Dermatology
- Laboratory Diagnostics
- Ophthalmology
- Ultrasound Diagnostics
- Chipping
- International Passports
- Vaccination
- Stomatology
- Home Visits

## Location

1241 Point Mallard Pkwy Bldg A-6, Decatur, AL 35601

