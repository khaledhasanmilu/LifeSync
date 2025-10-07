const express = require('express');
const { getUsers, signupUser ,loginUser} = require('../controller/auth/login');

const router = express.Router();

router.get('/', getUsers);
router.post('/signup', signupUser);
router.post('/login', loginUser);

module.exports = router;
