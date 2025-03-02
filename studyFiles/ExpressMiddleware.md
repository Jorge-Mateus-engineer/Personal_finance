# Middleware in express

Middleware functions are functions that have access to the **request object (`req`)**, the **response object (`res`)**, and the **`next` function** in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, **executes the middleware succeeding the current middleware.** Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware in the stack.

#### Example of middleware

This is a middleware that will trigger when a GET request is recieved on the "/" route:

```javascript
app.get("/", (req, res, next) => {
  doSomething(req.params);  
  next();
})
```

If the current middleware function **does not end the request-response cycle**, it must call **next()** to pass control to the next middleware function. Otherwise, the request will be left hanging.

Relevant Links:

- https://expressjs.com/en/guide/writing-middleware.html

## The request object

The `req` object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on. The `req` object is an **enhanced version of Node’s own request object** and supports all built-in fields and methods.

These are some useful properties of the `req` object:

### `req.body`
Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as `express.json()` or `express.urlencoded()`.

##### Example

###### Middleware fucntion
```javascript
app.use(express.json()); // Enable JSON body parsing

app.post("/log-body", (req, res) => {
    console.log(req.body); // Log the request body
    res.send("Body received");
});
```

###### Example Request (Client Sends JSON Data)

```http
POST /log-body
Content-Type: application/json
```
```json
{
  "name": "John",
  "age": 25
}
```

###### Console Output (`req.body` Logs)

```
{ name: 'John', age: 25 }
```

### `req.params`

This property is an object containing properties mapped to the named route “parameters”, which are named URL segments that are used to capture the values specified at their position in the URL.

##### Example

###### Middleware fucntion
```javascript
app.get("/users/:id", (req, res) => {
    console.log(req.params); // Log the route parameters
    res.send(`User ID: ${req.params.id}`);
});
```

###### Example Request

```http
GET /users/123
```

###### Console Output (`req.params` Logs)

```
{ id: '123' }
```

### `req.query`

This property is an **object containing a property for each query string parameter** in the route. When query parser is set to disabled, it is an empty object {}, otherwise it is the result of the configured query parser. To change the defaulty query parser settings use `app.set("query parser", "value")`.

##### Example

###### Middleware fucntion
```javascript
app.get("/search", (req, res) => {
    console.log(req.query); // Log the query parameters
    res.send(`Query received`);
});
```

###### Example Request

```http
GET /search?keyword=express&limit=10
```

###### Console Output (`req.params` Logs)

```
{ keyword: 'express', limit: '10' }
```
Relevant Links:

- https://expressjs.com/en/guide/writing-middleware.html
- https://expressjs.com/en/4x/api.html#req
- https://expressjs.com/en/guide/routing.html#route-parameters
- https://expressjs.com/en/4x/api.html#app.settings.table 

## The response object

The `res` object represents the **HTTP response that an Express app sends when it gets an HTTP request.** The `res` object is an **enhanced version of Node’s own response object** and supports all built-in fields and methods.

The `res` has also relevant properties similar to the `req` object, however we are more interested in its methods (most methods of the `res`  object modify response headers based on their behavior) since we usually want to perform an action as a response, instead of accessing its properties, here are some relevant methods:

### `res.cookie(name, value [, options])`

Sets cookie `name` to `value`. The `value` parameter may be a **string or object converted to JSON.**

##### Example

###### Middleware fucntion
```javascript
app.get("/set-cookie", (req, res) => {
    res.cookie("username", "JohnDoe",{ maxAge: 900000, httpOnly: true });
    res.send("Cookie set");
});
```

###### Response Headers (Includes the Set-Cookie Header)

```http
Set-Cookie: username=JohnDoe; Max-Age=900000; HttpOnly
```

###### Client Response (Body Content)

```
Cookie set
```

### `res.json([body])`

Sends a **JSON response.** The parameter can be any JSON type, including object, array, string, Boolean, number, or null, and you can also use it to convert other values to JSON.

##### Example

###### Middleware fucntion
```javascript
app.get("/data", (req, res) => {
    const data = { message: "Hello, world!", status: "success" };
    res.json(data); // Send JSON response
});
```

###### Response Headers (Includes the Set-Cookie Header)

```http
Content-Type: application/json; charset=utf-8
```

###### Response (JSON Sent to the Client)

```json
{
  "message": "Hello, world!",
  "status": "success"
}
```

### `res.send([body])`
Sends the HTTP response. The body parameter can be a Buffer object, a String, an object, Boolean, or an Array.

##### Example

###### Middleware fucntion
```javascript
app.get("/hello", (req, res) => {
    res.send("Hello, world!"); // Send a plain text response
});
```

###### Response Headers (Includes the Set-Cookie Header)

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
```

###### Response (JSON Sent to the Client)

```
Hello, world!
```

### `res.status(code)`

Sets the HTTP status for the response.

##### Example

###### Middleware fucntion
```javascript
app.get("/not-found", (req, res) => {
    res.status(404).send("Resource not found"); // Set status code and send response
});
```

###### Response Headers (Includes the Set-Cookie Header)

```http
HTTP/1.1 404 Not Found
Content-Type: text/html; charset=utf-8
```

###### Client Response

```
Resource not found
```

Relevant Links:
- https://expressjs.com/en/4x/api.html#res