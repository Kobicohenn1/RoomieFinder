const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('File is not an image'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
  fileFilter,
});

module.exports = upload;
