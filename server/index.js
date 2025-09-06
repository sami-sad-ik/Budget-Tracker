const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: ["http://localhost:5173", "https://budget-buddy-pr.web.app"],
  credentials: true,
};

//middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bgu1g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  const DB = client.db("budget-tracker");
  const incomeCollection = DB.collection("income");
  const expenseCollection = DB.collection("expense");
  try {
    //get balance
    app.get("/balance/:email", async (req, res) => {
      const email = req.params.email;
      const query = { user: email };
      const incomes = await incomeCollection.find(query).toArray();
      const expenses = await expenseCollection.find(query).toArray();
      const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
      const totalExpense = expenses.reduce((sum, i) => sum + i.amount, 0);
      const balance = totalIncome - totalExpense;
      res.send({ balance, totalIncome, totalExpense });
    });

    // save a income in database
    app.post("/income", async (req, res) => {
      const incomeData = req.body;
      const result = await incomeCollection.insertOne(incomeData);
      res.send(result);
    });

    //delete an income
    app.delete("/income/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await incomeCollection.deleteOne(query);
      res.send(result);
    });

    //get the expenses
    app.get("/all-incomes/:email", async (req, res) => {
      const email = req.params.email;
      const query = { user: email };
      const result = await incomeCollection.find(query).toArray();
      res.send(result);
    });

    //get the expenses
    app.get("/all-expenses/:email", async (req, res) => {
      const email = req.params.email;
      const query = { user: email };
      const result = await expenseCollection.find(query).toArray();
      res.send(result);
    });

    //get the expenses
    app.get("/expenses/:email", async (req, res) => {
      const email = req.params.email;
      const query = { user: email };
      const result = await expenseCollection
        .find(query)
        .sort({ time: -1 })
        .limit(5)
        .toArray();
      res.send(result);
    });

    // save a expense in database
    app.post("/expense", async (req, res) => {
      const expenseData = req.body;
      const result = await expenseCollection.insertOne(expenseData);
      res.send(result);
    });

    //delete an expense
    app.delete("/expense/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await expenseCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("budget tracker server is running !!");
});

app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});
