const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_KEY_SECRET_CLOUDINARY, // Click 'View API Keys' above to copy your API secret
});
module.exports.upload_cloudinary = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    let result = await streamUpload(req);
    req.body[req.file.fieldname] = result.url;
    next();
    // console.log(result);
  }

  upload(req);
};
