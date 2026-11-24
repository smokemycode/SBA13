# 🛒 Zenith Product API

A RESTful product inventory API for the fictional e-commerce company **Zenith**. It supports full CRUD plus filtering, sorting and pagination.

## 🧰 Tech Stack
- **Node.js** + **Express 5**: server and routing
- **MongoDB Atlas** + **Mongoose 9**: database and schema validation
- **dotenv**: keeps secrets in `.env`
- **ES modules** (`"type": "module"`)

## 🚀 Getting Started
```bash
git clone https://github.com/smokemycode/sba13.git
cd sba13
npm install
```
Create a `.env` file in the project root:
```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=3000
```
Run it:
```bash
npm run dev   # restarts on save (nodemon)
npm start     # plain node
```
Server runs at `http://localhost:3000`.

## 🗂️ Project Structure
```
SBA13/
├── config/connection.js     # Mongoose connection to Atlas
├── models/Product.js        # productSchema + Product model
├── routes/productRoutes.js  # all /api/products endpoints
├── server.js                # entry point
├── .env                     # secrets (not committed)
└── .gitignore
```

## 🧪 Testing
Every endpoint was tested in Postman: happy paths, 400 validation errors, 404 not-found cases, and combinations of filters, sorting and pagination.

## 🪞 Reflection
**What I built:** a modular Express + Mongoose API, with the query for `GET /api/products` built dynamically from whatever parameters are sent.

**What I learned:**
- How `req.body`, `req.params` and `req.query` differ.
- Why status codes matter: 201 vs 200, 400 vs 404 vs 500.
- Using `$gte` / `$lte`, and chaining `.find().sort().skip().limit()` in the right order.
- Using `runValidators` so updates still follow the schema rules.