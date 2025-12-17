# Landing Page - Mariana Losada

This project is a landing page built with React, Vite, and Tailwind CSS.

## Project Structure

- src/components: Contains the React components for each section of the landing page.
- src/App.jsx: Main application component.
- src/index.css: Global styles and Tailwind CSS configuration.
- public/images: Contains the images used in the project.

## Getting Started

1.  Install dependencies:
    `ash
    npm install
    ``r

2.  Start the development server:
    `ash
    npm run dev
    ``r

3.  Build for production:
    `ash
    npm run build
    ``r

## Deployment to GitHub Pages

To deploy to GitHub Pages:

1.  Update ite.config.js with the base URL of your repository (if it's not a user site).
    `javascript
    export default defineConfig({
      base: '/repo-name/', // Replace with your repository name
      plugins: [react(), tailwindcss()],
    })
    ``r
2.  Run the build command.
3.  Deploy the dist folder.
