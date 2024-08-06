import bcrypt from "bcrypt";

export function hashingPassword(password, saltLength) {
  // for make the passwords uniquely hashed
  const salt = bcrypt.genSaltSync(saltLength);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
}

export function validatePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}
