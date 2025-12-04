import jwt from "jsonwebtoken";

function checkRoleMiddleweare(role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      return next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json("пользователь не авторизован");
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.admin !== role) {
        return res.status(403).json("У вас нет доступа!");
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json("Пользователь не авторизован");
    }
  };
}

export default checkRoleMiddleweare;
