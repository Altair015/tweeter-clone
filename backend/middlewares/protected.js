import jsonwebtoken from "jsonwebtoken";

export function ValidateJWTMiddleware(req, res, next) {
  try {
    const { JWT_SECRET } = process.env;

    // when cookie expires on the browser
    if (!Object.keys(req.cookies).length) {
      return res.status(401).send({
        staus: "unauthorized",
        message: "Cookie not found or expired",
      });
    }

    const { token, userId } = req.cookies.auth;

    if (!token) {
      return res.status(401).send({
        staus: "unauthorized",
        message: "No 'token' found in the request",
      });
    }

    const decodedUserId = jsonwebtoken.verify(token, JWT_SECRET);

    if (userId != decodedUserId.userId) {
      res.status(401).json({
        staus: "unauthorized",
        message: "Token is invalid or expired",
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      staus: "others",
      message: error.message,
    });
  }

  next();
}
