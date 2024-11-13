import multer from "multer";
import path from "path";

// Setup multer storage engine for saving uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "drimages/"); // Folder to save uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with timestamp
  },
});

const fileFilter = (req, file, cb) => {
  // Only accept images
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only images are allowed"), false);
  }
};

const druploads = multer({ storage, fileFilter });

export default druploads;
