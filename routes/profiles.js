const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Profile = require('../models/profile');
const profiles = require('../controllers/profiles')
const { isLoggedIn, isAuthor } = require('../middleware');

router.get('/', catchAsync(profiles.renderFamilyIndex))

router.route('/new')
    .get(isLoggedIn, catchAsync(profiles.renderNewProfile))
    .post(isLoggedIn, catchAsync(profiles.postNewProfile))

router.route('/:id')
    .get(catchAsync(profiles.renderProfilePage))
    .put(isLoggedIn, isAuthor, catchAsync(profiles.editProfile))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(profiles.renderEditForm))



module.exports = router;