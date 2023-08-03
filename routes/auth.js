const express = require("express");
const expressValidator = require("express-validator");
const User = require("../models/user");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    expressValidator
      .check("email")
      .isEmail()
      .withMessage("Please enter a valid Email.")
      .normalizeEmail(),
    expressValidator
      .body("password", "password has to be valid")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    expressValidator
      .check("email")
      .isEmail()
      .withMessage("Please enter a valid Email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Email exists already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    expressValidator
      .body(
        "password",
        "Please enter password with only text and number and it should be at least 5 characters"
      )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    expressValidator
      .body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Confirm password need to match!");
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
