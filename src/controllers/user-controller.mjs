import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error.mjs";
import { UserService } from "../services/user-service.mjs";

class Controller {
  async createUser(req, res, next) {
    try {
      const userData = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("Validation error", errors.array());
      }

      const user = await UserService.createUser(userData);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(user);
    } catch (err) {
      console.log(err);

      next(err);
    }
  }

  async signInUser(req, res, next) {
    try {
      const body = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("Validation error", errors.array());
      }

      const user = await UserService.signInUser(body);

      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async signOut(req, res, next) {
    try {
      await UserService.signOut(req.cookies.refreshToken);
      res.clearCookie("refreshToken");

      return res.json("Successfully signed out");
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const user = await UserService.refresh(refreshToken);

      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      return res.json(users);
    } catch (err) {
      next(err);
    }
  }
}

export const UserController = new Controller();
