const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, res, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

module.exports = multer({
  storage: storage,
});
