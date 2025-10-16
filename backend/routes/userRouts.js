const express = require('express');
const { getUsers, signupUser ,loginUser,logoutUser} = require('../controller/auth/login');

const router = express.Router();

router.get('/', getUsers);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;
