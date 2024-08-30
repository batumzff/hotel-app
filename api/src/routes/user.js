"use strict";
/*-------------------------------------------------------
      NODEJS EXPRESS | MIDNIGHT CODERS HOTEL API
-------------------------------------------------------*/
const router = require("express").Router();
/*-------------------------------------------------------*/
// User Routes:

const User = require("../controllers/user");

router.route("/").get(User.list).post(User.create);

router
  .route("/:userId")
  .get(User.read)
  .put(User.update)
  .patch(User.update)
  .delete(User.delete);

module.exports = router;
