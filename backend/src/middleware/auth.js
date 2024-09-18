import jwt from "jsonwebtoken";
const AuthMiddleware = (req, res, next) => {
  // console.log(jwt);
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    console.log(process.env.JWT_SECRET);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(402).json({
        message: "Invalid Bearer Token",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.AdminId = decoded.AdminId;
    next();
  } catch (error) {
    return res.status(403).json({
      message: error.message,
    });
  }
};

export default AuthMiddleware;
