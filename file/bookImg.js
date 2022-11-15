const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./bookImgs");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const filter = (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadBookImg = multer({
  storage: storage,
  fileFilter: filter,
});

module.exports = uploadBookImg;
