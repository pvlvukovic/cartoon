# Rick and Morty Character List

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in production mode. Starts express server and serves the app.

### `npm run dev`

Runs the app in development mode. Starts react-dev-server and watches for changes.

### `npm run build-client`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## App Structure

/index.js - minimal express server
/build - build folder
/src - source folder
--/components - components for entire app
--/hooks
--/interfaces - describes the shape of the data
--/navigation - app router
--/pages - individual pages
--/services - services for each model (API calls)
--/utils - utility functions
--/App.js - main app component
--/index.js - entry point for the app
