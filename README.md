# Flipside

Flipside helps people preserve the story behind a photo and print both together.

## Product principles

- Every photo has a back.
- Writing is free.
- The interface should feel like paper, not software.
- Paid features add craft and permanence, not permission to write.

## Repository structure

```text
flipside/
├── apps/
│   ├── mobile/       Expo mobile application
│   └── backend/      Next.js backend (not created yet)
└── packages/
    └── contracts/    Shared API contracts (not created yet)
```

## Requirements

To run the iOS application locally, install:

- Node.js
- npm
- Xcode
- Xcode Command Line Tools
- An iOS Simulator
- CocoaPods

## Install dependencies

From the repository root:

```bash
cd apps/mobile
npm install
```

## Run the mobile app

For the first run, or after changing native dependencies or native configuration:

```bash
cd apps/mobile
npx expo run:ios
```

This builds the native iOS application, installs it in the simulator, and starts the Expo development server.

For normal development after the native application has been installed:

```bash
cd apps/mobile
npm start
```

## Verify changes

Run linting before committing:

```bash
cd apps/mobile
npm run lint
```

Check the repository for whitespace errors:

```bash
git diff --check
```

## Engineering principles

- Prefer small components with one responsibility.
- Use names that describe product concepts.
- Keep screen components focused on composition and navigation.
- Keep business logic outside screen components.
- Validate data at API and database boundaries.
- Never trust authorization decisions made by the client.
- Avoid storing image files directly in the database.
- Add abstractions only after a real use case exists.
- Keep dependencies intentional and limited.
- Make the repository understandable without external conversation history.

## Planned technology

- Expo and React Native for the mobile application
- Expo Router for mobile navigation
- Next.js for the backend API
- Clerk for authentication
- PostgreSQL for application data
- Drizzle ORM for database access and migrations
- TanStack Query for server state
- Zod for runtime validation

Technology choices may change when product requirements provide a concrete reason.

## Current status

The Expo mobile application has been initialized and runs in the iOS Simulator. Product features have not been implemented yet.