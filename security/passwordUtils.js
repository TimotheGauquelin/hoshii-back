import bcrypt from "bcryptjs";

const hashedPassword = async (password) => {
  const SALT = await bcrypt.genSalt(10);
  const HASHED_PASSWORD = await bcrypt.hash(password, SALT);
  return HASHED_PASSWORD;
};

const comparedPassword = async (passwordFromBody, hashedPasswordFromDB) => {
  const IS_MATCHING_PASSWORD = await bcrypt.compare(passwordFromBody, hashedPasswordFromDB);
  return IS_MATCHING_PASSWORD;
}

export { hashedPassword, comparedPassword }