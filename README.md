# Keuzewijzer Aardgasvrij Frontend

This project is the frontend for the Keuzewijzer Aardgasvrij application, built with React and Vite.

## Features

- Modern React (TypeScript) application
- Uses Amsterdam Design System components
- Fast development with Vite
- Docker support for easy deployment

## Project Structure

- `src/` — Main source code
  - `components/` — Reusable UI components
  - `pages/` — Page components (e.g., HomePage)
- `public/` — Static assets (icons, manifest)
- `Dockerfile`, `docker-compose.yml` — Containerization
- `nginx.conf` — Nginx configuration for production

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

This will start the Vite development server on port 3003.

### Build

```bash
npm run build
```

### Lint & Format

```bash
npm run lint
npm run format
```

### Pre-commit hook

A pre-commit hook is installed.

## Amsterdam Design System

This project uses the Amsterdam Design System for consistent UI components and styling.

## License

See LICENSE file for details.
