const mongose = require("mongoose");

const connection = async () => {
  const condb = await mongose
    .connect("mongodb://127.0.0.1:27017/node_dev")
    .then((data) => {
      console.log("Connect DB success");
    })
    .catch((err) => {
      console.log("CONNECT DB FAILURE :" + err);
    });
};
module.exports = { connection };
