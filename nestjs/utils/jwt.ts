import * as jwt from "jsonwebtoken";

export function generateAccessToken(user) {
  return jwt.sign(user, 'ACCESS_TOKEN_SECRET', {expiresIn: "60m"})
}

export function generateRefreshToken(user) {
  return jwt.sign(user, 'REFRESH_TOKEN_SECRET', { expiresIn: "120m" })
}
