# Vaultify - A Self-Hosted Bookmark Manager

Vaultify is a self-hosted, Raindrop.io-inspired bookmark manager designed for privacy and control. It allows you to store, categorize, and manage various types of bookmarks—standard links, people profiles, and torrents—all on your own server. The application is a complete suite, including a Node.js backend, a React frontend, and a Chrome extension for seamless integration with your browser.

## Features

- **Multiple Bookmark Types:** Save standard URLs, people profiles with social links, and torrent files or magnet links.
- **Local-First Storage:** All data is stored locally in a single SQLite database file.
- **Optional Raindrop.io Sync:** Optionally sync your standard bookmarks with your Raindrop.io account.
- **Local AI Tagging:** Get automatic tag suggestions for your bookmarks, powered by a local AI model that runs entirely offline—no data ever leaves your server for tagging.
- **Full-Featured Frontend:** A responsive React UI with a dashboard, collections, and dedicated sections for people and torrents.
- **Chrome Extension:** A browser extension for quickly adding bookmarks and searching your collection.
- **Offline-First Caching:** The frontend and extension are designed to work offline, caching data locally and syncing when a connection is available.
- **Easy to Deploy:** Built with Node.js, React, and SQLite for simple self-hosting.

## Architecture

- **Backend:** Node.js, Express, SQLite
- **Frontend:** React, Vite, Tailwind CSS
- **Extension:** React, Vite, using Chrome Extension Manifest V3
- **AI:** `@xenova/transformers` for local, server-side inference.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Set up configuration:**
    This project uses `.env` files for configuration. There is an `.env.example` file in each of the `backend`, `frontend`, and `extension` directories. You must copy these to `.env` files and fill them out.

    -   **Backend (`/backend/.env.example`):**
        ```bash
        cp backend/.env.example backend/.env
        ```
        - `PORT`: The port for the backend server (e.g., 3001).
        - `FRONTEND_URL`: The URL of the frontend (e.g., http://localhost:3000).
        - `DB_PATH`: The path to the SQLite database file (e.g., `./vaultify.db`).
        - `API_SECRET_KEY`: A secret key to protect your API. **You must change this to a long, random string.**
        - `RAINDROP_API_KEY` (Optional): Your API key from Raindrop.io.

    -   **Frontend (`/frontend/.env.example`):**
        ```bash
        cp frontend/.env.example frontend/.env
        ```
        - `VITE_API_URL`: The full URL to your backend's API (e.g., `http://localhost:3001/api`).
        - `VITE_API_SECRET_KEY`: The same secret key you set in the backend's `.env` file.

    -   **Extension (`/extension/.env.example`):**
        ```bash
        cp extension/.env.example extension/.env
        ```
        - `VITE_API_URL`: The full URL to your backend's API.
        - `VITE_API_SECRET_KEY`: The same secret key.
        - `VITE_FRONTEND_URL`: The URL to your frontend dashboard.

### Running the Application

The project includes helper scripts to run the entire stack.

**Make the scripts executable (you only need to do this once):**
```bash
chmod +x scripts/dev.sh
chmod +x scripts/build.sh
```

**To run in development mode:**
This will start the backend, frontend, and extension build process in watch mode.
```bash
./scripts/dev.sh
```
- Backend will be running on the port specified in its `.env` (e.g., `http://localhost:3001`).
- Frontend will be running on `http://localhost:3000`.

**To build for production:**
This will create production-ready builds for the frontend and extension in their respective `dist` directories.
```bash
./scripts/build.sh
```

### Loading the Chrome Extension

1.  Run the build script first: `./scripts/build.sh`. This will create the extension files in `/extension/dist`.
2.  Open your Chrome/Chromium browser and navigate to `chrome://extensions`.
3.  Enable **"Developer mode"** in the top right corner.
4.  Click **"Load unpacked"**.
5.  Select the `extension/dist` directory from the project folder.
6.  The Vaultify extension should now appear in your browser's toolbar.