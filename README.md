# Job Application Tracker UI

A modern web application built with Angular 19 for tracking job applications. This application provides a user-friendly interface to manage and monitor your job search process.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v19.1.4)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd job-application-ui
```

2. Install dependencies:
```bash
npm install
```

## Development

To start a local development server, run:

```bash
npm start
```

The application will be available at `http://localhost:4200/`. The development server supports hot-reloading, so any changes you make to the source files will automatically refresh the browser.

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the application for production
- `npm run watch` - Build the application in watch mode for development
- `npm test` - Run unit tests
- `npm run serve:ssr` - Run the application with server-side rendering

## Project Structure

```
job-application-ui/
├── src/                    # Source files
│   ├── app/               # Application components and modules
│   ├── assets/            # Static assets
│   └── environments/      # Environment configurations
├── dist/                  # Build output
└── package.json          # Project dependencies and scripts
```

## Technologies Used

- Angular 19
- Angular Material
- TypeScript
- RxJS
- Express (for SSR)
- Karma & Jasmine (for testing)

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory. The production build includes:
- Ahead-of-Time (AOT) compilation
- Tree-shaking
- Minification
- Bundling
- Asset optimization

## Testing

The project uses Karma and Jasmine for unit testing. To run the tests:

```bash
npm test
```

## Server-Side Rendering

This application supports server-side rendering (SSR) for improved performance and SEO. To run the SSR version:

```bash
npm run serve:ssr
```

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular Material Documentation](https://material.angular.io/)
- [Angular CLI Overview](https://angular.dev/tools/cli)
