const uuid = require("uuid");

class User {
  constructor(connection) {
    this.table = "users";
    this.connection = connection;
    this.id = null
    this.email = null;
    this.passwordHash = null;
    this.token = null;
  }
  // initializes a user by accepting an email address, querying the database and populating the instnce variables with the received data
  async initFromDb(email) {
    const mysqlResult = await this.connection.awaitQuery(`SELECT * FROM ${ this.table } WHERE email = ?`, [email]);
    this.email = mysqlResult[0].email;
    this.passwordHash = mysqlResult[0].passwordHash;
    this.token = mysqlResult[0].token;
  }
  // writes the user-data to the database. Creates a unique id
  async create() {
    this.id = uuid.v4();
    const mysqlResult = await this.connection.awaitQuery(`INSERT INTO users (id, email, passwordHash)
                                      VALUES
                                      (?,?,?)`, [this.id, this.email, this.passwordHash]);
    return mysqlResult;
  }
  // logs the data of the user model to the console
  logData() {
    console.log(this.email);
    console.log(this.passwordHash);
    console.log(this.token);
  }
}

module.exports = User;

