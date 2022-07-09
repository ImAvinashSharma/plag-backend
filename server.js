const express = require("express");
const app = express();
const S3 = require("aws-sdk/clients/s3");
const cors = require("cors");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
require("dotenv").config();
const PORT = process.env.PORT || 3001;
// const multerS3 = require("multer-s3");
const multer = require("multer");
const s3 = new S3();
const { sendMail } = require("./mail");
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     acl: "public-read",
//     key: function (req, file, cb) {
//       cb(null, req.params.id + ".pdf");
//     }
//   })
// });
const { uploadFile, getFileStream } = require("./s3");
// //middleware
app.use(cors());

// app.get("/images/:Key", (req, res) => {
//   const Key = req.params.Key;
//   try {
//     const readStream = getFileStream(Key);
//     readStream.pipe(res);
//   } catch (error) {
//     console.log(error.code);
//   }
// });

// app.post("/images", upload.single("file"), async function (req, res) {
//   const file = req.file;
//   if (!file) {
//     return res.status(400).send({ message: "Please upload a file." });
//   }
//   console.log(file);
//   // TODO: plag check
//   // if (file.mimetype === "application/pdf") {
//   const result = await uploadFile(file);
//   await unlinkFile(file.path);
//   console.log(result);
//   res.send({ imagePath: `images/${result.Key}` });
//   // } else {
//   // return res.status(404).json({ error: "Invalid file type" });
//   // }
// });

app.post("/send", async function (req, res) {
  const data = await sendMail("fenig57904@weepm.com", "hey", "ohk");
  return res.send({ ok: "okk", data });
});

app.listen(PORT, () => {
  console.log("Server is running " + PORT);
});
