import { readFileSync } from "node:fs";
import { generateJWT } from "../utils/handleJWT.js";

export const getImageByName = async (req, res) => {
  try {
    const { image_name } = req.params;
    const [name, ext] = image_name.split(".");

    // getting the file from pulic folder and serving to frontend
    const data = readFileSync(`./public/uploads/${image_name}`);
    // Adjust the MIME type based on the image type
    res.setHeader("Content-Type", `image/${ext}`);
    // Could use cache busting but this is much more centeralized.
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    // for HTTP 1.0 compatibility, modern browser uses HTTP 1.1
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const generateToken = async (req, res) => {
  const token = generateJWT("6687a22dc89a6a11833986d3", res);
  res.status(200).json({ token });
};
