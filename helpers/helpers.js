// import random-name-package to assign usernames to the connected clients
const randomName = require("random-name");
// import chalk package for colorful console logs
const chalk = require("chalk");
// import database connection
const connection = require("../database/connection/connection.js");

function setEventlisteners(websocketServer) {     //
  // when a new client connects
  websocketServer.on("connection", (ws) => {
    console.log("new client connected");
    const clientName = randomName.first();
    
    // when the client sends a message
    ws.on("message", (msg) => {
      console.log(`received message from client ${clientName}: ${ msg }`);
      msg = clientName + ": " + msg;
      // broadcast the client's message to all other clients, that are connected
      websocketServer.clients.forEach((client) => {
        if(client.readyState === 1) {
          console.log(chalk.green.bgGray("found client with ready-state 1. - SENDING MESSAGE"))
          client.send(msg);
        }
      });
    });
  });
  console.log("Websocket server configured...");
}

const emailExists = async (email) => {
  const sql = "SELECT * FROM users WHERE email = ?"
  const result = await connection.query(sql, [email]);
  console.log("RESULT LENGTH:");
  console.log(result);
}

const emailIsValid = (email) => {
  // Regular expression pattern for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

module.exports = {
  sayHi: function() { console.log("HELOOOOOO"); },
  setEventlisteners: setEventlisteners,
  emailIsValid: emailIsValid,
  emailExists: emailExists
}