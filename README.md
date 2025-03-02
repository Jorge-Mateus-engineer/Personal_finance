
# Personal Finance API

Personal project to track finances, created as a mean to study how to create an API using Node.js and Express, using MongoDB as a database and making use of the Mongoose library to work with MongoDB asynchronously.

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