/*================================================================================ */
/*=============================== Package imports ================================ */
/*================================================================================ */

// INFO_STUDY: MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose');

/*================================================================================ */
/*=========================== Account Schema Definition ========================== */
/*================================================================================ */

// INFO_STUDY: refer to .schemaAndModelsInfo.md for more information

// INFO_STEP:
// 1. Define a schema for the account collection
const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Account name is required']
    },
    type: {
        type: String,
        enum: ['savings', 'credit_card', 'savings_nu'],
        required: [true, 'Account type is required']
    },
    balance: { type: Number, default: 0 }
});

// INFO_STEP:
// 2. Create a model for the account schema
const Account = mongoose.model('Account', accountSchema);

// INFO_STEP:
// 3. Export the Account model
module.exports = Account;