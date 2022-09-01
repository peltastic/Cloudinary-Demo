const express = require("express");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const multiparty = require("multiparty");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Log the configuration
console.log(cloudinary.config());

app.get("/test", (req, res) => {
  return res.status(200).send("working");
});

app.post("/upload", async function (req, res) {
  const form = new multiparty.Form({ maxFieldsSize: "50MB" });
  form.parse(req, async function (err, fields, files) {
    // console.log(fields, files, err);
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: "/test",
    };
    for (let i = 0; i < fields.file.length; i++) {
      const imagePath = fields.file[i];
      try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result, "3njejjsd");
        // return result.public_id;
      } catch (error) {
        console.error(error, "sakjdsja");
      }
    }
  });

  return res.sendStatus(200);
});

app.listen(8000, () => {
  console.log("listening");
});
