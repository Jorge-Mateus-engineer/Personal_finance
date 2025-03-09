# Personal Finance API

Personal project to track finances its an implementation of a REST API using Express and MongoDB with mongoose, created as a mean to study how to create an API using Node.js and Express, using MongoDB as a database and making use of the Mongoose library to work with MongoDB asynchronously.

This being a personal study project, the code is full with comments that describe in detail why each line or block of code does and why is there and some markdown files with study notes and relevant information.

This API will later be consumed by an Angular APP, link to that repo is pending...

---
## Tech Stack

**Server:**  
- Node
- Express
- Express-mongo-sanitize
- Express-rate-limit
- Mongoose
- Morgan
- dotenv
- helmet
- hpp
- xss-clean

**Dev Dependencies:**  
- nodemon

---
## API Reference

### Accounts

#### Document schema

```json
{
    "_id": "67be70c23345rg8r7f834261",
    "name": "Savings Wells Fargo",
    "type": "savings",
    "balance": 500
}
```

#### Endpoints

##### Get list of accounts
```http
  GET /api/v1/accounts
```
Returns a list of all accounts, by default is limited to a max of 50 accounts returned, supports sorting, filtering, pagination and specific field selection.

| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fields` | `list of strings` |List of fields of the document to be returned |
| `sort` | `string` | Field to use as a reference for sorting the document list returned, use `-field` to sort descendingly |
| `pageNumber` | `int` | Used with `pageSize` when using pagination, the number represents the page number that you want to retrieve |
| `pageSize` | `int` | Used with `pageNumber` when using pagination, the number determines the size of the pages |
| `field[operator]` | `string` | Used to implement simple filtering, supports the basic MongoDB operators: `gte`, `gt`, `lte`, `lt`  |

###### Response

```json
{
    "status": "success",
    "results": 2,
    "data": {
        "Document": [
            {
                "_id": "67be70c2c82sdj984ha4261",
                "name": "Savings Bank of America",
                "type": "savings",
                "balance": 2300
            },
            {
                "_id": "67bfadfge552149c124bd",
                "name": "Visa Credit Card",
                "type": "credit",
                "balance": -500
            },
            // ... other documents
        ]
    }
}
```


##### Create account
```http
  POST /api/v1/accounts
```
Creates an account based on the request body
###### Request body

```json
{
    "name": "Visa Credit",
    "type": "credit_card",
    "balance": -1250
}
```
###### Response

```json
{
    "status": "success",
    "data": {
        "name": "Visa Credit",
        "type": "credit_card",
        "balance": -1250,
        "_id": "67c4ba69f5r37d7f8273680",
        "__v": 0
    }
}
```

##### Get account by ID
```http
  GET /api/v1/accounts/:id
```
Retrieves an account document based on the provided ID

| Path Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | ID of the desired account|

###### Response

```json
{
    "status": "success",
    "data": {
        "_id": "67c4ba69f5r37d7f8273680",
        "name": "Visa Credit",
        "type": "credit_card",
        "balance": -1250
    }
}
```

##### Update account by ID
```http
  PATCH /api/v1/accounts/:id
```
Updates an account document based on the provided ID, only updates fields passed on the request body

| Path Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | ID of the desired account|

###### Request body

```json
{
    "balance": 1000
}
```

###### Response

```json
{
    "status": "succes",
    "data": {
        "_id": "67c4ba69f5r37d7f8273680",
        "name": "Visa Credit",
        "type": "credit_card",
        "balance": -550
    }
}
```

### Budgets

#### Document schema

```json
{
    "_id": "67be245370c23g8r7f83427ty78",
    "name": "Essentials",
    "amount": 5000,
    "category": "67c253b8145558833fste290",
    "account": "67c4ba69f5r37d7f8273680",
    "tags": ["67c258c3e21012d2v91dac64", "67c251t9134138833fdce295"]
}
```

#### Endpoints

##### Get list of budgets
```http
  GET /api/v1/budgets
```
Returns a list of all budgets, by default is limited to a max of 50 budgets returned, supports sorting, filtering, pagination and specific field selection.

| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fields` | `list of strings` |List of fields of the document to be returned |
| `sort` | `string` | Field to use as a reference for sorting the document list returned, use `-field` to sort descendingly |
| `pageNumber` | `int` | Used with `pageSize` when using pagination, the number represents the page number that you want to retrieve |
| `pageSize` | `int` | Used with `pageNumber` when using pagination, the number determines the size of the pages |
| `field[operator]` | `string` | Used to implement simple filtering, supports the basic MongoDB operators: `gte`, `gt`, `lte`, `lt`  |

