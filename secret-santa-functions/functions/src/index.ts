const admin = require('firebase-admin');
admin.initializeApp();
require('dotenv').config()

exports.registerUser = require('./registerUser').default
exports.loginUser = require("./loginUser").default
exports.userDetails = require("./userDetails").default
exports.fillDB = require("./fillDB").default
exports.assignGifters = require("./assignGifters").default
exports.editWishlist = require("./editWishlist").default

