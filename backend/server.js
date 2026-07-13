import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import process from 'process'
import bodyParser from 'body-parser'
import cors from 'cors'


const app = express();
const port = 3000;
dotenv.config();

// Middlewares
app.use(cors());
app.use(bodyParser.json());


// Connecting to the MongoDB Client
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
client.connect();

// App & Database
const dbName = process.env.DB_NAME;
console.log(process.env.MONGO_URI)


//get all password
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//save password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true, result: findResult})
})

//delete password
app.delete('/', async (req, res) => { 
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success: true, result: findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})