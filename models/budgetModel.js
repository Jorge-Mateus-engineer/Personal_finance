/*================================================================================ */
/*=============================== Package imports ================================ */
/*================================================================================ */

// INFO_STUDY: MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose');

/*================================================================================ */
/*============================ Budget Schema Definition ========================== */
/*================================================================================ */

// INFO_STUDY: refer to .schemaAndModelsInfo.md for more information

// INFO_STEP:
// 1. Define a schema for the budget collection
const budgetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A budget must have a name']
    },
    amount: {
        type: Number,
        required: [true, 'A budget must have an amount']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }
});

// INFO_STEP:
// 2. Add query middleware to populate the category, tag, and account fields
budgetSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'category',
        select: 'name'
        })
        .populate({
            path:'tag',
            select: 'name'
        })
        .populate({
            path:'account',
            select: 'name'
        })
    next();
});

// INFO_STEP:
// 3. Create a model for the budget schema
const Budget = mongoose.model('Budget', budgetSchema);

// INFO_STEP:
// 4. Export the Budget model
module.exports = Budget;