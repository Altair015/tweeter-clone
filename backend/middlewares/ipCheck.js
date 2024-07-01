export function ValidateIp(req, res, next) {
  const currentIp = req.ip;
  const currentUserAgent = req.get("User-Agent");

  if (user.ip !== currentIp || user.userAgent !== currentUserAgent) {
    return res.sendStatus(403);
  }

  next();
}
