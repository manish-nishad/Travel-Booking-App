const { verifyTokenAdmin, verifyToken } = require("../middlewares/verifyToken")
const Room = require("../models/Room")

const roomController = require("express").Router()


// get all
roomController.get('/', verifyToken, async (req, res) => {
    const type = req.query.type

    let rooms
    try {
        if (type) {
            rooms = await Room.find({ type: type }).limit(15)
            console.log(rooms)
        } else {
            rooms = await Room.find({}).limit(15)
        }
        return res.status(200).json(rooms)
    } catch (error) {
        console.error(error.message)
    }
})

// get types and their corresponding numbers
roomController.get('/find/types', async (req, res) => {
    try {
        const apartment = await Room.find({ type: 'apartment' }).countDocuments()
        const villa = await Room.find({ type: 'villa' }).countDocuments()
        const penthouse = await Room.find({ type: 'penthouse' }).countDocuments()
        const bungalow = await Room.find({ type: 'bungalow' }).countDocuments()

        return res.status(200).json({ apartment, villa, penthouse, bungalow })
    } catch (error) {
        console.error(error.message)
    }
})

// get 
roomController.get('/find/:id', async (req, res) => {
    const id = req.params.id
    try {
        const rooms = await Room.findById(id)
        return res.status(200).json(rooms)
    } catch (error) {
        console.error(error.message)
    }
})


module.exports = roomController