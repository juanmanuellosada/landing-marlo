# Landing Page - Mariana Losada

This project is a landing page built with React, Vite, and Tailwind CSS.

## Project Structure

- `src/components`: Contains the React components for each section of the landing page.
- `src/App.jsx`: Main application component.
- `src/index.css`: Global styles and Tailwind CSS configuration.
- `public/images`: Contains the images used in the project.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Deployment to Vercel

This project is deployed on Vercel. Any push to the main branch will automatically trigger a new deployment.

### Editor de Contenidos

- Access the content editor at: `/editor`
- Requires authentication (configured via environment variables)
- Content changes are committed directly to GitHub
- Session expires after 30 minutes of inactivity or 2 hours maximum

For detailed deployment instructions, see `DEPLOY-VERCEL.md` and `QUICKSTART-VERCEL.md`.
