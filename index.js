// import and instantiate express ( webserver package )
const express = require("express");
const app = express();
// import path ( facilitates correct path resolution )
const path = require("path");
// import and instantiate webserver with http-module and inject the express app into the constructor function
const server = require("http").createServer(app);
// import and instantiate the websocket-package and inject the http-module-server into the constructor function
const Websocket = require("ws");
const websocketServer = new Websocket.Server({ server: server });
// import chalk package for colorful console logs
const chalk = require("chalk");
// configure websocketServer with one of the helper functions
const helper = require("./helpers/helpers.js");
// call function that sets the websocket-server's event listeners for events like connection, messages, etc.
helper.setEventlisteners(websocketServer);


// apply the "static" middleware of the express-package to serve the HTML files from different directories
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/login", express.static(path.join(__dirname, "login"), { index: "login.html" }));
// apply middleware to parse json-bodies
app.use(express.json());

///////////////////////////////////////////////
////////////////ROUTES//////////////////////////
//////////////////and////////////////////////////
////////////////////ROUTE HANDLERS////////////////
///////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("hello. express server works....");
});
app.use("/user", require("./routes/user.js"));

// Define ip-address of the server and the port
// IP = "192.168.2.102";
IP = "localhost";
PORT = 8080;
// finally, set up the server to listen on port 8080...
server.listen(PORT, IP, () => {
  console.log("Express Server started...");
  console.log("Websocket Server started...");
  console.log(`Both are listening on ${ IP }:${ PORT }`);
});

