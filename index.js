// Create basic server to serve frontend from build folder

const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the React app
app.use(express.static(__dirname + "/build"));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
