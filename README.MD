CONVERT SANG TIMEZONE VN
const moment = require("moment-timezone");

// Thời gian hiện tại (UTC)
const utcTime = moment("2023-12-28T15:58:38.284+00:00");

// Chuyển đổi sang múi giờ "Asia/Ho_Chi_Minh"
const hoChiMinhTime = utcTime.tz("Asia/Ho_Chi_Minh");

// Định dạng theo Y-m-d H:i:s
const formattedTime = hoChiMinhTime.format("Y-MM-DD HH:mm:ss");

console.log(formattedTime);
