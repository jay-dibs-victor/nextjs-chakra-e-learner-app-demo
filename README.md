# Awesome Chakra Samples

A Next.js web application showcasing a collection of production-quality UI pages and components built with Chakra UI, Material UI, and Framer Motion. The project serves as a reference implementation for building accessible, animated, and responsive interfaces using a combination of component libraries common in the React ecosystem.

## Purpose

This project demonstrates practical use of Chakra UI alongside Material UI and Framer Motion to build complete pages including homepages, about sections, career listings, workforce dashboards, and e-learning interfaces. It is intended as a design and component reference, not a minimal example collection.

## Technology Stack

- Next.js: React framework for server-side rendering and file-based routing.
- Chakra UI: Primary component library used for layout, typography, forms, modals, and interactive elements. Theming and color mode support are configured globally.
- Material UI: Used for specific data-heavy components such as tables, data grids, and icon sets where Material Design patterns are a better fit.
- Framer Motion: Applied for page transitions, scroll-triggered animations, staggered list reveals, and interactive hover effects throughout the application.
- Chart.js: Used in dashboard-style pages to render data visualizations such as bar charts, line graphs, and pie charts.
- Axios: HTTP client for consuming backend API endpoints and third-party data sources.
- Draft.js: Rich text editor integration used in content-creation flows within the application.

## Project Structure

- pages: Next.js page components, each corresponding to a route in the application.
- core: Shared layout components, navigation, footer, and global providers.
- utils: Utility functions, API helpers, and data formatting logic.
- backend: A lightweight Express server providing API endpoints consumed by the frontend pages.
- public: Static assets including images and fonts.

## Key Features

The application includes pages for a home landing view, an about section with team information and mission content, a careers page with job listings and application links, a workforce management dashboard, and an e-learning course catalogue. Each page demonstrates responsive design patterns and consistent use of the Chakra UI design system.

## Running the Project

Install dependencies and start the development server:

    npm install
    npm run dev

To run with Docker:

    docker-compose up --build

Last updated: 2026-05-01
