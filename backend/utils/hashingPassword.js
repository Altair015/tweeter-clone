import bcrypt from "bcrypt";

export function hashingPassword(password, saltLength) {
  const salt = bcrypt.genSaltSync(saltLength);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
}
