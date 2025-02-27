exports.getAll = function(Model, modelName) {
    return async (req, res, next) => {
     // INFO_STUDY: To implement filtering we will take advantage of the req.query object turning
    //     query strings like this one: ?balance[gte]=500 into this -> { balance: { gte: '500' } }
    //     so we only need to add the missing "$" sign to the operators

    // INFO_STEP:
    // a. Actions: Filter, sorting, pagination, field selection and pagination:
    // Create a shallow copy of the req.query object using, we want to keep the original object for implementg the features
    //   the copy will be used to just query results
    const queryObjectCopy = {...req.query}

    // Remove the features parameters from the copy so they do not interfere with the query when we use Model.find()
    const fieldsToExclude = ["sort", "pages", "fields", "pageNumber", "pageSize"]
    fieldsToExclude.forEach( field => delete queryObjectCopy[field])

    // Turn the object into a string and use regex replacement to add the missing "$" to the operators
    // The regex expression finds all the occurrances of the operators and repalces them with the same operator but with the "$" sign
    let queryObjectString = JSON.stringify(queryObjectCopy)
    queryObjectString = queryObjectString.replace(/\b(gte|gt|lte|lt)\b/g, (matchedWord) => `$${matchedWord}`)

    // a.1 Filtering: Now we pass the modified object to Model.find() with the correct operators and
    //      save the Query returned to later chain more methods to it
    let queryModel = Model.find(JSON.parse(queryObjectString));

    // a.2 Sorting: We use the original req.query object and pass the req.query.sort value to Query.sort(),
    //      using a guard clause to check if the sort parameter is in the query
    if(req.query.sort) {
        queryModel = queryModel.sort(req.query.sort)
    }

    // a.3 Limiting fields: We use the original req.query object and pass the req.query.fields value to Query.sort(),
    //      using a guard clause to check if the fields parameter is in the query
    if(req.query.fields){
        // Since we want to select multiple fields we expect a parameter in the form: ?fields=field1,field2, ...
        // we will use the Query.select() method that accepts an array of fields to be selected, so we need to convert
        // the string "field1,field2" into ["field1", "field2"]
        const fieldsArray = req.query.fields.split(",")
        queryModel = queryModel.select(fieldsArray)
    } else {
        // Always remove the version control field since the end user would not need it, unless specifically stated
        querModel = queryModel.select("-__v")
    }

    // a.4 Pagination: to do this we expect two parameters ?pageNumber=N and pageSize=N, where N is an integer
    // to achieve this we will we will use a combination of Query.skip() and Query.limit(), we will set default values
    // to get the page 1 and a limit of 50 documents in case the expected parameters are not sent
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 50;


    // To go to the specified page we need to skip an amount of documents equal to pageSize * (pageNumber - 1)
    // so if we want to go to page 10 on pages of size 5, we have to skip 5 * (10 - 1)
    const documentsToSkip = (pageNumber - 1) * pageSize;
    queryModel = queryModel.skip(documentsToSkip).limit(pageSize);

    // Finally we use .then() on the Query to execute it
    queryModel.then((foundDocuments) => {
        if (!foundDocuments.length) {
            return res.status(404).send(`No ${modelName} found ${foundDocuments.length}`);
        }

        res.status(200).json({
            status: "success",
            results: foundDocuments.length,
            data: {
                Document: foundDocuments
            }
        })
    }).catch(next);
    }
}

exports.getById = function(Model, modelName) {
    return async (req, res, next) => {
    const queryModel = Model.findById(req.params.id)

    queryModel.then((foundDocument) =>{
        //TODO: Improve error handling
        if(!foundDocument) {
            return new Error(`No ${modelName} found with the ID: ${req.params.id}`)
        }

        res.status(200).json({
            status: "success",
            data: foundDocument
        })
    }).catch(next)
    }
}

exports.createNew = function(Model) {
    return async (req, res, next) => {
    const newDocument = await Model.create(req.body)

    res.status(201).json({
        status: "creation success",
        data: newDocument
    })

    next();
    }
}

exports.updateOne = function(Model, modelName) {
    return async (req, res, next) => {
    const queryUpdatedModel = Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

    queryUpdatedModel.then((updatedAccount) => {
        //TODO: Improve error handling
        if(!updatedAccount) {
            return new Error(`No ${modelName} found with the ID: ${req.params.id}`)
        }

        res.status(200).json({
            status: "update succesfull",
            data: updatedAccount
        })
    }).catch(next)
    }
}

exports.deleteOne = function(Model, modelName) {
    return async (req, res, next) => {
    const queryDeleteDocument = Model.findByIdAndDelete(req.params.id)

    queryDeleteDocument.then((deletedAccount) => {
        if(!deletedAccount){
            return new Error(`No ${modelName} found with the ID: ${req.params.id}`)
        }

        res.status(204).json({
            status: "delete succesfull",
            data: null
        })
    }).catch(next)
    }
}