const express = require('express');
const router = express.Router();
const Room = require('../models/Rooms'); // Import the Room model

// Route to handle room reservation requests
router.post('/add', async (req, res) => {
    try {
        const { firstname, lastname, email, phone, roomType, capacity, startDate, endDate, total } = req.body;

        // Parse the date strings into Date objects
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        // Create a new Room object with the parsed dates
        const newRoomReservation = new Room({
            firstname,
            lastname,
            email,
            phone,
            roomType,
            capacity,
            startDate,
            endDate,
            total
        });

        // Save the new room reservation to the database
        await newRoomReservation.save();

        res.json({ status: 'Room reservation added successfully', roomReservation: newRoomReservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const roomReservations = await Room.find();
        res.json(roomReservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const roomId = req.params.id;
        const { firstname, lastname, email, phone, roomType, capacity, startDate, endDate,total } = req.body;
        const updatedRoomReservation = await Room.findByIdAndUpdate(roomId, 
            { firstname, lastname, email, phone, roomType, capacity, startDate, endDate,total }, 
            { new: true }
        );
        if (!updatedRoomReservation) {
            return res.status(404).json({ error: 'Room reservation not found' });
        }
        res.json({ status: 'Room reservation updated', roomReservation: updatedRoomReservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const roomId = req.params.id;
        if (!roomId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid room reservation ID' });
        }
        const deletedRoomReservation = await Room.findByIdAndRemove(roomId);
        if (!deletedRoomReservation) {
            return res.status(404).json({ error: 'Room reservation not found' });
        }
        res.json({ status: 'Room reservation deleted', roomReservation: deletedRoomReservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const roomId = req.params.id;
        const roomReservation = await Room.findById(roomId);
        if (!roomReservation) {
            return res.status(404).json({ error: 'Room reservation not found' });
        }
        res.json(roomReservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
