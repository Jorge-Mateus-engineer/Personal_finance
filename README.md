
# Personal Finance API

Personal project to track finances, created as a mean to study how to create an API using Node.js and Express, using MongoDB as a database and making use of the Mongoose library to work with MongoDB asynchronously.

This being a personal study project, the code is full with comments that describe in detail why each line or block of code does and why is there.




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

## API Reference (WIP)

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

