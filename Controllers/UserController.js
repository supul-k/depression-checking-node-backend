import * as UserService from "../Services/UserService.js";
import * as ValidationService from "../Services/ValidationService.js";

export const RegisterUser = async (req, res) => {
  try {
    var isEmail = await ValidationService.ValidateEmail(req.body.email);
    if (!isEmail) {
      res.status(400).json({ status: false, message: "Email not valid" });
      return;
    }

    var isPassword = await ValidationService.ValidatePassword(
      req.body.password
    );
    if (!isPassword) {
      res.status(400).json({ status: false, message: "Password not valid" });
      return;
    }

    var existUser = await ValidationService.GetUserByEmail(req.body.email);
    if (existUser.length > 0) {
      res
        .status(400)
        .json({ status: false, message: "User email already exist" });
      return;
    }

    var result = await UserService.RegisterUser(req.body);
    if (!result) {
      res
        .status(400)
        .json({ status: false, message: "User ragistration faild" });
      return;
    }

    res
      .status(400)
      .json({ status: true, message: "User ragistration successfull" });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: error });
  }
};

export const Login = async (req, res) => {
  try {
    var isEmail = await ValidationService.ValidateEmail(req.body.email);
    if (!isEmail) {
      res.status(400).json({ status: false, message: "Email not valid" });
      return;
    }

    var result = await UserService.Login(req.body);
    if (!result.status) {
      res.status(400).json({ status: false, message: result.message });
      return;
    }

    res.status(200).json({
      status: result.status,
      message: result.message,
      token: result.token,
    });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: error });
  }
};