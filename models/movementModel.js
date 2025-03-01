/*================================================================================ */
/*=============================== Package imports ================================ */
/*================================================================================ */

// INFO_STUDY: MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose');

//
const Account = require("./accountModel")

/*================================================================================ */
/*=========================== Movement Schema Definition ========================= */
/*================================================================================ */

// INFO_STUDY: refer to .schemaAndModelsInfo.md for more information

// INFO_STEP:
// 1. Define a schema for the movement collection
const movementSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value !== 0;
            },
            message: 'The amount must be different from 0'
        }
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: [true, 'A movement must have a type']
    },
    description: {
        type: String,
        required: [true, 'A movement must have a description']
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'A movement must have a date']
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: [true, 'A movement must have an account asociated']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'A movement must have a category asociated']
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
});

// INFO_STEP:
// 2. Add query middleware to populate the account, category, and tags fields
movementSchema.pre(/^find/, function (next) {
    this.populate({ path: 'account', select: 'name' })
        .populate({ path: 'category', select: 'name' })
        .populate({ path: 'tags', select: 'name' });
    next();
});

// INFO_STEP:
// 3. Create a post hook to update the balance of the account associated with the movement
movementSchema.post("save", async (doc) => await Account.findOneAndUpdate(doc.account, {$inc: {balance: doc.amount}}))

// INFO_STEP:
// 4. Create a model for the movement schema
const Movement = mongoose.model('Movement', movementSchema);

// INFO_STEP:
// 4. Export the Movement model
module.exports = Movement;