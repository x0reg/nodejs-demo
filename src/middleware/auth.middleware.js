const JWT = require("jsonwebtoken");
const authMiddleware = {
  isAuth: async (req, res, next) => {
    try {
    } catch (error) {}
  },

  authenticateToken: async (req, res, next) => {
    const token = req.cookies["access_token"];
    if (token) {
      try {
        // Xác minh token và lấy thông tin người dùng
        const decoded = JWT.verify(token, process.env.SECRET_JWT);
        req.user = decoded;
        // Truyền thông tin người dùng vào res.locals
        res.locals.user = req.user;
        return next(); // Người dùng đã đăng nhập, tiếp tục xử lý middleware tiếp theo
      } catch (err) {
        res.clearCookie("access_token");
        return res.redirect("/auth/login"); // Token không hợp lệ, trả về lỗi 401
      }
    } else {
      return next();
    }
  },

  isAdmin: async (req, res, next) => {
    try {
    } catch (error) {}
  },
};

module.exports = authMiddleware;