###### Response

```json
{
    "status": "success",
    "results": 2,
    "data": {
        "Document": [
            {
                "_id": "67be245370c23g8r7f83427ty78",
                "name": "Essentials",
                "amount": 5000,
                "category": "67c253b8145558833fste290",
                "account": "67c4ba69f5r37d7f8273680",
                "tags": ["67c258c3e21012d2v91dac64", "67c251t9134138833fdce295"]
            },
            {
                "_id": "67be245370c23g8r7f83427ty78",
                "name": "Leisure",
                "amount": 2000,
                "category": "67c253b8197358833fste290",
                "account": "67c4ba69f5r34d7f8273680",
                "tags": ["67c258c3e21012d2b89dsdac64", "67c251t91318735833fdce295"]
            },
            // ... other documents
        ]
    }
}
```


##### Create budget
```http
  POST /api/v1/budgets
```
Creates a budget based on the request body
###### Request body

```json
{
    "name": "Groceries",
    "amount": 6000,
    "category": "67c253b8135558833fste290",
    "account": "67c4ba69f5r37d7f8273680",
    "tags": ["67c258c3e21012d2v91dac64", "67c251t9134138833fdce295"]
}
```
###### Response

```json
{
    "status": "success",
    "data": {
        "name": "Groceries",
        "amount": 6000,
        "category": "67c253b8135558833fste290",
        "account": "67c4ba69f5r37d7f8273680",
        "tags": ["67c258c3e21012d2v91dac64", "67c251t9134138833fdce295"],
        "__v": 0
    }
}
```

##### Get budget by ID
```http
  GET /api/v1/budgets/:id
```
Retrieves an budget document based on the provided ID

| Path Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | ID of the desired budget|

###### Response

```json
{
    "status": "success",
    "data": {
        "_id": "67be245370c23g8r7f83427ty78",
        "name": "Leisure",
        "amount": 2000,
        "category": "67c253b8197358833fste290",
        "account": "67c4ba69f5r34d7f8273680",
        "tags": ["67c258c3e21012d2b89dsdac64", "67c251t91318735833fdce295"]
    }
}
```

##### Update budget by ID
```http
  PATCH /api/v1/budgets/:id
```
Updates an budget document based on the provided ID, only updates fields passed on the request body

| Path Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | ID of the desired budget|

###### Request body

```json
{
    "amount": 1000
}
```

###### Response

```json
{
    "status": "succes",
    "data": {
        "_id": "67be245370c23g8r7f83427ty78",
        "name": "Leisure",
        "amount": 1000,
        "category": "67c253b8197358833fste290",
        "account": "67c4ba69f5r34d7f8273680",
        "tags": ["67c258c3e21012d2b89dsdac64", "67c251t91318735833fdce295"]
    }
}
```

### Categories

#### Document schema

```json
{
    "_id": "67c253b8145558833fste290",
    "name": "Food",
    "description": "Expenses for food and groceries"
}
```

#### Endpoints

##### Get list of categories
```http
  GET /api/v1/categories
```
Returns a list of all categories, by default is limited to a max of 50 categories returned, supports sorting, filtering, pagination and specific field selection.

| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fields` | `list of strings` |List of fields of the document to be returned |
| `sort` | `string` | Field to use as a reference for sorting the document list returned, use `-field` to sort descendingly |
| `pageNumber` | `int` | Used with `pageSize` when using pagination, the number represents the page number that you want to retrieve |
| `pageSize` | `int` | Used with `pageNumber` when using pagination, the number determines the size of the pages |
| `field[operator]` | `string` | Used to implement simple filtering, supports the basic MongoDB operators: `gte`, `gt`, `lte`, `lt`  |

###### Response

```json
{
    "status": "success",
    "results": 2,
    "data": {
        "Document": [
            {
                "_id": "67c253b8145558833fste290",
                "name": "Food",
                "description": "Expenses for food and groceries"
            },
            {
                "_id": "67c253b8197358833fste290",
                "name": "Entertainment",
                "description": "Expenses for movies, concerts, etc."
            },
            // ... other documents
        ]
    }
}
```

##### Create category
```http
  POST /api/v1/categories
