const express = require('express');
const Controllers = require('../controllers/user');

const router = express.Router();

router.post("/api/register", Controllers.register);
router.post("/api/login", Controllers.login);

module.exports = router;