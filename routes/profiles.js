const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const profiles = require('../controllers/profiles')
const { isLoggedIn, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(profiles.renderFamilyIndex))

router.route('/new')
    .get(isLoggedIn, catchAsync(profiles.renderNewProfile))
    .post(isLoggedIn, upload.single('image'), catchAsync(profiles.postNewProfile))

router.route('/:id')
    .get(catchAsync(profiles.renderProfilePage))
    .put(isLoggedIn, isAuthor, upload.single('image'), catchAsync(profiles.editProfile))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(profiles.renderEditForm))



module.exports = router;