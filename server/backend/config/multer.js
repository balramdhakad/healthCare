import multer from "multer"
import cloudinary from "./cloudinary.js"
import { CloudinaryStorage } from "multer-storage-cloudinary"

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "HealthCare",
    allowed_formats : ["jpg", "jpeg", "png", "gif", "webp"],
  },
});

const upload = multer({ storage });
export default upload