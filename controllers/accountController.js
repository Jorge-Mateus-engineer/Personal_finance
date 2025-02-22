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
    const queryAccounts = Account.find();

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