import { sign, verify } from "jsonwebtoken";
import { Types } from "mongoose";
import { UserDto } from "../dtos/user-dto";
import { TokeModel } from "../models/token-model";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET || "ACCESS_TOKEN";

class Service {
  generateTokens(userData: UserDto) {
    const accessToken = sign(userData, ACCESS_TOKEN, { expiresIn: "15s" });
    const refreshToken = sign(userData, REFRESH_TOKEN, { expiresIn: "30d" });

    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string) {
    try {
      const userData = verify(token, ACCESS_TOKEN);
      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = verify(token, REFRESH_TOKEN);
      return userData;
    } catch (err) {
      return null;
    }
  }

  async saveToken(userId: Types.ObjectId, refreshToken: string) {
    const refreshTokenInDB = await TokeModel.findOne({ userId });

    if (refreshTokenInDB) {
      refreshTokenInDB.refreshToken = refreshToken;
      return refreshTokenInDB.save();
    }

    return TokeModel.create({ userId, refreshToken });
  }

  async removeToken(refreshToken: string) {
    await TokeModel.deleteOne({ refreshToken });
  }

  async findToken(refreshToken: string) {
    await TokeModel.findOne({ refreshToken });
  }
}

export const TokenService = new Service();
