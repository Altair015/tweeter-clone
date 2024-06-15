import User from "../models/userModel.js";

export async function createUser(req, res) {
  try {
    const { username, password, email, dob, location } = req.body;

    const findByEmail = await User.findOne({ email });
    const findByUsername = await User.findOne({ username });

    const newUser = new User({
      username,
      password,
      email,
      dob,
      location,
    });

    const response = await newUser.save();

    console.log(response);
  } catch (error) {
    console.log(error.message);
    res.status(409).send({
      connection: "ok",
      status: "failure",
      //   error: "user with this email already exists",
      error: error.message,
    });
  }
}
