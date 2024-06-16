import { resourceConflict } from "../errors/dbErrors.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { hashingPassword } from "../utils/hashingPassword.js";

export async function registerUser(req, res) {
  try {
    const { username, fullname, password, email, location } = req.body;

    const hashedPassword = hashingPassword(password, 13);

    // "save" to create|update, "create" to create!update
    const dbResponse = await User.create({
      username,
      password: hashedPassword,
      email,
      location,
      fullname,
    });

    console.log(dbResponse);

    const apiResponse = { username, email, location, fullname };

    res.status(200).send({
      apiResponse,
    });
  } catch (error) {
    console.log(error);

    const errorEntity = resourceConflict(error);

    res.status(errorEntity.status).send({
      status: "failure",
      error: errorEntity.message,
    });
  }
}
