const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

const assets = __dirname + "/assets";
app.use("/assets", express.static(assets));

app.set("trust proxy", true);

const fileHtml = __dirname + "/public/index.html";
app.get("/", (req, res) => {
  res.sendFile(fileHtml);
});

app.get("/api/whoami", (req, res) => {
  console.log("GET");
  const ipAdress = req.headers["x-forwarded-for"];
  console.log(req.ip);
  console.log(ipAdress);
  res.status(200).json({
    ipadress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  });
});

app.all("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`Server start on port ${listener.address().port}`);
});
