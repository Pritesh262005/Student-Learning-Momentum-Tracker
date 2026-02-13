const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const validateStudySession = [
  body('subjectId').notEmpty().withMessage('Subject is required'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be at least 1 minute'),
  body('date').optional().isISO8601().withMessage('Invalid date format'),
];

const validateGoal = [
  body('title').trim().notEmpty().withMessage('Goal title is required'),
  body('type').isIn(['short-term', 'long-term']).withMessage('Invalid goal type'),
  body('targetValue').isFloat({ min: 0 }).withMessage('Target value must be positive'),
  body('deadline').isISO8601().withMessage('Valid deadline is required'),
];

const validateAssignment = [
  body('subjectId').notEmpty().withMessage('Subject is required'),
  body('title').trim().notEmpty().withMessage('Assignment title is required'),
  body('deadline').isISO8601().withMessage('Valid deadline is required'),
  body('maxScore').isFloat({ min: 0 }).withMessage('Max score must be positive'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateStudySession,
  validateGoal,
  validateAssignment,
  handleValidationErrors
};
