import jwt from "jsonwebtoken";
import { TokeModel } from "../models/token-model.mjs";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET || "ACCESS_TOKEN";

class Service {
  generateTokens(userData) {
    const accessToken = jwt.sign(userData, ACCESS_TOKEN, { expiresIn: "15s" });
    const refreshToken = jwt.sign(userData, REFRESH_TOKEN, { expiresIn: "30d" });

    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, ACCESS_TOKEN);
      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, REFRESH_TOKEN);
      return userData;
    } catch (err) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const refreshTokenInDB = await TokeModel.findOne({ userId });

    if (refreshTokenInDB) {
      refreshTokenInDB.refreshToken = refreshToken;
      return refreshTokenInDB.save();
    }

    return TokeModel.create({ userId, refreshToken });
  }

  async removeToken(refreshToken) {
    await TokeModel.deleteOne({ refreshToken });
  }

  async findToken(refreshToken) {
    return await TokeModel.findOne({ refreshToken });
  }
}

export const TokenService = new Service();
