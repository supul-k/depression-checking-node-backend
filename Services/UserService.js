import * as UserRepository from "../Repositories/UserRepository.js";
import bcrypt from "bcrypt";
import * as JwtService from "./JwtService.js";

export const RegisterUser = async (request) => {
  try {
    var result = await UserRepository.RegisterUser(request);
    return result;
  } catch (error) {
    throw error;
  }
};

export const Login = async (request) => {
  try {
    var user = await UserRepository.GetUserByEmail(request.email);

    const isUserPwMatch = await bcrypt.compare(
      request.password,
      user[0].password
    );

    if (request.email === user[0].email && isUserPwMatch) {
      var token = await JwtService.CreateToken(
        user[0].user_id,
        user[0].email,
        "user"
      );

      if (token) {
        return {
          status: true,
          message: "User login success",
          token: token,
          email: user[0].email,
          user_id: user[0].user_id,
        };
      } else {
        return { status: false, message: "User token generation faild" };
      }
    } else {
        return { status: false, message: "User login failed!" }; 
    }
  } catch (error) {
    throw error;
  }
};
