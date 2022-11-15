import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12); // for salt number, the higher the more secure
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = compare(password, hashedPassword);
  return isValid;
}
