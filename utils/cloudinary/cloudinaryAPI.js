const { Cloudinary } = require("./cloudinaryConfig");
const { HttpError } = require("../HttpError");
const fs = require("fs/promises");

const cloudinaryImgSave = async (filePath, destFolder) => {
  const fileData = await Cloudinary.uploader.upload(filePath, {
    folder: `dare_drop_streaming/${destFolder}`,
    use_filename: true,
  });

  fs.unlink(filePath, (err) => {
    if (err) {
      throw new HttpError(500, "Server can not delete the temp file");
    }
  });

  return fileData;
};

module.exports = {
  cloudinaryImgSave,
};
