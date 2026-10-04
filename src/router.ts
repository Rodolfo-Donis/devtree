import { Router } from "express";
import { body } from "express-validator";
import { createUser, login } from "./handlers";
import { handleInputErrors } from "./middleware/validation";
const router = Router();

// Routing

router.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

router.get("/us", (req, res) => {
  res.send("Hello World from Express ==> us");
});

/**  Authentication and register */

router.post(
  "/auth/register",
  body("handle").notEmpty().withMessage("Handle is Empty"),
  body("name").notEmpty().withMessage("Name is Empty"),
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").isLength({ min: 8 }).withMessage("Password is not safe"),
  handleInputErrors,
  createUser,
);

router.post(
  "/auth/login",
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").notEmpty().withMessage("Password is required"),
  handleInputErrors,
  login,
);

export default router;
