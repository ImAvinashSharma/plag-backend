const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const { sendMail } = require("./mail");
const redis = require("@redis/client");
const client = redis.createClient();
(async () => {
  await client.connect();
})();
client.on("connect", () => console.log("::> Redis Client Connected"));
client.on("error", err => console.log("<:: Redis Client Error", err));
// middleware
app.use(cors());
app.use(express.json());

app.get("/redis", async (req, res) => {
  await client.set("key", "value");
  const value = await client.get("key");
  res.json(value);
});

app.get("/send", async function (req, res) {
  const data = await sendMail("savinash406@gmail.com", "hey", "ohk");
  return res.send({ ok: "okk", data });
});

app.listen(PORT, () => {
  console.log("Server is running " + PORT);
});
