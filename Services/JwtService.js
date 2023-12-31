import jwtActions from "jsonwebtoken";

export const CreateToken = async (user_id, email ) => {
  try {
    const accessToken = await jwtActions.sign(
      { user_id: user_id, email: email},
      "JWT_SECRET",
      { expiresIn: "2h" }
    );
    return accessToken;
  } catch (error) {
    throw error;
  }
};

export const ValidateUser = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res
      .status(401)
      .json({ status: false, message: "User login required" });
    return;
  }

  const accessToken = authToken.replace("Bearer ", "");

  jwtActions.verify(accessToken, "JWT_SECRET", (error, decoded) => {
    if (error) {
      res.status(401).json({ status: false, message: error.message });
      return;
    }

    next();
  });
};