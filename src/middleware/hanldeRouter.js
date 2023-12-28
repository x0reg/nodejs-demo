const errorHandler = async (err, req, res, next) => {
  if (err) {
    console.log(err);
    err.status != 404;
    if (err.status == 404) {
      return res.status(404).render("error/404");
    }
    res.status(err.status || 200).json({
      success: false,
      message: "Có lỗi xảy ra " + err.message || err,
    });
  }
};

module.exports = errorHandler;
