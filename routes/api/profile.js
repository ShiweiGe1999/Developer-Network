const express = require("express");
const router = express.Router();


// @route GET /api/profile/test
// @desc Tests post route
// @access Public
router.get("/test", (req, res) => res.json({ message: "Profile Working!" }));

module.exports = router;