import { resourceConflict } from "../errors/dbErrors.js";
import User from "../models/userModel.js";
import { generateJWT } from "../utils/handleJWT.js";
import { hashingPassword, validatePassword } from "../utils/hashingPassword.js";

export async function signUp(req, res) {
  try {
    const { username, fullname, password, email } = req.body;

    const hashedPassword = hashingPassword(password, 13);

    // saving to db
    const dbResponse = await User.create({
      username,
      password: hashedPassword,
      email,
      fullname,
    });

    // password removed for api response
    const apiResponse = {
      _id: dbResponse._id,
      username,
      email,
      fullname,
    };

    // generates and add jwt to cookie
    // generateJWT(dbResponse._id, res);

    res.status(200).send({
      apiResponse,
    });
  } catch (error) {
    console.log(error);

    const errorEntity = resourceConflict(error);

    res.status(errorEntity.status).send({
      status: "failure",
      error: errorEntity.message,
      type: errorEntity.type,
    });
  }
}

export async function signIn(req, res) {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    const dbResponse = await User.findOne({ username });

    if (!dbResponse) {
      res.status(401).send({
        status: "unauthorized",
        message: "Wrong UserName or Password",
      });
      return;
    }

    const { _id: userId, password: hashedPassword } = dbResponse;

    // decodes and validates jwt
    if (!validatePassword(password, hashedPassword)) {
      // wrong password error needed to be thrown [unauthorized]
      res.status(401).send({
        status: "unauthorized",
        message: "Wrong UserName or Password",
      });
      return;
    }

    // generate new token
    const token = generateJWT(userId, res);

    // console.log(dbResponse.toJSON());

    res.status(200).json({ ...dbResponse.toJSON(), token });
  } catch (error) {
    res.status(500).send({
      status: "failure",
      error: error.message,
    });
  }
}

// was not required,
// though just to add another security feature,
// so that it should unset the jwt from backend
export async function signOut(req, res) {}
