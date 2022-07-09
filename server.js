const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const { sendMail } = require("./mail");

// middleware
app.use(cors());

app.get("/file/:Key", (req, res) => {
  const Key = req.params.Key;
  return res.send({ key });
});

app.post("/file", async function (req, res) {
  return res.send({ OK: "Success" });
});

app.post("/send", async function (req, res) {
  const data = await sendMail("fenig57904@weepm.com", "hey", "ohk");
  return res.send({ ok: "okk", data });
});

app.listen(PORT, () => {
  console.log("Server is running " + PORT);
});
