import jsonwebtoken from "jsonwebtoken";

export function ValidateJWTMiddleware(req, res, next) {
  const { JWT_SECRET } = process.env;
  const { userId } = req.body;
  const token = req.cookies.jwt;
  const decodedUserId = jsonwebtoken.verify(token, JWT_SECRET);
  console.log(userId, decodedUserId);
  if (userId != decodedUserId.userId) {
    console.log("Error Validating JWT");
    return;
  }

  next();
}
