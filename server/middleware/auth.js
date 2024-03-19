import jwt from "jsonwebtoken";
import { User } from "../modals/user.js";

export const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log(authHeader);
    if (!authHeader)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const [bearer, token] = authHeader.split(" ");

    if (bearer === "Bearer" && token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = decoded;
      const user = await User.findById(id);
      req.user = user;
      next();
    } else {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: "Network Error" });
  }
};
