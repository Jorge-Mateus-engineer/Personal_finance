# **What is a Schema?**
A schema is a JSON object that defines the structure and contents of your data.

Schemas represent types of data rather than specific values, these include primitives, like strings and numbers,
as well as structural types, like objects and arrays, which you can combine to create schemas that represent custom object types.

Relevant links:

https://www.mongodb.com/docs/atlas/app-services/schemas/


## **Schema Constructor**

The Schema() constructor in Mongoose takes a definition object as its first argument, which describes the structure of the documents in a collection. The most common argument is an object where keys represent field names and values define field types, constraints, and relationships.

### Example:
```
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, min: 0 },
    email: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now }
});
```
## Schema types 

The values on each key-value pair on the object can either be just the type:

```
{
    name: String,
    ...other fields
};
```

Or they can be an object with additional options:

```
{
    name: { type: String, option2: value2, option3: value3 ... },
    ...other fields
};
```

Relevant links:

- https://mongoosejs.com/docs/schematypes.html#all-schema-types

# Validators

Validators are additional parameters that can be added to the field definition object, Validation is defined in the SchemaType,
Validation is middleware so Mongoose registers validation as a pre('save') hook on every schema by default.

## Built-in Validators

Mongoose has several built-in validators:

- All SchemaTypes have the built-in **required** validator. The required validator uses the SchemaType's checkRequired() function to determine if the value satisfies the required validator.
- Numbers have **min** and **max** validators.
- Strings have **enum**, **match**, **minLength**, and **maxLength** validators.

### Example

```
const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['savings', 'credit_card', 'savings_nu'],
        required: true
    },
    balance: { type: Number, default: 0 }
});
```

## Custom Validators

Custom validation in Mongoose is declared by passing a function to the **validate** property. The function must return **true** for valid values and **false** (or throw an error) for invalid values.

### Example

```
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        validate: {
            validator: function (value) {
                return value.length >= 5; // ✅ Must be at least 5 characters
            },
            message: 'Username must be at least 5 characters long'
        }
    }
});
```

# Mongoose Middleware

Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions. Middleware is specified on the schema level and is useful for writing plugins. Mongoose has 4 types of middleware:
- Document middleware
- Model middleware
- Aggregate middleware
- Query middleware

The middleware used in this app on the pre-hook is QueryMiddleware since it runs on the **find** method:

```
budgetSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'category',
        select: 'name'
        })
        .populate({
            path:'tag',
            select: 'name'
        })
        // Instead of passing the object like the one above, this is the shorthand form:
        .populate('account', 'name')
    next();
});
```

The **this** keyword can refer to the Model, Document, Query or Aggregate objects depending on the event name or regex
passed as the first argument.

The **populate** method belongs to the Query object and its used to specify the path which should be populated
with other documents: the values passed in the object to **populate()** are:  

- path: Refers to the field that has the type **mongoose.Schema.Types.ObjectId** that you want to populate
- select: Refers to the specific field of the foreign model that you want to retrieve

Relevant Links:

- https://mongoosejs.com/docs/api/query.html#Query.prototype.populate()
- https://mongoosejs.com/docs/populate.html
- https://mongoosejs.com/docs/populate.html#field-selection
- https://mongoosejs.com/docs/middleware.html#pre 
