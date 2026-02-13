const express = require('express');
const router = express.Router();
const StudySession = require('../models/StudySession');
const Subject = require('../models/Subject');
const authenticate = require('../middleware/auth');
const { validateStudySession, handleValidationErrors } = require('../utils/validators');

// Get all study sessions
router.get('/', authenticate, async (req, res) => {
  try {
    const { startDate, endDate, subjectId } = req.query;
    
    const filter = { userId: req.user._id };
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    
    if (subjectId) filter.subjectId = subjectId;
    
    const sessions = await StudySession.find(filter)
      .populate('subjectId', 'name color')
      .sort({ date: -1 });
    
    res.json({ sessions });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sessions', error: error.message });
  }
});

// Create study session
router.post('/', authenticate, validateStudySession, handleValidationErrors, async (req, res) => {
  try {
    const { subjectId, duration, notes, date, quality } = req.body;
    
    // Verify subject belongs to user
    const subject = await Subject.findOne({ _id: subjectId, userId: req.user._id });
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    
    const session = await StudySession.create({
      userId: req.user._id,
      subjectId,
      duration,
      notes,
      date: date || new Date(),
      quality: quality || 3
    });
    
    // Update subject total hours
    subject.totalHoursStudied += duration / 60;
    await subject.save();
    
    const populatedSession = await StudySession.findById(session._id)
      .populate('subjectId', 'name color');
    
    res.status(201).json({
      message: 'Study session created',
      session: populatedSession
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create session', error: error.message });
  }
});

// Update study session
router.put('/:id', authenticate, validateStudySession, handleValidationErrors, async (req, res) => {
  try {
    const session = await StudySession.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    const oldDuration = session.duration;
    const { subjectId, duration, notes, date, quality } = req.body;
    
    // Update subject hours if duration changed
    if (duration !== oldDuration) {
      const subject = await Subject.findById(session.subjectId);
      subject.totalHoursStudied -= oldDuration / 60;
      subject.totalHoursStudied += duration / 60;
      await subject.save();
    }
    
    session.subjectId = subjectId;
    session.duration = duration;
    session.notes = notes;
    session.date = date;
    session.quality = quality;
    
    await session.save();
    
    const updatedSession = await StudySession.findById(session._id)
      .populate('subjectId', 'name color');
    
    res.json({
      message: 'Session updated',
      session: updatedSession
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update session', error: error.message });
  }
});

// Delete study session
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const session = await StudySession.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    // Update subject hours
    const subject = await Subject.findById(session.subjectId);
    if (subject) {
      subject.totalHoursStudied -= session.duration / 60;
      await subject.save();
    }
    
    await session.deleteOne();
    
    res.json({ message: 'Session deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete session', error: error.message });
  }
});

// Get subjects
router.get('/subjects', authenticate, async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.user._id });
    res.json({ subjects });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch subjects', error: error.message });
  }
});

// Create subject
router.post('/subjects', authenticate, async (req, res) => {
  try {
    const { name, color, targetHours } = req.body;
    
    const existingSubject = await Subject.findOne({
      userId: req.user._id,
      name: name.trim()
    });
    
    if (existingSubject) {
      return res.status(400).json({ message: 'Subject already exists' });
    }
    
    const subject = await Subject.create({
      userId: req.user._id,
      name: name.trim(),
      color: color || '#3B82F6',
      targetHours: targetHours || 0
    });
    
    res.status(201).json({ message: 'Subject created', subject });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create subject', error: error.message });
  }
});

module.exports = router;
