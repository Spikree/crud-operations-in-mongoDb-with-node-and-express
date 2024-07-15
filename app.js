import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import getPeople from './routes/people.js'

dotenv.config();

const url = process.env.MONGO_CONNECT

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// connect to the database
mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection

// lets the dev know if the database is coonnected to the database
con.on('open',function() {
    console.log('connected to mongoDB')
})

// route to the /people end point
app.use('/people',getPeople)

app.listen(port, () => {
    console.log(`port running on http://localhost:${port}`)
})

