import mongoose from "mongoose";

// creates a schema for the database
const peopleSchema = new mongoose.Schema({
    name: {type: String, required: true},
    tech: {type: String, required: true},
    sub: {type: Boolean, required: true, default: false}
})

const People = mongoose.model('People',peopleSchema)

export default People;