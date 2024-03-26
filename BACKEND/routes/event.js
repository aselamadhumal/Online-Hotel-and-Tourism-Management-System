const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Import the Event model

router.post('/add', async (req, res) => {
    try {
        const { title, date, venue, time, hasTicket } = req.body;
        const newEvent = new Event({ title, date, venue, time, hasTicket });
        await newEvent.save();
        res.json({ status: 'Event added successfully', event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const { title, date, venue, time, hasTicket } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(eventId, { title, date, venue, time, hasTicket }, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ status: 'Event Updated', event: updatedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        if (!eventId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid event ID' });
        }
        const deletedEvent = await Event.findByIdAndRemove(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ status: 'Event deleted', event: deletedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