```
Creates a category based on the request body
###### Request body

```json
{
    "name": "Utilities",
    "description": "Expenses for utilities like electricity, water, etc."
}
```
###### Response

```json
{
    "status": "success",
    "data": {
        "name": "Utilities",
        "description": "Expenses for utilities like electricity, water, etc.",
        "_id": "67c253b8145558833fste291",
        "__v": 0
    }
}
```

##### Get category by ID
```http
  GET /api/v1/categories/:id
```
Retrieves a category document based on the provided ID

| Path Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | ID of the desired category|

###### Response

```json
{
    "status": "success",
    "data": {
        "_id": "67c253b8145558833fste290",
        "name": "Food",
        "description": "Expenses for food and groceries"
    }
}
```

##### Update category by ID
```http
  PATCH /api/v1/categories/:id
```
Updates a category document based on the provided ID, only updates fields passed on the request body

| Path Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | ID of the desired category|

###### Request body

```json
{
    "description": "Expenses for food, groceries, and dining out"
}
```

###### Response

```json
{
    "status": "success",
    "data": {
        "_id": "67c253b8145558833fste290",
        "name": "Food",
        "description": "Expenses for food, groceries, and dining out"
    }
}
```

##### Delete category by ID
```http
  DELETE /api/v1/categories/:id
```
Deletes a category document based on the provided ID

| Path Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | ID of the desired category|

###### Response

```json
{
    "status": "success",
    "data": null
}
```

### Movements

#### Document schema

```json
{
    "_id": "67c4ba69f5r37d7f8273680",
    "description": "Grocery shopping",
    "amount": 150,
    "date": "2023-10-01T00:00:00.000Z",
    "category": "67c253b8145558833fste290",
    "account": "67c4ba69f5r37d7f8273680",
    "tags": ["67c258c3e21012d2v91dac64", "67c251t9134138833fdce295"]
}
```

#### Endpoints

##### Get list of movements
```http
  GET /api/v1/movements
```
Returns a list of all movements, by default is limited to a max of 50 movements returned, supports sorting, filtering, pagination and specific field selection.

| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fields` | `list of strings` |List of fields of the document to be returned |
| `sort` | `string` | Field to use as a reference for sorting the document list returned, use `-field` to sort descendingly |
| `pageNumber` | `int` | Used with `pageSize` when using pagination, the number represents the page number that you want to retrieve |
| `pageSize` | `int` | Used with `pageNumber` when using pagination, the number determines the size of the pages |
| `field[operator]` | `string` | Used to implement simple filtering, supports the basic MongoDB operators: `gte`, `gt`, `lte`, `lt`  |

###### Response

```json
{
    "status": "success",
    "results": 2,
    "data": {
        "Document": [
            {
                "_id": "67c4ba69f5r37d7f8273680",
                "description": "Grocery shopping",
                "amount": 150,
                "date": "2023-10-01T00:00:00.000Z",
                "category": "67c253b8145558833fste290",
                "account": "67c4ba69f5r37d7f8273680",
                "tags": ["67c258c3e21012d2v91dac64", "67c251t9134138833fdce295"]
            },
            {
                "_id": "67c4ba69f5r37d7f8273681",
                "description": "Electricity bill",
                "amount": 100,
                "date": "2023-10-02T00:00:00.000Z",
                "category": "67c253b8145558833fste291",
                "account": "67c4ba69f5r37d7f8273681",
                "tags": ["67c258c3e21012d2v91dac65", "67c251t9134138833fdce296"]
            },
            // ... other documents
        ]
    }
}
```

##### Create movement
```http
  POST /api/v1/movements
```
Creates a movement based on the request body, everytime a new movement is created, the balance of the associated account is updated
###### Request body

```json
{
    "description": "Internet bill",
    "amount": 60,
    "date": "2023-10-03T00:00:00.000Z",
    "category": "67c253b8145558833fste292",
    "account": "67c4ba69f5r37d7f8273682",
    "tags": ["67c258c3e21012d2v91dac66", "67c251t9134138833fdce297"]
}
```
###### Response

```json
{
    "status": "success",
    "data": {
        "description": "Internet bill",
        "amount": 60,
        "date": "2023-10-03T00:00:00.000Z",
        "category": "67c253b8145558833fste292",
        "account": "67c4ba69f5r37d7f8273682",
        "tags": ["67c258c3e21012d2v91dac66", "67c251t9134138833fdce297"],
        "_id": "67c4ba69f5r37d7f8273683",
        "__v": 0
    }
}
```

