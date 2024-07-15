import express from 'express'
import { connect } from 'mongoose';
const getPeople = express.Router();
import People from '../models/people.js'

// Get user from the database
getPeople.get('/', async (req, res) => {
    try {
        const people = await People.find();
        res.json(people)
    } catch (error) {
        res.status(400).json({ message: "Internal server error" })
    }
});

// get a certain person from the database
getPeople.get('/:id', async (req, res) => {
    try {
        const people = await People.findById(req.params.id);
        res.json(people)
    } catch (error) {
        res.status(400).json({ message: "Internal server error" })
    }
});

// add a person to the database
getPeople.post('/', async (req, res) => {

    const people = new People({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })

    try {
        const a1 = await people.save()
        res.json({error: false, message: "your information has been saved in the database", data: a1})
    } catch (error) {
        res.json({error: true, message: "error occoured while storing your information"})
    }
})

// edit a persons info in the database
getPeople.patch('/:id', async (req, res) => {
    const newName = req.body.name;
    const newTech = req.body.tech;
    const newSub = req.body.sub
    try {
        const people = await People.findById(req.params.id);
        people.name = newName;
        people.tech = newTech;
        people.sub = newSub;
        res.json(people)
    } catch (error) {
        res.status(400).json({ message: "Internal server error" })
    }
})

// delete the user/person from the database
getPeople.delete('/:id', async (req,res) => {
    try {
        const deletePeople = await People.findByIdAndDelete(req.params.id);
        res.json({error:false, message:"note deleted sucessfully"})
    } catch (error) {
        res.json({error:true, message:"Error deleting the user"})
    }
})

export default getPeople