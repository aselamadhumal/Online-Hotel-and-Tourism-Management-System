const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Staff = require('../models/Staff');

// POST endpoint to add a new staff member
router.post('/add', async (req, res) => {
    try {
        const { name, role, email, mobile, nic, salary } = req.body;

        const newStaff = new Staff({ name, role, email, mobile, nic, salary });
        await newStaff.save();
        res.json({ status: 'Staff member added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const staffMembers = await Staff.find();
        res.json(staffMembers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
router.get('/attendance/', async (req, res) => {
    try {
        const attendance = await Attendance.find();
        res.json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT endpoint to update a staff member by ID
router.put('/update/:id', async (req, res) => {
    try {
        const staffId = req.params.id;
        const { name, role, email, mobile, nic, salary } = req.body;

        const updateStaff = { name, role, email, mobile, nic, salary };
        const updatedStaff = await Staff.findByIdAndUpdate(staffId, updateStaff, { new: true });
        if (!updatedStaff) {
            return res.status(404).json({ error: 'Staff member not found' });
        }
        res.json({ status: 'Staff member Updated', staff: updatedStaff });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE endpoint to remove a staff member by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const staffId = req.params.id;
        const deletedStaff = await Staff.findByIdAndRemove(staffId);
        if (!deletedStaff) {
            return res.status(404).json({ error: 'Staff member not found' });
        }
        res.json({ status: 'Staff member Deleted', staff: deletedStaff });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET endpoint to retrieve a staff member by NIC
router.get('/get/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        const staffMember = await Staff.findOne({ _id: id });
        if (!staffMember) {
            return res.status(404).json({ error: 'Staff member not found' });
        }

        res.json(staffMember);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find();
        res.json(attendanceRecords);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
router.post('/attendance/add', async (req, res) => {
    try {
        const { name, nic, date, status } = req.body;
        const newAttendance = new Attendance({ name, nic, date, status });
        await newAttendance.save();
        res.json({ status: 'Attendance added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/attendance/update/:id', async (req, res) => {
    try {
        const staffId = req.params.id;
        const { status } = req.body;
console.log(staffId +' '+status)
        const updatedStaff = await Attendance.findByIdAndUpdate(staffId, { status }, { new: true });
        if (!updatedStaff) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        res.json({ status: 'Staff Attendance Updated', staff: updatedStaff });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