##### Get movement by ID
```http
  GET /api/v1/movements/:id
```
Retrieves a movement document based on the provided ID

| Path Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | ID of the desired movement|

###### Response

```json
{
    "status": "success",
    "data": {
        "_id": "67c4ba69f5r37d7f8273680",
        "description": "Grocery shopping",
        "amount": 150,
        "date": "2023-10-01T00:00:00.000Z",
        "category": "67c253b8145558833fste290",
        "account": "67c4ba69f5r37d7f8273680",
        "tags": ["67c258c3e21012d2v91dac64", "67c251t9134138833fdce295"]
    }
}
```

##### Update movement by ID
```http
  PATCH /api/v1/movements/:id
```
Updates a movement document based on the provided ID, only updates fields passed on the request body

| Path Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | ID of the desired movement|

###### Request body

```json
{
    "amount": 200
}
```

###### Response

```json
{
    "status": "success",
    "data": {
        "_id": "67c4ba69f5r37d7f8273680",
        "description": "Grocery shopping",
        "amount": 200,
        "date": "2023-10-01T00:00:00.000Z",
        "category": "67c253b8145558833fste290",
        "account": "67c4ba69f5r37d7f8273680",
        "tags": ["67c258c3e21012d2v91dac64", "67c251t9134138833fdce295"]
    }
}
```

##### Delete movement by ID
```http
  DELETE /api/v1/movements/:id
```
Deletes a movement document based on the provided ID

| Path Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | ID of the desired movement|

###### Response

```json
{
    "status": "success",
    "data": null
}
```

### Tags

#### Document schema

```json
{
    "_id": "67c258c3e21012d2v91dac64",
    "name": "Groceries",
    "description": "Expenses related to grocery shopping"
}
```

#### Endpoints

##### Get list of tags
```http
  GET /api/v1/tags
```
Returns a list of all tags, by default is limited to a max of 50 tags returned, supports sorting, filtering, pagination and specific field selection.

| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fields` | `list of strings` |List of fields of the document to be returned |
| `sort` | `string` | Field to use as a reference for sorting the document list returned, use `-field` to sort descendingly |
| `pageNumber` | `int` | Used with `pageSize` when using pagination, the number represents the page number that you want to retrieve |
| `pageSize` | `int` | Used with `pageNumber` when using pagination, the number determines the size of the pages |
| `field[operator]` | `string` | Used to implement simple filtering, supports the basic MongoDB operators: `gte`, `gt`, `lte`, `lt`  |

###### Response

```json
{
    "status": "success",
    "results": 2,
    "data": {
        "Document": [
            {
                "_id": "67c258c3e21012d2v91dac64",
                "name": "Groceries",
                "description": "Expenses related to grocery shopping"
            },
            {
                "_id": "67c258c3e21012d2v91dac65",
                "name": "Utilities",
                "description": "Expenses related to utilities like electricity, water, etc."
            },
            // ... other documents
        ]
    }
}
```

##### Create tag
```http
  POST /api/v1/tags
```
Creates a tag based on the request body
###### Request body

```json
{
    "name": "Entertainment",
    "description": "Expenses related to entertainment activities"
}
```
###### Response

```json
{
    "status": "success",
    "data": {
        "name": "Entertainment",
        "description": "Expenses related to entertainment activities",
        "_id": "67c258c3e21012d2v91dac66",
        "__v": 0
    }
}
```

##### Get tag by ID
```http
  GET /api/v1/tags/:id
```
Retrieves a tag document based on the provided ID

| Path Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | ID of the desired tag|

###### Response

```json
{
    "status": "success",
    "data": {
        "_id": "67c258c3e21012d2v91dac64",
        "name": "Groceries",
        "description": "Expenses related to grocery shopping"
    }
}
```

##### Update tag by ID
```http
  PATCH /api/v1/tags/:id
```
Updates a tag document based on the provided ID, only updates fields passed on the request body

| Path Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | ID of the desired tag|

###### Request body

```json
{
    "description": "Expenses related to grocery shopping and food"
}
```

###### Response

```json
{
    "status": "success",
    "data": {
        "_id": "67c258c3e21012d2v91dac64",
        "name": "Groceries",
        "description": "Expenses related to grocery shopping and food"
    }
}
```

##### Delete tag by ID
```http
  DELETE /api/v1/tags/:id
```
Deletes a tag document based on the provided ID

| Path Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | ID of the desired tag|

###### Response

```json
{
    "status": "success",
    "data": null
}
```