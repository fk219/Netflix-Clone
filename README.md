# Netflix Clone

This is a Netflix clone built with React, Vite, and Tailwind CSS. It uses the TMDB API to fetch movie and TV show data.

## Description

This project is a front-end application that mimics the look and feel of Netflix. It's a great example of how to build a modern web application with a popular and powerful stack.

## Live Demo

A live demo of the project can be found [here](https://your-live-demo-link.com).

## Screenshots

![App Screenshot](https://via.placeholder.com/1280x720.png?text=Netflix+Clone+Screenshot)

## Features

*   Browse trending, popular, and top-rated movies and TV shows.
*   Search for movies and TV shows.
*   View details about a specific movie or TV show in a modal.
*   Responsive design that works on all devices.
*   Smooth animations with GSAP.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool and development server for modern web projects.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **GSAP (GreenSock Animation Platform):** A professional-grade animation library for JavaScript.
*   **Lucide React:** A library of beautiful and consistent icons.
*   **Axios:** A promise-based HTTP client for the browser and Node.js.
*   **ESLint:** A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine.

*   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/netflix-clone.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Get a free API key at [https://www.themoviedb.org/](https://www.themoviedb.org/)
4.  Enter your API in `src/services/tmdbApi.js`
    ```js
    const API_KEY = 'YOUR_API_KEY';
    ```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run lint`

Lints the project for any errors.

### `npm run preview`

Runs a local server to preview the production build.

## API

This project uses the [TMDB API](https://www.themoviedb.org/documentation/api) to fetch movie and TV show data. You need to get your own API key to use the app.

## Acknowledgements

*   [TMDB](https://www.themoviedb.org/)
*   [React](https://react.dev/)
*   [Vite](https://vitejs.dev/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [GSAP](https://gsap.com/)
*   [Lucide React](https://lucide.dev/)

## To-Do

*   Add user authentication.
*   Add a "My List" feature.
*   Add video playback.
*   Add pagination for search results.
*   Add a detail page for each movie/show.
*   Add a "Settings" page.
