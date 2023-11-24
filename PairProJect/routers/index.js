const express = require('express');
const router = express.Router()
const user= require('./user');
const admin= require('./admin');

router.use(user)
router.use(admin)

router.get("/", (req, res) => {
    res.render("landingPage");
  });

  router.get("/login", (req, res) => {
    res.render("loginPage");
  });

module.exports = router