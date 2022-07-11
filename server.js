require("dotenv").config();
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
supabase = createClient(supabaseUrl, supabaseAnonKey);
const app = express();
const cors = require("cors");
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

async function fetchCollege(req, res, next) {
  let list;
  console.log("data");
  try {
    await supabase
      .from("collegeList")
      .select("*")
      .then(data => {
        list = data.data;
      });
    await client.setEx("college", 3600, JSON.stringify(list));
    return res.json(list);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
}

// cache
async function cacheColleges(req, res, next) {
  console.log("cache");
  const list = await client.get("college");
  if (list !== null) {
    return res.json(JSON.parse(list));
  }
  next();
}
app.get("/db", cacheColleges, fetchCollege);

app.get("/dbRefresh", async (req, res) => {
  client.del("college");
  res.json({ message: "Refreshed" });
});

app.get("/send", async function (req, res) {
  const data = await sendMail("savinash406@gmail.com", "hey", "ohk");
  return res.send({ ok: "okk", data });
});

app.listen(PORT, () => {
  console.log("Server is running " + PORT);
});
