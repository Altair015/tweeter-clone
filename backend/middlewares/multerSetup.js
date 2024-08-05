import multer from "multer";

// const upload = multer({ dest: "./public/uploads/" });

// Caution, express do not have any api in request section which deals with files.
// multer attaches the file property when FormData with file is being sent over http.'
// git, this issue is still open do not waste time looking for issue at axios level.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const { user_id } = req.params;

    const fileExt = file.mimetype.split("/")[1];

    if (
      file.originalname === "profile_pic" ||
      file.originalname === "profile_cover"
    ) {
      cb(null, `${user_id}-${file.originalname}.${fileExt}`);
    } else {
      const randomSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${randomSuffix}.${fileExt}`);
    }
  },
});

const upload = multer({ storage: storage });

export const multerMiddleWare = upload.single("image");
