import { compareSync, hashSync } from "bcrypt";
import { UserDto } from "../dtos/user-dto";
import { ApiError } from "../exceptions/api-error";
import { User, UserModel } from "../models/user-model";
import { SignInData } from "../types/user-types";
import { TokenService } from "./token-service";

class Service {
  async createUser(userData: User) {
    const candidate = await UserModel.findOne({ email: userData.email });

    if (candidate) {
      throw ApiError.BadRequest(`User with: ${userData.email} email already exists`);
    }

    const hashPassword = hashSync(String(userData.password), 3);
    const createdUser = await UserModel.create({
      ...userData,
      password: hashPassword,
    });

    const userDto = new UserDto(createdUser);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: createdUser, ...tokens };
  }

  async signInUser(userData: SignInData) {
    const user = await UserModel.findOne({ email: userData.email });

    if (!user) {
      throw ApiError.BadRequest(`User with: ${userData.email} email not exists`);
    }

    const truthlyPassword = compareSync(userData.password, user.password);

    if (!truthlyPassword) {
      throw ApiError.BadRequest("Incorrect password");
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async getAllUsers() {
    const users = await UserModel.find({});

    return users;
  }

  async signOut(refreshToken: string) {
    await TokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);

    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }
}

export const UserService = new Service();
