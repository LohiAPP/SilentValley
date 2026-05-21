const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

let storage;
if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_KEY !== 'your_api_key') {
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'silent_valley_gallery',
      resource_type: 'auto',
      allowedFormats: ['jpg', 'png', 'jpeg', 'webp', 'pdf'],
    },
  });
} else {
  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
  }
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'))
    }
  });
}

const parser = multer({ storage: storage });

module.exports = { cloudinary, parser };
