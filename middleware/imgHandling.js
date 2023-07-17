const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname
    );
  },
});


module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15, // 15mb max size,
  },
});