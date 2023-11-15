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

    //TEMPORARILY REMOVED isLoggedIn TO CREATE INITIAL PROFILES WHEN DEPLOYED
    //TO-DO RESTORE isLoggedIn REQUIREMENT AFTER SITE DEPLOYED AND PROFILES SET UP
router.route('/new')
    .get(catchAsync(profiles.renderNewProfile))
    .post(upload.single('image'), catchAsync(profiles.postNewProfile))

router.route('/:pname')
    .get(catchAsync(profiles.renderProfilePage))
    .put(isLoggedIn, isAuthor, upload.single('image'), catchAsync(profiles.editProfile))

router.get('/:pname/edit', isLoggedIn, isAuthor, catchAsync(profiles.renderEditForm))



module.exports = router;