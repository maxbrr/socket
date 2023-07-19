// create an instance of express.Router()
const router = require("express").Router();
// get an instance of the database connection
const connection = require("../database/connection/connection.js");
// get the User-model, that offers methods to interact with the database
const User = require("../database/Models/User.js");
// get function to validate email address from the helpers-package
const { emailIsValid, emailExists } = require("../helpers/helpers.js");
// import bcrypt-package to create password-hashes
const bcrypt = require("bcrypt");

// Create new user
router.post("/signup", async (req, res) => {
  // receive post data
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirmation = req.body.passwordConfirmation;
  // check if email s valid
  const emailValid = emailIsValid(email);
  // check if email already exists in database
  if( emailExists(email) ) {
    res.status(400).json({
      success: false,
      message: "Email-address is already registered",
      emailExists: true,
      passwordsMatch: true,
      emailIsValid: emailValid
    });
  } else {
    // check if passwords match
    const passwordsMatch = password == passwordConfirmation ? true : false;
    // continue if email and passwordMatch are true
    if(emailValid && passwordsMatch) {
      // hash password
      passwordHash = await bcrypt.hash(password, 10);
      // write email and passwordHash to database
      const user = new User(connection);
      user.email = email;
      user.passwordHash = passwordHash;
      const mysqlResult = await user.create();
      // ?????? WHAT IF INSERT FAILS / ERROR HANDLING ??????????????
      console.log(mysqlResult.affectedRows);
      // send response
      res.status(200).json({
        success: true,
        message: "SignUp successful",
        email: email
      });
    } else {
      res.status(412).json({
        success: false,
        message: "SignUp failed",
        passwordsMatch: passwordsMatch,
        emailIsValid: emailValid
      });
    }
  }
});
// authenticate user
router.post("/login", (req, res) => {
  
})

module.exports = router;