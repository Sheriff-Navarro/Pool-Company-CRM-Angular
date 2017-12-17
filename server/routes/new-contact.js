const express    = require('express');
const User = require('../models/user-model');
const { ensureLoggedIn } = require('connect-ensure-login');
const mongoose = require('mongoose');

const router = express.Router();


module.exports = router;
