import multer from "multer";

const upload = multer({ dest: "./public/uploads/" });

// Caution, express do not have any api in request section which deals with files.
// multer attaches the file property when FormData with file is being sent over http.'
// git, this issue is still open do not waste time looking for issue at axios level.
export const multerMiddleWare = upload.single("newTweetImage");
