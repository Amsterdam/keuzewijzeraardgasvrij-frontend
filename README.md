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

# Directory tree structure

```typescript
tree -I "node_modules|.next|.git" -L 10 > directory-tree.txt
```

## License

See LICENSE file for details.

## URL Parameters

The application supports URL parameters to simplify navigation and testing.

### bagId

You can pass a `bagId` in the URL to pre-load the application on page 2 with an existing object:

```bash
/?bagId=0363200000029291
```

This allows the application to immediately fetch and display data related to the provided BAG identifier.

### dummy

For testing and demonstration purposes, you can enable automatic form population with dummy data by adding the `dummy` parameter:

```bash
/?dummy=true
```

When this parameter is present, all form fields are pre-filled with predefined test data.

### Combined usage

Both parameters can be used together:

```bash
/?bagId=0363200000029291&dummy=true
```

In this case:

- The application starts on page 2 using the provided `bagId`
- The form is automatically filled with dummy data for testing purposes
