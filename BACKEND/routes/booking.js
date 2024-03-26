const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create a new booking
router.post('/add', async (req, res) => {
    try {
        const { userId, packageId, quantity } = req.body;
        const newBooking = new Booking({ userId, packageId, quantity });
        await newBooking.save();
        res.status(201).json({ message: 'Booking added successfully', booking: newBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { userId, packageId, quantity } = req.body;
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId,
            { userId, packageId, quantity },
            { new: true }
        );
        if (!updatedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Booking updated successfully', booking: updatedBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;
        if (!bookingId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid booking ID' });
        }
        const deletedBooking = await Booking.findByIdAndRemove(bookingId);
        if (!deletedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully', booking: deletedBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const bookings = await Booking.find({ userId }).populate('packageId');
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
module.exports = router;
