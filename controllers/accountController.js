/*================================================================================ */
/*=============================== Package imports ================================ */
/*================================================================================ */

// INFO_STUDY: Importing the created account model to get access to the methods to perform CRUD operations
const Account = require('../models/accountModel');


// INFO_STEP:
// 1. GET Methods
// 1.1 Get all accounts
// TODO: Implement filters by getting the query string parameters of req.query

exports.getAllAccounts = async (req, res, next) => {
    // INFO_STUDY: To implement filtering we will take advantage of the req.query object turning
    //     query strings like this one: ?balance[gte]=500 into this -> { balance: { gte: '500' } }
    //     so we only need to add the missing "$" sign to the operators

    // INFO_STEP:
    // a. Actions: Filter, sorting, pagination and field selection:
    // Create a shallow copy of the req.query object using, we want to keep the original object for implementg the features
    //   the copy will be used to just query results
    const queryObjectCopy = {...req.query}

    // Remove the features parameters from the copy so they do not interfere with the query when we use Model.find()
    const fieldsToExclude = ["sort", "pages", "fields"]
    fieldsToExclude.forEach( field => delete queryObjectCopy[field])

    // Turn the object into a string and use regex replacement to add the missing "$" to the operators
    // The regex expression finds all the occurrances of the operators and repalces them with the same operator but with the "$" sign
    let queryObjectString = JSON.stringify(queryObjectCopy)
    queryObjectString = queryObjectString.replace(/\b(gte|gt|lte|lt)\b/g, (matchedWord) => `$${matchedWord}`)

    // a.1 Filtering: Now we pass the modified object to Model.find() with the correct operators and
    //      save the Query returned to later chain more methods to it
    const queryAccounts = Account.find(JSON.parse(queryObjectString));

    // a.2 Sorting: We use the original req.query object and pass the req.query.sort value to Query.sort(),
    //      using a guard clause to check if the sort parameter is in the query
    if(req.query.sort) {
        queryAccounts.sort(req.query.sort)
    }

    // a.3 Limiting fields: We use the original req.query object and pass the req.query.fields value to Query.sort(),
    //      using a guard clause to check if the fields parameter is in the query
    if(req.query.fields){
        // Since we want to select multiple fields we expect a parameter in the form: ?fields=field1,field2, ...
        // we will use the Query.select() method that accepts an array of fields to be selected, so we need to convert
        // the string "field1,field2" into ["field1", "field2"]
        const fieldsArray = req.query.fields.split(",")
        queryAccounts.select(fieldsArray)

    }

    queryAccounts.then((accountDocuments) => {
        if (!accountDocuments.length) {
            return res.status(404).send(`No accounts found ${accountDocuments.length}`);
        }

        res.status(200).json({
            status: "success",
            results: accountDocuments.length,
            data: {
                Document: accountDocuments
            }
        })
    }).catch(next);
}

// 1.2 Get account by ID

exports.getAccountById = async (req, res, next) => {
    const queryAccount = Account.findById(req.params.id)

    queryAccount.then((accountDocument) =>{
        //TODO: Improve error handling
        if(!accountDocument) {
            return new Error(`No Account found with the ID: ${req.params.id}`)
        }

        res.status(200).json({
            status: "success",
            data: accountDocument
        })
    }).catch(next)
}

// INFO_STEP:
// 2 POST methods
// 2.1 Create account

exports.createNewAccount = async (req, res, next) => {
    const newAccount = await Account.create(req.body)

    res.status(201).json({
        status: "creation success",
        data: newAccount
    })

    next();
}

// INFO_STEP:
// 3 PATCH Methods
// 3.1 Update Account

exports.updateAccount = async (req, res, next) => {
    const queryUpdatedAccount = Account.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

    queryUpdatedAccount.then((updatedAccount) => {
        //TODO: Improve error handling
        if(!updatedAccount) {
            return new Error(`No Account found with the ID: ${req.params.id}`)
        }

        res.status(200).json({
            status: "update succesfull",
            data: updatedAccount
        })
    }).catch(next)
}

// INFO_STEP:
// 4 DELETE Methods
// 4.1 Delete Account

exports.deleteAccount = async (req, res, next) => {
    const queryDeleteAccount = Account.findByIdAndDelete(req.params.id)

    queryDeleteAccount.then((deletedAccount) => {
        if(!deletedAccount){
            return new Error(`No Account found with the ID: ${req.params.id}`)
        }

        res.status(204).json({
            status: "delete succesfull",
            data: null
        })
    }).catch(next)
}