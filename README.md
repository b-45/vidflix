## Video rental API with Node.js & MongoDB

### Create a server

---

`require` third party modules:

- express
- mongoose in `index.js` file

`use` relevant middlewares:

- json() - parses the body of requests with a json payload

`connect` to mongoDB database

```javascript
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost/vidflix")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Live at port ${port}...`));
```

### Create Routes & Schema for Genres

---

List all genres

Definition

`GET /`

Response

- `200 OK` on success

```json
{
  "name": "Sci-fi"
}
```

Post new genre

Definition

`Post /`

Response

- `201 Created` on success

```json
{
  "name": "Sci-fi"
}
```

###### A schema is a conceptual framework of your data model that maps to a MongoDB collection. A MongoDB collection is equivalent to a table in a relational database as is a document to a row.
