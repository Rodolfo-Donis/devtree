import type { Request, Response } from "express";
import UserModel from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import slug from "slug";
/**
 * Creates a user from the register request body.
 */
export const createUser = async (req: Request, res: Response) => {
  // search if existing user
  const { email, password } = req.body;

  // Validate Email
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    const error = new Error(`The User email already exists ${email}`);
    return res.status(409).json({ error: error.message });
  }

  //Validate Handle
  const handle = slug(req.body.handle, "");
  const handleExist = await UserModel.findOne({ handle });
  if (handleExist) {
    const error = new Error(`The handle already exists ${handle}`);
    return res.status(409).json({ error: error.message });
  }

  //register user
  const user = new UserModel(req.body);
  // hash password
  user.password = await hashPassword(password);
  //handle
  user.handle = handle;
  await user.save();
  res.status(201).json({ user });
};

/**
 * Authenticates the User
 */
export const login = async (req: Request, res: Response) => {
  // Search User
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  // no user exists
  if (!user) {
    const error = new Error(`The User email  does not  exists ${email}`);
    return res.status(404).json({ error: error.message });
  }

  // authenticate password
  const isAuthenticated = await checkPassword(password, user.password);
  if (!isAuthenticated) {
    const error = new Error("Incorrect Password");
    return res.status(401).json({ error: error.message });
  }
  res.send("Authenticated");
};
