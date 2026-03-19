# ACAT Member Tracking

ACAT Member Tracking is a multi-platform application for viewing and managing member data stored in a single Google Sheet.

The system is designed to support:

- **Web browser**
- **Desktop** via Electron for Windows, macOS, and Linux
- **Android** via Kotlin

The Google Sheet is the single source of truth. Users can browse member data in read-only mode, while authorised users can sign in with their Google account and edit data through the application.

## Purpose

This repository contains the full source for the ACAT Member Tracking platform, including:

- a shared **backend service** that handles authentication, permissions, validation, and Google Sheets access
- a **web application** for browser access
- a **desktop application** built with Electron
- an **Android application** built with Kotlin and Jetpack Compose
- shared packages for API contracts, validation, formatting, and supporting utilities

## Core design principles

- **One source of truth**  
  All member data is stored in one Google Sheet tab: `Member Tracking`.

- **Backend-managed access**  
  Clients do not write directly to Google Sheets. All write operations go through the backend service.

- **Read-only by default**  
  Unauthenticated users can view member data, but with restricted field visibility.

- **Role-based editing**  
  Signed-in users may edit data only if their Google account is mapped to an authorised recruiter/editor identity.

- **Shared logic where practical**  
  Web and desktop aim to share as much code as possible. Android is implemented natively, while still following the same backend API and business rules.

## Repository layout

```text
acat-member-tracking/
├─ apps/
│  ├─ backend/              # Shared backend service (auth, permissions, Sheets access, validation)
│  ├─ web/                  # Browser application
│  ├─ desktop/              # Electron wrapper for desktop platforms
│  └─ android/              # Native Android app (Kotlin + Jetpack Compose)
│
├─ packages/
│  ├─ shared-types/         # Shared domain models and API DTOs
│  ├─ shared-validation/    # Validation rules and schema helpers
│  ├─ shared-api-client/    # Reusable API client utilities for TS-based apps
│  └─ shared-formatting/    # Formatting helpers (dates, booleans, display helpers)
│
├─ docs/
│  ├─ architecture/         # Architecture decisions and design notes
│  ├─ api/                  # API documentation
│  └─ product/              # Product rules, workflow phases, field behaviour
│
├─ infra/
│  ├─ docker/               # Container-related setup
│  └─ cloud/                # Deployment/infrastructure configuration
│
├─ .git/
│  └─ workflows/            # CI/CD workflows
│
├─ .gitignore               # Local files to ignore pushing to repo
├─ LICENSE.md               # License of application
├─ package.json             # Packages required for app
├─ pnpm-workspace.yaml      # Workspace configuration for JS/TS packages
├─ README.md
└─ tsconfig.base.json       # Base configuration for tests
````