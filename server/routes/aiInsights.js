const router = require('express').Router();
const { authRequired, requireRole } = require('../middleware/auth');
const { getSessionInsight } = require('../controllers/aiInsightController');

router.get('/session/:sessionId', authRequired, requireRole('faculty'), getSessionInsight);

module.exports = router;
