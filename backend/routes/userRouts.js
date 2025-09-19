const express = require('express');
const { getUsers, signupUser } = require('../controller/auth/login');

const router = express.Router();

router.get('/', getUsers);
router.post('/signup', signupUser);

module.exports = router;
