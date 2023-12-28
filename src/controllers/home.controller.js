homeController = {
  index: (req, res) => {
    return res.render("home", {
      title: "Trang Chủ",
    });
  },
};

module.exports = homeController;
