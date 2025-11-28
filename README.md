# Quiz App

Monorepo Quiz application built with Turborepo. This repository contains a Next.js web frontend and an Express-based quiz server, plus shared packages (UI components and common utilities).

## Repository structure

- apps/web — Next.js (React + Tailwind CSS) user-facing application (runs on port 3001 in development).
- apps/quizServer — Express + WebSocket quiz server (TypeScript, built to dist/).
- packages/* — shared packages used across apps (ui, common, eslint-config, tailwind-config, typescript-config).

## Features

- Next.js 16 frontend with React 19 and Tailwind CSS
- Express server with WebSocket support
- Shared UI and common utilities via workspace packages
- TypeScript across the monorepo
- Turborepo workspace scripts for building and running

## Prerequisites

- Node.js >= 18
- npm 10 (or a compatible package manager)
- (Optional) PostgreSQL or other database if your project uses Prisma — check apps/web for any database usage

## Quick start (development)

1. Clone the repository:

   git clone https://github.com/Ramkalyan7/Quiz-app.git
   cd Quiz-app

2. Install dependencies (from repo root):

   npm install

   Note: the repository uses workspaces — installing at root will install dependencies for all packages/apps.

3. Generate Prisma client (if applicable):

   npm run postinstall

4. Run the development servers (recommended from root):

   npm run dev

   This runs Turborepo which will start apps that expose a `dev` script. Alternatively you can start apps individually:

   - Frontend (apps/web):
     cd apps/web
     npm install
     npm run dev
     Open http://localhost:3001

   - Quiz server (apps/quizServer):
     cd apps/quizServer
     npm install
     npm run dev
     The server compiles TypeScript then runs dist/index.js. Check console output for the server port.

## Build & Production

1. Build the monorepo:

   npm run build

2. Start the production user app (example):

   npm run start-user-app

3. Start the quiz server (from apps/quizServer):

   cd apps/quizServer
   npm run build
   npm run start

Adjust hosting, process managers (pm2, systemd), or containerization (Docker) as needed.

## Environment variables

Both the frontend and server use dotenv — create a `.env` file in the appropriate app directory (apps/web, apps/quizServer) or at repo root depending on your setup. Typical variables you may need to provide include:

- PORT (server port)
- DATABASE_URL (if using Prisma/DB)
- NEXTAUTH_URL and NEXTAUTH_SECRET (if using NextAuth)
- SMTP / MAIL settings (if sending mail)

Search the codebase for `process.env` to find the exact variables required by each app.
