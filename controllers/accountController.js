/*================================================================================ */
/*=============================== Package imports ================================ */
/*================================================================================ */

// INFO_STUDY: Importing the created account model to get access to the methods to perform CRUD operations
const Account = require('../models/accountModel');

const Factory = require("./controllerFactory")


// INFO_STEP:
// 1. GET Methods
// 1.1 Get all accounts
// TODO: Implement filters by getting the query string parameters of req.query

exports.getAllAccounts = Factory.getAll(Account, "accounts")

// 1.2 Get account by ID

exports.getAccountById = Factory.getById(Account, "account")

// INFO_STEP:
// 2 POST methods
// 2.1 Create account

exports.createNewAccount = Factory.createNew(Account)

// INFO_STEP:
// 3 PATCH Methods
// 3.1 Update Account

exports.updateAccount = Factory.updateOne(Account, "Account")

// INFO_STEP:
// 4 DELETE Methods
// 4.1 Delete Account

exports.deleteAccount = Factory.deleteOne(Account)