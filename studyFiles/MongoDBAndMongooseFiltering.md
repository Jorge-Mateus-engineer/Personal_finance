# MongoDB filtering

Filtering in MongoDB allows you to retrieve specific documents from a collection based on defined criteria. Using query operators like `$eq`, `$gt`, `$lt`, and `$in`, you can match documents that meet certain conditions. The primary method for filtering is `db.collection.find(query, projection)`, which returns all matching documents. For more complex queries, the aggregation framework can be used to filter, transform, and analyze data efficiently.

### The `db.collection.find(query, projection)` method

This one is the primary method for filtering collections in MongoDB, its first argument "query" is simply an object that specifies has the search criteria that we want to search for.

#### Simple search

To do this we just pass an object of the form: `{field1: value1, field2: value2 ... }` for example:


```
// This will return all documents with the specified category and brand
db.collection.find({ category: "electronics", brand: "Sony" });

//Example response:
[
  { "_id": 1, "name": "TV", "category": "electronics", "brand": "Sony", "price": 500 },
  { "_id": 2, "name": "Headphones", "category": "electronics", "brand": "Sony", "price": 100 }
]
```

#### Searching with operators

For a broader search that is not only limited to the values specified but to a range of values we can use query operators, this are keywords used by MongoDB to specify query operations, they are all preceeded by the "$" sign, here are some common ones:

- **`$lt`**: Matches values **that are less than** a specified value.
- **`$lte`**: Matches values **that are less than or equal** to a specified value.
- **`$gt`**: Matches values that are **greater than** a specified value.
- **`$gte`**: Matches values that are **greater than or equal** to a specified value.
- **`$in`**: Matches any of the **values specified in an array**.
- **`$nin`**: Matches **none of the values specified in an array**.
- **`$ne`**: Matches all values that are **not equal to a specified value**.

To use these operators we pass an object of the form `{field1: {$operator1: value1, ... operatorN: valueN}, field2: {$operator1: value1, ... operatorN: valueN} ... }`, for example:

```
//This will return all the documents with the "electronics" category and that have a price greater than 200 and a stock lower than or equal to 50
db.collection.find({ 
  category: "electronics", 
  price: { $gt: 200 }, 
  stock: { $lte: 50 } 
});

// Example Response
[
  { "_id": 1, "name": "TV", "category": "electronics", "brand": "Sony", "price": 500, "stock": 30 },
  { "_id": 2, "name": "Speaker", "category": "electronics", "brand": "Bose", "price": 300, "stock": 10 }
]

```

To perform a search were we do not want all the criterias to be met, but rather any of them to be met (OR operation), we use the `$or` logical operator, passing an object of the form: `{ $or: [ { expression1 }, { expression2 }, ... , { expressionN } ] }`, for example:

```
// This will return documents that have the "electronics" category or that have a price greater than 500
db.collection.find({ 
  $or: [ 
    { category: "electronics" }, 
    { price: { $gt: 500 } } 
  ] 
});

//Example response:
[
  { "_id": 1, "name": "TV", "category": "electronics", "brand": "Sony", "price": 500 },
  { "_id": 2, "name": "Laptop", "category": "computers", "brand": "Dell", "price": 1200 },
  { "_id": 3, "name": "Speaker", "category": "electronics", "brand": "Bose", "price": 300 }
]
```

Relevant links:
- https://www.mongodb.com/docs/manual/reference/command/find/
- https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find
- https://www.mongodb.com/docs/manual/reference/operator/query/
- https://www.mongodb.com/docs/manual/reference/operator/query-logical/

# Mongoose Filtering

In Mongoose, the `Model.find()` method is used to filter documents in a collection, **returning a query object instead of a direct promise.** This query object is thenable, meaning you can use `.then()` to handle the results or convert it into a full promise with `.exec()`. Additionally, `Model.find()` supports method chaining, which replaces the need to manually add MongoDB operators (`$gt`, `$lt`, etc.) by providing built-in methods for filtering, sorting, pagination, and field selection in a more readable and structured way.

Given that `Model.find()` returns a Query object, it must be handled in an async way to access the documents returned, for example:

```
//Using async functions:
const findDocuments = async function() {
    ....
    // Create a model based on a schema
    const myModel = mongoose.model('modelName', schema);

    // This will return all the documents in 
    const documents = await myModel.find()
}

//Using then() and catch()

const findDocuments = function() {
    // Create a model based on a schema
    const myModel = mongoose.model('modelName', schema);

    // Fetch all documents
    myModel.find().exec()
        .then(documents => {
            // use the returned documents as needed
            console.log("Documents:", documents);
        })
        .catch(error => {
            console.error("Error:", error);
        });
};
```

### Operators in Mongoose

While MongoDB query objects can still be used in `Model.find()`, Mongoose offers query methods that have the same name as the MongoDV operators:

| MongoDB Operator | Mongoose Query Method |
|------------------|----------------------|
| `$eq`           | `.eq(value)`         |
| `$ne`           | `.ne(value)`         |
| `$gt`           | `.gt(value)`         |
| `$gte`          | `.gte(value)`        |
| `$lt`           | `.lt(value)`         |
| `$lte`          | `.lte(value)`        |
| `$in`           | `.in(array)`         |
| `$nin`          | `.nin(array)`        |

To specify the field in which the operator must work you use the `.where(fieldName)` method, for example:

```
// Equivalent to Model.find({ price: { $gte: 100, $lte: 500 } });
Model.find().where("price").gte(100).lte(500);
```

So a general way to perform `AND` operations in Mongoose would be:

```
Model.find()
  .where("field1").operatorMethod(value1)
  .where("field2").operatorMethod(value2)
  .where("field3").operatorMethod(value3);
```

To perform `OR` operations you use the `.or()` method this way:

```
Model.find().or([{ category: "electronics" }, { price: { $gt: 500 } }]);

//Which is equivalent to:
Model.find({ 
  $or: [ 
    { category: "electronics" }, 
    { price: { $gt: 500 } } 
  ] 
});
```