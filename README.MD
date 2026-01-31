# ShortUrl — Server 🚀

A minimal and production-ready URL shortener server built with Node.js, Express, and MongoDB. This repository contains the API server, configuration, and utilities for creating and resolving short URLs.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment variables](#environment-variables)
  - [Run scripts](#run-scripts)
- [API Endpoints](#api-endpoints)
- [Project structure](#project-structure)
- [Testing](#testing)
- [Development notes & future features](#development-notes--future-features)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Shorten long URLs to short codes
- Resolve short codes to original URLs
- Production-ready tooling: security headers (Helmet), CORS, request logging (Morgan)
- Centralized error handling and structured `ApiError`/`ApiResponse` helpers
- Graceful shutdown and robust DB connect/disconnect

---

## Tech stack

- Node.js (ES modules)
- Express
- MongoDB (Mongoose)
- Helmet, CORS, Morgan

---

## Getting started

### Prerequisites

- Node.js 18+ (or the project's supported version)
- MongoDB (local or managed URI such as MongoDB Atlas)

### Installation

1. Clone the repository

```bash
git clone <repo-url>
cd ShortUrl/Server
```

2. Install dependencies

```bash
npm install
```

3. Add environment variables

Create a `.env` file (not tracked by git). Copy `.env.example` if present, or create one with the variables listed below.

### Environment variables

Create a `.env` file at the project root with the following values (example):

```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.example/dbname
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
MORGAN_FORMAT=combined
# (optional) add JWT_SECRET, other service keys as needed
```

> Note: Add `.env` and `node_modules/` to `.gitignore`. Do not commit secrets.

### Run scripts

The repository currently includes a minimal `package.json`. Recommended scripts (you can add these to `package.json`):

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "lint": "eslint . --ext .js",
  "test": "jest"
}
```

To start the server locally (after adding a `start` script):

```bash
npm run start
# or for dev
npm run dev
```

Verify the server is running:

```bash
curl http://localhost:5000/health
```

---

## API Endpoints

- `GET /health` — Returns basic health status
- `POST /api/urls` — Create/shorten a URL (to be implemented)
- `GET /:code` — Redirect to original URL (to be implemented)

> The project currently exposes a basic `/api` root placeholder and a health route. Add controllers and routes under `src/controller` and `src/route` for full functionality.

---

## Project structure

```
src/
  index.js           # express app and middleware
  server.js          # starts app, DB connect & graceful shutdown
  config/
    db.js            # mongoose connect/disconnect
  controller/
    url.controller.js
  model/
    url.js
  route/
  utils/
    ApiError.js
    ApiResponse.js
    urlUtils.js

package.json
README.MD
.env.example
```

---

## Testing

- There are no tests yet. Recommended stack: Jest + Supertest for integration tests.

Example test command (add to `package.json`):

```bash
npm run test
```

---

## Development notes & future features

- Add validation for incoming requests (Joi or Zod)
- Add authentication for protected endpoints (JWT)
- Add rate limiting and analytics for shortened URLs
- Add Dockerfile and GitHub Actions CI
- Add more endpoints: URL management, click analytics, custom aliases

Please update this README as the above features are implemented.

---

## Contributing

Contributions are welcome! Please open issues for bugs or feature requests and send pull requests for enhancements.

If you need to remove sensitive data from git history, see `git filter-branch` or BFG and rotate any exposed secrets.

---

## License

This project is provided under the ISC license. Update as appropriate for your project.

---

If you'd like, I can also:
- Add `.env.example` with the required variables ✅
- Add recommended `npm` scripts to `package.json` ✅
- Add a basic `GET /api/urls` and `POST /api/urls` implementation and tests ✅

Tell me which of those you'd like me to do next.
