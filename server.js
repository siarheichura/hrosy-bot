const express = require("express");

const app = express();

app.use(express.static("./dist/hrosy-bot-ng"));

app.get("/*", function (req, res) {
  res.sendFile("index.html", {root: "dist/hrosy-bot-ng"});
});

app.listen(process.env.PORT || 8080);
