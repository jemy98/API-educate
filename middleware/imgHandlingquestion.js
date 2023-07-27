const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/questionimg");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    cb(
      null,
      uniqueSuffix + file.originalname
    );
  },
});

// const fileFilter = (req, file, cb) => {
//   // reject all files except jpeg
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     return cb(new Error('Only images are allowed'))
//   }
// };

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15, // 15mb max size,
  },
  // fileFilter: fileFilter
});