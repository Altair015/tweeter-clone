import jsonwebtoken from "jsonwebtoken";

export function generateJWT(userId, res) {
  const { JWT_SECRET } = process.env;

  // should be in miliseconds [1d expiry]
  const maxAge = 1 * 24 * 60 * 60 * 1000;

  const token = jsonwebtoken.sign({ userId }, JWT_SECRET, {
    expiresIn: "1d",
  });

  // added to cookie so that it even if the browser is closed,
  // the same jwt can be used again within expiry
  res.cookie(
    "auth",
    { token, userId },
    {
      maxAge,
      httpOnly: true,
    }
  );

  return token;
}

export function validateJWT(token) {
  const decodedUserId = jsonwebtoken.verify(token, JWT_SECRET);
}
