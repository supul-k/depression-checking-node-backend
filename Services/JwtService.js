import jwtActions from "jsonwebtoken";

export const CreateToken = async (id, email, status) => {
  try {
    const accessToken = await jwtActions.sign(
      { id: id, email: email, role: status },
      "JWT_SECRET",
      { expiresIn: "1h" }
    );
    return accessToken;
  } catch (error) {
    throw error;
  }
};

export const ValidateSuperAdmin = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res
      .status(401)
      .json({ status: false, message: "Super admin access required" });
    return;
  }

  const accessToken = authToken.replace("Bearer ", "");

  jwtActions.verify(accessToken, "JWT_SECRET", (error, decoded) => {
    if (error) {
      res.status(401).json({ status: false, message: error.message });
      return;
    }

    if (decoded.role !== "super admin") {
      res.status(403).json({ status: false, message: "Access denied!" });
      return;
    }

    next();
  });
};


export const ValidateAdmin = async (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
      res
        .status(401)
        .json({ status: false, message: "Super admin or admin access required" });
      return;
    }
  
    const accessToken = authToken.replace("Bearer ", "");
  
    jwtActions.verify(accessToken, "JWT_SECRET", (error, decoded) => {
      if (error) {
        res.status(401).json({ status: false, message: error.message });
        return;
      }
  
      if (decoded.role !== "super admin" && decoded.role !== "admin") {
        res.status(403).json({ status: false, message: "Access denied!" });
        return;
      }
  
      next();
    });
  };
