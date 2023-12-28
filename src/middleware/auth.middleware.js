const JWT = require("jsonwebtoken");
const authMiddleware = {
  isAuth: async (req, res, next) => {
    try {
    } catch (error) {}
  },

  authenticateToken: async (req, res, next) => {
    try {
      const access_token = req.cookies.access_token;
      if (!access_token) {
        // return res.json({ message: "chưa có token" });
        req.isAuthenticated = false; // Chưa đăng nhập
        return next();
      }
      JWT.verify(access_token, process.env.SECRET_JWT, (err, user) => {
        if (err) {
          req.isAuthenticated = false; // Token không hợp lệ
          return next();
        }
        req.isAuthenticated = true; // Đã đăng nhập
        req.user = user;
        next();
      });
    } catch (error) {
      return res.json({
        message: error,
      });
    }
  },

  isAdmin: async (req, res, next) => {
    try {
    } catch (error) {}
  },
};

module.exports = authMiddleware;
